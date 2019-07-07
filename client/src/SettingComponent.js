import React, { Component } from "react";
import { Tabs, Tab, Textfield, Button } from "react-mdl";
import "./SettingComponent.css";
import ReactAutoCompleteComponent from "./ReactAutoCompleteComponent";

export default class Setting extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: 2,
      teamMembers: [],
      projectMember: [],
      projects: [],
      errorMessage: ""
    };
    this.teamIdList = [];
    this.currentValue = {};
    this.autoComplete = React.createRef();
    this.projectEmpIdList = [];
    this.projectIdList = [];
    this.empName = "";
    this.empId = "";
    this.projectName = "";
    this.projectId = "";
    this.titleList = [
      "Add members",
      "Add projects",
      "Add New members",
      "Create User",
      "Screen Setting"
    ];
    this.getTeamMembers();
    this.getProject();
    this.getProjectMembers();
  }
  options = [];
  updateOptions = results => {
    results.forEach(row => {
      this.options.push({ value: row.empId, label: row.empName });
    });
  };

  addTeamMembers = () => {
    if (
      this.currentValue.value !== undefined &&
      !this.teamIdList.includes(this.currentValue.value)
    ) {
      let form = new FormData();
      form.append("empName", this.currentValue.label);
      form.append("empId", this.currentValue.value);
      fetch("http://localhost:5000/insertTeamMember", {
        method: "post",
        body: form
      }).then(result => {
        if (result.status == 200) {
          let memberList = this.state.teamMembers;
          memberList.push({
            empName: this.currentValue.label,
            empId: this.currentValue.value
          });
          this.teamIdList.push(this.currentValue.value);
          this.setState({ teamMembers: memberList });
        }
      });
    }
    this.autoComplete.current.clearValue();
  };

  getTeamMembers() {
    fetch("http://localhost:5000/getTeamMember", {
      method: "post"
    }).then(async result => {
      result = await result.json();

      if (result) {
        let memberList = result;
        this.setState({ teamMembers: memberList });
      }
    });
  }

  addNewProject = () => {
    let name = this.projectName;
    let id = this.projectId;
    let project = "";
    if (!this.projectIdList.includes(id) && id !== "" && name !== "") {
      let projects = this.state.projects;
      projects.push({ project_name: name, project_id: id });
      this.projectIdList.push(id);
      this.setState({ errorMessage: "", projects: projects });
    } else if (id === "" && name === "") {
      this.setState({ errorMessage: "Enter the name and id properly" });
      return;
    } else {
      this.setState({ errorMessage: "This ID already exist" });
      return;
    }
    let form = new FormData();
    form.append(
      "row",
      JSON.stringify({
        project_id: this.projectId,
        project_name: this.projectName
      })
    );
    fetch("http://localhost:5000/insertProject", {
      method: "post",
      body: form
    });
  };

  getProject() {
    fetch("http://localhost:5000/getProjects", {
      method: "post"
    }).then(async result => {
      result = await result.json();
      if (result) {
        let projects = result;
        this.setState({ projects: projects });
      }
    });
  }

  addNewMembers = () => {
    let name = this.empName;
    let id = this.empId;
    let project = "122";
    if (!this.projectEmpIdList.includes(id) && id !== "" && name !== "") {
      let projectMember = this.state.projectMember;
      let form = new FormData();
      form.append("empName", this.empName);
      form.append("empId", this.empId);
      form.append("projectId", project);
      form.append("positionCode", 1);
      form.append(
        "data",
        JSON.stringify({
          empName: this.empName,
          empId: this.empId,
          projectId: project,
          positionCode: 1
        })
      );
      fetch("http://localhost:5000/insertNewMember", {
        method: "post",
        body: form
      }).then(result => {
        if (result.status === 200) {
          projectMember.push({
            empName: name,
            empId: id,
            projectId: project,
            positionCode: 1
          });
          this.projectEmpIdList.push(id);
          this.setState({ errorMessage: "", projectMember: projectMember });
        }
      });
    } else if (id === "" && name === "") {
      this.setState({ errorMessage: "Enter the name and id properly" });
      return;
    } else {
      this.setState({ errorMessage: "Member on this ID already exist" });
      return;
    }
  };

  getProjectMembers() {
    fetch("http://localhost:5000/getProjectMember", {
      method: "post"
    }).then(async result => {
      result = await result.json();
      if (result) {
        let projectMember = result;
        this.updateOptions(result);
        this.setState({ projectMember: projectMember });
      }
    });
  }

  deleteTeamMember = key => {
    let member = this.state.teamMembers[key];
    let form = new FormData();
    form.append("empName", member.empName);
    form.append("empId", member.empId);
    fetch("http://localhost:5000/deleteTeamMember", {
      method: "post",
      body: form
    }).then(result => {
      if (result.status === 200) {
        this.state.teamMembers.splice(key, 1);
        this.setState({ teamMembers: this.state.teamMembers });
        this.teamIdList.splice(key, 1);
      }
    });
  };

  deleteProjectMember = key => {
    let member = this.state.projectMember[key];
    let form = new FormData();
    form.append("empName", member.empName);
    form.append("empId", member.empId);
    fetch("http://localhost:5000/deleteNewMember", {
      method: "post",
      body: form
    }).then(result => {
      if (result.status === 200) {
        this.state.projectMember.splice(key, 1);
        this.setState({ projectMember: this.state.projectMember });
        this.projectEmpIdList.splice(key, 1);
      }
    });
  };

  deleteProject = key => {
    let project = this.state.projects[key];
    let form = new FormData();
    form.append("projectName", project.project_name);
    form.append("projectId", project.project_id);
    fetch("http://localhost:5000/deleteProject", {
      method: "post",
      body: form
    }).then(result => {
      if (result.status === 200) {
        this.state.projects.splice(key, 1);
        this.setState({ projects: this.state.projects });
        this.projectIdList.splice(key, 1);
      }
    });
  };

  getTeamMemberPart = () => {
    return this.state.teamMembers.map((tag, key) => {
      this.teamIdList.push(tag.empId);
      return (
        <div className="team-member" id={tag.empId}>
          <span>{tag.empName + " " + tag.empId}</span>
          <span
            className="team-member-delete"
            onClick={() => {
              this.deleteTeamMember(key);
            }}
          >
            X
          </span>
        </div>
      );
    });
  };

  getProjectMemberPart = () => {
    return this.state.projectMember.map((tag, key) => {
      this.projectEmpIdList.push(tag.empId);
      return (
        <div className="team-member" id={tag.empId}>
          <span>{tag.empName + " " + tag.empId + " " + tag.projectId}</span>
          <span
            className="team-member-delete"
            onClick={() => {
              this.deleteProjectMember(key);
            }}
          >
            X
          </span>
        </div>
      );
    });
  };

  screenTitle = () => {
    return ["123", "1234", "12345", "123456"].map(value => {
      return (
        <div className="screen-access">
          <div className="screen-access-label">{value}</div>
          <input className="screen-access-input" type="number" />
        </div>
      );
    });
  };

  newUser = () => {
    return <div>Coming Soon</div>;
  };

  getProjectPart = () => {
    this.projectIdList = [];
    return this.state.projects.map((tag, key) => {
      this.projectIdList.push(tag.project_id);
      return (
        <div className="team-member" id={tag.project_id}>
          <span>{tag.project_name + " " + tag.project_id}</span>
          <span
            className="team-member-delete"
            onClick={() => {
              this.deleteProject(key);
            }}
          >
            X
          </span>
        </div>
      );
    });
  };

  render() {
    return (
      <div class="body">
        <div className="setting-body">
          <div class="title">{this.titleList[this.state.activeTab]}</div>
          <div class="sub-title">Total Team member : {"12"}</div>
          <Tabs
            style={{ width: "auto", position: "absolute" }}
            activeTab={this.state.activeTab}
            onChange={tabId => this.setState({ activeTab: tabId })}
            ripple
          >
            <Tab>Add members</Tab>
            <Tab>Add projects</Tab>
            <Tab>Add New members</Tab>
            <Tab>Create User</Tab>
            <Tab>Screen setting</Tab>
          </Tabs>
          {this.state.activeTab == 0 ? (
            <section style={{}}>
              <div>{this.getTeamMemberPart()}</div>
              <ReactAutoCompleteComponent
                ref={this.autoComplete}
                marginRight="20px"
                width="200px"
                id="001"
                onChange={(value, label) => {
                  this.currentValue = { value: value, label: label };
                }}
                data={this.options}
                disabled={this.props.disableInput}
                label=""
              />
              <Button
                style={{ marginBottom: "8px" }}
                primary="true"
                raised
                ripple
                onClick={this.addTeamMembers}
              >
                Add
              </Button>
            </section>
          ) : (
            <></>
          )}
          {this.state.activeTab == 2 ? (
            <section style={{}}>
              <div>{this.getProjectMemberPart()}</div>
              <div style={{ display: "inline-flex" }}>
                <div className="addNewMember">
                  <Textfield
                    onChange={event => {
                      this.empName = event.currentTarget.value;
                    }}
                    label="Employee Name"
                    style={{ width: "200px" }}
                  />
                </div>
                <div ref="empId" className="addNewMember">
                  <Textfield
                    onChange={event => {
                      this.empId = event.currentTarget.value;
                    }}
                    label="Employee Id"
                    style={{ width: "200px" }}
                  />
                </div>
                <div className="addNewMember">
                  <Textfield
                    onChange={() => {}}
                    label="Position"
                    type="number"
                    style={{ width: "200px" }}
                  />
                </div>
                <Button
                  style={{ marginTop: "12px" }}
                  primary="true"
                  raised
                  ripple
                  onClick={this.addNewMembers}
                >
                  Add
                </Button>
                {this.state.errorMessage !== "" ? (
                  <div className="errorMessage" style={{ color: "red" }}>
                    {this.state.errorMessage}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </section>
          ) : (
            <></>
          )}
          {this.state.activeTab == 1 ? (
            <section style={{}}>
              <div>{this.getProjectPart()}</div>
              <div>
                <div className="addNewMember">
                  <Textfield
                    onChange={event => {
                      this.projectName = event.currentTarget.value;
                    }}
                    label="Project Name"
                    style={{ width: "200px" }}
                  />
                </div>
                <div ref="empId" className="addNewMember">
                  <Textfield
                    onChange={event => {
                      this.projectId = event.currentTarget.value;
                    }}
                    label="Project Id"
                    style={{ width: "200px" }}
                  />
                </div>
                <Button
                  primary="true"
                  style={{ marginBottom: "8px" }}
                  raised
                  ripple
                  onClick={this.addNewProject}
                >
                  Add
                </Button>
                {this.state.errorMessage !== "" ? (
                  <div className="errorMessage" style={{ color: "red" }}>
                    {this.state.errorMessage}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </section>
          ) : (
            <></>
          )}
          {this.state.activeTab == 4 ? (
            <section style={{}}>
              <div style={{ display: "inline-block" }}>
                {" "}
                {this.screenTitle()}
              </div>
              <div style={{ paddingLeft: "200px", paddingTop: "8px" }}>
                <Button primary="true" raised ripple onClick={() => {}}>
                  save
                </Button>
              </div>
            </section>
          ) : (
            <></>
          )}
          {this.state.activeTab == 3 ? (
            <section style={{}}>
              <div style={{ display: "inline-block" }}> {this.newUser()}</div>
              <div style={{ paddingLeft: "200px", paddingTop: "8px" }}>
                <Button primary="true" raised ripple onClick={() => {}}>
                  save
                </Button>
              </div>
            </section>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
}
