const loginDao=require('../dao/login_dao');

class LoginService{
    getLoginUserData(req,res){
        loginDao.getLoginUserData(req.body.username,req.body.password).then((result)=>{
            console.log("Login service",result)
            if(result.lenght!==0){
                    req.session['user']=result[0]['emp_id'];
                    req.session['projectId']=result[0]['project_id'];
                    console.log("userMain",req.session['user'],req.sessionID);
                    res.send(JSON.stringify({login:true}));
            }else{
                res.send(JSON.stringify({login:false}));
            }
        });
    }
}
module.exports=new LoginService();

