import { VType, Component, CompositeComponent } from '../nerv-shared/index.js'
import {
  mountComponent,
  reRenderComponent,
  unmountComponent
} from './lifecycle.js'

class ComponentWrapper implements CompositeComponent {
  vtype = VType.Composite
  type: any
  name: string
  _owner: any
  props: any
  component: Component<any, any>
  context: any
  key: any
  dom: Element | null
  _rendered: any

  constructor (type, props) {
    this.type = type
    this.name = type.name || type.toString().match(/^function\s*([^\s(]+)/)[1]
    type.displayName = this.name
    this._owner = props.owner
    delete props.owner
    this.props = props
    this.key = props.key
    this.dom = null
  }

  init (parentContext, parentComponent) {
    return mountComponent(this, parentContext, parentComponent)
  }

  update (previous, current, parentContext, domNode?) {
    return reRenderComponent(previous, this)
  }

  destroy () {
    unmountComponent(this)
  }
}

export default ComponentWrapper
