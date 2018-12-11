
function cambioColor() {
  $('.main-titulo').animate({ color: "white"}, 500, function(){
    $('.main-titulo').animate({ color: "#DCFF0E"}, 500, function(){
      cambioColor();
    });
  });
}

cambioColor()

  $(".btn-reinicio").click(function(){
		if($(this).html()=='Iniciar')
		{
			i=0;
	    score=0;
	    mov=0;
	    $("#score-text").html("0");
	    $("#movimientos-text").html("0");
			$(this).html("Reiniciar");
	    $('#timer').timer({
			countdown: true,
			duration: '2m',
			format: '%M:%S',
			callback: function() {
					$(".panel-tablero").hide();
					$(".time").hide();
          $(".panel-score").width("100%");
					$('#timer').timer('stop');
				}
			});
		}else
		{
			$(".panel-tablero").show();
      $(".panel-score").css({"width": "25%","height": "700px","display": "flex","flex-flow": "column nowrap","justify-content": "space-between"})
			$(".time").show();
			i=0;
	    score=0;
	    mov=0;
	    $("#score-text").html("0");
	    $("#movimientos-text").html("0");
			$("#timer").html("02:00");
			$('#timer').timer('reset');
	    $('#timer').timer({
			countdown: true,
			duration: '2m',
			format: '%M:%S',
			callback: function() {
					$(".panel-tablero").hide();
					$(".time").hide();
					$('#timer').timer('stop');
				}
			});
		}
});

//empieza();


