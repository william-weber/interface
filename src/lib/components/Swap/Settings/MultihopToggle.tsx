import { useAtom } from 'jotai'

import Toggle from '../../Toggle'
import { multihopAtom } from '../state'
import { Row } from './components'
import Label from './Label'

export default function MultihopToggle() {
  const [multihop, toggleMultihop] = useAtom(multihopAtom)
  return (
    <Row>
      <Label name="Multihop" />
      <Toggle checked={multihop} onToggle={toggleMultihop} />
    </Row>
  )
}
