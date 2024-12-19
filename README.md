# StudentHub

StudentHub 是一個專為管理學生資訊而設計的網頁應用程式。提供查看學生列表、新增學生、修改學生姓名，以及刪除學生資料的功能。此專案使用 React 作為前端框架，Node.js 和 Express 作為後端框架，並遵循 MVC（Model-View-Controller）架構。

### 前後端

前端：react-ts-mid-main

後端：mongoDemo-main 2

### 功能

查看所有學生：顯示所有學生的詳細資訊，包括帳號、姓名、年級、班級、院系、Email、座號，以及缺席次數。

新增學生：通過表單新增學生至資料庫。

修改學生姓名：直接從學生列表中更新學生的姓名。

刪除學生：從資料庫中移除學生資料。

### API 端點

GET /findAll：獲取所有學生資料。

POST /insertOne：新增學生。

請求主體參數：

{
  "userName": "string",
  "name": "string",
  "sid": "string",
  "department": "string",
  "grade": "string",
  "class": "string",
  "Email": "string",
  "absences": "number"
}

PUT /updateNameByID：更新學生姓名。

請求主體參數：

{
  "id": "string",
  "name": "string"
}

DELETE /deleteById：按 ID 刪除學生。

查詢參數：id=<student_id>

### 使用方法

查看所有學生

通過導航欄進入「所有學生」頁面。

查看所有學生的詳細資訊。

新增學生

通過導航欄進入「新增學生」頁面。

填寫所需欄位（例如：帳號、姓名、座號、年級等）。

點擊「新增學生」按鈕保存記錄。

修改學生姓名

在「所有學生」列表中找到目標學生。

點擊學生旁邊的「修改姓名」按鈕。

輸入新姓名並點擊「確認」。

刪除學生

在「所有學生」列表中找到目標學生。

點擊學生旁邊的「刪除」按鈕。

確認刪除操作。


### 影片連結

https://youtu.be/9k48FtAVRpA


