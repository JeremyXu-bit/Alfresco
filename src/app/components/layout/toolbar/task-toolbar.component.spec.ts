/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { TaskToolbarComponent } from './task-toolbar.component';
import { TaskListService, TaskAuditDirective } from '@alfresco/adf-process-services';
import { mockPdfData } from '../../../test-mock';

describe('TaskToolbarComponent', () => {

    let component: TaskToolbarComponent;
    let fixture: ComponentFixture<TaskToolbarComponent>;
    let taskService: TaskListService;

    function createFakePdfBlob(): Blob {
        const pdfData = mockPdfData;
        return new Blob([pdfData], { type: 'application/pdf' });
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TaskToolbarComponent,
                TaskAuditDirective
            ],
            providers: [TaskListService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TaskToolbarComponent);
        component = fixture.componentInstance;
        taskService = TestBed.get(TaskListService);
        fixture.detectChanges();
    });

    it('should create instance of TaskToolbarComponent', () => {
        expect(fixture.componentInstance instanceof TaskToolbarComponent).toBe(true);
    });

    it('should emit onBackClick on click of back button', () => {
        component.selectedAction = 'info';
        const onbackEmitSpy = spyOn(component.onBackClick, 'emit');
        fixture.detectChanges();
        const backButton = fixture.debugElement.nativeElement.querySelector('#backButton');
        backButton.click();
        expect(onbackEmitSpy).toBeDefined();
        expect(onbackEmitSpy).toHaveBeenCalled();
    });

    it('should display No name if task name is empty', () => {
        component.selectedAction = 'info';
        component.name = '';
        component.appName = 'fakeAppName';
        fixture.detectChanges();
        const element = fixture.debugElement.nativeElement.querySelector('#name');
        expect(element).toBeDefined();
        expect(element.innerText).toContain('DW-TOOLBAR.TITLE.NO-NAME');
        expect(element.innerText).toContain('in fakeAppName');
    });

    it('should define a adftoolbar', () => {
        component.selectedAction = 'info';
        fixture.detectChanges();
        const adfToolbar = fixture.debugElement.nativeElement.querySelector('adf-toolbar');
        const adfTaskDetails = fixture.debugElement.nativeElement.querySelector('adf-toolbar-title');
        expect(adfTaskDetails).toBeDefined();
        expect(adfToolbar).toBeDefined();
    });

    describe('On TaskAudit', () => {

        beforeEach(async(() => {
            component.name = 'Task Name';
            component.id = 'taskID';
            component.fileName = 'fake-name';
            component.selectedAction = 'info';
        }));

        it('should display the task name', () => {
            component.appName = 'fakeAppName';
            fixture.detectChanges();
            const element = fixture.nativeElement.querySelector('#name');
            expect(element.innerText).toContain('Task Name');
            expect(element.innerText).toContain('in fakeAppName');
        });

        it('should download Task audit on click of TaskAudit Button', async(() => {
            component.auditDownload = true;
            const blob = createFakePdfBlob();
            spyOn(taskService, 'fetchTaskAuditPdfById').and.returnValue(of(blob));
            const onAuditClickSpy = spyOn(component.clicked, 'emit');
            fixture.detectChanges();
            const button = fixture.nativeElement.querySelector('#taskauditButton');
            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(onAuditClickSpy).toHaveBeenCalled();
            });
            button.click();
        }));
    });
});
