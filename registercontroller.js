ropaApp.controller("registercontroller",function($scope){
    console.log("Estoy en register controller");

    firebase.auth().onAuthStateChanged(function(user){
      if (user) {
        console.log(user);
        window.location = "../Proyecto final/Tiendaderopa.html";
      } else {
        /*window.location = "../Proyecto final/Tiendaderopa.html";*/
      }
    });

    $scope.registrar = function(){
        var email = $scope.emailRegisterInput;
        var password = $scope.pwdRegisterInput;
        var rptPassword = $scope.rptRwdRegisterInput;

        var isValid = email  != null && email != "" && password != null && password != "" && rptPassword != null && rptPassword != "";

        if(isValid){
           if(password == rptPassword){
            firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });
           }else{
            Swal.fire({
                icon: "error",
                title: "Error...",
                text: "Las contraseñas deben ser iguales",
                footer: '<a href="#">Why do I have this issue?</a>'
              });
           }
        }else{
            Swal.fire({
                icon: "error",
                title: "Error...",
                text: "Los campos se encuentran vacios",
                footer: '<a href="#">Why do I have this issue?</a>'
              });
        }
    };

});
