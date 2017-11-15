
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
})(this, function (root) {

  var ilazy = {}
  var offset, view
  var inView = function(elem, view) {
    if (elem == null || elem.nodeType !== 1) {
      return false
    }
    const rect = elem.getBoundingClientRect()
    return rect.bottom >= view.top && rect.top <= view.bottom
  }

  ilazy.autoLoad = function() {
    var nodes = document.querySelectorAll('[data-ilazy]')
    var length = nodes.length
    var node = null

    for (var i = 0; i < length; i++) {
      node = nodes[i]
      if (inView(node, view)) {
        var imageSrc = node.getAttribute('src')
        var ilazySrc = node.getAttribute('data-ilazy')

        if (imageSrc == null || imageSrc !== ilazySrc) {
          node.setAttribute('src', ilazySrc)
        }
      }
    }
  }

  ilazy.init = function(opts) {
    opts = opts || {}
    offset = opts.offset || 30
    view = {
      top: 0,
      bottom: root.innerHeight || document.documentElement.clientHeight
    }

    if (document.addEventListener) {
      root.addEventListener('scroll', ilazy.autoLoad, false)
      root.addEventListener('load', ilazy.autoLoad, false)
    } else if (document.attachEvent) {
      root.attachEvent('onScroll', ilazy.autoLoad, false)
      root.attachEvent('onLoad', ilazy.autoLoad, false)
    } else {
      root.onScroll = ilazy.autoLoad
      root.onLoad = ilazy.autoLoad
    }
  }

  ilazy.upload = function() {
    if (document.addEventListener) {
      root.removeEventListener('scroll', ilazy.autoLoad, false)
      root.removeEventListener('load', ilazy.autoLoad, false)
    } else if (document.attachEvent) {
      root.distachEvent('onScroll', ilazy.autoLoad, false)
      root.distachEvent('onLoad', ilazy.autoLoad, false)
    } else {
      root.onScroll = null
      root.onLoad = null
    }
  }

  return ilazy
});
