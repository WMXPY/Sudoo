/**
 * @author WMXPY
 * @namespace Util_String
 * @fileoverview Similarity
 */

import { lastElement } from "#util/string/string";

export const similar = (baseStr: string, targetStr: string): number => {
    const base: string = baseStr.toLowerCase();
    const target: string = targetStr.toLowerCase();

    const next: (m: number[][], i: number, j: number) => number =
        (m: number[][], i: number, j: number) => Math.min(m[i - 1][j - 1] + 1, m[i][j - 1] + 1, m[i - 1][j] + 1);

    const map: number[][] =
        new Array(base.length).fill(undefined)
            .map(() => new Array(target.length).fill(undefined)
                .map((value: undefined, index: number) => index));
    for (let i: number = 1; i < base.length; i++) {
        for (let j: number = 1; j < target.length; j++) {
            map[i][j] = base.charAt(i - 1) === target.charAt(j - 1) ?
                map[i - 1][j - 1] :
                next(map, i, j);
        }
    }

    let result: number = lastElement<number>(lastElement<number[]>(map || []) || []);
    if (targetStr.includes(baseStr)) result -= Math.floor(baseStr.length / 2);
    return result;
};
