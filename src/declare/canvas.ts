/**
 * @author WMXPY
 * @namespace Declare
 * @fileoverview Common_Canvas
 */

import { END_SIGNAL } from "#/declare/service";

export interface ICanvas {
    clear: (lines?: number) => ICanvas;
    cursor: (place: number, top?: boolean) => ICanvas;
    draw: (...contents: string[]) => ICanvas;
    drawObject: (object: any) => ICanvas;
    enter: () => ICanvas;
    exit: (signal: END_SIGNAL, info?: string) => void;
    replace: (...contents: string[]) => ICanvas;
}
