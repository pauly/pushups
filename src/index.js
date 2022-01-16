/* global gapi, location, localStorage */

const { apiKey, calendarId, clientId, discoveryDocs, icon, orderBy, scope, showDeleted, singleEvents, title } = require('../config')
const { aC, cE, html, id, on } = require('./js')
// const timeMin = (new Date()).toISOString()
const redirectTimeout = 1000 // time to redirect

const instance = gapi => gapi.auth2.getAuthInstance()

const getFromStorage = (id = calendarId) => {
  try {
    return JSON.parse(localStorage.getItem(id))
  } catch (e) {
    console.log('hmm', e)
  }
}

const store = (value, id = calendarId) => {
  try {
    localStorage.setItem(id, JSON.stringify(value))
  } catch (e) {
    console.log('hmm', e)
  }
}

const data = getFromStorage() || []

/**
 *  Initialises the API client library and sets up sign-in state
 *  listeners.
 */
const initClient = () => {
  gapi.client.init({ apiKey, clientId, discoveryDocs, scope }).then(() => {
    // Listen for sign-in state changes.
    instance(gapi).isSignedIn.listen(updateSigninStatus)

    // Handle the initial sign-in state.
    updateSigninStatus(instance(gapi).isSignedIn.get())
  })
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
const updateSigninStatus = isSignedIn => {
  id('authorise').style.display = isSignedIn ? 'none' : 'block'
  id('signout').style.display = isSignedIn ? 'list-item' : 'none'
  // isSignedIn ? change() : updateContent()
  change()
}

/**
 *  Sign in the user upon button click.
 */
const authorise = e => {
  gapi.auth2.getAuthInstance().signIn()
}

/**
 *  Sign out the user upon button click.
 */
const signout = callback => {
  gapi.auth2.getAuthInstance().signOut()
  callback(null, 'Signed you out', '', '', redirectTimeout)
}

const updateContent = (err, title = '', message = '', whereNext = '', when) => {
  let content = null
  if (err) {
    content = `<p>⚠️ ${err}</p>`
  } else {
    content = message
    if (title) content = `<h2>${title}</h2>${message}`
  }
  html(id('content'), content)
  if (whereNext || when) {
    setTimeout(() => {
      location.hash = whereNext
    }, when)
  }
}

const getEvents = (calendarId, q, timeMin) => {
  return gapi.client.calendar.events.list({ calendarId, timeMin, q, showDeleted, singleEvents, orderBy })
    .then(response => {
      const events = response.result.items
      if (!events || !events.length) return getFromStorage() || []
      return events
    }).catch(e => {
      return getFromStorage() || []
    })
}

const getChallenges = (calendarId, q) => {
  return new Promise((resolve, reject) => {
    resolve([
      { id: 'pushups', summary: 'Original pushup challenge' },
      { id: 'situps', summary: 'Clare\'s situp challenge' }
    ])
  })
}

const getActivities = (calendarId, q, timeMin) => getEvents(calendarId, q, timeMin)

/*

on(id('addChallenge'), 'click', e => {
  e.preventDefault()
  addChallenge(id('name').value, callback)
})

const addChallenge = (name, callback) => {
  if (!name) {
    id('challenge').style.display = 'block'
    return callback(null, 'Add challenge', '<p>Give your new challenge a name and date range below</p>')
  }
  const summary = `${name} ${icon}`
  const start = { dateTime: new Date() }
  const end = { dateTime: new Date() }
  const resource = { summary, start, end }
  gapi.client.calendar.events.insert({ calendarId, resource }).execute(challenge => {
    callback(null, 'Added challenge', '', `challenge/${challenge.id}`, redirectTimeout)
  })
} */

// keep retrying but with a bigger gap each time
const delayedInsert = (calendarId, resource, delay = 0) => {
  if (delay > 5000) return console.error('too many attempts, give up')
  delay += Math.floor(Math.random() * 300)
  setTimeout(() => {
    gapi.client.calendar.events.insert({ calendarId, resource }).execute(response => {
      switch (response.code) {
        case 403:
        case 429:
        case 503:
          console.log(response)
          return delayedInsert(calendarId, resource, delay)
      }
    })
  }, delay)
}

const insertActivity = (calendarId, challenge, number) => {
  const summary = `${icon}${challenge} ${number}`
  const description = `${number} ${challenge}`
  const dateTime = new Date()
  const start = { dateTime }
  const end = start
  const url = location.origin
  const source = { url, title }
  const resource = { description, start, end, source, summary }
  delayedInsert(calendarId, resource)
  data.push(resource)
  console.log('now data is', data)
  store(data)
}

const addActivity = (challenge, number, callback) => {
  id('addActivity').onclick = e => {
    e.preventDefault()
    addActivity(challenge, id('number').value, callback)
  }
  if (!number) {
    id('activity').style.display = 'block'
    return callback(null, 'Add activity', `<p>Add <a href="#challenge/${challenge}">${challenge}</a></p>`)
  }
  insertActivity(calendarId, challenge, number)
  callback(null, 'Added activity', `<p>Added <a href="#challenge/${challenge}">${challenge}</a></p>`, `challenge/${challenge}`, redirectTimeout)
}

const simplify = activity => {
  let [number, challenge] = activity.description.split(/\W/)
  number = Number(number)
  const date = activity.start.dateTime.substr(0, 10)
  return { challenge, number, date }
}

const activitiesByDate = challenge => (all, activity) => {
  const simplified = simplify(activity)
  if (challenge !== simplified.challenge) return all
  const existing = all.find(activity => activity.date === simplified.date)
  if (existing) {
    existing.number += simplified.number
  } else {
    all.push(simplified)
  }
  return all
}

const activityListItem = activity => {
  return `<li>${activity.number} ${activity.challenge} (${activity.date})`
}

const listActivities = (challenge, callback) => {
  getActivities(calendarId, icon + challenge).then(activities => {
    const list = activities
      .reduce(activitiesByDate(challenge), [])
      .map(activityListItem).join('')
    const content = `<ul>
      <li><a href="#add/${challenge}">Add ${challenge}</a></li>
      ${list}
      <li><a href="#about">About</a></li>
      </ul>`
    callback(null, challenge, content)
  })
}

const challengeListItem = (challenge) => {
  return `<li><a href="#challenge/${challenge.id}">${challenge.summary}</a></li>`
}

const listChallenges = calendarId => (callback) => {
  console.log({ calendarId })
  getChallenges(calendarId, icon).then(challenges => {
    console.log({ challenges })
    if (!challenges.length) {
      const message = `No challenges -
        <a href="#new">Click here to add a new challenge</a>`
      return callback(message) // in error position
    }
    if (challenges.length === 1) {
      return callback(null, 'Only one event', '<p>Redirecting...</p>', `challenge/${challenges[0].id}`, 500)
    }
    const list = challenges.map(challengeListItem)
    callback(null, 'Challenges', `<ul>${list.join('')}</ul>`)
  })
}

const change = () => {
  window.scroll(0, 0)
  // if (!gapi.auth2.getAuthInstance().isSignedIn.get()) return // nothing for you here yet
  const hash = location.hash
  const path = hash.substr(1).split('/')
  console.log({ path })
  id('challenge').style.display = 'none'
  id('activity').style.display = 'none'
  id('about').style.display = 'none'
  switch (path[0]) {
    case 'add': return addActivity(path[1], null, updateContent)
    case 'challenge': return listActivities(path[1], updateContent)
    // case 'new': return addChallenge(null, updateContent)
    case 'signout': return signout(updateContent)
    case 'about': id('about').style.display = 'block'
  }
  console.log('just list challenges')
  listChallenges(calendarId)(updateContent)
}

/* if ('serviceWorker' in navigator) {
  const name = process.env.CI_PROJECT_NAME
  const path = name ? `/${name}` : ''
  const serviceWorker = name ? 'sw.min.js' : 'sw.js'
  if (name) navigator.serviceWorker.register(`${path}/${serviceWorker}`, { scope: `${path}/` })
} */

const tag = cE('script')
tag.src = 'https://apis.google.com/js/api.js'
aC(document.head, tag)
on(tag, 'load', () => {
  if (window.gapi) {
    on(window, 'load', () => {
      gapi.load('client:auth2', initClient)
    })
  } else {
    console.log('no gapi, maybe no cookies?')
  }

  on(id('authorise'), 'click', authorise)

  // start watching for hash change
  on(window, 'hashchange', change)
  // and change now
  location.hash = ''
})
