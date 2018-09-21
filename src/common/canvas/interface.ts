/**
 * @author WMXPY
 * @namespace Common_Canvas
 * @fileoverview Interface
 */

export interface ICanvas {
    draw: (...contents: string[]) => ICanvas;
    enter: () => ICanvas;
    replace: (...contents: string[]) => ICanvas;
    cursor: (place: number) => ICanvas;
    clear: () => ICanvas;
}
