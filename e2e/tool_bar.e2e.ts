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
import AppNavigationBarPage = require('./pages/adf/process_services/appNavigationBarPage');
import LogOutComponent = require('./pages/adf/logOutComponent');
import DataTablePage = require('./pages/adf/dataTablePage');
import ViewerPage = require('./pages/adf/viewerPage');
import StartTaskPage = require('./pages/adf/process_services/startTaskPage');
import InfoDrawerComponent = require('./pages/adf/infoDrawerComponent');
import User = require('./models/APS/User');
import Tenant = require('./models/APS/Tenant');
import StartProcessPage = require('./pages/adf/process_services/startProcessPage');
import BreadcrumbComponent = require('./pages/adf/breadcrumbComponent');
import ProcessDetailsPage = require('./pages/adf/process_services/processDetailsPage');
import TaskDetailsPage = require('./pages/adf/process_services/taskDetailsPage');
import DialogConfirmationComponent = require('./pages/adf/process_services/dialogConfirmationComponent');
import CONSTANTS = require('./util/constants');
import AlfrescoApi = require('alfresco-js-api-node');
import { AppsActions } from './actions/APS/apps.actions';
import path = require('path');
import { InfoDrawerComponent } from '../node_modules/@alfresco/adf-core';
import { DialogConfirmationComponent } from 'src/app/components';

