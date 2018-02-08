import React, {Component} from 'react';
import './Question.css';
import Result from './Result';

class Question extends Component {

    static myStatus = {
        error: "An error has occured!",
        loading: "Loading questions. Please wait!",
        done: "Questions loaded succesfully!",
        waiting: "Waiting for data..."
    };

    static questionIndex = 0;

    constructor(props) {
        super(props);

        this.state = {
            questionData: this.props.data,
            currentQuestion: null,
            currentStatus: null,
            amountOfQuestions: this.props.data.length,
            randomizedData : {},
            playerScore: 0,
            playerAnswer: "Good luck!"
        };

        this.randomizeQuestions = this.randomizeQuestions.bind(this);

    }

    componentDidMount(){
        this.changeStatus(Question.myStatus.waiting);
        this.randomizeQuestions();
    }

    randomizeQuestions() {

        let questions = [];

        if(this.state.questionData instanceof Array) {
            this.changeStatus(Question.myStatus.loading);

            let data = this.state.questionData;
            let randArr = this.shuffleArray(data);

            for(let i = 0; i < randArr.length; i++) {
                randArr[i].id = i;
                questions.push(randArr[i]);
            }

            // Wait that the state has been changed. Then executes a callback.
            this.setState({
                randomizedData: questions
            }, function () {
                this.questionParser();
            });

        } else {
            this.changeStatus(Question.myStatus.error);
            console.warn("QuestionData is not an array!");
        }
    }

    questionParser() {

        this.changeStatus(Question.myStatus.done);

        let questions = this.state.randomizedData.slice();

        for(let i = 0; i < questions.length; i++) {
            if(questions[i].id === Question.questionIndex) {
                this.setCurrentQuestion(questions[i]);
                Question.questionIndex += 1;
                break;
            }
        }

    }

    setCurrentQuestion(question) {
        let randArr = this.shuffleArray(question.answers_array);

        question.answers_array = randArr;

        this.setState({
            currentQuestion: question
        });
    }

    checkAnswer(props) {

        if(this.state.currentQuestion.right_answer === props) {
            this.questionParser();
            this.scoreResolver(true);
        } else {
            this.questionParser();
            this.scoreResolver(false);
        }

    }

    scoreResolver(bool) {

        let newScore;
        let currentScore = this.state.playerScore;

        if(bool === true) {

            newScore = (currentScore += 1);

            this.setState({
                playerScore: newScore,
                playerAnswer: "Correct! :)"
            });

        } else {

            this.setState({
                playerAnswer: "Wrong! :("
            });

        }

    }

    changeStatus(status) {
        if(status !== null && status !== undefined) {
            this.setState({
                currentStatus: status
            });
        } else {
            this.changeStatus(Question.myStatus.error);
            console.warn("Error! Current status cant be", status);
        }
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    render() {

        const currentQuestion = this.state.currentQuestion;

        if(currentQuestion instanceof Object) {
            return (
                <section id="question-section">

                    <h3>{ this.state.currentQuestion.question }</h3>

                    <ul className="answers">
                        <li>
                            <button
                                className="btn"
                                onClick={() => this.checkAnswer(this.state.currentQuestion.answers_array[0])}>
                                    <span>
                                        {
                                         this.state.currentQuestion.answers_array[0]
                                        }
                                    </span>
                            </button>
                        </li>
                        <li>
                            <button
                                className="btn"
                                onClick={() => this.checkAnswer(this.state.currentQuestion.answers_array[1])}>
                                    <span>
                                        {
                                         this.state.currentQuestion.answers_array[1]
                                        }
                                    </span>
                            </button>
                        </li>
                        <li>
                            <button
                                className="btn"
                                onClick={() => this.checkAnswer(this.state.currentQuestion.answers_array[2])}>
                                    <span>
                                        {
                                         this.state.currentQuestion.answers_array[2]
                                        }
                                    </span>
                            </button>
                        </li>
                    </ul>
                    <Result
                        score={ this.state.playerScore }
                        amountOfQuestions={ this.state.amountOfQuestions }
                        answer={ this.state.playerAnswer }
                    />
                </section>
            );
        } else {
            return(
                <div>
                    <br />
                    <center>
                        <h4>
                            { this.state.currentStatus }
                        </h4>
                    </center>
                </div>
            );
        }
    }
}

export default Question;
