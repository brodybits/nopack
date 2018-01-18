/**
 * (c) Michel Weststrate 2015 - 2016
 * MIT Licensed
 *
 * Welcome to the mobx sources! To get an global overview of how MobX internally works,
 * this is a good place to start:
 * https://medium.com/@mweststrate/becoming-fully-reactive-an-in-depth-explanation-of-mobservable-55995262a254#.xvbh6qd74
 *
 * Source folders:
 * ===============
 *
 * - api/     Most of the public static methods exposed by the module can be found here.
 * - core/    Implementation of the MobX algorithm; atoms, derivations, reactions, dependency trees, optimizations. Cool stuff can be found here.
 * - types/   All the magic that is need to have observable objects, arrays and values is in this folder. Including the modifiers like `asFlat`.
 * - utils/   Utility stuff.
 *
 */

export { IObservable, IDepTreeNode } from "./core/observable.js"
export { Reaction, IReactionPublic, IReactionDisposer } from "./core/reaction.js"
export { IDerivation, untracked, IDerivationState } from "./core/derivation.js"

// NOTE: For some reason, rollup's dependency tracker gets confused
// if this line is above the previous 3, and will produce out of order
// class definitions where BaseAtom is undefined, causing an error.
// It's not ideal, but for now we can just make sure this line comes after
// the ones above
export { IAtom, Atom, BaseAtom } from "./core/atom.js"

export { useStrict, isStrictModeEnabled, IAction } from "./core/action.js"
export { spy } from "./core/spy.js"
export { IComputedValue } from "./core/computedvalue.js"

export { IEqualsComparer, comparer } from "./types/comparer.js"
export { asReference, asFlat, asStructure, asMap } from "./types/modifiers-old.js"
export { IModifierDescriptor, IEnhancer, isModifierDescriptor } from "./types/modifiers.js"
export { IInterceptable, IInterceptor } from "./types/intercept-utils.js"
export { IListenable } from "./types/listen-utils.js"
export {
    IObjectWillChange,
    IObjectChange,
    IObservableObject,
    isObservableObject
} from "./types/observableobject.js"

export {
    IValueDidChange,
    IValueWillChange,
    IObservableValue,
    isObservableValue as isBoxedObservable
} from "./types/observablevalue.js"
export {
    IObservableArray,
    IArrayWillChange,
    IArrayWillSplice,
    IArrayChange,
    IArraySplice,
    isObservableArray
} from "./types/observablearray.js"
export {
    IKeyValueMap,
    ObservableMap,
    IMapEntries,
    IMapEntry,
    IMapWillChange,
    IMapChange,
    IMapChangeUpdate,
    IMapChangeAdd,
    IMapChangeBase,
    IMapChangeDelete,
    isObservableMap,
    map,
    IObservableMapInitialValues,
    IMap
} from "./types/observablemap.js"

export { transaction } from "./api/transaction.js"
export { observable, IObservableFactory, IObservableFactories } from "./api/observable.js"
export { computed, IComputed, IComputedValueOptions } from "./api/computed.js"
export { isObservable } from "./api/isobservable.js"
export { isComputed } from "./api/iscomputed.js"
export { extendObservable, extendShallowObservable } from "./api/extendobservable.js"
export { observe } from "./api/observe.js"
export { intercept } from "./api/intercept.js"
export { autorun, autorunAsync, when, reaction, IReactionOptions } from "./api/autorun.js"
export { action, isAction, runInAction, IActionFactory } from "./api/action.js"

export { expr } from "./api/expr.js"
export { toJS } from "./api/tojs.js"
export { ITransformer, createTransformer } from "./api/createtransformer.js"
export { whyRun } from "./api/whyrun.js"

export { Lambda, isArrayLike } from "./utils/utils.js"
export { Iterator } from "./utils/iterable.js"
export { IObserverTree, IDependencyTree } from "./api/extras.js"

import {
    resetGlobalState,
    shareGlobalState,
    getGlobalState,
    isolateGlobalState
} from "./core/globalstate.js"
import { IDerivation } from "./core/derivation.js"
import { IDepTreeNode } from "./core/observable.js"
import { IObserverTree, IDependencyTree, getDependencyTree, getObserverTree } from "./api/extras.js"
import { getDebugName, getAtom, getAdministration } from "./types/type-utils.js"
import { allowStateChanges } from "./core/action.js"
import { spyReport, spyReportEnd, spyReportStart, isSpyEnabled } from "./core/spy.js"
import { Lambda, deepEqual } from "./utils/utils.js"
import { isComputingDerivation } from "./core/derivation.js"
import { setReactionScheduler, onReactionError } from "./core/reaction.js"
import { reserveArrayBuffer, IObservableArray } from "./types/observablearray.js"
import { interceptReads } from "./api/intercept-read.js"
import { ObservableMap } from "./types/observablemap.js"
import { IObservableValue } from "./types/observablevalue.js"
import { registerGlobals } from "./core/globalstate.js"

