import { PayloadActionCreator } from '@reduxjs/toolkit'
import { selectAtom, useAtomValue, useUpdateAtom } from 'jotai/utils'

import { swapAtom } from '.'
import {
  resetSettings,
  setGasPrice,
  setMaxSlippage,
  setTransactionDeadline,
  toggleExpertMode,
  toggleMultihop,
  toggleShowDetails,
} from './actions'
import { SwapState } from './reducer'

function useSwap<Value, Payload>(
  selector: (state: SwapState) => Value,
  action: PayloadActionCreator<Payload>
): [
  Value,
  Payload extends any[]
    ? (...updates: Payload) => void
    : Payload extends void
    ? () => void
    : (...updates: [Payload]) => void
] {
  const value = useAtomValue(selectAtom(swapAtom, selector))
  const dispatch = useUpdateAtom(swapAtom)
  return [value, (...args: any[]) => dispatch(action(args))]
}

export function useShowDetails() {
  return useSwap(({ showDetails }) => showDetails, toggleShowDetails)
}

export function useResetSettings() {
  const dispatch = useUpdateAtom(swapAtom)
  return () => dispatch(resetSettings())
}

export function useGasPrice() {
  return useSwap(({ gasPrice }) => gasPrice, setGasPrice)
}

export function useMaxSlippage() {
  return useSwap(({ maxSlippage }) => maxSlippage, setMaxSlippage)
}

export function useTransactionDeadline() {
  return useSwap(({ transactionDeadline }) => transactionDeadline, setTransactionDeadline)
}

export function useExpertMode() {
  return useSwap(({ expertMode }) => expertMode, toggleExpertMode)
}

export function useMultihop() {
  return useSwap(({ multihop }) => multihop, toggleMultihop)
}
