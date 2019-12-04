/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class UnauthorisedErrorHandler extends ErrorHandler {

static LOGIN_URL = '/#/login';

constructor() {
    super();
}

handleError(error) {
    super.handleError(error);

    if ( error.status === 401 ) {
        window.location.href = UnauthorisedErrorHandler.LOGIN_URL;
        }
    }
}
