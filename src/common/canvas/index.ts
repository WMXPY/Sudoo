/**
 * @author WMXPY
 * @namespace Common_Canvas
 * @fileoverview Class
 */

import { ICanvas } from "#/common/canvas/interface";

export class Canvas implements ICanvas {
    public draw(...contents: string[]) {
        console.log(...contents);
        return this;
    }
}
