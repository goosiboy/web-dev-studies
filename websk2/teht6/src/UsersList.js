import React, {Component} from 'react';
import './App.css';
import {connect} from 'react-redux';

class UsersList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: []
        }

        this.handleData = this.handleData.bind(this);

    }

    componentDidMount() {
        this.handleData();
    }

    handleData() {
        let a = this.props.user.users.slice();
        let b = this.state.users.slice();

        let newArray = b.concat(a);

        this.setState({
            users: newArray
        });
    }

    render() {

        const data = this.state.users;
        const listIDs = data.map(
            function(userData) {
                return(
                    <div key={userData.id}>
                        <li>{userData.id}</li> <br />
                    </div>
                )
            }
        );

        const listNames = data.map(
            function(userData) {
                return(
                    <div key={userData.id}>
                        <li>{userData.name}</li> <br />
                    </div>
                )
            }
        );


        const listEmails = data.map(
            function(userData) {
                return(
                    <div key={userData.id}>
                        <li>{userData.email}</li> <br />
                    </div>
                )
            }
        );


        const listFoods = data.map(
            function(userData) {
                return(
                    <div key={userData.id}>
                        <li>{userData.food}</li> <br />
                    </div>
                )
            }
        );


        const listSaunas = data.map(
            function(userData) {
                return(
                    <div key={userData.id}>
                        <li>{userData.sauna}</li> <br />
                    </div>
                )
            }
        );

        return (
            <section className="UsersList-section">
                <div className="userList">
                <h2>Ilmoittautuneet:</h2><br /><br />
                    <table className="usersTable">
                        <tbody>
                        <tr id="userTr">
                            <th>ID:</th>
                            <th>Nimi:</th>
                            <th>Email:</th>
                            <th>Ruoka:</th>
                            <th>Sauna:</th>
                        </tr>
                        <tr id="userTr">
                            <td>{ listIDs }</td>
                            <td>{ listNames }</td>
                            <td>{ listEmails }</td>
                            <td>{ listFoods }</td>
                            <td>{ listSaunas }</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state
    }
}

export default connect(mapStateToProps)(UsersList);