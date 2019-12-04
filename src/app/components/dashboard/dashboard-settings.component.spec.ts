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
import { DashboardSettingsComponent } from './dashboard-settings.component';
import { AnalyticsService } from '@alfresco/adf-insights';
import { fakeprocessDefinitions } from '../../test-mock';

describe('DashboardSettingsComponent', () => {

    let component: DashboardSettingsComponent;
    let fixture: ComponentFixture<DashboardSettingsComponent>;
    let analyticsService: AnalyticsService;
    let getProcessDefinitionsSpy: jasmine.Spy;
    let getProcessDefinitionsNoAppSpy: jasmine.Spy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DashboardSettingsComponent
            ],
            providers: [ AnalyticsService ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardSettingsComponent);
        component = fixture.componentInstance;
        analyticsService = fixture.debugElement.injector.get(AnalyticsService);
        getProcessDefinitionsSpy = spyOn(analyticsService, 'getProcessDefinitionsValues')
                                    .and.returnValue(of(fakeprocessDefinitions));
        getProcessDefinitionsNoAppSpy = spyOn(analyticsService, 'getProcessDefinitionsValuesNoApp')
                                    .and.returnValue(of(fakeprocessDefinitions));
        fixture.detectChanges();
    });

    it('should create instance of DashboardSettingsComponent', () => {
        expect(fixture.componentInstance instanceof DashboardSettingsComponent).toBe(true);
    });

    it('should display dashboard setting title and subtitle', () => {
        fixture.detectChanges();
        const title = fixture.debugElement.nativeElement.querySelector('#dashboard-setting-title-id');
        const subtitle = fixture.debugElement.nativeElement.querySelector('#dashboard-setting-subtitle-id');
        expect(title).toBeDefined();
        expect(title.innerText).toBe('DASHBOARD-SETTINGS.TITLE');
        expect(subtitle.innerText).toBe('DASHBOARD-SETTINGS.SUBTITLE');
    });

    it('should display dashboard fromDate and toDate', () => {
        component.fromDate.toDate();
        component.toDate.toDate();
        fixture.detectChanges();
        const fromDate = fixture.debugElement.nativeElement.querySelector('#fromdate-id');
        const toDate = fixture.debugElement.nativeElement.querySelector('#fromdate-id');
        const dateLable = fixture.debugElement.nativeElement.querySelector('#fromdate-lable-id');
        expect(fromDate).toBeDefined();
        expect(toDate).toBeDefined();
        expect(dateLable.innerText).toBe('DASHBOARD-SETTINGS.START-DATE');
    });

    it('should call service to fetch process definitions with appId', () => {
        component.appId = 1002;
        component.ngOnInit();
        expect(getProcessDefinitionsSpy).toHaveBeenCalled();
    });

    it('should call service to fetch process definitions without appId', () => {
        component.appId = null;
        component.ngOnInit();
        expect(getProcessDefinitionsNoAppSpy).toHaveBeenCalled();
    });

    it('should display the app definitions and status', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const selectElement = fixture.nativeElement.querySelector('mat-select > .mat-select-trigger');
            const optionElement = fixture.nativeElement.querySelectorAll('mat-option');
            selectElement.click();
            expect(selectElement).not.toBeNull();
            expect(selectElement).toBeDefined();
            expect(optionElement).not.toBeNull();
            expect(optionElement).toBeDefined();
        });
    }));

    it('should define the process definitions select label', () => {
        fixture.detectChanges();
        const selectProcessDefLabel = fixture.nativeElement.querySelector('.dw-dashboard-label');
        expect(selectProcessDefLabel).not.toBeNull();
        expect(selectProcessDefLabel.innerText).toBe('DASHBOARD-SETTINGS.PROCESS-DEFINITION');
    });
});
