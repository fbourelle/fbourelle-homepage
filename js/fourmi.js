$(function(){
  let fx, fy = 0;
  let direction = 0;
  let tabDirection = [-1, -1, 1, 1];
  let timer = 0;
  let state = '';
  let win = false;

  $('#go').click(function(){
    clearInterval(timer);
    $('#fourmi').html(generate( $('#dimX').val(), $('#dimY').val()));
    $('#start').removeAttr('disabled');

    $('td').click(function(){
      mouseId = $(this).attr('id');
      if (mouseId == $('#fourmi'+(fx)+'_'+(fy)).attr('id')) {
        clearInterval(timer),
        alert('you killed the ant');
        win = true;
        $('#stop').text('Remettre a 0');
        $('#stop').removeAttr('disabled');
        $('#start, #go').attr('disabled', true);
      }
    });
  });

  $('#start').click(function(){
    timer = setInterval(function(){fourmiPos($('#dimX').val(),$('#dimY').val())}, 50) // fourmiPos //
    $('#stop').removeAttr('disabled');
    $('#start, #go').attr('disabled', true);
  });

  $('#stop').click(function(){
    clearInterval(timer);
    timer = 0;
    $('#start').removeAttr('disabled');
    $('#stop').attr('disabled', true);
    if (win == true) {
      $('#go').attr('disabled', true);
      $('#fourmi').html(' ');
      win = false;
      $('#stop').text('Stop');
      $('#fourmi').html(generate( $('#dimX').val(), $('#dimY').val()));
    }
  });

  function start(x, y, i, j){ return (i == Math.round(x/2) && j == Math.round(y/2)); };

  function getRandomValues(min,max){ return Math.round(Math.random()*( max - min ) + min); };

  function checkLimits(x, y) {
    if (fx < 0) fx = 0;
    if (fx > x) fx = x;
    if ((fy < 0) && (fx !=0)) fy = 0;
    if (fy > y) fy = y;
    if ((fx == 0) && (fy == -1)) fx = getRandomValues(0,x), fy = getRandomValues(0,y);
  };

  function fourmiPos(){
    let ant = $('#fourmi'+(fx)+'_'+(fy));
    let compteur = parseInt(ant.text());
    let fColor = ant.css('backgroundColor');

    if (ant.attr('class') == 'blue') {
      ant.removeClass('blue').addClass('lila').css('background-color', ''+changeColor(fColor,20));
      if (direction%2==0) fx = fx+tabDirection[direction];
        else fy = fy+tabDirection[direction];
      ++direction;
      if (direction == 4) direction = 0;
    } else {
      if (ant.attr('class') == 'noir') {
        ant.removeClass('noir').addClass('blue').css('background-color', changeColor(fColor,-10));
      } else {
        ant.removeClass('lila').addClass('blue').css('background-color', changeColor(fColor,-10));
      }
      if (direction%2==0) fx = fx-tabDirection[direction];
        else fy = fy-tabDirection[direction];
      --direction;
      if (direction == -1) direction = 3;
    }
    ant.text(changeText(compteur));
    checkLimits($('#dimX').val(),$('#dimY').val());
  };

  function changeText(compteurTD){
    if (compteurTD != undefined) {
      ++compteurTD;
      return compteurTD;
    }
  };

  function changeColor(colorval, modif){
    if (colorval != undefined) {
      const parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
      let r = parseInt(parts[1])+modif;
      let g = parseInt(parts[2])+(modif*2);
      let b = parseInt(parts[3])+(modif*3);
      if (( r > 255) && ( g > 255 ) && ( b > 255 )) r = 0, g = 0, b = 0;
      return 'rgb('+r+','+g+','+b+')';
    }
  };

  function generate(x , y){
    let flow ='<table>';
    for (let i = 0; i < x; i++) {
      flow +='<tr>';
      for (let j = 0; j < y; j++) {
        flow += '<td';
        if (start( x , y , i , j)) {
          flow += ' class="blue" id="fourmi' +i+'_'+j+'"';
          fx = i;
          fy = j;
        }
        else {
          flow += ' class="noir" id="fourmi' +i+'_'+j+'"';
        }
        flow += '>0</td>';
      }
      flow += '</tr>';
    }
    flow += '</table>';
    return flow;
  };

});
