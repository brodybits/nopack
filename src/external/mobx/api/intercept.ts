import { IInterceptor } from "../types/intercept-utils.js"
import { IObservableArray, IArrayWillChange, IArrayWillSplice } from "../types/observablearray.js"
import { ObservableMap, IMapWillChange } from "../types/observablemap.js"
import { IObjectWillChange } from "../types/observableobject.js"
import { IValueWillChange, IObservableValue } from "../types/observablevalue.js"
import { Lambda } from "../utils/utils.js"
import { getAdministration } from "../types/type-utils.js"

export function intercept<T>(
    value: IObservableValue<T>,
    handler: IInterceptor<IValueWillChange<T>>
): Lambda
export function intercept<T>(
    observableArray: IObservableArray<T>,
    handler: IInterceptor<IArrayWillChange<T> | IArrayWillSplice<T>>
): Lambda
export function intercept<T>(
    observableMap: ObservableMap<T>,
    handler: IInterceptor<IMapWillChange<T>>
): Lambda
export function intercept<T>(
    observableMap: ObservableMap<T>,
    property: string,
    handler: IInterceptor<IValueWillChange<T>>
): Lambda
export function intercept(object: Object, handler: IInterceptor<IObjectWillChange>): Lambda
export function intercept<T extends Object, K extends keyof T>(
    object: T,
    property: K,
    handler: IInterceptor<IValueWillChange<any>>
): Lambda
export function intercept(thing, propOrHandler?, handler?): Lambda {
    if (typeof handler === "function") return interceptProperty(thing, propOrHandler, handler)
    else return interceptInterceptable(thing, propOrHandler)
}

function interceptInterceptable(thing, handler) {
    return getAdministration(thing).intercept(handler)
}

function interceptProperty(thing, property, handler) {
    return getAdministration(thing, property).intercept(handler)
}
