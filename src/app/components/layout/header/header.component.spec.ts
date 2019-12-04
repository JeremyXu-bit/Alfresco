/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BREAKPOINTS, LAYOUT_CONFIG, LayoutConfigOptions } from '@angular/flex-layout';

import { HeaderComponent } from './header.component';
import { AuthenticationService, LogService, BpmUserService } from '@alfresco/adf-core';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

let authService: AuthenticationService;
let userBpmService: BpmUserService;

  const DESKTOP_BREAKPOINTS = [
    {
        alias: 'xs',
        suffix: 'Xs',
        mediaQuery: '(min-width: 0px) and (max-width: 599px)'
    },
    {
        alias: 'gt-xs',
        suffix: 'GtXs',
        mediaQuery: '(min-width: 600px)'
    },
    {
        alias: 'lg',
        mediaQuery: '(min-width: 700px)',
        overlap: true
    }];

    const TABLET_BREAKPOINTS = [
        {
            alias: 'xs',
            suffix: 'Xs',
            mediaQuery: '(min-width: 0px) and (max-width: 599px)'
        },
        {
            alias: 'gt-xs',
            suffix: 'GtXs',
            mediaQuery: '(min-width: 600px)'
        },
        {
            alias: 'md',
            mediaQuery: '(min-width: 700px)',
            overlap: true
        }];

    const MOBILE_BREAKPOINTS = [
        {
            alias: 'xs',
            suffix: 'Xs',
            mediaQuery: '(min-width: 0px) and (max-width: 1299px)'
        },
        {
            alias: 'gt-xs',
            suffix: 'GtXs',
            mediaQuery: '(min-width: 1300px)'
        },
        {
            alias: 'lg',
            mediaQuery: '(min-width: 1400px)',
            overlap: true
        }];

  const APW_CONFIG: LayoutConfigOptions = {
    addFlexToParent: true,
    addOrientationBps: false,
    disableDefaultBps: true,
    disableVendorPrefixes: false,
    serverLoaded: false,
    useColumnBasisZero: true,
  };

describe('HeaderComponent on Desktop', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                HeaderComponent,
            ],
            providers: [
                AuthenticationService, LogService,
                { provide: LAYOUT_CONFIG, useValue: APW_CONFIG },
                { provide: BREAKPOINTS, useValue: DESKTOP_BREAKPOINTS }],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        authService = fixture.debugElement.injector.get(AuthenticationService);
        spyOn(authService, 'isEcmLoggedIn').and.returnValue(false);
        spyOn(authService, 'isBpmLoggedIn').and.returnValue(true);
        spyOn(authService, 'isLoggedIn').and.returnValue(true);
        spyOn(authService, 'isOauth').and.returnValue(false);
        userBpmService = fixture.debugElement.injector.get(BpmUserService);
        spyOn(userBpmService, 'getCurrentUserInfo').and.returnValue(of({id: 1001}));
        spyOn(userBpmService, 'getCurrentUserProfileImage').and.returnValue('./fake.png');
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create instance of HeaderComponent', () => {
        expect(component).toBeDefined();
        expect(fixture.componentInstance instanceof HeaderComponent).toBe(true, 'should create HeaderComponent');
    });

    it('should display desktop title', () => {
        fixture.detectChanges();

        const title = fixture.debugElement.nativeElement.querySelector('.adf-app-title');
        expect(title.innerText).toBe('DW-HEADER.APPS-DESKTOP');
        const mobileTitle = fixture.debugElement.nativeElement.querySelector('#mobile-title');
        expect(mobileTitle.style.display).toBe('none');
    });

    it('should define userInfo and userProfileMenu', () => {
        fixture.detectChanges();
        const adfUserinfo = fixture.debugElement.nativeElement.querySelector('adf-userinfo');
        const apwUserProfileMenu = fixture.debugElement.nativeElement.querySelector('apw-user-profile-menu');
        expect(adfUserinfo.style.display).not.toBe('none');
        expect(apwUserProfileMenu).toBeDefined();
    });
});

