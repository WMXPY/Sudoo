#!/usr/bin/env node

var suu = require('../dist/entry/suu');

try {
    suu.suu(process.argv);
} catch (err) {
    console.log(err.message);
    process.exit();
}