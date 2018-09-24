#!/usr/bin/env node

var su = require('../dist/entry/su');

try {
    su.su(process.argv);
} catch (err) {
    console.log(err.message);
    process.exit();
}