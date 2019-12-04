/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var FileModel = require('./fileModel');

var FilesModel = function () {

    var files = null;

    this.setFiles = function (arr) {
        files = arr.map(function(item) {
            return new FileModel(item.entry);
        });
    };

    this.getFiles = function () {
        return files;
    };
};
module.exports = FilesModel;
