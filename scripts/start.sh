#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

eval EXEC_INSTALL=true
eval EXEC_UPDATE=false
eval EXEC_CLEAN=false
eval EXEC_DEVELOP=false
eval EXEC_VERSION=false
eval EXEC_DIST=false
eval EXEC_GIT_NPM_INSTALL_JSAPI=false
eval EXEC_VERSION_JSAPI=false
eval EXEC_START=true
eval EXEC_TEST=false
eval JSAPI_VERSION=""
eval NG2_COMPONENTS_VERSION=""
eval GIT_ISH=""
eval BUILD_BASEREF=""
eval EXEC_PUBLISH=false

eval projects=( "@alfresco/adf-core"
    "@alfresco/adf-content-services"
    "@alfresco/adf-insights"
    "@alfresco/adf-process-services" )

show_help() {
    echo "Usage: start.sh"
    echo ""
    echo "-ss or -skipstart build only the adf apps dashboard without start"
    echo "-si or -skipinstall start the adf apps dashboard and  skip the install the dependencies"
    echo "-dev or -develop start the adf apps dashboard using the relative ng2-components folder to link the components"
    echo "-dist create the disbuild the adf apps dashboard in dist mode"
    echo "-t or -test execute test"
    echo "-u or -update start the adf apps dashboard and update the dependencies"
    echo "-c or -clean  clean the adf apps dashboard and reinstall the dependencies"
    echo "-r or -registry to download the packages from an alternative npm registry example -registry 'http://npm.local.me:8080/' "
    echo "-v or -version install different version of ng2_components from npm defined in the package.json this option is not compatible with -d"
    echo "-gitjsapi to build all the components against a commit-ish version of the JS-API"
    echo "-vjsapi install different version from npm of JS-API defined in the package.json"
}

install() {
    EXEC_INSTALL=false
}

update() {
    EXEC_UPDATE=true
}

develop() {
    EXEC_DEVELOP=true
}

enable_dist() {
    EXEC_DIST=true
}

disable_start() {
    EXEC_START=false
}

enable_test() {
    EXEC_TEST=true
}

enable_publish() {
    echo "value $1"
    if ( [[ "$1" == "" ]] || ( [[ "$1" != "true" ]] && [[ "$1" != "false" ]]   ) )
    then
      echo "publish value required | true or false"
      exit 0
    fi
    EXEC_PUBLISH=$1
}

enable_js_api_git_link() {
    GIT_ISH='git://github.com/Alfresco/alfresco-js-api.git#'$1
    EXEC_GIT_NPM_INSTALL_JSAPI=true
}

enable_build_base_ref() {
    BUILD_BASEREF=$1
}

version_component() {
    NG2_COMPONENTS_VERSION=$1

    if [[ "${NG2_COMPONENTS_VERSION}" == "" ]]
    then
      echo "NG2 components version required with -v | -version"
      exit 0
    fi

    EXEC_VERSION=true
}

version_js_api() {
    JSAPI_VERSION=$1

    if [[ "${JSAPI_VERSION}" == "" ]]
    then
      echo "JSAPI version required with -vJSApi"
      exit 0
    fi

    EXEC_VERSION_JSAPI=true
}

change_registry(){
    NPM_REGISTRY=$1

    if [[ "${NPM_REGISTRY}" == "" ]]
    then
      echo "NPM registry required WITH OPTION -r | -registry"
      exit 0
    fi

    echo "====== CHANGE REGISTRY: ${NPM_REGISTRY} ====="
    npm config set registry ${NPM_REGISTRY}
}

clean() {
    EXEC_CLEAN=true
    EXEC_INSTALL=true
}

while [[ $1  == -* ]]; do
    case "$1" in
      -h|--help|-\?) show_help; exit 0;;
      -u|--update) update; shift;;
      -c|--clean) clean; shift;;
      -t|--test) enable_test; shift;;
      -r|--registry)  change_registry $2; shift 2;;
      -v|--version)  version_component $2; shift 2;;
      -si|--skipinstall) install; shift;;
      -ss|--skipstart)  disable_start; shift;;
      -dev|--develop) develop; shift;;
      -dist)  enable_dist; shift;;
      -gitjsapi)  enable_js_api_git_link $2; shift 2;;
      -base)  enable_build_base_ref $2; shift 2;;
      -publish)  enable_publish $2; shift 2;;
      -vjsapi)  version_js_api $2; shift 2;;
      -*) echo "invalid option: $1" 1>&2; show_help; exit 0;;
    esac
done

cd "$DIR/.."

if $EXEC_CLEAN == true; then
  echo "====== Clean ADF Apps Dashboard ====="
  npm install rimraf
  npm run clean
fi

if $EXEC_INSTALL == true; then
  echo "====== Install ADF Apps Dashboard ====="
  npm install
fi

if $EXEC_DEVELOP == true; then
   echo "====== Install node_modules ng2-components ====="
   cd "$DIR/../../alfresco-ng2-components/lib"
   npm install
   cd "$DIR/.."
fi

if $EXEC_VERSION == true; then
   echo "====== Install version "${NG2_COMPONENTS_VERSION}" of ng2-components ====="

    if [[ "${EXEC_DEVELOP}" == "" ]]
    then
      echo "Option -v is not compatible with -d see the help"
      exit 0
    fi

    for PACKAGE in ${projects[@]}
    do
      npm install ${PACKAGE}@${NG2_COMPONENTS_VERSION}
    done
fi

if $EXEC_GIT_NPM_INSTALL_JSAPI == true; then
  echo "====== Use the alfresco JS-API  '$GIT_ISH'====="
  npm install $GIT_ISH --no-save
  cd "$DIR/../node_modules/alfresco-js-api"
  npm install
  if $EXEC_DEVELOP == true; then
   cd "$DIR/../../alfresco-ng2-components/lib/"
   npm install $GIT_ISH --no-save
   cd "$DIR/../../alfresco-ng2-components/lib/node_modules/alfresco-js-api"
   npm install
  fi
  cd "$DIR/.."
fi

if $EXEC_VERSION_JSAPI == true; then
  echo "====== Use the alfresco JS-API '$JSAPI_VERSION'====="
  npm install alfresco-js-api@${JSAPI_VERSION} --no-save
  if $EXEC_DEVELOP == true; then
   echo "====== Install node_modules ng2-components ====="
   cd "$DIR/../../alfresco-ng2-components/lib/"
   npm install alfresco-js-api@${JSAPI_VERSION} --no-save
  fi
  cd "$DIR/.."
fi

if $EXEC_TEST == true; then
  echo "====== ADF Apps Dashboard Test====="
  npm run test
fi

if $EXEC_START == true; then
    if $EXEC_DEVELOP == true; then
        echo "====== Start ADF Apps Dashboard dev mode ====="
        npm run start:dev
    elif $EXEC_DIST == true; then
        echo "====== Start ADF Apps Dashboard dist mode from the path '$BUILD_BASEREF'====="
        npm run start:dist --base-href $BUILD_BASEREF
    else
        echo "====== Start ADF Apps Dashboard from the path '$BUILD_BASEREF'====="
        npm run start --base-href $BUILD_BASEREF
    fi
else
    if $EXEC_DEVELOP == true; then
        echo "====== Build ADF Apps Dashboard dev mode ====="
        npm run build:dev
    else
        echo "====== Build ADF Apps Dashboard from the path '$BUILD_BASEREF'====="
        npm run build -- --base-href $BUILD_BASEREF  --deploy-url $BUILD_BASEREF
        if $EXEC_PUBLISH == true; then
            echo "====== ADF Apps Publish ====="
            npm publish
        fi
    fi
fi
