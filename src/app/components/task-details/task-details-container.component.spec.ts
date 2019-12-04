/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { of } from 'rxjs';
import { TaskDetailsContainerComponent } from './task-details-container.component';
import { DialogConfirmationComponent } from '../layout';
import { ActivatedRoute } from '@angular/router';
import { AppsProcessService } from '@alfresco/adf-core';
import { TaskListService, TaskFilterService } from '@alfresco/adf-process-services';
import { PreviewService } from '../../services/preview.service';
import { fakeApp1, taskDetailsMock, fakeTaskDefaultFilter } from '../../test-mock';

describe('TaskDetailsContainerComponent', () => {

    let component: TaskDetailsContainerComponent;
    let fixture: ComponentFixture<TaskDetailsContainerComponent>;
    let taskListService: TaskListService;
    let appsService: AppsProcessService;
    let taskFilterService: TaskFilterService;
    let getTaskDetailsSpy: jasmine.Spy;
    let getTaskFilterByNameSpy: jasmine.Spy;
    let getApplicationDetailsByIdSpy: jasmine.Spy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TaskDetailsContainerComponent,
                DialogConfirmationComponent
            ],
            providers: [
                TaskListService,
                AppsProcessService,
                TaskFilterService,
                PreviewService,
                {
                    provide: ActivatedRoute,
                    useValue: {
                        parent: { params: of({ appId: 123 }) },
                        params: of({ taskId: 1001 }),
                    }
                }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TaskDetailsContainerComponent);
        component = fixture.componentInstance;
        taskListService = fixture.debugElement.injector.get(TaskListService);
        appsService = fixture.debugElement.injector.get(AppsProcessService);
        taskFilterService = fixture.debugElement.injector.get(TaskFilterService);
        getApplicationDetailsByIdSpy = spyOn(appsService, 'getApplicationDetailsById').and.returnValue(of(fakeApp1));
        getTaskDetailsSpy = spyOn(taskListService, 'getTaskDetails').and.returnValue(of(taskDetailsMock));
        getTaskFilterByNameSpy = spyOn(taskFilterService, 'getTaskFilterByName').and.returnValue(of(fakeTaskDefaultFilter));
        fixture.detectChanges();
    });

    it('should create instance of TaskDetailsContainerComponent', () => {
        expect(fixture.componentInstance instanceof TaskDetailsContainerComponent).toBe(true);
    });

    it('should call service to get taskDetails', () => {
        fixture.detectChanges();
        expect(getTaskDetailsSpy).toHaveBeenCalled();
        expect(component.taskDetails.id).toBe('91');
        expect(component.taskDetails.name).toBe('Request translation');
        expect(component.taskDetails.assignee.firstName).toBe('Admin');
    });

    it('should call service to get appName', () => {
        fixture.detectChanges();
            expect(getApplicationDetailsByIdSpy).toHaveBeenCalled();
            expect(component.appName).toBe('Expense processes');
    });

    it('should call service to fetch taskFilter', () => {
        fixture.detectChanges();
        component.oncloseIconClick();
        expect(getTaskFilterByNameSpy).toHaveBeenCalled();
    });

    describe('task details', () => {

        beforeEach(() => {
            component.appName = 'Fake-Name';
            component.taskDetails = taskDetailsMock;
        });

        it('should define apw-task-toolbar', () => {
            component.activeTab = 1;
            fixture.detectChanges();
            const apwtoolbar = fixture.debugElement.nativeElement.querySelector('#apw-task-toolbar-id');
            expect(apwtoolbar).toBeDefined();
        });

        it('should display taskSidebar when showInfoDrawer is true ', () => {
            component.showInfoDrawer = true;
            fixture.detectChanges();
            const taskSidebar = fixture.debugElement.nativeElement.querySelector('#apw-task-sidebar-id');
            expect(taskSidebar).not.toBeNull();
        });

        it('should not display taskSidebar when showInfoDrawer is false ', () => {
            component.showInfoDrawer = false;
            fixture.detectChanges();
            const taskSidebar = fixture.debugElement.nativeElement.querySelector('#apw-task-sidebar-id');
            expect(taskSidebar).toBeNull();
        });

        it('should not define apwTaskAttachment on detail view', () => {
            component.activeTab = 0;
            fixture.detectChanges();
            const apwTaskForm = fixture.debugElement.nativeElement.querySelector('#apw-task-form-id');
            const apwTaskAttachment = fixture.debugElement.nativeElement.querySelector('#apw-task-attachment-id');
            expect(apwTaskAttachment).toBeNull();
            expect(apwTaskForm).toBeDefined();
            expect(apwTaskForm).not.toBeNull();
        });

        it('should not define apwTaskFormDetails on active view', () => {
            component.activeTab = 1;
            fixture.detectChanges();
            const apwTaskForm = fixture.debugElement.nativeElement.querySelector('#apw-task-form-id');
            const apwTaskAttachment = fixture.debugElement.nativeElement.querySelector('#apw-task-attachment-id');
            expect(apwTaskAttachment).toBeDefined();
            expect(apwTaskAttachment).not.toBeNull();
            expect(apwTaskForm).toBeNull();
        });
    });

    it('should display dialog if discarding an unsaved form', async(() => {
        fixture.detectChanges();
        component.onFormChanged({});
        fixture.whenStable().then(() => {
            const el1 = window.document.querySelector('mat-dialog-container');
            expect(el1).toBeDefined();
        });
    }));

    it('should not display dialog if form is saved', async(() => {
        fixture.detectChanges();
        component.onFormChanged(null);
        fixture.whenStable().then(() => {
            const el1 = window.document.querySelector('mat-dialog-container');
            expect(el1).toBe(null);
        });
    }));
});
