const express = require("express");
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override')


//app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

let comments = [
    { id: uuid(), username: 'Todd', comment: 'So funny' },
    { id: uuid(), username: 'Skyler', comment: 'I like to go birdwatching with my dog' },
    { id: uuid(), username: 'Alex', comment: 'Plz delete your account' },
    { id: uuid(), username: 'onlysayswoof', comment: 'woof woof woof' }
];

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
})

app.get('/comments/new', (req, res) => {
    res.render('comments/new');
});

app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() });
    // res.send('Creating comment');
    res.redirect(302, '/comments');

});

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find((comment) => {
        return comment.id === id;
    });
    res.render('comments/show', { comment });
});

app.patch('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const { username, comment: newCommentText } = req.body;
    let comment = comments.find((comment) => {
        return comment.id === id;
    });
    comment.comment = newCommentText;
    res.redirect(302, '/comments');
});

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find((com) => com.id === id);
    res.render('comments/edit', { comment });
});

// app.get('/tacos', (req, res) => {
//     res.send('GET /tacos response');
// });

// app.post('/tacos', (req, res) => {
//     const { meat, qty } = req.body;
//     res.send(`OK here are your ${qty} ${meat} tacos`);
// });

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    //const comment = comments.find((com) => com.id === id);
    comments = comments.filter(comment => comment.id !== id);
    res.redirect(302, '/comments');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});