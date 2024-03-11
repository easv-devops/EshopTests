import { Selector } from 'testcafe';

fixture `Valid Login`
    .page `https://localhost:5243/Account/Login`;

test('Valid Login', async t => {
    await t
        // Arrange
        .typeText('#Username', 'alice')
        .typeText('#Password', 'Pass123$')

        // Act
        .click('body > div.content > div > div > div > div.col-sm-6 > form > div > button')

        // Assert
        .expect(Selector('body > div.content > div > h1').innerText).contains("Welcome to IdentityServer4 (version 6.3.5)");
});