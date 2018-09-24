/**
 * @author WMXPY
 * @namespace Service
 * @fileoverview Services
 */

import { IService } from "#declare/service";
import { ServiceNote } from "./note/note";

const getServices = (): IService[] => [
    new ServiceNote(),
];

export class Services {
    private static _instance: Services | null;

    private _services: IService[];

    public constructor(services: IService[]) {
        this._services = services;
    }

    public find(command: string): IService | null {
        for (let service of this._services) {
            if (service.command === command) {
                return service;
            }
        }
        return null;
    }

    public firstSimilar(cut: string): string | null {
        for (let service of this._services) {
            if (service.command.includes(cut)) {
                return service.command;
            }
        }
        return null;
    }

    public static get instance(): Services {
        if (!this._instance) {
            this._instance = new Services(getServices());
        }

        return this._instance;
    }
}
