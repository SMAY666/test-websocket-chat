const messagesList = document.getElementById('messages');

export function sendMessage(message) {
    return axios.post('http://localhost:8001/api/msg/', {
        message: message,
    });
}

export function viewMessage(message) {
    const item = document.createElement('li');
    item.textContent = message;
    messagesList.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
}

export function loadMessages(getMessageListRequest) {
    getMessageListRequest.open('GET', 'http://localhost:8001/api/msg');
    getMessageListRequest.send();

    getMessageListRequest.onload = () => {
        if (getMessageListRequest.status !== 200) {
            alert('Ошибка загрузки данных');
        } else {
            const messages = JSON.parse(getMessageListRequest.response);

            messages.map((message) => {
                viewMessage(message.message);
            });
        }
    };
}

export function clearMessages() {
    while (messagesList.lastChild) {
        messagesList.removeChild(messagesList.lastChild);
    }
}

export function signIn() {
    return axios.post('http://localhost:8001/api/auth/sign-in', {
        name: 'Matvey',
        password: '1111',
    });
}


