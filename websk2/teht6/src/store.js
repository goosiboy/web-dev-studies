import {createStore} from 'redux';

let initialState = {
    users: []
}

let persistentState = {
    users: []
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_USER":

            const newUsers = state.users.slice();
            const user = action.payload;

            user.id = (persistentState.users.length + 1);
            newUsers.push(user);

            state = {
                /*
                    Otamme kaikki state - objektin aikaisemmat arvot, ja ES6 spreadin avulla
                    lisätään ne tähän objektiin.

                    Käytännössä alla oleva syntaksi voidaan kääntää tähän muotoon:

                    name: state.name,
                    email: state.email,
                    food: state.food,
                    sauna: state.sauna,
                    name: action.payload <- !!!

                    Viimeinen 'name' korvaa aikaisemman namen!

                    '...statella' kopioidaan aikaisemman staten arvot, koska haluamme returnaa uuden staten
                    tämän reducerin lopussa. Jos emme kopioi vaikaisempia arvoja mukaan, jäävät ne seuraavasta
                    staten syklistä pois. Jos muokkaamme kaikkia staten arvoja, ei kopointia
                    välttämättä tarvitse tehdä. On kuitenkin järkevää tehdä se AINA, koska muuten
                    koodi muuttuu virheherkäksi. Spreadin sijaan voidaan myös käyttää vanhaa kunnon
                    Object - prototyypin assign - metodia. ...spread ei ole vielä yleisesti tuettu syntaksi,
                    joten tässäkin mielessä Object.assign olisi parempi vaihtoehto sotkuisemmasta syntaksistaan
                    huolimatta!
                */
                ...state,
                users: newUsers
            };

            break;
        default: {
            return {
                ...state
            }
        }
    }
    return state;
};
/*
    HUOM:
    Jos reducereita on useampia, voidaan käyttää reduxin combineReducers - metodia, jonka avulla
    storeen voidaan assosioida useampia reducereita yhtäaikaa!

    Tässä tapauksessa näin ei tarvitse tehdä, koska käytämme vain yhtä reduceria!
*/
export const store = createStore(
    userReducer,
    persistentState,
    localStorageToRedux()
);
/*
    Exportataan store, jotta sitä voidaan käyttää index.js - tiedostossa!
*/
store.subscribe(() => {
    console.log("Store updated!", store.getState());

    let userObject = store.getState();

    let index = (userObject.users.length - 1);

    saveDataToLocalStorage(userObject.users[index]);

});

function saveDataToLocalStorage(user) {

    if(user !== null) {
        let array = [];
        let param = 'userArray';

        array = getDataFromLocalStorage(param);
        array.push(user);
        localStorage.setItem('userArray', JSON.stringify(array));
    } else {
        console.warn("User is null");
    }

}

function localStorageToRedux() {

    let array = [];

    array = JSON.parse(localStorage.getItem('userArray')) || [];
    persistentState.users = array;
}

export const getDataFromLocalStorage = function(item) {
    let array = [];
    array = JSON.parse(localStorage.getItem(item)) || [];

    return array;
}