export { default as nextTick } from './next-tick.js'
export { default as shallowEqual } from './shallow-equal.js'
export { SimpleMap, MapClass } from './simple-map.js'
export * from './is.js'
export { isBrowser, doc } from './env.js'

export function getPrototype (obj) {
  /* istanbul ignore next */
  if (Object.getPrototypeOf) {
    return Object.getPrototypeOf(obj)
  } else if (obj.__proto__) {
    return obj.__proto__
  }
  /* istanbul ignore next */
  return obj.constructor.prototype
}

export function isAttrAnEvent (attr: string): boolean {
  return attr[0] === 'o' && attr[1] === 'n'
}

export function extend<S, F> (source: S, from: F): S | F & S {
  if (!from) {
    return source
  }
  for (const key in from) {
    if (from.hasOwnProperty(key)) {
      (source as any)[key] = from[key]
    }
  }
  return source
}

export function clone<T> (obj: T): T | {} {
  return extend({}, obj)
}
