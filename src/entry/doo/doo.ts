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
import { suggestion } from "./print";

export const doo = () => {
    const canvas: ICanvas = Canvas.instance;
    const agent: IAgent = Agent.instance;
    const service: Services = Services.instance;
    const current: Current = new Current()
        .setOnEnter((result: string) => {
            const target: IService | null = service.find(result);
            if (target) {
                const endSignal: END_SIGNAL = target.execute([]);
                process.exit(endSignal);
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
