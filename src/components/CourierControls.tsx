import { useCallback, useMemo, useState } from 'react'
import { ApiError } from '@tiny-mile/delivery-sdk'
import tinyMileClient from '../util/rest'

import styles from './CourierControls.module.css'

interface iGivenProps {
  deliveryJobId: string
  setError: (error: ApiError) => void
  setNotificationMessage: (message: string) => void
}

type iProps = iGivenProps

const CourierControls: React.FC<iProps> = ({ deliveryJobId, setError, setNotificationMessage }) => {
  const [lidIsOpen, setLidIsOpen] = useState(false)
  const [requestIsInFlight, setRequestIsInFlight] = useState(false)

  const formattedId = useMemo(() => deliveryJobId.replace(/^urn:uuid:/, ''), [deliveryJobId])

  const handlePickup = useCallback(() => {
    tinyMileClient
      .createOpenRobotLidCommand(formattedId)
      .then(() => {
        setNotificationMessage('Success')
        setLidIsOpen(true)
      })
      .catch(setError)
      .finally(() => {
        setRequestIsInFlight(false)
      })
  }, [formattedId, setError, setNotificationMessage])

  const handleDropOff = useCallback(() => {
    tinyMileClient
      .postOrderPickedUp(formattedId, {})
      .then(() => {
        setNotificationMessage('')
        setLidIsOpen(false)
      })
      .catch(setError)
      .finally(() => {
        setRequestIsInFlight(false)
      })
  }, [formattedId, setError, setNotificationMessage])

  return (
    <>
      <button disabled={lidIsOpen || requestIsInFlight} onClick={handlePickup}>
        Open robot lid 🚪
      </button>

      <button disabled={!lidIsOpen || requestIsInFlight} onClick={handleDropOff}>
        Order picked up 🎁
      </button>

      {requestIsInFlight && <code>Contacting Robot... 🤖</code>}
    </>
  )
}

export default CourierControls
