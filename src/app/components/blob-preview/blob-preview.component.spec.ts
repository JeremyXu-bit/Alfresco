/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { of } from 'rxjs';
import { BlobPreviewComponent } from './blob-preview.component';
import { PreviewService } from '../../services/preview.service';
import { ProcessContentService, ContentService, ContentLinkModel } from '@alfresco/adf-core';
import { RouterTestingModule } from '@angular/router/testing';
import { mockPdfData } from '../../test-mock';

describe('BlobPreviewComponent', () => {

    let component: BlobPreviewComponent;
    let fixture: ComponentFixture<BlobPreviewComponent>;
    let processContentService: ProcessContentService;
    let contentService: ContentService;
    let previewService: PreviewService;
    let getFileRawContentSpy: jasmine.Spy;
    let downloadBlobSpy: jasmine.Spy;
    let getContentSpy: jasmine.Spy;

    function createFakePdfBlob(): Blob {
        const pdfData = mockPdfData;
        return new Blob([pdfData], { type: 'application/pdf' });
    }

    const blob = createFakePdfBlob();
    const contentLinkModelMock = new ContentLinkModel({
        id: 4004,
        name: 'FakeBlob.pdf',
        created: 1490354907883,
        createdBy: {
            id: 2,
            firstName: 'dasdas', 'lastName': 'dasads', 'email': 'administrator@admin.com'
        },
        relatedContent: false,
        contentAvailable: true,
        link: false,
        mimeType: 'application/pdf',
        simpleType: 'pdf',
        previewStatus: 'created',
        thumbnailStatus: 'created'
    });
    contentLinkModelMock.contentBlob = blob;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([]),
            ],
            declarations: [
                BlobPreviewComponent,
            ],
            providers: [
                ProcessContentService,
                ContentService,
                PreviewService,
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BlobPreviewComponent);
        component = fixture.componentInstance;
        processContentService = fixture.debugElement.injector.get(ProcessContentService);
        contentService = fixture.debugElement.injector.get(ContentService);
        getFileRawContentSpy = spyOn(processContentService, 'getFileRawContent').and.returnValue(of(createFakePdfBlob()));
        downloadBlobSpy = spyOn(contentService, 'downloadBlob').and.returnValue(of(createFakePdfBlob()));
        previewService = fixture.debugElement.injector.get(PreviewService);
        getContentSpy = spyOn(previewService, 'getContent').and.returnValue(contentLinkModelMock);
        fixture.detectChanges();
    });

    it('should create instance of BlobPreviewComponent', () => {
        expect(component instanceof BlobPreviewComponent).toBe(true);
    });


    it('should define adf-viewer and adf-viewer-more-actions', () => {
        fixture.detectChanges();
        const adfViewerElement = fixture.debugElement.nativeElement.querySelector('#dw-viewer-id');
        const adfViewerMoreActionElement = fixture.debugElement.nativeElement.querySelector('#dw-viewer-more-action-id');
        const adfViewerdisplayName = fixture.debugElement.nativeElement.querySelector('#adf-viewer-display-name');
        expect(adfViewerElement).toBeDefined();
        expect(adfViewerMoreActionElement).toBeDefined();
        expect(adfViewerElement).not.toBeNull();
        expect(adfViewerdisplayName.innerText).toBe('FakeBlob.pdf');
        expect(getContentSpy).toHaveBeenCalled();
    });

    it('should use custom more actions menu', () => {
        const customElement: HTMLElement = fixture.nativeElement;
        fixture.detectChanges();
        expect(customElement.querySelector('.adf-viewer-container-more-actions')).toBeDefined();
    });

    it('should be able to download', () => {
        component.downloadContent();
        fixture.detectChanges();
        expect(getFileRawContentSpy).toHaveBeenCalled();
        expect(downloadBlobSpy).toHaveBeenCalled();
    });
});
