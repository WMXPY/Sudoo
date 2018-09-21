/**
 * @author WMXPY
 * @namespace Service
 * @description Note
 * @fileoverview Note
 */

import { command } from "../decorator";
import { END_SIGNAL, IService } from "../interface";
import { Service } from "../service";

@command('note')
export class ServiceNote extends Service implements IService {
    public execute(args: string[]): END_SIGNAL {
        return END_SIGNAL.SUCCEED;
    }
}
