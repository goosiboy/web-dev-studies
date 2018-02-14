import React, {Component} from 'react';
import './App.css';
import {connect} from 'react-redux';

class UserForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      food: "Liha",
      sauna: "Ei"
    }

    this.handleData = this.handleData.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleFood = this.handleFood.bind(this);
    this.handleSauna = this.handleSauna.bind(this);
  }

  handleData() {
    if(this.state.sauna === "on") {
      this.props.setUser(
        this.state.name,
        this.state.email,
        this.state.food,
        "Kyllä"
      );
    } else {
      this.props.setUser(
        this.state.name,
        this.state.email,
        this.state.food,
        "Ei"
      );
    }
  }

  handleName(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleEmail(event) {
    this.setState({
      email: event.target.value
    });
  }

  handleFood(event) {
    this.setState({
      food: event.target.value
    });
  }

  handleSauna(event) {
      this.setState({
        sauna: event.target.value
      });
  }

  render() {
    return (
      <section className="UserForm-section">

      <h2>Ilmoittaudu:</h2><br/> <br/>

        <form onSubmit={ this.handleData }>

          <label>Nimi:</label> <input className="text" type="text" value={this.state.name} onChange={this.handleName} /><br /><br />
          <label>Email:</label> <input className="text" type="text" value={this.state.email} onChange={this.handleEmail} /><br /><br />
          <label>Ruoka:</label><br/>
          <select value={this.state.food} onChange={this.handleFood}>
            <option value="Liha">Liha</option>
            <option value="Kala">Kala</option>
            <option value="Kasvis">Kasvis</option>
            <option value="Ei">Ei mitään</option>
          </select><br /><br />
          <label>Sauna:</label><input type="checkbox" onChange={this.handleSauna}/><br /><br />
          <input className="sendButton" type="submit" value="Osallistu" />
        </form>
      </section>
    );
  }
}

/*
  mapStateToProps kertoo App - komponentille, mitä globaalissa statessa olevista propeista haluamme
  käyttää tässä komponentissa. Syötämme 'state' - objektin mapStateToProps - funktioon, joka palauttaa
  objektin. Tähän objektiin on asetettu user - avaimella kiinnitetty referaatti aikaisemmin syötetyn
  state - objektin userReducer - metodista.

  Vaikka index.js - tiedostossa syötämme samankaltaisesti Provider - komponentin avulla kontekstin statesta
  koko applikaatiolle, täytyy meidän silti spesifioida erikseen yllä mainitulla tavalla, jokaiselle
  komponentille, niille suotu globaalin staten scope.

  KTS: https://youtu.be/tfuZ7uZmVyg
*/

const mapStateToProps = (state) => {
  return {           // Jos reducereita on useampia, olisi kirjoitettava esim:
    user: state      // user: state.reducer1
  }                  // Koska käytössä vain yksi reducer, kirjoitetaan pelkästään:
}                    // user: state

/*
  Tässä pätee sama logiikka, mutta ideana on mahdollistaa dispatch - metodin käyttö. Asetamme
  setName - metodin ajamaan dispatch - käskyn. setName on nyt asetettu käytettäväksi tässä komponentissa
  propsien kautta.
*/
const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (name, email, food, sauna) => {
      dispatch({
        type: "ADD_USER",
        payload: {
          name: name,
          email: email,
          food: food,
          sauna: sauna
        }
      });
    }
  }
}

/*
  Kaikki ylhäällä tapahtuva liimataan lopulta yhteen react-reduxin connect() - metodilla.
  Tämän metodin toiminta on minulle automagiaa.
  Connect palauttaa ilmeisesti funktion, joka haluaa parametreikseen sen komponentin, joka
  halutaan yhdistää reduxiin. Tämä kaikki toimii react-redux kirjaston kautta, joka toimii liimana
  reactin ja reduxin välillä. Syötämme tälle connectin palauttamaan funktioon App - komponentin, mikä
  saa reactin ja reduxin keskustelemaan keskenään. Lopuksi koko paketti exportataan, kuten Reactissa on tapana,
  jotta index.js sijairseva ReactDOM.render - metodi pystyy renderöimään sen. Erona vain react-redux
  kirjaston läpi ajama middleware - spagetti. Automaagista!
*/
export default connect(mapStateToProps, mapDispatchToProps)(UserForm);