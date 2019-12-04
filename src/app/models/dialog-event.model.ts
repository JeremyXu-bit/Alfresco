/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

export class DialogEvent {

    static ACTION_NO = 'no';
    static ACTION_YES = 'yes';
    static ACTION_SAVE = 'save';
    static ACTION_DISCARD = 'discard';
    static ERROR = 'error';

    action: string;

    constructor(action: string) {
        this.action = action;
    }

    isYes(): boolean {
        return this.action === DialogEvent.ACTION_YES;
    }

    isNo(): boolean {
        return this.action === DialogEvent.ACTION_NO;
    }

    isError() {
        return this.action === DialogEvent.ERROR;
    }
}
