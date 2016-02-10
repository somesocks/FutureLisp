#!/usr/bin/env node
var FutureLisp = require('../FutureLisp');
var package = require('../package.json');
var fs = require('fs');
var program = require('commander');
program
    .version(package.version)
    .description(package.description)
    .arguments('<file>')
    .action(function (file) {
        fs.readFile(file, 'utf8', function (err, data) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            return FutureLisp(data)();
        });
    });
program.parse(process.argv);
