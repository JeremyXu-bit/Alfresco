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

import { UploadService } from '@alfresco/adf-core';
import { TaskAttachmentComponent } from './task-attachment.component';
import { TaskUploadService } from '@alfresco/adf-process-services';
import { completedTaskDetailsMock, taskDetailsMock } from '../../test-mock';

describe('TaskAttachmentComponent', () => {

    let component: TaskAttachmentComponent;
    let fixture: ComponentFixture<TaskAttachmentComponent>;
    let uploadServie: UploadService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TaskAttachmentComponent
            ],
            providers: [
                TaskUploadService,
                UploadService
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TaskAttachmentComponent);
        component = fixture.componentInstance;
        uploadServie = fixture.debugElement.injector.get(UploadService);
        spyOn(uploadServie, 'fileUploadComplete').and.returnValue(of());
        component.taskDetails = taskDetailsMock;
        fixture.detectChanges();
    });

    it('should create instance of TaskAttachmentComponent', () => {
        expect(fixture.componentInstance instanceof TaskAttachmentComponent).toBe(true);
    });

    it('should define adf-upload-drag-area', () => {
        fixture.detectChanges();
        const adfUploadDragAarea = fixture.debugElement.nativeElement.querySelector('adf-upload-drag-area');
        expect(adfUploadDragAarea).toBeDefined();
    });

    it('should define adf-task-attachment-list', () => {
        fixture.detectChanges();
        const adfTaskAattachmentList = fixture.debugElement.nativeElement.querySelector('adf-task-attachment-list');
        expect(adfTaskAattachmentList).toBeDefined();
    });

    it('should define adf-create-task-attachment', () => {
        fixture.detectChanges();
        const adfCreateTaskAttachment = fixture.debugElement.nativeElement.querySelector('adf-create-task-attachment');
        expect(adfCreateTaskAttachment).toBeDefined();
    });

    it('should not show adf-create-task-attachment if the task is completed', () => {
        component.taskDetails = completedTaskDetailsMock;
        fixture.detectChanges();
        const adfCreateTaskAttachment = fixture.debugElement.nativeElement.querySelector('#dw-create-attachment-id');
        expect(adfCreateTaskAttachment).toBeNull();
    });

    it('should show drag and drop template if there is no documents', () => {
        component.taskDetails = taskDetailsMock;
        fixture.detectChanges();
        const adfEmptyListHeader = fixture.debugElement.nativeElement.querySelector('#adf-empty-list-header-id');
        const adfEmptyListBody = fixture.debugElement.nativeElement.querySelector('#adf-empty-list-body-id');
        const adfEmptyListDrag = fixture.debugElement.nativeElement.querySelector('#adf-empty-list-body-drag-drop-id');
        expect(adfEmptyListBody).not.toBeNull();
        expect(adfEmptyListDrag.innerText).toContain('ADF_TASK_LIST.ATTACHMENT.EMPTY.DRAG-AND-DROP.TITLE');
        expect(adfEmptyListHeader.innerText).toContain('ADF_TASK_LIST.ATTACHMENT.EMPTY.HEADER');
    });

    it('should not show drag and drop template if the task is completed', () => {
        component.taskDetails = completedTaskDetailsMock;
        fixture.detectChanges();
        const adfEmptyListHeader = fixture.debugElement.nativeElement.querySelector('adf-empty-list');
        const adfEmptyListBody = fixture.debugElement.nativeElement.querySelector('#adf-empty-list-body-id');
        expect(adfEmptyListBody).toBeNull();
        expect(adfEmptyListHeader).toBeNull();
    });
});
