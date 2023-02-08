const message1 = document.querySelector('.message1');
const message2 = document.querySelector('.message2');
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

post('/api/info')
.then((data) => {
	if (data.error) {
		return message1.textContent = data.error;
	}
	message1.textContent = 'ID: ' + data.id;
	message2.textContent = 'ID_type: '+ data.id_type;
});