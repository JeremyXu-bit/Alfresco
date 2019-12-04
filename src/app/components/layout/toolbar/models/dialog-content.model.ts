/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */
export interface DialogAction {
    label: string;
    key: string;
    color?: string;
}

export interface DialogContentModel {

    title: string;
    subTitle?: string;
    actions: DialogAction [];
}
