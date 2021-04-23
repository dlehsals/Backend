import mongoose from 'mongoose'

await mongoose.connect('mongodb://localhost/my_database', {
    useNewUrlParser:true
});

const TestSchema = new mongoose.Schema({
    title: String,
    body: String
});
const TestModel = mongoose.model('Test', TestSchema);

TestModel.create({
    title:"hustar-title",
    body:"3기 교육중 - 데이터추가"
    },(error, testmodel)=>{
    if(error !== null)
        console.log(error);
    else
        console.log(testmodel);
    mongoose.disconnect();
});
let id = '60822e3196be27279463d5b5';
TestModel.findByIdAndUpdate(id,{
    title : 'updated title 111111'
}, (error, testmodel)=>{
    if(error !== null){
        console.log(error);
    }
    else{
        console.log(testmodel);
        mongoose.disconnect();
    }
});
/*
TestModel.create({
    title:"hustar title",
    body:"3기 교육중 - 데이터 추가"}, (error, testmodel)=>{
        if(error !== null)
            console.log(error);
        else
            console.log(testmodel);
});*/