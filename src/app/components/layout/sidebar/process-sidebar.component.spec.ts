/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ProcessSidebarComponent } from './process-sidebar.component';
import { fakeProcessInstance } from '../../../test-mock';

describe('ProcessSidebarComponent', () => {

    let component: ProcessSidebarComponent;
    let fixture: ComponentFixture<ProcessSidebarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ProcessSidebarComponent
            ],
            providers: [],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProcessSidebarComponent);
        component = fixture.componentInstance;
        component.processInstanceDetails = fakeProcessInstance;
        fixture.detectChanges();
    });

    it('should create instance of ProcessSidebarComponent', () => {
        expect(fixture.componentInstance instanceof ProcessSidebarComponent).toBe(true);
    });

    it('should define adf-info-drawer', () => {
        fixture.detectChanges();
        const adfUploadDragAarea = fixture.debugElement.nativeElement.querySelector('adf-info-drawer');
        const adfCreateTaskAttachment = fixture.debugElement.nativeElement.querySelector('adf-info-drawer-tab');
        expect(adfUploadDragAarea).toBeDefined();
        expect(adfCreateTaskAttachment).toBeDefined();
    });

    it('should define adf-process-instance-header', () => {
        fixture.detectChanges();
        const adfHeader = fixture.debugElement.nativeElement.querySelector('adf-process-instance-header');
        expect(adfHeader).toBeDefined();
    });

    it('should define adf-process-instance-comments', () => {
        fixture.detectChanges();
        const adfComments = fixture.debugElement.nativeElement.querySelector('adf-process-instance-comments');
        expect(adfComments).toBeDefined();
    });

    it('should not define adf comments/header if the processInstance is empty ', () => {
        fixture.detectChanges();
        const adfHeader = fixture.debugElement.nativeElement.querySelector('adf-task-header');
        const adfComments = fixture.debugElement.nativeElement.querySelector('adf-comments');
        expect(adfHeader).toBeNull();
        expect(adfComments).toBeNull();
    });
});
