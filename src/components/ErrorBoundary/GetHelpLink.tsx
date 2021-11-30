import { Trans } from '@lingui/macro'
import styled from 'styled-components/macro'

import { ExternalLink, TYPE } from '../../theme'

const LinkWrapper = styled.div`
  color: ${({ theme }) => theme.blue1};
  padding: 6px 24px;
`

export default function GetHelpLink(props: { id: string; href: string; text: string }) {
  return (
    <LinkWrapper>
      <ExternalLink id={props.id} href={props.href} target="_blank">
        <TYPE.link fontSize={16}>
          <Trans>{props.text}</Trans>
          <span>↗</span>
        </TYPE.link>
      </ExternalLink>
    </LinkWrapper>
  )
}
