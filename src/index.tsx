import * as React from './external/nerv/index.js';

import { observable, autorun } from './external/mobx/mobx.js';

class MobxTimerView extends React.Component {
    // mobx observable field
    @observable timer = 0;

    componentDidMount() {
        // mobx update mechanism
        autorun(() => {
            this.forceUpdate();
        })

        setInterval(() => {
            this.timer += 1;
        }, 1000);
    }

    render() {
        return (
            <div>
                <button onClick={() => this.timer--}>-</button>
                <button onClick={() => this.timer = 0}>
                    Click to reset: {this.timer}
                </button>
                <button onClick={() => this.timer++}>+</button>
            </div>
        );
     }
};

class PlainTimerView extends React.Component {
    state = {
        timer: 0
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({timer: this.state.timer + 1});
        }, 1000);
    }

    render() {
        return (
            <div>
                <button onClick={() => this.setState({timer: this.state.timer - 1})}>-</button>
                <button onClick={() => this.setState({timer: 0})}>
                    Click to reset: {this.state.timer}
                </button>
                <button onClick={() => this.setState({timer: this.state.timer + 1})}>+</button>
            </div>
        );
     }
};

const App = () => (
    <div>
        <h2>Modern react (nerv implementation) development without bundler, npm or hached module system</h2>
        <h3>React component using react setState</h3>
        <PlainTimerView />
        <h3>React component using mobx observable</h3>
        <MobxTimerView />
    </div>
);

let container = document.getElementById('root');
if (container) {
    React.render(<App />, container);
}
