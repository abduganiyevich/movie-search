const username=document.getElementById('username');
const email=document.getElementById('email');
const phone=document.getElementById('phone');
const password=document.getElementById('password');
const repassword=document.getElementById('repass');
const btn=document.getElementById('btn');
const form=document.getElementById('form');
function createObj() {
    let user={};
    user.username=username.value;
    user.email=email.value;
    user.phone=phone.value;
    user.password=password.value;

    const data=localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):[];

    if (data.length>0) {
    data.forEach(el => {
    if (el.username==user.username) {
        alert('bunday foydalanuvchi mavjud');
        username.focus();
        username.style.outlineColor="red";
        return;
    }
    if(el.email==user.email){
        alert('Bu email pochta allaqachon royhatdan otgan');
        email.focus();
        email.style.outlineColor='red';
        return;
    }
    });
    }
    
    data.push(user);
    localStorage.setItem('users',JSON.stringify(data));

    window.location.href="http://127.0.0.1:5500/login.html";
}
function validation() {
    if (!username.value) {
        username.style.outlineColor='red';
        username.focus();
        return;
    }
    if (!email.value) {
        email.style.outlineColor='red';
        email.focus();
        return;
    }
    if (!password.value) {
        password.style.outlineColor='red';
        password.focus();
        return;
    }
    if (!repassword.value) {
        repassword.style.outlineColor='red';
        repassword.focus();
        return;
    }
    if (password.value!=repassword.value) {
        alert('parollar bir xil emas')
        return;
    }
}

btn.addEventListener('click',()=>{
    validation();
    createObj();
    form.reset();
})

