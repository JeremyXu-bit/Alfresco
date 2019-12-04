#!/bin/sh


if [ -n "${APP_CONFIG_BPM_HOST}" ]; then
replace="\/"
encodedBPM=${APP_CONFIG_BPM_HOST//\//$replace}
sed -e "s/\"bpmHost\": \".*\"/\"bpmHost\": \"$encodedBPM\"/g" \
    -i ./app.config.json
fi

if [ -n "${APP_CONFIG_ECM_HOST}" ];then
replace="\/"
encodedECM=${APP_CONFIG_ECM_HOST//\//$replace}
  sed -e "s/\"ecmHost\": \".*\"/\"ecmHost\": \"$encodedECM\"/g" \
    -i ./app.config.json
fi


if [ -n "${APP_CONFIG_PROVIDERS}" ];then
  sed -e "s/\"providers\": \".*\"/\"providers\": \"${APP_CONFIG_PROVIDERS}\"/g" \
    -i ./app.config.json
fi

if [ -n "${APP_CONFIG_AUTH_TYPE}" ];then
  sed -e "s/\"authType\": \".*\"/\"authType\": \"${APP_CONFIG_AUTH_TYPE}\"/g" \
    -i ./app.config.json
fi

if [ -n "${APP_CONFIG_LANDING_PAGE}" ];then
  sed -e "s/\"landing-page\": \".*\"/\"landing-page\": \"${APP_CONFIG_LANDING_PAGE}\"/g" \
    -i ./app.config.json
fi

if [ -n "${APP_CONFIG_OAUTH2_HOST}" ];then
    replace="\/"
    encoded=${APP_CONFIG_OAUTH2_HOST//\//$replace}
    sed -e "s/\"host\": \".*\"/\"host\": \"$encoded\"/g" \
        -i ./app.config.json
fi

if [ -n "${APP_CONFIG_OAUTH2_CLIENTID}" ];then
  sed -e "s/\"clientId\": \".*\"/\"clientId\": \"${APP_CONFIG_OAUTH2_CLIENTID}\"/g" \
    -i ./app.config.json
fi

if [ -n "${APP_CONFIG_OAUTH2_IMPLICIT_FLOW}" ];then
 sed "/implicitFlow/s/true/${APP_CONFIG_OAUTH2_IMPLICIT_FLOW}/" \
    -i ./app.config.json
fi

if [ -n "${APP_CONFIG_OAUTH2_SILENT_LOGIN}" ];then
 sed "/silentLogin/s/true/${APP_CONFIG_OAUTH2_SILENT_LOGIN}/" \
    -i ./app.config.json
fi

if [ -n "${APP_CONFIG_OAUTH2_REDIRECT_LOGIN}" ];then
  sed -e "s/\"redirectUri\": \".*\"/\"redirectUri\": \"${APP_CONFIG_OAUTH2_REDIRECT_LOGIN}\"/g" \
    -i ./app.config.json
fi

if [ -n "${APP_CONFIG_OAUTH2_REDIRECT_LOGOUT}" ];then
  sed -e "s/\"redirectUriLogout\": \".*\"/\"redirectUriLogout\": \"${APP_CONFIG_OAUTH2_REDIRECT_LOGOUT}\"/g" \
    -i ./app.config.json
fi

http-server -p 80 .
