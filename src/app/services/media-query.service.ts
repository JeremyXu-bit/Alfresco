/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { Injectable, } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { BehaviorSubject, Observable } from 'rxjs';

import * as _ from 'lodash';

@Injectable()
export class MediaQueryService {

    static DESKTOP_DEVICE = 'desktop';
    static TABLET_DEVICE = 'tablet';
    static MOBILE_DEVICE = 'mobile';

    private mediaQuerySubject: BehaviorSubject<string> ;
    mediaQuery$: Observable<string>;

    private desktopSubject: BehaviorSubject<boolean> ;
    desktop$: Observable<boolean>;

    private tabletSubject: BehaviorSubject<boolean> ;
    tablet$: Observable<boolean>;

    private mobileSubject: BehaviorSubject<boolean> ;
    mobile$: Observable<boolean>;

    private deviceTypeSubject: BehaviorSubject<string> ;
    deviceType$: Observable<string>;


    private desktopBreakPoints = ['lg', 'xl'];
    private tabletBreakPoints = ['sm', 'md'];
    private mobileBreakPoints = ['xs'];

    private setDevice() {
        this.mediaQuery$.subscribe( (media) => {
            const isDesktop = this.isDesktopBreakPoint(media);
            const isTablet = this.isTabletBreakPoint(media);
            const isMobile = this.isMobileBreakPoint(media);

            if (isDesktop || isTablet || isMobile) {
                this.desktopSubject.next(isDesktop);
                this.tabletSubject.next(isTablet);
                this.mobileSubject.next(isMobile);

                const deviceType = isDesktop ? MediaQueryService.DESKTOP_DEVICE : isTablet ? MediaQueryService.TABLET_DEVICE : MediaQueryService.MOBILE_DEVICE;
                this.deviceTypeSubject.next(deviceType);
            }
        });
    }

    isDesktopBreakPoint(alias): boolean {
        return _.includes(this.desktopBreakPoints, alias);
    }

    isTabletBreakPoint(alias): boolean {
        return _.includes(this.tabletBreakPoints, alias);
    }

    isMobileBreakPoint(alias): boolean {
        return _.includes(this.mobileBreakPoints, alias);
    }

    constructor( private media: MediaObserver) {
        this.mediaQuerySubject = new BehaviorSubject('xl');
        this.mediaQuery$ = this.mediaQuerySubject.asObservable();

        this.desktopSubject = new BehaviorSubject(true);
        this.desktop$ = this.desktopSubject.asObservable();
        this.tabletSubject = new BehaviorSubject(false);
        this.tablet$ = this.tabletSubject.asObservable();
        this.mobileSubject = new BehaviorSubject(false);
        this.mobile$ = this.mobileSubject.asObservable();

        this.deviceTypeSubject = new BehaviorSubject(MediaQueryService.DESKTOP_DEVICE);
        this.deviceType$ = this.deviceTypeSubject.asObservable();

        this.media.media$.subscribe((change: MediaChange) => {
            this.mediaQuerySubject.next(change.mqAlias);
        });

        this.setDevice();
    }
}
