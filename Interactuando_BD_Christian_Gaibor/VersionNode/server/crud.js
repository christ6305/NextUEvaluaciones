var Usuario = require('./modelUsuarios.js')

module.exports.crearUsuarioInit = function(callback){
  var arr = [{ email: 'user1@mail.com', user: "user1", password: "12345"}];
  Usuario.insertMany(arr, function(error, docs) {
    if (error){
      if (error.code == 11000){
        callback("Utilice los siguientes datos: </br>usuario: demo | password:123456 </br>usuario: juan | password:123456")
      }else{
        callback(error.message)
      }
    }else{
      callback(null, "El usuario 'demo' y 'juan' se ha registrado correctamente. </br>usuario: demo | password:123456 </br >usuario: juan | password:123456") //Mostrar mensaje del usuario guardado con exito
    }
  });
}
