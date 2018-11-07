/**
 * @author WMXPY
 * @namespace Common_Assert
 * @fileoverview Func
 */

class AssertFetch<T> {

    private _items: T[];

    public constructor(items: T[]) {

        this._items = items;
    }
}

const assertFetch = <T>(item: T[]) => {
    return new AssertFetch(item);
};
