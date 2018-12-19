/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
// function playVideoOnScroll(){
//   var ultimoScroll = 0,
//       intervalRewind;
//   var video = document.getElementById('vidFondo');
//   $(window)
//     .scroll((event)=>{
//       var scrollActual = $(window).scrollTop();
//       if (scrollActual > ultimoScroll){
//        video.play();
//      } else {
//         //this.rewind(1.0, video, intervalRewind);
//         video.play();
//      }
//      ultimoScroll = scrollActual;
//     })
//     .scrollEnd(()=>{
//       video.pause();
//     }, 10)
// }

inicializarSlider();
//playVideoOnScroll();

$(document).ready(function(){
    inicializarSlider();
    init();
});

function init(){
    var tipo = [];
    var ciudad = [];
    $.get('data-1.json', function(data){
        for(let i = 0; i < data.length; i++){
            if(tipo.indexOf(data[i].Tipo) === -1){
              tipo.push(data[i].Tipo);
            }

            if(ciudad.indexOf(data[i].Ciudad) === -1){
              ciudad.push(data[i].Ciudad);
            }
        }

        ciudad.forEach(elemento => {
          $('#selectCiudad').append('<option value="'+elemento+'">'+elemento+'</option>');
        })

        tipo.forEach(elemento=>{
          $('#selectTipo').append('<option value="'+elemento+'">'+elemento+'</option>');
        })

        $('select').material_select();
    });
}

function verDatos(array){
    $('.resultados').empty();
    for(let i=0; i<array.length; i++){
        $('.resultados').append(`<div class="card horizontal">
            <div class="card-image place-wrapper">
                <img class="img-responsive place-image" src="img/home.jpg">
            </div>
            <div class="card-stacked">
                <div class="card-content">
                    <p>
                        <b>Dirección: </b>${array[i].Direccion}<br>
                        <b>Ciudad: </b>${array[i].Ciudad}<br>
                        <b>Teléfono: </b>${array[i].Telefono}<br>
                        <b>Código Postal: </b>${array[i].Codigo_Postal}<br>
                        <b>Tipo: </b>${array[i].Tipo}<br>
                        <span class="price"><b>Precio: </b>${array[i].Precio}</span>
                    </p>
                </div>
                <div class="card-action">
                    <a>Ver mas</a>
                </div>
            </div>
        </div>`);
    }
}

$('#mostrarTodos').click(function(){
    $.get('data-1.json', function(data){
        verDatos(data);
    });
});

$('#submitButton').click(function(){
    let ciudad = $('#selectCiudad option:selected').val();
    let tipo = $('#selectTipo option:selected').val();
    let precio = $('#rangoPrecio').val();

    $.get('buscador.php', {ciudad:ciudad, tipo:tipo, precio:precio}, function(response){
        let data = JSON.parse(response);
        var res = data.data;
        verDatos(res);
    });
});
