/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LogService } from '@alfresco/adf-core';
import { SettingComponent } from '../setting/setting.component';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

describe('SettingComponent', () => {
    let fixture: ComponentFixture<SettingComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SettingComponent
            ],
            providers: [
                LogService
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SettingComponent);
    });

    it('should create instance of Setting Component', () => {
        expect(fixture.componentInstance instanceof SettingComponent).toBe(true, 'should setting component');
    });

});
