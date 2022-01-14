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
const _createElement = document.createElement.bind(document)
const addEventListener = 'addEventListener'
const removeChild = 'removeChild'
const innerHTML = 'innerHTML'

function _appendChild (element, child) {
  element.appendChild(child)
}

function _setInnerHTML (element, content) { // like $.html
  if (element) {
    if (typeof content === 'string') {
      element[innerHTML] = content
      return
    }
    while (element.lastChild) {
      element[removeChild](element.lastChild)
    }
    _appendChild(element, content)
  }
}

function _getElementsByTagName (id, context) {
  return (context || document).getElementsByTagName(id)
}

module.exports = {
  on (element, event, callback) { // like $.on
    element[addEventListener](event, callback, false)
  },
  /* debug: function() {
    const console = window.console;
    console && console.log.apply(console, arguments);
  }, */
  id: document.getElementById.bind(document),
  tag: _getElementsByTagName,
  get (url, callback, method, request) { // like $.get
    request = new XMLHttpRequest() // don't support ie6!
    request.open(method || 'GET', url, true)
    request.onload = function () {
      callback(request.responseText, request.status)
    }
    request.send()
  },
  json (url, done, tag, scriptName) { // like $.getJSON
    scriptName = '_cb' + (new Date()).getTime()
    tag = _createElement('script')
    tag.src = url.replace(/(\?|$)/, '?callback=' + scriptName + '&')
    _appendChild(document.body, tag)
    window[scriptName] = function (data) {
      done(data)
      delete window[scriptName]
      document.body[removeChild](tag)
    }
  },
  aC: _appendChild,
  cE: _createElement,
  html: _setInnerHTML
}
