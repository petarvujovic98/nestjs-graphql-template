#!/bin/bash
set -e

sudo -u postgres psql -v ON_ERROR_STOP=1 <<-EOSQL
    DROP DATABASE "template";


    DROP USER "template";
EOSQL
