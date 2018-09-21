/**
 * @author WMXPY
 * @namespace Common_Current
 * @fileoverview Class
 */

import { IInput, SPECIAL_INPUT_NAME } from "#/common/agent/interface";

export class Current {
    private _current: string;
    private _done: (result: string) => void;

    public constructor(done: (result: string) => void) {
        this._current = '';
        this._done = done;
    }

    public get length(): number {
        return this._current.length;
    }

    public input(input: IInput): string {
        if (input.name) {
            switch (input.name) {
                case SPECIAL_INPUT_NAME.BACKSPACE:
                    this._current = this._current.substring(0, this._current.length - 1);
                    return this._current;
                case SPECIAL_INPUT_NAME.ENTER:
                    this._done(this._current);
                    this._current = '';
                    return this._current;
                case SPECIAL_INPUT_NAME.TAB:
                    this._current = this._current += '  ';
                    return this._current;
            }
        }

        this._current += input.sequence;
        return this._current;
    }
}
