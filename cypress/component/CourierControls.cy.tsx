import React from 'react'
import CourierControls from '../../src/components/CourierControls'
import deliveryJob from '../fixtures/deliveryJob.json'

describe('TableRow.cy.ts', () => {
  const setError = () => {
    // Check if this has been called
  }

  it('displays the controls for a courier', () => {
    cy.mount(<CourierControls deliveryJobId={deliveryJob.uuid} setError={setError} />)
      .get('button')
      .should('have.length', 2)
  })
})
