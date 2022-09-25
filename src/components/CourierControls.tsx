import { useCallback, useEffect, useMemo, useState } from 'react'
import { ApiError } from '@tiny-mile/delivery-sdk'

import tinyMileClient from '../util/rest'
import { formatMockedResponseUuid } from '../util'

import styles from './CourierControls.module.css'

interface iGivenProps {
  deliveryJobId: string
  setError: (error: ApiError) => void
}

type iProps = iGivenProps

const CourierControls: React.FC<iProps> = ({ deliveryJobId, setError }) => {
  const [lidIsOpen, setLidIsOpen] = useState(false)
  const [requestIsInFlight, setRequestIsInFlight] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string>()

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (successMessage) {
      timer = setTimeout(() => {
        setSuccessMessage(undefined)
      }, 5000)

      if (requestIsInFlight) {
        setSuccessMessage(undefined)
        clearTimeout(timer)
      }
    }

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [requestIsInFlight, successMessage])

  const formattedId = useMemo(() => formatMockedResponseUuid(deliveryJobId), [deliveryJobId])

  const handlePickup = useCallback(() => {
    setRequestIsInFlight(true)
    tinyMileClient
      .createOpenRobotLidCommand(formattedId)
      .then(() => {
        setSuccessMessage('Ready for pick up!')
        setLidIsOpen(true)
      })
      .catch(setError)
      .finally(() => {
        setRequestIsInFlight(false)
      })
  }, [formattedId, setError])

  const handleDropOff = useCallback(() => {
    setRequestIsInFlight(true)
    tinyMileClient
      .postOrderPickedUp(formattedId, {})
      .then(() => {
        setSuccessMessage('Order picked up!')
        setLidIsOpen(false)
      })
      .catch(setError)
      .finally(() => {
        setRequestIsInFlight(false)
      })
  }, [formattedId, setError])

  return (
    <>
      <button
        className={styles.button}
        disabled={lidIsOpen || requestIsInFlight}
        onClick={handlePickup}
        id="open-robot-lid"
      >
        Open robot lid 🚪
      </button>

      <button
        className={styles.button}
        disabled={!lidIsOpen || requestIsInFlight}
        onClick={handleDropOff}
        id="order-drop-odd"
      >
        Order packed 🎁
      </button>

      {requestIsInFlight && <code className={styles.loading}>Contacting Robot... 🤖</code>}

      {successMessage && <p className={styles.success}>✅ {successMessage}</p>}
    </>
  )
}

export default CourierControls
