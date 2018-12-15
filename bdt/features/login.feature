Feature: Habitica login
    As an user I want to authenticate myself to habitica website

Scenario Outline: Login failed with wrong inputs

  Given I go to habitica home screen
    When I open the login screen
    And I fill with <username> and <password>
    And I try to login
    Then I expect to see incorrect

    Examples:
      | username            | password |
      |adsfasdfasdfasdfaa| aw23sfd  |
