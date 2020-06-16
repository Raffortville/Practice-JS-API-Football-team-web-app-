let table = { sortKey: null, playerPosActiv: "all"};
let statPlay = [];
let descending = true;
let list = document.getElementById('list');
const boutons = document.querySelectorAll('tr th');
let boutonsPos = document.querySelectorAll('[data-pos]');
const url = "https://api.football-data.org/v2/teams/516/";

////*************************************   APPEL FETCH API FOOTBALL ****************************/
  fetch(url, {

  method: "GET",
  headers: { "X-Auth-Token": "4e1bcfc7c6a14469ab579521b2b6c912"}
})
  .then(resp => resp.json())
  .then(function(data) {players = data.squad
  players.pop()
  handleTable();
  showPlayers(players)
 

})
  .catch(function(error) {console.log(error);
});

////************************************* CONCATENATION DU TAB DES STATS DANS LE TAB PLAYERS ET AFFICHAGE

const showPlayers = (tablo) =>{

  list.innerText = ""

  tablo.forEach(player=>{ statPlay.forEach(statp=> {

    if(statp.nom === player.name){
       
      player.matchs = statp.matchs;
      player.shirtNumber = statp.num;
      player.buts = statp.buts;
      player.decis = statp.decis;
      player.TirC = statp.TirC;
      player.duel = statp.duel;
      player.int = statp.int;
      player.hdm = statp.hdm;
      player.note = statp.note;
      player.photo = statp.photo;
      player.notemoy = statp.resultNoteMoy.toFixed(1);

      list.insertAdjacentHTML('beforeend',`<tr data-nom ="${player.name}">
      <td id="listnum"><span class ="ecus">${player.shirtNumber}</span><span class="nom">${player.name}</span></td>
      <td data-position ="${player.position}" >${player.position}</td><td >${player.matchs}</td><td >${player.buts}</td><td >${player.decis}</td>
      <td >${player.TirC}</td><td>${player.duel}</td><td >${player.int}</td><td>${player.hdm}</td>
      <td >${player.notemoy}</td>
      </tr>`)
    } 
    })
 })
 setUpDataChart();
}

const handleTable = () => {

    boutonsPos.forEach(bout=> { bout.addEventListener('click', (e) => {boutonsPos.forEach(bout => { 
    
      bout.classList.remove("activ");})
    
      bout.classList.add("activ");
    
      table.playerPosActiv = bout.dataset.pos;
      
      setUpTable();
    })
    })

  boutons.forEach(bout=> { bout.addEventListener('click',(e) => { table.sortKey = bout.dataset.value;

    setUpTable();

  })})

}

const setUpTable = () => {

  if(table.playerPosActiv === "all" && table.sortKey == null){

    showPlayers(players)
  

  } else if(table.playerPosActiv === "all" && table.sortKey){

    sortTable(players);
 
  
  }else if(table.playerPosActiv !== "all" && table.sortKey == null){

    let arrayByPos = players.filter(player => { return player.position == table.playerPosActiv})
    showPlayers(arrayByPos);
   
  }else if(table.playerPosActiv !== "all" && table.sortKey){

    let arrayByPos = players.filter(player => { return player.position == table.playerPosActiv})
    sortTable(arrayByPos)

  } else {return;}
}



const sortTable = (array) => {

  if(table.sortKey == "shirtNumber" || table.sortKey == "name" ) {changeOrderByStr(array);
       
  } else if(table.sortKey == "position") { showPlayers(array);setUpDataChart();
    
  } else {changeOrderNumber(array)}
}
  
  const changeOrderByStr = array => {
  
    if(descending == true ){
      
      playersSortedString = [...array].sort((a, b) => b[table.sortKey] > a[table.sortKey] ? 1 : -1);
      showPlayers(playersSortedString)
    
      descending = false;
      
    } else {
  
      playersSortedString = [...array].sort((a, b) => a[table.sortKey] > b[table.sortKey] ? 1 : -1);
      showPlayers(playersSortedString);
  
      descending = true;
    }
  }
  
  const changeOrderNumber = (array) => {
  
    if(descending == true){
  
      const playersSortedNumber = [...array].sort((a,b) => b[table.sortKey] - a[table.sortKey]);
      showPlayers(playersSortedNumber);
    
      descending = false;
      
    } else {
  
      const playersSortedNumber = [...array].sort((a,b) => a[table.sortKey] - b[table.sortKey]);
      showPlayers(playersSortedNumber);
   
      descending = true;
    }
  }

