var assert = require('assert');

const habiticaUrl = 'https://habitica.com/';


function login(user, pass) {
  browser.element('a[href="/login"]').click();
  browser.waitForVisible('#usernameInput');
  browser.waitForVisible('#passwordInput');
  var userInput = browser.element('#usernameInput');
  userInput.click();
  userInput.keys(user);
  var passwordInput = browser.element('#passwordInput');
  passwordInput.click()
  passwordInput.keys(pass);
  browser.element('.btn.btn-info').click();
}

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
  browser.pause(2500);
  var text = browser.alertText();
  browser.alertAccept();
  assert.ok(text.indexOf("delete") >= 0, "Wrong msg: " + text + ". Expected it to include: delete");
  browser.pause(2500);
}

describe('Habitica login', function() {
    var originalTimeout;

    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
        browser.deleteCookie();
        browser.url(habiticaUrl);
    });

    it('should fail at log in', function () {
        login('wrongUser', 'asdfqwer');
        browser.element('.notification.callout.animated.error.positive');
    });

    it('should login correctly', function() {
      login('jdfTest', 'jdfTest');
      browser.element('*=jdfTest');
    });

    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        browser.reload();
    });
});


describe('Tasks', function() {
    var originalTimeout;

    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
        browser.deleteCookie();
        browser.url(habiticaUrl);
        login('jdfTest', 'jdfTest');
    });

    it('should add and delete habit', function() {
        addHabit('my habit');
        deleteTask('my habit');
    });

    it('should add and delete to-do', function() {
        addToDo('my todo');
        deleteTask('my todo');
    });

    it('should add and delete daily', function() {
        addDaily('my daily');
        deleteTask('my daily');
    });

    it('should mark habit as completed', function() {
        addHabit('my habit');
        $$('.task-control.habit-control')[0].click();
        browser.element("*=+1");
        deleteTask('my habit');
    });

    it('should mark daily as completed', function() {
        addDaily('my daily');
        $$('.daily .task-control.daily-todo-control')[0].click();
        $$('.daily .task-control.task-disabled-daily-todo-control-inner')[0].click();
        deleteTask('my daily');
    });

    it('should mark todo as completed', function() {
        addToDo('my todo');
        $$('.todo .task-control.daily-todo-control')[0].click();
    });

    it('should search for task', function() {
      addHabit('habit to find');
      var elem = $('.tasks-navigation input.input-search');
      elem.click();
      elem.keys('habit to find');
      browser.getText('.habit*=habit to find');
      deleteTask('habit to find');
    });

    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        browser.reload();
    });
});
