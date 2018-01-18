import { VType } from '../../nerv-shared/index.js'
import { doc } from '../../nerv-utils/index.js'
export function createVoid () {
  const dom = doc.createTextNode('')
  return {
    dom,
    vtype: VType.Void
  }
}
