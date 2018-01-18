import { VType, VText } from '../../nerv-shared/index'

export default function createVText (text: string | number): VText {
  return {
    text,
    vtype: VType.Text,
    dom: null
  }
}
