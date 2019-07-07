import React, { Component } from "react";
import PerformanceRatingComponent from "./PerformanceRatingComponent";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TableHeader,
  Table,
  Textfield
} from "react-mdl";
import ReactAutoCompleteComponent from "./ReactAutoCompleteComponent";

export default class PerformanceReportComponent extends Component {
  constructor() {
    super();
    this.dateObject = new Date();
    this.date = this.dateObject.getDate().toString();
    this.date = this.date.length < 2 ? "0" + this.date : this.date;
    this.month = (this.dateObject.getMonth() + 1).toString();
    this.month = this.month.length < 2 ? "0" + this.month : this.month;
    this.year = this.dateObject.getFullYear();
    this.state = {
      data: [],
      open: false,
      heading: [],
      criteriaId: [],
      fromDate: this.year + "-" + this.month + "-" + this.date,
      toDate: this.year + "-" + this.month + "-" + this.date,
      defaultName: ""
    };
    this.toDaysDate = this.state.fromDate;
    this.empId = "";
    this.getData(this.state.fromDate, this.state.toDate);
    this.options = [];
    this.getTeamMembers();
    this.dialogReference = React.createRef();
  }

  handleCloseDialog = () => {
    this.setState({ open: false });
  };

  handleToDateChange = event => {
    this.setState({ toDate: event.target.value });
    this.getData(this.state.fromDate, event.target.value);
  };

  handleFromDateChange = event => {
    this.setState({ fromDate: event.target.value });
    this.getData(event.target.value, this.state.toDate);
  };

  updateOptions = results => {
    results.forEach(row => {
      this.options.push({ value: row.empId, label: row.empName });
    });
  };

  getTeamMembers() {
    fetch("http://localhost:5000/getTeamMember", {
      method: "post"
    }).then(async result => {
      result = await result.json();
      if (result) {
        this.updateOptions(result);
      }
    });
  }

  setReportByEmpId = (empId, label) => {
    this.empId = "";
    if (empId) {
      this.empId = empId;
    }
    this.getData(this.state.fromDate, this.state.toDate);
  };

  getData(fromDate, toDate) {
    let form = new FormData();
    form.append("fromDate", fromDate);
    form.append("toDate", toDate);
    form.append("empId", this.empId);
    this.setState({ hideSlider: true });
    fetch("http://localhost:5000/getTeamReport", {
      method: "post",
      body: form
    }).then(async response => {
      let result = await response.json();
      if (result) {
        this.setState({
          data: result.data,
          heading: result.header,
          criteriaId: result.header
        });
      }
    });
  }

  formHeader = () => {
    return this.state.heading.map((value, key) => {
      return (
        <TableHeader
          name={value}
          // sortFn={(a, b, isAsc) => (isAsc ? a : b).match(/\((.*)\)/)[1].localeCompare((isAsc ? b : a).match(/\((.*)\)/)[1])}
          tooltip={value}
          style={{
            textAlign: "center",
            maxWidth: "200px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}
        >
          {value}
        </TableHeader>
      );
    });
  };

  check(event) {
    let rowValues = {};
    let { criteriaId } = this.state;
    let index = 0;
    let elementList = event.target.parentElement.getElementsByTagName("td");
    if (elementList.length > 0) {
      criteriaId.forEach(id => {
        rowValues[id] = elementList[index++].innerText;
      });
      this.setState({
        defaultName: rowValues.emp_name + " " + rowValues.emp_id
      });
      this.setState({ open: true });
      this.dialogReference.current.getCriteriaList(
        rowValues.date,
        rowValues.emp_id
      );
      this.dialogReference.current.updateData(rowValues.emp_id, rowValues.date);
    }
  }

  formTable = () => {
    return (
      <Table
        sortable
        rowKeyColumn="material"
        shadow={0}
        rows={this.state.data}
        onClickCapture={event => {
          event.persist();
          this.check(event);
        }}
      >
        {this.formHeader()}
      </Table>
    );
  };

  render() {
    return (
      <div style={{ "text-align": "center" }}>
        <form style={{ margin: "auto", display: "inline-block" }}>
          <ReactAutoCompleteComponent
            marginRight="0px"
            width="200px"
            id="001"
            data={this.options}
            label="Employee Name"
            onChange={this.setReportByEmpId}
          />
          <Textfield
            style={{ width: "140px", marginLeft: "220px", marginRight: "36px" }}
            id={this.props.id}
            type="date"
            label="From"
            defaultValue={this.state.fromDate}
            className="datetextField"
            onChange={this.handleFromDateChange}
            floatingLabel
            inputiabelprops={{
              shrink: true
            }}
          />
          <span>~</span>
          <Textfield
            style={{ width: "140px", marginLeft: "36px" }}
            id={this.props.id}
            type="date"
            label="To"
            max={this.toDaysDate}
            defaultValue={this.state.toDate}
            className="datetextField"
            floatingLabel
            onChange={this.handleToDateChange}
            inputiabelprops={{
              shrink: true
            }}
          />
        </form>
        <div style={{ overflow: "auto" }}>{this.formTable()}</div>
        <Dialog
          open={this.state.open}
          style={{
            width: "90%",
            margin: "auto",
            overflow: "auto",
            height: "90%",
            top: "0px"
          }}
          onCancel={this.handleCloseDialog}
        >
          {/* <DialogTitle primary>Report Summary</DialogTitle> */}
          <DialogContent style={{ textAlign: "left" }}>
            <PerformanceRatingComponent
              ref={this.dialogReference}
              defaultName={this.state.defaultName}
              criteriaListHeight="400px"
              disableInput={true}
              id="test"
            />
          </DialogContent>
          <DialogActions
            style={{ position: "fixed", bottom: "5%", right: "5%" }}
          >
            <Button
              type="button"
              colored
              ripple
              raised
              onClick={this.handleCloseDialog}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
