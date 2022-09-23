import { DeliveryJob } from '@tiny-mile/delivery-sdk'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Address from './Address'

import styles from './JobDetails.module.css'

interface iGivenProps {
  deliveryJob: DeliveryJob
}

type iProps = iGivenProps

const JobDetails: React.FC<iProps> = ({ deliveryJob }) => {
  const [idCopied, setIdCopied] = useState<string>()
  const formattedId = useMemo(() => deliveryJob.uuid.replace(/^urn:uuid:/, ''), [deliveryJob.uuid])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (idCopied) {
      timer = setTimeout(() => {
        setIdCopied(undefined)
      }, 1000)
    }

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [idCopied])

  const copyId = useCallback(() => {
    navigator.clipboard
      .writeText(formattedId)
      .then(() => {
        setIdCopied('✔️')
      })
      .catch(() => {
        setIdCopied('❌')
      })
  }, [formattedId])

  return (
    <div>
      <h1 className={styles.title}>Job details</h1>

      <table>
        <tbody>
          <TableRow title="ID">
            {formattedId.split('-')[0]} <button onClick={copyId}>Copy ID {idCopied}</button>
          </TableRow>

          <TableRow title="Pick-Up estimate">
            {new Date(deliveryJob.pickUpEstimatedAt).toLocaleString()}
          </TableRow>

          <TableRow title="Pickup address">
            <Address address={deliveryJob.pickUpAddress} />
          </TableRow>

          <TableRow title="Delivery estimate">
            {new Date(deliveryJob.dropOffEstimatedAt).toLocaleString()}
          </TableRow>

          <TableRow title="Delivery address">
            <Address address={deliveryJob.dropOffAddress} />
          </TableRow>

          <TableRow title="Cost">
            {new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(
              deliveryJob.deliveryCharges.totalInCents / 100
            )}
          </TableRow>
        </tbody>
      </table>
    </div>
  )
}

export default JobDetails

interface TableRowProps {
  title: string
  children: React.ReactNode
}

const TableRow: React.FC<TableRowProps> = ({ title, children }) => {
  return (
    <tr className={styles.row}>
      <th className={styles.headerCell}>{title}</th>
      <td className={styles.cell}>{children}</td>
    </tr>
  )
}
