/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */
export class ToolbarIconEvent {

    static ACTION_BACK_TYPE = 'BACK';
    static ACTION_CLOSE_TYPE = 'CLOSE';
    static ACTION_CANCEL_TYPE = 'CANCEL';
    static ACTION_INFO_TYPE = 'INFO';
    type: String;

    constructor(type: String) {
        this.type = type;
    }

    isInfoType() {
        return this.type === ToolbarIconEvent.ACTION_INFO_TYPE;
    }
    isCloseType() {
        return this.type === ToolbarIconEvent.ACTION_CLOSE_TYPE;
    }
    isCancelType() {
        return this.type === ToolbarIconEvent.ACTION_CANCEL_TYPE;
    }
    isBackType() {
        return this.type === ToolbarIconEvent.ACTION_BACK_TYPE;
    }
}
