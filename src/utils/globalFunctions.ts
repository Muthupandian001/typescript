export const ternaryCondition = (newValue: any, defaultValue: any) => {
  return newValue ? newValue : defaultValue;
};

export const permissionsCount = (data: any) => {
  return data.reduce(function (obj: any, v: any) {
    if (v.view === true) obj[v.view] = (obj[v.view] || 0) + 1;
    if (v.list === true) obj[v.list] = (obj[v.list] || 0) + 1;
    if (v.add === true) obj[v.add] = (obj[v.add] || 0) + 1;
    if (v.delete === true) obj[v.delete] = (obj[v.delete] || 0) + 1;
    if (v.edit === true) obj[v.edit] = (obj[v.edit] || 0) + 1;
    return obj;
  }, {});
};
