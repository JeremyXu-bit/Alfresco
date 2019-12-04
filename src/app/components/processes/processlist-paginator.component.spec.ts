/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { AppConfigService, UserPreferencesService } from '@alfresco/adf-core';
import { ProcessInstanceListComponent, ProcessService } from '@alfresco/adf-process-services';
import { ProcessListPaginatorComponent } from './processlist-paginator.component';
import { defaultFakeProcessFilter, fakeProcessInstances } from '../../test-mock';
import { ApplicationContentStateService } from '../../services/application-content-state.service';
import { FullNamePipe } from '../../pipes';

describe('ProcessListPaginatorComponent', () => {
    let component: ProcessListPaginatorComponent;
    let fixture: ComponentFixture<ProcessListPaginatorComponent>;
    let appConfig: AppConfigService;
    let service: ProcessService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ProcessListPaginatorComponent,
                ProcessInstanceListComponent,
                FullNamePipe
            ],
            providers: [UserPreferencesService, ProcessService, ApplicationContentStateService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProcessListPaginatorComponent);
        component = fixture.componentInstance;
        appConfig = TestBed.get(AppConfigService);
        service = fixture.debugElement.injector.get(ProcessService);
        appConfig.config = Object.assign(appConfig.config, {
            'adf-process-list': {
                'presets': {
                    'running': [
                        {
                            'key': 'name',
                            'type': 'text',
                            'title': 'ADF_PROCESS_LIST.PROPERTIES.NAME',
                            'cssClass': 'dw-dt-col-4 ellipsis-cell',
                            'sortable': true
                        }
                    ]
                }
            }
        });
        spyOn(service, 'getProcessInstances').and.returnValue(of(fakeProcessInstances));
        component.currentFilter = defaultFakeProcessFilter;
        fixture.detectChanges();
    });

    it('should create instance of ProcessListPaginatorComponent', () => {
        expect(fixture.componentInstance instanceof ProcessListPaginatorComponent).toBe(true, 'should create ProcessPaginatorComponent');
    });

    it('should define an adfProcessInstancelist and adf-pagination', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const adfProcessList = fixture.debugElement.nativeElement.querySelector('#apw-process-list-id');
            const adfPagination = fixture.debugElement.nativeElement.querySelector('.adf-pagination');
            expect(adfPagination).toBeDefined();
            expect(adfProcessList).toBeDefined();
        });
    }));

    it('should display processInstances on processList', () => {
        fixture.detectChanges();
        const value1 = fixture.debugElement.query(By.css(`[data-automation-id="text_Process 382927392"`));
        const value2 = fixture.debugElement.query(By.css(`[data-automation-id="text_Process 773443333"]`));
        expect(value1).not.toBeNull();
        expect(value1.nativeElement.innerText.trim()).toBe('Process 382927392');
        expect(value2.nativeElement.innerText.trim()).toBe('Process 773443333');
    });

    it('should display processList coloumns', () => {
        fixture.detectChanges();
        const StartedElement = fixture.debugElement.query(By.css(`[data-automation-id="auto_id_startedBy"`));
        const NameElement = fixture.debugElement.query(By.css(`[data-automation-id="auto_id_name"]`));
        expect(StartedElement).not.toBeNull();
        expect(NameElement).not.toBeNull();
        expect(StartedElement.nativeElement.innerText.trim()).toBe('ADF_PROCESS_LIST.PROPERTIES.CREATED_BY');
        expect(NameElement.nativeElement.innerText.trim()).toBe('ADF_PROCESS_LIST.PROPERTIES.NAME');
    });

});
