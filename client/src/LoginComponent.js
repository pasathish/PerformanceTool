import React ,{Component} from 'react'
import {Card,CardText,CardActions,Button,Textfield,CardTitle} from 'react-mdl'


export default class Login extends Component{
    constructor(props){  
        super(props)
        this.state={
            userNameError:false,
            passwordError:false,
        };
    }
    checkLoginCredential=()=>{
        if(this.refs.username.inputRef.value.trim().label===0){
            this.setState({userNameError:true});
            return;
        }
        this.setState({userNameError:false});
        if(!this.refs.password.inputRef.value){
            this.setState({passwordError:true});
            return;
        }
        this.setState({passwordError:false});
        let formParam = new FormData();
        formParam.append("username", this.refs.username.inputRef.value);
        formParam.append("password", this.refs.password.inputRef.value);
        fetch("http://localhost:5000/Login",{
            method:"post",
            body:formParam
        }).then(async (response)=>{
            let result=await response.json()
        console.log(result)
        this.props.updateLoginStatus(result['login'])
        });
    }
    render(){
        return(
        <div className="userLogin">
            <Card shadow={0} style={{width: '320px', height: '400px', margin: 'auto', }}>
            <CardTitle expand style={{display:"inline-block", color: ''}}>
                <div><h4 style={{marginTop: '0',display:'inline-block'}}>
                Welcome
                </h4></div><div style={{position:"absolute"}}>
                <img style={{height:"140px",marginLeft:"54px",borderRadius:"68px"}} src="./images.jpg" alt="User Image"></img>
            </div></CardTitle>
        <CardText>
        <div ><Textfield ref="username"
            style={{"width":"200px"}}
            type="text"
            label='User Name'
            floatingLabel
            ></Textfield>
            </div>
            <div style={{ marginTop:"-10px"}}><Textfield
            ref="password"
            style={{"width":"200px"}}
            type="password"
            label='Password'
            floatingLabel
            ></Textfield></div>
            {this.state.passwordError?<div style={{"color":"red"}}>Please enter the password</div>:<></>}
            {this.state.userNameError?<div style={{"color":"red"}}>Please enter the user name</div>:<></>}
        </CardText>
        <CardActions border>
            <Button colored onClick={this.checkLoginCredential}>Login</Button>
        </CardActions>
    </Card>
        </div>
        );
    }
}