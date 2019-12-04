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
import TaskDetailsPage = require('./pages/adf/process_services/taskDetailsPage');
import StartTaskPage = require('./pages/adf/process_services/startTaskPage');
import StartProcessPage = require('./pages/adf/process_services/startProcessPage');
import BreadcrumbComponent = require('./pages/adf/breadcrumbComponent');
import DialogConfirmationComponent = require('./pages/adf/process_services/dialogConfirmationComponent');
import User = require('./models/APS/User');
import Tenant = require('./models/APS/Tenant');
import AlfrescoApi = require('alfresco-js-api-node');
import ViewerPage = require('./pages/adf/viewerPage');
import StartTaskPage = require('./pages/adf/process_services/startTaskPage');
import { AppsActions } from './actions/APS/apps.actions';

describe('People Component', () => {
    const loginPage = new LoginPage();
    const dataTablePage = new DataTablePage();
    const processServicesPage = new ProcessServicesPage();
    const appNavigationBarPage = new AppNavigationBarPage();
    const taskDetailsPage = new TaskDetailsPage();
    const viewerPage = new ViewerPage();
    const dialogConfirmationComponent = new DialogConfirmationComponent();
    const startTaskPage = new StartTaskPage();
    const app = resources.Files.APP_WITH_PROCESSES;
    const startProcessPage = new StartProcessPage();
    const breadcrumbComponent = new BreadcrumbComponent();
    const logOutComponent = new LogOutComponent();
    let appId, procUserModel, secondProcUserModel, thirdProcUserModel, tenantId,
    procUserName, secondUserName, thirdUserName;

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
        thirdProcUserModel = new User({ tenantId });

        await this.alfrescoJsApi.activiti.adminUsersApi.createNewUser(procUserModel);
        await this.alfrescoJsApi.activiti.adminUsersApi.createNewUser(secondProcUserModel);
        await this.alfrescoJsApi.activiti.adminUsersApi.createNewUser(thirdProcUserModel);

        await this.alfrescoJsApi.login(secondProcUserModel.email, secondProcUserModel.password);

        const importedApp = await apps.importPublishDeployApp(this.alfrescoJsApi, app.file_location);
        appId = importedApp.id;

        loginPage.goToLoginPage();
        loginPage.loginToProcessServicesUsingUserModel(secondProcUserModel);

        procUserName = `${procUserModel.firstName} ${procUserModel.lastName}`;
        secondUserName = `${secondProcUserModel.firstName} ${secondProcUserModel.lastName}`;
        thirdUserName = `${thirdProcUserModel.firstName} ${thirdProcUserModel.lastName}`;

        done();

    });

    afterAll(async(done) => {
        await this.alfrescoJsApi.activiti.modelsApi.deleteModel(appId);
        await this.alfrescoJsApi.login(TestConfig.adf.adminEmail, TestConfig.adf.adminPassword);
        await this.alfrescoJsApi.activiti.adminTenantsApi.deleteTenant(tenantId);
        logOutComponent.clickLogOutButton();
        done();
    });

     describe('People Component - cancel process', () => {

        beforeEach(() => {
            processServicesPage.goToAppsMenu();
        });

        afterEach(async () => {
            appNavigationBarPage.clickProcessButton();
            dataTablePage.selectRowDoubleClick(0);
            viewerPage.clickCancelProcessButton();
            dialogConfirmationComponent.clickYesButton();
            dataTablePage.waitForProcessList();
        });

        it ('[C213681] Should be able to add people in tasklist', () => {
            processServicesPage.checkApsContainer();
            processServicesPage.goToApp(app.title);
            appNavigationBarPage.clickProcessButton();
            appNavigationBarPage.clickCreateButton();
            appNavigationBarPage.clickCreateProcessButton();
            startProcessPage.enterProcessName('Add people');
            startProcessPage.selectFromProcessDropdown('process_with_se');
            startProcessPage.clickFormStartProcessButton();
            appNavigationBarPage.clickTasksButton();
            appNavigationBarPage.clickSideNavigationBarButton();
            appNavigationBarPage.clickMyTasksFilterButton();
            dataTablePage.selectRow(0);
            taskDetailsPage.clickInvolvePeopleButton();
            taskDetailsPage.involveAndSelectPeople(procUserName);
            taskDetailsPage.clickAddInvolvedUserButton();
            expect(taskDetailsPage.getInvolvedUserEmail(procUserName))
            .toEqual(procUserModel.email);
        });

        it ('[C268114] Should be able to remove people from tasklist', () => {
            processServicesPage.checkApsContainer();
            processServicesPage.goToApp(app.title);
            appNavigationBarPage.clickProcessButton();
            appNavigationBarPage.clickCreateButton();
            appNavigationBarPage.clickCreateProcessButton();
            startProcessPage.enterProcessName('Add people');
            startProcessPage.selectFromProcessDropdown('process_with_se');
            startProcessPage.clickFormStartProcessButton();
            appNavigationBarPage.clickTasksButton();
            appNavigationBarPage.clickSideNavigationBarButton();
            appNavigationBarPage.clickMyTasksFilterButton();
            dataTablePage.selectRow(0);
            taskDetailsPage.clickInvolvePeopleButton();
            taskDetailsPage.involveAndSelectPeople(procUserName);
            taskDetailsPage.clickAddInvolvedUserButton();
            expect(taskDetailsPage.getInvolvedUserEmail(procUserName)).toEqual(procUserModel.email);
            taskDetailsPage.clickActionMenuButton();
            taskDetailsPage.clickRemoveButton();
            expect(taskDetailsPage.checkPeopleNotDisplayed(procUserName)).toBe(false);
        });

        it ('[C219084] Should be able to change assignee', async () => {
            processServicesPage.checkApsContainer();
            processServicesPage.goToApp(app.title);
            appNavigationBarPage.clickProcessButton();
            appNavigationBarPage.clickCreateButton();
            appNavigationBarPage.clickCreateProcessButton();
            startProcessPage.enterProcessName('Change assignee people');
            startProcessPage.selectFromProcessDropdown('process_with_se');
            startProcessPage.clickFormStartProcessButton();
            appNavigationBarPage.clickTasksButton();
            appNavigationBarPage.clickSideNavigationBarButton();
            appNavigationBarPage.clickMyTasksFilterButton();
            dataTablePage.selectRow(0);
            taskDetailsPage.clickEditAssigneeButton();
            taskDetailsPage.involveAndSelectPeople(procUserName);
            taskDetailsPage.clickAddInvolvedUserButton();
            dataTablePage.waitForTaskList();
            let text = await breadcrumbComponent.getAllCrumbs();
            expect(text[3]).toEqual('My Tasks');
            dataTablePage.checkNoContentMessage();
            appNavigationBarPage.clickInvolvedTasksFilterButton();
            text = await breadcrumbComponent.getAllCrumbs();
            expect(text[3]).toEqual('Involved Tasks');
            dataTablePage.checkNameIsDisplayedInList('Task Test 2');
            dataTablePage.selectRow(0);
            expect(taskDetailsPage.getAssignee()).toEqual(procUserName);
            taskDetailsPage.scrollTo('adf-people');
            expect(taskDetailsPage.checkAssigmentPeopleTitleIsDisplayed()).toBe('People this task is shared with (1)');
            expect(taskDetailsPage.getInvolvedUserFullName())
            .toEqual(secondUserName);
        });

        it ('[C274693] Should be able to change assignee with two user', async () => {
            processServicesPage.checkApsContainer();
            processServicesPage.goToApp(app.title);
            appNavigationBarPage.clickProcessButton();
            appNavigationBarPage.clickCreateButton();
            appNavigationBarPage.clickCreateProcessButton();
            startProcessPage.enterProcessName('Change assignee people');
            startProcessPage.selectFromProcessDropdown('process_with_se');
            startProcessPage.clickFormStartProcessButton();
            appNavigationBarPage.clickTasksButton();
            appNavigationBarPage.clickSideNavigationBarButton();
            appNavigationBarPage.clickMyTasksFilterButton();
            dataTablePage.selectRow(0);
            taskDetailsPage.clickEditAssigneeButton();
            taskDetailsPage.involveAndSelectPeople(procUserName);
            taskDetailsPage.clickAddInvolvedUserButton();
            dataTablePage.waitForTaskList();
            let text = await breadcrumbComponent.getAllCrumbs();
            expect(text[3]).toEqual('My Tasks');
            dataTablePage.checkNoContentMessage();
            appNavigationBarPage.clickInvolvedTasksFilterButton();
            text = await breadcrumbComponent.getAllCrumbs();
            expect(text[3]).toEqual('Involved Tasks');
            dataTablePage.checkNameIsDisplayedInList('Task Test 2');
            dataTablePage.selectRow(0);
            expect(taskDetailsPage.getAssignee()).toEqual(procUserName);
            taskDetailsPage.scrollTo('adf-people');
            expect(taskDetailsPage.checkAssigmentPeopleTitleIsDisplayed()).toBe('People this task is shared with (1)');
            expect(taskDetailsPage.getInvolvedUserFullName())
            .toEqual(secondUserName);
            taskDetailsPage.clickEditAssigneeButton();
            taskDetailsPage.involveAndSelectPeople(thirdUserName);
            taskDetailsPage.clickAddInvolvedUserButton();
            appNavigationBarPage.clickInvolvedTasksFilterButton();
            dataTablePage.checkNameIsDisplayedInList('Task Test 2');
            expect(taskDetailsPage.getAssignee()).toEqual(thirdUserName);
            taskDetailsPage.scrollTo('adf-people');
            expect(taskDetailsPage.checkAssigmentPeopleTitleIsDisplayed()).toBe('People this task is shared with (2)');
            expect(taskDetailsPage.getInvolvedUserFullName())
            .toEqual(procUserName);
        });
    });

    describe('People Component', () => {

        it ('[C268116] Should be able to add multiple people in tasklist', async () => {
            processServicesPage.goToAppsMenu();
            processServicesPage.checkApsContainer();
            processServicesPage.goToApp(app.title);
            appNavigationBarPage.clickCreateButton();
            appNavigationBarPage.clickCreateTaskButton();
            startTaskPage.addName('Assignee multiple users');
            startTaskPage.clickStartButton();
            dataTablePage.selectRow(0);
            taskDetailsPage.checkIfNoPeopleAssigned();
            taskDetailsPage.clickInvolvePeopleButton();
            taskDetailsPage.involveAndSelectPeople(procUserName);
            taskDetailsPage.clickAddInvolvedUserButton();
            expect(taskDetailsPage.checkAssigmentPeopleTitleIsDisplayed()).toBe('People this task is shared with (1)');
            expect(taskDetailsPage.getInvolvedUserFullName())
            .toEqual(procUserName);
            taskDetailsPage.clickInvolvePeopleButton();
            taskDetailsPage.involveAndSelectPeople(thirdUserName);
            taskDetailsPage.clickAddInvolvedUserButton();
            expect(taskDetailsPage.checkAssigmentPeopleTitleIsDisplayed()).toBe('People this task is shared with (2)');
            expect(taskDetailsPage.getInvolvedUserEmail(procUserName))
            .toEqual(procUserModel.email);
            expect(taskDetailsPage.getInvolvedUserEmail(thirdUserName))
            .toEqual(thirdProcUserModel.email);

        });
    });
});
