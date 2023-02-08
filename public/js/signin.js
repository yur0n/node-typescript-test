const form = document.querySelector('form');
const id = document.querySelector('.id_input');
const password = document.querySelector('.pass_input');
const message1 = document.querySelector('.message-1');
const signupBtn = document.querySelector('.signup');

async function postData(data) {
    const response = await fetch('/api/signin', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return response.json();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    postData({ id: id.value, password: password.value })
    .then((data) => {
        console.log()
        if (data.error) {
            return message1.textContent = data.error;
        }
        sessionStorage.setItem('token', data.token);
        window.location.href = "app";
    });
});