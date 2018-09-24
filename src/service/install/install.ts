/**
 * @author WMXPY
 * @namespace Service_Install
 * @description Install
 * @fileoverview Install
 */

import { Canvas } from "#common/canvas";
import { ICanvas } from "#declare/canvas";
import { AbstractService, ArgPatternMap, ARGUMENT_TYPE, END_SIGNAL, IService } from "#declare/service";

export class ServiceInstall extends AbstractService implements IService {
    public readonly commands: string[] = ['install'];
    public readonly pattern: ArgPatternMap = {
        package: { type: ARGUMENT_TYPE.STRING },
    };

    public execute(args: string[]): END_SIGNAL {
        const canvas: ICanvas = Canvas.instance;
        canvas.drawObject(args);

        return END_SIGNAL.SUCCEED;
    }
}
