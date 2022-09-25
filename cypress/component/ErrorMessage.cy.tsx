import React from 'react'
import * as cy from 'cypress/react18'
import ErrorMessage from '../../src/components/ErrorMessage'

describe('ErrorMessage.cy.ts', () => {
  const errorMessage = 'Uh oh! Something has gone wrong'
  it('displays the error message', () => {
    cy.mount(<ErrorMessage errorMessage={errorMessage} />)
      .get('p.ErrorMessage-module__message')
      .should('have.text', errorMessage)
  })

  const children = <strong>Something has gone very wrong</strong>
  it('displays the error message', () => {
    cy.mount(<ErrorMessage errorMessage={errorMessage}>{children}</ErrorMessage>)
      .get('strong')
      .should('have.text', 'Something has gone very wrong')
  })
})
