const sorting = (query: any) => {
  const sortType = Number(query.sorttype);
  const sortby = query.sortby as string;

// console.log(sortby , sortType);

  let sortMethod: any = { createdAt: -1 };
  if (!isNaN(sortType) && sortby !== undefined) {
    sortMethod = {};
    // console.log('IF CONDITION');
    
    sortMethod[sortby] = sortType;
  }

// console.log(sortMethod);


  return {
    sortMethod,
  };
};

export { sorting };