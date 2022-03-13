describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('User Id')
    cy.contains('Username')
    cy.contains('User Link')
    cy.contains('Avatar/URL')
    cy.contains('Start Auto Loading')
    cy.contains('Load Next Batch')
    cy.contains('Reset')
    cy.contains('mojombo') //first user from API
  })
})
