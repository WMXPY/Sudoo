/**
 * @author WMXPY
 * @namespace Service_Note
 * @description Note
 * @fileoverview Note
 */

import { Canvas } from "#common/canvas";
import { ICanvas } from "#declare/canvas";
import { AbstractService, ArgPatternMap, END_SIGNAL, IService } from "#declare/service";

export class ServiceNote extends AbstractService implements IService {
    public readonly commands: string[] = ['note'];
    public readonly pattern: ArgPatternMap = {};

    public execute(args: string[]): END_SIGNAL {
        const canvas: ICanvas = Canvas.instance;
        canvas.drawObject(args);

        if (args.length >= 3) {
            return END_SIGNAL.SUCCEED;
        } else {
            return END_SIGNAL.MORE_ARGS;
        }
    }
}
