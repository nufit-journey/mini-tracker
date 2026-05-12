const courses = [
    { id: 1, name: "Pancasila", type: "Non-Praktik", sks: 2 },
    { id: 2, name: "Bahasa Indonesia", type: "Non-Praktik", sks: 2 },
    { id: 3, name: "Bahasa Inggris", type: "Non-Praktik", sks: 3 },
    { id: 4, name: "Pengantar Statiska", type: "Non-Praktik", sks: 3 },
    { id: 5, name: "Aljabar Linear Elementer", type: "Non-Praktik", sks: 2 },
    { id: 6, name: "Basis Data", type: "Praktik", sks: 3 },
    { id: 7, name: "Struktur Data", type: "Praktik", sks: 3 }
];

const quotes = [
    "Keren banget! Ayo lebih semangat lagi🙌",
    "Gokil! Progres kamu mantap, istirahat bentar ya! ☕",
    "YOU CAN DO IT BROO! 💻",
    "Jangan kasih kendor, dikit lagi kelar! 🔥",
    "Bangga banget sama progres kamu hari ini! ✨"
];

const container = document.getElementById('course-container');
const overlay = document.getElementById('motivation-overlay');
const motivationText = document.getElementById('motivation-text');

// 1. Fungsi untuk Load Data dari LocalStorage
function loadProgress() {
    const saved = localStorage.getItem('ut_progress');
    return saved ? JSON.parse(saved) : {};
}

// 2. Fungsi untuk Simpan Data ke LocalStorage
function saveProgress(courseId, sessionIndex, isChecked) {
    let progress = loadProgress();
    if (!progress[courseId]) progress[courseId] = {};
    progress[courseId][sessionIndex] = isChecked;
    localStorage.setItem('ut_progress', JSON.stringify(progress));
}

function init() {
    const currentProgress = loadProgress();
    container.innerHTML = ''; 

    courses.forEach((course) => {
        const isPraktik = course.type === "Praktik";
        const sessionCount = isPraktik ? 3 : 8;
        
        let sessionHTML = '';
        for (let i = 1; i <= sessionCount; i++) {
            const label = isPraktik ? `Tugas ${i}` : (i <= 5 ? `Diks ${i}` : `Tugas ${i-5}`);
            // Cek apakah sebelumnya sudah pernah dicentang
            const isChecked = currentProgress[course.id] && currentProgress[course.id][i] ? 'checked' : '';
            
            sessionHTML += `
                <div class="session-item">
                    <input type="checkbox" class="task-check" 
                           data-course="${course.id}" 
                           data-session="${i}" 
                           ${isChecked}>
                    <span>${label}</span>
                </div>
            `;
        }

        const card = document.createElement('div');
        card.className = 'course-card';
        card.innerHTML = `
            <div class="course-header">
                <div class="course-title">
                    <h3>${course.name}</h3>
                    <span class="badge">${course.type} | ${course.sks} SKS</span>
                </div>
            </div>
            <div class="sessions-grid">
                ${sessionHTML}
            </div>
        `;
        container.appendChild(card);
    });

    document.querySelectorAll('.task-check').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const cId = this.getAttribute('data-course');
            const sIdx = this.getAttribute('data-session');
            
            saveProgress(cId, sIdx, this.checked);

            if (this.checked) {
                const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
                motivationText.innerText = randomQuote;
                overlay.style.display = 'flex';
            }
        });
    });
}

window.closeMotivation = () => overlay.style.display = 'none';
document.addEventListener('DOMContentLoaded', init);