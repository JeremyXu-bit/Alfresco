/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ProcessDetailsComponent } from './process-details.component';
import { fakeRunningProcessInstance, fakeProcessInstance } from '../../test-mock';
import { TaskAuditDirective } from '@alfresco/adf-process-services';
import { FullNamePipe } from '../../pipes';

describe('ProcessDetailsComponent', () => {

    let component: ProcessDetailsComponent;
    let fixture: ComponentFixture<ProcessDetailsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ProcessDetailsComponent,
                TaskAuditDirective,
                FullNamePipe
            ],
            providers: [],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProcessDetailsComponent);
        component = fixture.componentInstance;
        component.processInstanceDetails = fakeRunningProcessInstance;
        fixture.detectChanges();
    });

    it('should create instance of ProcessDetailsComponent', () => {
        expect(fixture.componentInstance instanceof ProcessDetailsComponent).toBe(true);
    });

    it('should define adf-tasklist', () => {
        fixture.detectChanges();
        const adfTasklist = fixture.debugElement.nativeElement.querySelector('#dw-tasklist-id');
        expect(adfTasklist).toBeDefined();
    });

    it('should define adf-diagram', () => {
        fixture.detectChanges();
        const adfDiagram = fixture.debugElement.nativeElement.querySelector('#dw-diagram-id');
        expect(adfDiagram).toBeDefined();
        expect(adfDiagram).not.toBeNull();
    });

    it('should not show adf-diagram if process is completed', () => {
        component.processInstanceDetails = fakeProcessInstance;
        fixture.detectChanges();
        const adfDiagram = fixture.debugElement.nativeElement.querySelector('#dw-diagram-id');
        expect(adfDiagram).toBeNull();
    });
});
