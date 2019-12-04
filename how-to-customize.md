# How to customize Alfresco Process Workspace

Alfresco Process Workspace (APW) supports customization of various properties or aspects to match with the customer needs. APW can be customized by adding or changing properties of app.config.json file, which is available in the root directory of APW. 

Below is the list of properties that can be customized.

### 1. APS Host URL - `bpmHost`
This URL is used to communicate with the APS instance. If you want to communicate with different APS instance other than the default one, then the property bpmHost has to be changed accordingly. When a different APS instance is to be accessed, make sure that CORS is enabled on the APS. 

Example :-
```json 
“bpmHost” : "http://192.168.0.172:8089”
```
Default value :- 
```json 
“bpmHost” : "http://{hostname}{:port}"
```

### 2. LandingPage - `landing-page`
This property can be used to change the default landing page from the dashboard to tasks or processes. 
Example :-
```json 
"landing-page" : "tasks"
```
In this case when the app is selected the tasks page will be rendered.


### 3. Application Logo - `path-logo`
This property can be used to change default Alfresco Logo. 
Example :-
```json 
"path-logo" : "./assets/apps_logo.png"
```
Default value :- 
```json 
"path-logo" : "./assets/alfresco_apps_logo.png"
```

### 4. Supported Languages - `languages`
By default APW supports the following languages, namely English - en, French - fr, German - de, Italian - it, Spanish - es, Japanese - ja, Dutch - nl, Brazilian Portuguese - pt-BR, NorwExampleian - nb, Russian - ru and Simplified Chinese - zh-CN.  Support for a particular language can be removed by removing that language from the languages property.

Example :-
```json
"languages": [
        {
            "key": "en",
            "label": "English" 
        },
        {
            "key": "fr",
            "label": "French"
        }
    ]
```
Default value :-
```json
"languages": [
        {
            "key": "en",
            "label": "English"
        },
        {
            "key": "fr",
            "label": "French"
        },
        {
            "key": "de",
            "label": "German"
        },
        {
            "key": "it",
            "label": "Italian"
        },
        {
            "key": "es",
            "label": "Spanish"
        },
        {
            "key": "ja",
            "label": "Japanese"
        },
        {
            "key": "nl",
            "label": "Dutch"
        },
        {
            "key": "pt-BR",
            "label": "Brazilian Portuguese"
        },
        {
            "key": "nb",
            "label": "Norwegian"
        },
        {
            "key": "ru",
            "label": "Russian"
        },
        {
            "key": "zh-CN",
            "label": "Simplified Chinese"
        }
    ]
```

### 5. Locale - `locale`
Locale of the APW app can be changed by setting a value from the Supported Languages. If no locale is set, browser locale will be used if it is supported by APW.

Example :- 
```json
"locale" : "fr"
```
Default value :- 
```json
"locale" : "en"
```

### 6. Pagination - `pagination.size`, `pagination.supportedPageSizes`
Pagination feature on APW can be customized to have different default page size and supported page sizes. To do so, `pagination.size` and `pagination.supportedPageSizes` properties have to be used respectively.

Example :-
```json
"pagination": {
        "size": 10,
        "supportedPageSizes": [ 5, 10, 20, 30, 40 ]
    }
```

Default value :- 
```json
"pagination": {
        "size": 25,
        "supportedPageSizes": [ 5, 10, 15, 20, 25, 30, 35, 40, 45, 50 ]
    }
```

### 7. New process - Default process and Default name - `adf-start-process.processDefinitionName`, `adf-start-process.name`
To start a new process, APW uses the adf-start-process component that accepts default values for two properties. Adf-start-process component shows all available processes to the logged-in user and if a particular process needs to be pre-selected, then the required process definition name has to be set to the `adf-start-process.processDefinitionName` property. In a similar way, name for the new process instance can also have a default value by setting the `adf-start-process.name` property. If there is no default name specified, then user has to enter the name manually to start a new process.

Example :-
```json
"adf-start-process": {
        "name": "Demo process Classified",
        "processDefinitionName": "Demo process"
    }
```
Default value :- Not set

### 8. Task list customization - `adf-task-list`
Task lists in the APW is based on adf-task-list component and their schema (columns) can be customized in the same as adf-task-list. There are two adf-task-list instances and each uses it’s own custom schema, namely dw-task-list and dw-process-task-list (tasks for a process).

Example :-
```json
"adf-task-list": {
        "presets": {
            "dw-task-list": [
                {
                    "key": "created",
                    "type": "date",
                    "title": "ADF_TASK_LIST.PROPERTIES.CREATED",
                    "cssClass": "dw-dt-col-4 ellipsis-cell",
                    "format": "timeAgo",
                    "sortable": true
                },
                {
                    "key": "priority",
                    "type": "text",
                    "title": "ADF_TASK_LIST.PROPERTIES.PRIORITY",
                    "cssClass": "desktop-only dw-dt-col-3 ellipsis-cell",
                    "sortable": true
                }
            ],
            "dw-process-task-list": [
                {
                    "key": "name",
                    "type": "text",
                    "title": "ADF_TASK_LIST.PROPERTIES.TASK_NAME",
                    "cssClass": "ellipsis-cell",
                    "sortable": false
                }
            ]
        }
```

Default value :-
```json
"adf-task-list": {
        "presets": {
            "dw-task-list": [
                {
                    "key": "name",
                    "type": "text",
                    "title": "ADF_TASK_LIST.PROPERTIES.NAME",
                    "cssClass": "dw-dt-col-4 ellipsis-cell",
                    "sortable": true
                },
                {
                    "key": "created",
                    "type": "date",
                    "title": "ADF_TASK_LIST.PROPERTIES.CREATED",
                    "cssClass": "dw-dt-col-4 ellipsis-cell",
                    "format": "timeAgo",
                    "sortable": true
                },
                {
                    "key": "priority",
                    "type": "text",
                    "title": "ADF_TASK_LIST.PROPERTIES.PRIORITY",
                    "cssClass": "desktop-only dw-dt-col-3 ellipsis-cell",
                    "sortable": true
                }
            ],
            "dw-process-task-list": [
                {
                    "key": "name",
                    "type": "text",
                    "title": "ADF_TASK_LIST.PROPERTIES.TASK_NAME",
                    "cssClass": "ellipsis-cell",
                    "sortable": false
                },
                {
                    "key": "dueDate",
                    "type": "date",
                    "title": "ADF_TASK_LIST.PROPERTIES.DUE_DATE",
                    "cssClass": "desktop-only dw-dt-col-4 ellipsis-cell",
                    "format": "timeAgo",
                    "sortable": false
                },
                {
                    "key": "processDefinitionName",
                    "type": "text",
                    "title": "ADF_PROCESS_LIST.PROPERTIES.PROCESS_NAME",
                    "cssClass": "desktop-only ellipsis-cell",
                    "sortable": false
                }
            ]
        }
```