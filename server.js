import mongoose from "mongoose";
import express, { response } from "express";
import ejs from 'ejs';

await mongoose.connect('mongodb://localhost/blog_database', {
    useNewUrlParser:true
});

const BlogSchema = new mongoose.Schema({
    title: String,
    article: String
});
const BlogModel = mongoose.model('Blog', BlogSchema);
const HOST = '0.0.0.0';
const PORT = 3000;
const app = express();
app.use(express.static('static'));
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.listen(3000, () => {
    console.log(`http://${HOST}:${PORT}`);
});
app.get('/', async (request, response) => {
    const blogposts = await BlogModel.find({});
    response.render('index', {
    title : '메인', 
    data : blogposts
})});
app.get('/about', (_request, response) => 
    response.render('about', {title : 'about'}));
app.get('/post', (request, response) => 
    response.render('post', {title : 'post'}));
app.get('/contact', (request, response) => 
    response.render('contact', {title : 'contact'}));
app.get('/post/add', (request, response) => response.render('add', {
    title:'새 글 쓰기'
    })
);
app.post('/post/add', async (request, response) => {
    await BlogModel.create(request.body);
    response.redirect('/');
})
app.get('/post/:id?', (request, response) => response.render('post', {
    title : '포스트',
    id: request.params.id || 1123123123
})
);