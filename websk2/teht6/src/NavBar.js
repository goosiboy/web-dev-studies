import React, {Component} from 'react';
import './App.css';

class NavBar extends Component {
  render() {
    return (
      <section className="NavBar-section">
        <ul>
          <h2>{ this.props.title }</h2>
          <div className="navButtons">
            <li>
              <a>Ilmoittautuneet</a>
            </li>
            <li>
              <a>Ilmoittaudu</a>
            </li>
          </div>
        </ul>
      </section>
    );
  }
}

export default NavBar;
