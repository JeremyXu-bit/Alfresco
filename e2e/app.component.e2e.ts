/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import TestConfig = require('./test.config');
import resources = require('./util/resources');
import LoginPage = require('./pages/adf/loginPage');
import ProcessServicesPage = require('./pages/adf/process_services/processServicesPage');
import LogOutComponent = require('./pages/adf/logOutComponent');
import BreadcrumbComponent = require('./pages/adf/breadcrumbComponent');

import User = require('./models/APS/User');
import AppPublish = require('./models/APS/AppPublish');
import Tenant = require('./models/APS/Tenant');

import AlfrescoApi = require('alfresco-js-api-node');
import fs = require('fs');
import path = require('path');
import { AppsActions } from './actions/APS/apps.actions';

describe('APP Component', () => {
    const loginPage = new LoginPage();
    const logOutComponent = new LogOutComponent();
    const breadcrumbComponent = new BreadcrumbComponent();
    const processServicesPage = new ProcessServicesPage();
    const app = resources.Files.APP_WITH_PROCESSES;
    let appId, secondProcUserModel, tenantId;

    beforeAll(async (done) => {
        const apps = new AppsActions();
        this.alfrescoJsApi = new AlfrescoApi({
            provider: 'BPM',
            hostBpm: TestConfig.adf.url
        });

        await this.alfrescoJsApi.login(TestConfig.adf.adminEmail, TestConfig.adf.adminPassword);

        tenantId = (await this.alfrescoJsApi.activiti.adminTenantsApi.createTenant(new Tenant())).id;

        secondProcUserModel = new User({ tenantId });
        await this.alfrescoJsApi.activiti.adminUsersApi.createNewUser(secondProcUserModel);

        await this.alfrescoJsApi.login(secondProcUserModel.email, secondProcUserModel.password);

        const importedApp = await apps.importPublishDeployApp(this.alfrescoJsApi, app.file_location);
        appId = importedApp.id;

        loginPage.goToLoginPage();
        loginPage.loginToProcessServicesUsingUserModel(secondProcUserModel);

        done();

    });

    afterAll(async (done) => {
        await this.alfrescoJsApi.activiti.modelsApi.deleteModel(appId);
        await this.alfrescoJsApi.login(TestConfig.adf.adminEmail, TestConfig.adf.adminPassword);
        await this.alfrescoJsApi.activiti.adminTenantsApi.deleteTenant(tenantId);
        logOutComponent.clickLogOutButton();
        done();
    });

    beforeEach(() => {
        processServicesPage.goToAppsMenu();
    });
        it ('[C284878] Should render the default landing page dashboard', async () => {
            processServicesPage.checkApsContainer();
            browser.executeScript('window.localStorage.setItem("landing-page", "dashboard/default")');
            browser.driver.navigate().refresh();
            processServicesPage.goToApp('Task App');
            const text = await breadcrumbComponent.getAllCrumbs();
            expect(text[2]).toEqual('Dashboard');
        });

        it ('[C284875] Should be able to change the default landing page with tasks', async () => {
            processServicesPage.checkApsContainer();
            browser.executeScript('window.localStorage.setItem("landing-page", "tasks")');
            browser.driver.navigate().refresh();
            processServicesPage.goToApp('Task App');
            const text = await breadcrumbComponent.getAllCrumbs();
            expect(text[2]).toEqual('Tasks');
        });

        it ('[C284877] Should be able to change the default landing page with processes', async () => {
            processServicesPage.checkApsContainer();
            browser.executeScript('window.localStorage.setItem("landing-page", "processes")');
            browser.driver.navigate().refresh();
            processServicesPage.goToApp('Task App');
            const text = await breadcrumbComponent.getAllCrumbs();
            expect(text[2]).toEqual('Processes');
        });
    });
