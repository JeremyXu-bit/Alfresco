/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { TaskListService, TaskListComponent} from '@alfresco/adf-process-services';
import { AppConfigService, UserPreferencesService } from '@alfresco/adf-core';
import { TaskListPaginatorComponent } from './tasklist-paginator.component';
import { fakeFilterRepresentationModel, fakeTaskList } from '../../test-mock';
import { ApplicationContentStateService } from '../../services/application-content-state.service';
import { FullNamePipe } from '../../pipes';

describe('TaskListPaginatorComponent', () => {
    let component: TaskListPaginatorComponent;
    let fixture: ComponentFixture<TaskListPaginatorComponent>;
    let appConfig: AppConfigService;
    let service: TaskListService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TaskListPaginatorComponent,
                TaskListComponent,
                FullNamePipe
            ],
            providers: [
                TaskListService, UserPreferencesService, ApplicationContentStateService
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TaskListPaginatorComponent);
        component = fixture.componentInstance;
        appConfig = TestBed.get(AppConfigService);
        service = fixture.debugElement.injector.get(TaskListService);
        appConfig.config = Object.assign(appConfig.config, {
            'adf-task-list': {
                'presets': {
                    'dw-task-list': [
                        {
                            'key': 'name',
                            'type': 'text',
                            'title': 'ADF_TASK_LIST.PROPERTIES.NAME',
                            'cssClass': 'dw-dt-col-4 ellipsis-cell',
                            'sortable': true
                        }
                    ]
                }
            }
        });
        spyOn(service, 'findAllTasksWithoutState').and.returnValue(of(fakeTaskList));
        spyOn(service, 'findTasksByState').and.returnValue(of(fakeTaskList));
        component.currentFilter = fakeFilterRepresentationModel;
        fixture.detectChanges();
    });

    it('should create instance of TaskListPaginatorComponent', () => {
        expect(fixture.componentInstance instanceof TaskListPaginatorComponent).toBe(true, 'should create TaskListPaginatorComponent');
    });

    it('should define an adfTasklist', () => {
        const adfTasklist = fixture.debugElement.nativeElement.querySelector('.adf-tasklist');
        expect(adfTasklist).toBeDefined();
    });

    it('should display taskdetails on taskList', () => {
        const value1 = fixture.debugElement.query(By.css(`[data-automation-id="text_Task-1"`));
        const value2 = fixture.debugElement.query(By.css(`[data-automation-id="text_Task-2"]`));
        expect(value1).not.toBeNull();
        expect(value1.nativeElement.innerText.trim()).toBe('Task-1');
        expect(value2.nativeElement.innerText.trim()).toBe('Task-2');
    });

    it('should display taskList coloumns', () => {
        const assigneElement = fixture.debugElement.query(By.css(`[data-automation-id="auto_id_assignee"`));
        const NameElement = fixture.debugElement.query(By.css(`[data-automation-id="auto_id_name"]`));
        expect(assigneElement).not.toBeNull();
        expect(NameElement).not.toBeNull();
        expect(assigneElement.nativeElement.innerText.trim()).toBe('ADF_TASK_LIST.PROPERTIES.ASSIGNEE');
        expect(NameElement.nativeElement.innerText.trim()).toBe('ADF_TASK_LIST.PROPERTIES.NAME');
    });
});
