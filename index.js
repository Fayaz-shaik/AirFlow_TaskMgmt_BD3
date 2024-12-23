const express = require('express');
const cors = require('cors');
const { resolve } = require('path');

const app = express();
const port = 3010;

app.use(cors());

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 }
];

//<http://localhost:3000/tasks/add?taskId=4&text=Review%20code&priority=1>
app.get('/tasks/add',(req,res)=>{
  let taskId = parseInt(req.query.taskId)
  let text = req.query.text
  let priority = parseInt(req.query.priority)

  tasks.push({taskId,text,priority});
  res.json({tasks})
})

// app.get('/', (req, res) => {
//   res.sendFile(resolve(__dirname, 'pages/index.html'));
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
