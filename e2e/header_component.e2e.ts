/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import TestConfig = require('./test.config');
import LoginPage = require('./pages/adf/loginPage');
import AlfrescoApi = require('alfresco-js-api-node');
import HeaderComponent = require('./pages/adf/headerComponent');
import User = require('./models/APS/User');
import Tenant = require('./models/APS/Tenant');
import LogOutComponent = require('./pages/adf/logOutComponent');
import ProcessServicesPage = require('./pages/adf/process_services/processServicesPage');


describe('Header Component', () => {

    const loginPage = new LoginPage();
    const headerComponent = new HeaderComponent();
    const logOutComponent = new LogOutComponent();
    const processServicesPage = new ProcessServicesPage();
    let procUserModel, tenantId;

    beforeAll(async(done) => {

        this.alfrescoJsApi = new AlfrescoApi({
            provider: 'BPM',
            hostBpm: TestConfig.adf.url
        });

        await this.alfrescoJsApi.login(TestConfig.adf.adminEmail, TestConfig.adf.adminPassword);

        tenantId = (await this.alfrescoJsApi.activiti.adminTenantsApi.createTenant(new Tenant())).id;

        procUserModel = new User({ tenantId });
        await this.alfrescoJsApi.activiti.adminUsersApi.createNewUser(procUserModel);

        loginPage.goToLoginPage();
        loginPage.loginToProcessServicesUsingUserModel(procUserModel);

        done();
    });

    afterAll(async(done) => {
        await this.alfrescoJsApi.login(TestConfig.adf.adminEmail, TestConfig.adf.adminPassword);
        await this.alfrescoJsApi.activiti.adminTenantsApi.deleteTenant(tenantId);
        logOutComponent.clickLogOutButton();
        done();
    });

    it('[C284674] Should be able to view Header component on Workspace page', () => {
        headerComponent.checkLogoIsDisplayed();
        headerComponent.checkTitleIsDisplayed('Process Services Workspace');
        headerComponent.checkUserNameIsDisplayed(`${procUserModel.firstName} ${procUserModel.lastName}`);
        headerComponent.checkUserImageIsDisplayed();
        headerComponent.checkActionsButtonIsDisplayed();
        headerComponent.checkLanguageButtonIsDisplayed();
    });

    it('[C284677] Should be able to view Header component on the Application page', () => {
        processServicesPage.checkApsContainer();
        processServicesPage.goToApp('Task App');
        headerComponent.checkMenuButtonIsDisplayed();
        headerComponent.checkLogoIsDisplayed();
        headerComponent.checkTitleIsDisplayed('Process Services Workspace');
        headerComponent.checkUserNameIsDisplayed(`${procUserModel.firstName} ${procUserModel.lastName}`);
        headerComponent.checkUserImageIsDisplayed();
        headerComponent.checkActionsButtonIsDisplayed();
        headerComponent.checkLanguageButtonIsDisplayed();
    });

});
