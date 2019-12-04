/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var ContentModel = function (details) {

    this.mimeType = '';
    this.mimeTypeName = '';
    this.sizeInBytes = '';
    this.encoding = '';

    this.getMimeType = function () {
        return this.mimeType;
    };

    this.getMimeTypeName = function () {
        return this.mimeTypeName;
    };

    this.getSizeInBytes = function () {
        if (this.sizeInBytes>=1024)
        {
            var bytes=(this.sizeInBytes/1024).toFixed(2)+' KB';
            return bytes;
        }
        else {
            return this.sizeInBytes;
        }
    };

    this.getEncoding = function () {
        return this.encoding;
    };

    Object.assign(this, details);

};
module.exports = ContentModel;
