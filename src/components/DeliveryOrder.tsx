import { DeliveryJob } from '@tiny-mile/delivery-sdk'
import Address from './Address'

interface iGivenProps {
  deliveryJob: DeliveryJob
}

type iProps = iGivenProps

const DeliveryOrder: React.FC<iProps> = ({ deliveryJob }) => {
  return (
    <div>
      <h2>{deliveryJob.uuid.replace(/^urn:uuid:/, '').split('-')[0]}</h2>

      <table>
        <tbody>
          <tr>
            <th>Stage</th>
            <td>{deliveryJob.stage.replaceAll('-', ' ')}</td>
          </tr>

          <tr>
            <th>Pickup Address</th>
            <td>
              <Address address={deliveryJob.pickUpAddress} />
            </td>
          </tr>

          <tr>
            <th>Delivery Address</th>
            <td>
              <Address address={deliveryJob.dropOffAddress} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default DeliveryOrder
