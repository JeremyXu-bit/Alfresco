/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { Injectable, } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ApplicationContentStateService {

    private processListSubject = new Subject<boolean>();
    private taskListSubject = new Subject<boolean>();
    processContent$: Observable<boolean>;
    taskContent$: Observable<boolean>;

    constructor() {
        this.processContent$ = this.processListSubject.asObservable();
        this.taskContent$ = this.taskListSubject.asObservable();
    }

    set hasProcessContent(value: boolean) {
        this.processListSubject.next(value);
    }

    set hasTaskContent(value: boolean) {
        this.taskListSubject.next(value);
    }
}
