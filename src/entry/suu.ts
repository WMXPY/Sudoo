/**
 * @author WMXPY
 * @namespace Suu
 * @fileoverview Index
 */

require('../binding');
import { IPathEnvironment } from "#declare/service";
import { Services } from "#service/services";
import { error, ERROR_CODE } from "#util/error";
import { executeCMDScript } from "./cmd";
import { executeIOScript } from "./io";

export const suu = (rawArgv: string[]) => {
    const argv: string[] = [...rawArgv];
    if (argv.length < 2) {
        throw error(ERROR_CODE.PROCESS_ARGV_NOT_ENOUGH);
    }
    const nodePath: string = argv.shift() as string;
    const suPath: string = argv.shift() as string;
    const service: Services = Services.SUUInstance;
    const env: IPathEnvironment = {
        su: suPath,
        node: nodePath,
        cwd: process.cwd(),
    };
    if (argv.length === 0) {
        executeIOScript(service, env);
    } else {
        executeCMDScript(service, argv, env);
    }
};
