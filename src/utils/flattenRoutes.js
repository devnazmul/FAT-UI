export const flattenRoutes = (routes, parentRoute = "") => {
  let flattened = [];

  routes.forEach((route) => {
    const currentRouteStructure = parentRoute
      ? `${parentRoute} > ${route?.title}`
      : route?.title;

    // Add the current route to the flattened array if 'show' is true
    if (route?.show) {
      flattened.push({
        isParent: route?.childrens && route?.childrens.length > 0,
        title: route?.title,
        link: route?.link,
        show: route?.show,
        // Assuming 'Icon' might be present,
        // if not it will be undefined which is fine.
        Icon: route?.Icon || undefined,
        routesStructure: currentRouteStructure
      });
    }

    // Recursively flatten children
    if (route?.childrens && route?.childrens.length > 0) {
      flattened = flattened.concat(
        flattenRoutes(route?.childrens, currentRouteStructure)
      );
    }
  });

  return flattened;
};
