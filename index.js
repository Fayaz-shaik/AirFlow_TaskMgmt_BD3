const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];

app.get('/tasks/add', (req, res) => {
  const { taskId, text, priority } = req.query;
  if (!taskId || !text || !priority) {
    return res.status(400).send({ error: 'Missing parameters' });
  }
  tasks.push({ taskId: parseInt(taskId), text, priority: parseInt(priority) });
  res.send({ tasks });
});

app.get('/tasks', (req, res) => {
  res.send({ tasks });
});

app.get('/tasks/sort-by-priority', (req, res) => {
  const sortedTasks = [...tasks].sort((a, b) => a.priority - b.priority);
  res.send({ tasks: sortedTasks });
});

app.get('/tasks/edit-priority', (req, res) => {
  const { taskId, priority } = req.query;
  if (!taskId || !priority) {
    return res.status(400).send({ error: 'Missing parameters' });
  }
  const task = tasks.find((t) => t.taskId === parseInt(taskId));
  if (task) {
    task.priority = parseInt(priority);
    res.send({ tasks });
  } else {
    res.status(400).send({ error: 'Bad request.Task not found' });
  }
});

app.get('/tasks/edit-text', (req, res) => {
  const { taskId, text } = req.query;
  if (!taskId || !text) {
    return res.status(400).send({ error: 'Missing parameters' });
  }
  const task = tasks.find((t) => t.taskId === parseInt(taskId));
  if (task) {
    task.text = text;
    res.send({ tasks });
  } else {
    res.status(400).send({ error: 'Bad request.Task not found' });
  }
});

app.get('/tasks/delete', (req, res) => {
  const { taskId } = req.query;
  if (!taskId) {
    return res.status(400).send({ error: 'Missing parameters' });
  }
  const initialLength = tasks.length;
  tasks = tasks.filter((t) => t.taskId !== parseInt(taskId));
  if (tasks.length < initialLength) {
    res.send({ tasks });
  } else {
    res.status(400).send({ error: 'Bad request.Task not found' });
  }
});

app.get('/tasks/filter-by-priority', (req, res) => {
  const { priority } = req.query;
  if (!priority) {
    return res.status(400).send({ error: 'Missing parameters' });
  }
  const filteredTasks = tasks.filter((t) => t.priority === parseInt(priority));
  res.send({ tasks: filteredTasks });
});

app.listen(port, () => {
  console.log(`Task management system running at http://localhost:${port}`);
});
