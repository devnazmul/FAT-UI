import { formatText } from "./formatText.js";

export const checkPermissions = (
  permissionForCheck,
  permissions,
  requireAll = false
) => {
  if (permissions) {
    if (requireAll) {
      return permissionForCheck?.every((el) => permissions.includes(el));
    } else {
      return permissionForCheck?.some((el) => permissions.includes(el));
    }
  }
};

export const checkPermissionsV2 = (permissionForCheck, requireAll = false) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  if (permissions?.length > 0) {
    if (requireAll) {
      return permissionForCheck.every((el) => permissions?.includes(el));
    } else {
      return permissionForCheck.some((el) => permissions?.includes(el));
    }
  }
};

export const checkModules = (modulesForCheck, modules, requireAll = false) => {
  if (modules?.length) {
    if (requireAll) {
      return modulesForCheck.every((el) => modules.includes(el));
    } else {
      return modulesForCheck.some((el) => modules.includes(el));
    }
  } else {
    return 0;
  }
};

export const checkRole = (user, role) => {
  return user?.roles
    .map((role) => formatText(role?.name).split(" ")[1])
    .includes(role);
};
