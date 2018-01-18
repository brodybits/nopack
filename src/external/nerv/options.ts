import { noop, CompositeComponent, StatelessComponent, VirtualNode } from '../nerv-shared/index.js'

export type optionsHook = (vnode: CompositeComponent | StatelessComponent) => void

const options: {
  afterMount: optionsHook
  afterUpdate: optionsHook
  beforeUnmount: optionsHook
  roots: VirtualNode[],
  debug: boolean
} = {
    afterMount: noop,
    afterUpdate: noop,
    beforeUnmount: noop,
    roots: [],
    debug: false
  }

export default options
