#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE USER "template" WITH PASSWORD '';


    ALTER ROLE "template"
    SET client_encoding TO 'utf8';


    ALTER ROLE "template"
    SET default_transaction_isolation TO 'read committed';


    ALTER ROLE "template"
    SET timezone TO 'UTC';


    CREATE DATABASE "template";

    GRANT ALL PRIVILEGES ON DATABASE "template" TO "template";
EOSQL
