describe('Delivery Job', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000?delivery_job_id=36599ca3-03e3-2a86-e3b3-37ad440edcc9')
  })

  it('fetches the delivery job', () => {
    cy.get('h2').should('contain', 'Checking 🤔')
  })

  it('displays the delivery job once fetched', () => {
    cy.get('h2').should('contain', 'Assignment 🧐')
  })

  context('when there is no matching delivery_job_id', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000?delivery_job_id=not-valid')
    })

    it('displays the rest error', () => {
      cy.get('h2').should('contain', 'Looks like there was an issue 😱')
      cy.get('p').should('have.text', 'Not Found')
    })
  })

  context('when there is no delivery_job_id', () => {
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