describe('HeaderComponent on Tablet', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                HeaderComponent,
            ],
            providers: [
                AuthenticationService, LogService,
                { provide: LAYOUT_CONFIG, useValue: APW_CONFIG },
                { provide: BREAKPOINTS, useValue: TABLET_BREAKPOINTS }],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        authService = fixture.debugElement.injector.get(AuthenticationService);
        spyOn(authService, 'isEcmLoggedIn').and.returnValue(false);
        spyOn(authService, 'isBpmLoggedIn').and.returnValue(true);
        spyOn(authService, 'isLoggedIn').and.returnValue(true);
        spyOn(authService, 'isOauth').and.returnValue(false);
        userBpmService = fixture.debugElement.injector.get(BpmUserService);
        spyOn(userBpmService, 'getCurrentUserInfo').and.returnValue(of({id: 1001}));
        spyOn(userBpmService, 'getCurrentUserProfileImage').and.returnValue('./fake.png');
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create instance of HeaderComponent', () => {
        expect(component).toBeDefined();
        expect(fixture.componentInstance instanceof HeaderComponent).toBe(true, 'should create HeaderComponent');
    });

    xit('should display tablet title', () => {
        fixture.detectChanges();

        const title = fixture.debugElement.nativeElement.querySelector('.adf-app-title');
        expect(title.innerText).toBe('DW-HEADER.APPS-TABLETS');
        const mobileTitle = fixture.debugElement.nativeElement.querySelector('#mobile-title');
        expect(mobileTitle.style.display).toBe('none');
    });

    it('should define userInfo and userProfileMenu', () => {
        fixture.detectChanges();
        const adfUserinfo = fixture.debugElement.nativeElement.querySelector('adf-userinfo');
        const apwUserProfileMenu = fixture.debugElement.nativeElement.querySelector('apw-user-profile-menu');
        expect(adfUserinfo.style.display).not.toBe('none');
        expect(apwUserProfileMenu).toBeDefined();
    });
});


describe('HeaderComponent on Mobile', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                HeaderComponent,
            ],
            providers: [
                AuthenticationService, LogService,
                { provide: LAYOUT_CONFIG, useValue: APW_CONFIG },
                { provide: BREAKPOINTS, useValue: MOBILE_BREAKPOINTS }],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        authService = fixture.debugElement.injector.get(AuthenticationService);
        spyOn(authService, 'isEcmLoggedIn').and.returnValue(false);
        spyOn(authService, 'isBpmLoggedIn').and.returnValue(true);
        spyOn(authService, 'isLoggedIn').and.returnValue(true);
        spyOn(authService, 'isOauth').and.returnValue(false);
        userBpmService = fixture.debugElement.injector.get(BpmUserService);
        spyOn(userBpmService, 'getCurrentUserInfo').and.returnValue(of({id: 1001}));
        spyOn(userBpmService, 'getCurrentUserProfileImage').and.returnValue('./fake.png');
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create instance of HeaderComponent', () => {
        expect(component).toBeDefined();
        expect(fixture.componentInstance instanceof HeaderComponent).toBe(true, 'should create HeaderComponent');
    });

    xit('should display mobile title', () => {
        fixture.detectChanges();
        const mobileTitle = fixture.debugElement.nativeElement.querySelector('#mobile-title');
        expect(mobileTitle.innerText).toBe('DW-HEADER.APPS-MOBILES');
        expect(mobileTitle.style.display).not.toBe('none');
    });

    it('should hide userInfo', () => {
        fixture.detectChanges();
        const adfUserinfo = fixture.debugElement.nativeElement.querySelector('adf-userinfo');
        expect(adfUserinfo.style.display).toBe('none');
    });

    it('should define userProfileMenu', () => {
        fixture.detectChanges();
        const apwUserProfileMenu = fixture.debugElement.nativeElement.querySelector('apw-user-profile-menu');
        expect(apwUserProfileMenu).toBeDefined();
    });
});
