import React from 'react'
import InputCustom from './InputCustom'

describe('<InputCustom />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<InputCustom />)
  })
})