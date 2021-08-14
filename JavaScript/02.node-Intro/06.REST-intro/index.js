const express = require('express');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(8080, () =>
  console.log('server started at 8080 and listenting to incoming requests')
);

const comments = [
  {
    id: uuid(),
    username: 'qwerty',
    comment: '1qaz2wsx',
  },
  {
    id: uuid(),
    username: 'asdfg',
    comment: '3edc4rfv',
  },
  {
    id: uuid(),
    username: 'zxcvbn',
    comment: '5tgb6yhn',
  },
];

app.get('/comments', (req, res) => {
  res.render('index', { comments });
});

app.get('/comments/new', (req, res) => {
  res.render('new');
});

app.post('/comments', (req, res) => {
  // console.log(req.body);
  req.body.id = uuid();
  comments.push(req.body);
  res.redirect('/comments');
});

app.get('/comments/:id', (req, res) => {
  const { id } = req.params;
  const selectedComment = comments.find((comment) => comment.id === id);
  // console.log(id);
  // console.log(selectedComment);
  res.render('show', { selectedComment });
});

app.get('/comments/:id/edit', (req, res) => {
  const { id } = req.params;
  const selectedComment = comments.find((comment) => comment.id === id);
  res.render('edit', { selectedComment });
});

app.patch('/comments/:id', (req, res) => {
  const { id } = req.params;
  const editedComment = req.body.comment;
  const selectedComment = comments.find((comment) => comment.id === id);
  selectedComment.comment = editedComment;
  res.redirect('/comments');
});

app.delete('/comments/:id', (req, res) => {
  const { id } = req.params;
  const selectedCommentIndex = comments.findIndex(
    (comment) => comment.id === id
  );
  comments.splice(selectedCommentIndex, 1);
  res.redirect('/comments');
});
