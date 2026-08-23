Feature: Logout
  As an authenticated user
  I want to log out of the platform
  To safely end my session

  Background:
    Given I am authenticated on the platform

  Scenario: Successful logout
    When I click the logout button
    Then I should be redirected to the login page
    And the logout button should not be visible
