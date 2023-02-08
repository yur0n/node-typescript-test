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

post('/api/latency')
.then((data) => {
	if (data.error) {
		return message1.textContent = data.error;
	}
	message1.textContent = data.message;
});