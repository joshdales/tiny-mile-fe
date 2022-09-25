import React from 'react'
import JobDetails from '../../src/components/JobDetails'
import { formatMockedResponseUuid } from '../../src/util'
import deliveryJob from '../fixtures/deliveryJob.json'
formatMockedResponseUuid

describe('TableRow.cy.ts', () => {
  it('all the job details', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - we need to ignore the types here because TS doesn't like that the
    // `stage` property on our fixture is a string and not an enum
    cy.mount(<JobDetails deliveryJob={deliveryJob} />)
      .get('tr')
      .should('have.length', 6)
  })
})
