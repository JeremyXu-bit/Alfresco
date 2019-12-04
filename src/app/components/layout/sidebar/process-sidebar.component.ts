/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { Component, Input, OnInit, Output, EventEmitter, HostBinding, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MediaQueryService } from '../../../services/media-query.service';
import { FormRenderingService, CardViewTextItemModel, CardViewUpdateService, TranslationService } from '@alfresco/adf-core';
import { ProcessInstance, AttachFileWidgetComponent, AttachFolderWidgetComponent } from '@alfresco/adf-process-services';

@Component({
    selector: 'apw-process-sidebar',
    templateUrl: './process-sidebar.component.html',
    styleUrls: ['./process-sidebar.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ProcessSidebarComponent implements OnInit {

    @HostBinding('class.dw-process-sidebar') true;

    @Input()
    selectedTab: number;

    @Input()
    processInstanceDetails: ProcessInstance;

    @Output()
    currentTab: EventEmitter<number> = new EventEmitter<number>();

    showInfoDrawer = false;
    startFormDesc: string;

    @ViewChild('startDialog')
    startDialog: any;

    mobile = false;

    constructor(
        private dialog: MatDialog,
        private formRenderingService: FormRenderingService,
        private cardViewUpdateService: CardViewUpdateService,
        private mediaQuery: MediaQueryService,
        private translate: TranslationService) {
        this.formRenderingService.setComponentTypeResolver('upload', () => AttachFileWidgetComponent, true);
        this.formRenderingService.setComponentTypeResolver('select-folder', () => AttachFolderWidgetComponent, true);
    }

    ngOnInit() {
        this.mediaQuery.mobile$.subscribe( (isMobile) => {
            this.mobile = isMobile;
        });
        this.cardViewUpdateService.itemClicked$.subscribe(this.showFormDialog.bind(this));
        this.startFormDesc = this.translate.instant('ADF_PROCESS_LIST.DETAILS.LABELS.START_FORM');
    }

    onCurrentTab(tabIndex: number): void {
        this.currentTab.emit(tabIndex);
    }

    isCompletedProcess(): boolean {
        return !!this.processInstanceDetails.ended;
    }

    isRunning(): boolean {
        return !this.isCompletedProcess();
    }

    hasStartForm(): boolean {
        return this.processInstanceDetails && this.processInstanceDetails.startFormDefined;
    }

    onFormContentClick(): void {
        this.closeFormDialog();
    }

    showFormDialog(): void {
        const dialogSize =  this.mobile ? { width: '100%' } : { minHeight: '500px', minWidth: '500px' };
        this.dialog.open(this.startDialog, dialogSize);
    }

    closeFormDialog(): void {
        this.dialog.closeAll();
    }

    getFormProperties(): [CardViewTextItemModel] {
        return [new CardViewTextItemModel({
            label: this.startFormDesc,
            value: this.startFormDesc,
            key: '',
            clickable: this.hasStartForm()})];
    }

}
