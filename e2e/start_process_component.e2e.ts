/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import Util = require('./util/util');
import TestConfig = require('./test.config');
import resources = require('./util/resources');
import LoginPage = require('./pages/adf/loginPage');
import ProcessServicesPage = require('./pages/adf/process_services/processServicesPage');
import StartProcessPage = require('./pages/adf/process_services/startProcessPage');
import AppNavigationBarPage = require('./pages/adf/process_services/appNavigationBarPage');
import ProcessDetailsPage = require('./pages/adf/process_services/processDetailsPage');
import AttachmentListPage = require('./pages/adf/process_services/attachmentListPage');
import LogOutComponent = require('./pages/adf/logOutComponent');
import DataTablePage = require('./pages/adf/dataTablePage');
import InfoDrawerComponent = require('./pages/adf/infoDrawerComponent');
import ViewerPage = require('./pages/adf/viewerPage');
import TaskDetailsPage = require('./pages/adf/process_services/taskDetailsPage');
import User = require('./models/APS/User');
import AppPublish = require('./models/APS/AppPublish');
import Tenant = require('./models/APS/Tenant');
import FileModel = require('./models/ACS/fileModel');
import AlfrescoApi = require('alfresco-js-api-node');
import fs = require('fs');
import path = require('path');
import { AppsActions } from './actions/APS/apps.actions';

