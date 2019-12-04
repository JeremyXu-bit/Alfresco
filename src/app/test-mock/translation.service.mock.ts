/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { Observable, of } from 'rxjs';
import { EventEmitter } from '@angular/core';

export interface LangChangeEvent {
    lang: string;
    translations: any;
}

export class TranslationMock {

    public onLangChange: EventEmitter<LangChangeEvent> = new EventEmitter<LangChangeEvent>();

    addTranslationFolder() {

    }

    public get(key: string|Array<string>, interpolateParams?: Object): Observable<string|any> {
        return of(key);
    }
}
