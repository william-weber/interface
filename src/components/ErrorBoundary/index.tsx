import { Trans } from '@lingui/macro'
import React, { ErrorInfo } from 'react'
import ReactGA from 'react-ga'
import styled from 'styled-components/macro'

import { TYPE } from '../../theme'
import { AutoColumn } from '../Column'
import { AutoRow } from '../Row'
import CreateIssueLink from './CreateIssueLink'
import GetHelpLink from './GetHelpLink'

const FallbackWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  z-index: 1;
`

const BodyWrapper = styled.div<{ margin?: string }>`
  padding: 1rem;
  width: 100%;
  white-space: ;
`

const CodeBlockWrapper = styled.div`
  background: ${({ theme }) => theme.bg0};
  overflow: auto;
  white-space: pre;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 24px;
  padding: 18px 24px;
  color: ${({ theme }) => theme.text1};
`

const SomethingWentWrongWrapper = styled.div`
  padding: 6px 24px;
`

type ErrorBoundaryState = {
  error: Error | null
}

export default class ErrorBoundary extends React.Component<unknown, ErrorBoundaryState> {
  constructor(props: unknown) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    ReactGA.exception({
      ...error,
      ...errorInfo,
      fatal: true,
    })
  }

  render() {
    const { error } = this.state

    if (error !== null) {
      return (
        <FallbackWrapper>
          <BodyWrapper>
            <AutoColumn gap={'md'}>
              <SomethingWentWrongWrapper>
                <TYPE.label fontSize={24} fontWeight={600}>
                  <Trans>Something went wrong</Trans>
                </TYPE.label>
              </SomethingWentWrongWrapper>
              <CodeBlockWrapper>
                <code>
                  <TYPE.main fontSize={10}>{error.stack}</TYPE.main>
                </code>
              </CodeBlockWrapper>
              <AutoRow>
                <CreateIssueLink error={error} />
                <GetHelpLink
                  id="get-support-on-discord"
                  href="https://discord.gg/FCfyBSbCU5"
                  text="Get support on Discord"
                />
              </AutoRow>
            </AutoColumn>
          </BodyWrapper>
        </FallbackWrapper>
      )
    }
    return this.props.children
  }
}
