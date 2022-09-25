import { formatMockedResponseUuid } from '../../src/util'
import deliveryJob from '../fixtures/deliveryJob.json'

describe('Delivery Job', () => {
  const deliveryJobId = formatMockedResponseUuid(deliveryJob.uuid)

  beforeEach(() => {
    cy.visit(`http://localhost:3000?delivery_job_id=${deliveryJobId}`)
  })

  it('fetches the delivery job', () => {
    cy.get('h2').should('contain', 'Checking 🤔')
  })

  it('displays the delivery job once fetched', () => {
    cy.get('h2')
      .should('contain', 'Assignment 🧐')
      .get('h1')
      .should('have.text', 'Job details')
      .get('td')
      .first()
      .should('contain', deliveryJobId.split('-')[0])
  })

  it('opens the robots lid', () => {
    cy.get('#open-robot-lid')
      .click()
      .get('code')
      .contains('Contacting Robot... 🤖')
      .get('.CourierControls-module__success')
      .contains('✅ Ready for pick up!')
  })

  it('packs the robot', () => {
    cy.get('#open-robot-lid')
      .click()
      .get('#order-drop-odd')
      .click()
      .get('code')
      .contains('Contacting Robot... 🤖')
      .get('.ErrorMessage-module__message')
      .contains('Event was rejected')
  })

  context('when there is no matching delivery_job_id that matches search param', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000?delivery_job_id=not-valid')
    })

    it('displays the rest error', () => {
      cy.get('h2').should('contain', 'Looks like there was an issue 😱')
      cy.get('p').should('have.text', 'Not Found')
    })
  })

  context('when there is no delivery_job_id search param', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000')
    })

    it('displays an error', () => {
      cy.on('uncaught:exception', (err) => {
        // This is the error message that we expect to have been raised
        if (err.message.includes('There is no Delivery Job ID to fetch')) {
          return false
        }
      })

      cy.get('p').should(
        'have.text',
        'Oh no! Something has gone very wrong 💀. Please contact support.' +
          'There is no Delivery Job ID to fetch'
      )
    })
  })
})
