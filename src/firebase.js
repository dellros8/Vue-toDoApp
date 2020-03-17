var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');


// PRODUCTION BASE
// PRODUCTION BASE
// PRODUCTION BASE
// PRODUCTION BASE
// PRODUCTION BASE

// var config = {
//     apiKey: "AIzaSyBhwWG_YFWJUh9eRguPbBdASkadGfC3ICo",
//     authDomain: "handlingslista-cdca6.firebaseapp.com",
//     databaseURL: "https://handlingslista-cdca6.firebaseio.com",
//     storageBucket: "handlingslista-cdca6.appspot.com"
// };



// TEST BASE
// TEST BASE
// TEST BASE
// TEST BASE
// TEST BASE

var config = {
    apiKey: "AIzaSyBPdAlmhtTjmxO3gXmuzYSGXWhw3-tiM0g",
    authDomain: "handlingslistatest.firebaseapp.com",
    databaseURL: "https://handlingslistatest.firebaseio.com",
    projectId: "handlingslistatest",
    storageBucket: "handlingslistatest.appspot.com",
    messagingSenderId: "39836963030",
    appId: "1:39836963030:web:95c110bbdbc67d9e69f977"
  };

firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

export default database