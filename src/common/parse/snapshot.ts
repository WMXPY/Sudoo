/**
 * @author WMXPY
 * @namespace Common_Snapshot
 * @fileoverview Parser
 */

import { IService } from "#declare/service";
import { ISnapshotInfo, SNAPSHOT_MODE } from "#declare/snapshot";
import { Services } from "#service/services";
import { splitInput } from "#util/string/string";

const lastElement: <T>(arr: T[]) => T =
    <T>(arr: T[]): T => arr[arr.length - 1];

export const generateSnapshotInfo = (input: string, service: Services): ISnapshotInfo => {
    const split: string[] = splitInput(input);
    const command: string = split.shift() || '';

    if (split.length > 0) {
        const last: string = lastElement(split);
        return {
            autocomplete: last,
            args: split.map((arg) => ({ name: arg, valid: true })),
            input,
            mode: SNAPSHOT_MODE.ARGUMENT,
        };
    } else {
        const rummaged: IService | null = service.find(command);
        if (rummaged) {
            return {
                args: [],
                input,
                mode: SNAPSHOT_MODE.MATCHED,
            };
        }
        const expect: string = service.firstMostClose(command);
        return {
            autocomplete: expect,
            args: [],
            input,
            mode: SNAPSHOT_MODE.GUESS,
        };
    }
};

