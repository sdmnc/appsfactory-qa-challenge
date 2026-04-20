Feature: Basket and Checkout for cheapest products

  As a new Amazon user,
  I want to search for the cheapest Snickers and Skittles on the page,
  add the cheapest ones to my basket,
  check if the basket calculates the result correctly,
  and ensure that at checkout, without an account, I get redirected to the registration page.

  Scenario: Ordering the cheapest Snickers and Skittles and verifying basket and checkout
    Given I am on the Amazon home page
    When I search and add the cheapest "Snickers" to the basket
    When I search and add the cheapest "Skittles" to the basket
    Then the basket should contain 2 products with correct total
    When I proceed to checkout
    Then I should be redirected to the registration page