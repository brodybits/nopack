import { globalState } from "../core/globalstate.js"
import { isComputedValue } from "../core/computedvalue.js"
import { isReaction } from "../core/reaction.js"
import { getAtom } from "../types/type-utils.js"
import { fail } from "../utils/utils.js"
import { getMessage } from "../utils/messages.js"

function log(msg: string): string {
    console.log(msg)
    return msg
}

export function whyRun(thing?: any, prop?: string) {
    switch (arguments.length) {
        case 0:
            thing = globalState.trackingDerivation
            if (!thing) return log(getMessage("m024"))
            break
        case 2:
            thing = getAtom(thing, prop)
            break
    }
    thing = getAtom(thing)
    if (isComputedValue(thing)) return log(thing.whyRun())
    else if (isReaction(thing)) return log(thing.whyRun())
    return fail(getMessage("m025"))
}
