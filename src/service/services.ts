/**
 * @author WMXPY
 * @namespace Service
 * @fileoverview Services
 */

import { IService } from "#declare/service";
import { ServiceInstall } from "#service/install/install";
import { ServiceNote } from "./note/note";

const getSUServices = (): IService[] => [
    new ServiceInstall(),
];

const getDOOServices = (): IService[] => [
    new ServiceNote(),
];

export class Services {
    private static _su_instance: Services | null;
    private static _doo_instance: Services | null;

    private _services: IService[];

    public constructor(services: IService[]) {
        this._services = services;
    }

    public find(command: string): IService | null {
        for (let service of this._services) {
            if (service.commands.includes(command)) {
                return service;
            }
        }
        return null;
    }

    public firstSimilar(cut: string): string | null {
        for (let service of this._services) {
            for (let command of service.commands) {
                if (command.includes(cut)) {
                    return command;
                }
            }
        }
        return null;
    }

    public static get SUInstance(): Services {
        if (!this._su_instance) {
            this._su_instance = new Services(getSUServices());
        }

        return this._su_instance;
    }

    public static get DOOInstance(): Services {
        if (!this._doo_instance) {
            this._doo_instance = new Services(getDOOServices());
        }

        return this._doo_instance;
    }
}
