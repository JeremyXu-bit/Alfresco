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
import AppNavigationBarPage = require('./pages/adf/process_services/appNavigationBarPage');
import LogOutComponent = require('./pages/adf/logOutComponent');
import DataTablePage = require('./pages/adf/dataTablePage');
import TaskDetailsPage = require('./pages/adf/process_services/taskDetailsPage');
import ViewerPage = require('./pages/adf/viewerPage');
import StartProcessPage = require('./pages/adf/process_services/startProcessPage');
import User = require('./models/APS/User');
import Tenant = require('./models/APS/Tenant');
import AlfrescoApi = require('alfresco-js-api-node');
import BreadcrumbComponent = require('./pages/adf/breadcrumbComponent');
import { AppsActions } from './actions/APS/apps.actions';

describe('Process List Component', () => {
    const loginPage = new LoginPage();
    const logOutComponent = new LogOutComponent();
    const dataTablePage = new DataTablePage();
    const viewerPage = new ViewerPage();
    const processServicesPage = new ProcessServicesPage();
    const appNavigationBarPage = new AppNavigationBarPage();
    const taskDetailsPage = new TaskDetailsPage();
    const breadcrumbComponent = new BreadcrumbComponent();
    const app = resources.Files.APP_WITH_PROCESSES;
    const startProcessPage = new StartProcessPage();
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

        it ('[C277756] Should be displayed the "No Process Found" message when the process list is empty', () => {
            processServicesPage.checkApsContainer();
            processServicesPage.goToApp('Task App');
            appNavigationBarPage.clickProcessButton();
            appNavigationBarPage.clickSideNavigationBarButton();
            appNavigationBarPage.clickRunningFilterButton();
            dataTablePage.checkNoContentMessage();
            appNavigationBarPage.clickCompletedFilterButton();
            dataTablePage.checkNoContentMessage();
            appNavigationBarPage.clickAllFilterButton();
            dataTablePage.checkNoContentMessage();
        });

        it ('[C261126] Should be able open Process details by double clicking on the process ', () => {
            processServicesPage.checkApsContainer();
            processServicesPage.goToApp(app.title);
            appNavigationBarPage.clickCreateButton();
            appNavigationBarPage.clickCreateProcessButton();
            startProcessPage.enterProcessName('Process double click');
            startProcessPage.selectFromProcessDropdown('process_with_se');
            startProcessPage.clickFormStartProcessButton();
            dataTablePage.selectRowDoubleClick(0);
            viewerPage.checkProcessTitleIsDisplayed('Process double click');
            viewerPage.clickCloseButton();
        });

        it ('[C268107] Default process filter ', async () => {
            processServicesPage.checkApsContainer();
            processServicesPage.goToApp(app.title);
            appNavigationBarPage.clickCreateButton();
            appNavigationBarPage.clickCreateProcessButton();
            startProcessPage.enterProcessName('Process Filters');
            startProcessPage.selectFromProcessDropdown('process_with_se');
            startProcessPage.clickFormStartProcessButton();
            appNavigationBarPage.clickSideNavigationBarButton();
            appNavigationBarPage.clickRunningFilterButton();
            let text = await breadcrumbComponent.getAllCrumbs();
            expect(text[3]).toEqual('Running');
            dataTablePage.checkNameIsDisplayedInList('Process Filters');
            dataTablePage.selectRowDoubleClick(0);
            dataTablePage.clickActionsButton();
            dataTablePage.clickMenuItem('View Task');
            taskDetailsPage.clickCompleteButton();
            appNavigationBarPage.clickProcessButton();
            appNavigationBarPage.clickSideNavigationBarButton();
            appNavigationBarPage.clickCompletedFilterButton();
            text = await breadcrumbComponent.getAllCrumbs();
            expect(text[3]).toEqual('Completed');
            dataTablePage.checkNameIsDisplayedInList('Process Filters');
            appNavigationBarPage.clickAllFilterButton();
            text = await breadcrumbComponent.getAllCrumbs();
            expect(text[3]).toEqual('All');
            dataTablePage.checkNameIsDisplayedInList('Process Filters');
        });
    });