describe('Start Process Component', () => {

    const loginPage = new LoginPage();
    const logOutComponent = new LogOutComponent();
    const dataTablePage = new DataTablePage();
    const infoDrawerComponent = new InfoDrawerComponent();
    const viewerPage = new ViewerPage();
    const processServicesPage = new ProcessServicesPage();
    const startProcessPage = new StartProcessPage();
    const appNavigationBarPage = new AppNavigationBarPage();
    const processDetailsPage = new ProcessDetailsPage();
    const attachmentListPage = new AttachmentListPage();
    const taskDetailsPage = new TaskDetailsPage();
    const app = resources.Files.APP_WITH_PROCESSES;
    let appId, procUserModel, secondProcUserModel, tenantId;

    const jpgFile = new FileModel({
        'location': resources.Files.ADF_DOCUMENTS.JPG.file_location,
        'name': resources.Files.ADF_DOCUMENTS.JPG.file_name
    });

    beforeAll(async (done) => {
        const apps = new AppsActions();
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

        await this.alfrescoJsApi.login(secondProcUserModel.email, secondProcUserModel.password);

        const importedApp = await apps.importPublishDeployApp(this.alfrescoJsApi, app.file_location);
        appId = importedApp.id;

        done();

    });

    afterAll(async (done) => {
        await this.alfrescoJsApi.activiti.modelsApi.deleteModel(appId);
        await this.alfrescoJsApi.login(TestConfig.adf.adminEmail, TestConfig.adf.adminPassword);
        await this.alfrescoJsApi.activiti.adminTenantsApi.deleteTenant(tenantId);

        done();
    });

        describe('with process model', () => {
            beforeEach(() => {
                loginPage.goToLoginPage();
                loginPage.loginToProcessServicesUsingUserModel(secondProcUserModel);
            });

            afterEach(() => {
                logOutComponent.clickLogOutButton();
            });

            it('[C274700] Should be able to Start a Process and cancel the start', () => {
                processServicesPage.checkApsContainer();
                processServicesPage.goToApp(app.title);
                appNavigationBarPage.clickProcessButton();
                appNavigationBarPage.clickCreateButton();
                appNavigationBarPage.clickCreateProcessButton();
                startProcessPage.selectFromProcessDropdown('process_without_se');
                startProcessPage.enterProcessName('Cancel Process');
                startProcessPage.checkStartProcessButtonIsEnabled();
                startProcessPage.clickCancelProcessButton();
                dataTablePage.checkNoContentMessage();
            });

            it('[C268864] Should be able to Start Process in Task App', async () => {
                processServicesPage.checkApsContainer();
                processServicesPage.goToApp('Task App');
                appNavigationBarPage.clickProcessButton();
                appNavigationBarPage.clickCreateButton();
                appNavigationBarPage.clickCreateProcessButton();
                expect(startProcessPage.getDefaultName()).toEqual('');
                startProcessPage.enterProcessName('Test Task App');
                startProcessPage.selectFromProcessDropdown('process_with_se');
                startProcessPage.clickFormStartProcessButton();

                const row = await dataTablePage.getRowDataByRowNumber(0);
                expect(row[0]).toEqual('Test Task App');
                expect(row[1]).toContain('seconds');
                expect(row[3]).toEqual(`${secondProcUserModel.firstName} ${secondProcUserModel.lastName}`);
            });

            it('[C268862] Should be able to Start Process without form in start event', async () => {
                processServicesPage.checkApsContainer();
                processServicesPage.goToApp(app.title);
                appNavigationBarPage.clickProcessButton();
                appNavigationBarPage.clickCreateButton();
                appNavigationBarPage.clickCreateProcessButton();
                startProcessPage.enterProcessName('Test');
                startProcessPage.selectFromProcessDropdown('process_with_se');
                startProcessPage.clickFormStartProcessButton();

                const row = await dataTablePage.getRowDataByRowNumber(0);
                expect(row[0]).toEqual('Test');
                expect(row[1]).toContain('seconds');
                expect(row[3]).toEqual(`${secondProcUserModel.firstName} ${secondProcUserModel.lastName}`);
            });

            it('[C268605] Should be able to add Comment in a Process', () => {
                processServicesPage.checkApsContainer();
                processServicesPage.goToApp(app.title);
                appNavigationBarPage.clickProcessButton();
                appNavigationBarPage.clickCreateButton();
                appNavigationBarPage.clickCreateProcessButton();
                startProcessPage.enterProcessName('Comment Process');
                startProcessPage.selectFromProcessDropdown('process_with_se');
                startProcessPage.clickFormStartProcessButton();
                appNavigationBarPage.clickSideNavigationBarButton();
                appNavigationBarPage.clickRunningFilterButton();
                dataTablePage.selectRow(0);
                processDetailsPage.clickTabButton(1);
                processDetailsPage.addComment('comment1');
                processDetailsPage.checkCommentIsDisplayed('comment1');
            });

            it('[C261004] Should be able to Upload a file to Process list', () => {
                processServicesPage.checkApsContainer();
                processServicesPage.goToApp(app.title);
                appNavigationBarPage.clickProcessButton();
                appNavigationBarPage.clickCreateButton();
                appNavigationBarPage.clickCreateProcessButton();
                startProcessPage.enterProcessName('Attach File');
                startProcessPage.selectFromProcessDropdown('process_with_se');
                startProcessPage.clickFormStartProcessButton();
                appNavigationBarPage.clickSideNavigationBarButton();
                appNavigationBarPage.clickRunningFilterButton();
                dataTablePage.selectFromProcessList('Attach File');
                infoDrawerComponent.clickExpandButton();
                viewerPage.clickInfoDrawerButton();
                processDetailsPage.clickTabButton(1);
                attachmentListPage.clickAttachFileButton(jpgFile.location);
                attachmentListPage.checkFileIsAttached(jpgFile.name);
                viewerPage.clickCloseButton();
            });

            it('[C268811] Should not be able to upload a file to a completed task/process', () => {
                processServicesPage.checkApsContainer();
                processServicesPage.goToApp(app.title);
                appNavigationBarPage.clickProcessButton();
                appNavigationBarPage.clickCreateButton();
                appNavigationBarPage.clickCreateProcessButton();
                startProcessPage.enterProcessName('File');
                startProcessPage.selectFromProcessDropdown('process_with_se');
                startProcessPage.clickFormStartProcessButton();
                appNavigationBarPage.clickSideNavigationBarButton();
                appNavigationBarPage.clickRunningFilterButton();
                dataTablePage.selectFromProcessList('File');
                infoDrawerComponent.clickExpandButton();
                dataTablePage.clickActionsButton();
                dataTablePage.clickMenuItem('View Task');
                taskDetailsPage.clickCompleteButton();
                appNavigationBarPage.clickProcessButton();
                appNavigationBarPage.clickSideNavigationBarButton();
                appNavigationBarPage.clickCompletedFilterButton();
                dataTablePage.selectFromProcessList('File');
                infoDrawerComponent.clickExpandButton();
                viewerPage.clickInfoDrawerButton();
                processDetailsPage.clickTabButton(1);
                attachmentListPage.checkAttachFileButtonIsNotDisplayed();
                viewerPage.clickCloseButton();
            });
        });

        describe('without process model', () => {
            beforeEach(() => {
                loginPage.goToLoginPage();
                loginPage.loginToProcessServicesUsingUserModel(procUserModel);
            });

            afterEach(() => {
                logOutComponent.clickLogOutButton();
            });

            it('[C268864] Should be able to start a process without a process model included', () => {
                processServicesPage.checkApsContainer();
                processServicesPage.goToApp('Task App');
                appNavigationBarPage.clickProcessButton();
                appNavigationBarPage.clickCreateButton();
                appNavigationBarPage.clickCreateProcessButton();
                startProcessPage.checkNoProcessMessage();
            });
        });
});
