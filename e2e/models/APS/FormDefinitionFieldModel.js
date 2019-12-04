/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var FormDefinitionFieldModel = function (details) {

    this.fieldType;
    this.id;
    this.name;
    this.value;
    this.type;
    this.required;
    this.readOnly;
    this.overrideId;
    this.colspan;
    this.placeholder;
    this.minLength;
    this.maxLength;
    this.minValue;
    this.maxValue;
    this.regexPattern;
    this.optionType;
    this.hasEmptyValue;
    this.options;
    this.restUrl;
    this.restResponsePath;
    this.restIdProperty;
    this.setRestLabelProperty;
    this.tab;
    this.className;
    this.dateDisplayFormat;
    this.layout = {};
    this.sizeX;
    this.sizeY;
    this.row;
    this.col;
    this.columnDefinitions;
    this.visibilityCondition;
    this.numberOfColumns;
    this.fields = {};

    Object.assign(this, details);
};
module.exports = FormDefinitionFieldModel;
