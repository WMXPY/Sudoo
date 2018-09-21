/**
 * @author WMXPY
 * @namespace Mock_Common_Canvas
 * @fileoverview Class
 */

import { ICanvas } from "#/declare/canvas";

export class MockCanvas implements ICanvas {
    private _result: string[];

    public constructor() {
        this._result = [];
    }

    public draw(...contents: string[]) {
        this._result.push(...contents);
        return this;
    }

    public enter() {
        this._result.push('enter');
        return this;
    }

    public replace() {
        this._result.push('replace');
        return this;
    }

    public clear() {
        this._result.push('clear');
        return this;
    }

    public cursor() {
        this._result.push('cursor');
        return this;
    }

    public exit() {
        this._result.push('exit');
    }

    public test_result() {
        return this._result;
    }
}
