/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AppContainerComponent } from './app-container.component';

describe('AppContainerComponent', () => {
    let fixture: ComponentFixture<AppContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppContainerComponent
                ],
            providers: [
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppContainerComponent);
        fixture.detectChanges();
    });

    it('should create instance of AppContainerComponent', () => {
        expect(fixture.componentInstance instanceof AppContainerComponent).toBe(true, 'should AppContainerComponent');
    });

    it('should define adf-layout-header', () => {
        fixture.detectChanges();
        const element = fixture.debugElement.nativeElement.querySelector('adf-layout-header');
        expect(element).toBeDefined();
    });

    it('should display menu button if displayMenu is true', () => {
        fixture.detectChanges();
        const element = fixture.debugElement.nativeElement.querySelector('.mat-button-wrapper');
        expect(element).toBeDefined();
    });

    it('should define apw-side-menu', () => {
        fixture.detectChanges();
        const element = fixture.debugElement.nativeElement.querySelector('apw-side-menu');
        expect(element).toBeDefined();
    });
});
