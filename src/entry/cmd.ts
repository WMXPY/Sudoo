/**
 * @author WMXPY
 * @namespace Entry
 * @fileoverview CMD script
 */

import { Canvas } from "#common/canvas";
import { ICanvas } from "#declare/canvas";
import { END_SIGNAL, IPathEnvironment, IService } from "#declare/service";
import { Services } from "#service/services";
import { error, ERROR_CODE } from "#util/error";

export const executeCMDScript = (service: Services, argv: string[], env: IPathEnvironment) => {
    if (argv.length < 1) {
        throw error(ERROR_CODE.PROCESS_ARGV_NOT_ENOUGH);
    }

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
