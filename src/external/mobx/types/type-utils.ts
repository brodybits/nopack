import { IDepTreeNode } from "../core/observable.js"
import { invariant, fail } from "../utils/utils.js"
import { runLazyInitializers } from "../utils/decorators.js"
import { isAtom } from "../core/atom.js"
import { isComputedValue } from "../core/computedvalue.js"
import { isReaction } from "../core/reaction.js"
import { isObservableArray } from "./observablearray.js"
import { isObservableMap } from "./observablemap.js"
import { isObservableObject } from "./observableobject.js"
import { getMessage } from "../utils/messages.js"

export function getAtom(thing: any, property?: string): IDepTreeNode {
    if (typeof thing === "object" && thing !== null) {
        if (isObservableArray(thing)) {
            invariant(property === undefined, getMessage("m036"))
            return (thing as any).$mobx.atom
        }
        if (isObservableMap(thing)) {
            const anyThing = thing as any
            if (property === undefined) return getAtom(anyThing._keys)
            const observable = anyThing._data[property] || anyThing._hasMap[property]
            invariant(
                !!observable,
                `the entry '${property}' does not exist in the observable map '${getDebugName(
                    thing
                )}'`
            )
            return observable
        }
        // Initializers run lazily when transpiling to babel, so make sure they are run...
        runLazyInitializers(thing)
        if (property && !thing.$mobx) thing[property] // See #1072 // TODO: remove in 4.0
        if (isObservableObject(thing)) {
            if (!property) return fail(`please specify a property`)
            const observable = (thing as any).$mobx.values[property]
            invariant(
                !!observable,
                `no observable property '${property}' found on the observable object '${getDebugName(
                    thing
                )}'`
            )
            return observable
        }
        if (isAtom(thing) || isComputedValue(thing) || isReaction(thing)) {
            return thing
        }
    } else if (typeof thing === "function") {
        if (isReaction(thing.$mobx)) {
            // disposer function
            return thing.$mobx
        }
    }
    return fail("Cannot obtain atom from " + thing)
}

export function getAdministration(thing: any, property?: string) {
    invariant(thing, "Expecting some object")
    if (property !== undefined) return getAdministration(getAtom(thing, property))
    if (isAtom(thing) || isComputedValue(thing) || isReaction(thing)) return thing
    if (isObservableMap(thing)) return thing
    // Initializers run lazily when transpiling to babel, so make sure they are run...
    runLazyInitializers(thing)
    if (thing.$mobx) return thing.$mobx
    invariant(false, "Cannot obtain administration from " + thing)
}

export function getDebugName(thing: any, property?: string): string {
    let named
    if (property !== undefined) named = getAtom(thing, property)
    else if (isObservableObject(thing) || isObservableMap(thing)) named = getAdministration(thing)
    else named = getAtom(thing) // valid for arrays as well
    return named.name
}
