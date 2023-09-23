const messagesList = document.getElementById('messages');
const getMessageListRequest = new XMLHttpRequest();

export function sendMessage(message) {
    return axios.post('http://localhost:8001/api/msg/', {
        message: message,
    });
}

export function viewMessage(message) {
    const item = document.createElement('div');
    if (message.senderId && message.senderId === +localStorage.getItem('userId') || !message.senderId) {
        item.style.textAlign = 'right';
    }
    item.textContent = message.message ?? message;
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
                viewMessage(message);
            });
        }
    };
}

export function clearMessages() {
    while (messagesList.lastChild) {
        messagesList.removeChild(messagesList.lastChild);
    }
}

export function signIn(login, password) {
    return axios.post('http://localhost:8001/api/auth/sign-in', {
        name: login,
        password: password,
    });
}

window.onload = () => {
    if (localStorage.getItem('accessToken') === null) {
        authForm.style.display = 'block';
        messagesList.style.display = 'none';
        form.style.display = 'none';
    } else {
        clearMessages();
        loadMessages(getMessageListRequest);
    }
};


