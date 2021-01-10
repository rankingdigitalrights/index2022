#!/usr/bin/env bash

set -Eeuo pipefail
trap cleanup SIGINT SIGTERM ERR EXIT

script_dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd -P)

usage() {
  cat <<EOF
Usage: $(basename "${BASH_SOURCE[0]}") [-h] [-v] [-p]

Deploy your local version of the Index. It deploys as a default to staging.

Available options:

-h, --help       Print this help and exit
-v, --verbose    Print script debug info
-p, --production Deploy to production instead of staging
EOF
  exit
}

cleanup() {
  trap - SIGINT SIGTERM ERR EXIT
  ### script cleanup here
  [[ -d out ]] && rm -rf out
}

setup_colors() {
  if [[ -t 2 ]] && [[ -z "${NO_COLOR-}" ]] && [[ "${TERM-}" != "dumb" ]]; then
    NOFORMAT='\033[0m' RED='\033[0;31m' GREEN='\033[0;32m' ORANGE='\033[0;33m' BLUE='\033[0;34m' PURPLE='\033[0;35m' CYAN='\033[0;36m' YELLOW='\033[1;33m'
  else
    NOFORMAT='' RED='' GREEN='' ORANGE='' BLUE='' PURPLE='' CYAN='' YELLOW=''
  fi
}

msg() {
  echo >&2 -e "${1-}"
}

msg_error() {
  msg "${RED}error${NOFORMAT} - ${1}"
}

msg_info() {
  msg "${CYAN}info${NOFORMAT}  - ${1}"
}

die() {
  local msg=$1
  local code=${2-1} # default exit status 1
  msg_error "$msg"
  exit "$code"
}

parse_params() {
  # default values of variables set from params
  prod=0
  base_path="index2020-stg"

  while :; do
    case "${1-}" in
      -h | --help) usage ;;
      -v | --verbose) set -x ;;
      --no-color) NO_COLOR=1 ;;
      -p | --production) prod=1 ;;
      -?*) die "Unknown option: $1" ;;
      *) break ;;
    esac
    shift
  done

  args=("$@")

  ### check required params and arguments
  [[ "${prod}" -eq "1" ]] && base_path="index2020"

  return 0
}

parse_params "$@"
setup_colors

### script logic here

# The deploy path is the target directory on the remote host.
now="$(date +'%Y-%m-%d_%H-%M-%S')"
deploy_path="~/deploys/${base_path}-${now}"

msg_info "clearing stale builds"
yarn -s clean || die "failing to clean local environment"

BASE_PATH="${base_path}" yarn -s build
BASE_PATH="${base_path}" yarn -s export

msg_info "deploying to remote host"
rsync -qaz out/ "ranking5@rankingdigitalrights.org:${deploy_path}" || die "failed to sync to the remote host"
ssh -q ranking5@rankingdigitalrights.org "ln -sfn ${deploy_path} public_html/${base_path}"
