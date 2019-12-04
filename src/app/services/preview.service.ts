/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ContentLinkModel } from '@alfresco/adf-core';

@Injectable()
export class PreviewService {

    private  content: ContentLinkModel = null;

    constructor(private router: Router) {}

    showBlob(content: ContentLinkModel): void {
        this.content = content;
        this.router.navigate([{ outlets: { overlay: ['preview', 'blob'] } }]);
    }

    getContent(): ContentLinkModel {
        return this.content;
    }
}
