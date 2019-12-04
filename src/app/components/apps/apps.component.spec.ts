/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppsComponent } from './apps.component';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Router, NavigationEnd } from '@angular/router';
import { AppDefinitionRepresentationModel } from '@alfresco/adf-process-services';

import { AppConfigService } from '@alfresco/adf-core';

describe('AppsComponent', () => {
    let component: AppsComponent;
    let fixture: ComponentFixture<AppsComponent>;
    let router: Router;
    let appConfig: AppConfigService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppsComponent
                ],
            providers: [],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppsComponent);
        component = fixture.componentInstance;
        router = fixture.debugElement.injector.get(Router);
        appConfig = TestBed.get(AppConfigService);
        appConfig.config['landing-page'] = 'dashboard/default';
    });

    it('should create instance of AppsComponent', () => {
        expect(fixture.componentInstance instanceof AppsComponent).toBe(true, 'should AppsComponent');
    });

    it('should define adf-apps', () => {
        fixture.detectChanges();
        const adfAppsElement = fixture.debugElement.nativeElement.querySelector('adf-apps');
        expect(adfAppsElement).toBeDefined();
    });

    it('should route to dashboard on click of app', (done) => {
        const appId = 101;
        router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                expect(event.url).toBe('/' + 'apps' + '/' + appId + '/dashboard/default');
                done();
            }
        });
        component.ngOnInit();
        component.onAppSelection(new AppDefinitionRepresentationModel({id: 101, name: 'fake-name'}));
        fixture.detectChanges();
    });
});
