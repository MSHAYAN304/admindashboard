// Sample course data
const courses = [
    {
        name: 'Web Development',
        code: 'CS301',
        instructor: 'Dr. Emily Chen',
        schedule: 'Mon, Wed 10:00 AM',
        progress: 75
    },
    {
        name: 'Database Systems',
        code: 'CS302',
        instructor: 'Prof. Michael Roberts',
        schedule: 'Tue, Thu 2:00 PM',
        progress: 60
    },
    {
        name: 'Software Engineering',
        code: 'CS303',
        instructor: 'Dr. Sarah Johnson',
        schedule: 'Mon, Wed 3:00 PM',
        progress: 85
    },
    {
        name: 'Data Structures',
        code: 'CS304',
        instructor: 'Prof. David Lee',
        schedule: 'Tue, Thu 11:00 AM',
        progress: 90
    },
    {
        name: 'Computer Networks',
        code: 'CS305',
        instructor: 'Dr. Lisa Anderson',
        schedule: 'Wed, Fri 1:00 PM',
        progress: 55
    },
    {
        name: 'Machine Learning',
        code: 'CS306',
        instructor: 'Prof. James Wilson',
        schedule: 'Thu, Fri 4:00 PM',
        progress: 45
    }
];

// DOM Elements
const courseList = document.getElementById('courseList');
const markAttendanceBtn = document.getElementById('markAttendanceBtn');
const attendanceStatus = document.getElementById('attendanceStatus');
const attendanceTime = document.getElementById('attendanceTime');

// Initialize dashboard
function init() {
    renderCourses();
    checkAttendanceStatus();
}

// Render course cards
function renderCourses() {
    courseList.innerHTML = '';

    courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';

        courseCard.innerHTML = `
            <h3>${course.name}</h3>
            <p><strong>Code:</strong> ${course.code}</p>
            <p><strong>Instructor:</strong> ${course.instructor}</p>
            <p><strong>Schedule:</strong> ${course.schedule}</p>
            <p><strong>Progress:</strong> ${course.progress}%</p>
            <div class="course-progress">
                <div class="course-progress-bar" style="width: ${course.progress}%"></div>
            </div>
        `;

        courseList.appendChild(courseCard);
    });
}

// Check attendance status from localStorage
function checkAttendanceStatus() {
    const today = new Date().toDateString();
    const attendanceData = localStorage.getItem('attendance');

    if (attendanceData) {
        const attendance = JSON.parse(attendanceData);

        if (attendance.date === today) {
            attendanceStatus.textContent = 'Status: Present ✅';
            attendanceStatus.style.color = '#059669';
            attendanceTime.textContent = `Marked at: ${attendance.time}`;
            markAttendanceBtn.textContent = 'Attendance Marked';
            markAttendanceBtn.disabled = true;
            markAttendanceBtn.style.opacity = '0.6';
            markAttendanceBtn.style.cursor = 'not-allowed';
        }
    }
}

// Mark attendance event handler
markAttendanceBtn.addEventListener('click', function() {
    const now = new Date();
    const today = now.toDateString();
    const time = now.toLocaleTimeString();

    // Save attendance to localStorage
    const attendanceData = {
        date: today,
        time: time,
        status: 'Present'
    };

    localStorage.setItem('attendance', JSON.stringify(attendanceData));

    // Update UI
    attendanceStatus.textContent = 'Status: Present ✅';
    attendanceStatus.style.color = '#059669';
    attendanceTime.textContent = `Marked at: ${time}`;

    // Disable button
    markAttendanceBtn.textContent = 'Attendance Marked';
    markAttendanceBtn.disabled = true;
    markAttendanceBtn.style.opacity = '0.6';
    markAttendanceBtn.style.cursor = 'not-allowed';

    // Show success message
    alert('Attendance marked successfully!');
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);