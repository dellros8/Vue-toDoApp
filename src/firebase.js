var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

var config = {
    apiKey: "AIzaSyBhwWG_YFWJUh9eRguPbBdASkadGfC3ICo",
    authDomain: "handlingslista-cdca6.firebaseapp.com",
    databaseURL: "https://handlingslista-cdca6.firebaseio.com",
    storageBucket: "handlingslista-cdca6.appspot.com"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

export default database