const messagesList = document.getElementById('messages');


export function viewMessage(message) {
    console.log(message);
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


