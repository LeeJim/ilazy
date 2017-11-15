
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(function() {
      return factory(root)
    })
  } else if (typeof exports === 'object') {
    module.exports = factory
  } else {
    root.ilazy = factory(root)
  }
})(this, function (root, debug) {

  var ilazy = {}

  var offset, view, container

  debug = debug || function() {}

  var inView = function(elem, view) {
    if (elem == null || elem.nodeType !== 1) {
      return false
    }
    var rect = elem.getBoundingClientRect()
    debug('target elem top: %d, bottom: %d', rect.top, rect.bottom)
    return rect.bottom >= view.top && rect.top <= view.bottom
  }

  ilazy.autoLoad = function() {
    var nodes = document.querySelectorAll('[data-ilazy], [data-ilazy-background]')
    var length = nodes.length
    var node = null

    if (length === 0) {
      ilazy.unload()
    }

    for (var i = 0; i < length; i++) {
      node = nodes[i]
      if (inView(node, view)) {
        debug('elem %s is in view', node)
        var imageSrc = node.getAttribute('src')
        var ilazySrc = node.getAttribute('data-ilazy')
        var bgSrc = node.getAttribute('data-ilazy-background')

        if (imageSrc == null || imageSrc !== ilazySrc) {
          node.src = ilazySrc
        } else if (bgSrc != null) {
          node.style.backgroundImage = 'url(' + bgSrc + ');'
        }
      }
    }
  }

  ilazy.init = function(opts) {
    opts = opts || {}
    offset = opts.offset || 30
    container = opts.container ? document.querySelector(opts.container) : root
    view = {
      top: 0,
      bottom: (root.innerHeight || document.documentElement.clientHeight) + offset
    }

    if (document.addEventListener) {
      container.addEventListener('scroll', ilazy.autoLoad, false)
      root.addEventListener('load', ilazy.autoLoad, false)
    } else if (document.attachEvent) {
      container.attachEvent('onScroll', ilazy.autoLoad, false)
      root.attachEvent('onLoad', ilazy.autoLoad, false)
    } else {
      container.onScroll = ilazy.autoLoad
      root.onLoad = ilazy.autoLoad
    }
  }

  ilazy.unload = function() {
    if (document.removeEventListener) {
      container.removeEventListener('scroll', ilazy.autoLoad, false)
      root.removeEventListener('load', ilazy.autoLoad, false)
    } else if (document.distachEvent) {
      container.distachEvent('onScroll', ilazy.autoLoad, false)
      root.distachEvent('onLoad', ilazy.autoLoad, false)
    } else {
      container.onScroll = null
      root.onLoad = null
    }
  }

  return ilazy
});
