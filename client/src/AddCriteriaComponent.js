import React, {Component} from 'react'
import {Textfield,FABButton,IconButton,Icon,Tooltip,List,ListItem,ListItemContent,ListItemAction,Switch,Dialog,DialogTitle,DialogContent,DialogActions,Button } from 'react-mdl'

export default class AddCriteriaComponent extends Component{
   constructor(){
        super();
        this.state = {
        enableSave:false,
        displayUpdate:false,
        //   criteriaList:[{
        //   criteria_description:"Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.",
        //   criteria_name:"Bryan Cranston",criteria_enable:false
        // },{ criteria_description:"Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.",
        // criteria_name:"Bryan Cranston",criteria_enable:true},{ criteria_description:"Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.",
        // criteria_name:"Bryan Cranston",criteria_enable:true},{ criteria_description:"Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.",
        // criteria_name:"Bryan Cranston",criteria_enable:true},{ criteria_description:"Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.",
        // criteria_name:"Bryan Cranston",criteria_enable:true},{ criteria_description:"Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.",
        // criteria_name:"Bryan Cranston",criteria_enable:true},{ criteria_description:"Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.",
        // criteria_name:"Bryan Cranston",criteria_enable:true}]};
        criteriaList:[] ,
        nameAlreadyExist:false
      }
        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.getCriterias();
        this.contentUpdateKey=0;
        this.criteriaNameList=[];
        this.nameBeforeEdit="";
    }


    handleOpenDialog() {
        this.setState({
          openDialog: true
        });
      }
    
    handleCloseDialog() {
        this.setState({
          openDialog: false
        });
        this.refs.criteriaName.inputRef.value="";
        this.refs.criteriaDescription.inputRef.value="";
        this.setState({enableSave:false,displayUpdate:false});

      }

    enableSave=()=>{
        if(this.refs.criteriaName.inputRef.value.trim().length===0){
            this.setState({enableSave:false});
            return;
        }
        if(this.refs.criteriaDescription.inputRef.value.trim().length===0){
            this.setState({enableSave:false});
            return;
        }
        this.setState({enableSave:true});
    }
    
    async getCriterias(){
      fetch("http://localhost:5000/getCriterias",{
        method:"post",
        }).then(async (response)=>{
            let result=await response.json()
            console.log(result)
            if(result){
              this.setState({criteriaList:result});
              this.updateCriteriaName();
            }
        });
    }

    saveCridential=()=>{
        let name =this.refs.criteriaName.inputRef.value
        if(this.criteriaNameList.includes(name)){
          this.setState({nameAlreadyExist:true});
          return;
        }
        this.setState({nameAlreadyExist:false});
        this.setState({enableSave:false});
        let description =this.refs.criteriaDescription.inputRef.value
        let formParam = new FormData();
        formParam.append("criteria_name", name);
        formParam.append("criteria_description", description);
        fetch("http://localhost:5000/insertCriteria",{
          method:"post",
          body: formParam
          }).then(async (response)=>{
            let result=await response
              console.log(result)
              if(result['status']===200){
                this.handleCloseDialog()
                this.getCriterias()
              }
          });
        console.log(name,description);
    }

    updateCriteriaName(){
      this.criteriaNameList=[];
      this.state.criteriaList.forEach((criteria)=>{
        this.criteriaNameList.push(criteria.criteria_name)
      })
    }

    updateChanges(event,key){
        console.log(event,key)
        const currentValue=this.state.criteriaList[key]['criteria_enable']
        this.state.criteriaList[key]['criteria_enable']=!currentValue;
        let formParam = new FormData();
        formParam.append("updateRecord", JSON.stringify(this.state.criteriaList[key]));
        fetch("http://localhost:5000/updateCriterta",{
          method:"post",
          body: formParam
          }).then(async (response)=>{
            console.log(response)
              let result=await response
              console.log(result)
              if(result['status']===200){
                this.handleCloseDialog()
                this.getCriterias()
              }
          });
    }

