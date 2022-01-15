var pushups =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/* global gapi, location, localStorage */

var _require = __webpack_require__(1),
    apiKey = _require.apiKey,
    calendarId = _require.calendarId,
    clientId = _require.clientId,
    discoveryDocs = _require.discoveryDocs,
    icon = _require.icon,
    orderBy = _require.orderBy,
    scope = _require.scope,
    showDeleted = _require.showDeleted,
    singleEvents = _require.singleEvents,
    title = _require.title;

var _require2 = __webpack_require__(2),
    aC = _require2.aC,
    cE = _require2.cE,
    html = _require2.html,
    id = _require2.id,
    on = _require2.on;
// const timeMin = (new Date()).toISOString()


var redirectTimeout = 1000; // time to redirect

var instance = function instance(gapi) {
  return gapi.auth2.getAuthInstance();
};

var getFromStorage = function getFromStorage() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : calendarId;

  try {
    return JSON.parse(localStorage.getItem(id));
  } catch (e) {
    console.log('hmm', e);
  }
};

var store = function store(value) {
  var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : calendarId;

  try {
    localStorage.setItem(id, JSON.stringify(value));
  } catch (e) {
    console.log('hmm', e);
  }
};

var data = getFromStorage() || [];

/**
 *  Initialises the API client library and sets up sign-in state
 *  listeners.
 */
var initClient = function initClient() {
  gapi.client.init({ apiKey: apiKey, clientId: clientId, discoveryDocs: discoveryDocs, scope: scope }).then(function () {
    // Listen for sign-in state changes.
    instance(gapi).isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(instance(gapi).isSignedIn.get());
  });
};

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
var updateSigninStatus = function updateSigninStatus(isSignedIn) {
  id('authorise').style.display = isSignedIn ? 'none' : 'block';
  id('signout').style.display = isSignedIn ? 'list-item' : 'none';
  isSignedIn ? change() : updateContent();
};

/**
 *  Sign in the user upon button click.
 */
var authorise = function authorise(e) {
  gapi.auth2.getAuthInstance().signIn();
};

/**
 *  Sign out the user upon button click.
 */
var signout = function signout(callback) {
  gapi.auth2.getAuthInstance().signOut();
  callback(null, 'Signed you out', '', '', redirectTimeout);
};

var updateContent = function updateContent(err) {
  var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var whereNext = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var when = arguments[4];

  var content = null;
  if (err) {
    content = '<p>\u26A0\uFE0F ' + err + '</p>';
  } else {
    content = message;
    if (title) content = '<h2>' + title + '</h2>' + message;
  }
  html(id('content'), content);
  if (whereNext || when) {
    setTimeout(function () {
      location.hash = whereNext;
    }, when);
  }
};

var getEvents = function getEvents(calendarId, q, timeMin) {
  return gapi.client.calendar.events.list({ calendarId: calendarId, timeMin: timeMin, q: q, showDeleted: showDeleted, singleEvents: singleEvents, orderBy: orderBy }).then(function (response) {
    var events = response.result.items;
    if (!events || !events.length) return getFromStorage() || [];
    return events;
  }).catch(function (e) {
    return getFromStorage() || [];
  });
};

var getChallenges = function getChallenges(calendarId, q) {
  return new Promise(function (resolve, reject) {
    resolve([{ id: 'pushups', summary: 'Original pushup challenge' }, { id: 'situps', summary: 'Clare\'s situp challenge' }]);
  });
};

var getActivities = function getActivities(calendarId, q, timeMin) {
  return getEvents(calendarId, q, timeMin);
};

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
var delayedInsert = function delayedInsert(calendarId, resource) {
  var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  if (delay > 5000) return console.error('too many attempts, give up');
  delay += Math.floor(Math.random() * 300);
  setTimeout(function () {
    gapi.client.calendar.events.insert({ calendarId: calendarId, resource: resource }).execute(function (response) {
      switch (response.code) {
        case 403:
        case 429:
        case 503:
          console.log(response);
          return delayedInsert(calendarId, resource, delay);
      }
    });
  }, delay);
};

