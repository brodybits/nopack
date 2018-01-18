import { isNullOrUndef, isInvalid, VType, VirtualChildren } from '../../nerv-shared/index.js'
import { isAttrAnEvent, isArray } from '../../nerv-utils/index.js'
import Ref from './ref.js'
import { detachEvent } from '../event.js'
import options from '../options.js'

export function unmountChildren (
  children: VirtualChildren,
  parentDom?: Element
) {
  if (isArray(children)) {
    for (let i = 0, len = children.length; i < len; i++) {
      unmount(children[i], parentDom)
    }
  } else {
    unmount(children, parentDom)
  }
}

export function unmount (vnode, parentDom?) {
  if (isInvalid(vnode)) {
    return
  }
  const vtype = vnode.vtype
  // Bitwise operators for better performance
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators
  const dom = vtype & VType.Composite ? vnode.component.dom : vnode.dom

  if ((vtype & (VType.Composite | VType.Stateless)) > 0) {
    options.beforeUnmount(vnode)
    vnode.destroy()
  } else if ((vtype & VType.Node) > 0) {
    const { props, children, ref } = vnode
    unmountChildren(children)
    for (const propName in props) {
      if (isAttrAnEvent(propName)) {
        detachEvent(dom, propName, props[propName])
      }
    }
    if (ref !== null) {
      Ref.detach(vnode, ref, dom)
    }
  }

  if (!isNullOrUndef(parentDom) && !isNullOrUndef(dom)) {
    parentDom.removeChild(dom)
  }
  // vnode.dom = null
}
