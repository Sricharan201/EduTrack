// Dummy data for EduTrack Student Management System

export const students = [
  {
    id: 1,
    name: 'Aarav Sharma',
    rollNumber: 'AG-001',
    class: '10-A',
    email: 'aarav.sharma@email.com',
    phone: '+91 98765 43210',
    photo: null,
    attendance: 92,
    joinDate: '2023-04-01',
  },
  {
    id: 2,
    name: 'Priya Mehta',
    rollNumber: 'AG-002',
    class: '10-A',
    email: 'priya.mehta@email.com',
    phone: '+91 87654 32109',
    photo: null,
    attendance: 88,
    joinDate: '2023-04-01',
  },
  {
    id: 3,
    name: 'Rohan Verma',
    rollNumber: 'AG-003',
    class: '10-B',
    email: 'rohan.verma@email.com',
    phone: '+91 76543 21098',
    photo: null,
    attendance: 95,
    joinDate: '2023-04-01',
  },
  {
    id: 4,
    name: 'Sneha Patel',
    rollNumber: 'AG-004',
    class: '9-A',
    email: 'sneha.patel@email.com',
    phone: '+91 65432 10987',
    photo: null,
    attendance: 79,
    joinDate: '2023-04-01',
  },
  {
    id: 5,
    name: 'Arjun Singh',
    rollNumber: 'AG-005',
    class: '9-B',
    email: 'arjun.singh@email.com',
    phone: '+91 54321 09876',
    photo: null,
    attendance: 85,
    joinDate: '2023-04-01',
  },
  {
    id: 6,
    name: 'Divya Nair',
    rollNumber: 'AG-006',
    class: '11-A',
    email: 'divya.nair@email.com',
    phone: '+91 43210 98765',
    photo: null,
    attendance: 97,
    joinDate: '2023-04-01',
  },
  {
    id: 7,
    name: 'Karthik Rao',
    rollNumber: 'AG-007',
    class: '11-B',
    email: 'karthik.rao@email.com',
    phone: '+91 32109 87654',
    photo: null,
    attendance: 73,
    joinDate: '2023-04-01',
  },
  {
    id: 8,
    name: 'Ananya Joshi',
    rollNumber: 'AG-008',
    class: '12-A',
    email: 'ananya.joshi@email.com',
    phone: '+91 21098 76543',
    photo: null,
    attendance: 91,
    joinDate: '2023-04-01',
  },
];

export const subjects = ['Mathematics', 'Science', 'English', 'History', 'Geography', 'Computer Science'];

export const marksData = {
  1: { Mathematics: 88, Science: 92, English: 78, History: 85, Geography: 80, 'Computer Science': 95 },
  2: { Mathematics: 75, Science: 82, English: 90, History: 72, Geography: 68, 'Computer Science': 88 },
  3: { Mathematics: 95, Science: 90, English: 85, History: 88, Geography: 92, 'Computer Science': 98 },
  4: { Mathematics: 65, Science: 70, English: 82, History: 75, Geography: 78, 'Computer Science': 72 },
  5: { Mathematics: 80, Science: 85, English: 74, History: 79, Geography: 83, 'Computer Science': 86 },
  6: { Mathematics: 98, Science: 95, English: 92, History: 90, Geography: 88, 'Computer Science': 96 },
  7: { Mathematics: 60, Science: 68, English: 72, History: 65, Geography: 70, 'Computer Science': 75 },
  8: { Mathematics: 89, Science: 91, English: 86, History: 84, Geography: 87, 'Computer Science': 93 },
};

export const attendanceData = {
  // date -> { studentId -> 'present' | 'absent' }
};

export const performanceData = [
  { month: 'Sep', avgScore: 72 },
  { month: 'Oct', avgScore: 75 },
  { month: 'Nov', avgScore: 71 },
  { month: 'Dec', avgScore: 78 },
  { month: 'Jan', avgScore: 82 },
  { month: 'Feb', avgScore: 85 },
  { month: 'Mar', avgScore: 88 },
];

export const attendanceTrendData = [
  { month: 'Sep', attendance: 85 },
  { month: 'Oct', attendance: 88 },
  { month: 'Nov', attendance: 82 },
  { month: 'Dec', attendance: 79 },
  { month: 'Jan', attendance: 86 },
  { month: 'Feb', attendance: 90 },
  { month: 'Mar', attendance: 87 },
];

export const stats = {
  totalStudents: 248,
  totalTeachers: 32,
  totalClasses: 18,
  attendancePercentage: 87,
};

export const classes = ['9-A', '9-B', '10-A', '10-B', '11-A', '11-B', '12-A', '12-B'];
