import { useAtom } from 'jotai'

import Toggle from '../../Toggle'
import { expertModeAtom } from '../state'
import { Row } from './components'
import Label from './Label'

const tooltip = 'Allow high impact trades and skip the confirmation screen. Use at your own risk.'

export default function ExpertModeToggle() {
  const [expertMode, toggleExpertMode] = useAtom(expertModeAtom)
  return (
    <Row>
      <Label name="Expert Mode" tooltip={tooltip} />
      <Toggle checked={expertMode} onToggle={toggleExpertMode} />
    </Row>
  )
}
