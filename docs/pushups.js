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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./config.js":
/*!*******************!*\
  !*** ./config.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = {\n  buildDate: new Date().toString().substr(4, 17),\n  description: Object({\"NODE_ENV\":\"development\",\"CI_PROJECT_NAME\":\"\"}).npm_package_description,\n  title: Object({\"NODE_ENV\":\"development\",\"CI_PROJECT_NAME\":\"\"}).name,\n  // Client ID and API key from the Developer Console\n  clientId: '1018048405199-urfev6k0pbf5hvkecalg87nk4ab1l4qq.apps.googleusercontent.com',\n  apiKey: 'AIzaSyAl21iyJ6I3_hpI0pSt-qD7ZtKFXbpCgUo',\n  icon: '💪',\n  orderBy: 'startTime',\n  singleEvents: true,\n  calendarId: 'primary',\n  // Array of API discovery doc URLs for APIs used by the quickstart\n  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],\n  // Authorization scopes required by the API; multiple scopes can be\n  // included, separated by spaces.\n  scope: 'https://www.googleapis.com/auth/calendar',\n  serviceWorker: true, // Boolean(process.env.SERVICE_WORKER),\n  session: {\n    sameSite: true\n  }\n};\n\n//# sourceURL=webpack://%5Bname%5D/./config.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\n/* global gapi, location, localStorage */\n\nvar _require = __webpack_require__(/*! ../config */ \"./config.js\"),\n    apiKey = _require.apiKey,\n    calendarId = _require.calendarId,\n    clientId = _require.clientId,\n    discoveryDocs = _require.discoveryDocs,\n    icon = _require.icon,\n    orderBy = _require.orderBy,\n    scope = _require.scope,\n    showDeleted = _require.showDeleted,\n    singleEvents = _require.singleEvents,\n    title = _require.title;\n\nvar _require2 = __webpack_require__(/*! ./js */ \"./src/js.js\"),\n    aC = _require2.aC,\n    cE = _require2.cE,\n    html = _require2.html,\n    id = _require2.id,\n    on = _require2.on;\n// const timeMin = (new Date()).toISOString()\n\n\nvar redirectTimeout = 1000; // time to redirect\n\nvar instance = function instance(gapi) {\n  return gapi.auth2.getAuthInstance();\n};\n\nvar getFromStorage = function getFromStorage() {\n  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : calendarId;\n\n  try {\n    return JSON.parse(localStorage.getItem(id));\n  } catch (e) {\n    console.log('hmm', e);\n  }\n};\n\nvar store = function store(value) {\n  var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : calendarId;\n\n  try {\n    localStorage.setItem(id, JSON.stringify(value));\n  } catch (e) {\n    console.log('hmm', e);\n  }\n};\n\nvar data = getFromStorage() || [];\n\n/**\n *  Initialises the API client library and sets up sign-in state\n *  listeners.\n */\nvar initClient = function initClient() {\n  gapi.client.init({ apiKey: apiKey, clientId: clientId, discoveryDocs: discoveryDocs, scope: scope }).then(function () {\n    // Listen for sign-in state changes.\n    instance(gapi).isSignedIn.listen(updateSigninStatus);\n\n    // Handle the initial sign-in state.\n    updateSigninStatus(instance(gapi).isSignedIn.get());\n  });\n};\n\n/**\n *  Called when the signed in status changes, to update the UI\n *  appropriately. After a sign-in, the API is called.\n */\nvar updateSigninStatus = function updateSigninStatus(isSignedIn) {\n  id('authorise').style.display = isSignedIn ? 'none' : 'block';\n  id('signout').style.display = isSignedIn ? 'list-item' : 'none';\n  change();\n};\n\n/**\n *  Sign in the user upon button click.\n */\nvar authorise = function authorise(e) {\n  gapi.auth2.getAuthInstance().signIn();\n};\n\n/**\n *  Sign out the user upon button click.\n */\nvar signout = function signout(callback) {\n  gapi.auth2.getAuthInstance().signOut();\n  callback(null, 'Signed you out', '', '', redirectTimeout * 2);\n};\n\nvar updateContent = function updateContent(err) {\n  var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';\n  var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';\n  var whereNext = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';\n  var when = arguments[4];\n\n  var content = null;\n  if (err) {\n    content = '<p>\\u26A0\\uFE0F ' + err + '</p>';\n  } else {\n    content = message;\n    if (title) content = '<h2>' + title + '</h2>' + message;\n  }\n  html(id('content'), content);\n  if (whereNext || when) {\n    setTimeout(function () {\n      location.hash = whereNext;\n    }, when);\n  }\n};\n\nvar getEvents = function getEvents(calendarId, q, timeMin) {\n  return gapi.client.calendar.events.list({ calendarId: calendarId, timeMin: timeMin, q: q, showDeleted: showDeleted, singleEvents: singleEvents, orderBy: orderBy }).then(function (response) {\n    var events = response.result.items;\n    if (!events || !events.length) return getFromStorage() || [];\n    return events;\n  }).catch(function (e) {\n    return getFromStorage() || [];\n  });\n};\n\nvar getChallenges = function getChallenges(calendarId, q) {\n  return new Promise(function (resolve, reject) {\n    resolve([{ id: 'pushups', summary: 'Original pushup challenge' }, { id: 'situps', summary: 'Clare\\'s situp challenge' }]);\n  });\n};\n\nvar getActivities = function getActivities(calendarId, q, timeMin) {\n  return getEvents(calendarId, q, timeMin).then(function (events) {\n    console.log('compare', events, 'with', getFromStorage(), 'and update if necessary');\n    return events;\n  });\n};\n\n/*\n\non(id('addChallenge'), 'click', e => {\n  e.preventDefault()\n  addChallenge(id('name').value, callback)\n})\n\nconst addChallenge = (name, callback) => {\n  if (!name) {\n    id('challenge').style.display = 'block'\n    return callback(null, 'Add challenge', '<p>Give your new challenge a name and date range below</p>')\n  }\n  const summary = `${name} ${icon}`\n  const start = { dateTime: new Date() }\n  const end = { dateTime: new Date() }\n  const resource = { summary, start, end }\n  gapi.client.calendar.events.insert({ calendarId, resource }).execute(challenge => {\n    callback(null, 'Added challenge', '', `challenge/${challenge.id}`, redirectTimeout)\n  })\n} */\n\n// keep retrying but with a bigger gap each time\nvar delayedInsert = function delayedInsert(calendarId, resource) {\n  var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;\n\n  if (delay > 5000) return console.error('too many attempts, give up');\n  delay += Math.floor(Math.random() * 300);\n  setTimeout(function () {\n    gapi.client.calendar.events.insert({ calendarId: calendarId, resource: resource }).execute(function (response) {\n      switch (response.code) {\n        case 403:\n        case 429:\n        case 503:\n          console.log(response);\n          return delayedInsert(calendarId, resource, delay);\n      }\n    });\n  }, delay);\n};\n\nvar insertActivity = function insertActivity(calendarId, challenge, number) {\n  var summary = '' + icon + challenge + ' ' + number;\n  var description = number + ' ' + challenge;\n  var dateTime = new Date();\n  var start = { dateTime: dateTime };\n  var end = start;\n  var url = location.origin;\n  var source = { url: url, title: title };\n  var resource = { description: description, start: start, end: end, source: source, summary: summary };\n  delayedInsert(calendarId, resource);\n  data.push(resource);\n  store(data);\n};\n\nvar addActivity = function addActivity(challenge, number, callback) {\n  id('addActivity').onclick = function (e) {\n    e.preventDefault();\n    addActivity(challenge, id('number').value, callback);\n  };\n  if (!number) {\n    id('activity').style.display = 'block';\n    return callback(null, 'Add activity', '<p>Add <a href=\"#challenge/' + challenge + '\">' + challenge + '</a></p>');\n  }\n  insertActivity(calendarId, challenge, number);\n  callback(null, 'Added activity', '<p>Added <a href=\"#challenge/' + challenge + '\">' + challenge + '</a></p>', 'challenge/' + challenge, redirectTimeout);\n};\n\nvar simplify = function simplify(activity) {\n  var _activity$description = activity.description.split(/\\W/),\n      _activity$description2 = _slicedToArray(_activity$description, 2),\n      number = _activity$description2[0],\n      challenge = _activity$description2[1];\n\n  number = Number(number);\n  var date = activity.start.dateTime.substr(0, 10);\n  return { challenge: challenge, number: number, date: date };\n};\n\nvar activitiesByDate = function activitiesByDate(challenge) {\n  return function (all, activity) {\n    var simplified = simplify(activity);\n    if (challenge !== simplified.challenge) return all;\n    var existing = all.find(function (activity) {\n      return activity.date === simplified.date;\n    });\n    if (existing) {\n      existing.number += simplified.number;\n    } else {\n      all.push(simplified);\n    }\n    return all;\n  };\n};\n\nvar activityListItem = function activityListItem(activity) {\n  return '<li>' + activity.number + ' ' + activity.challenge + ' (' + activity.date + ')';\n};\n\nvar listActivities = function listActivities(challenge, callback) {\n  getActivities(calendarId, icon + challenge).then(function (activities) {\n    var list = activities.reduce(activitiesByDate(challenge), []).map(activityListItem).join('');\n    var content = '<ul>\\n      <li><a href=\"#add/' + challenge + '\">Add ' + challenge + '</a></li>\\n      ' + list + '\\n      <li><a href=\"#about\">About</a></li>\\n      </ul>';\n    callback(null, challenge, content);\n  });\n};\n\nvar challengeListItem = function challengeListItem(challenge) {\n  return '<li><a href=\"#challenge/' + challenge.id + '\">' + challenge.summary + '</a></li>';\n};\n\nvar listChallenges = function listChallenges(calendarId) {\n  return function (callback) {\n    console.log({ calendarId: calendarId });\n    getChallenges(calendarId, icon).then(function (challenges) {\n      console.log({ challenges: challenges });\n      if (!challenges.length) {\n        var message = 'No challenges -\\n        <a href=\"#new\">Click here to add a new challenge</a>';\n        return callback(message); // in error position\n      }\n      if (challenges.length === 1) {\n        return callback(null, 'Only one event', '<p>Redirecting...</p>', 'challenge/' + challenges[0].id, 500);\n      }\n      var list = challenges.map(challengeListItem);\n      callback(null, 'Challenges', '<ul>' + list.join('') + '</ul>');\n    });\n  };\n};\n\nvar change = function change() {\n  window.scroll(0, 0);\n  // if (!gapi.auth2.getAuthInstance().isSignedIn.get()) return // nothing for you here yet\n  var hash = location.hash;\n  var path = hash.substr(1).split('/');\n  console.log({ path: path });\n  id('challenge').style.display = 'none';\n  id('activity').style.display = 'none';\n  id('about').style.display = 'none';\n  switch (path[0]) {\n    case 'add':\n      return addActivity(path[1], null, updateContent);\n    case 'challenge':\n      return listActivities(path[1], updateContent);\n    // case 'new': return addChallenge(null, updateContent)\n    case 'signout':\n      return signout(updateContent);\n    case 'about':\n      id('about').style.display = 'block';\n  }\n  listChallenges(calendarId)(updateContent);\n};\n\n/* if ('serviceWorker' in navigator) {\n  const name = process.env.CI_PROJECT_NAME\n  const path = name ? `/${name}` : ''\n  const serviceWorker = name ? 'sw.min.js' : 'sw.js'\n  if (name) navigator.serviceWorker.register(`${path}/${serviceWorker}`, { scope: `${path}/` })\n} */\n\nvar tag = cE('script');\ntag.src = 'https://apis.google.com/js/api.js';\naC(document.head, tag);\non(tag, 'load', function () {\n  if (window.gapi) {\n    on(window, 'load', function () {\n      gapi.load('client:auth2', initClient);\n    });\n  } else {\n    console.log('no gapi, maybe no cookies?');\n  }\n\n  on(id('authorise'), 'click', authorise);\n\n  // start watching for hash change\n  on(window, 'hashchange', change);\n  // and change now\n  location.hash = '';\n});\n\n//# sourceURL=webpack://%5Bname%5D/./src/index.js?");

