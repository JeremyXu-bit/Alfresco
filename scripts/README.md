## Running the Alfresco Process Workspace(APW) project


* Start by navigating into the APW source folder, and then to the script folder:

```ssh
 cd adf-app-manager-ui
 cd scripts
```

# Quick examples for developing APW project

* Start the APW project using JS-API from development branch and local components in the ng2-components folder

```sh
./start.sh -dev -t -gitjsapi development
```

# start.sh

***start.sh*** script provides an easy way to deal with npm commands and the correct sequence to run the task on process workspace during development phase.

## Options

The default behaviour of the ***start.sh*** script is to run npm-install and npm-start of the APW project on port 3000. This default behaviour can be changed with some of the options provided below.
All the commands before can be used in combination

| Option | Description |
| --- | --- |
| -h or --help    | show help  |
| -u or --update  | update node module packages of APW project  |
| -c or --clean   | clean the APW project if there are some big changes  |
| -t or --test    | run test cases of APW project  |
| -r or --registry    |  Start the APW project using an alternative npm registry  |
| -v or --version    | Instead of using the version defined in pacakge.json, run the application with a different version of ng2-components (this option is not compatible with -dev)  |
| -si or --skipinstall    | skip installation of node_modules  |
| -ss or --skipstart    | skip the start of APW project and just build it in a dist folder relative to the APW project  |
| -dev or --develop    | Start the APW project in development mode by building the relative ng2-components folder with all the components and pointing to those components instead of the ng2-components present in node_modules folder |
| -dist     | Start the APW project using a light server and the files built in the dist folder, particularly useful to test the final result of the project |
| -gitjsapi   | if you want to start the APW project using an alfresco-js-api referenced by commit-ish version of the JS-API |
| -vjsapi   | Instead of using the version defined in the pacakge.json, run the application with a different version of JS-API  |


## Examples

* Start the APW project and Install all the dependencies 

```sh
./start.sh 
```

* Start the APW project, install all the dependencies, and remove the previous version of npm packages (*Note. do this only after big changes*):

```sh
./start.sh -c 
```

* Start the APW project using an alternative npm registry 

```sh
./start.sh -registry 'http://npm.local.me:8080/'
```

* Start the APW project and update the dependencies:

```sh
./start.sh -update or -u
```

* Instead of using the version defined in pacakge.json, run the application with a different version of ng2-components (this option is not compatible with -dev)  |

```sh
./start.sh -version or -v COMPONENTS_VERSION

./start.sh -v 1.4.0
```

* Start the APW project in development mode by building the relative ng2-components folder and pointing to them instead of using ng2-components from node_modules

```sh
./start.sh -develop or -dev
```

*Start the APW project using the latest alpha version of adf components

```sh
./start.sh -ss -v alpha
```

* Start the APW project using a light server and the files built in the dist folder

```sh
./start.sh -dist
```

* If you want to start the APW project using an alfresco-js-api referenced by commit-ish version of the JS-API

```sh
./start.sh -gitjsapi commit-ish

./start.sh -gitjsapi development
 
./start.sh -gitjsapi de92be966e2ce7eca642ca9e9d7647ba4f849356
```

* If you want to start the alfresco-js-api against a commit-ish version of the JS-API

```sh
./start.sh -vjsapi 1.4.0

```

* If you want to run the unit test cases for APW project

```sh
./start.sh -t

```
OR

```
npm run test
```

# E2E Tests

APW's e2e test are based on the Protractor framework. 

## Run E2E test to check regression

### How can I run the e2e tests against a remote env 
```
./scripts/test-e2e-apw.sh -remoteenv http://myalfrescoprocessworkspace.com
```

### How can I run the e2e tests against a remote env with .env
`./scripts/test-e2e-apw.sh`

Create a `.env` file under the `e2e` folder that contains
```
REMOTE_HOST="http://myalfrescoprocessworkspace.com"
```

## Run E2E tests to check local build

### How can I run the e2e tests agains my local code 
```
./scripts/test-e2e-apw.sh -dev -apihost $API_HOST -oauthost $OAUTH_HOST -identityhost $IDENTITY_HOST -identityadminemail $IDENTITY_ADMIN_EMAIL -identityadminpassword $IDENTITY_ADMIN_PASSWORD  -identityuseremail $IDENTITY_USER_EMAIL -identityuserpassword $IDENTITY_USER_PASSWORD
```

### How can I run the e2e tests agains my local code with .env
`./scripts/test-e2e-apw.sh -dev`

Create a `.env` file under the `e2e` folder that contains
```
API_HOST="http://myalfrescoprocessworkspace.com"
OAUTH_HOST="http://myalfrescoprocessworkspace.com/auth/realms/alfresco"
IDENTITY_HOST="http://myalfrescoprocessworkspace.com/auth/admin/realms/alfresco"
IDENTITY_USER_EMAIL="mycooluser"
IDENTITY_USER_PASSWORD="mycoolpassword"
IDENTITY_ADMIN_EMAIL="mycooladmin"
IDENTITY_ADMIN_PASSWORD="mycooladmin"
```


# load-apps_prod.sh

***load-apps_prod.sh*** script provides an easy way to import and publish bpm apps into the production environment

* Start import and publish

```sh
./load-apps_prod.sh 
```
* It will load from apps folder to the production environment (https://APW.alfresco.me/activiti-app) 

* This script also creates two process instances for the "ClaimReviewProcess"
