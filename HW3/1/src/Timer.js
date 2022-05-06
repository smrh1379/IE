import React, { Component } from "react";
import "./Timer.css";
export class Timer extends Component {
  constructor() {
    super();
    this.timer();
  }
  state = {
    count: 0,
  };

  update = () => {
    this.setState({ count: this.state.count + 1 });
  };
  timer = () => {
    setInterval(this.update, 1000);
  };
  resettimer = () => {
    this.setState({ count: 0 });
  };
  render() {
    return (
      <div className="container">
        <div className="timer">
          <h>{this.state.count}</h>
        </div>
        <button onClick={this.resettimer}>Reset Timer</button>
      </div>
    );
  }
  componentWillUnmount() {
    clearInterval(this.update);
  }
}
