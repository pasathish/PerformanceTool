import React, {Component} from 'react'
import ReactAutoCompleteComponent from './ReactAutoCompleteComponent'
import {Button,Tooltip,Icon,Slider,Badge,Switch,Dialog,DialogActions,FABButton} from 'react-mdl'


export default class CriteriaSettingComponent extends Component{
    constructor(){
        super();
        this.state={
            mode:0,
            // criteriaList : [{min_rate:0,max_rate:5,criteria_enable:0,criteria_name:"Criteria1 kdgbwru hiuriewur wiuerrguerh",criteria_description:"Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle."},
            // {min_rate:0,max_rate:5,criteria_enable:0,criteria_name:"Criteria1 kdgbwru hiuriewur wiuerrguerh",criteria_description:"Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle."},
            // {min_rate:0,max_rate:5,criteria_enable:0,criteria_name:"Criteria1 kdgbwru hiuriewur wiuerrguerh",criteria_description:"Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle."},
            // {min_rate:0,max_rate:5,criteria_enable:0,criteria_name:"Criteria1 kdgbwru hiuriewur wiuerrguerh",criteria_description:"Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle."},
            // {min_rate:0,max_rate:5,criteria_enable:0,criteria_name:"Criteria1 kdgbwru hiuriewur wiuerrguerh",criteria_description:"Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle."},
            // {min_rate:0,max_rate:5,criteria_enable:0,criteria_name:"Criteria2",criteria_description:"Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle."},
            // {min_rate:0,max_rate:5,criteria_enable:0,criteria_name:"Criteria3",criteria_description:"Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle."}
            // ,{min_rate:0,max_rate:5,criteria_enable:0,criteria_name:"Criteria1 kdgbwru hiuriewur wiuerrguerh",criteria_description:"Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle."},
            // {min_rate:0,max_rate:5,criteria_enable:0,criteria_name:"Criteria1 kdgbwru hiuriewur wiuerrguerh",criteria_description:"Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle."},
            // {min_rate:0,max_rate:5,criteria_enable:0,criteria_name:"Criteria1 kdgbwru hiuriewur wiuerrguerh",criteria_description:"Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle."},
            // {min_rate:0,max_rate:5,criteria_enable:0,criteria_name:"Criteria1 kdgbwru hiuriewur wiuerrguerh",criteria_description:"Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle."},
            // {min_rate:0,max_rate:5,criteria_enable:0,criteria_name:"Criteria1 kdgbwru hiuriewur wiuerrguerh",criteria_description:"Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle."}]
            criteriaList :[],
            backupCriteriaList:[],
            projectId:"",
            open:false,
            refresh:false
          }
          this.getProject();
        this.modifiedRows=new Set();
        this.getCriteriaList(this.state.projectId);
    }

    options=[];

    getProject(){
      fetch("http://localhost:5000/getProjects",{
          method:"post"
          }).then(async (result)=>{
              result=await result.json();
              if(result){
                  console.log(result)
                  let projects=result;
                  result.forEach((row)=>{
                    this.options.push({value:row.project_id,label:row.project_name});
                  })
                  this.setState({"projects":projects});
              }
          })
  }

    getCriteriaList=(projectId)=>{
      let formData= new FormData();
      formData.append("project_id",projectId);
      this.setState({refresh:true})
      fetch("http://localhost:5000/getSettingCriterias",{
        method:"post",
        body:formData
        }).then(async (response)=>{
            let result=await response.json()
            console.log(result)
            if(result){
              this.setState({refresh:false,criteriaList:result,backupCriteriaList:JSON.stringify(result)});
            }
        });
    }

    handleCloseDialog=()=>{
      this.setState({open:false})
    }

    updateProjectName=(value)=>{
      this.setState({projectId:value})
      this.getCriteriaList(value);
    }

    saveChanges=()=>{
      this.setState({mode:0})
      let formData= new FormData();
      let data=this.getInsertData();
      if(this.state.projectId===""||this.state.projectId===undefined){
        this.setState({open:true});
        return;
      }
      formData.append("updatedRecord",JSON.stringify(data["updatedRecord"]))
      formData.append("updatedRecordKey",JSON.stringify([data["updatedRecordKey"]]))
        fetch("http://localhost:5000/insertSettingCriteria",{
          method:"post",
          body:formData
          }).then(async (response)=>{
            this.modifiedRows=new Set();
              let result=await response
              console.log(result)
              if(result['status']===200){
              }
          });
      }

    getInsertData(){
      let updatedRecord=[];
      let updatedRecordKey=[];
      let criteriaList = this.state.criteriaList
      let project_id=this.state.projectId;
      this.modifiedRows.forEach((value)=>{
        let data=[]
        data.push(criteriaList[value]["criteria_id"]);
        data.push(project_id);//criteriaList[value]["project_id"]);
        data.push(criteriaList[value]["min_rate"]);
        data.push(criteriaList[value]["max_rate"]);
        data.push(criteriaList[value]["criteria_enable"]);
        updatedRecord.push(data);
        updatedRecordKey.push(data[0]);
      })
      return {"updatedRecord":updatedRecord,"updatedRecordKey":updatedRecordKey,"projectId":project_id}
    }

