import bcrypt from "bcryptjs";

const users = [
  {
    name: "Anthony Dsouza",
    email: "anthony@example.com",
    password: bcrypt.hashSync("admin123", 10),
    isAdmin: true,
    jobTitle: "System Administrator",
    address: "123 Admin Ave, Admin City, AC, 12345, USA",
    dateOfJoining: "2022-01-01",
    department: "Administration",
    status: "Active",
    image: "/src/assets/anthony.jpg",
  },
  {
    name: "Bhavik Chauhan",
    email: "bhavik@example.com",
    password: bcrypt.hashSync("john123", 10),
    isAdmin: false,
    jobTitle: "Software Engineer",
    address: "456 Maple St, Springfield, IL, 62701, USA",
    dateOfJoining: "2020-01-15",
    department: "IT",
    status: "Active",
    image: "/src/assets/bhavik.jpg",
  },
  {
    name: "Parag Piswalkar",
    email: "parag@example.com",
    password: bcrypt.hashSync("jane123", 10),
    isAdmin: false,
    jobTitle: "Product Manager",
    address: "789 Oak St, Springfield, IL, 62702, USA",
    dateOfJoining: "2018-03-22",
    department: "Product",
    status: "Active",
    image: "/src/assets/parag.jpg",
  },
  {
    name: "Deepa",
    email: "deepa@example.com",
    password: bcrypt.hashSync("emily123", 10),
    isAdmin: false,
    jobTitle: "HR Specialist",
    address: "101 Birch St, Springfield, IL, 62703, USA",
    dateOfJoining: "2021-07-19",
    department: "HR",
    status: "On Leave",
    image: "/src/assets/deepa.jpg",
  },
];

export default users;
