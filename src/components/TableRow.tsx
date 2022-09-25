import styles from './TableRow.module.css'

interface iGivenProps {
  title: string
  children: React.ReactNode
}

const TableRow: React.FC<iGivenProps> = ({ title, children }) => {
  return (
    <tr className={styles.row}>
      <th className={styles.headerCell}>{title}</th>
      <td className={styles.cell}>{children}</td>
    </tr>
  )
}

export default TableRow
