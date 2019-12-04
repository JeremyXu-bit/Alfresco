/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var FormDefinitionFieldModel = require('./FormDefinitionFieldModel');

var FormDefinitionModel = function (fields) {

    var fields = null;
    var widgets = null;

    this.setFields = function (arr) {
        fields = arr.map(function(item) {
            return new FormDefinitionFieldModel(item);
        })
    };

    this.setAllWidgets = function (arr) {
        widgets = arr.reduce(function(acc, item) {
            if(item.type === 'container') {
                var children = Object.keys(item.fields).map(function(key) {
                    return item.fields[key][0];
                });

                return acc.concat(children);
            }
            return acc.concat(item);
        }, []);
    };

    this.getWidgets = function () {
        return widgets;
    };

    this.getWidgetBy = function (key, value) {
        return widgets.find(function(widget) {
            return widget[key]===value;
        })
    };

    this.findFieldBy = function(key, value) {
        return fields.find(function(field) {
            return field[key]===value;
        })
    };
}

module.exports = FormDefinitionModel;
