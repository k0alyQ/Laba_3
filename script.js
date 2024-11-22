// Обработка кнопок для секций
const buttons = document.querySelectorAll('.button');
const infos = document.querySelectorAll('.info');

const commentForm = document.getElementById('comment-form');
const commentInput = document.getElementById('comment-input');
const commentsList = document.getElementById('comments-list');

buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        infos[index].style.display = infos[index].style.display === 'none' ? 'block' : 'none';
    });
});

// Загрузка комментариев с сервера
window.addEventListener('load', () => {
    fetch('/comments')
        .then(response => response.json())
        .then(comments => {
            comments.forEach(comment => addCommentToDOM(comment));
        })
        .catch(error => {
            console.error('Ошибка загрузки комментариев:', error);
        });
});

// Отправка нового комментария на сервер
function saveCommentToServer(comment) {
    fetch('/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment }),
    })
        .then(response => response.text()) // Получение строки
        .then(message => {
            console.log(message); // "Комментарий добавлен"
        })
        .catch(error => console.error('Ошибка:', error));

}

function addCommentToDOM(commentText) {
    const commentItem = document.createElement('li');
    commentItem.className = 'comment-item';

    const commentContent = document.createElement('span');
    commentContent.textContent = commentText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.className = 'delete-comment-btn';
    deleteButton.addEventListener('click', () => {
        commentsList.removeChild(commentItem);
    });

    commentItem.appendChild(commentContent);
    commentItem.appendChild(deleteButton);
    commentsList.appendChild(commentItem);
}

// Обработчик формы
commentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const commentText = commentInput.value.trim();
    if (commentText === '') return;

    addCommentToDOM(commentText);
    saveCommentToServer(commentText);

    commentInput.value = '';
});