function Statitistks(nom,matchs,buts,decis,TirC,duel,int,hdm,note,num,photo){

  this.nom = nom;
  this.matchs = matchs;
  this.buts = buts;
  this.decis = decis;
  this.TirC = TirC;
  this.duel = duel;
  this.int = int;
  this.hdm = hdm;
  this.note = note;
  this.num = num;
  this.photo = photo;
  this.noteMoy = () => {
    let sum = 0;
    this.note.forEach(not => { 

      sum += not;
      this.resultNoteMoy = sum.toFixed(1) / this.note.length;

      return this.resultNoteMoy;
    })
  }
  statPlay.push(this);
}

Statitistks();

let mandanda = new Statitistks ("Steve Mandanda", 27, 0,0,0,0,0,2,[5,7.5,4.5,7.5,7.5,6.5,7.5,7,5.5,7],"30","img/profil/mandanda.jpg");mandanda.noteMoy();
let pele = new Statitistks ("Yohann Pelé", 3, 0,0,0,0,0,1,[7,6,5.5],"16","img/profil/pelé.jpg");pele.noteMoy();
let dia = new Statitistks ("Ahmadou Bamba Dia", 0, 0,0,0,0,0,0,[0],"40","img/profil/dia.jpg");dia.noteMoy();
let Ngapandouetnbu = new Statitistks ("Simon Ngapandouetnbu", 0, 0,0,0,0,0,0,[0],"00");Ngapandouetnbu.noteMoy();
let alvaro = new Statitistks ("Álvaro González", 20,0,0,3,70,18,1,[5,5.5,4.5,6.5,6,5.5,7,5.5,6,5.5,6.5,5.5],"03","img/profil/Alvaro.jpg");alvaro.noteMoy();
let sakai = new Statitistks ("Hiroki Sakai", 21, 0,0,0,114,23,0,[2,6,4,4.5,4,4,3],"02","img/profil/sakai.jpg");sakai.noteMoy();
let kamara = new Statitistks ("Boubacar Kamara", 24, 1,2,3,163,34,1,[5.5,7,5.5,8.5,6,6.5,7,5,7,4.5,7],"04","img/profil/Camara.jpg");kamara.noteMoy();
let amavi = new Statitistks ("Jordan Amavi", 26, 1,1,4,167,56,1,[4,6,4,7.5,7,6,5.5,6.5,6,5.5,6],"18","img/profil/Amavi.jpg");amavi.noteMoy();
let duje = new Statitistks ("Duje Ćaleta-Car", 23, 1,1,5,97,26,2,[6.5,5,7.5,7,5.5,6.5,6,7,6],"15","img/profil/duje.jpg");duje.noteMoy();
let aliMohamed = new Statitistks ("Abdallah Ali Mohamed", 0, 0,0,0,0,0,0,[0],"31","img/profil/ali.jpg");aliMohamed.noteMoy();
let perrin = new Statitistks ("Lucas Perrin", 4, 0,0,1,31,10,0,[0],"32","img/profil/perrin.jpg");perrin.noteMoy();
let nkounkou = new Statitistks ("Niels Nkounkou", 0, 0,0,0,0,0,0,[0],"33","img/profil/nkounkou.jpg");nkounkou.noteMoy();
let khaoui = new Statitistks ("Saîf-Eddine Khaoui",7, 0,0,2,9,1,0,[5],"24","img/profil/khaoui.jpg");khaoui.noteMoy();
let lopez = new Statitistks ("Maxime López", 23, 0,3,2,13,8,0,[5,3,4,5,3,5,4],"27","img/profil/lopez.jpg");lopez.noteMoy();
let bouna = new Statitistks ("Bouna Sarr", 27,1,3,4,193,32,1,[5.5,6,3.5,7,5,6,5,8,4.5,3.5],"17","img/profil/sarr.jpg");bouna.noteMoy();
let sanson = new Statitistks ("Morgan Sanson",27,5,4,12,165,23 ,1,[6.5,5.5,5.5,8,5,5.5,6,4.5,5.5,4.5,5.5],"08","img/profil/sanson.jpg");sanson.noteMoy();
let sertic = new Statitistks ("Grégory Sertic", 0, 0, 0,0,0,0,0,[0],"06","img/profil/sertic.jpg");sertic.noteMoy();
let rongier = new Statitistks ("Valentin Rongier",26,0,3,11,158,38,0,[5.5,6.5,3.5,6,4.5,6,5,5.5,6,5.5,5.5,6],"21","img/profil/rongier.jpg");rongier.noteMoy();
let chabrolle = new Statitistks ("Florian Chabrolle", 1, 0,0,0,1,0,0,[0],"29","img/profil/chabrol.jpg");chabrolle.noteMoy();
let philiponeau = new Statitistks ("Alexandre Phliponeau", 0, 0,0,0,0,0,0,[0],"34","img/profil/philipponeau.jpg");philiponeau.noteMoy();
let thauvin = new Statitistks ("Florian Thauvin",2, 0,0,1,7,0,0,[0],"26","img/profil/thauvin.jpg");thauvin.noteMoy();
let payet = new Statitistks ("Dimitri Payet",22,9,4,26,110,18,1,[5.5,5.5,3.5,6,7.5,7.5,4.5,6.5,5.5,5,5.5],"10","img/profil/payet.jpg");payet.noteMoy();
let valere = new Statitistks ("Valère Germain",25,2, 4,4,74,8,1,[4,5.5,3,8.5,3,3.5,5,3.5,3.5],"28","img/profil/valere.jpg");valere.noteMoy();
let nemanja = new Statitistks ("Nemanja Radonjić", 21,5,1,14,62,2,0,[4,6,5.5,4.5,6.5,4,5],"07","img/profil/nemanja.jpg");nemanja.noteMoy();
let pipa = new Statitistks ("Darío Benedetto",26,11,0,27,108,3,1,[4.5,9,3,7.5,4,3,4,5,3,4],"09","img/profil/pipa.jpg");pipa.noteMoy();
let marley = new Statitistks ("Marley Aké", 9, 0,0,0,9,1,0,[7.5,4.5],"36","img/profil/Marley.jpg");marley.noteMoy();
let lihaji = new Statitistks ("Isaac Lihadji",2, 0,0,0,2,0,0,[0],"00");lihaji.noteMoy();
let strootman = new Statitistks ("Kevin Strootman",25,2,3,2,83,17,0,[5.5,4.5,5,5.5,4],"12","img/profil/kevin.jpg");strootman.noteMoy();

