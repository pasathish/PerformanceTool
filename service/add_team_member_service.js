const dao=require('../dao/add_team_member_dao');
class AddTeamMemberService{
    
    insertScreenSetting(res){
        return dao.insertScreenSetting().then((result)=>{
            if(res===null){
                return result;
            }
            res.send(result);
        });
    }

    insertTeamMember(obj,res){
        dao.insertTeamMember(obj,res);
    }

    deleteTeamMember(res,obj){
        dao.deleteTeamMember(res,obj);
    }

    insertProject(obj,res){
        dao.insertProject(obj,res);
    }

    deleteProject(res,obj){
        console.log(obj)
        dao.deleteProject(res,obj);
    }

    insertNewMember(obj,res){
        dao.insertNewMember(obj,res);
    }    

    deleteNewMember(res,obj){
        dao.deleteNewMember(res,obj);
    }   
    
    getProjects(res){
        dao.getProjects(res);
    }

    getTeamMember(supervisorId,res){
        dao.getTeamMember(supervisorId,res);
    }

    getProjectMember(res){
        dao.getProjectMember(res);
    }

    getScreenSetting(){
        dao.getScreenSetting();
    }
}
module.exports=AddTeamMemberService;
