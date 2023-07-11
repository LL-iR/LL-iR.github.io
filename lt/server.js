const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.json());

// 加载聊天记录
app.get('/chatlog', (req, res) => {
  fs.readFile('聊天记录.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('读取聊天记录失败');
      return;
    }

    const chatLog = JSON.parse(data);
    res.json(chatLog);
  });
});

// 写入聊天记录
app.post('/chatlog', (req, res) => {
  const { message, timestamp } = req.body;

  fs.readFile('聊天记录.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('读取聊天记录失败');
      return;
    }

    const chatLog = JSON.parse(data);
    chatLog.push({ message, timestamp });

    fs.writeFile('聊天记录.json', JSON.stringify(chatLog), 'utf8', err => {
      if (err) {
        console.error(err);
        res.status(500).send('写入聊天记录失败');
        return;
      }

      res.sendStatus(200);
    });
  });
});

app.listen(port, () => {
  console.log(`服务器正在运行，端口号：${port}`);
});
