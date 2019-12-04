/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { SidenavLayoutComponent } from '@alfresco/adf-core';

@Component({
    selector: 'apw-app-container',
    templateUrl: './app-container.component.html',
    styleUrls: ['./app-container.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppContainerComponent {

    @ViewChild('adfsidenavlayout')
    adfsidenavComponent: SidenavLayoutComponent;
    displayMenu = true;

    minimizeSidenav() {
        if (!this.adfsidenavComponent.isMenuMinimized) {
            this.adfsidenavComponent.toggleMenu();
        }
    }

    diplaySidenav() {
        this.adfsidenavComponent.toggleMenu();
    }
}
