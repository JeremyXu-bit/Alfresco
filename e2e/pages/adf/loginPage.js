/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

const Util = require('../../util/util');
const TestConfig = require('../../test.config');
const AdfSettingsPage = require('./settingsPage');

const LoginPage = function (){

    const loginURL = TestConfig.adf.url + TestConfig.adf.port;
    const txtUsername = element(by.css("input[id='username']"));
    const txtPassword = element(by.css("input[id='password']"));
    const usernameTooltip = element(by.css("span[data-automation-id='username-error']"));
    const passwordTooltip = element(by.css("span[data-automation-id='password-required']"));
    const loginTooltip = element(by.css("span[class='login-error-message']"));
    const usernameInactive = element(by.css("input[id='username'][aria-invalid='false']"));
    const passwordInactive = element(by.css("input[id='password'][aria-invalid='false']"));
    const usernameHighlighted = element(by.css("input[id='username'][aria-invalid='true']"));
    const passwordHighlighted = element(by.css("input[id='password'][aria-invalid='true']"));
    const signInButton = element(by.id('login-button'));
    const showPassword = element(by.css("mat-icon[data-automation-id='show_password']"));
    const hidePassword = element(by.css("mat-icon[data-automation-id='hide_password']"));
    const rememberMe = element(by.css("mat-checkbox[id='adf-login-remember']"));
    const needHelp = element(by.css("div[id='adf-login-action-left']"));
    const register = element(by.css("div[id='adf-login-action-right']"));
    const footerSwitch = element(by.id("switch4"));
    const userPicture = element(by.id("userinfo_container"));
    const cardBackground = element(by.css("mat-card[class*='adf-login-card']"));
    const adfSettingsPage = new AdfSettingsPage();

   /** 
     * Go to adf login page 
     * @method goToLoginPage 
     */

    this.goToLoginPage = function () {
        browser.get(loginURL);
    };

    /**
     * Provides the longer wait required
     * @property waitForElements
     * @type protractor.Element
     * */
    this.waitForElements = function (){
        const deferred = protractor.promise.defer();

        Util.waitUntilElementIsVisible(txtUsername).then(()=>{
            Util.waitUntilElementIsVisible(txtPassword).then(()=>{
                deferred.fulfill();
            },()=>{
                deferred.rejected();
            })
        });

        return deferred.promise;

    };

    /**
     * Fills the username input
     * @method enterUsername
     * @param {String} username
     */
    this.enterUsername = function (username){
        Util.waitUntilElementIsVisible(txtUsername);
        txtUsername.sendKeys('');
        txtUsername.clear();
        browser.driver.sleep(500);
        txtUsername.sendKeys(username);
    };

    /**
     * Fills the password input
     * @method enterPassword
     * @param {String} password
     */
    this.enterPassword = function (password){
        Util.waitUntilElementIsVisible(txtPassword);
        browser.driver.sleep(500);
        txtPassword.clear();
        txtPassword.sendKeys(password);
    };

    /**
     * clears username input
     * @method clearUsername
     * @param {String} username
     */
    this.clearUsername = function(){
        Util.waitUntilElementIsVisible(txtUsername);
        txtUsername.click().clear();
    };

    /**
     * clears password input
     * @method clearPassword
     * @param {String} password
     */
    this.clearPassword = function (){
        Util.waitUntilElementIsVisible(txtPassword);
        txtPassword.getAttribute('value').then(function (value){
            for (let i = value.length; i >= 0; i--) {
                txtPassword.sendKeys(protractor.Key.BACK_SPACE);
            }
        });
    };

    /**
     * checks username tooltips
     * @method checkUsernameTooltip
     * @param {String} message
     */
    this.checkUsernameTooltip = function (message){
        Util.waitUntilElementIsVisible(usernameTooltip);
    };

    /**
     * checks password tooltips
     * @method checkPasswordTooltip
     * @param {String} message
     */
    this.checkPasswordTooltip = function (message){
        Util.waitUntilElementIsVisible(passwordTooltip);
    };

    /**
     * checks login error tooltips
     * @method checkLoginError
     * @param {String} message
     */
    this.checkLoginError = function (message){
        Util.waitUntilElementIsVisible(loginTooltip);
        expect(loginTooltip.getText()).toEqual(message);
    };

    /**
     * checks username field is inactive
     * @method checkUsernameInactive
     */
    this.checkUsernameInactive = function (){
        Util.waitUntilElementIsVisible(usernameInactive);
    },

    /**
     * checks password field is inactive
     * @method checkPasswordInactive
     */
    this.checkPasswordInactive = function (){
        Util.waitUntilElementIsVisible(passwordInactive);
    };

    /**
     * checks username field is highlighted
     * @method checkUsernameHighlighted
     */
    this.checkUsernameHighlighted = function (){
        txtPassword.click();
        Util.waitUntilElementIsVisible(usernameHighlighted);
    };

    /**
     * checks password field is highlighted
     * @method checkPasswordHighlighted
     */
    this.checkPasswordHighlighted = function (){
        txtUsername.click();
        Util.waitUntilElementIsVisible(passwordHighlighted);
    };

    /**
     * check Username tooltip is not visible
     * @method checkUsernameTooltipIsNotVisible
     */
    this.checkUsernameTooltipIsNotVisible = function (){
        Util.waitUntilElementIsNotVisible(usernameTooltip);
    };

    /**
     * checks password tooltip is not visible
     * @method checkPasswordTooltipIsNotVisible
     */
    this.checkPasswordTooltipIsNotVisible = function (){
        Util.waitUntilElementIsNotVisible(passwordTooltip);
    };

    /**
     * checks sign in button is enabled
     * @method checkSignInButtonIsEnabled
     */
    this.checkSignInButtonIsEnabled = function (){
        Util.waitUntilElementIsVisible(signInButton);
        expect(signInButton.isEnabled()).toBe(true);
    };

    /**
     * Logs into adf using default host config
     * @method defaultLogin
     */
    this.defaultLogin = function (){
        browser.driver.get(TestConfig.adf.url + TestConfig.adf.login);
        this.login(TestConfig.adf.adminEmail, TestConfig.adf.adminPassword);
    };

    /**
     * Logs into adf using userModel
     * @method loginUsingUserModel
     */
    this.loginUsingUserModel = function (userModel){
        browser.driver.get(TestConfig.adf.url + TestConfig.adf.login);
        this.waitForElements();
        this.login(userModel.getId(), userModel.getPassword());
    };

    /**
     * Logs into ADF using userModel - only Process Services enabled
     * @method loginUsingUserModel
     */
    this.loginToProcessServicesUsingUserModel = function (userModel) {
        this.waitForElements();
        this.login(userModel.email, userModel.password);
    };


    this.loginToProcessServicesUsingDefaultUser = function (){
        adfSettingsPage.setProviderBpm();
        this.waitForElements();
        this.login(TestConfig.adf.adminEmail, TestConfig.adf.adminPassword);
    };

    this.loginToContentServicesUsingUserModel = function (userModel) {
        adfSettingsPage.setProviderEcm();
        this.waitForElements();

        this.login(userModel.getId(), userModel.getPassword());
    };

    /**
     * checks sign in button is disabled
     * @method checkSignInButtonIsDisabled
     */
    this.checkSignInButtonIsDisabled = function (){
        Util.waitUntilElementIsVisible(signInButton);
        expect(signInButton.isEnabled()).toBe(false);
    };

    /**
     * clicks the sign in button
     * @method clickSignInButton
     */
    this.clickSignInButton = function (){
        Util.waitUntilElementIsVisible(signInButton);
        signInButton.click();
    };

    /**
     * clicks icon to show password
     * @method showPassword
     */
    this.showPassword = function (){
        Util.waitUntilElementIsVisible(showPassword);
        showPassword.click();
    };

    this.getShowPasswordIconColor = () => {
        const deferred = protractor.promise.defer();

        Util.waitUntilElementIsVisible(showPassword);
        showPassword.getCssValue('color').then(function (value) {
            deferred.fulfill(value);
        });

        return deferred.promise;
    };

    this.getSignInButtonColor = function (){
        const deferred = protractor.promise.defer();
        Util.waitUntilElementIsVisible(signInButton);
        signInButton.getCssValue("color").then(function (value) {
            deferred.fulfill(value);
        });

        return deferred.promise;
    };

    this.getBackgroundColor = function (){
        const deferred = protractor.promise.defer();
        Util.waitUntilElementIsVisible(cardBackground);
        cardBackground.getCssValue("color").then(function (value) {
            deferred.fulfill(value);
        });

        return deferred.promise;
    };

    /**
     * clicks icon to hide password
     * @method hidePassword
     */
    this.hidePassword = function (){
        Util.waitUntilElementIsVisible(hidePassword);
        hidePassword.click();
    };

    /**
     * checks if password is shown
     * @method checkPasswordIsShown
     * @param password
     */
    this.checkPasswordIsShown = function (password){
        txtPassword.getAttribute('value').then(function (text) {
            expect(text).toEqual(password);
        });
    };

    /**
     * checks if password is hidden
     * @method checkPasswordIsHidden
     */
    this.checkPasswordIsHidden = function (){
        Util.waitUntilElementIsVisible(txtPassword);
    };

    /**
     * checks 'Remember me' is displayed
     * @method checkRememberIsDisplayed
     */
    this.checkRememberIsDisplayed = function (){
        Util.waitUntilElementIsVisible(rememberMe);
    };

    /**
     * checks 'Remember me' is not displayed
     * @method checkRememberIsNotDisplayed
     */
    this.checkRememberIsNotDisplayed = function (){
        Util.waitUntilElementIsNotVisible(rememberMe);
    };

    /**
     * checks 'Need help' is Displayed
     * @method checkNeedHelpIsDisplayed
     */
    this.checkNeedHelpIsDisplayed = function (){
        Util.waitUntilElementIsVisible(needHelp);
    };

    /**
     * checks 'Need Help' is not displayed
     * @method checkNeedHelpIsNotDisplayed
     */
    this.checkNeedHelpIsNotDisplayed = function (){
        Util.waitUntilElementIsNotVisible(needHelp);
    };

    /**
     * checks 'Register' is displayed
     * @method checkRegisterDisplayed
     */
    this.checkRegisterDisplayed = function (){
        Util.waitUntilElementIsVisible(register);
    };

    /**
     * checks 'Register' is not displayed
     * @method checkRegisterIsNotDisplayed
     */
    this.checkRegisterIsNotDisplayed = function (){
        Util.waitUntilElementIsNotVisible(register);
    };

    /**
     * enables footer switch
     * @method enableFooter
     */
    this.enableFooter = function (){
        Util.waitUntilElementIsVisible(footerSwitch);
        footerSwitch.getAttribute('class').then(function (check) {
            if (check === 'mat-slide-toggle mat-primary'){
                footerSwitch.click();
                expect(footerSwitch.getAttribute('class')).toEqual('mat-slide-toggle mat-primary mat-checked');
            }
        })
    };

    /**
     * disables footer switch
     * @method disableFooter
     */
    this.disableFooter = function (){
        Util.waitUntilElementIsVisible(footerSwitch);
        footerSwitch.getAttribute('class').then(function (check) {
            if (check ==='mat-slide-toggle mat-primary mat-checked'){
                footerSwitch.click();
                expect(footerSwitch.getAttribute('class')).toEqual('mat-slide-toggle mat-primary');
            }
        })
    };

    /**
     * logs in with a valid user
     * @method login
     * @param {String, String} username, password
     */
    this.login = function (username, password) {
        this.waitForElements();
        this.enterUsername(username);
        this.enterPassword(password);
        this.clickSignInButton();
        Util.waitUntilElementIsVisible(userPicture);
    };

};

module.exports = LoginPage;
