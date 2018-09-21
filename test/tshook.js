/**
 * @author WMXPY
 * @fileoverview TS-HOOK
 */

const ts_node = require("ts-node");
const ModuleAlias = require('module-alias');
const Path = require('path');

((MODULE_ALIAS) => {
    process.env = Object.assign(process.env, {
        NODE_ENV: 'test'
    });
    ts_node.register({
        project: 'typescript/tsconfig.test.json'
    });
    if (MODULE_ALIAS) return;
    else process.env.NODE_MODULE_ALIAS_SUDOO = 'TRUE';
    const here = Path.join(__dirname, '..', 'src');
    ModuleAlias.addAliases({
        "#": here,
        "#/common": Path.join(here, 'common'),
        "#/declare": Path.join(here, 'declare'),
        "#/service": Path.join(here, 'service'),
        "#/util": Path.join(here, 'util'),
    });
})(process.env.NODE_MODULE_ALIAS_SUDOO);