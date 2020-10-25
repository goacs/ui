export function filterToQueryString(filterObject) {
  let str = "";

  Object.keys(filterObject).forEach(key => {
    let value = filterObject[key];
    str += '&filter['+key+']='+value;
  });

  return str
}
