/**
 * @author WMXPY
 * @namespace Service_Note
 * @description Note
 * @fileoverview Note
 */

import { AbstractService, END_SIGNAL, IService } from "../interface";

export class ServiceNote extends AbstractService implements IService {
    public readonly command: string = 'note';

    public execute(args: string[]): END_SIGNAL {
        return END_SIGNAL.SUCCEED;
    }
}
