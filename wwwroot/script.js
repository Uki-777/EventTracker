document.addEventListener('DOMContentLoaded', function () {
    // Obsługa przełączania zakładek
    const dashboardTab = document.getElementById('dashboard-tab');
    const addEventTab = document.getElementById('add-event-tab');
    const analyticsTab = document.getElementById('analytics-tab');

    dashboardTab.addEventListener('click', (e) => { e.preventDefault(); switchTab('dashboard'); });
    addEventTab.addEventListener('click', (e) => { e.preventDefault(); switchTab('add-event'); });
    analyticsTab.addEventListener('click', (e) => { e.preventDefault(); switchTab('analytics'); });

    function switchTab(tabName) {
        document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
        document.querySelectorAll('.nav a').forEach(tab => tab.classList.remove('active'));
        document.getElementById(tabName).classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');
        if (tabName === 'dashboard') {
            fetchEvents(); // ⬅️ odśwież dane w tabeli przy wejściu na zakładkę
        }
    }

    // Obsługa formularza
    const eventForm = document.getElementById('event-form');
    eventForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const dane = {
            nazwa: document.getElementById('event-name').value,
            data: document.getElementById('event-date').value,
            kategoria: document.getElementById('event-category').value,
            lokalizacja: document.getElementById('event-location').value,
            opis: document.getElementById('event-description').value
        };

        try {
            const res = await fetch('http://localhost:5062/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dane)
            });

            if (res.ok) {
                showToast('✅ Wydarzenie dodane!');
                eventForm.reset();
                switchTab('dashboard');
            } else {
                showToast('❌ Błąd podczas dodawania.');
            }
        } catch (err) {
            console.error(err);
            showToast('⚠️ Brak połączenia z API.');
        }
    });

    // 🟢 Funkcja do pobierania wydarzeń z API i wyświetlania w tabeli
    async function fetchEvents() {
        try {
            const res = await fetch('http://localhost:5062/events');
            const events = await res.json();

            const tbody = document.getElementById('events-table-body');
            tbody.innerHTML = '';

            events.forEach(ev => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${ev.nazwa}</td>
                    <td>${new Date(ev.data).toLocaleString()}</td>
                    <td>${ev.kategoria}</td>
                    <td>${ev.lokalizacja}</td>
                    <td>0</td> <!-- jeśli chcesz dodać zainteresowanie -->
                    <td>-</td>
                `;
                tbody.appendChild(row);
            });
        } catch (err) {
            console.error('Błąd przy pobieraniu wydarzeń:', err);
        }
    }

    // 🔔 Funkcja do pokazywania komunikatów
    function showToast(msg) {
        const toast = document.getElementById('toast');
        toast.textContent = msg;
        toast.className = 'toast show';
        setTimeout(() => { toast.className = 'toast'; }, 3000);
    }

    // Od razu załaduj dane przy starcie
    fetchEvents();

    // Obsługa modali (logowanie/rejestracja)
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    const closeModals = document.querySelectorAll('.close-modal');
    const loginLink = document.getElementById('login-link');
    const signupLink = document.getElementById('signup-link');

    loginBtn.addEventListener('click', () => loginModal.style.display = 'flex');
    signupBtn.addEventListener('click', () => signupModal.style.display = 'flex');

    closeModals.forEach(btn => {
        btn.addEventListener('click', () => {
            loginModal.style.display = 'none';
            signupModal.style.display = 'none';
        });
    });

    loginLink.addEventListener('click', function (e) {
        e.preventDefault();
        signupModal.style.display = 'none';
        loginModal.style.display = 'flex';
    });

    signupLink.addEventListener('click', function (e) {
        e.preventDefault();
        loginModal.style.display = 'none';
        signupModal.style.display = 'flex';
    });

    window.addEventListener('click', function (e) {
        if (e.target === loginModal) loginModal.style.display = 'none';
        if (e.target === signupModal) signupModal.style.display = 'none';
    });
});