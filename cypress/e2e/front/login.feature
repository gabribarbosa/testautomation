Feature: Login
  As a registered user
  I want to log in to the platform
  To access the available features

  Background:
    Given I am on the login page

  Scenario: Login with valid credentials
    When I fill in the email with the valid user
    And I fill in the password with the valid user
    And I click the Login button
    Then I should be redirected to the home page
    And the logout button should be visible

  Scenario: Login with invalid credentials
    When I fill in the email with "usuario-invalido@teste.com"
    And I fill in the password with "senhaerrada"
    And I click the Login button
    Then I should see the invalid credentials message

  Scenario: Login without filling in the email
    When I leave the email field blank
    And I fill in the password with the valid user
    And I click the Login button
    Then I should see the required email message

  Scenario: Login without filling in the password
    When I fill in the email with the valid user
    And I leave the password field blank
    And I click the Login button
    Then I should see the required password message
