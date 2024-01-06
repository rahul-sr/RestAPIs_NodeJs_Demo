let products = [
  {
    id: "1",
    brand: "Apple",
    name: "Iphone 15",
  },
  {
    id: "2",
    brand: "OnePlus",
    name: "OnePlus 11",
  },
];

let roles = {
  ADMIN: "admin",
  MEMBER: "member",
};

let users = [
  {
    id: "1",
    username: "john",
    role: roles.ADMIN,
  },
  {
    id: "2",
    username: "jimmy",
    role: roles.MEMBER,
  },
  {
    id: "3",
    username: "jenny",
    role: roles.ADMIN,
  },
  {
    id: "4",
    username: "jay",
    role: roles.MEMBER,
  },
];

module.exports = {
  products,
  users,
  roles,
};
