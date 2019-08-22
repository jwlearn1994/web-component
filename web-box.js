/*!
 * Web-Box.js v1.0.0
 * (c) 2019 Johnny Wang
 * Released under the MIT License.
 */
(function (global, factory){
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Box = factory());
}(this, function() { 'use strict';


  /*  */


  const isString = v => {
    return typeof v === 'string';
  }


  const def = (obj, key, opts) => {
    return Object.defineProperty(obj, key, opts);
  }


  /*  */


  const getNode = str => {
    return new DOMParser().parseFromString(str, 'text/html').body.childNodes[0];
  }
  
  const getTemp = id => {
    let temp = document.getElementById(id);
    if (temp === null) return;
    let content = temp.content.cloneNode(true);
    return content;
  }

  const createTemp = (id, html) => {
    if (getTemp(id)) return;
    let temp = document.createElement('template');
    temp.setAttribute('id', id);
    temp.content.appendChild(getNode(html));
    return document.body.insertAdjacentElement('afterbegin', temp);
  }

  const createStyle = (id, css) => {
    return Box.styles[id] = css;
  }


  /*  */


  const appendToNode = (t, arr) => {
    arr.forEach(v => {
      v ? t.appendChild(v) : false;
    })
  }


  /*  */


  const Box = function(id, { template, style, shadow = false }) {
    const self = this;
    def(self, 'node', {
      get() {
        return document.querySelector(id);
      }
    });
    // template 接受字串與node內容
    self.template = isString(template) ? getNode(template) : template;
    self.shadowRoot = null;
    self.style = null;

    // Style
    if (style) {
      let styleNode = document.createElement('style');
      let styleText = document.createTextNode(style);
      styleNode.appendChild(styleText);
      self.style = styleNode;
    }

    // Shadow
    if (shadow) {
      self.shadowRoot = self.node.attachShadow({ mode: 'open' });
      appendToNode(self.shadowRoot, [self.style, self.template]);
    } else {
      appendToNode(self.node, [self.style, self.template]);
    }

    return self;
  }


  /*  */


  // Tool Methods
  Box.getNode = getNode;
  Box.createTemp = createTemp;
  Box.getTemp = getTemp;
  Box.styles = Object.create(null);
  Box.createStyle = createStyle;
  
  return Box;

}));
