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
import ViewerPage = require('./pages/adf/viewerPage');
import StartTaskPage = require('./pages/adf/process_services/startTaskPage');
import InfoDrawerComponent = require('./pages/adf/infoDrawerComponent');
import TaskDetailsPage = require('./pages/adf/process_services/taskDetailsPage');
import User = require('./models/APS/User');
import AppPublish = require('./models/APS/AppPublish');
import Tenant = require('./models/APS/Tenant');
import BreadcrumbComponent = require('./pages/adf/breadcrumbComponent');
import AlfrescoApi = require('alfresco-js-api-node');
import FormFields = require('./pages/adf/process_services/formFields');
import fs = require('fs');
import path = require('path');
import CONSTANTS = require('./util/constants');
import DialogConfirmationComponent = require('./pages/adf/process_services/dialogConfirmationComponent');
import { AppsActions } from './actions/APS/apps.actions';

describe('Task List Component', () => {
    const loginPage = new LoginPage();
    const logOutComponent = new LogOutComponent();
    const dataTablePage = new DataTablePage();
    const viewerPage = new ViewerPage();
    const processServicesPage = new ProcessServicesPage();
    const appNavigationBarPage = new AppNavigationBarPage();
    const app = resources.Files.SIMPLE_APP_WITH_USER_FORM;
    const startTaskPage = new StartTaskPage();
    const infoDrawerComponent = new InfoDrawerComponent();
    const breadcrumbComponent = new BreadcrumbComponent();
    const taskDetailsPage = new TaskDetailsPage();
    const formFields = new FormFields();
    const dialogConfirmationComponent = new DialogConfirmationComponent();
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

        it ('[C277755] Should be displayed the "No Task Found" message when the task list is empty', () => {
            processServicesPage.checkApsContainer();
            processServicesPage.goToApp('Task App');
            appNavigationBarPage.clickTasksButton();
            appNavigationBarPage.clickSideNavigationBarButton();
            appNavigationBarPage.clickMyTasksFilterButton();
            dataTablePage.checkNoContentMessage();
            appNavigationBarPage.clickInvolvedTasksFilterButton();
            dataTablePage.checkNoContentMessage();
            appNavigationBarPage.clickCompletedTasksFilterButton();
            dataTablePage.checkNoContentMessage();
            appNavigationBarPage.clickQueuedTasksFilterButton();
            dataTablePage.checkNoContentMessage();
        });

        it ('[C261126] Should be able open View Task details by double clicking on the task ', () => {
            processServicesPage.checkApsContainer();
            processServicesPage.goToApp('Task App');
            appNavigationBarPage.clickCreateButton();
            appNavigationBarPage.clickCreateTaskButton();
            startTaskPage.addName('Task double click');
            startTaskPage.clickStartButton();
            dataTablePage.selectRowDoubleClick(0);
            viewerPage.checkActiveTaskTitleIsDisplayed('Task double click');
            viewerPage.clickCloseButton();
        });

        it ('[C213684] Should be able to select a task from Task list ', async () => {
            processServicesPage.checkApsContainer();
            processServicesPage.goToApp('Task App');
            appNavigationBarPage.clickCreateButton();
            appNavigationBarPage.clickCreateTaskButton();
            startTaskPage.addName('Select Task');
            startTaskPage.clickStartButton();
            dataTablePage.selectRow(0);
            infoDrawerComponent.clickExpandTaskButton();
            viewerPage.checkActiveTaskTitleIsDisplayed('Select Task');
            taskDetailsPage.checkFormSectionIsDisplayed();
            viewerPage.clickCloseButton();
            let text = await breadcrumbComponent.getAllCrumbs();
            expect(text[3]).toEqual('My Tasks');
            dataTablePage.selectRowDoubleClick(0);
            viewerPage.checkActiveTaskTitleIsDisplayed('Select Task');
            viewerPage.clickCloseButton();
            text = await expect(text[3]).toEqual('My Tasks');
        });

        it ('[C268868] The "No Parent" text should be displayed when no parent process', () => {
            processServicesPage.checkApsContainer();
            processServicesPage.goToApp('Task App');
            appNavigationBarPage.clickCreateButton();
            appNavigationBarPage.clickCreateTaskButton();
            startTaskPage.addName('Select Task');
            startTaskPage.clickStartButton();
            dataTablePage.selectRow(0);
            expect(taskDetailsPage.getParentName())
            .toEqual(CONSTANTS.TASKDETAILS.NO_PARENT);
        });

        it ('[C268870] Should be able to Save a task', () => {
            processServicesPage.checkApsContainer();
            processServicesPage.goToApp(app.title);
            appNavigationBarPage.clickCreateButton();
            appNavigationBarPage.clickCreateTaskButton();
            startTaskPage.addName('Save Task');
            startTaskPage.addForm('Simple form');
            startTaskPage.clickStartButton();
            dataTablePage.selectRowDoubleClick(0);
            formFields.addText('test input field');
            formFields.saveForm();
            viewerPage.checkConfirmationWarningMessage('Form saved successfully');
            viewerPage.clickCloseButton();
        });

        it ('[C274686] Should be able to see "Dialog Confirmation" for a unsaved task when click on Close icon', async () => {
            processServicesPage.checkApsContainer();
            processServicesPage.goToApp(app.title);
            appNavigationBarPage.clickCreateButton();
            appNavigationBarPage.clickCreateTaskButton();
            startTaskPage.addName('Unsaved Task');
            startTaskPage.addForm('Simple form');
            startTaskPage.clickStartButton();
            dataTablePage.selectRowDoubleClick(0);
            formFields.addText('test input field');
            viewerPage.clickCloseButton();
            dialogConfirmationComponent.clickDiscardButton();
            dataTablePage.waitForTaskList();
            let text = await breadcrumbComponent.getAllCrumbs();
            expect(text[3]).toEqual('My Tasks');
            dataTablePage.selectRowDoubleClick(0);
            formFields.addText('test input field');
            viewerPage.clickCloseButton();
            dialogConfirmationComponent.clickSaveButton();
            dataTablePage.waitForTaskList();
            text = await breadcrumbComponent.getAllCrumbs();
            expect(text[3]).toEqual('My Tasks');
        });

        it ('[C284652] Should be able to see "Dialog Confirmation" for a unsaved task when click on Back icon', async () => {
            processServicesPage.checkApsContainer();
            processServicesPage.goToApp(app.title);
            appNavigationBarPage.clickCreateButton();
            appNavigationBarPage.clickCreateTaskButton();
            startTaskPage.addName('Unsaved Task');
            startTaskPage.addForm('Simple form');
            startTaskPage.clickStartButton();
            appNavigationBarPage.clickSideNavigationBarButton();
            appNavigationBarPage.clickInvolvedTasksFilterButton();
            dataTablePage.selectRowDoubleClick(0);
            formFields.addText('test input field');
            viewerPage.clickBackButton();
            dialogConfirmationComponent.clickDiscardButton();
            dataTablePage.waitForTaskList();
            appNavigationBarPage.clickSideNavigationBarButton();
            appNavigationBarPage.clickInvolvedTasksFilterButton();
            let text = await breadcrumbComponent.getAllCrumbs();
            expect(text[3]).toEqual('Involved Tasks');
            dataTablePage.selectRowDoubleClick(0);
            formFields.addText('test input field');
            viewerPage.clickBackButton();
            dialogConfirmationComponent.clickSaveButton();
            dataTablePage.waitForTaskList();
            text = await breadcrumbComponent.getAllCrumbs();
            expect(text[3]).toEqual('Involved Tasks');
        });

        it ('[C268106] Default tasklist filters', async () => {
            processServicesPage.checkApsContainer();
            processServicesPage.goToApp(app.title);
            appNavigationBarPage.clickCreateButton();
            appNavigationBarPage.clickCreateTaskButton();
            startTaskPage.addName('Filters Task');
            startTaskPage.clickStartButton();
            appNavigationBarPage.clickSideNavigationBarButton();
            let text = await breadcrumbComponent.getAllCrumbs();
            expect(text[3]).toEqual('My Tasks');
            appNavigationBarPage.clickInvolvedTasksFilterButton();
            text = await breadcrumbComponent.getAllCrumbs();
            expect(text[3]).toEqual('Involved Tasks');
            dataTablePage.checkNameIsDisplayedInList('Filters Task');
            dataTablePage.selectRowDoubleClick(0);
            taskDetailsPage.clickCompleteButtonStandAloneTask();
            appNavigationBarPage.clickSideNavigationBarButton();
            appNavigationBarPage.clickCompletedTasksFilterButton();
            dataTablePage.checkNameIsDisplayedInList('Filters Task');
            appNavigationBarPage.clickQueuedTasksFilterButton();
            dataTablePage.checkNoContentMessage();
        });
});
