import { useResetAtom } from 'jotai/utils'
import styled, { TYPE } from 'lib/styled'
import { StyledButton, styledIcon } from 'lib/styled/components'
import { useState } from 'react'
import { Settings as SettingsIcon } from 'react-feather'

import Modal, { Body, Header } from '../../Modal'
import { BoundaryProvider } from '../../Popover'
import { settingsAtom } from '../state'
import ExpertModeToggle from './ExpertModeToggle'
import GasPriceSelect from './GasPriceSelect'
import MaxSlippageSelect from './MaxSlippageSelect'
import MultihopToggle from './MultihopToggle'
import TransactionTtlInput from './TransactionTtlInput'

export const StyledSettingsIcon = styledIcon(SettingsIcon)

const StyledReset = styled(TYPE.text)`
  padding-right: 12px;

  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`

export function SettingsModal({ onClose }: { onClose: () => void }) {
  const [boundary, setBoundary] = useState<HTMLDivElement | null>(null)
  const resetSettings = useResetAtom(settingsAtom)
  return (
    <Modal>
      <Header title={<TYPE.header>Settings</TYPE.header>} onClose={onClose}>
        <StyledReset color="action" onClick={resetSettings}>
          Reset
        </StyledReset>
      </Header>
      <Body ref={setBoundary}>
        <BoundaryProvider value={boundary}>
          <GasPriceSelect />
          <MaxSlippageSelect />
          <TransactionTtlInput />
          <ExpertModeToggle />
          <MultihopToggle />
        </BoundaryProvider>
      </Body>
    </Modal>
  )
}

export default function Settings() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <StyledButton onClick={() => setOpen(true)}>
        <StyledSettingsIcon />
      </StyledButton>
      {open && <SettingsModal onClose={() => setOpen(false)} />}
    </>
  )
}
