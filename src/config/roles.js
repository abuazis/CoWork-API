/// Define user roles
const roles = ["user", "admin"];

/// Map admin role permissions as array
const roleRights = new Map();
roleRights.set(roles[0], []);
roleRights.set(roles[1], ["get", "manage"]);

module.exports = { roles, roleRights };