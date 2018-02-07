import React, {Component} from 'react';
import './Question.css';

class Question extends Component {

    constructor(props) {
        super(props);

        this.state = {};

    }

    render() {

        return (
            <section id="question-section">

                <h3>Question 1:</h3>

                <p>This is a question</p>

                <div id="answer-section">
                    <li>
                        <button className="btn"><span>Answer 1</span></button>
                    </li>
                    <li>
                        <button className="btn"><span>Answer 2</span></button>
                    </li>
                    <li>
                        <button className="btn"><span>Answer 3</span></button>
                    </li>
                </div>
            </section>
        );
    }
}

export default Question;
