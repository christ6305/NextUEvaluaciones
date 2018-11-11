var calculadora=(function(num1,num2){
  var resultado=0
  function actualizarResultado(nuevoRes){
    resultado=nuevoRes
  }
  return{
    sumar:function(){
      var resultado=num1+num2
      actualizarResultado(resultado)
    },
    restar:function(){
      var resultado=num1-num2
      actualizarResultado(resultado)
    },
    multiplicar:function(){
      var resultado=num1*num2
      actualizarResultado(resultado)
    },
    dividir:function(){
      var resultado=num1/num2
      actualizarResultado(resultado)
    },
    resultado:function(){
      return resultado
    }
  }
})

function reducirTamaño(elemento){
  elemento.style.width = "18%"
  elemento.style.height="61.91px"
  setTimeout(function(){
    elemento.style.width = "22%";
    elemento.style.height="62.91px"
  }, 100);
}

function reducirTamaño2(elemento){
  elemento.style.width = "22%"
  elemento.style.height="60.91px"
  setTimeout(function(){
    elemento.style.width = "29%";
    elemento.style.height="62.91px"
  }, 100);
}

var aux=''
var numAux

function displayTeclaNum(elemento){
  if(elemento.id!='mas' && elemento.id!='menos' && elemento.id!='por' && elemento.id!='dividido'){
    var numero = document.getElementById('display');
    if(numero.innerHTML.length<=7){
      if(numero.innerHTML=='0'){
        if(elemento.id!=0){
          numero.innerHTML=elemento.id
          if(elemento.id=='0' || elemento.id=='1' || elemento.id=='2' || elemento.id=='3'){
            reducirTamaño2(elemento)
          }else{
            reducirTamaño(elemento)
          }
        }else{
          reducirTamaño2(elemento)
        }
      }else {
        if(elemento.id=='igual'){
          reducirTamaño2(elemento)
          if(aux=='suma'&& numAux!=''){
            var c1=calculadora(Number(numAux),Number(numero.innerHTML))
            c1.sumar()
            numero.innerHTML=c1.resultado()
          }else if(aux=='resta'&& numAux!=''){
            var c1=calculadora(Number(numAux),Number(numero.innerHTML))
            c1.restar()
            numero.innerHTML=c1.resultado()
          }else if(aux=='multi'&& numAux!=''){
            var c1=calculadora(Number(numAux),Number(numero.innerHTML))
            c1.multiplicar()
            numero.innerHTML=c1.resultado()
          }else if(aux=='divide'&& numAux!=''){
            var c1=calculadora(Number(numAux),Number(numero.innerHTML))
            c1.dividir()
            numero.innerHTML=c1.resultado()
          }
        }else {
          numero.innerHTML=numero.innerHTML+elemento.id
          if(elemento.id=='0' || elemento.id=='1' || elemento.id=='2' || elemento.id=='3'){
            reducirTamaño2(elemento)
          }else{
            reducirTamaño(elemento)
          }
        }
      }
    }
  }else{
    if(elemento.id=='mas'){
      var numero = document.getElementById('display');
      numAux=numero.innerHTML
      aux='suma'
      numero.innerHTML=''
      //reducirTamaño(elemento)
    }else if(elemento.id=='menos'){
      var numero = document.getElementById('display');
      numAux=numero.innerHTML
      aux='resta'
      numero.innerHTML=''
      reducirTamaño(elemento)
    }else if(elemento.id=='por'){
      var numero = document.getElementById('display');
      numAux=numero.innerHTML
      aux='multi'
      numero.innerHTML=''
      reducirTamaño(elemento)
    }else if(elemento.id=='dividido'){
      var numero = document.getElementById('display');
      numAux=numero.innerHTML
      aux='divide'
      numero.innerHTML=''
      reducirTamaño(elemento)
    }
  }
}

function resetDisplay(elemento){
  var numero = document.getElementById('display');
  numero.innerHTML='0'
  reducirTamaño(elemento)
}

function displayPunto(elemento){
  var numero = document.getElementById('display');
  var str=numero.innerHTML
  reducirTamaño2(elemento)
  if(!str.includes('.'))
    numero.innerHTML=numero.innerHTML+'.'
}

function displaySigno(elemento){
  var numero = document.getElementById('display');
  var str=numero.innerHTML
  reducirTamaño(elemento)
  if(str!=0){
    if(!str.includes('-')){
      numero.innerHTML='-'+numero.innerHTML
    }else{
      var res=numero.innerHTML.replace('-','')
      numero.innerHTML=res
    }
  }
}

var Eventos={
  init:function(){
    document.getElementById('on').onclick = this.eventoResetDisplay
    document.getElementById('sign').onclick = this.eventoSigno
    document.getElementById('punto').onclick = this.eventoPunto
    document.getElementById('0').onclick = this.eventoDisplayTeclaNum
    document.getElementById('1').onclick = this.eventoDisplayTeclaNum
    document.getElementById('2').onclick = this.eventoDisplayTeclaNum
    document.getElementById('3').onclick = this.eventoDisplayTeclaNum
    document.getElementById('4').onclick = this.eventoDisplayTeclaNum
    document.getElementById('5').onclick = this.eventoDisplayTeclaNum
    document.getElementById('6').onclick = this.eventoDisplayTeclaNum
    document.getElementById('7').onclick = this.eventoDisplayTeclaNum
    document.getElementById('8').onclick = this.eventoDisplayTeclaNum
    document.getElementById('9').onclick = this.eventoDisplayTeclaNum
    document.getElementById('mas').onclick=this.eventoDisplayTeclaNum
    document.getElementById('menos').onclick=this.eventoDisplayTeclaNum
    document.getElementById('igual').onclick=this.eventoDisplayTeclaNum
    document.getElementById('por').onclick=this.eventoDisplayTeclaNum
    document.getElementById('dividido').onclick=this.eventoDisplayTeclaNum
  },
  eventoReduceTamaño: function(event){
    reducirTamaño(event.target);
  },
  eventoDisplayTeclaNum:function(event){
    displayTeclaNum(event.target)
  },
  eventoResetDisplay:function(event){
    resetDisplay(event.target)
  },
  eventoPunto:function(event){
    displayPunto(event.target)
  },
  eventoSigno:function(event){
    displaySigno(event.target)
  },
  eventoSuma:function(event){
    suma(event.target)
  }
}

Eventos.init();
