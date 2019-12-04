#!/bin/bash

base_url="http://dwdevelop.lab.alfresco.me"

show_help() {
    echo "Usage: load-apps.sh"
    echo ""
    echo "-u to pass user id and password"
    echo "-url to pass APS base url and default value is http://dwdevelop.lab.alfresco.me"
    echo "-h to view documentation"
}

function set_url() {
  test -z "$1" && echo "Invalid ACS URL" && exit 1
  base_url="$1"
}

function set_user() {
  test -z "$1" && echo "Invalid username" && exit 1
  test -z "$2" && echo "Invalid password" && exit 1
  
  bpm_user="$1"
  bpm_pass="$2"
}

while [[ $1  == -* ]]; do
    case "$1" in
      -h|--help|-\?) show_help; exit 0;;
      -u) set_user $2 $3; shift 3;;
      -url) set_url $2; shift 2;;
      -*) echo "invalid option: $1" 1>&2; show_help; exit 0;;
    esac
done

echo ""
echo "User name: $bpm_user, Password:$bpm_pass, URL:$base_url"
echo ""

bpm_url="$base_url/activiti-app"

email1="jenni_joy5@app.activiti.com"
email2="mike_rotch5@app.activiti.com"
email3="ben_dover5@app.activiti.com"
email4="mike_hunt5@app.activiti.com"
email5="ivana_tinkle5@app.activiti.com"
email6="anita_bath5@app.activiti.com"
common_pass="Dwuser"

COMMAND="curl -s -o /dev/null -I -w %{http_code} $bpm_url/#/login"
while HTTPCODE=$($COMMAND); [[ $HTTPCODE != 200 ]]; # if the curl command IS NOT 200
do
  echo "Waiting for activiti to be ready @ $bpm_url ..."
  sleep 2
done

agent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:51.0) Gecko/20100101 Firefox/51.0'
csrf_token="5762ca58a7a536f470fe21f79a2eb8b29b"

