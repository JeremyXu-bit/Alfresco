/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { CUSTOM_ELEMENTS_SCHEMA, SimpleChange } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { TaskSidebarComponent } from './task-sidebar.component';
import {
    fakeUser2,
    fakeUser3,
    taskDetailsMock,
    taskDetailsWithOutInvolvedPeopleMock,
    taskDetailsWithInvolvedPeopleMock
} from '../../../test-mock';
import { of } from 'rxjs';
import {
    LogService,
    BpmUserService,
    CardViewUpdateService,
    PeopleProcessService,
    CommentProcessService,
    NotificationService
} from '@alfresco/adf-core';
import { TaskDetailsModel, TaskListService, TaskHeaderComponent } from '@alfresco/adf-process-services';
import { DatePipe } from '@angular/common';
import { DialogEvent } from '../../../models';

let commentProcessService: CommentProcessService;

describe('TaskSidebarComponent', () => {

    let component: TaskSidebarComponent;
    let fixture: ComponentFixture<TaskSidebarComponent>;
    let dialog: MatDialog;
    let notifyService: NotificationService;
    let notifySpy: jasmine.Spy;

    const  taskDetailsWithFormMock = new TaskDetailsModel({
        'id': '91',
        'name': 'Request translation',
        'description': 'fake description',
        'category': null,
        'assignee': fakeUser3,
        'formName': 'form-Name',
        'created': '2016-11-03T15:25:42.749+0000',
        'dueDate': '2016-11-03T15:25:42.749+0000',
        'endDate': null,
        'duration': null,
        'priority': 50,
        'parentTaskId': null,
        'parentTaskName': null,
        'processInstanceId': '86',
        'processInstanceName': null,
        'processDefinitionId': 'TranslationProcess:2:8',
        'processDefinitionName': 'Translation Process',
        'processDefinitionDescription': null,
        'processDefinitionKey': 'TranslationProcess',
        'processDefinitionCategory': 'http://www.activiti.org/processdef',
        'processDefinitionVersion': 2,
        'processDefinitionDeploymentId': '5',
        'formKey': '4',
        'processInstanceStartUserId': '1001',
        'initiatorCanCompleteTask': true,
        'adhocTaskCanBeReassigned': false,
        'taskDefinitionKey': 'sid-DDECD9E4-0299-433F-9193-C3D905C3EEBE',
        'executionId': '86',
        'involvedPeople': [fakeUser2, fakeUser3],
        'memberOfCandidateUsers': false,
        'managerOfCandidateGroup': false,
        'memberOfCandidateGroup': false
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TaskSidebarComponent,
                TaskHeaderComponent
            ],
            providers: [
                TaskListService,
                BpmUserService,
                LogService,
                CardViewUpdateService,
                PeopleProcessService,
                CommentProcessService,
                DatePipe,
                MatDialog
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TaskSidebarComponent);
        component = fixture.componentInstance;
        component.taskDetails = taskDetailsMock;
        const userBpmService = TestBed.get(BpmUserService);
        spyOn(userBpmService, 'getCurrentUserInfo').and.returnValue(of({}));
        commentProcessService = fixture.debugElement.injector.get(CommentProcessService);
        dialog = TestBed.get(MatDialog);
        notifyService = TestBed.get(NotificationService);
        spyOn(commentProcessService, 'getTaskComments').and.returnValue(of([
            {message: 'Test1', created: Date.now(), createdBy: {firstName: 'Admin', lastName: 'User'}},
            {message: 'Test2', created: Date.now(), createdBy: {firstName: 'Admin', lastName: 'User'}},
            {message: 'Test3', created: Date.now(), createdBy: {firstName: 'Admin', lastName: 'User'}}
        ]));
        notifySpy = spyOn(notifyService, 'openSnackMessage').and.returnValue(of([]));
        fixture.detectChanges();
    });

    it('should create instance of ProcessSidebarComponent', () => {
        expect(fixture.componentInstance instanceof TaskSidebarComponent).toBe(true);
    });

    it('should define adf-info-drawer', () => {
        fixture.detectChanges();
        const adfUploadDragAarea = fixture.debugElement.nativeElement.querySelector('adf-info-drawer');
        const adfCreateTaskAttachment = fixture.debugElement.nativeElement.querySelector('adf-info-drawer-tab');
        expect(adfUploadDragAarea).toBeDefined();
        expect(adfCreateTaskAttachment).toBeDefined();
    });

    it('should define adf-task-header', () => {
        fixture.detectChanges();
        const adfHeader = fixture.debugElement.nativeElement.querySelector('adf-task-header');
        expect(adfHeader).toBeDefined();
    });

    it('should define adf-people-search', () => {
        fixture.detectChanges();
        const adfPeopleSearch = fixture.debugElement.nativeElement.querySelector('adf-people-search');
        expect(adfPeopleSearch).toBeDefined();
    });

    it('should define adf-people', () => {
        fixture.detectChanges();
        const adfPeople = fixture.debugElement.nativeElement.querySelector('adf-people');
        expect(adfPeople).toBeDefined();
    });

    it('should define adf-comments', () => {
        fixture.detectChanges();
        const adfComments = fixture.debugElement.nativeElement.querySelector('adf-comments');
        expect(adfComments).toBeDefined();
    });

    it('should not define adf people/comments/search/header if th taskDetails is empty ', () => {
        component.taskDetails = null;
        fixture.detectChanges();
        const adfHeader = fixture.debugElement.nativeElement.querySelector('adf-task-header');
        const adfComments = fixture.debugElement.nativeElement.querySelector('adf-comments');
        const adfPeople = fixture.debugElement.nativeElement.querySelector('adf-people');
        const adfPeopleSearch = fixture.debugElement.nativeElement.querySelector('adf-people-search');
        expect(adfPeople).toBeNull();
        expect(adfPeopleSearch).toBeNull();
        expect(adfHeader).toBeNull();
        expect(adfComments).toBeNull();
    });

    it('should not set involvedPeople when the task does not have groupmembers', async(() => {
        const taskDetails = taskDetailsWithOutInvolvedPeopleMock;
        const change = new SimpleChange('123', taskDetails, true);
        component.taskDetails = taskDetails;
        component.ngOnChanges({ 'taskDetails': change });
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(component.taskPeople.length).toBeFalsy();
        });
    }));

    it('should set involvedPeople when the task has groupmembers', async(() => {
        const taskDetails = taskDetailsWithInvolvedPeopleMock;
        const change = new SimpleChange('123', taskDetails, true);
        component.ngOnChanges({ 'taskDetails': change });
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(component.taskPeople).not.toBeNull();
            expect(component.taskPeople.length).toBe(2);
            expect(component.taskPeople[0]).toBe(fakeUser2);
            expect(component.taskPeople[1]).toBe(fakeUser3);
        });
    }));


    it('should able to open task-form dialog on click of edit form button', async(() => {
        spyOn(dialog, 'open').and.returnValue({ afterClosed() { return of(new DialogEvent(DialogEvent.ACTION_YES)); } });
        const formEdit = spyOn(component.formEdit, 'emit');
        fixture.detectChanges();
        const attachFormButton = fixture.debugElement.nativeElement.querySelector('[data-automation-id="header-formName"]');
        attachFormButton.dispatchEvent(new Event('click'));
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(dialog.open).toHaveBeenCalled();
            expect(formEdit).toHaveBeenCalled();
        });
    }));

    it('should able to call success Notification on formEdit', async(() => {
        spyOn(dialog, 'open').and.returnValue({ afterClosed() { return of(new DialogEvent(DialogEvent.ACTION_YES)); } });
        const formEdit = spyOn(component.formEdit, 'emit');
        component.taskDetails = new TaskDetailsModel(taskDetailsWithFormMock);
        fixture.detectChanges();
        const valueEl = fixture.debugElement.query(By.css('[data-automation-id="header-formName"]'));
        valueEl.nativeElement.dispatchEvent(new Event('click'));
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(dialog.open).toHaveBeenCalled();
            expect(formEdit).toHaveBeenCalled();
            expect(notifySpy).toHaveBeenCalled();
        });
    }));

    it('should able to call error Notification when error occurred', async(() => {
        spyOn(dialog, 'open').and.returnValue({ afterClosed() { return of(new DialogEvent(DialogEvent.ERROR)); } });
        const formEdit = spyOn(component.formEdit, 'emit');
        component.taskDetails = new TaskDetailsModel(taskDetailsWithFormMock);
        fixture.detectChanges();
        const valueEl = fixture.debugElement.query(By.css('[data-automation-id="header-formName"]'));
        valueEl.nativeElement.dispatchEvent(new Event('click'));
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(dialog.open).toHaveBeenCalled();
            expect(formEdit).not.toHaveBeenCalled();
            expect(notifySpy).toHaveBeenCalled();
        });
    }));
});
