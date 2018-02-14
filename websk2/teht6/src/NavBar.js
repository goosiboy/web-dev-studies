import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import UserForm from './UserForm';
import UsersList from './UsersList';

// A so called 'dumb' component. Doesnt extend React.Component or require a constructor.
// Simply displays content without modifying it.
export const NavBar = (props) => {

  const placeHolder = "Lisää tähän otsikko";

  return (
    // Hyödynnän React-Router kirjastoa tässä projektissa. Pystyn tekemään kätevästi sisällön vaihtamisen routtaamalla
    // komponentit. NavBar - komponentti hoitaa nyt sivulla olevan sisällön näyttämisen Route - komponentin kautta.
    <Router>
      <div>
        <section className="NavBar-section">
          <ul>
            <h2>{ props.title || placeHolder}</h2>
            <div className="navButtons">
              <li>
                <Link to="/">Ilmoittaudu</Link>
              </li>
              <li>
                <Link to="/ilmoittautuneet">Ilmoittautuneet</Link>
              </li>
            </div>
          </ul>
        </section>

        <Route exact path="/" component={
          UserForm
        } />

        <Route path="/ilmoittautuneet" component={
          UsersList
        } />

      </div>
    </Router>
  );
}
