describe('Delivery Job', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000?delivery_job_id=36599ca3-03e3-2a86-e3b3-37ad440edcc9')
  })

  it('fetches the delivery job', () => {
    cy.get('').should('contain', 'Checking 🤔')
  })
})
