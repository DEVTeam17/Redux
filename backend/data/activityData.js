import { getDate } from "../utils/getDate.js";

const activityData = [
  // Activities for Anthony Dsouza
  {
    userId: "66c80832195fcc9b7169ec53",
    type: "attendance",
    title: "Attendance Check",
    checkIn: "08:00 AM",
    checkOut: "05:00 PM",
    date: getDate(),
  },
  {
    userId: "66c80832195fcc9b7169ec53",
    type: "activity",
    title: "System Maintenance",
    bottomText: "Completed server maintenance",
    date: getDate(-1),
  },
  {
    userId: "66c80832195fcc9b7169ec53",
    type: "activity",
    title: "Security Meeting",
    bottomText: "Discussed cybersecurity strategies",
    date: getDate(-2),
  },

  // Activities for Bhavik Chauhan
  {
    userId: "66c80832195fcc9b7169ec54",
    type: "attendance",
    title: "Attendance Check",
    checkIn: "09:15 AM",
    checkOut: "06:30 PM",
    date: getDate(),
  },
  {
    userId: "66c80832195fcc9b7169ec54",
    type: "activity",
    title: "Code Review",
    bottomText: "Reviewed pull requests for project X",
    date: getDate(-1),
  },
  {
    userId: "66c80832195fcc9b7169ec54",
    type: "activity",
    title: "Sprint Planning",
    bottomText: "Planning sprint goals with the team",
    date: getDate(-2),
  },

  // Activities for Parag Piswalkar
  {
    userId: "66c80832195fcc9b7169ec55",
    type: "attendance",
    title: "Attendance Check",
    checkIn: "09:00 AM",
    checkOut: "05:30 PM",
    date: getDate(),
  },
  {
    userId: "66c80832195fcc9b7169ec55",
    type: "activity",
    title: "Product Strategy Meeting",
    bottomText: "Discussed roadmap for Q4",
    date: getDate(-1),
  },
  {
    userId: "66c80832195fcc9b7169ec55",
    type: "activity",
    title: "Market Research",
    bottomText: "Analyzed competitor products",
    date: getDate(-2),
  },

  // Activities for Deepa Patel
  {
    userId: "66c80832195fcc9b7169ec56",
    type: "attendance",
    title: "Attendance Check",
    checkIn: "10:00 AM",
    checkOut: "07:00 PM",
    date: getDate(),
  },
  {
    userId: "66c80832195fcc9b7169ec56",
    type: "activity",
    title: "Onboarding New Employees",
    bottomText: "Conducted orientation session",
    date: getDate(-1),
  },
  {
    userId: "66c80832195fcc9b7169ec56",
    type: "activity",
    title: "HR Policy Review",
    bottomText: "Updated company leave policies",
    date: getDate(-2),
  },

  // Activities for Tania Smith
  {
    userId: "66c80832195fcc9b7169ec57",
    type: "attendance",
    title: "Attendance Check",
    checkIn: "08:30 AM",
    checkOut: "04:30 PM",
    date: getDate(),
  },
  {
    userId: "66c80832195fcc9b7169ec57",
    type: "activity",
    title: "Project Kickoff",
    bottomText: "Started work on Project Alpha",
    date: getDate(-1),
  },
  {
    userId: "66c80832195fcc9b7169ec57",
    type: "activity",
    title: "Client Meeting",
    bottomText: "Met with clients to discuss requirements",
    date: getDate(-2),
  },

  // Activities for Bhavika Desai
  {
    userId: "66c80832195fcc9b7169ec58",
    type: "attendance",
    title: "Attendance Check",
    checkIn: "09:45 AM",
    checkOut: "06:15 PM",
    date: getDate(),
  },
  {
    userId: "66c80832195fcc9b7169ec58",
    type: "activity",
    title: "Financial Analysis",
    bottomText: "Analyzed Q3 revenue reports",
    date: getDate(-1),
  },
  {
    userId: "66c80832195fcc9b7169ec58",
    type: "activity",
    title: "Budget Planning",
    bottomText: "Planned budget for next fiscal year",
    date: getDate(-2),
  },

  // Activities for John Doe
  {
    userId: "66c80832195fcc9b7169ec59",
    type: "attendance",
    title: "Attendance Check",
    checkIn: "09:00 AM",
    checkOut: "05:30 PM",
    date: getDate(),
  },
  {
    userId: "66c80832195fcc9b7169ec59",
    type: "activity",
    title: "Feature Development",
    bottomText: "Implemented new feature for app",
    date: getDate(-1),
  },
  {
    userId: "66c80832195fcc9b7169ec59",
    type: "activity",
    title: "Bug Fixing",
    bottomText: "Fixed critical bugs in production",
    date: getDate(-2),
  },

  // Activities for Emily Watson
  {
    userId: "66c80832195fcc9b7169ec5a",
    type: "attendance",
    title: "Attendance Check",
    checkIn: "09:30 AM",
    checkOut: "06:00 PM",
    date: getDate(),
  },
  {
    userId: "66c80832195fcc9b7169ec5a",
    type: "activity",
    title: "UX Research",
    bottomText: "Conducted user interviews for new design",
    date: getDate(-1),
  },
  {
    userId: "66c80832195fcc9b7169ec5a",
    type: "activity",
    title: "Wireframing",
    bottomText: "Created wireframes for upcoming project",
    date: getDate(-2),
  },
];

export default activityData;
