/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { CUSTOM_ELEMENTS_SCHEMA, SimpleChange } from '@angular/core';
import { of } from 'rxjs';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AnalyticsService } from '@alfresco/adf-insights/';
import { AlfrescoApiService } from '@alfresco/adf-core';
import { ProcessStatisticsComponent } from './process-statistics.component';

describe('ProcessStatisticsComponent', () => {

    let component: ProcessStatisticsComponent;
    let fixture: ComponentFixture<ProcessStatisticsComponent>;
    let analyticsService: AnalyticsService;
    let getReportByNameSpy: jasmine.Spy;

    const reportQuery = [
        {
            dateRange: {
                startDate: '2016-11-03T15:25:42.749+0000',
                endDate: '2017-11-03T15:25:42.749+0000',
                rangeId: 2017
            },
            status: 'Active',
            processDefinitionId: 'processDefId:1029',
            slowProcessInstanceInteger: 10
        },
        {
            dateRange: {
                startDate: '2016-11-03T15:25:42.749+0000',
                endDate: '2017-11-03T15:25:42.749+0000',
                rangeId: 2017
            },
            status: 'Active',
            processDefinitionId: 'processDefId:1029',
            slowProcessInstanceInteger: 10
        }
    ];

    const fakeReportList = [
        {
            id: '1',
            name: 'Fake Report 1'
        },
        {
            id: '2',
            name: 'Fake Report 2'
        }
    ];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ProcessStatisticsComponent
            ],
            providers: [ AnalyticsService, AlfrescoApiService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProcessStatisticsComponent);
        component = fixture.componentInstance;
        analyticsService = TestBed.get(AnalyticsService);
        getReportByNameSpy = spyOn(analyticsService, 'getReportByName').and.returnValue(of(fakeReportList));
        spyOn(analyticsService, 'getReportsByParams').and.returnValue(of(fakeReportList));
        component.reportQuery = [
            {
                dateRange: {
                    startDate: '2016-11-03T15:25:42.749+0000',
                    endDate: '2017-11-03T15:25:42.749+0000',
                    rangeId: 2017
                },
                status: 'Active',
                processDefinitionId: 'processDefId:1029',
                slowProcessInstanceInteger: 10
            },
            {
                dateRange: {
                    startDate: '2016-11-03T15:25:42.749+0000',
                    endDate: '2017-11-03T15:25:42.749+0000',
                    rangeId: 2017
                },
                status: 'Active',
                processDefinitionId: 'processDefId:1029',
                slowProcessInstanceInteger: 10
            }
        ];
        fixture.detectChanges();
    });

    it('should create instance of ProcessStatisticsComponent', () => {
        expect(fixture.componentInstance instanceof ProcessStatisticsComponent).toBe(true);
    });

    it('should define adf-datatable ', () => {
        component.reportQuery = reportQuery;
        fixture.detectChanges();
        const adfDatatable = fixture.debugElement.nativeElement.querySelector('adf-datatable');
        expect(adfDatatable).toBeDefined();
    });

    it('should call service to fetch process definitions without appId', () => {
        component.reportQuery = reportQuery;
        const change = new SimpleChange(null, reportQuery, true);
        component.ngOnChanges({ 'reportQuery': change });
        fixture.detectChanges();
        expect(getReportByNameSpy).toHaveBeenCalled();
    });
});
