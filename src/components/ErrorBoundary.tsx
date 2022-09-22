import React from 'react'
import styles from './ErrorBoundary.module.css'

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
        <div className={styles.container}>
          <p className={styles.message}>
            Oh no! Something has gone wrong <span>💀</span>
          </p>
          <p className={styles.message}>{this.state.errorMessage}</p>
        </div>
      )
    } else {
      return this.props.children
    }
  }
}
