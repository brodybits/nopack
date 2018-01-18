import { VType } from '../nerv-shared/index.js'
import { isFunction } from '../nerv-utils/index.js'
import {
  mountStatelessComponent,
  unmountStatelessComponent,
  reRenderStatelessComponent
} from './lifecycle.js'

class StateLessComponent {
  vtype = VType.Stateless
  type: Function
  name: string
  _owner: any
  props: any
  _rendered: any
  key: any
  dom: Element | null
  constructor (type, props) {
    this.type = type
    this._owner = props.owner
    delete props.owner
    this.props = props
    this.key = props.key
  }

  init (parentContext) {
    return mountStatelessComponent(this, parentContext)
  }

  update (previous, current, parentContext, domNode?) {
    const { props, context } = current
    const shouldComponentUpdate = props.onShouldComponentUpdate
    if (
      isFunction(shouldComponentUpdate) &&
      !shouldComponentUpdate(previous.props, props, context)
    ) {
      return domNode
    }
    return reRenderStatelessComponent(previous, this, parentContext, domNode)
  }

  destroy () {
    unmountStatelessComponent(this)
  }
}

export default StateLessComponent
