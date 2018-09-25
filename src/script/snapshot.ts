/**
 * @author WMXPY
 * @namespace Script
 * @fileoverview Snapshot
 */

import { IArgumentPattern, IArgumentIntelligenceResult } from '#declare/service';
import { ISnapshotInfo, ISnapshotInfoArg, SNAPSHOT_MODE } from '#declare/snapshot';
import { spaces } from '#util/string/string';
import * as Colors from 'colors/safe';

const snapshot_head_mark_args = (args: ISnapshotInfoArg[], pattern?: IArgumentPattern[]) => {
    if (!pattern) {
        return '';
    }

    if (args.length === pattern.length) {
        return Colors.bgGreen(args.length + '/' + pattern.length);
    } else if (args.length < pattern.length) {
        return Colors.bgCyan(args.length + '/' + pattern.length);
    } else {
        return Colors.bgRed(args.length + '/' + pattern.length);
    }
};

const snapshot_head_mark = (info: ISnapshotInfo): string => {
    switch (info.mode) {
        case SNAPSHOT_MODE.ARGUMENT:
            return Colors.bgBlue(info.mode)
                + ' '
                + (info.command ? Colors.bgMagenta(info.command) : '')
                + ' '
                + snapshot_head_mark_args(info.args, info.pattern);
        case SNAPSHOT_MODE.EMPTY:
        case SNAPSHOT_MODE.GUESS:
            return Colors.bgYellow(SNAPSHOT_MODE.GUESS);
        case SNAPSHOT_MODE.MATCHED:
            return Colors.bgGreen(info.mode)
                + ' '
                + (info.command ? Colors.bgMagenta(info.command) : '')
                + ' '
                + snapshot_head_mark_args(info.args, info.pattern);
        case SNAPSHOT_MODE.ERROR:
        default:
            return Colors.bgRed(info.mode);
    }
};

const snapshot_head_argument_key = (key: string): string => {
    return '';
};

const snapshot_head_intelligence = (str: string, done: boolean, distance?: number): string => {
    if (done) return Colors.green(str);
    else if (distance !== undefined && distance < 10) return Colors.red(str + '|' + distance);
    else if (distance !== undefined) return Colors.red(str + '|?');
    else return Colors.red(str);
};

const snapshot_head_information = (mode: SNAPSHOT_MODE): string => {
    if (mode === SNAPSHOT_MODE.GUESS) {
        return Colors.gray('[TAB] to complete');
    }
    return '';
};

const snapshot_head_information_intelligence = (intelligence?: IArgumentIntelligenceResult) => {
    if (!intelligence) {
        return '';
    }

    if (intelligence.description) return Colors.gray(intelligence.description);
    else if (intelligence.autocomplete) return Colors.gray(intelligence.autocomplete);
    else return '';
};

const snapshot_head = (info: ISnapshotInfo): string => {
    switch (info.mode) {
        case SNAPSHOT_MODE.GUESS:
        case SNAPSHOT_MODE.MATCHED:
        case SNAPSHOT_MODE.EMPTY:
            return snapshot_head_mark(info)
                + (info.autocomplete ? ' ' : '')
                + (info.autocomplete
                    ? snapshot_head_intelligence(
                        info.autocomplete.value,
                        info.autocomplete.matched,
                        info.autocomplete.distance,
                    )
                    : '')
                + ' '
                + snapshot_head_information(info.mode);
        case SNAPSHOT_MODE.ARGUMENT:
            return snapshot_head_mark(info)
                + ' '
                + snapshot_head_information_intelligence(info.intelligence);
        case SNAPSHOT_MODE.ERROR:
        default:
            return '';
    }

};

const snapshot_body = (info: ISnapshotInfo): string => {
    return '>' + spaces(1) + info.input;
};

export const print_snapshot = (info: ISnapshotInfo): string => {
    return snapshot_head(info)
        + '\n'
        + snapshot_body(info);
};
