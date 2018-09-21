/**
 * @author WMXPY
 * @namespace Common_Canvas
 * @fileoverview Class
 */

import { ICanvas } from "#/common/canvas/interface";

export class Canvas implements ICanvas {
    private static _instance: Canvas | null;

    public static get instance(): Canvas {
        if (!this._instance) {
            this._instance = new Canvas();
        }

        return this._instance;
    }

    public draw(...contents: string[]): ICanvas {
        console.log(...contents);
        return this;
    }
}