var insertActivity = function insertActivity(calendarId, challenge, number) {
  var summary = '' + icon + challenge + ' ' + number;
  var description = number + ' ' + challenge;
  var dateTime = new Date();
  var start = { dateTime: dateTime };
  var end = start;
  var url = location.origin;
  var source = { url: url, title: title };
  var resource = { description: description, start: start, end: end, source: source, summary: summary };
  delayedInsert(calendarId, resource);
  data.push(resource);
  store(data);
};

var addActivity = function addActivity(challenge, number, callback) {
  on(id('addActivity'), 'click', function (e) {
    e.preventDefault();
    addActivity(challenge, id('number').value, callback);
  });
  if (!number) {
    id('activity').style.display = 'block';
    return callback(null, 'Add activity', '<p>Add <a href="#challenge/' + challenge + '">' + challenge + '</a></p>');
  }
  insertActivity(calendarId, challenge, number);
  callback(null, 'Added activity', '<p>Added <a href="#challenge/' + challenge + '">' + challenge + '</a></p>', 'challenge/' + challenge, redirectTimeout);
};

var simplify = function simplify(activity) {
  var _activity$description = activity.description.split(/\W/),
      _activity$description2 = _slicedToArray(_activity$description, 2),
      number = _activity$description2[0],
      challenge = _activity$description2[1];

  number = Number(number);
  var date = activity.start.dateTime.substr(0, 10);
  return { challenge: challenge, number: number, date: date };
};

var activitiesByDate = function activitiesByDate(challenge) {
  return function (all, activity) {
    var simplified = simplify(activity);
    if (challenge !== simplified.challenge) return all;
    var existing = all.find(function (activity) {
      return activity.date === simplified.date;
    });
    if (existing) {
      existing.number += simplified.number;
    } else {
      all.push(simplified);
    }
    return all;
  };
};

var activityListItem = function activityListItem(activity) {
  return '<li>' + activity.number + ' ' + activity.challenge + ' (' + activity.date + ')';
};

var listActivities = function listActivities(challenge, callback) {
  getActivities(calendarId, icon + challenge).then(function (activities) {
    console.log(challenge, activities);
    var list = activities.reduce(activitiesByDate(challenge), []).map(activityListItem).join('');
    var content = '<ul>\n      <li><a href="#add/' + challenge + '">Add ' + challenge + '</a></li>\n      ' + list + '\n      </ul>';
    callback(null, challenge, content);
  });
};

var challengeListItem = function challengeListItem(challenge) {
  return '<li><a href="#challenge/' + challenge.id + '">' + challenge.summary + '</a></li>';
};

var listChallenges = function listChallenges(calendarId) {
  return function (callback) {
    getChallenges(calendarId, icon).then(function (challenges) {
      if (!challenges.length) {
        var message = 'No challenges -\n        <a href="#new">Click here to add a new challenge</a>';
        return callback(message); // in error position
      }
      if (challenges.length === 1) {
        return callback(null, 'Only one event', '<p>Redirecting...</p>', 'challenge/' + challenges[0].id, 500);
      }
      var list = challenges.map(challengeListItem);
      callback(null, 'Challenges', '<ul>' + list.join('') + '</ul>');
    });
  };
};

var change = function change() {
  window.scroll(0, 0);
  // if (!gapi.auth2.getAuthInstance().isSignedIn.get()) return // nothing for you here yet
  var hash = location.hash;
  var path = hash.substr(1).split('/');
  id('challenge').style.display = 'none';
  id('activity').style.display = 'none';
  switch (path[0]) {
    case 'add':
      return addActivity(path[1], null, updateContent);
    case 'challenge':
      return listActivities(path[1], updateContent);
    // case 'new': return addChallenge(null, updateContent)
    case 'signout':
      return signout(updateContent);
  }
  listChallenges(calendarId)(updateContent);
};

