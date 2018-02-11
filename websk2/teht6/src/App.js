import React, {Component} from 'react';
import './App.css';
import NavBar from './NavBar';
import Container from './Container';
import { createStore } from 'redux';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: "Ilmoittautumislomake"
    }

  }

  render() {

    return (
      <div className="App">
        <NavBar title={this.state.title}/>
        <Container />
      </div>
    );
  }
}

const initialState = {
  result: 1,
  lastValues: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD":
      state = {

        /*
          Otamme kaikki state - objektin aikaisemmat arvot, ja ES6 spreadin avulla
          lisätään ne tähän objektiin.

          Käytännössä alla oleva syntaksi voidaan kääntää tähän muotoon:

          result: state.result,
          lastValues: state.lastValues,
          result: state.result + action.payload.

          Viimeinen 'result' korvaa aikaisemmat resultit!

          ...statella kopioidaan aikaisemman staten arvot, koska haluamme returnaa uuden staten
          tämän reducerin lopussa. Jos emme kopioi vaikaisempia arvoja mukaan, jäävät ne seuraavasta
          staten init syklistä pois. Jos muokkaamme kaikkia staten arvoja, ei kopointia
          välttämättä tarvitse tehdä. On kuitenkin järkevää tehdä se AINA, koska muuten
          koodi saattaa muuttua virheherkäksi. Spreadin sijaan voidaan myös käyttää vanhaa kunnon
          Object.assign - metodia.
        */

        ...state,
        result: state.result + action.payload,
        lastValues: [...state.lastValues, action.payload]

      };
      break;
    case "SUB":
        state = {
          ...state,
          result: state.result - action.payload
        };
      break;
    default:
      return state;
      break;
  }
  return state;
};

const store = createStore(reducer);

store.subscribe(() => {
  console.log("Store updated!", store.getState());
});

store.dispatch({type: "ADD", payload: 10});
store.dispatch({type: "SUB", payload: 6});

export default App;
