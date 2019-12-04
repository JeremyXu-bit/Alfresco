/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

var exports = module.exports = {};

/**
 *Rest API Response statusCodes
 */
exports.HTTP_RESPONSE_STATUS_CODE ={
    FORBIDDEN: 403,
    OK: 200,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404
};

/**
 *Rest API Response Messages
 */
exports.HTTP_RESPONSE_STATUS ={
    OK: {
        'CODE': 200,
        'MESSAGE': 'OK'
    },
    CREATED: {
        'CODE': 201,
        'MESSAGE': 'Created'
    },
    NO_CONTENT: {
        'CODE': 204,
        'MESSAGE': 'No Content'
    },
    NOT_FOUND: {
        'CODE': 404,
        'MESSAGE': 'Not Found'
    }
};

/**
 *Rest API HTTP content types
 */
exports.HTTP_CONTENT_TYPE = {
    JSON : 'application/json',
    URLENCODED : 'application/x-www-form-urlencoded',
    IMAGE_PNG: 'image/png',
    TEXT: 'text/csv'
};

exports.APPLICATION = {
    ADF_APS: 'adf_aps',
    ADF_ACS: 'adf_acs',
    APS: 'main'
};

exports.TASKFILTERS = {
    MY_TASKS: 'My Tasks',
    INV_TASKS: 'Involved Tasks',
    QUE_TASKS: 'Queued Tasks',
    COMPL_TASKS: 'Completed Tasks'
};

exports.TASKDETAILS = {
    NO_FORM: 'No form',
    NO_PARENT: 'No parent',
    NO_DATE: 'No date',
    NO_CATEGORY: 'No category',
    NO_DESCRIPTION: 'No description'
};

exports.TASKSTATUS = {
    RUNNING: 'Running'
};

exports.METADATA = {
    DATAFORMAT: "mmm dd yyyy",
    TITLE: "Details",
    COMMENTS_TAB: "COMMENTS",
    PROPERTY_TAB: "PROPERTIES",
    VERSIONS_TAB: "VERSIONS",
    DEFAULT_ASPECT: "Properties",
    MORE_INFO_BUTTON: "More information",
    LESS_INFO_BUTTON: "Less information",
    ARROW_DOWN: "keyboard_arrow_down",
    ARROW_UP: "keyboard_arrow_up",
    EDIT_BUTTON_TOOLTIP: "Edit"
};

exports.THEMING = {
    PINK_BLUE_DARK: "Pink Bluegrey Dark",
    DEFAULT_PASSWORD_ICON_COLOR: "rgba(0, 0, 0, 0.87)",
    DEFAULT_LOGIN_BUTTON_COLOR: "rgba(0, 0, 0, 0.38)",
    DEFAULT_BACKGROUND_COLOR: "rgba(0, 0, 0, 0.87)",
    PINK_BLUE_DARK_PASSWORD_ICON_COLOR: "rgba(255, 255, 255, 1)",
    PINK_BLUE_DARK_LOGIN_BUTTON_COLOR: "rgba(255, 255, 255, 0.87)",
    PINK_BLUE_DARK_BACKGROUND_COLOR: "rgba(255, 255, 255, 1)",
};

exports.APP_COLOR = {
    BLUE: "rgba(0, 0, 0, 0.87)"
};

exports.PROCESSENDDATE = "No date";

exports.PROCESSCATEGORY = "http://www.activiti.org/processdef";

exports.PROCESSBUSINESSKEY = "None";

exports.PROCESSDESCRIPTION = "No description";

exports.PROCESSDATEFORMAT = "mmm dd yyyy";

exports.PROCESSSTATUS = {
    RUNNING: 'Running',
    COMPLETED: 'Completed'
};
