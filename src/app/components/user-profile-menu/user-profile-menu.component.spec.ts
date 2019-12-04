/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { UserProfileMenuComponent } from './user-profile-menu.component';

describe('UserProfileMenu', () => {
    let component: UserProfileMenuComponent;
    let fixture: ComponentFixture<UserProfileMenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                UserProfileMenuComponent
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserProfileMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create instance of UserProfileMenuComponent', () => {
        expect(component).toBeDefined();
        expect(fixture.componentInstance instanceof UserProfileMenuComponent).toBe(true, 'should create UserProfileMenuComponent');
    });

    it('should emit onMenuClick on click of profile menu', () => {
        const menuNameSpy = spyOn(component.onMenuClick, 'emit');
        const element = fixture.debugElement.nativeElement.querySelector('#dw-menu-button-id');
        fixture.detectChanges();
        component.menuClick('logout');
        expect(element).toBeDefined();
        expect(menuNameSpy).toHaveBeenCalledWith('logout');
    });
});
