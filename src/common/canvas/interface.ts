/**
 * @author WMXPY
 * @namespace Common_Canvas
 * @fileoverview Interface
 */

export interface ICanvas {
    draw: (...contents: string[]) => ICanvas;
}
