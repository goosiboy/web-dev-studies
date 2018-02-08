import React, {Component} from 'react';
import './Main.css';
import Question from './Question';

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            gameStarted: false,
            question_array: []
        }

        // Bindataan metodien kontekstit konstruktorissa
        this.startGame = this.startGame.bind(this);

        this.getJSON();

    }

    startGame() {
        this.setState({
            gameStarted: true
        });
    }

    getJSON() {

        let array;

        fetch("https://oinasjo.github.io/mySite/question_data.json")
            .then(response => response.json())
            .then(json => {
                array = json.question_array;
                this.setJSON(array);
            })
            .catch(function (error) {
                console.warn("Fetch error: ", error);
            });

    }

    setJSON(array) {

        let array1 = this.state.question_array.slice(0, array.length);
        let array2 = array;
        let array3 = array1.concat(array2);

        this.setState({
            question_array: array3
        });

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
                    <Question data={this.state.question_array}/>
                </div>
            );
        }
    }
};

export default Main;