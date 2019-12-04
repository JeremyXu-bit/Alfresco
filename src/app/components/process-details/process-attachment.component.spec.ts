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
import { ProcessAttachmentComponent } from './process-attachment.component';
import { ProcessUploadService } from '@alfresco/adf-process-services';
import { PreviewService } from '../../services/preview.service';
import { fakeProcessInstance, fakeRunningProcessInstance } from '../../test-mock';

describe('ProcessAttachmentComponent', () => {

    let component: ProcessAttachmentComponent;
    let fixture: ComponentFixture<ProcessAttachmentComponent>;
    let uploadServie: UploadService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ProcessAttachmentComponent
            ],
            providers: [
                ProcessUploadService,
                UploadService,
                PreviewService
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProcessAttachmentComponent);
        component = fixture.componentInstance;
        uploadServie = fixture.debugElement.injector.get(UploadService);
        spyOn(uploadServie, 'fileUploadComplete').and.returnValue(of());
        component.processInstanceDetails = fakeRunningProcessInstance;
        fixture.detectChanges();
    });

    it('should create instance of ProcessAttachmentComponent', () => {
        expect(fixture.componentInstance instanceof ProcessAttachmentComponent).toBe(true);
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
        component.processInstanceDetails = fakeRunningProcessInstance;
        fixture.detectChanges();
        const adfCreateTaskAttachment = fixture.debugElement.nativeElement.querySelector('#dw-create-attachment-id');
        expect(adfCreateTaskAttachment).toBeDefined();
        expect(adfCreateTaskAttachment).not.toBeNull();
    });

    it('should not show adf-create-task-attachment if the process is completed', () => {
        component.processInstanceDetails = fakeProcessInstance;
        fixture.detectChanges();
        const adfCreateTaskAttachment = fixture.debugElement.nativeElement.querySelector('#dw-create-attachment-id');
        expect(adfCreateTaskAttachment).toBeNull();
    });

    it('should show drag and drop template if there is no documents', () => {
        component.processInstanceDetails = fakeRunningProcessInstance;
        fixture.detectChanges();
        const adfEmptyListHeader = fixture.debugElement.nativeElement.querySelector('#adf-empty-list-header-id');
        const adfEmptyListBody = fixture.debugElement.nativeElement.querySelector('#adf-empty-list-body-id');
        const adfEmptyListDrag = fixture.debugElement.nativeElement.querySelector('#adf-empty-list-body-drag-drop-id');
        expect(adfEmptyListBody).toBeDefined();
        expect(adfEmptyListBody).not.toBeNull();
        expect(adfEmptyListHeader.innerText).toContain('ADF_PROCESS_LIST.PROCESS-ATTACHMENT.EMPTY.HEADER');
        expect(adfEmptyListDrag.innerText).toContain('ADF_PROCESS_LIST.PROCESS-ATTACHMENT.EMPTY.DRAG-AND-DROP.TITLE');
    });

    it('should not show drag and drop template if the task is completed', () => {
        component.processInstanceDetails = fakeProcessInstance;
        fixture.detectChanges();
        const adfEmptyListHeader = fixture.debugElement.nativeElement.querySelector('.adf-empty-list-header');
        const adfEmptyListBody = fixture.debugElement.nativeElement.querySelector('#adf-empty-list-body-id');
        expect(adfEmptyListBody).toBeNull();
        expect(adfEmptyListHeader).toBeNull();
    });
});
