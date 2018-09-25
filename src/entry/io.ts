/**
 * @author WMXPY
 * @namespace Entry
 * @fileoverview IO script
 */

import { Agent } from "#common/agent";
import { Current } from "#common/agent/current";
import { Canvas } from "#common/canvas";
import { generateSnapshotInfo } from "#common/parse/snapshot";
import { IAgent } from "#declare/agent";
import { ICanvas } from "#declare/canvas";
import { END_SIGNAL, ICommand, IPathEnvironment, IService } from "#declare/service";
import { SNAPSHOT_MODE } from "#declare/snapshot";
import { execute, listenCommandWithArgsCurrent } from "#script/handler";
import { print_snapshot } from "#script/snapshot";
import { Services } from "#service/services";
import { stringToArgs } from "#util/string/string";

export const executeIOScript = (service: Services, env: IPathEnvironment) => {
    const canvas: ICanvas = Canvas.instance;
    const agent: IAgent = Agent.instance;
    const current: Current = new Current()
        .setOnEnter((str: string) => {
            const snapshot = generateSnapshotInfo(str, service);
            canvas.replace(print_snapshot(snapshot));
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

    canvas.draw(print_snapshot({
        args: [],
        input: '',
        mode: SNAPSHOT_MODE.EMPTY,
    }));
    agent.listen(listenCommandWithArgsCurrent(service, current));
};
