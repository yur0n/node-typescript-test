const formAll = document.querySelector('.formAll');
const formOne = document.querySelector('.formOne');
const message1 = document.querySelector('.message1');
const token = sessionStorage.getItem('token');

async function post(url) {
    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    });
    return response.json();
}

formAll.addEventListener('submit', (e) => {
    e.preventDefault();
    post('/api/logout?all=true')
    .then((data) => {
        console.log(data)
        if (data.error) {
            return message1.textContent = data.error
        }
        sessionStorage.removeItem('token')
        window.location.href = "/";
    });
});

formOne.addEventListener('submit', (e) => {
    e.preventDefault();
    post('/api/logout?all=false')
    .then((data) => {
        if (data.error) {
            return message1.textContent = data.error;
        }
        sessionStorage.removeItem('token');
        window.location.href = "/";
    });
});