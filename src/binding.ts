/**
 * @author WMXPY
 * @fileoverview Binding
 */

import * as ModuleAlias from 'module-alias';
import * as Path from 'path';

((MODULE_ALIAS: string | undefined) => {
    if (MODULE_ALIAS) return; else process.env.NODE_MODULE_ALIAS = 'TRUE';
    const here: string = Path.join(__dirname, ...process.env.NODE_ENV === 'test' ? [] : ['..', 'dist']);
    ModuleAlias.addAliases({
        "#": here,
    });
})(process.env.NODE_MODULE_ALIAS);
