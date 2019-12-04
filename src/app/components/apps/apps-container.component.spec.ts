/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AppsContainerComponent } from './apps-container.component';

describe('AppsContainerComponent', () => {
    let fixture: ComponentFixture<AppsContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppsContainerComponent
                ],
            providers: [],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppsContainerComponent);
        fixture.detectChanges();
    });

    it('should create instance of AppsContainerComponent', () => {
        expect(fixture.componentInstance instanceof AppsContainerComponent).toBe(true, 'should AppsContainerComponent');
    });

    it('should define adf-layout-header', () => {
        fixture.detectChanges();
        const element = fixture.debugElement.nativeElement.querySelector('adf-layout-header');
        expect(element).toBeDefined();
    });

    it('should not display menu button if displayMenu is false', () => {
        fixture.detectChanges();
        const element = fixture.debugElement.nativeElement.querySelector('.mat-button-wrapper');
        expect(element).toBeFalsy();
    });
});
