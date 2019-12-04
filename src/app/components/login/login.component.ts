/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { AppConfigService, LogService } from '@alfresco/adf-core';

@Component({
    selector: 'apw-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    @ViewChild('alfrescologin')
    alfrescologin: any;

    customValidation: any;

    customMinLength = 2;

    copyrightText = '\u00A9 2020 Alfresco Software, Inc. All Rights Reserved.';

    constructor(private router: Router,
        private logService: LogService,
        private appConfig: AppConfigService) {

            this.customValidation = {
            username: ['', Validators.compose([
                Validators.required,
                Validators.minLength(this.customMinLength)
            ])],
            password: ['', Validators.required]
        };
    }

    ngOnInit() {
        this.copyrightText = this.appConfig.get<string>('adf-login.copyrightText', this.copyrightText);
        this.alfrescologin.addCustomValidationError('username', 'required', 'LOGIN.MESSAGES.USERNAME-REQUIRED');
        this.alfrescologin.addCustomValidationError('username', 'minlength', 'LOGIN.MESSAGES.USERNAME-MIN',
               { minLength: this.customMinLength });
        this.alfrescologin.addCustomValidationError('password', 'required', 'LOGIN.MESSAGES.PASSWORD-REQUIRED');

    }

    onLogin($event) {
        this.router.navigate(['/']);
    }

    onError($event) {
        this.logService.error($event);
    }

    validateForm($event) {

    }

}
