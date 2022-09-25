import React from 'react'
import ErrorMessage from '../../src/components/ErrorMessage'

describe('ErrorMessage.cy.ts', () => {
  const errorMessage = 'Uh oh! Something has gone wrong'
  it('displays the error message', () => {
    cy.mount(<ErrorMessage errorMessage={errorMessage} />)
      .get('p.ErrorMessage-module__message')
      .should('have.text', errorMessage)
  })

  it('displays the extra message', () => {
    cy.mount(
      <ErrorMessage errorMessage={errorMessage}>
        <strong>Something has gone very wrong</strong>
      </ErrorMessage>
    )
      .get('p.ErrorMessage-module__message')
      .first()
      .children()
      .should('have.text', 'Something has gone very wrong')
  })
})
