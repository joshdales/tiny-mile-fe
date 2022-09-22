import axios from 'axios'

const rest = axios.create({
  baseURL: import.meta.env.API_URL + '/api/v1',
  headers: {
    [import.meta.env.API_AUTH_HEADER]: import.meta.env.API_AUTH_TOKEN,
  },
})

export interface DeliveryJobResponse {
  uuid: string
  stage: 'courier-assignment' | 'pick-up' | 'drop-off' | 'delivery-completed' | 'delivery-canceled'
  deliveryOrderUUID: string
  pickUpAddress: {
    geocodedAddress: {
      lat: number
      lng: number
      googlePlaceID: string
    }
    addressDescription: {
      addressLine1: string
      addressLine2: string
      locality: string
      state: string
      country: string
      postalCode: string
      establishmentName: string
    }
  }
  pickUpEstimatedAt: string
  dropOffAddress: {
    geocodedAddress: {
      lat: number
      lng: number
      googlePlaceID: string
    }
    addressDescription: {
      addressLine1: string
      addressLine2: string
      locality: string
      state: string
      country: string
      postalCode: string
      establishmentName: string
    }
  }
  dropOffEstimatedAt: string
  currentCourierUUID: string
  nextCourierUUID: string
  completedAt: string
  deliveryCharges: {
    totalInCents: number
  }
  packageHolder: 'shipper' | 'receiver' | 'courier' | 'unknown'
}

const fetchDeliveryJob = (deliveryJobId: string) =>
  rest.get<DeliveryJobResponse>(`/delivery-jobs/${deliveryJobId}`)

const openRobotLid = (deliveryJobId: string, requestData: { reason: string; message: string }) =>
  rest.post(`/delivery-jobs/${deliveryJobId}/couriers/current/open-lid`, requestData)

const orderPickedUp = (deliveryJobId: string) =>
  rest.post(`/delivery-jobs/${deliveryJobId}/events/order-picked-up`)

const orderDroppedOff = (deliveryJobId: string) =>
  rest.post(`/delivery-jobs/${deliveryJobId}/events/order-dropped-off`)

export default rest

export { fetchDeliveryJob, openRobotLid, orderDroppedOff, orderPickedUp }
