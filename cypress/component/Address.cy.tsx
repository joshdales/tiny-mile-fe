import React from 'react'
import { CompleteAddress } from '@tiny-mile/delivery-sdk'
import Address from '../../src/components/Address'

describe('Address.cy.ts', () => {
  const fullAddress: CompleteAddress = {
    addressDescription: {
      establishmentName: 'Establishment name',
      addressLine1: 'Address line 1',
      addressLine2: 'Address line 2',
      locality: 'Locality',
      state: 'State',
      postalCode: 'Postal code',
      country: 'Country',
    },
    geocodedAddress: {
      lat: 1,
      lng: 1,
    },
  }

  it('displays the full address', () => {
    cy.mount(<Address address={fullAddress} />)
      .get('address')
      .should('have.text', Object.values(fullAddress.addressDescription).join(','))
  })

  const partialAddress: CompleteAddress = {
    addressDescription: {
      addressLine1: 'Address line 1',
      locality: 'Locality',
      state: 'State',
      postalCode: 'Postal code',
      country: 'Country',
    },
    geocodedAddress: {
      lat: 1,
      lng: 1,
    },
  }

  it('displays the address', () => {
    cy.mount(<Address address={partialAddress} />)
      .get('address')
      .should('have.text', Object.values(partialAddress.addressDescription).join(','))
  })
})