/* if ('serviceWorker' in navigator) {
  const name = process.env.CI_PROJECT_NAME
  const path = name ? `/${name}` : ''
  const serviceWorker = name ? 'sw.min.js' : 'sw.js'
  if (name) navigator.serviceWorker.register(`${path}/${serviceWorker}`, { scope: `${path}/` })
} */

var tag = cE('script');
tag.src = 'https://apis.google.com/js/api.js';
aC(document.head, tag);
on(tag, 'load', function () {
  if (window.gapi) {
    on(window, 'load', function () {
      gapi.load('client:auth2', initClient);
    });
  } else {
    console.log('no gapi, maybe no cookies?');
  }

  on(id('authorise'), 'click', authorise);

  // start watching for hash change
  on(window, 'hashchange', change);
  // and change now
  location.hash = '';
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  buildDate: new Date().toString().substr(4, 17),
  description: Object({"NODE_ENV":"production","CI_PROJECT_NAME":""}).npm_package_description,
  title: Object({"NODE_ENV":"production","CI_PROJECT_NAME":""}).name,
  // Client ID and API key from the Developer Console
  clientId: '1018048405199-urfev6k0pbf5hvkecalg87nk4ab1l4qq.apps.googleusercontent.com',
  apiKey: 'AIzaSyAl21iyJ6I3_hpI0pSt-qD7ZtKFXbpCgUo',
  icon: '💪',
  orderBy: 'startTime',
  singleEvents: true,
  calendarId: 'primary',
  // Array of API discovery doc URLs for APIs used by the quickstart
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  scope: 'https://www.googleapis.com/auth/calendar',
  serviceWorker: true, // Boolean(process.env.SERVICE_WORKER),
  session: {
    sameSite: true
  }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Microlibrary, to do everything I was using jquery for
 * Also run through my own forum / blog, looking for things to change
 * based on cookies etc
 *
 * gbbs was "grate bulletin board system" back in the day
 *
 * @author  Paul Clarke <paulypopex+js@gmail.com>
 */

/* global XMLHttpRequest */

// shortcuts for better compression
// this script makes a lot of use of document.foo === document['foo']
// document.fooBar can only be compressed to a.fooBar but
// document['fooBar'] can be compressed to a[b] - shorter, see
var _createElement = document.createElement.bind(document);
var addEventListener = 'addEventListener';
var removeChild = 'removeChild';
var innerHTML = 'innerHTML';

function _appendChild(element, child) {
  element.appendChild(child);
}

function _setInnerHTML(element, content) {
  // like $.html
  if (element) {
    if (typeof content === 'string') {
      element[innerHTML] = content;
      return;
    }
    while (element.lastChild) {
      element[removeChild](element.lastChild);
    }
    _appendChild(element, content);
  }
}

function _getElementsByTagName(id, context) {
  return (context || document).getElementsByTagName(id);
}

module.exports = {
  on: function on(element, event, callback) {
    // like $.on
    element[addEventListener](event, callback, false);
  },

  /* debug: function() {
    const console = window.console;
    console && console.log.apply(console, arguments);
  }, */
  id: document.getElementById.bind(document),
  tag: _getElementsByTagName,
  get: function get(url, callback, method, request) {
    // like $.get
    request = new XMLHttpRequest(); // don't support ie6!
    request.open(method || 'GET', url, true);
    request.onload = function () {
      callback(request.responseText, request.status);
    };
    request.send();
  },
  json: function json(url, done, tag, scriptName) {
    // like $.getJSON
    scriptName = '_cb' + new Date().getTime();
    tag = _createElement('script');
    tag.src = url.replace(/(\?|$)/, '?callback=' + scriptName + '&');
    _appendChild(document.body, tag);
    window[scriptName] = function (data) {
      done(data);
      delete window[scriptName];
      document.body[removeChild](tag);
    };
  },

  aC: _appendChild,
  cE: _createElement,
  html: _setInnerHTML
};

/***/ })
/******/ ]);