    undoChanges=()=>{
      this.setState({criteriaList:JSON.parse(this.state.backupCriteriaList)});
      this.setState({mode:0})
      }

      changeMinValue=(event,key)=>{
        let {criteriaList}=this.state;
        const value=event.target.value/20;
        criteriaList[key].min_rate=Number(value.toFixed(1));
        this.setState({criteriaList:criteriaList})
        this.modifiedRows.add(key);
      }

      changeMaxValue=(event,key)=>{
        let {criteriaList}=this.state;
        const value=event.target.value/20;
        criteriaList[key].max_rate=Number(value.toFixed(1));
        this.setState({criteriaList:criteriaList})
        this.modifiedRows.add(key);
      }

      changeCriteriaState=(event,key)=>{
        let {criteriaList}=this.state;
        criteriaList[key].criteria_enable=!criteriaList[key].criteria_enable;
        this.setState({criteriaList:criteriaList})
        this.modifiedRows.add(key);
      }

    criteriaBoxList=()=>{
        return this.state.criteriaList.map((value,key)=>{
             return(   <div className="setting-criteria-box" key={key} style={{"height":"auto","position":"relative"}}>
                            <div style={{"paddingTop":"12px",paddingBottom:"10px","lineHeight":"32px",diplay:"inline-block"}}>
                            <span title={value.criteria_name} style={{fontFamily: "initial", paddingLeft:"2%",maxWidth:"172px",overflow:"hidden",textOverflow:"ellipsis",zIndex:"0", whiteSpace: "nowrap",    fontWeight: "bolder",
                                position: "absolute"}}>{value.criteria_name}</span>
                            <span style={{ marginLeft:"18%",position:"relative"}} class="info-icon" ><Tooltip label={<span style={{width:"50%"}}>{value.criteria_description}</span>}>
                                <Icon name="info"  style={{fontSize: "1.3rem"}}/>
                            </Tooltip></span>
                            <span style={{paddingLeft:"6%"}}>
                            <span style={{"position":"absolute",paddingTop:"8px"}}>
                            <Badge primary="true" text={value.min_rate}>
                            <Slider  min={0} max={value.max_rate*20} disabled={this.state.mode===0} onChange={(event)=>{this.changeMinValue(event,key)}} defaultValue={value.min_rate*20}  />
                            </Badge>
                            </span>
                            </span>
                            <span style={{paddingLeft:"32%"}}>
                            <span style={{"position":"absolute",paddingTop:"8px"}}>
                            <Badge primary="true" text={value.max_rate}>                            
                            <Slider  min={value.min_rate*20} max={100} disabled={this.state.mode===0} onChange={(event)=>{this.changeMaxValue(event,key)}} defaultValue={value.max_rate*20} />
                             </Badge></span>  </span>
                            <span style={{float:"right",marginRight:"6%"}}>
                            <Switch ripple id="switch1" defaultChecked={value.criteria_enable} onChange={(event)=>{this.changeCriteriaState(event,key)}} disabled={this.state.mode===0}/>
                            </span>
                            </div>
                            
                        </div> )
        })
    }

    render(){
        return <div style={{width:"900px",margin:"auto",marginTop:"16px",overflow:"auto",color: "rgb(66,66,66)"}}>
            <ReactAutoCompleteComponent onChange={this.updateProjectName} width="160px" data={this.options} label="Select Project"/>
            <div style={{"float":"right","paddingTop":"10px"}}>
                <Button type='button' colored ripple  onClick={this.saveChanges} className={this.state.mode?"":"display-none"}><i className="material-icons" primary="true">save</i>Save</Button>
                <Button type='button' colored ripple  onClick={()=>{this.setState({mode:1})}} className={!this.state.mode?"":"display-none"}><i className="material-icons" primary="true">edit</i>Edit</Button>
                <Button type='button' colored ripple  onClick={this.undoChanges} className={this.state.mode?"":"display-none"}><i className="material-icons" primary="true">cancel</i>Cancel</Button></div>
                <div className="setting-criteria-box"  style={{"height":"auto",minWidth:"890px"}}>
                            <div style={{"paddingTop":"8px",paddingBottom:"8px","position":"inline",fontWeight: "700"}}>
                            <span style={{fontFamily: "initial", paddingLeft:"4%"}}>Criteria Name</span>
                            <span style={{paddingLeft:"16%"}}>
                            Minimum rate value
                            </span>
                            <span style={{paddingLeft:"20%"}}>
                            Maximum rate value
                            </span>
                            <span style={{float:"right",marginRight:"4%"}}>
                            Enable Criteria 
                            </span>
                            </div>
                        </div> 
                <div style={{height:"440px",overflow:"auto",minWidth:"890px"}} key={this.state.mode}>
                {this.state.refresh?<></>:this.criteriaBoxList()}
                </div>
                <Dialog open={this.state.open} onCancel={this.handleCloseDialog}>

<DialogActions style={{}}>


    <FABButton mini colored ripple raised style={{height:"20px",width:"20px",minWidth:"20px"}} onClick={this.handleCloseDialog}>
<Icon name="close" />

</FABButton>
Please Select the Project.
  </DialogActions>

</Dialog>
        </div>
    }
}