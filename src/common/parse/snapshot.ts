/**
 * @author WMXPY
 * @namespace Common_Snapshot
 * @fileoverview Parser
 */

import { IArgumentIntelligenceResult, IArgumentPattern, IService } from "#declare/service";
import { ISnapshotInfo, SNAPSHOT_MODE } from "#declare/snapshot";
import { Services } from "#service/services";
import { lastElement, splitInput } from "#util/string/string";

const generateCommandSnapshotInfo = (input: string, service: Services): ISnapshotInfo => {
    const args: string[] = splitInput(input);
    const command: string = args.shift() || '';

    const rummaged: IService | null = service.find(command);
    if (rummaged) {
        return {
            args: [],
            command,
            input,
            mode: SNAPSHOT_MODE.MATCHED,
            options: {},
            pattern: rummaged.pattern,
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
        options: {},
    };
};

const generateArgumentSnapshotInfo = (input: string, service: Services): ISnapshotInfo => {
    const args: string[] = splitInput(input);
    const command: string = args.shift() || '';

    const rummaged: IService | null = service.find(command);
    const position: number = args.length - 1;
    if (!rummaged || position < 0) {
        return {
            args: [],
            input,
            mode: SNAPSHOT_MODE.ERROR,
            options: {},
        };
    }

    const last: string = lastElement(args);

    const argPattern: IArgumentPattern | undefined = rummaged.pattern[position];
    const intelligence: IArgumentIntelligenceResult =
        rummaged.intelligence(
            argPattern ? argPattern.name : '',
            args[position],
        );

    return {
        autocomplete: {
            value: last,
            matched: false,
        },
        args,
        command,
        intelligence,
        input,
        mode: SNAPSHOT_MODE.ARGUMENT,
        options: {},
        pattern: rummaged.pattern,
    };
};

export const generateSnapshotInfo = (input: string, service: Services): ISnapshotInfo => {
    const args: string[] = splitInput(input);
    const command: string = args.shift() || '';
    if (args.length > 0) return generateArgumentSnapshotInfo(input, service);
    else return generateCommandSnapshotInfo(input, service);
};