describe('ToolBar Component', () => {
    const loginPage = new LoginPage();
    const logOutComponent = new LogOutComponent();
    const dataTablePage = new DataTablePage();
    const viewerPage = new ViewerPage();
    const processServicesPage = new ProcessServicesPage();
    const appNavigationBarPage = new AppNavigationBarPage();
    const infoDrawerComponent = new InfoDrawerComponent();
    const startProcessPage = new StartProcessPage();
    const breadcrumbComponent = new BreadcrumbComponent();
    const app = resources.Files.APP_WITH_PROCESSES;
    const startTaskPage = new StartTaskPage();
    const processDetailsPage = new ProcessDetailsPage();
    const taskDetailsPage = new TaskDetailsPage();
    const dialogConfirmationComponent = new DialogConfirmationComponent();
    let appId, secondProcUserModel, tenantId;
    const getProcessAuditLogFile = (processId) => path.join(`./e2e/downloads/Process Audit -${processId}.pdf`);
    const getTaskAuditLogFile = (taskId) => path.join(`./e2e/downloads/Task Audit -${taskId}.pdf`);

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

        it ('[C217124] Info icon on Task list ', () => {
            processServicesPage.checkApsContainer();
            processServicesPage.goToApp(app.title);
            appNavigationBarPage.clickCreateButton();
            appNavigationBarPage.clickCreateTaskButton();
            startTaskPage.addName('Info Icon');
            startTaskPage.clickStartButton();
            dataTablePage.clickInfoButton();
            infoDrawerComponent.checkInfoDrawerContentIsDisplayed();
            dataTablePage.clickInfoButton();
            infoDrawerComponent.checkInfoDrawerContentIsNotDisplayed();
            dataTablePage.clickInfoButton();
            infoDrawerComponent.clickExpandTaskButton();
            viewerPage.clickInfoDrawerButton();
            infoDrawerComponent.checkInfoDrawerContentIsDisplayed();
            viewerPage.clickInfoDrawerButton();
            infoDrawerComponent.checkInfoDrawerContentIsNotDisplayed();
            viewerPage.clickCloseButton();

        });

        it ('[C284656] Info icon on Process list ', () => {
            processServicesPage.checkApsContainer();
            processServicesPage.goToApp(app.title);
            appNavigationBarPage.clickCreateButton();
            appNavigationBarPage.clickCreateProcessButton();
            startProcessPage.enterProcessName('Info icon Process');
            startProcessPage.selectFromProcessDropdown('process_with_se');
            startProcessPage.clickFormStartProcessButton();
            dataTablePage.clickInfoButton();
            infoDrawerComponent.checkInfoDrawerContentIsDisplayed();
            dataTablePage.clickInfoButton();
            infoDrawerComponent.checkInfoDrawerContentIsNotDisplayed();
            dataTablePage.clickInfoButton();
            infoDrawerComponent.clickExpandButton();
            viewerPage.clickInfoDrawerButton();
            infoDrawerComponent.checkInfoDrawerContentIsDisplayed();
            viewerPage.clickInfoDrawerButton();
            infoDrawerComponent.checkInfoDrawerContentIsNotDisplayed();
            viewerPage.clickCloseButton();
        });

        it ('[C217312] Should be able to close View Task page by clicking on Close icon ', async () => {
            processServicesPage.checkApsContainer();
            processServicesPage.goToApp(app.title);
            appNavigationBarPage.clickCreateButton();
            appNavigationBarPage.clickCreateTaskButton();
            startTaskPage.addName('Task Close Icon');
            startTaskPage.clickStartButton();
            dataTablePage.selectRowDoubleClick(0);
            viewerPage.checkActiveTaskTitleIsDisplayed('Task Close Icon');
            viewerPage.clickCloseButton();
            dataTablePage.waitForTaskList();
            const text = await breadcrumbComponent.getAllCrumbs();
            expect(text[3]).toEqual('My Tasks');
        });

        it ('[C284657] Should be able to close View Process page by clicking on Close icon ', async () => {
            processServicesPage.checkApsContainer();
            processServicesPage.goToApp(app.title);
            appNavigationBarPage.clickCreateButton();
            appNavigationBarPage.clickCreateProcessButton();
            startProcessPage.enterProcessName('Process Close Icon');
            startProcessPage.selectFromProcessDropdown('process_with_se');
            startProcessPage.clickFormStartProcessButton();
            dataTablePage.selectRowDoubleClick(0);
            viewerPage.checkProcessTitleIsDisplayed('Process Close Icon');
            viewerPage.clickCloseButton();
            dataTablePage.waitForProcessList();
            const text = await breadcrumbComponent.getAllCrumbs();
            expect(text[3]).toEqual('Running');
        });

        it('[C219086] Should be able to see the Process audit file', async () => {
            processServicesPage.checkApsContainer();
            processServicesPage.goToApp(app.title);
            appNavigationBarPage.clickProcessButton();
            appNavigationBarPage.clickCreateButton();
            appNavigationBarPage.clickCreateProcessButton();
            startProcessPage.enterProcessName('Audit Log');
            startProcessPage.selectFromProcessDropdown('process_with_se');
            startProcessPage.clickFormStartProcessButton();
            appNavigationBarPage.clickSideNavigationBarButton();
            appNavigationBarPage.clickRunningFilterButton();
            dataTablePage.selectFromProcessList('Audit Log');
            const processId = await processDetailsPage.getId();
            infoDrawerComponent.clickExpandButton();
            viewerPage.clickAuditProcessLogButton();
            expect(await Util.fileExists(getProcessAuditLogFile(processId), 10)).toBe(true);
            viewerPage.clickCloseButton();
        });

        it('[C219085] Should be able to see the Task audit file', async () => {
            processServicesPage.checkApsContainer();
            processServicesPage.goToApp(app.title);
            appNavigationBarPage.clickCreateButton();
            appNavigationBarPage.clickCreateTaskButton();
            startTaskPage.addName('Audit task file');
            startTaskPage.clickStartButton();
            appNavigationBarPage.clickSideNavigationBarButton();
            appNavigationBarPage.clickMyTasksFilterButton();
            dataTablePage.selectRow(0);
            const taskId = await taskDetailsPage.getId();
            infoDrawerComponent.clickExpandTaskButton();
            viewerPage.clickAuditTaskLogButton();
            expect(await Util.fileExists(getTaskAuditLogFile(taskId), 10)).toBe(true);
            viewerPage.clickCloseButton();
        });

        it('[C261001] Should be able to see associated diagram and return to the process list', () => {
            processServicesPage.checkApsContainer();
            processServicesPage.goToApp(app.title);
            appNavigationBarPage.clickProcessButton();
            appNavigationBarPage.clickCreateButton();
            appNavigationBarPage.clickCreateProcessButton();
            startProcessPage.enterProcessName('Show Diagram');
            startProcessPage.selectFromProcessDropdown('process_with_se');
            startProcessPage.clickFormStartProcessButton();
            appNavigationBarPage.clickSideNavigationBarButton();
            appNavigationBarPage.clickRunningFilterButton();
            dataTablePage.selectFromProcessList('Show Diagram');
            infoDrawerComponent.clickExpandButton();
            viewerPage.checkDiagramIsDisplayed();
            viewerPage.clickBackButton();
        });

        it ('[C261002] Should be able to Cancel a process by clicking on Cancel icon ', async () => {
            processServicesPage.checkApsContainer();
            processServicesPage.goToApp(app.title);
            appNavigationBarPage.clickCreateButton();
            appNavigationBarPage.clickCreateProcessButton();
            startProcessPage.enterProcessName('Cancel Process');
            startProcessPage.selectFromProcessDropdown('process_with_se');
            startProcessPage.clickFormStartProcessButton();
            dataTablePage.selectRowDoubleClick(0);
            viewerPage.checkProcessTitleIsDisplayed('Cancel Process');
            viewerPage.clickCancelProcessButton();
            dialogConfirmationComponent.clickNoButton();
            viewerPage.checkProcessTitleIsDisplayed('Cancel Process');
            dialogConfirmationComponent.clickYesButton();
            dataTablePage.waitForProcessList();
            const text = await breadcrumbComponent.getAllCrumbs();
            expect(text[3]).toEqual('Running');
            appNavigationBarPage.clickSideNavigationBarButton();
            appNavigationBarPage.clickCompletedFilterButton();
            dataTablePage.selectFromProcessList('Cancel Process');
            expect(processDetailsPage.getProcessStatus())
            .toEqual(CONSTANTS.PROCESSSTATUS.COMPLETED);
        });

        it ('[C284661] Should be displayed the correct Process name in toolbar ', () => {
            processServicesPage.checkApsContainer();
            processServicesPage.goToApp(app.title);
            appNavigationBarPage.clickCreateButton();
            appNavigationBarPage.clickCreateProcessButton();
            startProcessPage.enterProcessName('Process name toolbar');
            startProcessPage.selectFromProcessDropdown('process_with_se');
            startProcessPage.clickFormStartProcessButton();
            dataTablePage.selectRowDoubleClick(0);
            viewerPage.checkToolbarTitleIsDisplayed(`Process name toolbar in ${app.title}`);
            viewerPage.clickCloseButton();
        });

        it ('[C261126] Should be displayed the correct Task name in toolbar ', () => {
            processServicesPage.checkApsContainer();
            processServicesPage.goToApp(app.title);
            appNavigationBarPage.clickCreateButton();
            appNavigationBarPage.clickCreateTaskButton();
            startTaskPage.addName('Task name toolbar');
            startTaskPage.clickStartButton();
            dataTablePage.selectRowDoubleClick(0);
            viewerPage.checkToolbarTitleIsDisplayed(`Task name toolbar in ${app.title}`);
            viewerPage.clickCloseButton();
        });
    });
