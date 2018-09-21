/**
 * @author WMXPY
 * @namespace Common_Current
 * @fileoverview Class
 */

import { IInput, SPECIAL_INPUT_NAME } from "#/declare/agent";

export class Current {
    private _current: string;
    private _onEnter: (result: string) => void;
    private _onTab: (result: string) => string;

    public constructor() {
        this._current = '';
        this._onEnter = console.log;
        this._onTab = (result: string) => result;
    }

    public get length(): number {
        return this._current.length;
    }

    public setOnEnter(func: (result: string) => void): Current {
        this._onEnter = func;
        return this;
    }

    public setOnTab(func: (result: string) => string): Current {
        this._onTab = func;
        return this;
    }

    public input(input: IInput): string {
        if (input.name) {
            switch (input.name) {
                case SPECIAL_INPUT_NAME.BACKSPACE:
                    this._current = this._current.substring(0, this._current.length - 1);
                    return this._current;
                case SPECIAL_INPUT_NAME.ENTER:
                    this._onEnter(this._current);
                    this._current = '';
                    return this._current;
                case SPECIAL_INPUT_NAME.TAB:
                    this._current = this._onTab(this._current);
                    return this._current;
            }
        }

        this._current += input.sequence;
        return this._current;
    }
}
