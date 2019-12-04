#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

eval GNU=false

echo $DIR

cd `dirname $0`


show_help() {
    echo "Usage: update-commit-sha.sh"
    echo ""
    echo "The script update the latest commit sha as part of the package.json"
}

update_project_sha(){
  ISH_KEY=$(git rev-parse HEAD)
  echo "====== commit sha ${ISH_KEY} ======"

  sed "${sedi[@]}" "s/\"commit\": \".*\"/\"commit\": \"${ISH_KEY}\"/g"  $DIR/../package.json

}

gnu_mode() {
    echo "====== GNU MODE ====="
    GNU=true
}

while [[ $1  == -* ]]; do
    case "$1" in
      -h|--help|-\?) show_help; exit 0;;
      -gnu) gnu_mode; shift;;
      -*) shift;;
    esac
done

if $GNU; then
 sedi='-i'
else
 sedi=('-i' '')
fi

echo "====== PACKAGE UPDATE  ======"

update_project_sha
