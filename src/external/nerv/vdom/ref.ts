import { isFunction, isString } from '../../nerv-utils/index.js'
import { isComposite } from '../../nerv-shared/index.js'

export default {
  update (lastVnode, nextVnode, domNode?) {
    const prevRef = lastVnode != null && lastVnode.props.ref
    const nextRef = nextVnode != null && nextVnode.props.ref

    if (prevRef !== nextRef) {
      if (!isFunction(prevRef) || !isFunction(nextRef)) {
        this.detach(lastVnode, prevRef, lastVnode.dom)
      }
      this.attach(nextVnode, nextRef, domNode)
    }
  },
  attach (vnode, ref, domNode: Element) {
    const node = isComposite(vnode) ? vnode.component : domNode
    if (isFunction(ref)) {
      ref(node)
    } else if (isString(ref)) {
      const inst = vnode._owner
      if (inst && isFunction(inst.render)) {
        inst.refs[ref] = node
      }
    }
  },
  detach (vnode, ref, domNode: Element) {
    const node = isComposite(vnode) ? vnode.component : domNode
    if (isFunction(ref)) {
      ref(null)
    } else if (isString(ref)) {
      const inst = vnode._owner
      if (inst.refs[ref] === node && isFunction(inst.render)) {
        delete inst.refs[ref]
      }
    }
  }
}
