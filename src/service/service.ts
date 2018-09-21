/**
 * @author WMXPY
 * @namespace Service
 * @fileoverview Service
 */

import { END_SIGNAL, IService } from "./interface";

export abstract class Service implements IService {
    public readonly command?: string;

    public execute(args: string[]): END_SIGNAL {
        return END_SIGNAL.FAILED;
    }
}
