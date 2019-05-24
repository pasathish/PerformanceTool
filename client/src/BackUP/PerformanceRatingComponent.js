
import React, {Component} from 'react'
import 'date-fns';
import {Textfield,FABButton,Icon,Tooltip,List,ListItem,ListItemContent,ListItemAction,Switch,Dialog,DialogTitle,DialogContent,DialogActions } from 'react-mdl'
import Select from 'react-select';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import {Button,InputLabel,Input} from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';

import ReactAutoCompleteComponent from './ReactAutoCompleteComponent'

export default class PerformanceRatingComponent extends Component{
    state = {
        selectedOption: null,
            open: false, 
            anchorOriginVertical: 'top',
            anchorOriginHorizontal: 'left',
            transformOriginVertical: 'top',
            transformOriginHorizontal: 'left',
            positionTop: 200, // Just so the popover can be spotted more easily
            positionLeft: 400, // Same as above
            anchorReference: 'anchorEl',
            selectedDate: null,
            employeeName:""
      }
      handleDateChange = date => {
        this.setState({ selectedDate: date });
      };
    
     closePopper = () => {
        setTimeout(()=>{this.setState({
          open: false,
        });},200);
      };

      openPopper = event => {
        event.persist();
        console.log("null",event)
        const { currentTarget } = event;
        this.setState(state => ({
          anchorEl: state.anchorEl ? null : currentTarget,
          open:true
        }));
      };

      setEmployee = event =>{
        console.log(event);
        this.setState({ employeeName: event,open:false });
      }

      options = [
        { value: 'Chocolate', label: 'Chocolate' },
        { value: 'Strawberry', label: 'Strawberry' },
        { value: 'Vanilla', label: 'Vanilla' },
        { value: 'Chocolate', label: 'Chocolate' },
        { value: 'Strawberry', label: 'Strawberry' },
        { value: 'Vanilla', label: 'Vanilla' },
        { value: 'Strawberry', label: 'Strawberry' },
        { value: 'Vanilla', label: 'Vanilla' }
      ];
      empOptions=() => {
        var div= this.options.map((value,key)=>{return (<div className="suggession" onClick={()=>{this.setEmployee(value.value)}} key={value.value}>{value.label}</div>)});
        return div;
      }


      render() {
        const {open} = this.state;
          const { selectedDate } = this.state;
          const { employeeName } = this.state;
        return (<div style={{"width":"50%"}}>
            <FormControl style={{"width":"200px"}}>
              <InputLabel htmlFor="custom-css-standard-input" >
                Employee Name
              </InputLabel>
            <Input  aria-describedby="id-1" 
              id="custom-css-standard-input"
              onClick={this.openPopper}
              onFocus={this.openPopper}
              onBlur={this.closePopper} 
              value={employeeName}/>
              {open?<div className="effect8">
                {this.empOptions()}
              </div>:<></>}
            
           </FormControl><div>
             <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
              margin="normal"
              label="Date"
              value={selectedDate}
              onChange={this.handleDateChange}/>
            </MuiPickersUtilsProvider></div>  

            <ReactAutoCompleteComponent width="200px" id="001" data={this.options}></ReactAutoCompleteComponent>
           </div>
        );
      }
}