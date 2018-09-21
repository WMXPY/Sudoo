/**
 * @author WMXPY
 * @namespace Common_Canvas
 * @fileoverview Interface
 */

import { END_SIGNAL } from "#/service/interface";

export interface ICanvas {
    draw: (...contents: string[]) => ICanvas;
    enter: () => ICanvas;
    replace: (...contents: string[]) => ICanvas;
    cursor: (place: number) => ICanvas;
    clear: () => ICanvas;
    exit: (signal: END_SIGNAL, info?: string) => void;
}
