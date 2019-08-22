/*!
 * VNode.js v1.0.0
 * (c) 2019 Johnny Wang
 * Released under the MIT License.
 */
(function (global, factory){
  // Nodejs 環境
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  // AMD 環境
  typeof define === 'function' && define.amd ? define(factory) :
  // Browser 環境
  (global = global || self, global.VNode = factory());
}(this, function() { 'use strict';


  /*  */


  const isString = v => {
    return typeof v === 'string';
  }


  /*  */


  const renderChild = v => {
    if (isString(v)) {
      return document.createTextNode(v);
    }
    return v;
  }

  
  const setPropers = (t, attrs, children) => {
    // set Attribute
    for (let key in attrs) {
      t.setAttribute(key, attrs[key])
    }
    // set Children
    for (let child of children) {
      t.appendChild(renderChild(child));
    }
  }


  const el = (tag, attrs, children, shadow) => {
    let elmnt = document.createElement(tag);
    let shaRoot;

    // Shadow Check Open & Support
    if (shadow && elmnt.attachShadow) {
      shaRoot = elmnt.attachShadow({ mode: 'open' });
      setPropers(shaRoot, attrs, children);
      return elmnt;
    }

    setPropers(elmnt, attrs, children);
    return elmnt;
  }


  /*  */
  

  const VNode = function(tag, { attrs={}, children=[], shadow=false }={}) {
    const vElement = Object.create(null);

    Object.assign(vElement, {
      tag,
      attrs,
      children,
      shadow,
      node: el(tag, attrs, children, shadow),
    });

    return vElement;
  }

  return VNode;

}));