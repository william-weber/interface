import { Provider } from 'jotai'
import { BoundaryProvider } from 'lib/components/Popover'
import { useState } from 'react'

import Widget from '../Widget'
import Header from './Header'
import InputPanel from './InputPanel'
import OutputPanel from './OutputPanel'
import ReverseButton from './ReverseButton'
import SubmitButton from './SubmitButton'

export interface SwapProps {
  darkMode?: boolean
}

export default function Swap({ darkMode = true }: SwapProps) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null)
  return (
    <Widget darkMode={darkMode}>
      <Provider>
        <Header></Header>
        <div ref={setContainer}>
          <BoundaryProvider value={container}>
            <InputPanel></InputPanel>
            <ReverseButton></ReverseButton>
            <OutputPanel></OutputPanel>
            <SubmitButton></SubmitButton>
          </BoundaryProvider>
        </div>
      </Provider>
    </Widget>
  )
}
