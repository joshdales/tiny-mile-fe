import { useCallback, useState } from 'react'
import { DeliveryJob } from '@tiny-mile/delivery-sdk'
import tinyMileClient from '../util/rest'

import styles from './CourierControls.module.css'

interface iGivenProps {
  deliveryJobId: string
  deliveryJobStage: DeliveryJob.stage
}

type iProps = iGivenProps

const CourierControls: React.FC<iProps> = ({ deliveryJobId, deliveryJobStage }) => {
  const [lidIsOpen, setLidIsOpen] = useState(false)
  const [requestIsInFlight, setRequestIsInFlight] = useState(false)

  const handleRobotLid = useCallback(() => {
    setRequestIsInFlight(true)

    const requestId = deliveryJobId.replace(/^urn:uuid:/, '')

    let request: Promise<void>
    if (deliveryJobStage === DeliveryJob.stage.COURIER_ASSIGNMENT) {
      request = tinyMileClient.createOpenRobotLidCommand(requestId)
    } else if (deliveryJobStage === DeliveryJob.stage.PICK_UP) {
      request = tinyMileClient.postOrderPickedUp(requestId)
    } else {
      // notify that this order is done
      return
    }

    request
      .then(() => {
        setLidIsOpen((currentState) => !currentState)
      })
      .catch((err) => {
        // Do some error handling
      })
      .finally(() => {
        setRequestIsInFlight(false)
      })
  }, [deliveryJobId, deliveryJobStage])

  return (
    <button disabled={requestIsInFlight} onClick={handleRobotLid}>
      {lidIsOpen ? 'Close Robot lid' : 'Open Robot Lid'}
      {requestIsInFlight && <span className={styles.loading}>🌀</span>}
    </button>
  )
}

export default CourierControls
