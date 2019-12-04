/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { Component, OnInit } from '@angular/core';
import { PreviewService } from '../../services/preview.service';
import { Router } from '@angular/router';
import { ProcessContentService, ContentService, LogService, ContentLinkModel } from '@alfresco/adf-core';

@Component({
    templateUrl: 'blob-preview.component.html'
})
export class BlobPreviewComponent implements OnInit {
    content: ContentLinkModel;
    showViewer = true;

    constructor(
        private preview: PreviewService,
        private activitiContentService: ProcessContentService,
        private contentService: ContentService,
        private logService: LogService,
        private router: Router) { }

    ngOnInit() {
        const content = this.preview.getContent();
        if (content.contentBlob === null || content.name === null) {
            this.router.navigate([{ outlets: { overlay: null } }]);
            return;
        }

        this.content = content;
    }

    public downloadContent(): void {
        this.activitiContentService.getFileRawContent(this.content.id).subscribe(
            (blob: Blob) => this.contentService.downloadBlob(blob, this.content.name),
            (err) => {
                this.logService.error(err);
            }
        );
    }
}
