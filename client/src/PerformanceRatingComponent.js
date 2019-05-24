
import React, {Component} from 'react'
import 'date-fns';
import {Textfield,Badge,ListItem,ListItemContent,ListItemAction,Slider,Button } from 'react-mdl'
import ReactAutoCompleteComponent from './ReactAutoCompleteComponent'


export default class PerformanceRatingComponent extends Component{
  constructor(){
    super()
    this.dateObject=new Date();
    this.date=(this.dateObject.getDate()).toString()
    this.date=this.date.length<2?"0"+this.date:this.date;
    this.month=(this.dateObject.getMonth()+1).toString()
    this.month=this.month.length<2?"0"+this.month:this.month;
    this.year=this.dateObject.getFullYear();
    this.state = {
      emp_id:"",
      selectedDate: this.year+"-"+this.month+"-"+this.date,
      mode:0,
      criteriaList:[],
      hideSlider:false,
    //  criteriaList:[{criteria_name:"gxghxcxcxcghcxhggc",criteria_description:"Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.",rate:0.0},
    //  {criteria_name:"gxghxcxcxcghcxhggc",criteria_description:"Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.",rate:0.0},
    //  {criteria_name:"gxghxcxcxcghcxhggc",criteria_description:"Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.",rate:0.0},
    //  {criteria_name:"gxghxcxcxcghcxhggc",criteria_description:"Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.",rate:0.0}]
     }
    this.toDaysDate=this.state.selectedDate;
    this.getTeamMembers();
    this.getCriteriaList(this.state.selectedDate,this.state.emp_id);
  }
    
  getCriteriaList=(date,emp_id)=>{
        let form = new FormData()
        console.log(this.state.emp_id);
        form.append("empID",emp_id);
        form.append("date",date);
        this.setState({hideSlider:true})
        fetch("http://localhost:5000/getReport",{
          method:"post",
          body:form
          }).then(async (response)=>{
              let result=await response.json()
              console.log(result)
              if(result){
                this.setState({criteriaList:result,backupCriteriaList:JSON.stringify(result),hideSlider:false})
                this.componentDidMount();
              }
          });
      }

      handleDateChange = event => {
        console.log("event.target.value",event.target.value)
        if(event.target.parentElement.classList.contains("is-invalid")){
          event.target.parentElement.classList.remove("is-invalid")
          event.target.value=this.state.selectedDate;
          return;
        }
        this.setState({ selectedDate: event.target.value });
        this.getCriteriaList(event.target.value,this.state.emp_id);
      };

      updateEmployee = empId => {
        this.setState({emp_id:empId});
        this.getCriteriaList(this.state.selectedDate,empId);
      }

      options = [
        { value: '', label: 'Chocolate' },
        { value: 'Strawberry', label: 'Strawberry' },
        { value: 'Vanilla', label: 'Vanilla' },
        { value: 'Chocolate', label: 'Chocolate' },
        { value: 'Strawberry', label: 'Strawberry' },
        { value: 'Vanilla', label: 'Vanilla' },
        { value: 'Strawberry', label: 'Strawberry' },
        { value: 'Vanilla', label: 'Vanilla' }
      ];
      
      options = [];

      changeRating=(event,key)=>{
        event.persist();
        const value=event.target.value/20
        this.changeIconColor(value,key);
        let {criteriaList}=this.state;
        criteriaList[key].rate=Number(value.toFixed(1));
        this.setState({ criteriaList:criteriaList });
      }

      changeIconColor=(value,key)=>{
          let color="-";
          let removeClass="-"
          let avatarElement=document.getElementsByClassName("mdl-list__item-avatar")[key];
          switch(true){
            case value<1:
                color="rating0";break;
            case value<2:
                color="rating1";break;
            case value<3:
                color="rating2";break;
            case value<4:
                color="rating3";break;
            case value<5:
                color="rating4";break;
            case value===5:
                color="rating5";break;
          }
          if(!avatarElement)
            return;
          avatarElement.classList.forEach(b=>{
            if(b.includes("rating"))
              removeClass=b;
          })
          avatarElement.classList.remove(removeClass);
          avatarElement.classList.add(color);
      }

      getAverage=()=>{
        let totalCriteria=0;
        this.state.criteriaList.map((value,key)=>
          totalCriteria+=value.rate
        )
        return (totalCriteria/this.state.criteriaList.length).toFixed(1)
      }

