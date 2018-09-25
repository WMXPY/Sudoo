/**
 * @author WMXPY
 * @namespace Common_Snapshot
 * @fileoverview Parser
 */

import { IService } from "#declare/service";
import { ISnapshotInfo, SNAPSHOT_MODE } from "#declare/snapshot";
import { Services } from "#service/services";
import { lastElement, splitInput } from "#util/string/string";

export const generateSnapshotInfo = (input: string, service: Services): ISnapshotInfo => {
    const split: string[] = splitInput(input);
    const command: string = split.shift() || '';

    if (split.length > 0) {
        const last: string = lastElement(split);
        return {
            autocomplete: {
                value: last,
                matched: false,
            },
            args: split.map((arg) => ({ name: arg, valid: true })),
            input,
            mode: SNAPSHOT_MODE.ARGUMENT,
        };
    } else {
        const rummaged: IService | null = service.find(command);
        if (rummaged) {
            return {
                autocomplete: {
                    value: command,
                    matched: true,
                },
                args: [],
                input,
                mode: SNAPSHOT_MODE.MATCHED,
            };
        }
        const { closest, distance } = service.firstMostClose(command);
        return {
            autocomplete: {
                value: closest,
                matched: false,
                distance,
            },
            args: [],
            input,
            mode: SNAPSHOT_MODE.GUESS,
        };
    }
};

