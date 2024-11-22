const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static(__dirname)); // Обслуживание файлов из текущей директории

app.use(express.json()); // Для обработки JSON-запросов

// Хранение комментариев в памяти (вместо файла для тестирования)
let comments = [];

// Чтение комментариев
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Добавление комментария
app.post('/comments', (req, res) => {
    const newComment = req.body.comment;
    if (newComment) {
        comments.push(newComment);
        res.status(200).send('Комментарий добавлен');
    } else {
        res.status(400).send('Некорректные данные');
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
