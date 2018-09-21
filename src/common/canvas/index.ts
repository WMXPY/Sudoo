/**
 * @author WMXPY
 * @namespace Common_Canvas
 * @fileoverview Class
 */

import { ICanvas } from "#/common/canvas/interface";

export class Canvas implements ICanvas {
    private static _instance: Canvas | null;

    private _stream: NodeJS.WritableStream;

    private _lastDraw: string;

    public constructor() {
        this._stream = process.stdout;
        this._lastDraw = '';
    }

    public static get instance(): Canvas {
        if (!this._instance) {
            this._instance = new Canvas();
        }

        return this._instance;
    }

    public draw(...contents: string[]): ICanvas {
        const draw: string = contents.join(',');
        this._lastDraw = draw;
        this._stream.write(draw);
        return this;
    }

    public enter(): ICanvas {
        this._stream.write('\n');
        return this;
    }

    public replace(...contents: string[]): ICanvas {
        this.cursor(0);
        this.draw(...contents);
        this.clear();
        return this;
    }

    public cursor(place: number): ICanvas {
        (this._stream as any).cursorTo(place);
        return this;
    }

    public clear(): ICanvas {
        (this._stream as any).clearLine(1);
        return this;
    }
}