let arrayNbMatchs = [];
let arrayNotes = [];
let noteJoueur;

for(let i = 1; i < 13; i++){ arrayNbMatchs.push("match " + i )}

const setUpDataChart =  () => {

 const boutonNoms = document.querySelectorAll(".nom");
 console.log(players)
 boutonNoms.forEach(bout=> { bout.addEventListener('click',(e) => {showStatPlayer(e)})})
}

const showStatPlayer = (e) => {
 
  const noteStyle = document.getElementById('noteStyle');
  const nomJoueur = document.getElementById('nomJ');
  const position = document.getElementById('position');
  const profilPhoto = document.querySelector('.profilPhoto')


  players.forEach(player => { 

    if(player.name === e.target.innerText){

     arrayNotes = player.note;                   
     noteStyle.innerHTML =  player.notemoy;
     nomJoueur.innerHTML = player.name;
     position.innerHTML = player.position;
     profilPhoto.src = player.photo;
    }
  })
 setUpCHart();
}

const setUpCHart = () => {

const ctx = document.getElementById('myChart');

const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: arrayNbMatchs, 
        datasets: [{

          label: 'Notes du joueur ',
          data: arrayNotes,
          borderColor: ' rgba(43,176,225,1 )',
          borderWidth: 2
        }]
    },
    options: {
        scales: {
      
          yAxes: [{

                ticks: {
                  max: 10,
                  beginAtZero: true,
                  fontColor: 'white', 
                },
            }],

            xAxes: [{
              ticks: {fontColor: 'white',},
              gridLines: { color: ["rgba(43,176,225,1 )"] },
             }]
        },
        legend: { display: false,}
    }
});
}

//////////////////// animation on Hover///////////////////////////////

(function animationIcon(){ const listTab = document.querySelectorAll('tr th');

  listTab.forEach(lis=>{ lis.addEventListener('mouseover', function(event){

  lis.childNodes[1].lastChild.classList.add('rotate')})

  lis.addEventListener('mouseleave', function(event){ 

  lis.childNodes[1].lastChild.classList.remove('rotate')})
})
})();


