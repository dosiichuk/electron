import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  state = { status: 'off', time: 0, timer: null };
  formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;

    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return minutes + ':' + seconds;
  };
  step = () => {
    if (Math.floor(this.state.time) === 0 && this.state.status === 'work') {
      this.playBell();
      this.setState((prevState) => ({
        ...prevState,
        status: 'rest',
        time: 20,
      }));
    } else if (
      Math.floor(this.state.time) === 0 &&
      this.state.status === 'rest'
    ) {
      this.playBell();
      this.setState((prevState) => ({
        ...prevState,
        status: 'work',
        time: 1200,
      }));
    }
    this.setState((prevState) => ({ ...prevState, time: prevState.time - 1 }));
  };
  startTimer = () => {
    this.playBell();
    this.setState((prevState) => ({
      ...prevState,
      status: 'work',
      time: 1200,
    }));
    this.setState((prevState) => ({
      ...prevState,
      timer: setInterval(() => this.step(), 1000),
    }));
  };
  stopTimer = () => {
    clearInterval(this.state.timer);
    this.setState((prevState) => ({ ...prevState, time: 0, status: 'off' }));
  };
  closeApp = () => {
    window.close();
  };
  playBell = () => {
    const audioElement = new Audio('./sounds/bell.wav');
    audioElement.play();
  };
  render() {
    return (
      <div>
        <h1>Protect your eyes</h1>
        {this.state.status === 'off' && (
          <div>
            <p>
              According to optometrists in order to save your eyes, you should
              follow the 20/20/20. It means you should to rest your eyes every
              20 minutes for 20 seconds by looking more than 20 feet away.
            </p>
            <p>
              This app will help you track your time and inform you when it's
              time to rest.
            </p>
            <button className="btn" onClick={this.startTimer}>
              Start
            </button>
          </div>
        )}
        {this.state.status === 'work' && <img src="./images/work.png" />}
        {this.state.status === 'rest' && <img src="./images/rest.png" />}
        {this.state.status != 'off' && (
          <div>
            <div className="timer">{this.formatTime(this.state.time)}</div>
            <button className="btn" onClick={this.stopTimer}>
              Stop
            </button>
          </div>
        )}

        <button className="btn btn-close" onClick={this.closeApp}>
          X
        </button>
      </div>
    );
  }
}

render(<App />, document.querySelector('#app'));
