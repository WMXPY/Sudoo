/**
 * @author WMXPY
 * @namespace Service_Install
 * @description Install
 * @fileoverview Install
 */

import { Canvas } from "#common/canvas";
import { ICanvas } from "#declare/canvas";
import { AbstractService, DATA_TYPE, END_SIGNAL, IArgumentIntelligenceResult, IArgumentPattern, IService } from "#declare/service";

interface IProps {
    package: string;
}

export class ServiceInstall extends AbstractService<IProps> implements IService {
    public readonly commands: string[] = ['install'];
    public readonly pattern: IArgumentPattern[] = [
        {
            name: 'package',
            type: DATA_TYPE.STRING,
        },
    ];

    public execute(props: IProps): END_SIGNAL {
        const canvas: ICanvas = Canvas.instance;
        canvas.drawObject(props);

        return END_SIGNAL.SUCCEED;
    }

    public intelligence(key: string, input: string): IArgumentIntelligenceResult {
        if (key === 'package') {
            return {
                description: 'package to install',
            };
        }
        return {};
    }
}
