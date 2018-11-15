const mongoose = require('mongoose');
require('../models/student');
const { check,validationResult } = require('express-validator/check');
// const { sanitizeBody } = require('express-validator/filter');

const Student = mongoose.model('Student');


module.exports = app => {
    app.post('/register-student', [
        check('firstName').isLength({ min: 1 }).trim().withMessage('First Name empty.'),
        check('lastName').isLength({ min: 1 }).trim().withMessage('Last name is empty.'),
        check('telephone').isLength({min: 1}).trim().toInt('Provide a phone number'),

        
    ] ,(req, res) => {
        const errors = validationResult(req);
       
        if(!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        
        var newStudent = new Student({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            telephone:req.body.telephone
        })

        newStudent.save(function (err, doc) {
            if (err)
            res.json('Whoops! I\'m sorry, an error happened while sending your message. Please send a message directly to <a href="mailto:medina.techie@gmail.com">medina.techie@gmail.com');
            else
                res.send(`Thanks for reaching out ${req.body.firstName}!`);
                console.log(`${newStudent.firstName} was saved to the data base`);

        });

        console.log(req.body.firstName)
        console.log(req.body.lastName)
        console.log(req.body.telephone)
        

    });

    app.get('/students', (req, res) =>{ 
        Student.find({}, function(err, data){
            console.log(">>>> " + data );
            res.send(data)
        });
    })
   
}