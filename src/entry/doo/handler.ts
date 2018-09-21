/**
 * @author WMXPY
 * @namespace Doo
 * @fileoverview Handler
 */

import { Agent } from "#/common/agent";
import { Current } from "#/common/agent/current";
import { Canvas } from "#/common/canvas";
import { IAgent, IInput, SPECIAL_INPUT_NAME } from "#/declare/agent";
import { ICanvas } from "#/declare/canvas";
import { END_SIGNAL, ICommand, IPathEnvironment, IService } from "#/declare/service";
import { Services } from "#/service/services";
import { stringToArgs } from "#/util/string/string";
import { print_header, print_suggestion, print_takeingMore } from "./print";

export const execute = (
    service: IService,
    command: ICommand,
    env: IPathEnvironment,
): void => {
    const canvas: ICanvas = Canvas.instance;
    const signal: END_SIGNAL = service.execute(command.args, env);

    switch (signal) {
        case END_SIGNAL.FAILED:
        case END_SIGNAL.SUCCEED:
            canvas.enter();
            process.exit(signal);
            return;
        case END_SIGNAL.MORE_ARGS:
            executeWithMoreArgs(service, command, env);
            return;
    }
};

export const executeWithMoreArgs = (
    service: IService,
    command: ICommand,
    env: IPathEnvironment,
): void => {
    const canvas: ICanvas = Canvas.instance;
    const agent: IAgent = Agent.instance;
    const current: Current = new Current()
        .setOnEnter((str: string) => {
            canvas.enter();
            const newCommand: ICommand = {
                ...command,
                args: [...command.args, str],
            };

            execute(service, newCommand, env);
        });
    agent.listen(listenMoreArgsCurrent(current));

    canvas.enter();
    canvas.draw(print_takeingMore(command));
    canvas.enter();
    canvas.draw(print_header());
};

export const listenCommandWithArgsCurrent = (current: Current) => {
    const service: Services = Services.instance;
    const canvas: ICanvas = Canvas.instance;

    return (key: IInput) => {
        const str: string = current.input(key);

        if (key.name === SPECIAL_INPUT_NAME.ENTER) {
            return;
        }

        const command = stringToArgs(str);
        const info: string | null = service.firstSimilar(command.command);

        let tail: string = '';
        if (info) {
            tail += print_suggestion(info, command.args.length);
        }

        canvas.replace(print_header(str, tail));
        canvas.cursor(current.length + 2);
    };
};

export const listenMoreArgsCurrent = (current: Current) => {
    const canvas: ICanvas = Canvas.instance;

    return (key: IInput) => {
        const str: string = current.input(key);

        canvas.replace(print_header(str));
        canvas.cursor(current.length + 2);
    };
};
