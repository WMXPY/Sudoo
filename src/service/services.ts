/**
 * @author WMXPY
 * @namespace Service
 * @fileoverview Services
 */

import { IService } from "#declare/service";
import { ServiceInstall } from "#service/install/install";
import { similar } from "#util/string/similarity";
import { ServiceNote } from "./note/note";

const getSUServices = (): IService[] => [
    new ServiceInstall(),
    new ServiceNote(),
];

const getDOOServices = (): IService[] => [
    new ServiceNote(),
];

export class Services {
    private static _suu_instance: Services | null;
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

    public firstMostClose(cut: string): string {
        let closest: string = cut;
        let closestLength: number = Number.MAX_SAFE_INTEGER;
        for (let service of this._services) {
            for (let command of service.commands) {
                const similarity: number = similar(cut, command);
                if (similarity < closestLength) {
                    closest = command;
                    closestLength = similarity;
                }
            }
        }
        return closest;
    }

    public static get SUUInstance(): Services {
        if (!this._suu_instance) {
            this._suu_instance = new Services(getSUServices());
        }

        return this._suu_instance;
    }

    public static get DOOInstance(): Services {
        if (!this._doo_instance) {
            this._doo_instance = new Services(getDOOServices());
        }

        return this._doo_instance;
    }
}
