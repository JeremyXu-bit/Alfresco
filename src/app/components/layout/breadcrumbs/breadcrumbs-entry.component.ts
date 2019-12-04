/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BreadCrumb } from './breadcrumb.model';

@Component({
    selector: 'apw-dashboard-breadcrumbs-entry',
    templateUrl: './breadcrumbs-entry.component.html',
    styleUrls: ['./breadcrumbs-entry.component.scss']
})

export class BreadCrumbsEntryComponent {

    @Input()
    crumbs: BreadCrumb[];

    @Output()
    onCrumbSelection: EventEmitter<BreadCrumb> = new EventEmitter<BreadCrumb>();

    constructor() {

    }

    moveToCrumb(crumb: BreadCrumb, last: boolean): void {
        if (!last) {
            this.onCrumbSelection.emit(crumb);
        }
    }
}
