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
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {

    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DashboardComponent
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                        useValue: {
                            parent: {params: of({appId: 123})}
                        }
                    }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create instance of DashboardComponent', () => {
        expect(fixture.componentInstance instanceof DashboardComponent).toBe(true);
    });

    it('should define apw-process-statistics', () => {
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
        component.appId = '1002';
        fixture.detectChanges();
        const apwProcessStatistics = fixture.debugElement.nativeElement.querySelector('apw-process-statistics');
        expect(apwProcessStatistics).toBeDefined();
        expect(apwProcessStatistics).not.toBeNull();
    });

    it('should define apw-dashboard-settings', () => {
        component.appId = '1002';
        fixture.detectChanges();
        const apwDashboardSettings = fixture.debugElement.nativeElement.querySelector('apw-dashboard-settings');
        expect(apwDashboardSettings).toBeDefined();
    });

    it('should define breadcrumb and adfToolbar', () => {
        fixture.detectChanges();
        const adfToolbar = fixture.debugElement.nativeElement.querySelector('adf-toolbar');
        const breadcrumb = fixture.debugElement.nativeElement.querySelector('apw-breadcrumbs');
        const breadcrumbActions = fixture.debugElement.nativeElement.querySelector('apw-breadcrumb-actions');
        expect(adfToolbar).toBeDefined();
        expect(breadcrumb).toBeDefined();
        expect(breadcrumbActions).toBeDefined();
    });
});
