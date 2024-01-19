
ropaApp.controller("ropaController",function($scope){
    console.log("Estoy en ropa controller");

    firebase.auth().onAuthStateChanged(function(user){
        if (user) {
            $scope.emailUsuario = user.email;
        } else {
          window.location = "../Proyecto final/login.html";
        }
      });

    db.collection("listadearticulos")
    .onSnapshot(function(querySnapshot){
        var articulos = [];
        querySnapshot.forEach(function(doc){
           articulos.push(doc.data());
        });
        $scope.articulos = articulos;
        $scope.$apply();

        console.log(articulos);
    });

    /* Altas cambios y actualizar datos */
    $scope.agregarArticulo = function(){
        var articuloAgregado = $scope.articuloInput;
        var costoArticulo = $scope.costoInput;
        var paisArticulo = $scope.paisInput;
        var piezasArticulo = $scope.piezasInput;

        var datosNoValidos = articuloAgregado == null || articuloAgregado == "" || costoArticulo == null || costoArticulo == "";

        if(datosNoValidos){
            Swal.fire({
                icon: "error",
                title: "Error...",
                text: "Faltan articulos que registrar",
                footer: '<a href="#">Why do I have this issue?</a>'
              });
        }else{

            db.collection("listadearticulos").doc(articuloAgregado).set({
                nombreArticulo: articuloAgregado,
                costoArticulo: costoArticulo,
                paisArticulo: paisArticulo,
                piezasArticulo: piezasArticulo

            })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });

            $scope.articuloInput = "";
            $scope.costoInput = "";
            $scope.paisInput = "";
            $scope.piezasInput = "";
        }
    };

    /* Bajas */
    $scope.eliminar = function(item){

        Swal.fire({
            title: "Estas seguro de eliminar el articulo agregado?",
            text: "Una vez borrado el elemento no se puede recuperar",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                db.collection("listadearticulos").doc(item).delete().then(() => {
                    Swal.fire({
                        icon: "success",
                        title: "Eliminado...",
                        text: "Articulo eliminado correctamente",
                        footer: '<a href="#">Why do I have this issue?</a>'
                      });
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });
            } else{

            }
          });

    };

    $scope.logout = function(){
        Swal.fire({
            title: "Estas seguro de abandonar el programa?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                firebase.auth().signOut().then(() => {
                    // Sign-out successful.
                  }).catch((error) => {
                    // An error happened.
                  });
            }else{

            }
          });

    }

});
