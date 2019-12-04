/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import {
    Component,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    Input
} from '@angular/core';

export interface PackageInfo {
    name: string;
    version: string;
}

@Component({
    selector: 'apw-package-list',
    templateUrl: './package-list.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PackageListComponent {
    columns = [
        {
            columnDef: 'title',
            header: 'APP.ABOUT.PACKAGES.NAME',
            cell: (row: PackageInfo) => `${row.name}`
        },
        {
            columnDef: 'version',
            header: 'APP.ABOUT.PACKAGES.VERSION',
            cell: (row: PackageInfo) => `${row.version}`
        }
    ];

    displayedColumns = this.columns.map((x) => x.columnDef);

    @Input()
    data: Array<PackageInfo> = [];
}
