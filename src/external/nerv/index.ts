import Component from './component.js'
import PureComponent from './pure-component.js'
import { render } from './render.js'
import createElement from './create-element.js'
import cloneElement from './clone-element.js'
import { nextTick } from '../nerv-utils/index.js'
import { isValidElement } from '../nerv-shared/index.js'
import { Children } from './children.js'
import { hydrate } from './hydrate.js'
import options from './options.js'
import {
  unmountComponentAtNode,
  findDOMNode,
  createPortal,
  unstable_renderSubtreeIntoContainer,
  createFactory
} from './dom.js'

export {
  Children,
  Component,
  PureComponent,
  createElement,
  cloneElement,
  render,
  nextTick,
  options,
  findDOMNode,
  isValidElement,
  unmountComponentAtNode,
  createPortal,
  unstable_renderSubtreeIntoContainer,
  hydrate,
  createFactory
}

export default {
  Children,
  Component,
  PureComponent,
  createElement,
  cloneElement,
  render,
  nextTick,
  options,
  findDOMNode,
  isValidElement,
  unmountComponentAtNode,
  createPortal,
  unstable_renderSubtreeIntoContainer,
  hydrate,
  createFactory
} as any
