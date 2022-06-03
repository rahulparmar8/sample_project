"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sorting = void 0;
const sorting = (query) => {
    const sortType = Number(query.sorttype);
    const sortby = query.sortby;
    // console.log("shortby", sortby ,"shorttype", sortType);
    let sortMethod = { createdAt: -1 };
    if (!isNaN(sortType) && sortby !== undefined) {
        sortMethod = {};
        // console.log('IF CONDITION');
        sortMethod[sortby] = sortType;
    }
    // console.log("short ", sortMethod);
    return {
        sortMethod,
    };
};
exports.sorting = sorting;
