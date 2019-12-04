/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { of } from 'rxjs';

import { AppsProcessService } from '@alfresco/adf-core';
import { TaskFilterService, ProcessFilterService } from '@alfresco/adf-process-services';

import { BreadCrumbsComponent } from './breadcrumbs.component';
import {
    fakeApp1, defaultFakeProcessFilter,
    fakeProcessFilters, fakeTaskFilters } from '../../../test-mock';

describe('BreadCrumbsComponent', () => {
    let component: BreadCrumbsComponent;
    let fixture: ComponentFixture<BreadCrumbsComponent>;

    const ProcessFilterServiceStub = {
        getProcessFilterById() {
            return of(defaultFakeProcessFilter);
        },
        getProcessFilterByName() {
            return of(defaultFakeProcessFilter);
        },
        getProcessFilters() {
            return of(fakeProcessFilters.data);
        }
    };

    const TaskFilterServiceStub = {
        getTaskListFilters() {
            return of(fakeTaskFilters.data);
        }
    };

    const AppsProcessServiceStub = {
        getApplicationDetailsById() {
            return of(fakeApp1);
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                BreadCrumbsComponent
            ],
            providers: [
                        {
                            provide: AppsProcessService, useValue: AppsProcessServiceStub
                        },
                        {
                            provide: ProcessFilterService, useValue: ProcessFilterServiceStub
                        },
                        {
                            provide: TaskFilterService, useValue: TaskFilterServiceStub
                        },
                        {
                            provide: ActivatedRoute,
                            useValue: {
                                url: of([{path: 'processes'}, {path: 1001 }]),
                                params: of({processFilterId: '123'}),
                                parent: {params: of({appId: '321'})}
                            }
                        }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BreadCrumbsComponent);
        fixture.detectChanges();
        component = fixture.componentInstance;
    });

    it('should create instance of BreadCrumbsComponent', () => {
        expect(fixture.componentInstance instanceof BreadCrumbsComponent).toBe(true);
    });

    it('should set BreadCrumb', () => {
        component.currentMenu = 'processes';
        component.createBreadCrumbs();
        fixture.detectChanges();
        expect(component.crumbs[2]).not.toBeNull();
        expect(component.crumbs[2].getName()).toBe('DW-BREADCRUMBS.ENTRY-PROCESSES');
        expect(component.crumbs[2].getId()).toBe('processes');

        component.currentMenu = 'dashboard';
        component.createBreadCrumbs();
        fixture.detectChanges();
        expect(component.crumbs[2]).not.toBeNull();
        expect(component.crumbs[2].getName()).toBe('DW-BREADCRUMBS.ENTRY-DASHBOARD');
        expect(component.crumbs[2].getId()).toBe('dashboard');

        component.currentMenu = 'tasks';
        component.filterId = 'new';
        component.createBreadCrumbs();
        fixture.detectChanges();
        expect(component.crumbs[2]).not.toBeNull();
        expect(component.crumbs[3].getName()).toBe('DW-BREADCRUMBS.ENTRY-NEW-TASK');
        expect(component.crumbs[3].getId()).toBe('newtask');
    });
});
