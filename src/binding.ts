/**
 * @author WMXPY
 * @fileoverview Binding
 */

import * as ModuleAlias from 'module-alias';
import * as Path from 'path';

((MODULE_ALIAS: string | undefined) => {
    if (MODULE_ALIAS) return; else process.env.NODE_MODULE_ALIAS_SUDOO = 'TRUE';
    const here: string = Path.join(__dirname, '..', 'dist');
    ModuleAlias.addAliases({
        "#": here,
        "#/common": Path.join(here, 'common'),
    });
})(process.env.NODE_MODULE_ALIAS_SUDOO);
