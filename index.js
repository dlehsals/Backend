import express from 'express';
import mongoose from 'mongoose';
import path from 'path';

await mongoose.connect('mongodb://localhost/hustar', {useNewUrlParser:true});
const HOST = '0.0.0.0';
const POST = 3000;

const TodoSchema = new mongoose.Schema({
    user: String,
    todo : String,
    created : {
        type : Date,
        default : new Date()
    }
});

const TodoModel = mongoose.model('todo', TodoSchema);
const app = express();
app.use(express.json());
app.listen(POST, HOST, () => console.log(`Running on ${HOST}:${POST}`));

app.get('/', async (request, response) => {
    try{
        const documents = await TodoModel.find({});
        response.send(documents);
    } catch(error){
        response.send({"error" : err});
    }
   
});

app.get('/:id', async (request, response) => {
    try{
        const document = await TodoModel.findById(request.params.id);
        response.send(document);
    }catch(error){
        response.send({"error" : err});
    }
    
});

app.post('/', async (request, response) => {
    try{
        const document =  await TodoModel.create(request.body);
        response.json(document);
    }catch(error){
        response.send({"error" : err});
    }
    
});
app.put('/:id', async (request, response) => {
    const before = await TodoModel.findByIdAndUpdate(request.params.id, request.body);
    const after = await TodoModel.findById(request.params.id);
    response.send({"before" : before, "after" : after});
});
app.delete('/:id', async (request, response) => {
    try{
        const document = await TodoModel.findByIdAndDelete(request.params.id);
        response.send({'removed' : document});
    } catch(err){
        response.send({"error" : err});
    }
});

