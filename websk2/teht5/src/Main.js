import React, {Component} from 'react';
import './Main.css';
import Question from './Question';

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            gameStarted: false
        }

        // Bindataan metodien kontekstit konstruktorissa
        this.startGame = this.startGame.bind(this);
    }

    startGame() {
        this.setState({
            gameStarted: true
        });
    }

    render() {

        if (this.state.gameStarted === false) {
            return (
                <div className="instructions-section">
                    <br />
                    <h3>Instructions:</h3>
                    <p>Choose the correct answer.</p>
                    <div className="startButton-section">
                        <button className="startBtn" onClick={this.startGame}>Start!</button>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <Question />
                </div>
            );
        }
    }
};

export default Main;