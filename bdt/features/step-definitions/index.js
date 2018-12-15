//Complete siguiendo las instrucciones del taller
let {defineSupportCode} = require('cucumber');
let {expect} = require('chai');


function addHabit(habit) {
  addGeneric(habit, 'habit');
}

function addToDo(todo) {
  addGeneric(todo, 'todo');
}

function addDaily(daily) {
  addGeneric(daily, 'daily');
}

function addGeneric(name, type) {
  browser.waitForVisible('.' + type + ' .quick-add');
  var element = browser.element('.' + type + ' .quick-add');
  element.click();
  element.keys(name + "\uE006");
}

function deleteTask(name) {
  browser.waitForVisible(".markdown*=" + name);
  browser.element(".markdown*=" + name).click();
  browser.waitForVisible(".delete-task-btn");
  browser.element('.delete-task-btn').click();
  browser.pause(1500);
  var text = browser.alertText();
  browser.alertAccept();
  expect(text).to.have.string("borrar");
  browser.pause(2500);
}

defineSupportCode(({Given, When, Then}) => {
  Given('I go to habitica home screen', () => {
    browser.url('https://habitica.com/static/home');
    browser.waitForVisible('a[href="/login"]');
  });

  When('I open the login screen', () => {
    browser.element('a[href="/login"]').click();
    browser.waitForVisible('#usernameInput');
    browser.waitForVisible('#passwordInput');
  });

  When('I try to login', () => {
    browser.element('.btn.btn-info').click();
  });

  When(/^I fill with (.*) and (.*)$/ , (username, password) => {
    var userInput = browser.element('#usernameInput');
    userInput.click();
    userInput.keys(username);
    var passwordInput = browser.element('#passwordInput');
    passwordInput.click()
    passwordInput.keys(password);
  });

  When(/^I add a habit (.*)$/ , (habit) => {
    addHabit(habit);
  });

  When(/^I delete a habit (.*)$/ , (habit) => {
    deleteTask(habit);
  });

  When(/^I add a daily (.*)$/ , (daily) => {
    addDaily(daily);
  });

  When(/^I delete a daily (.*)$/ , (daily) => {
    deleteTask(daily);
  });

  When(/^I add a to-do (.*)$/ , (todo) => {
    addToDo(todo);
  });

  When(/^I delete a to-do (.*)$/ , (todo) => {
    deleteTask(todo);
  });

  Then('I expect to see {string}', (error) => {
    browser.waitForVisible('.notification.callout.animated.error.positive', 5000);
    let alertText = browser.element('.notification.callout.animated.error.positive').getText();
    expect(alertText).to.have.string(error);

  });

});
