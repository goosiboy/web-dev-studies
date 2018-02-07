import React, {Component} from 'react';
import './Main.css';
import Question from './Question';

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            gameStarted: false,
            questions: []
        }

        const url = ''

        // Bindataan metodien kontekstit konstruktorissa
        this.startGame = this.startGame.bind(this);
    }

    startGame() {
        this.setState({
            gameStarted: true
        });
    }

    getQuestionData() {

    }

    render() {

        if (this.state.gameStarted === false) {
            return (
                <div className="instructions-section">
                    <br />
                    <h3>How to play:</h3>
                    <p>Answer the following three questions correctly!</p>
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