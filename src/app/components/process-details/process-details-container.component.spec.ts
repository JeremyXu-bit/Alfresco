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
import { ActivatedRoute } from '@angular/router';
import { AppsProcessService } from '@alfresco/adf-core';
import { ProcessDetailsContainerComponent } from './process-details-container.component';
import { ProcessFilterService, ProcessService } from '@alfresco/adf-process-services';
import { fakeProcessInstance, fakeApp1, fakeProcessFilter } from '../../test-mock';
import { ToolbarIconEvent } from './../layout/toolbar/models/toolbar-icon-event';

describe('ProcessDetailsContainerComponent', () => {

    let component: ProcessDetailsContainerComponent;
    let fixture: ComponentFixture<ProcessDetailsContainerComponent>;
    let processService: ProcessService;
    let appsService: AppsProcessService;
    let filterService: ProcessFilterService;
    let getProcessSpy: jasmine.Spy;
    let getApplicationDetailsByIdSpy: jasmine.Spy;
    let getProcessFilterByNameSpy: jasmine.Spy;
    let cancelProcessSpy: jasmine.Spy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ProcessDetailsContainerComponent
            ],
            providers: [
                AppsProcessService,
                ProcessFilterService,
                ProcessService,
                {
                    provide: ActivatedRoute,
                    useValue: {
                        parent: { params: of({ appId: 123 }) },
                        params: of({ processInstanceId: 123 }),
                    }
                }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProcessDetailsContainerComponent);
        component = fixture.componentInstance;
        processService = fixture.debugElement.injector.get(ProcessService);
        appsService = fixture.debugElement.injector.get(AppsProcessService);
        filterService = fixture.debugElement.injector.get(ProcessFilterService);
        getProcessSpy = spyOn(processService, 'getProcess').and.returnValue(of(fakeProcessInstance));
        getApplicationDetailsByIdSpy = spyOn(appsService, 'getApplicationDetailsById').and.returnValue(of(fakeApp1));
        getProcessFilterByNameSpy = spyOn(filterService, 'getProcessFilterByName').and.returnValue(of(fakeProcessFilter));
        fixture.detectChanges();
    });

    it('should create instance of ProcessDetailsContainerComponent', () => {
        expect(fixture.componentInstance instanceof ProcessDetailsContainerComponent).toBe(true);
    });

    it('should call service to cancel process', () => {
        cancelProcessSpy = spyOn(processService, 'cancelProcess').and.returnValue(of());
        fixture.detectChanges();
        component.onToolbarIconClick(new ToolbarIconEvent(ToolbarIconEvent.ACTION_CANCEL_TYPE));
        expect(cancelProcessSpy).toHaveBeenCalledWith(123);
    });

    it('should call service to fetch processFilter', () => {
        cancelProcessSpy = spyOn(processService, 'cancelProcess').and.returnValue(of());
        fixture.detectChanges();
        component.onToolbarIconClick(new ToolbarIconEvent(ToolbarIconEvent.ACTION_CLOSE_TYPE));
        expect(getProcessFilterByNameSpy).toHaveBeenCalled();
    });

    it('should call service to get process instance', () => {
        fixture.detectChanges();
        expect(getProcessSpy).toHaveBeenCalled();
        expect(component.processInstanceDetails.name).toBe('Process 773443333');
    });

    it('should call service to get appName', () => {
        fixture.detectChanges();
        expect(getApplicationDetailsByIdSpy).toHaveBeenCalled();
        expect(component.appName).toBe('Expense processes');
    });

    describe('process details', () => {

        beforeEach(() => {
            component.activeTab = 1;
            component.appName = 'Fake-Name';
            component.processInstanceDetails = fakeProcessInstance;
        });

        it('should define toolbar', () => {
            component.activeTab = 1;
            fixture.detectChanges();
            const apwtoolbar = fixture.debugElement.nativeElement.querySelector('#apw-process-toolbar-id');
            const element = fixture.debugElement.nativeElement.querySelector('#apw-process-toolbar-title');
            expect(apwtoolbar).toBeDefined();
            expect(element).toBeDefined();
            expect(element.innerText).toBe('DW-TOOLBAR.TITLE.ATTACHMENTS');
        });

        it('should not show toolbar if processInstance is empty', () => {
            component.processInstanceDetails = null;
            fixture.detectChanges();
            const apwtoolbar = fixture.debugElement.nativeElement.querySelector('#apw-process-toolbar-id');
            const element = fixture.debugElement.nativeElement.querySelector('#apw-process-toolbar-title');
            expect(apwtoolbar).toBeNull();
            expect(element).toBeNull();
        });

        it('should display processSidebar when showInfoDrawer is true ', () => {
            component.showInfoDrawer = true;
            fixture.detectChanges();
            const processSidebar = fixture.debugElement.nativeElement.querySelector('#apw-process-sidebar-id');
            expect(processSidebar).not.toBeNull();
        });

        it('should not display processSidebar when showInfoDrawer is false ', () => {
            component.showInfoDrawer = false;
            fixture.detectChanges();
            const processSidebar = fixture.debugElement.nativeElement.querySelector('#apw-process-sidebar-id');
            expect(processSidebar).toBeNull();
        });

        it('should not define apw-process-toolbar', () => {
            component.processInstanceDetails = null;
            fixture.detectChanges();
            const apwtoolbar = fixture.debugElement.nativeElement.querySelector('#apw-process-toolbar-id');
            expect(apwtoolbar).toBeNull();
        });

        it('should not define apwProcessAttachment on detail view', () => {
            component.activeTab = 0;
            fixture.detectChanges();
            const apwprocessDetails = fixture.debugElement.nativeElement.querySelector('#apw-process-details-id');
            const apwProcessAttachment = fixture.debugElement.nativeElement.querySelector('#apw-process-attachment-id');
            expect(apwProcessAttachment).toBeNull();
            expect(apwprocessDetails).toBeDefined();
            expect(apwprocessDetails).not.toBeNull();
        });

        it('should not define apwprocessDetails on active view', () => {
            component.activeTab = 1;
            fixture.detectChanges();
            const apwprocessDetails = fixture.debugElement.nativeElement.querySelector('#apw-process-details-id');
            const apwProcessAttachment = fixture.debugElement.nativeElement.querySelector('#apw-process-attachment-id');
            expect(apwProcessAttachment).toBeDefined();
            expect(apwProcessAttachment).not.toBeNull();
            expect(apwprocessDetails).toBeNull();
        });
    });
});
