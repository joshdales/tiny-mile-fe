import React from 'react'

import ErrorMessage from './ErrorMessage'

interface iState {
  error: boolean
  errorMessage?: string
}

export default class ErrorBoundary extends React.PureComponent<any, iState> {
  constructor(props: any) {
    super(props)
    this.state = { error: false }
  }

  static getDerivedStateFromError(err: Error) {
    return { error: true, errorMessage: err.message }
  }

  render(): JSX.Element {
    if (this.state.error) {
      return (
        <ErrorMessage errorMessage={this.state.errorMessage || ''}>
          Oh no! Something has gone very wrong <span>💀</span>
        </ErrorMessage>
      )
    } else {
      return this.props.children
    }
  }
}