// This line should come after all the imports as well, for the same reason
// as noted above. I will file a bug with rollupjs - @rossipedia
registerGlobals()

export const extras = {
    allowStateChanges,
    deepEqual,
    getAtom,
    getDebugName,
    getDependencyTree,
    getAdministration,
    getGlobalState,
    getObserverTree,
    interceptReads,
    isComputingDerivation,
    isSpyEnabled,
    onReactionError,
    reserveArrayBuffer, // See #734
    resetGlobalState,
    isolateGlobalState,
    shareGlobalState,
    spyReport,
    spyReportEnd,
    spyReportStart,
    setReactionScheduler
}

// Deprecated default export (will be removed in 4.0)

import { IObservable } from "./core/observable.js"
import { Reaction, IReactionPublic, IReactionDisposer } from "./core/reaction.js"
import { untracked, IDerivationState } from "./core/derivation.js"
import { IAtom, Atom, BaseAtom } from "./core/atom.js"
import { useStrict, isStrictModeEnabled, IAction } from "./core/action.js"
import { spy } from "./core/spy.js"
import { IComputedValue } from "./core/computedvalue.js"
import { IEqualsComparer, comparer } from "./types/comparer.js"
import { asReference, asFlat, asStructure, asMap } from "./types/modifiers-old.js"
import { IModifierDescriptor, IEnhancer, isModifierDescriptor } from "./types/modifiers.js"
import { IInterceptable, IInterceptor } from "./types/intercept-utils.js"
import { IListenable } from "./types/listen-utils.js"
import {
    IObjectWillChange,
    IObjectChange,
    IObservableObject,
    isObservableObject
} from "./types/observableobject.js"
import {
    IValueDidChange,
    IValueWillChange,
    isObservableValue as isBoxedObservable
} from "./types/observablevalue.js"
import {
    IArrayWillChange,
    IArrayWillSplice,
    IArrayChange,
    IArraySplice,
    isObservableArray
} from "./types/observablearray.js"
import {
    IKeyValueMap,
    IMapEntries,
    IMapEntry,
    IMapWillChange,
    IMapChange,
    IMapChangeUpdate,
    IMapChangeAdd,
    IMapChangeBase,
    IMapChangeDelete,
    isObservableMap,
    map,
    IObservableMapInitialValues,
    IMap
} from "./types/observablemap.js"
import { transaction } from "./api/transaction.js"
import { observable, IObservableFactory, IObservableFactories } from "./api/observable.js"
import { computed, IComputed, IComputedValueOptions } from "./api/computed.js"
import { isObservable } from "./api/isobservable.js"
import { isComputed } from "./api/iscomputed.js"
import { extendObservable, extendShallowObservable } from "./api/extendobservable.js"
import { observe } from "./api/observe.js"
import { intercept } from "./api/intercept.js"
import { autorun, autorunAsync, when, reaction, IReactionOptions } from "./api/autorun.js"
import { action, isAction, runInAction, IActionFactory } from "./api/action.js"
import { expr } from "./api/expr.js"
import { toJS } from "./api/tojs.js"
import { ITransformer, createTransformer } from "./api/createtransformer.js"
import { whyRun } from "./api/whyrun.js"
import { isArrayLike } from "./utils/utils.js"
import { Iterator } from "./utils/iterable.js"

const everything = {
    Reaction,
    untracked,
    Atom,
    BaseAtom,
    useStrict,
    isStrictModeEnabled,
    spy,
    comparer,
    asReference,
    asFlat,
    asStructure,
    asMap,
    isModifierDescriptor,
    isObservableObject,
    isBoxedObservable,
    isObservableArray,
    ObservableMap,
    isObservableMap,
    map,
    transaction,
    observable,
    computed,
    isObservable,
    isComputed,
    extendObservable,
    extendShallowObservable,
    observe,
    intercept,
    autorun,
    autorunAsync,
    when,
    reaction,
    action,
    isAction,
    runInAction,
    expr,
    toJS,
    createTransformer,
    whyRun,
    isArrayLike,
    extras
}

let warnedAboutDefaultExport = false

for (let p in everything) {
    let val = everything[p]
    Object.defineProperty(everything, p, {
        get: () => {
            if (!warnedAboutDefaultExport) {
                warnedAboutDefaultExport = true
                console.warn(
                    "Using default export (`import mobx from 'mobx'`) is deprecated " +
                        "and won’t work in mobx@4.0.0\n" +
                        "Use `import * as mobx from 'mobx'` instead"
                )
            }
            return val
        }
    })
}

// TODO: remove in 4.0, temporarily incompatibility fix for mobx-react@4.1.0 which accidentally uses default exports
export default everything

// Devtools support

declare var __MOBX_DEVTOOLS_GLOBAL_HOOK__: { injectMobx: ((any) => void) }
if (typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ === "object") {
    __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx({ spy, extras })
}
