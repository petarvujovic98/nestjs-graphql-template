#!/bin/bash
set -e

sudo -u postgres psql -v ON_ERROR_STOP=1 --dbname "template" <<-EOSQL
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
EOSQL