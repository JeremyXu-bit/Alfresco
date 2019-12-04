/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, Subject } from 'rxjs';

import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ProcessToolbarComponent } from './process-toolbar.component';
import { ProcessService, ProcessAuditDirective } from '@alfresco/adf-process-services';
import { MatDialog } from '@angular/material';

import { ToolbarIconEvent } from './models/toolbar-icon-event';
import { mockPdfData } from '../../../test-mock';
import { DialogEvent } from '../../../models';

class DialogStub {
    afterClosedSubject = new Subject();
    componentInstance = {};
    open() { return this; }
    afterClosed() {
        return this.afterClosedSubject.asObservable();
    }
}

describe('ProcessToolbarComponent', () => {

    let component: ProcessToolbarComponent;
    let fixture: ComponentFixture<ProcessToolbarComponent>;
    let processService: ProcessService;
    const dialogStub = new DialogStub();

    function createFakePdfBlob(): Blob {
        const pdfData = mockPdfData;
        return new Blob([pdfData], { type: 'application/pdf' });
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ProcessToolbarComponent,
                ProcessAuditDirective
            ],
            providers: [ProcessService, { provide: MatDialog, useValue: dialogStub }],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProcessToolbarComponent);
        component = fixture.componentInstance;
        processService = TestBed.get(ProcessService);
        fixture.detectChanges();
    });

    it('should create instance of ProcessToolbarComponent', () => {
        expect(fixture.componentInstance instanceof ProcessToolbarComponent).toBe(true);
    });

    it('should emit iconClick on click of back button', () => {
        const onbackEmitSpy = spyOn(component.iconClick, 'emit');
        const backButton = fixture.debugElement.nativeElement.querySelector('#backButton');
        backButton.click();
        expect(onbackEmitSpy).toBeDefined();
        expect(onbackEmitSpy).toHaveBeenCalled();
    });

    it('should display process name', () => {
        component.name = '';
        component.appName = 'fakeAppName';
        fixture.detectChanges();
        const element = fixture.debugElement.nativeElement.querySelector('#app-name');
        expect(element).toBeDefined();
        expect(element.innerText).toBe('in fakeAppName');
    });

    it('should define a adftoolbar', () => {
        const adfToolbar = fixture.debugElement.nativeElement.querySelector('adf-toolbar');
        const adfTaskDetails = fixture.debugElement.nativeElement.querySelector('adf-toolbar-title');
        expect(adfTaskDetails).toBeDefined();
        expect(adfToolbar).toBeDefined();
    });

    it('should cancel process on click of cancel icon and user confirms yes', () => {
        const cancleClickSpy = spyOn(component.iconClick, 'emit');
        const element = fixture.debugElement.nativeElement.querySelector('#process-cancel-button');
        element.click();
        dialogStub.afterClosedSubject.next({action : DialogEvent.ACTION_YES});
        expect(cancleClickSpy).toHaveBeenCalledWith(new ToolbarIconEvent(ToolbarIconEvent.ACTION_CANCEL_TYPE));
    });

    it('should not cancel process on click of cancel icon and user confirms no', () => {
        const cancleClickSpy = spyOn(component.iconClick, 'emit');
        const element = fixture.debugElement.nativeElement.querySelector('#process-cancel-button');
        element.click();
        dialogStub.afterClosedSubject.next({action : DialogEvent.ACTION_NO});
        expect(cancleClickSpy).not.toHaveBeenCalled();
    });

    it('should disable cancel icon when disableButton input is true', () => {
        component.disableButton = true;
        fixture.detectChanges();
        const element = fixture.debugElement.nativeElement.querySelector('#process-cancel-button');
        expect(element.disabled).toBe(true);
    });

    it('should enable cancel icon by default', () => {
        const element = fixture.debugElement.nativeElement.querySelector('#process-cancel-button');
        expect(element.disabled).toBe(false);
    });

    describe('On ProcessAudit', () => {

        beforeEach(async(() => {
            component.name = 'fake-name';
            component.id = 'process:fake-id';
            component.fileName = 'fake-name';
            component.selectedAction = 'info';
        }));

        it('should display the process name and app name on detail-page', () => {
            component.appName = 'fakeAppName';
            fixture.detectChanges();
            let element = fixture.nativeElement.querySelector('#process-name');
            expect(element).toBeDefined();
            expect(element.innerText).toBe('fake-name');
            element = fixture.nativeElement.querySelector('#app-name');
            expect(element).toBeDefined();
            expect(element.innerText).toBe('in fakeAppName');
        });

        it('should download Process audit on click of ProcessAudit Button', async(() => {
            component.auditDownload = true;
            const blob = createFakePdfBlob();
            spyOn(processService, 'fetchProcessAuditPdfById').and.returnValue(of(blob));
            const onAuditClickSpy = spyOn(component.clicked, 'emit');
            fixture.detectChanges();
            const button = fixture.nativeElement.querySelector('#processauditButton');
            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(onAuditClickSpy).toHaveBeenCalled();
            });
            button.click();
        }));
    });
});
