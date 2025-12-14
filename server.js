const express = require('express');
const { ExpressPeerServer } = require('peer');
const app = express();
const httpServer = require('http').createServer(app);

// Ответ на корневой запрос (чтобы не было "Cannot GET /")
app.get('/', (req, res) => {
  res.send('PeerServer is running.');
});

// Подключаем PeerServer с настройками для Render.com
app.use('/', ExpressPeerServer(httpServer, {
  proxied: true,        // обязательно для Render
  debug: true           // можно убрать в продакшене
}));

// Запуск сервера
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log('✅ PeerServer запущен на порту', PORT);
});
