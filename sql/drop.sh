#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    DROP DATABASE "template";


    DROP USER "template";
EOSQL
