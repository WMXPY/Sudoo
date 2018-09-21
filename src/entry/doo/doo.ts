/**
 * @author WMXPY
 * @namespace Doo
 * @fileoverview Index
 */

require('../../binding');
import { Agent } from "#/common/agent";
import { Current } from "#/common/agent/current";
import { IAgent, IInput } from "#/common/agent/interface";
import { Canvas } from "#/common/canvas";
import { ICanvas } from "#/common/canvas/interface";
import { END_SIGNAL, IService } from "#/service/interface";
import { Services } from "#/service/services";
import { error, ERROR_CODE } from "#/util/error";
import { suggestion } from "./print";

const doo_io = (nodePath: string, dooPath: string) => {
    const canvas: ICanvas = Canvas.instance;
    const agent: IAgent = Agent.instance;
    const service: Services = Services.instance;
    const current: Current = new Current()
        .setOnEnter((result: string) => {
            const target: IService | null = service.find(result);
            if (target) {
                const endSignal: END_SIGNAL = target.execute([]);
                canvas.exit(END_SIGNAL.SUCCEED);
            } else {
                agent.stopListen();
                canvas.exit(END_SIGNAL.FAILED);
            }
        })
        .setOnTab((result: string) => service.firstSimilar(result) || result);

    agent.listen((key: IInput) => {
        const str: string = current.input(key);
        const info: string | null = service.firstSimilar(str);
        const head: string = '> ';

        let tail: string = '';
        if (info) {
            tail += suggestion(info);
        }

        canvas.replace(head, str, tail);
        canvas.cursor(current.length + 2);
    });
};

const doo_cmd = (argv: string[]) => {
    if (argv.length < 1) {
        throw error(ERROR_CODE.PROCESS_ARGV_NOT_ENOUGH);
    }

    const service: Services = Services.instance;
    const command: string = argv.shift() as string;
    const canvas: ICanvas = Canvas.instance;

    const target: IService | null = service.find(command);
    if (target) {
        const endSignal: END_SIGNAL = target.execute(argv);
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
    if (argv.length === 0) {
        doo_io(nodePath, dooPath);
    } else {
        doo_cmd(argv);
    }
};
