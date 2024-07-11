function initializeChat(sender) {
    const chatBox = document.getElementById('chat-box');
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');

    function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            const chatData = JSON.parse(localStorage.getItem('chatData')) || [];
            chatData.push({ id: Date.now(), sender: sender, content: message });
            localStorage.setItem('chatData', JSON.stringify(chatData));
            messageInput.value = '';
            displayMessages();
        }
    }

    function displayMessages() {
        const chatData = JSON.parse(localStorage.getItem('chatData')) || [];
        chatBox.innerHTML = '';
        chatData.forEach(msg => {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message');
            messageElement.classList.add(msg.sender.toLowerCase());
            messageElement.textContent = msg.content;
            messageElement.dataset.id = msg.id;
            chatBox.appendChild(messageElement);

            messageElement.addEventListener('click', (e) => {
                e.stopPropagation();
                showDeleteButton(messageElement);
            });
        });
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function showDeleteButton(messageElement) {
        const existingDeleteButton = document.querySelector('.delete-btn');
        if (existingDeleteButton) {
            existingDeleteButton.remove();
        }

        const deleteButton = document.createElement('img');
        deleteButton.src = 'delete.png';
        deleteButton.alt = 'Delete';
        deleteButton.classList.add('delete-btn');
        messageElement.appendChild(deleteButton);

        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteMessage(messageElement.dataset.id);
        });
    }

    function deleteMessage(id) {
        let chatData = JSON.parse(localStorage.getItem('chatData')) || [];
        chatData = chatData.filter(msg => msg.id != id);
        localStorage.setItem('chatData', JSON.stringify(chatData));
        displayMessages();
    }

    sendBtn.addEventListener('click', sendMessage);
    window.addEventListener('storage', displayMessages);
    displayMessages();
}
