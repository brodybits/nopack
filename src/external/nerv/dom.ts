import { isValidElement } from '../nerv-shared/index.js'
import { render } from './render.js'
import { unmount } from './vdom/unmount.js'
import createElement from './create-element.js'
import Component from './component.js'

export function unmountComponentAtNode (dom) {
  const component = dom._component
  if (isValidElement(component)) {
    unmount(component, dom)
    delete dom._component
    return true
  }
  return false
}

export function findDOMNode (component) {
  return component && component.dom || component
}

export function createFactory (type) {
  return createElement.bind(null, type)
}

class WrapperComponent<P, S> extends Component<P, S> {
  getChildContext () {
    // tslint:disable-next-line
    return this.props.context
  }

  render () {
    return this.props.children
  }
}

export function unstable_renderSubtreeIntoContainer (
  parentComponent,
  vnode,
  container,
  callback
) {
  // @TODO: should handle props.context?
  const wrapper = createElement(
    WrapperComponent,
    { context: parentComponent.context },
    vnode
  )
  const rendered = render(wrapper as any, container)
  if (callback) {
    callback.call(rendered)
  }
  return rendered
}

export function createPortal (vnode, container: Element) {
  // mountVNode can handle array of vnodes for us
  render(vnode, container)
  return null
}
