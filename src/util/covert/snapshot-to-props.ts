/**
 * @author WMXPY
 * @namespace Util_Covert
 * @fileoverview Snapshot -> Props
 */

import { IService } from "#declare/service";
import { ISnapshotInfo } from "#declare/snapshot";

export const convertSnapshotToProps = (service: IService, snapshot: ISnapshotInfo): {
    [key: string]: any;
} => {
    const props: {
        [key: string]: any;
    } = {};
    snapshot.args.forEach((arg: string): void => {
        return;
    });

    return {};
};
