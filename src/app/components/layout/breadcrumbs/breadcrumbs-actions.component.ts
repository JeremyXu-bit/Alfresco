/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { MediaQueryService } from '../../../services/media-query.service';

@Component({
    selector: 'apw-breadcrumb-actions',
    templateUrl: './breadcrumbs-actions.component.html',
    styleUrls: ['./breadcrumbs-actions.component.scss']
})
export class BreadCrumbsActionsComponent implements OnInit {

    static ACTION_INFO = 'Info';

    mobile = false;

    @Input()
    selectedAction: string;

    @Output()
    infoClick: EventEmitter<any> = new EventEmitter<any>();

    constructor(private mediaQuery: MediaQueryService) { }

    ngOnInit() {
        this.mediaQuery.mobile$.subscribe( (isMobile) => {
            this.mobile = isMobile;
        });
    }

    onInfoClick(): void {
        this.infoClick.emit();
    }

    isInfoActionSelected(): boolean {
        return this.selectedAction === BreadCrumbsActionsComponent.ACTION_INFO ? true : false;
    }
}