    editCriteria=(key)=>{
      this.contentUpdateKey=key;
      const currentValue=this.state.criteriaList[key];
      this.refs.criteriaName.inputRef.value=currentValue["criteria_name"];
      this.nameBeforeEdit=currentValue["criteria_name"];
      this.refs.criteriaDescription.inputRef.value=currentValue["criteria_description"];
      this.state.criteriaList[key]['criteria_enable']=!this.state.criteriaList[key]['criteria_enable'];
      this.setState({displayUpdate:true});
      this.handleOpenDialog()
    }

    updateCridential=()=>{
      console.log("not workingnot workingnot workingnot working")
      let name =this.refs.criteriaName.inputRef.value
        if(this.nameBeforeEdit!==name&&this.criteriaNameList.includes(name)){
          this.setState({nameAlreadyExist:true});
          return;
        }
      this.setState({nameAlreadyExist:false});
      this.state.criteriaList[this.contentUpdateKey]['criteria_name'] =name
      this.state.criteriaList[this.contentUpdateKey]['criteria_description'] =this.refs.criteriaDescription.inputRef.value
      this.updateChanges("",this.contentUpdateKey);
      
    }
    deleteCriteria=(key)=>{
      let formParam = new FormData();
        formParam.append("criteria_id", this.state.criteriaList[key]['criteria_id']);
        fetch("http://localhost:5000/deleteCriteria",{
          method:"post",
          body: formParam
          }).then(async (response)=>{
            console.log(response)
              let result=await response
              console.log(result)
              if(result['status']===200){
                this.getCriterias();
              }
          });
    }

    criteriaList=()=>{
      return(this.state.criteriaList.map((value,key)=>{
          return(<ListItem  threeLine  key={key} >
          <ListItemContent avatar="network_check" subtitle={value.criteria_description}><div style={{ maxWidth:"320px", whiteSpace: "pre",wordWrap: "normal",display:"inline-block", textOverflow:"ellipsis", overflow:"hidden"}}>{value.criteria_name}</div>
          <IconButton className="criteriaIcon" name="edit" colored onClick={()=>{this.editCriteria(key)}}/>
          <IconButton  className="criteriaIcon" name="delete" colored onClick={()=>{this.deleteCriteria(key)}}/></ListItemContent>
          <Tooltip label="Enable/Disable Criteria" position="top">
          <ListItemAction>
              <Switch defaultChecked={value.criteria_enable} onChangeCapture={(event)=>{this.updateChanges(event,key)}}/>
          </ListItemAction>
          </Tooltip>
        </ListItem>)
      }))
    }

    render(){
        return <div>
          <List style={{width: '650px',height:"541px",overflow:"auto",marginTop:"20px",background:"white"}}  className="criteria_detail">
            {this.criteriaList()}
          </List>
          {/*=====================================================================*/}
          <Dialog open={this.state.openDialog} onCancel={this.handleCloseDialog}>
            <DialogTitle>Criteria Details</DialogTitle>
            <DialogContent>
            <Textfield ref="criteriaName"
              onChange={()=>{this.enableSave()}}
              label="Criteria Name"
              maxlength="50"
              floatingLabel
              style={{width: '230px'}}
          />
            <Textfield
                ref="criteriaDescription"
                onChange={()=>{this.enableSave()}}
                label="Criteria Description"
                maxlength="200"
                floatingLabel
                rows={3}
                style={{width: '230px'}}
            />
            {this.state.nameAlreadyExist?<div style={{color:"red"}}>Criteria Name already exist</div>:<>:</>}
            </DialogContent>
            <DialogActions>
              {!this.state.displayUpdate?<Button type='button' disabled={!this.state.enableSave} colored ripple raised onClick={this.saveCridential}>Save</Button>
              :<Button type='button' disabled={!this.state.enableSave} colored ripple raised onClick={this.updateCridential}>update</Button>}
              <Button type='button' colored ripple raised onClick={this.handleCloseDialog}>Cancel</Button>
            </DialogActions>
          </Dialog>
          <Tooltip label="Add Criteria" position="top">
            <FABButton ripple colored onClick={this.handleOpenDialog} className="criteria-add-button">
              <Icon name="add" />
            </FABButton>
          </Tooltip>
        </div>
    }
}