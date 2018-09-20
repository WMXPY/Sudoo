/**
 * @author WMXPY
 * @namespace Mock_Common_Canvas
 * @fileoverview Class
 */

import { ICanvas } from "#/common/canvas/interface";

export class MockCanvas implements ICanvas {
    private _result: string[];

    public constructor() {
        this._result = [];
    }

    public draw(...contents: string[]) {
        this._result.push(...contents);
        return this;
    }

    public test_result() {
        return this._result;
    }
}
