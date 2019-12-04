/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'apw-user-profile-menu',
    templateUrl: './user-profile-menu.component.html',
    styleUrls: ['./user-profile-menu.component.scss']
})

export class UserProfileMenuComponent {

    @Output()
    onMenuClick: EventEmitter<any> = new EventEmitter<any>();

    constructor() {}

    menuClick(menuName: string) {
        this.onMenuClick.emit(menuName);
    }
}