function extract_id_from_json() {
  [[ "$1" =~ ^\{\"id\":\"?([^\",]+)\"? ]] && echo "${BASH_REMATCH[1]}" || echo ""
}

function extract_remeber_me_cookie() {
   [[ "$1" =~ ACTIVITI_REMEMBER_ME=[A-Za-z0-9]+\; ]] && echo "${BASH_REMATCH[0]}" || echo ""
}

function log_in {
  local resp=$( curl -s -D - \
    -X POST \
    -A "$agent" \
    -H "Cookie: CSRF-TOKEN=$csrf_token" \
    -H "X-CSRF-TOKEN: $csrf_token" \
    -H 'Content-Type: application/x-www-form-urlencoded' \
    -d "j_username=$bpm_user&j_password=$bpm_pass&_spring_security_remember_me=true&submit=Login" \
    "$bpm_url/app/authentication" )
   echo $( extract_remeber_me_cookie "$resp" )
}

function get_share_app_req() {
  echo "{\"added\":[
          {\"userId\":$1,\"permission\":\"read\"},
          {\"userId\":$2,\"permission\":\"read\"},
          {\"userId\":$3,\"permission\":\"read\"},
          {\"userId\":$4,\"permission\":\"read\"},
          {\"userId\":$5,\"permission\":\"read\"},
          {\"userId\":$6,\"permission\":\"read\"}
        ],\"updated\":[],\"removed\":[]}"
}

function share_app() {
  appId="$1"
  remeber_me="$2"
  req=$( get_share_app_req $3 $4 $5 $6 $7 $8)
  local resp=$( curl --write-out %{http_code} --silent --output /dev/null \
    -X PUT \
    -A "$agent" \
    -H "Cookie: $remeber_me CSRF-TOKEN=$csrf_token" \
    -H "X-CSRF-TOKEN: $csrf_token" \
    -H 'Content-Type: application/json' \
    -d "$req" \
    "$bpm_url/app/rest/models/$appId/share-info" )
  echo "$resp"
}

function bpm_create_user() {
  tenant_id="$5"
  test -z "$5" && tenant_id=1
  local resp=$( curl -s \
    -u "$bpm_user:$bpm_pass" \
    -A "$agent" \
    -H "Cookie: CSRF-TOKEN=$csrf_token" \
    -H "X-CSRF-TOKEN: $csrf_token" \
    -H 'Content-Type: application/json' \
    -d '{"firstName":"'$1'", "lastName":"'$2'", "email":"'$3'", "password":"'$4'", "status":"active", "type":"enterprise", "tenantId":'$tenant_id'}' \
    "$bpm_url/api/enterprise/admin/users" )
  echo $( extract_id_from_json "$resp" )
}

function bpm_import_app() {
  local resp=$( curl \
    -u "$bpm_user:$bpm_pass" \
    -A "$agent" \
    -H "Cookie: CSRF-TOKEN=$csrf_token" \
    -H "X-CSRF-TOKEN: $csrf_token" \
    -F file=@$1 \
    "$bpm_url/api/enterprise/app-definitions/import?renewIdmEntries=true" )
  echo $( extract_id_from_json "$resp" )
}

function bpm_publish_app() {
  curl \
    -u "$bpm_user:$bpm_pass" \
    -A "$agent" \
    -H "Cookie: CSRF-TOKEN=$csrf_token" \
    -H "X-CSRF-TOKEN: $csrf_token" \
    -H 'Content-Type: application/json' \
    -d "{ \"comment\": \"\", \"force\": false }" \
    "$bpm_url/api/enterprise/app-definitions/$1/publish"
}

function bpm_deploy_app() {
  local resp=$(curl --write-out %{http_code} --silent --output /dev/null \
    -u "$2:$3" \
    -A "$agent" \
    -H "Cookie: CSRF-TOKEN=$csrf_token" \
    -H "X-CSRF-TOKEN: $csrf_token" \
    -H 'Content-Type: application/json' \
    -d "{ \"appDefinitions\": [{\"id\":$1}] }" \
    "$bpm_url/api/enterprise/runtime-app-definitions")
    echo "$resp"
}


function create_process() {
    local resp=$( curl \
      -X POST \
      -u "$bpm_user:$bpm_pass" \
      -A "$agent" \
      -H "Cookie: CSRF-TOKEN=$csrf_token" \
      -H "X-CSRF-TOKEN: $csrf_token" \
      -H "Content-Type: application/json" \
      -d '{"values":{"clientname":"Steve","policyno":"1111","billamount":"10500","billdate":"2017-05-29T00:00:00.000Z","claimtype":{"id":"reimbursement","name":"Reimbursement"},"hospitalname":"Aaa"},"processDefinitionId":"ClaimReviewProcess:'$1'","name":"Claim Review Process - June 21st 2017"}' \
      "$bpm_url/api/enterprise/process-instances")
    echo $( extract_id_from_json "$resp" )

    local resps=$( curl \
      -X POST \
      -u "$bpm_user:$bpm_pass" \
      -A "$agent" \
      -H "Cookie: CSRF-TOKEN=$csrf_token" \
      -H "X-CSRF-TOKEN: $csrf_token" \
      -H "Content-Type: application/json" \
      -d '{"values":{"clientname":"Jhon","policyno":"5553","billamount":"20050","billdate":"2017-02-29T00:00:00.000Z","claimtype":{"id":"reimbursement","name":"Cashless"},"hospitalname":"abc"},"processDefinitionId":"ClaimReviewProcess:'$1'","name":"Claim Review Process - May 21st 2017"}' \
      "$bpm_url/api/enterprise/process-instances")
    echo $( extract_id_from_json "$resps" )
}

function get_process_definition_id {
    local resp=$( curl \
      -X GET \
      -u "$bpm_user:$bpm_pass" \
      -A "$agent" \
      -H "Cookie: CSRF-TOKEN=$csrf_token" \
      -H "X-CSRF-TOKEN: $csrf_token" \
      -H "Content-Type: application/json" \
      "$bpm_url/api/enterprise/process-definitions")
    definition_Id=$( echo $resp | sed -e 's/^.*"ClaimReviewProcess:\([^"]*\)".*$/\1/' )
    echo $definition_Id
}

function assigne_to_user() {
  app_id="$1"
  echo "$app_id"
}

remeber_me=$( log_in )
test -z "$remeber_me" && echo "Dev Environment:- Error while logging into the environment" && exit 1

id1=$(bpm_create_user "Jenni" "joy" $email1 $common_pass "1")
test -z "$id1" && echo "Dev Environment:- Either Could not find user id or User already registered $email1" && exit 1
id2=$(bpm_create_user "Mike" "Rotch" $email2 $common_pass "1")
test -z "$id2" && echo "Dev Environment:- Either Could not find user id or User already registered $email2" && exit 1
id3=$(bpm_create_user "Ben" "Dover" $email3 $common_pass "1")
test -z "$id3" && echo "Dev Environment:- Either Could not find user id or User already registered $email3" && exit 1
id4=$(bpm_create_user "Mike" "Hunt" $email4 $common_pass "1")
test -z "$id4" && echo "Dev Environment:- Either Could not find user id or User already registered $email4" && exit 1
id5=$(bpm_create_user "Ivana" "Tinkle" $email5 $common_pass "1")
test -z "$id5" && echo "Dev Environment:- Either Could not find user id or User already registered $email5" && exit 1
id6=$(bpm_create_user "Anita" "Bath" $email6 $common_pass "1")
test -z "$id6" && echo "Dev Environment Either Could not find user id or User already registered $email6" && exit 1


for f in apps/*.zip
do
	echo "> App Found: - $f"
        app_id=$( bpm_import_app "$f" )
        test -z "$app_id" && echo "Could not import app or find app ID" && exit 1
        
        bpm_publish_app "$app_id"
        assigne_to_user "$app_id"

        share_resp=$( share_app $app_id $remeber_me $id1 $id2 $id3 $id4 $id5 $id6)
        test "$share_resp" != "200" && echo "Error while sharing app with the users" && exit 1

        deploy_resp=$( bpm_deploy_app $app_id $bpm_user $bpm_pass )
        test "$deploy_resp" != "200" && echo "Error while deploying app app for the user $bpm_user" && exit 1
        share_resp=$( bpm_deploy_app $app_id $email1 $common_pass )
        test "$deploy_resp" != "200" && echo "Error while deploying app app for the user $email1" && exit 1
        share_resp=$( bpm_deploy_app $app_id $email2 $common_pass )
        test "$deploy_resp" != "200" && echo "Error while deploying app app for the user $email2" && exit 1
        share_resp=$( bpm_deploy_app $app_id $email3 $common_pass )
        test "$deploy_resp" != "200" && echo "Error while deploying app app for the user $email3" && exit 1
        share_resp=$( bpm_deploy_app $app_id $email4 $common_pass )
        test "$deploy_resp" != "200" && echo "Error while deploying app app for the user $email4" && exit 1
        share_resp=$( bpm_deploy_app $app_id $email5 $common_pass )
        test "$deploy_resp" != "200" && echo "Error while deploying app app for the user $email5" && exit 1
        share_resp=$( bpm_deploy_app $app_id $email6 $common_pass )
        test "$deploy_resp" != "200" && echo "Error while deploying app app for the user $email6" && exit 1

        echo ""
        echo ""
        echo "> App $f Published and Deployed."
done

echo ""
echo "> Dev Environment:- Users created with these ids ( $id1, $id2, $id3, $id4, $id5, $id6 )."

process_def_id=$(get_process_definition_id)
test -z "$process_def_id" && echo "Could not find process definition ID" && exit 1
process_instance_ids=$(create_process "$process_def_id")
test -z "$process_instance_ids" && echo "Could not find process instance ID" && exit 1
echo "> Initiated two process instances with ids ( $process_instance_ids )"
