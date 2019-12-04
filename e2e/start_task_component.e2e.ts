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
import ProcessDetailsPage = require('./pages/adf/process_services/processDetailsPage');
import AttachmentListPage = require('./pages/adf/process_services/attachmentListPage');
import LogOutComponent = require('./pages/adf/logOutComponent');
import DataTablePage = require('./pages/adf/dataTablePage');
import InfoDrawerComponent = require('./pages/adf/infoDrawerComponent');
import ViewerPage = require('./pages/adf/viewerPage');
import TaskDetailsPage = require('./pages/adf/process_services/taskDetailsPage');
import StartTaskPage = require('./pages/adf/process_services/startTaskPage');
import TaskModel = require('./models/APS/TaskModel');
import dateFormat = require('dateformat');
import StartProcessPage = require('./pages/adf/process_services/startProcessPage');
import User = require('./models/APS/User');
import AppPublish = require('./models/APS/AppPublish');
import Tenant = require('./models/APS/Tenant');
import FileModel = require('./models/ACS/fileModel');
import AlfrescoApi = require('alfresco-js-api-node');
import fs = require('fs');
import path = require('path');
import CONSTANTS = require('./util/constants');
import { AppsActions } from './actions/APS/apps.actions';

describe('Start Task Component', () => {
    const TASKDATAFORMAT = 'mmm dd yyyy';
    const loginPage = new LoginPage();
    const logOutComponent = new LogOutComponent();
    const dataTablePage = new DataTablePage();
    const infoDrawerComponent = new InfoDrawerComponent();
    const viewerPage = new ViewerPage();
    const processServicesPage = new ProcessServicesPage();
    const appNavigationBarPage = new AppNavigationBarPage();
    const processDetailsPage = new ProcessDetailsPage();
    const attachmentListPage = new AttachmentListPage();
    const taskDetailsPage = new TaskDetailsPage();
    const app = resources.Files.APP_WITH_PROCESSES;
    const startTaskPage = new StartTaskPage();
    const startProcessPage = new StartProcessPage();
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

        it ('[C274694] Should be able to start a task and cancel without starting', () => {
            processServicesPage.checkApsContainer();
            processServicesPage.goToApp(app.title);
            appNavigationBarPage.clickCreateButton();
            appNavigationBarPage.clickCreateTaskButton();
            startTaskPage.checkStartButtonIsDisabled();
            startTaskPage.addName('Task1');
            startTaskPage.checkStartButtonIsEnabled();
            startTaskPage.clickCancelButton();
            dataTablePage.checkNoContentMessage();
        });

        it ('[C268856] Should be able to start a task without assignee', async () => {
            processServicesPage.checkApsContainer();
            processServicesPage.goToApp(app.title);
            appNavigationBarPage.clickCreateButton();
            appNavigationBarPage.clickCreateTaskButton();
            startTaskPage.addName('Task1');
            startTaskPage.clickStartButton();

            const row = await dataTablePage.getRowDataByRowNumber(0);
            expect(row[0]).toEqual('Task1');
            expect(row[1]).toContain('seconds');
            expect(row[2]).toEqual('50');
            expect(row[3]).toEqual(`${secondProcUserModel.firstName} ${secondProcUserModel.lastName}`);
        });

        it ('[C268857] Should be able to start a task with other assignee', () => {
            processServicesPage.checkApsContainer();
            processServicesPage.goToApp(app.title);
            appNavigationBarPage.clickCreateButton();
            appNavigationBarPage.clickCreateTaskButton();
            startTaskPage.addName('Task assign user');
            startTaskPage.addAssignee(`${procUserModel.firstName} ${procUserModel.lastName}`);
            startTaskPage.clickStartButton();
            dataTablePage.selectRow(0);
            expect(taskDetailsPage.getAssignee()).toEqual(`${procUserModel.firstName} ${procUserModel.lastName}`);
        });

        it ('[C261003] Should be able to Upload a file - Tasklist', () => {
            processServicesPage.checkApsContainer();
            processServicesPage.goToApp(app.title);
            appNavigationBarPage.clickCreateButton();
            appNavigationBarPage.clickCreateTaskButton();
            startTaskPage.addName('Task Attach File');
            startTaskPage.clickStartButton();
            dataTablePage.selectRow(0);
            infoDrawerComponent.clickExpandTaskButton();
            viewerPage.clickInfoDrawerButton();
            processDetailsPage.clickTabButton(1);
            attachmentListPage.clickAttachFileButton(jpgFile.location);
            attachmentListPage.checkFileIsAttached(jpgFile.name);
            viewerPage.clickCloseButton();
        });

        it ('[C268860] Should be able to start standalone task(without form) and complete', async () => {
            processServicesPage.checkApsContainer();
            processServicesPage.goToApp(app.title);
            appNavigationBarPage.clickCreateButton();
            appNavigationBarPage.clickCreateTaskButton();
            startTaskPage.addName('Task Complete');
            startTaskPage.clickStartButton();
            appNavigationBarPage.clickSideNavigationBarButton();
            appNavigationBarPage.clickMyTasksFilterButton();
            dataTablePage.selectRow(0);
            infoDrawerComponent.clickExpandTaskButton();
            taskDetailsPage.clickCompleteButtonStandAloneTask();
            appNavigationBarPage.clickSideNavigationBarButton();
            appNavigationBarPage.clickCompletedTasksFilterButton();
            dataTablePage.selectRow(0);
            const row = await dataTablePage.getRowDataByRowNumber(0);
            expect(row[0]).toEqual('Task Complete');
            expect(row[1]).toContain('seconds');
            expect(row[2]).toEqual('50');
            expect(row[3]).toEqual(`${secondProcUserModel.firstName} ${secondProcUserModel.lastName}`);
        });

        it ('[C268867] Should be able to view correct data in the Info-drawer', () => {
            processServicesPage.checkApsContainer();
            processServicesPage.goToApp(app.title);
            appNavigationBarPage.clickCreateButton();
            appNavigationBarPage.clickCreateTaskButton();
            startTaskPage.addName('Task Info');
            startTaskPage.clickStartButton();
            appNavigationBarPage.clickSideNavigationBarButton();
            appNavigationBarPage.clickMyTasksFilterButton();
            dataTablePage.selectRow(0);

            browser.controlFlow().execute(() => {
                return this.alfrescoJsApi.activiti.taskApi.listTasks();
            }).then((response) => {
                const taskModel = new TaskModel(response.data[0]);
                expect(taskDetailsPage.getAssignee())
                    .toEqual(`${secondProcUserModel.firstName} ${secondProcUserModel.lastName}`);
                expect(taskDetailsPage.getStatus())
                    .toEqual(CONSTANTS.TASKSTATUS.RUNNING);
                expect(taskDetailsPage.getDueDate())
                    .toEqual(taskModel.getDueDate() === null ? CONSTANTS.TASKDETAILS.NO_DATE : taskModel.getDueDate());
                expect(taskDetailsPage.getCategory())
                    .toEqual(taskModel.getCategory() === null ? CONSTANTS.TASKDETAILS.NO_CATEGORY : taskModel.getCategory());
                expect(taskDetailsPage.getParentName())
                    .toEqual(taskModel.getParentTaskName() === null ? CONSTANTS.TASKDETAILS.NO_PARENT : taskModel.getParentTaskName());
                expect(taskDetailsPage.getDescription())
                    .toEqual(taskModel.getDescription() === null ? CONSTANTS.TASKDETAILS.NO_DESCRIPTION : taskModel.getDescription());
                expect(taskDetailsPage.getId())
                    .toEqual(taskModel.getId());
                expect(taskDetailsPage.getCreated())
                    .toEqual(dateFormat(taskModel.getCreated(), TASKDATAFORMAT));
            });
        });

        it ('[C219083] Should be able to edit information from info-drawer', () => {
            processServicesPage.checkApsContainer();
            processServicesPage.goToApp(app.title);
            appNavigationBarPage.clickCreateButton();
            appNavigationBarPage.clickCreateTaskButton();
            startTaskPage.addName('Edit Info drawer');
            startTaskPage.clickStartButton();
            appNavigationBarPage.clickSideNavigationBarButton();
            appNavigationBarPage.clickMyTasksFilterButton();
            dataTablePage.selectRow(0);
            taskDetailsPage.clickEditDescriptionButton();
            taskDetailsPage.setDescription('tests description');
            taskDetailsPage.clickUpdateDescriptionButton();
            taskDetailsPage.clickEditPriorityButton();
            taskDetailsPage.setPriority('100');
            taskDetailsPage.clickUpdatePriorityButton();
            taskDetailsPage.clickDatePickerDueDate();
            taskDetailsPage.selectDatePickerValue();
            expect(taskDetailsPage.getDueDate()).toContain('24');

            browser.controlFlow().execute(() => {
                return this.alfrescoJsApi.activiti.taskApi.listTasks();
            }).then((response) => {
                const taskModel = new TaskModel(response.data[0]);
                expect(taskDetailsPage.getDueDate())
                    .toEqual(
                        taskModel.getDueDate()  === null
                        ? CONSTANTS.TASKDETAILS.NO_DATE
                        : (dateFormat(taskModel.getDueDate(), TASKDATAFORMAT)));
                expect(taskDetailsPage.getDescription())
                    .toEqual(taskModel.getDescription() === null ? CONSTANTS.TASKDETAILS.NO_DESCRIPTION : taskModel.getDescription());
            });
        });

        it ('[C213683] Should be able to open the Process Details page by clicking on the Parent Name', async () => {
            processServicesPage.checkApsContainer();
            processServicesPage.goToApp(app.title);
            appNavigationBarPage.clickProcessButton();
            appNavigationBarPage.clickCreateButton();
            appNavigationBarPage.clickCreateProcessButton();
            startProcessPage.enterProcessName('Comment Process');
            startProcessPage.selectFromProcessDropdown('process_with_se');
            startProcessPage.clickFormStartProcessButton();
            appNavigationBarPage.clickTasksButton();
            appNavigationBarPage.clickSideNavigationBarButton();
            appNavigationBarPage.clickMyTasksFilterButton();
            dataTablePage.selectRow(0);
            taskDetailsPage.clickParentNameLink();
            const row = await dataTablePage.getRowDataByRowNumber(0);
            expect(row[2]).toContain('process_with_se');
            viewerPage.clickCloseButton();
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
            taskDetailsPage.typeUser(`${procUserModel.firstName} ${procUserModel.lastName}`);
            taskDetailsPage.selectUserToInvolve(`${procUserModel.firstName} ${procUserModel.lastName}`);
            taskDetailsPage.checkUserIsSelected(`${procUserModel.firstName} ${procUserModel.lastName}`);
            taskDetailsPage.clickAddInvolvedUserButton();
            expect(taskDetailsPage.getInvolvedUserEmail(`${procUserModel.firstName} ${procUserModel.lastName}`))
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
            taskDetailsPage.typeUser(`${procUserModel.firstName} ${procUserModel.lastName}`);
            taskDetailsPage.selectUserToInvolve(`${procUserModel.firstName} ${procUserModel.lastName}`);
            taskDetailsPage.checkUserIsSelected(`${procUserModel.firstName} ${procUserModel.lastName}`);
            taskDetailsPage.clickAddInvolvedUserButton();
            expect(taskDetailsPage.getInvolvedUserEmail(`${procUserModel.firstName} ${procUserModel.lastName}`))
                    .toEqual(procUserModel.email);
            taskDetailsPage.clickActionMenuButton();
            taskDetailsPage.clickRemoveButton();
            taskDetailsPage.checkIfNoPeopleAssigned();
        });
    });
