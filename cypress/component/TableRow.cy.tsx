import React from 'react'
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
