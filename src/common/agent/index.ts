/**
 * @author WMXPY
 * @namespace Common_Agent
 * @fileoverview Class
 */

import { IAgent, IInput } from "#/common/agent/interface";
import * as Readline from 'readline';

export class Agent implements IAgent {
    private static _instance: Agent | null;

    private _executable: (key: IInput) => void;

    public constructor() {
        this.press = this.press.bind(this);
        this._executable = console.log;
    }

    public static get instance(): Agent {
        if (!this._instance) {
            this._instance = new Agent();
        }

        return this._instance;
    }

    public listen(executable: (key: IInput) => void): IAgent {
        if (process.stdin.setRawMode) {
            Readline.emitKeypressEvents(process.stdin);
            process.stdin.setRawMode(true);
        }

        process.stdin.on('keypress', this.press);
        this._executable = executable;
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
