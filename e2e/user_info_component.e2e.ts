/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import TestConfig = require('./test.config');
import LoginPage = require('./pages/adf/loginPage');
import LogOutComponent = require('./pages/adf/logOutComponent');
import UserInfoDialog = require('./pages/adf/dialog/userInfoDialog');
import User = require('./models/APS/User');
import Tenant = require('./models/APS/Tenant');
import AlfrescoApi = require('alfresco-js-api-node');

describe('User Info Component', () => {
    const loginPage = new LoginPage();
    const logOutComponent = new LogOutComponent();
    const userInfoDialog = new UserInfoDialog();
    let procUserModel, secondProcUserModel, tenantId;

    beforeAll(async (done) => {
        this.alfrescoJsApi = new AlfrescoApi({
            provider: 'BPM',
            hostBpm: TestConfig.adf.url
        });

        await this.alfrescoJsApi.login(TestConfig.adf.adminEmail, TestConfig.adf.adminPassword);

        tenantId = (await this.alfrescoJsApi.activiti.adminTenantsApi.createTenant(new Tenant())).id;

        procUserModel = new User({ tenantId });
        secondProcUserModel = new User({ tenantId });

        await this.alfrescoJsApi.activiti.adminUsersApi.createNewUser(procUserModel);
        await this.alfrescoJsApi.activiti.adminUsersApi.createNewUser(secondProcUserModel);

        loginPage.goToLoginPage();
        loginPage.loginToProcessServicesUsingUserModel(secondProcUserModel);
        done();

    });

    afterAll(async (done) => {

        await this.alfrescoJsApi.activiti.adminTenantsApi.deleteTenant(tenantId);
        logOutComponent.clickLogOutButton();
        done();
    });

        it('[C261120] User information is displayed in user info', () => {
           userInfoDialog.clickUserImage();
           userInfoDialog.userImageIsDisplayed();
           expect(userInfoDialog.getContentHeaderTitle())
                .toEqual(`${secondProcUserModel.firstName} ${secondProcUserModel.lastName}`);
           expect(userInfoDialog.getContentTitle())
                .toEqual(`${secondProcUserModel.firstName} ${secondProcUserModel.lastName}`);
           expect(userInfoDialog.getContentEmail())
                .toEqual(secondProcUserModel.email);
           userInfoDialog.checkTenantTitleIsDisplayed('Tenant');
           browser.driver.navigate().refresh();
           expect(userInfoDialog.getUserInfoName())
                .toEqual(`${secondProcUserModel.firstName} ${secondProcUserModel.lastName}`);
           logOutComponent.clickLogOutButton();
           loginPage.loginToProcessServicesUsingUserModel(procUserModel);
           expect(userInfoDialog.getUserInfoName())
                .toEqual(`${procUserModel.firstName} ${procUserModel.lastName}`);
        });
});
