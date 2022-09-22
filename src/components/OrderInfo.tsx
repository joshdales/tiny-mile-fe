import { useEffect, useState } from 'react'
import { ApiError, DeliveryJob } from '@tiny-mile/delivery-sdk'
import { fetchDeliveryJob } from '../util/rest'

import styles from './OrderInfo.module.css'

// Ideally I would be able to fetch the uuids of delivery jobs
const DELIVERY_UUID = '11197c34-fdcc-5b85-16a6-414014d7ebf5'

const OrderInfo: React.FC = () => {
  const [deliveryOrder, setDeliverOrder] = useState<DeliveryJob>()
  const [error, setError] = useState<ApiError>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetchDeliveryJob(DELIVERY_UUID)
      .then((res) => {
        setDeliverOrder(res)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Delivery!</h1>
      {error && <p>An error occurred: {error.message}</p>}
      {isLoading && <p>Fetching delivery info!</p>}
      {deliveryOrder && deliveryOrder.uuid}
    </section>
  )
}

export default OrderInfo
