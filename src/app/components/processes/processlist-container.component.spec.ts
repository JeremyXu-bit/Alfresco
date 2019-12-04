/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AppsProcessService } from '@alfresco/adf-core';
import { ProcessFilterService, ProcessService } from '@alfresco/adf-process-services';

import { defaultFakeProcessFilter, fakeApp1, fakeProcessInstance } from '../../test-mock';
import { ProcessListContainerComponent } from './processlist-container.component';
import { ApplicationContentStateService } from '../../services/application-content-state.service';

describe('ProcessListContainerComponent', () => {

    let component: ProcessListContainerComponent;
    let fixture: ComponentFixture<ProcessListContainerComponent>;
    let element: HTMLElement;
    let processService: ProcessService;
    let appsService: AppsProcessService;
    let processFilterService: ProcessFilterService;
    let getProcessSpy: jasmine.Spy;
    let getProcessFilterByNameSpy: jasmine.Spy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ProcessListContainerComponent
            ],
            providers: [
                ProcessService,
                ProcessFilterService,
                AppsProcessService,
                ApplicationContentStateService,
                {
                provide: ActivatedRoute,
                    useValue: {
                        params: of({processFilterId: '123'}),
                        parent: {params: of({appId: '321'})}
                    }
                }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProcessListContainerComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        processService = fixture.debugElement.injector.get(ProcessService);
        processFilterService = fixture.debugElement.injector.get(ProcessFilterService);
        appsService = fixture.debugElement.injector.get(AppsProcessService);
        getProcessSpy = spyOn(processService, 'getProcess').and.returnValue(of(fakeProcessInstance));
        spyOn(appsService, 'getApplicationDetailsById').and.returnValue(of(fakeApp1));
        getProcessFilterByNameSpy = spyOn(processFilterService, 'getProcessFilterByName')
                                    .and.returnValue(of(defaultFakeProcessFilter));
        spyOn(processFilterService, 'getProcessFilterById').and.returnValue(of(defaultFakeProcessFilter));
        fixture.detectChanges();
    });

    it('should create instance of ProcessListContainerComponent', () => {
        expect(fixture.componentInstance instanceof ProcessListContainerComponent)
        .toBe(true, 'should create ProcessListContainerComponent instance');
    });

    it('should get params from routing', () => {
        fixture.detectChanges();
        expect(component.filterId).toBe(123);
        expect(component.appId).toBe(321);
    });

    it('should fetch default Processfilter by FilterName', () => {
        fixture.detectChanges();
        expect(getProcessFilterByNameSpy).toHaveBeenCalled();
        expect(component.defaultFilterId).toBe('333');
    });

    it('should call service to get process instance', () => {
        component.loadProcessDetails('MyProcess:1021');
        fixture.detectChanges();
        expect(getProcessSpy).toHaveBeenCalledWith('MyProcess:1021');
        expect(component.processInstanceDetails.name).toBe('Process 773443333');
    });

    it('should define rows and columns', () => {
        fixture.detectChanges();
        expect(component.dataProcesses.getColumns).toBeDefined();
        expect(component.dataProcesses.getRows).toBeDefined();
        expect(component.dataProcesses.sort).toBeDefined();
    });

    it('should define activiti-process-instance-list', () => {
        fixture.detectChanges();
        const activitiProcessInstanceList = element.querySelector('adf-process-instance-list');
        expect(activitiProcessInstanceList).toBeDefined();
    });

    it('should define dw-process-instance-details', () => {
        component.currentProcessInstanceId = '12';
        fixture.detectChanges();
        const adfProcessInstanceDetails = element.querySelector('dw-process-instance-details');
        expect(adfProcessInstanceDetails).toBeDefined();
    });

    it('should define dw-process-full-form', () => {
        component.currentProcessInstanceId = '12';
        fixture.detectChanges();
        const dwProcessFullform = element.querySelector('dw-process-full-form');
        expect(dwProcessFullform).toBeDefined();
    });

    it('should define a dialog', () => {
        const dialog = fixture.debugElement.nativeElement.querySelector('.alf-am-task-modal');
        expect(dialog).toBeDefined();
    });

    it('should define process sidebar', () => {
        component.processInstanceDetails = fakeProcessInstance;
        component.showSidebar = true;
        fixture.detectChanges();
        const IconElement = fixture.debugElement.nativeElement.querySelector('#dw-processlist-sidebar-open-new-id');
        const sidebar = fixture.debugElement.nativeElement.querySelector('#dw-processlist-sidebar-id');
        expect(sidebar).toBeDefined();
        expect(IconElement.innerText).toBe('open_in_new');
    });

    it('should not show process sidebar if showSidebar is false', () => {
        component.processInstanceDetails = fakeProcessInstance;
        component.showSidebar = false;
        fixture.detectChanges();
        const IconElement = fixture.debugElement.nativeElement.querySelector('#dw-processlist-sidebar-open-new-id');
        const sidebar = fixture.debugElement.nativeElement.querySelector('#dw-processlist-sidebar-id');
        expect(sidebar).toBeNull();
        expect(IconElement).toBeNull();
    });
});
