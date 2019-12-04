/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    templateUrl: './apps-container.component.html',
    styleUrls: ['./apps-container.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppsContainerComponent {
    displayMenu = false;
}
