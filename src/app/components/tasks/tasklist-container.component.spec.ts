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

import {
    AppsProcessService,
    FormService } from '@alfresco/adf-core';
import {
    ProcessService,
    TaskListService,
    TaskFilterService } from '@alfresco/adf-process-services';

import { ActivatedRoute} from '@angular/router';
import { TaskListContainerComponent } from './tasklist-container.component';
import { fakeFilterRepresentationModel, fakeApp1, taskDetailsMock } from '../../test-mock';
import { ApplicationContentStateService } from '../../services/application-content-state.service';

describe('TaskListContainerComponent', () => {
    let component: TaskListContainerComponent;
    let fixture: ComponentFixture<TaskListContainerComponent>;
    let element: HTMLElement;
    let service: TaskListService;
    let serviceFilter: TaskFilterService;
    let appsProcessService: AppsProcessService;
    let formService: FormService;
    let getTaskFilterByFilterId: jasmine.Spy;
    let getTaskFormSpy: jasmine.Spy;
    let getTaskDetailsSpy: jasmine.Spy;

    const fakeForm = {
        id: 1001,
        name: 'ISSUE_FORM',
        processDefinitionId: 'ISSUE_APP:1:2504',
        processDefinitionName: 'ISSUE_APP',
        processDefinitionKey: 'ISSUE_APP',
        taskId: '7506',
        taskDefinitionKey: 'sid-F67A2996-1684-4774-855A-4591490081FD',
        tabs: [],
        fields: [
            {
                fieldType: 'ContainerRepresentation',
                id: '1498212398417',
                name: 'Label',
                type: 'container',
                value: null
            }]
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TaskListContainerComponent
            ],
            providers: [
                TaskListService,
                TaskFilterService,
                ProcessService,
                ApplicationContentStateService,
                {
                provide: ActivatedRoute,
                    useValue: {
                        params: of({taskFilterId: '123'}),
                        parent: {params: of({appId: '321'})}
                    }
                }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TaskListContainerComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        service = fixture.debugElement.injector.get(TaskListService);
        serviceFilter = fixture.debugElement.injector.get(TaskFilterService);
        formService = fixture.debugElement.injector.get(FormService);
        appsProcessService = fixture.debugElement.injector.get(AppsProcessService);
        getTaskFilterByFilterId = spyOn(serviceFilter, 'getTaskFilterById').and.returnValue(of(fakeFilterRepresentationModel));
        spyOn(appsProcessService, 'getApplicationDetailsById').and.returnValue(of(fakeApp1));
        getTaskFormSpy = spyOn(formService, 'getTaskForm').and.returnValue(of(fakeForm));
        getTaskDetailsSpy = spyOn(service, 'getTaskDetails').and.returnValue(of(taskDetailsMock));
        fixture.detectChanges();
    });

    it('should create instance of DwTaskListContainer', () => {
        expect(fixture.componentInstance instanceof TaskListContainerComponent).toBe(true, 'should create TaskListContainerComponent');
    });

    it('should get params from routing', () => {
        component.ngOnInit();
        expect(component.filterId).toBe(123);
        expect(component.appId).toBe(321);
    });

    it('should fetch TaskFilter by filterId', () => {
        fixture.detectChanges();
        expect(getTaskFilterByFilterId).toHaveBeenCalled();
        expect(component.taskFilter.id).toBe(1);
        expect(component.taskFilter.name).toBe('fake-name');
    });

    it('should define dw-task-details selector  ', () => {
        component.currentTaskId = '12';
        fixture.detectChanges();
        const adfTaskDetails = element.querySelector('dw-task-details');
        expect(adfTaskDetails).toBeDefined();
    });

    it('should fetch taskForm details and taskDetails by taskId', () => {
        component.onSuccessTaskList('91');
        fixture.detectChanges();
        expect(getTaskFormSpy).toHaveBeenCalled();
        expect(getTaskDetailsSpy).toHaveBeenCalled();
        expect(component.taskDetails).toBe(taskDetailsMock);
        expect(component.taskDetails.id).toBe('91');
        expect(component.taskFormName).toBe('ISSUE_FORM');
    });

    it('should define an activiti-tasklist-paginator', () => {
        fixture.detectChanges();
        const adfPaginator = fixture.debugElement.nativeElement.querySelector('.activiti-tasklist-paginator');
        expect(adfPaginator).toBeDefined();
    });

    it('should define tasksidebar', () => {
        component.taskDetails = taskDetailsMock;
        component.showSidebar = true;
        fixture.detectChanges();
        const infoElement = fixture.debugElement.nativeElement.querySelector('#dw-tasklist-sidebar-open-new-id');
        const sidebar = fixture.debugElement.nativeElement.querySelector('#dw-tasklist-sidebar-id');
        expect(sidebar).toBeDefined();
        expect(infoElement.innerText).toBe('open_in_new');
    });

    it('should not define tasksidebar if the showSidebar is false', () => {
        component.taskDetails = taskDetailsMock;
        component.showSidebar = false;
        fixture.detectChanges();
        const infoElement = fixture.debugElement.nativeElement.querySelector('#dw-tasklist-sidebar-open-new-id');
        const sidebar = fixture.debugElement.nativeElement.querySelector('#dw-tasklist-sidebar-id');
        expect(sidebar).toBeNull();
        expect(infoElement).toBeNull();
    });
});