      componentDidMount(){
        this.state.criteriaList.map((value,key)=>this.changeIconColor(value.rate,key));
      }
      saveChanges=()=>{
        this.setState({mode:0})
        let {criteriaList}=this.state;
        let finalResult=[]
        let finalKeys=[]
        criteriaList.forEach((value)=>{
          let row=[];
          let rowKey=[];
          row.push(this.state.emp_id);//emp_id
          row.push(value.criteria_id);//['criteria_id']
          row.push(this.state.selectedDate);
          row.push(value.rate);//rate
          row.push(value.criteria_discription);//criteria_discription
          rowKey.push(row[0]);
          rowKey.push(row[1])
          rowKey.push(row[2])
          finalKeys.push(rowKey)
          finalResult.push(row)
        })
        let form = new FormData()
        form.append("updatedRecord",JSON.stringify(finalResult));
        form.append("updatedRecordKey",JSON.stringify(finalKeys));
        fetch("http://localhost:5000/insertReport",{
          method:"post",
          body:form
          }).then(async (response)=>{
              let result=await response
              console.log(result)
              if(result){
                
              }
          });
      }

      undoChanges=()=>{
        this.setState({criteriaList:JSON.parse(this.state.backupCriteriaList)});
        this.setState({mode:0})
        this.componentDidMount();
      }

      updateOptions=(results)=>{
        results.forEach((row)=>{
            this.options.push({value:row.empId,label:row.empName})
        })
    }

      getTeamMembers(){
        fetch("http://localhost:5000/getTeamMember",{
                method:"post"
            }).then(async (result)=>{
                result=await result.json();
                console.log(result)
                if(result){
                    this.updateOptions(result);
                }
            })
    }

      updateComments=(event,key)=>{
        let {criteriaList}=this.state;
        criteriaList[key].criteria_discription=event.target.value;
        this.setState({ criteriaList:criteriaList });
      }

      formCriteria=()=>{
          return this.state.criteriaList.map((value,key)=>{
            return (<ListItem threeLine className="criteria-box" key={key}>
              {!this.state.hideSlider?<ListItemContent id={value.criteria_name} avatar="network_check" subtitle={<div className="rating_description">{value.criteria_description}</div>} ><span title={value.criteria_name}><Badge text={""+(value.rate===0?value.min_rate:value.rate)}>{value.criteria_name}</Badge></span> </ListItemContent>:<></>}
              {!this.state.hideSlider?<ListItemAction  style={{"paddingTop":"60px"}} >
                <Slider min={value.min_rate*20} max={value.max_rate*20} disabled={this.state.mode===0} defaultValue={value.rate*20} onChange={(event)=>{this.changeRating(event,key)}} />
              </ListItemAction>:<></>}
              <Textfield
                disabled={this.state.mode===0}
                onChange={() => {}}
                value={value.criteria_discription}
                label="Remarks"
                floatingLabel
                rows={2}
                onBlur={(event)=>{this.updateComments(event,key)}}
                style={{width: '230px',marginTop:'36px'}}
            />
           </ListItem>)
          })
      }

      render() {
        const criteriaListHeight=this.props.criteriaListHeight?this.props.criteriaListHeight:"500px"
        return (<div style={{"width":"1080px" ,"margin":"auto","paddingTop":"20px"}}>
        <div>
           <ReactAutoCompleteComponent marginRight="20px" width="200px" id="001" onChange={this.updateEmployee} data={this.options} disabled={this.props.disableInput} label="Employee Name"></ReactAutoCompleteComponent>
              Average Rating : {this.getAverage()}
           <div style={{"float":"right","paddingTop":"10px"}}>
           <Button type='button' colored ripple  onClick={this.saveChanges} className={this.state.mode?"":"display-none"}><i class="material-icons" primary>save</i>Save</Button>
           <Button type='button' colored ripple  onClick={()=>{this.setState({mode:1})}} className={!this.state.mode?"":"display-none"}><i className="material-icons" primary>edit</i>Edit</Button>
           <Button type='button' colored ripple  onClick={this.undoChanges} className={this.state.mode?"":"display-none"}><i class="material-icons" primary>cancel</i>Cancel</Button></div>
           <div style={{"float":"right","marginTop":"-6px","width":"136px"}}>
            <form>
            <Textfield
              id={this.props.id}
              type="date"
              label="Date"
              defaultValue={this.state.selectedDate}
              className="datetextField"
              floatingLabel
              max={this.toDaysDate}
              disabled={this.props.disableInput}
              onChange={this.handleDateChange}
              inputiabelprops={{
                shrink: true,
              }}
              ></Textfield></form>
            </div> 
            </div>
           <div style={{height:criteriaListHeight,overflow:"auto",background:"white"}}>
           {this.formCriteria()};
           </div>
           </div>
        );
      }
}