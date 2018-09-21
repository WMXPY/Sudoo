/**
 * @author WMXPY
 * @namespace Declare
 * @fileoverview Common_Canvas
 */

import { END_SIGNAL } from "#/declare/service";

export interface ICanvas {
    draw: (...contents: string[]) => ICanvas;
    enter: () => ICanvas;
    replace: (...contents: string[]) => ICanvas;
    cursor: (place: number) => ICanvas;
    clear: () => ICanvas;
    exit: (signal: END_SIGNAL, info?: string) => void;
}
