/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import LoginPage = require('./pages/adf/loginPage');
import LogOutComponent = require('./pages/adf/logOutComponent');
import ProcessServicesPage = require('./pages/adf/process_services/processServicesPage');
import StartProcessPage = require('./pages/adf/process_services/startProcessPage');
import InfoDrawerComponent = require('./pages/adf/infoDrawerComponent');
import TaskDetailsPage = require('./pages/adf/process_services/taskDetailsPage');
import AppNavigationBarPage = require('./pages/adf/process_services/appNavigationBarPage');
import DataTablePage = require('./pages/adf/dataTablePage');
import BreadcrumbComponent = require('./pages/adf/breadcrumbComponent');
import User = require('./models/APS/User');
import AppPublish = require('./models/APS/AppPublish');
import Tenant = require('./models/APS/Tenant');
import TestConfig = require('./test.config');
import resources = require('./util/resources');
import AlfrescoApi = require('alfresco-js-api-node');
import fs = require('fs');
import path = require('path');
import moment = require('moment');
import CONSTANTS = require('./util/constants');
import DashboardSettingsComponent = require('./pages/adf/dashboardSettingsComponent');
import { DashboardSettingsComponent } from 'app/components';
import { DashboardSettingsComponent } from 'app/components';
import { DashboardSettingsComponent } from 'app/components';
import { DashboardSettingsComponent } from 'app/components';
import { log } from 'util';

