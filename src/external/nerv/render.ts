import { mountVNode, flushMount } from './lifecycle.js'
import { isString, isNumber } from '../nerv-utils/index.js'
import { isWidget, isVNode, VNode, VirtualNode } from '../nerv-shared/index.js'
import { patch } from './vdom/patch.js'
import options from './options.js'

function isVChild (vnode): vnode is string | number | VNode {
  return isVNode(vnode) || isString(vnode) || isNumber(vnode)
}

export function render (
  vnode: VirtualNode,
  container: Element,
  callback?: Function
) {
  if (!isVChild(vnode) && !isWidget(vnode)) {
    return null
  }
  /* istanbul ignore if */
  if (!container) {
    throw new Error(`${container} should be a DOM Element`)
  }
  const lastVnode = (container as any)._component
  let dom
  options.roots.push(vnode)
  if (lastVnode !== undefined) {
    options.roots = options.roots.filter((item) => item !== lastVnode)
    dom = patch(lastVnode, vnode, container, {})
  } else {
    dom = mountVNode(vnode, {})
    container.appendChild(dom)
  }

  if (container) {
    (container as any)._component = vnode
  }
  flushMount()

  if (callback) {
    callback()
  }

  return (vnode as any).component || dom
}
