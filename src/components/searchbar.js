import React, { Component } from "react";

export default class Searchbar extends Component {
  constructor(props) {
    super(props);
    let storedList = JSON.parse(localStorage.getItem("currList"));
    this.state = {
      toDoItems: storedList == null ? [] : storedList,
    };
  }
  item(message, currState) {
    return {
      content: message,
      currentstate: currState,
    };
  }
  currList(boolVal) {
    console.log(this.state.toDoItems);
    var res = [];
    this.state.toDoItems.forEach((element) => {
      if (element.currentstate == boolVal) {
        res.push(
          <div
            onClick={() => {
              this.changeStateofItem(element.content, !boolVal);
            }}
          >
            {element.content}
          </div>
        );
      }
    });
    return res;
  }
  componentDidMount() {
    var x = document.getElementsByClassName("listitems")[0].offsetTop;
    document.getElementsByClassName(
      "listitems"
    )[0].style.maxHeight = `calc(100vh - ${x + 50}px)`;
    document.getElementsByClassName(
      "listitems"
    )[0].style.height = `calc(100vh - ${x + 50}px)`;
  }
  changeStateofItem(value, stateVal) {
    //a little costly operation it is
    var newState = JSON.parse(JSON.stringify(this.state));
    console.log(newState);
    newState.toDoItems.forEach((x) => {
      if (x.content === value) {
        x.currentstate = stateVal;
      }
    });
    this.setState(newState);
  }
  componentDidUpdate() {
    var currState = JSON.stringify(this.state.toDoItems);
    localStorage.setItem("currList", currState);
  }
  addItem() {
    let value = document.getElementById("textBox").value;
    let item = this.item(value, true);
    var newState = JSON.parse(JSON.stringify(this.state));
    newState.toDoItems.push(item);
    document.getElementById("textBox").value = "";
    this.setState(newState);
  }
  render() {
    return (
      <div>
        <div className="header">
          <h1>TO DO LIST</h1>
          <input
            type={"button"}
            value="Reset"
       

            onClick={() => {
              localStorage.removeItem("currList");
              this.setState({
                toDoItems: [],
              });
            }}
          />
        </div>
        <div>
          <div className="searchBox">
            <input
              type={"text"}
              id="textBox"
              placeholder="Add Items here...."
              onKeyUp={(e) => {
                if (e.key == "Enter" || e.keyCode == 13) this.addItem();
              }}
            />
          </div>
          <div className="listitems">
            <div id="currentItems">
              <div
                style={{
                  textTransform: "uppercase",
                  borderBottom: "2px solid white",
                  position: "sticky",
                  top: 0,
                  backgroundColor: "inherit",
                  padding: "20px",
                }}
              >
                To Do{" "}
              </div>
              {this.currList(true)}
            </div>
            <div id="crossedItems">
              <div
                style={{
                  textTransform: "uppercase",
                  borderBottom: "2px solid white",
                  position: "sticky",
                  top: 0,
                  backgroundColor: "inherit",
                  padding: "20px",
                  textDecoration: "none",
                }}
              >
                Completed
              </div>
              {this.currList(false)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
