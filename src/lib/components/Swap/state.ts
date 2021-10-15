import { Provider } from 'jotai'
import { atomWithReset } from 'jotai/utils'
import { Customizable, pickAtom, setCustomizable, setTogglable } from 'lib/utils/atoms'

import Settings from './Settings'

export enum GasPrice {
  FAST = 155,
  TRADER = 175,
  // Members to satisfy CustomizableEnum; see setCustomizable
  CUSTOM = -1,
  DEFAULT = 175,
}

export enum MaxSlippage {
  P01 = 0.1,
  P05 = 0.5,
  // Members to satisfy CustomizableEnum; see setCustomizable
  CUSTOM = -1,
  DEFAULT = 0.5,
}

export interface Settings {
  gasPrice: Customizable<GasPrice>
  maxSlippage: Customizable<MaxSlippage>
  transactionTtl: number
  expertMode: boolean
  multihop: boolean
}

const initialSettings: Settings = {
  gasPrice: [GasPrice.DEFAULT],
  maxSlippage: [MaxSlippage.DEFAULT],
  transactionTtl: 40,
  expertMode: false,
  multihop: true,
}

export const settingsAtom = atomWithReset(initialSettings)
export const gasPriceAtom = pickAtom(settingsAtom, 'gasPrice', setCustomizable(GasPrice))
export const maxSlippageAtom = pickAtom(settingsAtom, 'maxSlippage', setCustomizable(MaxSlippage))
export const transactionTtlAtom = pickAtom(settingsAtom, 'transactionTtl')
export const expertModeAtom = pickAtom(settingsAtom, 'expertMode', setTogglable)
export const multihopAtom = pickAtom(settingsAtom, 'multihop', setTogglable)

export default Provider
