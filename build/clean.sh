#!/usr/bin/env bash

if [ -e index.html ] && [ -e package.json ] && [ -e build/clean.sh ]
then
    rm -fv selenium-debug.log
    rm -fv test/e2e/reports/*
    rm -rfv test/unit/coverage/*
else
    echo "nok"
fi
