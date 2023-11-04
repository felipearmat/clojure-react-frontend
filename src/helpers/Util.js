function formatCurrency(value) {
  return Number.parseFloat(value).toFixed(2);
}

function formatDateString(dateString) {
  return new Date(dateString).toISOString().slice(0, 19) + " UTC";
}

function navMaker(routes) {
  const result = [];
  routes[0].children.forEach((route) => {
    if (route.path && route.path !== "*" && route.label) {
      result.push({ path: route.path, label: route.label });
    }
  });

  return result;
}

export { formatCurrency, formatDateString, navMaker };
