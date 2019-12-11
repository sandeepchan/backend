const Pool = require('pg').Pool
const bcrypt = require('bcryptjs')
const pool = new Pool({
    user: 'postgres',
    host:'localhost',
    database: 'list',
    password: 'sandeep',
    port: 5432
})
const getUsers = (req, res)=>{
    pool.query('SELECT * FROM register').then(dat=> {
        res.json(dat.rows)
    }).catch(err => {
        res.status(400).json({message:'something went wrong'})
    })
}
const registerUser = (req, res)=> {
    const {name, email, password, age}= req.body;
    // var age = toString(req.body.age);

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    
    pool.query('Insert into register (name, email, password, age) values($1, $2, $3, $4)', [name, email, hash,age]).then(data=> {
        res.json({
            status:200,
            message:"User Create Successfully"
        })
    }).catch(err=> {
        console.log(err)
    })
}
// const login = (req, res)=> {
//     const {email, password} = req.body;
//     const text = pool.query('Select  * from register where email = $1')
// }
const loginUser = (req , res)=> {
    const {email, password}= req.body;
    pool.query('select email, password from register where email = $1',[email]).then(data=>{
        
        if(!data.rows.length){
            res.json({
                status: 404,
                message:"User Does not exist"
            })
        }else{
                if(bcrypt.compare(data.rows[0].password,password)){
                    console.log("Login Successfully");
                    res.json({
                        status: 200,
                        message: "Login Successfully"
                    });
                }else{
                    res.json({
                        status: 401,
                        message:"Password Missmatch"
                    });
                }
        }
        
    })

}
const updateUser = (req, res)=> {
    const id =req.params.id
    // console.log(id);
    const {email, name, age}= req.body
    
    pool.query('Update register Set name = $1, age =$2  where id =$3' , [name, age,id] ).then(data=> {
        console.log(data)
        res.json({
            status:200,
            message:"User Create Successfully"
        })
    }).catch(err=> {
        console.log(err)
    })
}
const deleteUser = (req, res)=> {
    const id =req.params.id
    pool.query('Delete from register where id = $1', [id]).then(data=> {
        res.json({
            status:200,
            message:"User Create Successfully"
        })
    }).catch(err=> {
        console.log(err)
    })
    

}
module.exports = {
    getUsers,
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
    updateUser

}