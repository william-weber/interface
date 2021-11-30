import store, { AppState } from '../../state'
import { userAgent } from '../../utils/userAgent'
import GetHelpLink from './GetHelpLink'

export default function CreateIssueLink(props: { error: Error }) {
  const onKnownProdURL = window.location.href.match(/uniswap\.org|ipfs\.dweb\.link|ipfs\.cf-ipfs\.com/)

  // Do not display link to make issue on github if not on a known prod URL
  // (prevents creating issues from forks of the interface)
  if (!onKnownProdURL) return null

  const error = props.error
  const encodedBody = encodeURIComponent(issueBody(error))

  return (
    <GetHelpLink
      id="create-github-issue-link"
      href={`https://github.com/Uniswap/uniswap-interface/issues/new?assignees=&labels=bug&body=${encodedBody}&title=${encodeURIComponent(
        `Crash report: \`${error.name}${error.message && `: ${error.message}`}\``
      )}`}
      text="Create an issue on GitHub"
    />
  )
}

function issueBody(error: Error): string {
  const relevantState = getRelevantState()
  const deviceData = userAgent
  return `## URL
  
${window.location.href}

${
  relevantState
    ? `## \`${relevantState}\` state
    
\`\`\`json
${JSON.stringify(store.getState()[relevantState], null, 2)}
\`\`\`
`
    : ''
}
${
  error.name &&
  `## Error

\`\`\`
${error.name}${error.message && `: ${error.message}`}
\`\`\`
`
}
${
  error.stack &&
  `## Stacktrace

\`\`\`
${error.stack}
\`\`\`
`
}
${
  deviceData &&
  `## Device data

\`\`\`json
${JSON.stringify(deviceData, null, 2)}
\`\`\`
`
}
`
}

function getRelevantState(): null | keyof AppState {
  const path = window.location.hash
  if (!path.startsWith('#/')) {
    return null
  }
  const pieces = path.substring(2).split(/[\/\\?]/)
  switch (pieces[0]) {
    case 'swap':
      return 'swap'
    case 'add':
      if (pieces[1] === 'v2') return 'mint'
      else return 'mintV3'
    case 'remove':
      if (pieces[1] === 'v2') return 'burn'
      else return 'burnV3'
  }
  return null
}
