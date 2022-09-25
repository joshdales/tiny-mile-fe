import { formatMockedResponseUuid } from '../../src/util'
import deliveryJob from '../fixtures/deliveryJob.json'
import apiError from '../fixtures/apiError.json'

describe('Delivery Job', () => {
  const deliveryJobId = formatMockedResponseUuid(deliveryJob.uuid)

  beforeEach(() => {
    cy.intercept(`**/delivery-jobs/${deliveryJobId}`, { statusCode: 200, body: deliveryJob })
    cy.intercept(`**/delivery-jobs/${deliveryJobId}/couriers/current/open-lid`, {
      statusCode: 202,
      body: '',
      delay: 50,
    })
    cy.intercept(`**/delivery-jobs/${deliveryJobId}/events/order-picked-up`, {
      statusCode: 202,
      body: '',
      delay: 50,
    })
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
      .get('.CourierControls-module__success')
      .contains('✅ Order picked up!')
  })

  context("and the robot's lid fails to open", () => {
    beforeEach(() => {
      cy.intercept(`**/delivery-jobs/${deliveryJobId}`, { statusCode: 200, body: deliveryJob })
      cy.intercept(`**/delivery-jobs/${deliveryJobId}/couriers/current/open-lid`, {
        statusCode: 400,
        body: apiError,
      })
      cy.visit(`http://localhost:3000?delivery_job_id=${deliveryJobId}`)
    })

    it('display the error message', () => {
      cy.get('#open-robot-lid')
        .click()
        .get('.ErrorMessage-module__message')
        .contains('Command was rejected')
    })
  })

  context('and the pick up was rejected', () => {
    beforeEach(() => {
      cy.intercept(`**/delivery-jobs/${deliveryJobId}`, { statusCode: 200, body: deliveryJob })
      cy.intercept(`**/delivery-jobs/${deliveryJobId}/couriers/current/open-lid`, {
        statusCode: 202,
        body: '',
      })
      cy.intercept(`**/delivery-jobs/${deliveryJobId}/events/order-picked-up`, {
        statusCode: 400,
        body: apiError,
      })
      cy.visit(`http://localhost:3000?delivery_job_id=${deliveryJobId}`)
    })

    it('display the error message', () => {
      cy.get('#open-robot-lid')
        .click()
        .get('#order-drop-odd')
        .click()
        .get('.ErrorMessage-module__message')
        .contains('Event was rejected')
    })
  })

  context('when there is no matching delivery_job_id that matches search param', () => {
    beforeEach(() => {
      cy.intercept(`**/delivery-jobs/${deliveryJobId}`, { statusCode: 404, body: apiError })
      cy.visit(`http://localhost:3000?delivery_job_id=${deliveryJobId}`)
    })

    it('displays the error', () => {
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
