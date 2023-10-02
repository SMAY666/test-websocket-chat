const messagesList = document.getElementById('messages');


export function setDataIntoStorage(token, userId) {
    return new Promise((resolve, reject) => {
        try {
            localStorage.setItem('accessToken', token);
            localStorage.setItem('userId', userId);
            resolve(token);
        } catch (err) {
            reject(err);
        }
    });
}
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

export async function signIn(login, password) {
    return axios.post('http://localhost:8001/api/auth/sign-in', {
        name: login,
        password: password,
    });
}

export async function auth(login, password, socket) {
    return new Promise((resolve, reject) => {
        signIn(login, password)
            .then(({data}) => {
                return setDataIntoStorage(data.token, data.userId);
            })
            .then((token) => {
                console.log(token);
                resolve(token);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
