
import express from "express";
import ejs from 'ejs';
const HOST = '0.0.0.0';
const PORT = 3000;
const app = express();
app.use(express.static('static'));
app.set('view engine', 'ejs');
app.listen(3000, () => {
    console.log(`http://${HOST}:${PORT}`);
});

app.get('/', (request, response) => response.render('index', {title : '메인', user: {name: 'Hustar',location : '<h1>DCU<h1>'}, 
    data: [
        '첫 번째', '두 번째', '세 번째'
    ]
}));
app.get('/about', (request, response) => 
response.render('about', {title : 'about'}));
app.get('/post', (request, response) => 
response.render('post', {title : 'post'}));
app.get('/contact', (request, response) => 
response.render('contact', {title : 'contact'}));