/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import LoginPage = require('./pages/adf/loginPage');
import TestConfig = require('./test.config');
import AcsUserModel = require('./models/ACS/acsUserModel');

describe('Test Login component', () => {
    const loginPage = new LoginPage();
    const adminUserModel = new AcsUserModel({
        'id': TestConfig.adf.adminUser,
        'password': TestConfig.adf.adminPassword
    });

    const errorMessages = {
        username: 'Your username needs to be at least 2 characters.',
        invalid_credentials: 'You\'ve entered an unknown username or password',
        password: 'Enter your password to sign in',
        required: 'Required'
    };

    beforeAll (() => loginPage.goToLoginPage());

    it('[C261054] Should be displayed "Required" when username is not completed', () => {
        loginPage.checkUsernameInactive();
        loginPage.checkSignInButtonIsDisabled();
        loginPage.enterUsername('A');
        loginPage.checkUsernameTooltip(errorMessages.username);
        loginPage.clearUsername();
        loginPage.checkUsernameTooltip(errorMessages.required);
        loginPage.checkUsernameHighlighted();
    });

    it('[C261055] Should be displayed "Enter your password to sign in" when password is not completed', () => {
        loginPage.checkPasswordInactive();
        loginPage.checkSignInButtonIsDisabled();
        loginPage.enterPassword('A');
        loginPage.checkPasswordTooltipIsNotVisible();
        loginPage.clearPassword();
        loginPage.checkPasswordTooltip(errorMessages.password);
        loginPage.checkPasswordHighlighted();
        loginPage.checkSignInButtonIsDisabled();
    });

    it('[C261056] The Username should be at least 2 characters long', () => {
        loginPage.checkSignInButtonIsDisabled();
        loginPage.enterUsername('A');
        loginPage.checkUsernameTooltip(errorMessages.username);
        loginPage.enterUsername('AB');
        loginPage.checkUsernameTooltipIsNotVisible();
        loginPage.checkSignInButtonIsDisabled();
        loginPage.clearUsername();
    });

    it('[C261057] The Login button should be enabled when username and password fields are completed', () => {
        loginPage.enterUsername(adminUserModel.id);
        loginPage.checkSignInButtonIsDisabled();
        loginPage.enterPassword('a');
        loginPage.checkSignInButtonIsEnabled();
        loginPage.clearUsername(adminUserModel.id);
        loginPage.clearPassword();
    });

    it('[C261058] Should be displayed an error message when is entered an invalid username or password', () => {
        loginPage.checkSignInButtonIsDisabled();
        loginPage.enterUsername('test');
        loginPage.enterPassword('test');
        loginPage.checkSignInButtonIsEnabled();
        loginPage.clickSignInButton();
        loginPage.checkLoginError(errorMessages.invalid_credentials);
        loginPage.clearUsername();
        loginPage.clearPassword();
    });

    it('[C261059] Password field is crypted', () => {
        loginPage.checkSignInButtonIsDisabled();
        loginPage.enterPassword('test');
        loginPage.showPassword();
        loginPage.checkPasswordIsShown('test');
        loginPage.hidePassword();
        loginPage.checkPasswordIsHidden();
        loginPage.clearPassword();
    });

});
