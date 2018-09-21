/**
 * @author WMXPY
 * @namespace Common_Agent
 * @fileoverview Class
 */

import { IAgent, IInput } from "#/declare/agent";
import * as Readline from 'readline';

export class Agent implements IAgent {
    private static _instance: Agent | null;

    private _executable: (key: IInput) => void;
    private _listening: boolean;

    public constructor() {
        this.press = this.press.bind(this);
        this._executable = console.log;
        this._listening = false;
    }

    public static get instance(): Agent {
        if (!this._instance) {
            this._instance = new Agent();
        }

        return this._instance;
    }

    public listen(executable: (key: IInput) => void): IAgent {
        if (this._listening) {
            this._executable = executable;
            return this;
        }

        if (process.stdin.setRawMode) {
            Readline.emitKeypressEvents(process.stdin);
            if (process.stdin.isTTY) process.stdin.setRawMode(true);
        }

        process.stdin.on('keypress', this.press);
        this._executable = executable;
        this._listening = true;
        return this;
    }

    public stopListen(): IAgent {
        if (!this._listening) {
            return this;
        }

        this._executable = (key: IInput) => null;
        return this;
    }

    public press(str: string, key: IInput): IAgent {
        if (key.ctrl && key.name === 'c') {
            process.exit();
        } else {
            this._executable(key);
        }
        return this;
    }
}
