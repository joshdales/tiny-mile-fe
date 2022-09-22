import { useEffect, useMemo, useState } from 'react'
import { ApiError, DeliveryJob } from '@tiny-mile/delivery-sdk'
import tinyMileClient from '../util/rest'

import DeliveryOrder from './DeliveryOrder'

import styles from './OrderInfo.module.css'
import ErrorBoundary from './ErrorBoundary'

// Ideally I would be able to fetch the uuids of delivery jobs
const DELIVERY_UUID = '11197c34-fdcc-5b85-16a6-414014d7ebf5'

const OrderInfo: React.FC = () => {
  const [deliveryJob, setDeliverJob] = useState<DeliveryJob>()
  const [error, setError] = useState<ApiError>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    tinyMileClient
      .getDeliveryJob(DELIVERY_UUID)
      .then((res) => {
        setDeliverJob(res)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const title = useMemo(() => {
    switch (deliveryJob?.stage) {
      case DeliveryJob.stage.COURIER_ASSIGNMENT:
        return 'Ready 🥳'
      case DeliveryJob.stage.DELIVERY_CANCELED:
        return 'Cancelled 😔'
      case DeliveryJob.stage.DELIVERY_COMPLETED:
        return 'Completed 🤩'
      case DeliveryJob.stage.PICK_UP:
        return 'Pick up 🚀'
      case DeliveryJob.stage.DROP_OFF:
        return 'Drop Off 📦'
      default:
        return 'Checking 🤔'
    }
  }, [deliveryJob])

  return (
    <section className={styles.container}>
      <div>
        <h1 className={styles.title}>{title}</h1>
        {error && <p>An error occurred: {error.message}</p>}
        {isLoading && <p>Fetching delivery info!</p>}
      </div>

      {deliveryJob && (
        <ErrorBoundary>
          <DeliveryOrder deliveryJob={deliveryJob} />
        </ErrorBoundary>
      )}
    </section>
  )
}

export default OrderInfo
