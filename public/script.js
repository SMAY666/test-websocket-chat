const http = new XMLHttpRequest();
const messagesList = document.getElementById('messages');


function loadMessages() {
    http.open('GET', 'http://localhost:8001/api/msg');
    http.send();

    http.onload = () => {
        if (http.status !== 200) {
            alert('Ошибка загрузки данных');
        } else {
            const messages = JSON.parse(http.response);

            messages.map((message) => {
                const item = document.createElement('li');
                item.textContent = message.message;
                messagesList.appendChild(item);
                window.scrollTo(0, document.body.scrollHeight);
            });
        }
    };
}

window.onload = () => {
    loadMessages();
};
