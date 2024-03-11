import { Selector } from 'testcafe';

fixture `Valid Login`
    .page `https://localhost:5243/Account/Login`;

test('Invalid Login', async t => {
    await t
        // Arrange
        .typeText('#Username', 'hello')
        .typeText('#Password', 'world')

        // Act
        .click('body > div.content > div > div > div > div.col-sm-6 > form > div > button')

        // Assert
        .expect(Selector('body > div.content > div > div > div > div.col-sm-6 > form > div > div.alert.alert-danger > div > ul > li').innerText).contains("Invalid username or password");
});

test('Missing username', async t => {
    await t
        // Arrange
        .typeText('#Password', 'world')

        // Act
        .click('body > div.content > div > div > div > div.col-sm-6 > form > div > button')

        // Assert
        .expect(Selector('body > div.content > div > div > div > div.col-sm-6 > form > div > div.alert.alert-danger > div > ul > li').innerText).contains("The Username field is required.");
});

test('Missing password', async t => {
    await t
        // Arrange
        .typeText('#Username', 'hello')

        // Act
        .click('body > div.content > div > div > div > div.col-sm-6 > form > div > button')

        // Assert
        .expect(Selector('body > div.content > div > div > div > div.col-sm-6 > form > div > div.alert.alert-danger > div > ul > li').innerText).contains("The Password field is required.");
});