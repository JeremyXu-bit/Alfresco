/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

export class BreadCrumb {
    constructor(private id: string, private name: string, private type?: string) {

    }

    getName(): string {
        return this.name;
    }

    getId(): string {
        return this.id;
    }

    getType(): string {
        return this.type;
    }

    setType(type: string) {
        this.type = type;
    }
}
