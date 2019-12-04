/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation } from '@angular/core';
import { LogService } from '@alfresco/adf-core';
import { MediaQueryService } from '../../../services/media-query.service';

@Component({
    selector: 'apw-task-toolbar',
    templateUrl: './task-toolbar.component.html',
    styleUrls: ['./task-toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TaskToolbarComponent implements OnInit {

    static ACTION_INFO = 'Info';

    @Input()
    selectedAction: string;

    @Input()
    appName: string;

    @Input()
    id: string;

    @Input()
    name: string;

    @Input()
    fileName: string;

    @Output()
    clicked: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    onBackClick: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    onCloseClick: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    infoClick: EventEmitter<void> = new EventEmitter<void>();

    auditDownload = true;

    mobile = false;

    constructor(private logService: LogService,
                private mediaQuery: MediaQueryService) {

    }

    ngOnInit() {
        this.mediaQuery.mobile$.subscribe( (isMobile) => {
            this.mobile = isMobile;
        });
    }

    onBackButtonClick(): void {
        this.onBackClick.emit();
    }

    onCloseIconClick(): void {
        this.onCloseClick.emit();
    }

    onInfoClick(): void {
        if (this.isInfoActionSelected()) {
            this.selectedAction = '';
        } else {
            this.selectedAction = TaskToolbarComponent.ACTION_INFO;
        }
        this.infoClick.emit();
    }

    onAuditError(event: any): void {
        this.logService.error(event);
    }

    onAuditClick(event: any): void {
        this.clicked.emit(event);
    }

    isInfoActionSelected(): boolean {
        return this.selectedAction && this.selectedAction.toLocaleUpperCase() === TaskToolbarComponent.ACTION_INFO.toLocaleUpperCase();
    }

    displayAppName(): string {
        return ' in ' + this.appName;
    }
}
