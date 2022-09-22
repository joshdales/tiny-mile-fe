import { CompleteAddress } from '@tiny-mile/delivery-sdk'

interface iGivenProps {
  address: CompleteAddress
}

type iProps = iGivenProps

const Address: React.FC<iProps> = ({ address }) => {
  return (
    <address>
      {address.addressDescription.establishmentName
        ? `${address.addressDescription.establishmentName},`
        : null}
      {address.addressDescription.addressLine1},
      {address.addressDescription.addressLine2
        ? `${address.addressDescription.addressLine2},`
        : null}
      {address.addressDescription.locality},{address.addressDescription.state}
      {address.addressDescription.country}
    </address>
  )
}

export default Address
