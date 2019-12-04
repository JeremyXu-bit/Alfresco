#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd "$DIR/../"
DEVELOPMENT=false

show_help() {
    echo "Usage: ./scripts/test-e2e-apw.sh -host adf.domain.com -u admin -p admin -e admin"
    echo ""
    echo "-u or --username"
    echo "-p or --password"
    echo "-e or --email"
    echo "-b or --browser run the test in the browsrwer (No headless mode)"
    echo "-s or --spec run a single test file"
    echo "-f or --folder run a single folder test"
    echo "-proxy or --proxy proxy Back end URL to use only possibel to use with -dev option"
    echo "-dev or --dev run it against local development environment it will deploy on localhost:4200 the current version of your branch"
    echo "-host or --host URL of the Front end to test"
    echo "-save  save the error screenshot in the remote env"
    echo "-timeout or --timeout override the timeout foe the wait utils"
    echo "-h or --help"
}

set_username(){
    USERNAME=$1
}
set_password(){
    PASSWORD=$1
}
set_email(){
    EMAIL=$1
}
set_host(){
    HOST=$1
}

set_test(){
    SINGLE_TEST=true
    NAME_TEST=$1
}

set_proxy(){
    PROXY=$1
}

set_timeout(){
    TIMEOUT=$1
}

set_save_screenshot(){
    SAVE_SCREENSHOT=true
}

set_remoteenv(){
    REMOTE_HOST=$1
    export REMOTE_HOST=$REMOTE_HOST
}

set_apihost(){
    API_HOST=$1
    export API_HOST=$API_HOST
    export APP_CONFIG_BPM_HOST=$API_HOST
}

set_oauthost(){
    OAUTH_HOST=$1
    export OAUTH_HOST=$OAUTH_HOST
    export APP_CONFIG_OAUTH2_HOST=$OAUTH_HOST
}

set_identityhost(){
    IDENTITY_HOST=$1
    export IDENTITY_HOST=$IDENTITY_HOST
    export APP_CONFIG_IDENTITY_HOST=$IDENTITY_HOST
}
set_identityadminemail(){
    IDENTITY_ADMIN_EMAIL=$1
    export IDENTITY_ADMIN_EMAIL=$IDENTITY_ADMIN_EMAIL
}
set_identityadminpassword(){
    IDENTITY_ADMIN_PASSWORD=$1
    export IDENTITY_ADMIN_PASSWORD=$IDENTITY_ADMIN_PASSWORD
}
set_identityuseremail(){
    IDENTITY_USER_EMAIL=$1
    export IDENTITY_USER_EMAIL=$IDENTITY_USER_EMAIL
}
set_identitypassword(){
    IDENTITY_USER_PASSWORD=$1

}

set_applicationdeployment(){
    DEPLOYED_APPS=$1
    export DEPLOYED_APPS=$DEPLOYED_APPS
}

set_development(){
    DEVELOPMENT=true
}

set_test_folder(){
    FOLDER=$1
}

while [[ $1 == -* ]]; do
    case "$1" in
      -h|--help|-\?) show_help; exit 0;;
      -u|--username)  set_username $2; shift 2;;
      -p|--password)  set_password $2; shift 2;;
      -e|--email)  set_email $2; shift 2;;
      -f|--folder)  set_test_folder $2; shift 2;;
      -timeout|--timeout)  set_timeout $2; shift 2;;
      -dev|--dev)  set_development; shift;;
      -s|--spec)  set_test $2; shift 2;;
      -save)   set_save_screenshot; shift;;
      -remoteenv) set_remoteenv $2; shift;;
      -apihost) set_apihost $2; shift;;
      -oauthost) set_oauthost; shift;;
      -identityhost)   set_identityhost; shift;;
      -identityadminemail)   set_identityadminemail; shift;;
      -identityadminpassword)   set_identityadminpassword; shift;;
      -identityuseremail)   set_identityuseremail; shift;;
      -identityuserpassword)   set_identitypassword; shift;;
      -app|--applications)  set_applicationdeployment $2; shift 2;;
      -proxy|--proxy)  set_proxy $2; shift 2;;
      -host|--host)  set_host $2; shift 2;;
      -*) echo "invalid option: $1" 1>&2; show_help; exit 1;;
    esac
done

rm -rf ./e2e/downloads/
rm -rf ./e2e-output/screenshots/

export SAVE_SCREENSHOT=$SAVE_SCREENSHOT
export TIMEOUT=$TIMEOUT
export FOLDER=$FOLDER'/'

webdriver-manager update --gecko=false --versions.chrome=2.38
if [[  $DEVELOPMENT == "true" ]]; then
    export APP_CONFIG_PORT=3000
    export REMOTE_HOST="http://localhost:"$APP_CONFIG_PORT
    echo "====== Run against local build  $REMOTE_HOST  ====="
    echo "====== 1 replace config  ====="
    npm run replace-appconfig
    echo "====== 2 run server  ====="
    http-server -c-1 ./dist -p $APP_CONFIG_PORT & node --inspect-brk ./node_modules/protractor/bin/protractor ./e2e/protractor.conf.js || exit 1
else
    ./node_modules/protractor/bin/protractor ./e2e/protractor.conf.js
fi



