import styles from './ErrorMessage.module.css'

interface iProps {
  errorMessage: string
  children?: React.ReactNode
}

const ErrorMessage: React.FC<iProps> = ({ errorMessage, children }) => {
  return (
    <div className={styles.container}>
      {children && <p className={styles.message}>{children}</p>}
      <p className={styles.message}>{errorMessage}</p>
    </div>
  )
}

export default ErrorMessage
