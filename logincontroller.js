ropaApp.controller("logincontroller",function($scope){
    console.log("Estoy en login controller");

    firebase.auth().onAuthStateChanged(function(user){
      if (user) {
        console.log(user);
        window.location = "../Proyecto final/Tiendaderopa.html";
      } else {
        /*window.location = "../Proyecto final/Tiendaderopa.html";*/
      }
    });

});
