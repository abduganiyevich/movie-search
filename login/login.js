const username = document.getElementById('username');
const password = document.getElementById('password');
const btn = document.getElementById('btn');

function validation() {
    if (!username.value.trim()) {
        username.style.outlineColor = "red";
        username.focus();
        return;
    }
    if (!password.value.trim()) {
        password.style.outlineColor = "red";
        password.focus();
        return;
    }
}

btn.addEventListener('click', () => {
    validation();
    let data = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

    if (data.length) {
        const userFound = data.some(user => user.username === username.value.trim() && user.password === password.value.trim());

        if (userFound) {
            window.location.href = "http://127.0.0.1:5500/success.html";
        } else {
            alert('Siz ro\'yhatdan otmagansiz');
            window.location.href = "http://127.0.0.1:5500/register.html";
        }
    } else {
        alert("Siz ro'yhatdan otmagansiz");
        window.location.href = "http://127.0.0.1:5500/register.html";
    }
});
