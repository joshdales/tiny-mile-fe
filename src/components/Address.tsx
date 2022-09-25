import { CompleteAddress } from '@tiny-mile/delivery-sdk'
import styles from './Address.module.css'

interface iGivenProps {
  address: CompleteAddress
}

type iProps = iGivenProps

const Address: React.FC<iProps> = ({ address }) => {
  return (
    <address className={styles.address}>
      {address.addressDescription.establishmentName ? (
        <span className={styles.addressLine}>{address.addressDescription.establishmentName},</span>
      ) : null}
      <span className={styles.addressLine}>{address.addressDescription.addressLine1},</span>
      {address.addressDescription.addressLine2 ? (
        <span className={styles.addressLine}>{address.addressDescription.addressLine2},</span>
      ) : null}
      <span className={styles.addressLine}>{address.addressDescription.locality},</span>
      <span className={styles.addressLine}>{address.addressDescription.state},</span>
      <span className={styles.addressLine}>{address.addressDescription.postalCode},</span>
      <span className={styles.addressLine}>{address.addressDescription.country}</span>
    </address>
  )
}

export default Address
