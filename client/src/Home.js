import React,{Component}from 'react';
import { Layout, Header, Textfield, Drawer, Navigation, Content, Button, FABButton, Icon } from 'react-mdl';
import { Route, NavLink, BrowserRouter as Router, Switch, Redirect ,Link } from 'react-router-dom'
import App from './App.js'
import AddCriteria from './AddCriteriaComponent'
import NotFound from './NotFoundComponent'
import CriteriaSetting from './CriteriaSettingComponent'
import PerformanceRating from './PerformanceRatingComponent'
import PerformanceReportComponent from './PerformanceReportComponent'
import Setting from './SettingComponent'
import Login from './LoginComponent';

export default class Home extends Component{
 constructor(props){
     super(props);
     this.state={title:"Login",LoggedIn:true};
     //this.checkLoginStatus();
 }

checkLoginStatus=()=>{
    fetch("http://localhost:5000/LoginStatus",{
        method:"post"
        }).then(async (response)=>{
            let result=await response.json()
        console.log(result)
        this.updateLoginStatus(result['login'])
        });
}


changeTitle=(value)=>{
    if(this.state.LoggedIn)
        this.setState((state)=>state.title=value);
}

updateLoginStatus=(value)=>{
    const label=value?"Home":"Login"
    this.setState({LoggedIn:value,title:label});
}

logout=()=>{
    fetch("http://localhost:5000/Logout");
    this.updateLoginStatus(false)
}
 render(){
     return <div className="body" style={{height: '100%',width: '100%',overflow:"auto"}}>
     <Layout fixedHeader>
     <Router>
     <Header title={this.state.title}>
            <Textfield
                value=""
                onChange={() => {}}
                label="Search"
                expandable
                expandableIcon="search"
            />
            <FABButton onClick={this.logout}>
            <Link to="/Login">
                <Icon name="account_circle" />
            </Link>
            </FABButton>
    </Header>
         <Drawer title="Menu">
             <Navigation>
                 <NavLink to="/AddCriteria" onClick = {()=>this.changeTitle('Add Criteria')}>Add Criteria</NavLink>
                 <NavLink to="/CriteriaSetting" onClick = {()=>this.changeTitle('Criteria Setting')} >Criteria Setting</NavLink>
                 <NavLink to="/PerformanceRating" onClick = {()=>this.changeTitle('Performance Rating')}  >Performance Rating</NavLink>
                 <NavLink to="/PerformanceReport" onClick = {()=>this.changeTitle('Performance Report')} >Performance Report</NavLink>
                 <NavLink to="/AddTeamMembers" onClick = {()=>this.changeTitle('Add Team Members')} >Add Team Members</NavLink>
             </Navigation>
         </Drawer>
         <Content >
            <div>
            <Switch>
             <Route exact path="/" render={()=>{return(
            this.state.LoggedIn?<></>:<Redirect to="/Login"/>)}} />
            <Route exact path="/AddCriteria" render={()=>{return(
            this.state.LoggedIn?<AddCriteria/>:<Redirect to="/Login"/>)}} />
            <Route exact path="/CriteriaSetting" render={()=>{return(
            this.state.LoggedIn?<CriteriaSetting/>:<Redirect to="/Login"/>)}} /> 
            <Route exact path="/PerformanceRating" render={()=>{return(
            this.state.LoggedIn?<PerformanceRating/>:<Redirect to="/Login"/>)}} />
            <Route exact path="/PerformanceReport" render={()=>{return(
            this.state.LoggedIn?<PerformanceReportComponent/>:<Redirect to="/Login"/>)}} />
             <Route exact path="/AddTeamMembers" render={()=>{return(
            this.state.LoggedIn?<Setting/>:<Redirect to="/Login"/>)}} />
            <Route exact path="/Login" render={()=>{return( !this.state.LoggedIn?<Login updateLoginStatus={this.updateLoginStatus}/>:<Redirect to="/"/>)}} />
             <Route component={NotFound}/> 
            </Switch>
            </div>
         </Content>
        </Router>
     </Layout>
 </div>
 }
}