import React, {Component} from 'react';
import './Question.css';

class Result extends Component {

    render() {

        return (
            <section id="results-section">
                <center>
                    <br />
                    <br />
                    <h4>{ this.props.answer }</h4>
                    <br />
                    <h4>Score: { this.props.score }/{ this.props.amountOfQuestions }</h4>
                </center>
            </section>
        );
    }
}

export default Result;