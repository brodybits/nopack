import {
    asObservableObject,
    defineObservableProperty,
    setPropertyValue
} from "../types/observableobject.js"
import { invariant, assertPropertyConfigurable } from "../utils/utils.js"
import { createClassPropertyDecorator } from "../utils/decorators.js"
import { IEnhancer } from "../types/modifiers.js"
import { getMessage } from "../utils/messages.js"

export function createDecoratorForEnhancer(enhancer: IEnhancer<any>) {
    invariant(!!enhancer, ":(")
    return createClassPropertyDecorator(
        (target, name, baseValue, _, baseDescriptor) => {
            assertPropertyConfigurable(target, name)
            invariant(!baseDescriptor || !baseDescriptor.get, getMessage("m022"))

            const adm = asObservableObject(target, undefined)
            defineObservableProperty(adm, name, baseValue, enhancer)
        },
        function(name) {
            const observable = this.$mobx.values[name]
            if (
                observable === undefined // See #505
            )
                return undefined
            return observable.get()
        },
        function(name, value) {
            setPropertyValue(this, name, value)
        },
        true,
        false
    )
}
