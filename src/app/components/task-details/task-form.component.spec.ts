/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { CUSTOM_ELEMENTS_SCHEMA, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';

import {
    BpmUserService,
    FormModel,
    FormService,
    AuthenticationService,
    NotificationService,
    LogService
} from '@alfresco/adf-core';
import { TaskDetailsModel, TaskStandaloneComponent, TaskListService } from '@alfresco/adf-process-services';

import { TaskFromComponent } from './task-form.component';
import {
    taskDetailsWithOutProcessDefIdMock,
    completedTaskDetailsWithOutProcessDefMock,
    taskDetailsMock,
    taskDetailsWithOutFormMock,
    completedTaskDetailsMock,
    sameFakeFormValue,
    changedformModelMock,
    fakeForm,
    changedFakeFormValue
} from '../../test-mock';
import { DialogEvent } from '../../models';

@Injectable()
export class ActivatedRouteStub {
    private subject = new BehaviorSubject(this.testParams);
    params = this.subject.asObservable();

    private _testParams: {};
    get testParams() {
        return this._testParams;
    }

    set testParams(params: {}) {
        this._testParams = params;
        this.subject.next(params);
    }
}

describe('TaskFromComponent', () => {
    let component: TaskFromComponent;
    let fixture: ComponentFixture<TaskFromComponent>;
    let service: TaskListService;
    let bpmUserservice: BpmUserService;
    let notifyService: NotificationService;
    let formService: FormService;
    let element: HTMLElement;
    let completeTaskSpy: jasmine.Spy;
    let bpmUserserviceSpy: jasmine.Spy;
    let notifySpy: jasmine.Spy;
    let activatedRouteStub;
    let authService: AuthenticationService;
    let dialog: MatDialog;

    const bpmUserServiceStub = {
        getCurrentUserInfo() {
            return of({ id: 1001 });
        },

        getCurrentUserProfileImage() { }
    };

    const formServiceStub = {
        formFieldValueChanged() {
            return changedformModelMock;
        }
    };

    beforeEach(async(() => {
        activatedRouteStub = new ActivatedRouteStub();
        TestBed.configureTestingModule({
            declarations: [
                TaskFromComponent,
                TaskStandaloneComponent
            ],
            providers: [
                TaskListService,
                LogService,
                FormService,
                AuthenticationService,
                { provide: BpmUserService, useValue: bpmUserServiceStub },
                { provide: formService, useValue: formServiceStub },
                { provide: ActivatedRoute, useValue: activatedRouteStub },
                MatDialog
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TaskFromComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        dialog = TestBed.get(MatDialog);
        authService = fixture.debugElement.injector.get(AuthenticationService);
        spyOn(authService, 'isEcmLoggedIn').and.returnValue(false);
        spyOn(authService, 'isBpmLoggedIn').and.returnValue(true);
        spyOn(authService, 'isLoggedIn').and.returnValue(true);
        service = fixture.debugElement.injector.get(TaskListService);
        bpmUserservice = fixture.debugElement.injector.get(BpmUserService);
        notifyService = TestBed.get(NotificationService);
        formService = fixture.debugElement.injector.get(FormService);
        spyOn(formService, 'formFieldValueChanged').and.returnValue(changedformModelMock);
        bpmUserserviceSpy = spyOn(bpmUserservice, 'getCurrentUserInfo').and.returnValue(of({ id: 1001 }));
        spyOn(bpmUserservice, 'getCurrentUserProfileImage').and.returnValue('./fake.png');
        completeTaskSpy = spyOn(service, 'completeTask').and.returnValue(of({ status: 'completed' }));
        activatedRouteStub.testParams = { appId: '321', taskId: '123' };
        notifySpy = spyOn(notifyService, 'openSnackMessage').and.returnValue(of([]));
        fixture.detectChanges();
    });

    it('should create instance of TaskFromComponent', () => {
        expect(component instanceof TaskFromComponent).toBe(true);
    });

    it('should define adf-form', () => {
        component.taskDetails = new TaskDetailsModel(taskDetailsMock);
        const activitFormSelector = element.querySelector('adf-form');
        expect(activitFormSelector).toBeDefined();
    });

    it('should fetch current bpm user', () => {
        fixture.detectChanges();
        expect(bpmUserserviceSpy).toHaveBeenCalled();
    });

    it('should emit complete event when form completed', (done) => {
        component.complete.subscribe((processInfo) => {
            expect(processInfo).toBeDefined();
            expect(processInfo.processDefinitionId).toEqual('TranslationProcess:2:8');
            expect(processInfo.processInstanceId).toEqual('86');
            done();
        });
        component.taskDetails = new TaskDetailsModel(taskDetailsMock);
        spyOn(component, 'onFormCompleted').and.callThrough();
        component.onFormCompleted(new FormModel());
    });

    describe('No form Message ', () => {

        it('should show form completed template if the task is completed', () => {
            component.taskDetails = new TaskDetailsModel(completedTaskDetailsMock);
            fixture.detectChanges();
            const activitFormSelector = element.querySelector('adf-form');
            const noFormMessage = fixture.debugElement.nativeElement.querySelector('#dw-completed-form-id');
            expect(activitFormSelector).toBeNull();
            expect(noFormMessage).toBeDefined();
            expect(noFormMessage.innerText).toContain('DW-TASK-FORM.COMPLETE-TASK-MESSAGE');
        });

        it('should cancel no-form when cancel button is clicked', () => {
            const cancelSpy = spyOn(component.cancel, 'emit');
            component.taskDetails = new TaskDetailsModel(taskDetailsWithOutFormMock);
            fixture.detectChanges();
            const cancelButtonElement = fixture.debugElement.nativeElement.querySelector('.dw-task-button-cancel');
            cancelButtonElement.click();
            expect(cancelSpy).toHaveBeenCalled();
        });


        it('should complete no-form when complete button is clicked', () => {
            const navigateSpy = spyOn(component.navigate, 'emit');
            component.taskDetails = new TaskDetailsModel(taskDetailsWithOutFormMock);
            fixture.detectChanges();
            const completeButtonElement = fixture.debugElement.nativeElement.querySelector('#dw-no-form-complete-button');
            completeButtonElement.click();
            expect(completeTaskSpy).toHaveBeenCalledWith('91');
            expect(navigateSpy).toHaveBeenCalled();
        });

        it('should not show no-form actions when the task is completed', () => {
            component.taskDetails = new TaskDetailsModel(completedTaskDetailsMock);
            fixture.detectChanges();
            const completeButtonElement = fixture.debugElement.nativeElement.querySelector('#dw-no-form-complete-button');
            const cancelButtonElement = fixture.debugElement.nativeElement.querySelector('.dw-task-button-cancel');
            expect(completeButtonElement).toBeNull();
            expect(cancelButtonElement).toBeNull();
        });
    });

    describe('StandAloneTaskFrom', () => {

        it('should show form completed template if the task is completed', () => {
            component.taskDetails = new TaskDetailsModel(completedTaskDetailsWithOutProcessDefMock);
            fixture.detectChanges();
            const activitFormSelector = element.querySelector('adf-form');
            const taskStandAlone = element.querySelector('adf-task-standalone');
            const noFormMessage = fixture.debugElement.nativeElement.querySelector('#adf-completed-form-message');
            expect(activitFormSelector).toBeNull();
            expect(taskStandAlone).not.toBeNull();
            expect(taskStandAlone).toBeDefined();
            expect(noFormMessage).toBeDefined();
            expect(noFormMessage.innerText).toContain('ADF_TASK_LIST.STANDALONE_TASK.COMPLETE_TASK_MESSAGE');
        });

        it('should show no form template if there is no formKey', () => {
            component.taskDetails = new TaskDetailsModel(taskDetailsWithOutProcessDefIdMock);
            fixture.detectChanges();
            const activitFormSelector = element.querySelector('adf-form');
            const taskStandAlone = element.querySelector('adf-task-standalone');
            const noFormMessage = fixture.debugElement.nativeElement.querySelector('#adf-no-form-message');
            expect(activitFormSelector).toBeNull();
            expect(taskStandAlone).not.toBeNull();
            expect(taskStandAlone).toBeDefined();
            expect(noFormMessage).toBeDefined();
            expect(noFormMessage.innerText).toContain('ADF_TASK_LIST.STANDALONE_TASK.NO_FORM_MESSAGE');
        });

        it('should cancel no-form when cancel button is clicked', () => {
            const cancelSpy = spyOn(component.cancel, 'emit');
            component.taskDetails = new TaskDetailsModel(taskDetailsWithOutProcessDefIdMock);
            fixture.detectChanges();
            const cancelButtonElement = fixture.debugElement.nativeElement.querySelector('#adf-no-form-cancel-button');
            cancelButtonElement.click();
            expect(cancelSpy).toHaveBeenCalled();
        });

        it('should complete no-form when complete button is clicked', () => {
            const navigateSpy = spyOn(component.navigate, 'emit');
            const executeNoFormOutcomeSpy = spyOn(component.executeNoFormOutcome, 'emit');
            component.taskDetails = new TaskDetailsModel(taskDetailsWithOutProcessDefIdMock);
            fixture.detectChanges();
            const completeButtonElement = fixture.debugElement.nativeElement.querySelector('#adf-no-form-complete-button');
            completeButtonElement.click();
            expect(completeTaskSpy).toHaveBeenCalledWith('91');
            expect(navigateSpy).toHaveBeenCalled();
            expect(executeNoFormOutcomeSpy).toHaveBeenCalled();
        });

        it('should not show no-form actions when the task is completed', () => {
            component.taskDetails = new TaskDetailsModel(completedTaskDetailsWithOutProcessDefMock);
            fixture.detectChanges();
            const completeButtonElement = fixture.debugElement.nativeElement.querySelector('#adf-no-form-cancel-button');
            const cancelButtonElement = fixture.debugElement.nativeElement.querySelector('#adf-no-form-complete-button');
            expect(completeButtonElement).toBeNull();
            expect(cancelButtonElement).toBeNull();
        });

        it('should able to open task-form dialog on click of attachForm button', async(() => {
            spyOn(dialog, 'open').and.returnValue({ afterClosed() { return of(new DialogEvent(DialogEvent.ACTION_YES)); } });
            const formAttached = spyOn(component.formAttached, 'emit');
            component.taskDetails = new TaskDetailsModel(taskDetailsWithOutProcessDefIdMock);
            fixture.detectChanges();
            const attachFormButton = fixture.debugElement.nativeElement.querySelector('#adf-no-form-attach-form-button');
            attachFormButton.dispatchEvent(new Event('click'));
            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(dialog.open).toHaveBeenCalled();
                expect(formAttached).toHaveBeenCalled();
            });
        }));

        it('should able to call success Notification on formAttached', async(() => {
            spyOn(dialog, 'open').and.returnValue({ afterClosed() { return of(new DialogEvent(DialogEvent.ACTION_YES)); } });
            const formAttached = spyOn(component.formAttached, 'emit');
            component.taskDetails = new TaskDetailsModel(taskDetailsWithOutProcessDefIdMock);
            fixture.detectChanges();
            const attachFormButton = fixture.debugElement.nativeElement.querySelector('#adf-no-form-attach-form-button');
            attachFormButton.dispatchEvent(new Event('click'));
            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(dialog.open).toHaveBeenCalled();
                expect(formAttached).toHaveBeenCalled();
                expect(notifySpy).toHaveBeenCalled();
            });
        }));

        it('should able to call error Notification when error occurred', async(() => {
            spyOn(dialog, 'open').and.returnValue({ afterClosed() { return of(new DialogEvent(DialogEvent.ERROR)); } });
            const formAttached = spyOn(component.formAttached, 'emit');
            component.taskDetails = new TaskDetailsModel(taskDetailsWithOutProcessDefIdMock);
            fixture.detectChanges();
            const attachFormButton = fixture.debugElement.nativeElement.querySelector('#adf-no-form-attach-form-button');
            attachFormButton.dispatchEvent(new Event('click'));
            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(dialog.open).toHaveBeenCalled();
                expect(formAttached).not.toHaveBeenCalled();
                expect(notifySpy).toHaveBeenCalled();
            });
        }));
    });

    it('should emit formChange when form value changes ', () => {
        component.taskFormValues = JSON.stringify(sameFakeFormValue);
        const formChange = spyOn(component.formChange, 'emit');
        component.onFormChange();
        fixture.detectChanges();
        formService.formFieldValueChanged.next(<any>changedformModelMock);
        expect(formChange).toHaveBeenCalledWith(fakeForm);
    });

    it('should not emit formChange if no change in form values ', () => {
        component.taskFormValues = JSON.stringify(changedFakeFormValue);
        const formChange = spyOn(component.formChange, 'emit');
        formService.formFieldValueChanged.next(<any>changedformModelMock);
        component.onFormChange();
        fixture.detectChanges();
        expect(formChange).not.toHaveBeenCalled();
    });
});
