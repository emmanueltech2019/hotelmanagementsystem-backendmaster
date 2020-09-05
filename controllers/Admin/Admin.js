const bcrypt  = require("bcrypt")
const Admin = require('../../models/admin/Admin')
const jwt=require('jsonwebtoken');
const {SECRET_KEY} =require("../../config")
exports.register=(req,res,next)=>{
    console.log("got here")
    bcrypt.hash(req.body.password, 10).then(
        (hash) => {
          const user = new Admin({
            email: req.body.email,
            password: hash
          });
          user.save().then(
            () => {
              res.status(201).json({
                message: 'User created successfully!',
                user,
                status:true
              });
            }
          ).catch(
            (error) => {
              res.status(500).json({
                error: error,
                status:false,
                message:"user not created",
              });
            }
          );
        }
      );
}




exports.login=(req,res,next)=>{
    const {email,password} = req.body;
      Admin.findOne({email},(err,user)=>{
          if(err){
              return res.status(500)
              .json({
                  message:"login error",
                  status:false
              })
          }
          if(!user){
              return res.status(404)
              .json({
                  message:"user does not exist",
                  status:false
              })
          }
          const passwordIsValid = bcrypt.compareSync(password, user.password);
          if (!passwordIsValid) {
              return res.status(403).json({
                   message: 'login invalid',
                   status:false,
               });
          }
          const token = jwt.sign({ id: user._id }, SECRET_KEY, {expiresIn: "86400s"});
          res.status(200).json({
          user,
          message: 'Authenticated',
          token,
          });
          
      })
  }