/**
 * @author WMXPY
 * @namespace Script
 * @fileoverview Snapshot
 */

import { ISnapshotInfo, SNAPSHOT_MODE } from '#declare/snapshot';
import { spaces } from '#util/string/string';
import * as Colors from 'colors/safe';

const snapshot_head_mark = (info: ISnapshotInfo): string => {
    switch (info.mode) {
        case SNAPSHOT_MODE.ARGUMENT:
            return Colors.bgCyan(info.mode)
                + Colors.bgMagenta('+' + info.args.length);
        case SNAPSHOT_MODE.EMPTY:
        case SNAPSHOT_MODE.GUESS:
            return Colors.bgYellow(SNAPSHOT_MODE.GUESS);
        case SNAPSHOT_MODE.MATCHED:
            return Colors.bgGreen(info.mode);
        case SNAPSHOT_MODE.ERROR:
        default:
            return Colors.bgRed(info.mode);
    }
};

const snapshot_head_intelligence = (str: string, done: boolean): string => {
    if (done) return Colors.green(str);
    else return Colors.red(str);
};

const snapshot_head = (info: ISnapshotInfo): string => {
    return snapshot_head_mark(info) +
        (info.autocomplete
            ? snapshot_head_intelligence(
                info.autocomplete.value,
                info.autocomplete.matched,
            )
            : '');
};

const snapshot_body = (info: ISnapshotInfo): string => {
    return '>' + spaces(1) + info.input;
};

export const print_snapshot = (info: ISnapshotInfo): string => {
    return snapshot_head(info)
        + '\n'
        + snapshot_body(info);
};
