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
    name: "Deepa Patel",
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
  {
    name: "Tania Smith",
    email: "tania@example.com",
    password: bcrypt.hashSync("tania123", 10),
    isAdmin: true,
    jobTitle: "Product Manager",
    address: "102 Pine St, Springfield, IL, 62704, USA",
    dateOfJoining: "2019-11-05",
    department: "Product",
    status: "Active",
    image: "/src/assets/Tania.jpg",
  },
  {
    name: "Bhavika Desai",
    email: "bhavika@example.com",
    password: bcrypt.hashSync("bhavika123", 10),
    isAdmin: false,
    jobTitle: "Analyst",
    address: "103 Cedar St, Springfield, IL, 62705, USA",
    dateOfJoining: "2022-05-10",
    department: "Finance",
    status: "Active",
    image: "/src/assets/bhavika.jpg",
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("john123", 10),
    isAdmin: false,
    jobTitle: "Software Engineer",
    address: "789 Elm St, Springfield, IL, 62706, USA",
    dateOfJoining: "2021-03-10",
    department: "Development",
    status: "Active",
    image: "/src/assets/profile.png",
  },
  {
    name: "Emily Watson",
    email: "emily@example.com",
    password: bcrypt.hashSync("emily123", 10),
    isAdmin: false,
    jobTitle: "UX Designer",
    address: "234 Oak St, Springfield, IL, 62707, USA",
    dateOfJoining: "2019-07-18",
    department: "Design",
    status: "Active",
    image: "/src/assets/profile.png",
  },
  {
    name: "Michael Thompson",
    email: "michael@example.com",
    password: bcrypt.hashSync("michael123", 10),
    isAdmin: true,
    jobTitle: "Tech Lead",
    address: "345 Pine St, Springfield, IL, 62708, USA",
    dateOfJoining: "2017-09-20",
    department: "Development",
    status: "Active",
    image: "/src/assets/profile.png",
  },
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    password: bcrypt.hashSync("alice123", 10),
    isAdmin: false,
    jobTitle: "Backend Developer",
    address: "567 Maple St, Springfield, IL, 62709, USA",
    dateOfJoining: "2020-12-01",
    department: "Development",
    status: "Active",
    image: "/src/assets/profile.png",
  },
  {
    name: "David Miller",
    email: "david@example.com",
    password: bcrypt.hashSync("david123", 10),
    isAdmin: true,
    jobTitle: "Project Manager",
    address: "789 Birch St, Springfield, IL, 62710, USA",
    dateOfJoining: "2018-05-30",
    department: "Project Management",
    status: "Active",
    image: "/src/assets/profile.png",
  },
  {
    name: "Sara Lee",
    email: "sara@example.com",
    password: bcrypt.hashSync("sara123", 10),
    isAdmin: false,
    jobTitle: "Data Analyst",
    address: "456 Elm St, Springfield, IL, 62711, USA",
    dateOfJoining: "2021-09-25",
    department: "Data",
    status: "Active",
    image: "/src/assets/profile.png",
  },
  {
    name: "Chris Brown",
    email: "chris@example.com",
    password: bcrypt.hashSync("chris123", 10),
    isAdmin: false,
    jobTitle: "Marketing Specialist",
    address: "123 Oak St, Springfield, IL, 62712, USA",
    dateOfJoining: "2022-03-15",
    department: "Marketing",
    status: "Active",
    image: "/src/assets/profile.png",
  },
  {
    name: "Linda Green",
    email: "linda@example.com",
    password: bcrypt.hashSync("linda123", 10),
    isAdmin: false,
    jobTitle: "HR Manager",
    address: "234 Birch St, Springfield, IL, 62713, USA",
    dateOfJoining: "2019-02-20",
    department: "HR",
    status: "Active",
    image: "/src/assets/profile.png",
  },
  {
    name: "Peter White",
    email: "peter@example.com",
    password: bcrypt.hashSync("peter123", 10),
    isAdmin: true,
    jobTitle: "System Administrator",
    address: "345 Maple St, Springfield, IL, 62714, USA",
    dateOfJoining: "2021-06-12",
    department: "IT",
    status: "Active",
    image: "/src/assets/profile.png",
  },
  {
    name: "Elena Davis",
    email: "elena@example.com",
    password: bcrypt.hashSync("elena123", 10),
    isAdmin: false,
    jobTitle: "QA Engineer",
    address: "567 Pine St, Springfield, IL, 62715, USA",
    dateOfJoining: "2019-08-22",
    department: "Quality Assurance",
    status: "Active",
    image: "/src/assets/profile.png",
  },
  {
    name: "Mark Taylor",
    email: "mark@example.com",
    password: bcrypt.hashSync("mark123", 10),
    isAdmin: false,
    jobTitle: "DevOps Engineer",
    address: "789 Elm St, Springfield, IL, 62716, USA",
    dateOfJoining: "2020-10-05",
    department: "IT",
    status: "Active",
    image: "/src/assets/profile.png",
  },
  {
    name: "Rachel Roberts",
    email: "rachel@example.com",
    password: bcrypt.hashSync("rachel123", 10),
    isAdmin: false,
    jobTitle: "Technical Writer",
    address: "123 Birch St, Springfield, IL, 62717, USA",
    dateOfJoining: "2021-11-12",
    department: "Documentation",
    status: "Active",
    image: "/src/assets/profile.png",
  },
  {
    name: "Tom Harris",
    email: "tom@example.com",
    password: bcrypt.hashSync("tom123", 10),
    isAdmin: false,
    jobTitle: "UI Designer",
    address: "234 Maple St, Springfield, IL, 62718, USA",
    dateOfJoining: "2018-07-08",
    department: "Design",
    status: "Active",
    image: "/src/assets/profile.png",
  },
  {
    name: "Sophia Martinez",
    email: "sophia@example.com",
    password: bcrypt.hashSync("sophia123", 10),
    isAdmin: false,
    jobTitle: "Operations Manager",
    address: "789 Cedar St, Springfield, IL, 62719, USA",
    dateOfJoining: "2020-04-14",
    department: "Operations",
    status: "Active",
    image: "/src/assets/profile.png",
  },
  {
    name: "Daniel Lopez",
    email: "daniel@example.com",
    password: bcrypt.hashSync("daniel123", 10),
    isAdmin: false,
    jobTitle: "Customer Support Specialist",
    address: "345 Oak St, Springfield, IL, 62720, USA",
    dateOfJoining: "2019-01-25",
    department: "Support",
    status: "Active",
    image: "/src/assets/profile.png",
  },
  {
    name: "Grace Nguyen",
    email: "grace@example.com",
    password: bcrypt.hashSync("grace123", 10),
    isAdmin: false,
    jobTitle: "Product Owner",
    address: "567 Cedar St, Springfield, IL, 62721, USA",
    dateOfJoining: "2018-11-11",
    department: "Product",
    status: "Active",
    image: "/src/assets/profile.png",
  },
  {
    name: "Kevin Wright",
    email: "kevin@example.com",
    password: bcrypt.hashSync("kevin123", 10),
    isAdmin: false,
    jobTitle: "Technical Support Engineer",
    address: "123 Maple St, Springfield, IL, 62722, USA",
    dateOfJoining: "2021-06-05",
    department: "Support",
    status: "Active",
    image: "/src/assets/profile.png",
  },
  {
    name: "Olivia White",
    email: "olivia@example.com",
    password: bcrypt.hashSync("olivia123", 10),
    isAdmin: false,
    jobTitle: "Graphic Designer",
    address: "789 Birch St, Springfield, IL, 62723, USA",
    dateOfJoining: "2020-07-09",
    department: "Design",
    status: "Active",
    image: "/src/assets/profile.png",
  },
];

export default users;
