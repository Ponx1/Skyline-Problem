
var defaultData = [
  [2,9,10],
  [3,6,15],
  [5,12,12],
  [13,16,10],
  [15,17,5]
];

var houses = [];

var criticalX = [];

var result = [];

function loadDefault(){
  houses = defaultData;
  $('#input').empty();
  houses.forEach(createRow);
}

function addNew(){
  if($('#Li').val()!='' && $('#Ri').val()!='' && $('#Hi').val()!='' && $('#Ri').val()>$('#Li').val()){
      newHouse = [$('#Li').val(),$('#Ri').val(),$('#Hi').val()];
      houses.push(newHouse);
      createRow(newHouse);
  }else{
    alert('Favor de llenar los datos correctos, recuerda Ri>Li');
  }
}

function createRow(row){
  html = '<tr><td>'+row[0]+'</td><td>'+row[1]+'</td><td>'+row[2]+'</td></tr>';
  $('#input').append(html);
}

function clearData(){
  houses = [];
  $('#input').empty();
}

function getOutput(){
  criticalX = [];
  result = [];
  houses.forEach(getCritical);
  criticalX.forEach(getResult);
  for(var v = 1; v < result.length; v++){
    if(result[v-1][1] == result[v][1]){
      result.splice(v,1);
    }
  }
  result.forEach(rowResults);
  draw();
}

function rowResults(row){
  html = '<tr><td>'+row[0]+'</td><td>'+row[1]+'</td></tr>';
  $('#output').append(html);
}

function getCritical(row){
  criticalX.push(row[0]);
  criticalX.push(row[1]);
  criticalX.sort(function(a, b) {
    return a - b;
  });
}

function getResult(val){
  var maxy = 0;
  for(var v = 0; v < houses.length; v++){
    home = houses[v];
    if(val >= home[0] && val < home[1] && home[2] > maxy){
      maxy = home[2];
    }
  }
  result.push([val,maxy]);

}

function draw() {
  let canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    let ctx = canvas.getContext('2d');
    for(let i =0;i<houses.length;i++) {
      let rectangle = new Path2D();
      rectangle.rect(houses[i][0]*10,0, 10*(houses[i][1]-houses[i][0]), houses[i][2]*10);      
      ctx.fill(rectangle);
    }
  }
}