/***/ }),

/***/ "./src/js.js":
/*!*******************!*\
  !*** ./src/js.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Microlibrary, to do everything I was using jquery for\n * Also run through my own forum / blog, looking for things to change\n * based on cookies etc\n *\n * gbbs was \"grate bulletin board system\" back in the day\n *\n * @author  Paul Clarke <paulypopex+js@gmail.com>\n */\n\n/* global XMLHttpRequest */\n\n// shortcuts for better compression\n// this script makes a lot of use of document.foo === document['foo']\n// document.fooBar can only be compressed to a.fooBar but\n// document['fooBar'] can be compressed to a[b] - shorter, see\nvar _createElement = document.createElement.bind(document);\nvar addEventListener = 'addEventListener';\nvar removeChild = 'removeChild';\nvar innerHTML = 'innerHTML';\n\nfunction _appendChild(element, child) {\n  element.appendChild(child);\n}\n\nfunction _setInnerHTML(element, content) {\n  // like $.html\n  if (element) {\n    if (typeof content === 'string') {\n      element[innerHTML] = content;\n      return;\n    }\n    while (element.lastChild) {\n      element[removeChild](element.lastChild);\n    }\n    _appendChild(element, content);\n  }\n}\n\nfunction _getElementsByTagName(id, context) {\n  return (context || document).getElementsByTagName(id);\n}\n\nmodule.exports = {\n  on: function on(element, event, callback) {\n    // like $.on\n    element[addEventListener](event, callback, false);\n  },\n\n  id: document.getElementById.bind(document),\n  tag: _getElementsByTagName,\n  get: function get(url, callback, method, request) {\n    // like $.get\n    request = new XMLHttpRequest(); // don't support ie6!\n    request.open(method || 'GET', url, true);\n    request.onload = function () {\n      callback(request.responseText, request.status);\n    };\n    request.send();\n  },\n  json: function json(url, done, tag, scriptName) {\n    // like $.getJSON\n    scriptName = '_cb' + new Date().getTime();\n    tag = _createElement('script');\n    tag.src = url.replace(/(\\?|$)/, '?callback=' + scriptName + '&');\n    _appendChild(document.body, tag);\n    window[scriptName] = function (data) {\n      done(data);\n      delete window[scriptName];\n      document.body[removeChild](tag);\n    };\n  },\n\n  aC: _appendChild,\n  cE: _createElement,\n  html: _setInnerHTML\n};\n\n//# sourceURL=webpack://%5Bname%5D/./src/js.js?");

/***/ })

/******/ });