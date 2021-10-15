import { useState } from 'react'

import { BoundaryProvider } from '../Popover'
import Widget from '../Widget'
import Header from './Header'
import InputPanel from './InputPanel'
import OutputPanel from './OutputPanel'
import ReverseButton from './ReverseButton'
import SwapStateProvider from './state'
import SubmitButton from './SubmitButton'

export interface SwapProps {
  darkMode?: boolean
}

export default function Swap({ darkMode = true }: SwapProps) {
  const [boundary, setBoundary] = useState<HTMLDivElement | null>(null)
  return (
    <Widget darkMode={darkMode}>
      <SwapStateProvider>
        <Header></Header>
        <div ref={setBoundary}>
          <BoundaryProvider value={boundary}>
            <InputPanel></InputPanel>
            <ReverseButton></ReverseButton>
            <OutputPanel></OutputPanel>
            <SubmitButton></SubmitButton>
          </BoundaryProvider>
        </div>
      </SwapStateProvider>
    </Widget>
  )
}
