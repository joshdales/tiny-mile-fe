import axios from 'axios'
import { OpenAPIConfig, Client, DeliveryJob } from '@tiny-mile/delivery-sdk'

const tinyMileConfig: Partial<OpenAPIConfig> = {
  BASE: import.meta.env.API_URL + '/api/v1',
  VERSION: '1',
  HEADERS: {
    [import.meta.env.API_AUTH_HEADER]: import.meta.env.API_AUTH_TOKEN,
  },
}

const tinyMileClient = new Client(tinyMileConfig)

axios.create({
  baseURL: import.meta.env.API_URL + '/api/v1',
  headers: {
    [import.meta.env.API_AUTH_HEADER]: import.meta.env.API_AUTH_TOKEN,
  },
})

const fetchDeliveryJob = (deliveryJobId: string) =>
  tinyMileClient.request.request<DeliveryJob>({
    method: 'GET',
    url: `/delivery-jobs/${deliveryJobId}`,
  })

const openRobotLid = (deliveryJobId: string) =>
  tinyMileClient.request.request({
    method: 'POST',
    url: `/delivery-jobs/${deliveryJobId}/couriers/current/open-lid`,
  })

const orderPickedUp = (deliveryJobId: string) =>
  tinyMileClient.request.request({
    method: 'POST',
    url: `/delivery-jobs/${deliveryJobId}/events/order-picked-up`,
  })

const orderDroppedOff = (deliveryJobId: string) =>
  tinyMileClient.request.request({
    method: 'POST',
    url: `/delivery-jobs/${deliveryJobId}/events/order-dropped-off`,
  })

export default tinyMileClient

export { fetchDeliveryJob, openRobotLid, orderDroppedOff, orderPickedUp }
