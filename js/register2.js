const username = document.getElementById('username');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const repassword = document.getElementById('repass');
const btn = document.getElementById('btn');
const form = document.getElementById('form');

function createObj() {
    let user = { username: username.value, email: email.value, phone: phone.value, password: password.value };
    const data = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

    if (data.some(el => el.username === user.username)) {
        alert('Bunday foydalanuvchi mavjud');
        highlightField(username);
        return;
    }

    if (data.some(el => el.email === user.email)) {
        alert('Bu email pochta allaqachon royhatdan otgan');
        highlightField(email);
        return;
    }

    data.push(user);
    localStorage.setItem('users', JSON.stringify(data));

    window.location.href = "http://127.0.0.1:5500/login.html";
}

function validation() {
    if (![username, email, password, repassword].every(field => field.value)) {
        alert('Iltimos, barcha maydonlarni to\'ldiring');
        return;
    }

    if (password.value !== repassword.value) {
        alert('Parollar bir xil emas');
        return;
    }
}

function highlightField(field) {
    field.style.outlineColor = 'red';
    field.focus();
}

function clearHighlight(...fields) {
    fields.forEach(field => {
        field.style.outlineColor = '';
    });
}

btn.addEventListener('click', (event) => {
    event.preventDefault();
    clearHighlight(username, email);
    validation();
    createObj();
    form.reset();
});