describe('Dashboard component', () => {

    const loginPage = new LoginPage();
    const logOutComponent = new LogOutComponent();
    const appNavigationBarPage = new AppNavigationBarPage();
    const processServicesPage = new ProcessServicesPage();
    const dataTablePage = new DataTablePage();
    const infoDrawerComponent = new InfoDrawerComponent();
    const dashboardSettingsComponent = new DashboardSettingsComponent();
    const app = resources.Files.SIMPLE_APP_WITH_USER_FORM;
    const appVersion = resources.Files.DASHBOARD_TEST;
    const startProcessPage = new StartProcessPage();
    const taskDetailsPage = new TaskDetailsPage();
    let appIdVr, appId, procUserModel, secondProcUserModel, tenantId;
    const breadcrumbComponent = new BreadcrumbComponent();

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

        this.alfrescoJsApiUserTwo = new AlfrescoApi({
            provider: 'BPM',
            hostBpm: TestConfig.adf.url
        });

        await this.alfrescoJsApiUserTwo.login(secondProcUserModel.email, secondProcUserModel.password);

        const pathFile = path.join(TestConfig.main.rootPath + app.file_location);
        const file = fs.createReadStream(pathFile);

        appId = (await this.alfrescoJsApiUserTwo.activiti.appsApi.importAppDefinition(file)).id;

        const publishApp = await this.alfrescoJsApiUserTwo.activiti.appsApi.publishAppDefinition(appId, new AppPublish());

        await this.alfrescoJsApiUserTwo.activiti.appsApi.deployAppDefinitions({ appDefinitions: [{ id: publishApp.appDefinition.id }] });

        const pathFileVersion = path.join(TestConfig.main.rootPath + appVersion.file_location);
        const fileVersion = fs.createReadStream(pathFileVersion);

        appIdVr = (await this.alfrescoJsApiUserTwo.activiti.appsApi.importAppDefinition(fileVersion)).id;

        const publishAppVersion = await this.alfrescoJsApiUserTwo.activiti.appsApi.publishAppDefinition(appIdVr, new AppPublish());

        await this.alfrescoJsApiUserTwo.activiti.appsApi.deployAppDefinitions({ appDefinitions: [{ id: publishAppVersion.appDefinition.id }] });

        done();
    });

    afterAll(async (done) => {
        await this.alfrescoJsApiUserTwo.activiti.modelsApi.deleteModel(appId);

        await this.alfrescoJsApi.activiti.adminTenantsApi.deleteTenant(tenantId);

        done();
    });

    describe('Dashboard Component', () => {
        describe('simple app', () => {
            beforeEach(() => {
                loginPage.goToLoginPage();
                loginPage.loginToProcessServicesUsingUserModel(secondProcUserModel);
            });

            afterEach(async () => {
                logOutComponent.clickLogOutButton();
            });
        // TODO: enable when the DW-813 will be fix
        // it ('[C268169] Should be displayed "No Dashboard found" when Dashboard is empty', () => {
        //     processServicesPage.checkApsContainer();
        //     processServicesPage.goToApp(app.title);
        //     appNavigationBarPage.clickDashboardButton();
        //     dataTablePage.checkNoContentMessage();
        //     breadcrumbComponent.selectBreadcrumbName('Workspace');
        //     processServicesPage.goToApp('Task App');
        //     dataTablePage.checkNoContentMessage();
        // });

    it ('[C268178] Should be able to change dashboard date', async () => {
            processServicesPage.checkApsContainer();
            processServicesPage.goToApp(appVersion.title);
            appNavigationBarPage.clickDashboardButton();
            appNavigationBarPage.clickProcessButton();
            appNavigationBarPage.clickCreateButton();
            appNavigationBarPage.clickCreateProcessButton();
            startProcessPage.enterProcessName('Dashboard Test');
            startProcessPage.selectFromProcessDropdown('Dashboard Test');
            startProcessPage.clickStartProcessButton();
            appNavigationBarPage.clickDashboardButton();
            await dataTablePage.waitForNrOfRows(3);
            dashboardSettingsComponent.changeStartDate('01/01/2018');
            expect(dashboardSettingsComponent.getStartDate()).toEqual('01/01/2018');
            dashboardSettingsComponent.changeEndDate('30/12/2018');
            expect(dashboardSettingsComponent.getEndDate()).toEqual('30/12/2018');
            const row = await dataTablePage.getRowDataByRowNumber(0);
            expect(row[0]).toEqual('Start', 'Activity');
            expect(row[1]).toEqual('', 'Completed Count');
            expect(row[2]).toEqual('', 'Average Duration');
            expect(row[3]).toEqual('1', 'Active Count');
            expect(row[4]).toContain('0.', 'Average Duration');

        });

        it ('[C268176] Should be able to change dashboard status', async () => {
            processServicesPage.checkApsContainer();
            processServicesPage.goToApp(app.title);
            appNavigationBarPage.clickDashboardButton();
            appNavigationBarPage.clickProcessButton();
            appNavigationBarPage.clickCreateButton();
            appNavigationBarPage.clickCreateProcessButton();
            startProcessPage.enterProcessName('Dashboard Status');
            startProcessPage.selectFromProcessDropdown('Simple Process');
            startProcessPage.clickStartProcessButton();
            appNavigationBarPage.clickDashboardButton();
            await dataTablePage.waitForNrOfRows(3);
            dashboardSettingsComponent.clickStatusDropdown();
            dashboardSettingsComponent.selectStatusValue('Active');
            let row = await dataTablePage.getRowDataByRowNumber(0);
            expect(row[0]).toEqual('User Task', 'Activity');
            expect(row[1]).toEqual('0', 'Active Count');
            expect(row[2]).toEqual('0.0', 'Average Duration');
            dashboardSettingsComponent.clickStatusDropdown();
            dashboardSettingsComponent.selectStatusValue('Complete');
            expect(dashboardSettingsComponent.getStatusValue()).toEqual('Complete');
            await dataTablePage.waitForNrOfRows(3);
            row = await dataTablePage.getRowDataByRowNumber(0);
            expect(row[0]).toEqual('startEvent1', 'Activity');
            expect(row[3]).toEqual('1', 'Completed Count');
            expect(row[4]).toEqual('0.0', 'Average Duration');
            appNavigationBarPage.clickSideNavigationBarButton();
            appNavigationBarPage.clickProcessButtonText();
            appNavigationBarPage.clickRunningFilterButton();
            dataTablePage.selectRowDoubleClick(0);
            dataTablePage.clickActionsButton();
            dataTablePage.clickMenuItem('View Task');
            taskDetailsPage.clickUserTaskCompleteButton();
            appNavigationBarPage.clickDashboardButton();
            row = await dataTablePage.getRowDataByRowNumber(0);
            expect(row[0]).toEqual('User Task', 'Activity');
            expect(row[3]).toEqual('1', 'Active Count');
            expect(row[4]).toContain('0.', 'Average Duration');
            dashboardSettingsComponent.clickStatusDropdown();
            dashboardSettingsComponent.selectStatusValue('Active');
            dataTablePage.checkNoContentMessage();

        });
    });

        describe('with an new version of application', () => {
            beforeEach(async () => {
                const publishApp = await this.alfrescoJsApiUserTwo.activiti.appsApi.publishAppDefinition(appId, new AppPublish());
                await this.alfrescoJsApiUserTwo.activiti.appsApi.deployAppDefinitions({ appDefinitions: [{ id: publishApp.appDefinition.id }] });
                const publishAppVersion2 = await this.alfrescoJsApiUserTwo.activiti.appsApi.publishAppDefinition(appIdVr, new AppPublish());
                await this.alfrescoJsApiUserTwo.activiti.appsApi.deployAppDefinitions({ appDefinitions: [{ id: publishAppVersion2.appDefinition.id }] });

                loginPage.goToLoginPage();
                loginPage.loginToProcessServicesUsingUserModel(secondProcUserModel);
            });

            afterEach(() => {
                logOutComponent.clickLogOutButton();
            });

        it ('[C268829] Should be able to select another process definition version', async () => {
            processServicesPage.checkApsContainer();
            processServicesPage.goToApp(appVersion.title);
            appNavigationBarPage.clickDashboardButton();
            dashboardSettingsComponent.clickProcessDefinitionDropDown();
            dashboardSettingsComponent.selectProcessDefinitionValue('Dashboard Test (v2)');
            expect(dashboardSettingsComponent.getProcessDefinitionText()).toEqual('Dashboard Test (v2)');
            dataTablePage.checkNoContentMessage();
        });

        it ('[C268174] Should be able to see the correct information into the dashboard', async () => {
            processServicesPage.checkApsContainer();
            processServicesPage.goToApp(app.title);
            appNavigationBarPage.clickDashboardButton();
            const text = await breadcrumbComponent.getAllCrumbs();
            expect(text[2]).toEqual('Dashboard');
            expect(dashboardSettingsComponent.getProcessDefinitionText()).toEqual('Simple Process (v1)');
            expect(dashboardSettingsComponent.getStatusValue()).toEqual('All');
            expect(dashboardSettingsComponent.getStartDate()).toEqual(moment().subtract(1, 'year').format('DD/MM/YYYY'));
            expect(dashboardSettingsComponent.getEndDate()).toEqual(moment().format('DD/MM/YYYY'));

            appNavigationBarPage.clickProcessButton();
            appNavigationBarPage.clickCreateButton();
            appNavigationBarPage.clickCreateProcessButton();
            startProcessPage.enterProcessName('Dashboard');
            startProcessPage.selectFromProcessDropdown('Simple Process');
            startProcessPage.clickStartProcessButton();
            appNavigationBarPage.clickSideNavigationBarButton();
            appNavigationBarPage.clickRunningFilterButton();
            dataTablePage.selectFromProcessList('Dashboard');
            infoDrawerComponent.clickExpandButton();
            dataTablePage.clickActionsButton();
            dataTablePage.clickMenuItem('View Task');
            taskDetailsPage.clickUserTaskCompleteButton();
            appNavigationBarPage.clickProcessButton();
            appNavigationBarPage.clickSideNavigationBarButton();
            appNavigationBarPage.clickCompletedFilterButton();
            appNavigationBarPage.clickDashboardButton();
            dashboardSettingsComponent.clickProcessDefinitionDropDown();
            dashboardSettingsComponent.selectProcessDefinitionValue('Simple Process (v2)');
            expect(dashboardSettingsComponent.getProcessDefinitionText()).toEqual('Simple Process (v2)');
            await dataTablePage.waitForNrOfRows(4);
            const row1 = await dataTablePage.getRowDataByRowNumber(0);
            expect(row1[0]).toEqual('User Task', 'Activity');
            expect(row1[1]).toEqual('', 'Completed Count');
            expect(row1[2]).toEqual('', 'Average Duration');
            expect(row1[3]).toEqual('1', 'Active Count');
            expect(row1[4]).toContain('0.', 'Average Duration');
        });

      });
    });
});
