import categoryModel from "../models/categoryModels";

const categoryListData = async () => {
    const catData = await categoryModel.aggregate([
        {
            $match: { parent: 1 },
        },
        {
            $lookup: {
                from: "categories",
                localField: "_id",
                foreignField: "parent_id",
                as: "children",
            },
        },
    ])
    // console.log("dataCat", catData);

    return catData;
}

export { categoryListData };