/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { Component, Input, Output, EventEmitter, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, LogService, AppConfigService } from '@alfresco/adf-core';
import { MediaQueryService } from '../../../services/media-query.service';

@Component({
    selector: 'apw-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class HeaderComponent implements OnInit {

    color = 'primary';
    title: string;
    logoPath: string;

    @Input()
    showMenu: boolean;

    @Output()
    expandMenu: EventEmitter<any> = new EventEmitter<any>();

    constructor(private authService: AuthenticationService,
                private logService: LogService,
                private router: Router,
                private media: MediaQueryService,
                private appConfig: AppConfigService) {
    }

    ngOnInit() {
        this.media.deviceType$.subscribe(device => this.setTitle(device));

        this.logoPath = this.appConfig.get<string>('path-logo', this.logoPath);
    }

    onUserMenuSelect(menuName: string): void {
        if (menuName === 'sign_out') {
            this.onLogout();
        }
    }

    onLogout(): void {
        this.authService.logout()
            .subscribe(
                () => {
                    localStorage.setItem('user_role', '');
                    this.navigateToLogin();
                },
                (error: any) => {
                    if (error && error.response && error.response.status === 401) {
                        this.navigateToLogin();
                    } else {
                        this.logService.error('An unknown error occurred while logging out', error);
                        this.navigateToLogin();
                    }
                }
            );
    }

    private navigateToLogin(): void {
        this.router.navigate(['/login']);
    }

    toggleMenu() {
        this.expandMenu.emit();
    }

    private setTitle(device: string): void {
            if (device === MediaQueryService.DESKTOP_DEVICE) {
                this.title = 'DW-HEADER.APPS-DESKTOP';
            } else if (device === MediaQueryService.TABLET_DEVICE) {
                this.title = 'DW-HEADER.APPS-TABLETS';
            } else if (device === MediaQueryService.MOBILE_DEVICE) {
                this.title = 'DW-HEADER.APPS-MOBILES';
            }
    }
}
