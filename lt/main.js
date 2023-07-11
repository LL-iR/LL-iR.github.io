// 全局变量，用于存储聊天记录
var chatLog = [];

// 添加消息到聊天记录
function addToChatLog(message) {
  chatLog.push(message);
}

// 将聊天记录保存到 JSON 文件中
function saveChatLog() {
  var jsonData = JSON.stringify(chatLog);
  
  var blob = new Blob([jsonData], {type: 'application/json'});
  var url = URL.createObjectURL(blob);
  
  // 创建一个下载链接
  var link = document.createElement('a');
  link.href = url;
  link.download = '聊天记录.json';
  
  // 模拟点击下载链接
  link.click();
}

// 发送消息按钮的点击事件处理程序
function sendMessage() {
  var messageInput = document.getElementById('message-input');
  var message = messageInput.value;
  
  addToChatLog(message);
  
  // 在页面中显示消息
  var chatLogDiv = document.getElementById('chat-log');
  chatLogDiv.innerHTML += '<p>' + message + '</p>';
  
  // 清空输入框
  messageInput.value = '';
  
  // 保存聊天记录
  saveChatLog();
}
