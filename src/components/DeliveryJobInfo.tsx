import { useEffect, useMemo, useState } from 'react'
import { ApiError, DeliveryJob } from '@tiny-mile/delivery-sdk'
import tinyMileClient from '../util/rest'

import JobDetails from './JobDetails'

import styles from './DeliveryJobInfo.module.css'
import ErrorBoundary from './ErrorBoundary'
import ErrorMessage from './ErrorMessage'
import CourierControls from './CourierControls'

const DeliveryJobInfo: React.FC = () => {
  const [deliveryJob, setDeliverJob] = useState<DeliveryJob>()
  const [error, setError] = useState<ApiError>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const deliveryJobId = new URLSearchParams(location.search).get('delivery_job_id')

    if (!deliveryJobId) {
      throw new Error('There is no Delivery Job ID to fetch')
    }

    tinyMileClient
      .getDeliveryJob(deliveryJobId)
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
    if (!deliveryJob && error) {
      return 'Looks like there was an issue 😱'
    }

    switch (deliveryJob?.stage) {
      case DeliveryJob.stage.COURIER_ASSIGNMENT:
        return 'Assignment 🧐'
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
  }, [deliveryJob, error])

  return (
    <section className={styles.container}>
      <div className={styles.controls}>
        <h2 className={styles.title}>{title}</h2>
        {isLoading && <p>Fetching delivery job details!</p>}
        {deliveryJob && (
          <ErrorBoundary>
            <CourierControls deliveryJobId={deliveryJob.uuid} setError={setError} />
          </ErrorBoundary>
        )}

        {error && <ErrorMessage errorMessage={error.message} />}
      </div>

      {deliveryJob && (
        <ErrorBoundary>
          <JobDetails deliveryJob={deliveryJob} />
        </ErrorBoundary>
      )}
    </section>
  )
}

export default DeliveryJobInfo