// function empieza()
// {
	var fila=7;
	var columna = 7;
	var tabla = [];
	var validFigures=0;
	var score = 0;
	var movi = 0;


	function caramelo(f,c,img,src) {
    return {
    r: f,
    c: c,
    src:src,
    o:img
    }
  }

	var caramelos=[];
  caramelos[0]="image/1.png";
  caramelos[1]="image/2.png";
  caramelos[2]="image/3.png";
  caramelos[3]="image/4.png";

	for (var i = 0; i < fila; i++) {
	   tabla[i]=[];
	   for (var j =0; j< columna; j++) {
			 	var aleatorio = Math.floor((Math.random()*4));
	      tabla[i][j]= new caramelo(i,j,null,caramelos[aleatorio]);
	   }
	}

	var ancho1 = $('.panel-tablero').width() / 7;
  var largo1 = $('.panel-tablero').height() / 7;

	for (var r = 0; r < fila; r++) {
    for (var c =0; c< columna; c++) {
      var cuadro = $("<img id='candy_"+r+"_"+c+"' ondrop='_onDrop(event)' ondragstart='_ondragstart(event)' ondragover='_onDragOverEnabled(event)'src='"+
        tabla[r][c].src+"' style='height:"+largo1+"px'/>");
      $(".col-"+(c+1)).append(cuadro);
      tabla[r][c].o = cuadro;
    }
  }

	construye();

	score= 0 ;
	moves= 0 ;
 	$("#score-text").html("0");
  $("#movimientos-text").html("0");


	function _ondragstart(a)
  {
    a.dataTransfer.setData("text/plain", a.target.id);
  }

	function _onDragOverEnabled(e)
 	{
	 	e.preventDefault();
 	}

	function _onDrop(e)
  {
  	var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    if (isFirefox) {
      e.preventDefault();
    }

    var src = e.dataTransfer.getData("text");
    var origenr = src.split("_")[1];
    var origenc = src.split("_")[2];

    var dst = e.target.id;
    var desr = dst.split("_")[1];
    var desc = dst.split("_")[2];

    var ddx = Math.abs(parseInt(origenr)-parseInt(desr));
    var ddy = Math.abs(parseInt(origenc)-parseInt(desc));

    if (ddx > 1 || ddy > 1)
    {
      return;
    }
    else
    {
    	var tmp = tabla[origenr][origenc].src;
      tabla[origenr][origenc].src = tabla[desr][desc].src;
      tabla[origenr][origenc].o.attr("src",tabla[origenr][origenc].src);
      tabla[desr][desc].src = tmp;
      tabla[desr][desc].o.attr("src",tabla[desr][desc].src);

			movi+=1;
      $("#movimientos-text").html(movi);

			combinar();
    }
	}

	function combinar()
  {
  	for (var r = 0; r < fila; r++)
    {
    	var prevCell = null;
      var figureLen = 0;
      var figureStart = null;
      var figureStop = null;

    	for (var c=0; c< columna; c++)
      {
        if (prevCell==null)
        {
        	prevCell = tabla[r][c].src;
          figureStart = c;
          figureLen = 1;
          figureStop = null;
          continue;
        }
        else
        {
          var curCell = tabla[r][c].src;
          if (!(prevCell==curCell))
          {
          	prevCell = tabla[r][c].src;
            figureStart = c;
            figureStop=null;
            figureLen = 1;
            continue;
          }
          else
          {
            figureLen+=1;
            if (figureLen==3)
            {
            	validFigures+=1;
              score+=10;
              $("#score-text").html(score);
              figureStop = c;

              for (var ci=figureStart;ci<=figureStop;ci++)
              {
            		tabla[r][ci].isInCombo=true;
                tabla[r][ci].src=null;
              }
            }
          }
        }
      }
    }

		for (var c=0; c< columna; c++)
    {
    	var prevCell = null;
      var figureLen = 0;
      var figureStart = null;
      var figureStop = null;

      for (var r = 0; r < fila; r++)
      {
        if (prevCell==null)
        {
          prevCell = tabla[r][c].src;
          figureStart = r;
          figureLen = 1;
          figureStop = null;
          continue;
        }
        else
        {
          var curCell = tabla[r][c].src;
          if (!(prevCell==curCell))
          {
          	prevCell = tabla[r][c].src;
            figureStart = r;
            figureStop=null;
            figureLen = 1;
            continue;
          }
          else
          {
            figureLen+=1;
            if (figureLen==3)
            {
            	validFigures+=1;
              score+=10;
              $("#score-text").html(score);
              figureStop = r;

              for (var ci=figureStart;ci<=figureStop;ci++)
              {
                tabla[ci][c].isInCombo=true;
                tabla[ci][c].src=null;
              }
            }
          }
        }
      }
    }

		var isCombo=false;
    for (var r = 0;r<fila;r++)
    for (var c=0;c<columna;c++)
    if (tabla[r][c].isInCombo)
    {
      isCombo=true;
      construye()
    }
  }

	function construye()
		{
	  	for (var r=0;r<fila;r++)
	    {
	    	for (var c=0;c<columna;c++)
	      {
	        if (tabla[r][c].isInCombo)
	        {
	          tabla[r][c].o.attr("src","");
	          tabla[r][c].isInCombo=false;
	        }
	      }
	    }

			for (var r=0;r<fila;r++)
	    {
				for (var c = 0;c<columna;c++)
	      {
	      	tabla[r][c].o.attr("src",tabla[r][c].src);
	        tabla[r][c].isInCombo=false;

					if (tabla[r][c].src==null)
	          	tabla[r][c].respawn=true;
	        if (tabla[r][c].respawn==true)
	        {
						var aleatorio = Math.floor((Math.random()*4));
	          tabla[r][c].o.off("ondragover");
	          tabla[r][c].o.off("ondrop");
	          tabla[r][c].o.off("ondragstart");
	          tabla[r][c].respawn=false;
	          tabla[r][c].src=caramelos[aleatorio];
	          tabla[r][c].locked=false;
	          tabla[r][c].o.attr("src",tabla[r][c].src);
	          tabla[r][c].o.attr("ondragstart","_ondragstart(event)");
	          tabla[r][c].o.attr("ondrop","_onDrop(event)");
	          tabla[r][c].o.attr("ondragover","_onDragOverEnabled(event)");
	        }
	      }
	    }

	    combinar();
	  }
//}
