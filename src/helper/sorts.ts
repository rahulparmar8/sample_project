const sorting = (query: any) => {
    const sortType = Number(query.sorttype);
    const sortby = query.sortby as string;

  
    let sortMethod: any = { createdAt: -1 };
    if (!isNaN(sortType) && sortby !== undefined) {
      sortMethod = {};
      sortMethod[sortby] = sortType;
    }
  
    return {
      sortMethod,
    };
  };
  
  export { sorting };