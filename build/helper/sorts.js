"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sorting = void 0;
const sorting = (query) => {
    const sortType = Number(query.sorttype);
    const sortby = query.sortby;
    let sortMethod = { createdAt: -1 };
    if (!isNaN(sortType) && sortby !== undefined) {
        sortMethod = {};
        sortMethod[sortby] = sortType;
    }
    return {
        sortMethod,
    };
};
exports.sorting = sorting;
