import { DeliveryJob } from '@tiny-mile/delivery-sdk'
import Address from './Address'

import styles from './DeliveryOrder.module.css'

interface iGivenProps {
  deliveryJob: DeliveryJob
}

type iProps = iGivenProps

const DeliveryOrder: React.FC<iProps> = ({ deliveryJob }) => {
  return (
    <div>
      <h2>Job ID: {deliveryJob.uuid.replace(/^urn:uuid:/, '').split('-')[0]}</h2>

      <table>
        <tbody>
          <TableRow title="Stage">{deliveryJob.stage.replaceAll('-', ' ')}</TableRow>
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

export default DeliveryOrder

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