/**
 * @author WMXPY
 * @namespace Doo
 * @fileoverview Index
 */

require('../../binding');
import { Agent } from "#/common/agent";
import { Current } from "#/common/agent/current";
import { Canvas } from "#/common/canvas";
import { IAgent } from "#/declare/agent";
import { ICanvas } from "#/declare/canvas";
import { END_SIGNAL, ICommand, IPathEnvironment, IService } from "#/declare/service";
import { Services } from "#/service/services";
import { error, ERROR_CODE } from "#/util/error";
import { stringToArgs } from "#/util/string/string";
import { execute, listenCommandWithArgsCurrent } from "./handler";
import { print_header } from "./print";

const doo_io = (env: IPathEnvironment) => {
    const canvas: ICanvas = Canvas.instance;
    const agent: IAgent = Agent.instance;
    const service: Services = Services.instance;
    const current: Current = new Current()
        .setOnEnter((str: string) => {
            canvas.replace(print_header(str));
            const command: ICommand = stringToArgs(str);

            const target: IService | null = service.find(command.command);
            if (target) {
                canvas.enter();
                execute(target, command, env);
            } else {
                canvas.exit(END_SIGNAL.FAILED);
            }
        })
        .setOnTab((result: string) => service.firstSimilar(result) || result);

    canvas.draw(print_header());
    agent.listen(listenCommandWithArgsCurrent(current));
};

const doo_cmd = (argv: string[], env: IPathEnvironment) => {
    if (argv.length < 1) {
        throw error(ERROR_CODE.PROCESS_ARGV_NOT_ENOUGH);
    }

    const service: Services = Services.instance;
    const command: string = argv.shift() as string;
    const canvas: ICanvas = Canvas.instance;

    const target: IService | null = service.find(command);
    if (target) {
        const endSignal: END_SIGNAL = target.execute(argv, env);
        canvas.exit(END_SIGNAL.SUCCEED);
    } else {
        canvas.exit(END_SIGNAL.FAILED);
    }
};

export const doo = (rawArgv: string[]) => {
    const argv: string[] = [...rawArgv];
    if (argv.length < 2) {
        throw error(ERROR_CODE.PROCESS_ARGV_NOT_ENOUGH);
    }
    const nodePath: string = argv.shift() as string;
    const dooPath: string = argv.shift() as string;
    const env: IPathEnvironment = {
        doo: dooPath,
        node: nodePath,
        cwd: process.cwd(),
    };
    if (argv.length === 0) {
        doo_io(env);
    } else {
        doo_cmd(argv, env);
    }
};
