// Initial student data
let students = [
    { id: 'STU001', name: 'John Doe', course: 'Computer Science', status: 'Active' },
    { id: 'STU002', name: 'Jane Smith', course: 'Information Technology', status: 'Active' },
    { id: 'STU003', name: 'Mike Johnson', course: 'Software Engineering', status: 'Inactive' },
    { id: 'STU004', name: 'Sarah Williams', course: 'Data Science', status: 'Active' },
    { id: 'STU005', name: 'David Brown', course: 'Cybersecurity', status: 'Active' }
];

// DOM Elements
const studentTableBody = document.getElementById('studentTableBody');
const addStudentForm = document.getElementById('addStudentForm');
const totalStudentsEl = document.getElementById('totalStudents');
const activeStudentsEl = document.getElementById('activeStudents');
const inactiveStudentsEl = document.getElementById('inactiveStudents');

// Initialize dashboard
function init() {
    loadStudents();
    updateSummaryCards();
}

// Load students from localStorage or use initial data
function loadStudents() {
    const savedStudents = localStorage.getItem('students');
    if (savedStudents) {
        students = JSON.parse(savedStudents);
    }
    renderStudentTable();
}

// Save students to localStorage
function saveStudents() {
    localStorage.setItem('students', JSON.stringify(students));
}

// Render student table
function renderStudentTable() {
    studentTableBody.innerHTML = '';

    students.forEach((student, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.course}</td>
            <td><span class="status-badge ${student.status.toLowerCase()}">${student.status}</span></td>
            <td><button class="btn-delete" onclick="deleteStudent(${index})">Delete</button></td>
        `;

        studentTableBody.appendChild(row);
    });

    updateSummaryCards();
}

// Add new student
addStudentForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const studentName = document.getElementById('studentName').value;
    const studentId = document.getElementById('studentId').value;
    const studentCourse = document.getElementById('studentCourse').value;
    const studentStatus = document.getElementById('studentStatus').value;

    // Check if student ID already exists
    const existingStudent = students.find(s => s.id === studentId);
    if (existingStudent) {
        alert('Student ID already exists! Please use a different ID.');
        return;
    }

    // Create new student object
    const newStudent = {
        id: studentId,
        name: studentName,
        course: studentCourse,
        status: studentStatus
    };

    // Add to students array
    students.push(newStudent);

    // Save to localStorage
    saveStudents();

    // Re-render table
    renderStudentTable();

    // Reset form
    addStudentForm.reset();

    // Show success message
    alert('Student added successfully!');
});

// Delete student
function deleteStudent(index) {
    const student = students[index];
    const confirmDelete = confirm(`Are you sure you want to delete ${student.name}?`);

    if (confirmDelete) {
        students.splice(index, 1);
        saveStudents();
        renderStudentTable();
        alert('Student deleted successfully!');
    }
}

// Update summary cards
function updateSummaryCards() {
    const total = students.length;
    const active = students.filter(s => s.status === 'Active').length;
    const inactive = students.filter(s => s.status === 'Inactive').length;

    totalStudentsEl.textContent = total;
    activeStudentsEl.textContent = active;
    inactiveStudentsEl.textContent = inactive;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);