import React from 'react'
import * as cy from 'cypress/react18'
import TableRow from '../../src/components/TableRow'

describe('TableRow.cy.ts', () => {
  it('displays the table row', () => {
    cy.mount(<TableRow title="Row title">Table row content</TableRow>)
      .get('th')
      .should('have.text', 'Row title')
      .get('td')
      .should('have.text', 'Table row content')
  })
})
