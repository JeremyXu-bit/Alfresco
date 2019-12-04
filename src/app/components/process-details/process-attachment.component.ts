/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { Component, Input, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { ProcessInstance, ProcessAttachmentListComponent, ProcessUploadService } from '@alfresco/adf-process-services';
import { UploadService,
         AlfrescoApiService,
         AppConfigService
        } from '@alfresco/adf-core';

import { MediaQueryService } from '../../services/media-query.service';
import { PreviewService } from '../../services/preview.service';

export function processUploadServiceFactory(api: AlfrescoApiService, config: AppConfigService) {
    return new ProcessUploadService(api, config);
}

@Component({
    selector: 'apw-process-attachment',
    templateUrl: './process-attachment.component.html',
    styleUrls: ['./process-attachment.component.scss'],
    providers: [
        {
        provide: UploadService,
        useFactory: (processUploadServiceFactory),
        deps: [AlfrescoApiService, AppConfigService]
        }
    ],
    encapsulation: ViewEncapsulation.None
})

export class ProcessAttachmentComponent implements OnInit {

    @ViewChild('processAttachmentList')
    processAttachList: ProcessAttachmentListComponent;

    @Input()
    appId: number;

    @Input()
    processInstanceDetails: ProcessInstance;

    @Input()
    emptyListImageUrl = './resources/images/empty_doc_lib.svg';

    mobile = false;
    showViewer = false;

    constructor(
        private uploadService: UploadService,
        private mediaQuery: MediaQueryService,
        private preview: PreviewService) { }

    ngOnInit() {
        this.uploadService.fileUploadComplete.subscribe(value => this.onUploadSuccess());
        this.mediaQuery.mobile$.subscribe( (isMobile) => {
            this.mobile = isMobile;
        });
    }

    isCompletedProcess(): boolean {
        return !!this.processInstanceDetails.ended;
    }

    onAttachmentClick(attachmentDetails: any): void {
        this.showAttachmentPreview(attachmentDetails);
    }

    private showAttachmentPreview(attachmentDetails: any) {
        if (attachmentDetails.contentBlob) {
            this.preview.showBlob(attachmentDetails);
        }
    }

    onSingleClick(event: any): void {
        if (this.mobile) {
            this.processAttachList.emitDocumentContent(event.detail.value.obj);
        }
    }

    showCreateAttachButton(): boolean {
        return !this.isCompletedProcess();
    }

    onUploadSuccess() {
        this.processAttachList.reload();
    }
}
