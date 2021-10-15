import Wallet from '../Wallet'
import WidgetHeader from '../Widget/Header'
import Settings from './Settings'

export default function Header() {
  return (
    <WidgetHeader path="swap" title="Swap">
      <Wallet />
      <Settings />
    </WidgetHeader>
  )
}
