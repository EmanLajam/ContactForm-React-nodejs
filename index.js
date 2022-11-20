const  express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const { response } = require('express');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());


app.get('/', (req,res) => {
    res.send("Hello Eman")

})

app.post('/api/contact', (req, res)=>{
    let data = req.body
    let smtpTranport = nodemailer.createTransport({
        service: 'Gmail',
        port:465,
        auth:{
            
            user:'nodereacttestt@gmail.com',
            pass:'dydefpdkdsnyhoqv'
        }
    });

let mailOptions={
    from:data.email,
    to:'nodereacttestt@gmail.com',
    subject:`Message from ${data.name}`,
    html:`
    <h3>Informations</h3>
    <ul>
    <li>Name: ${data.name}</li>
    <li>Email: ${data.email}</li>
    </ul>

    <h3>Message</h3>
    <p>${data.message}</p>
    `
};

smtpTranport.sendMail(mailOptions, (error,response)=>{
    if(error){
        res.send(error)
        console.log(error)
    }else{
        res.send('Success')
    }
})
smtpTranport.close();

})






const PORT = process.env.PORT||3001;
app.listen(PORT, () => {
    console.log('Server Running !');
})
