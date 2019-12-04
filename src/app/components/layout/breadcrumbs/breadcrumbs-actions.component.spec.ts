/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { BreadCrumbsActionsComponent } from './breadcrumbs-actions.component';

describe('BreadCrumbsActionsComponent', () => {
    let component: BreadCrumbsActionsComponent;
    let fixture: ComponentFixture<BreadCrumbsActionsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                BreadCrumbsActionsComponent
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BreadCrumbsActionsComponent);
        fixture.detectChanges();
        component = fixture.componentInstance;
    });

    it('should create instance of BreadCrumbsActionComponent', () => {
        expect(fixture.componentInstance instanceof BreadCrumbsActionsComponent).toBe(true);
    });

    it('should emit infoClick on click of info icon', () => {
        fixture.detectChanges();
        const el = fixture.nativeElement.querySelector('mat-icon');
        const emitSpy = spyOn(component.infoClick, 'emit');
        el.click();
        expect(component.infoClick.emit).not.toBeNull();
        expect(emitSpy).toHaveBeenCalled();
    });
});
