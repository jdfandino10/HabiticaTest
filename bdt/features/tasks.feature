Feature: Habitica tasks
    As an user I want add and delete tasks

Scenario Outline: Can add and delete tasks correctly

  Given I go to habitica home screen
    When I open the login screen
    And I fill with jdfTest and jdfTest
    And I try to login
    And I add a habit <habit>
    And I delete a habit <habit>
    And I add a daily <daily>
    And I delete a daily <daily>
    And I add a to-do <to-do>
    And I delete a to-do <to-do>

    Examples:
      | habit | daily | to-do |
      |myHabit| myDaily| myToDo |
