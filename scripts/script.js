const map = [
    ['*','*','*','*','*'],
    ['*','*','*','*','*'],
    ['*','*','*','*','*'],
    ['*','*','*','*','*'],
    ['*','*','*','*','*']
];

const places = [
    ['images/bordeaux.jpg', 'images/greece.jpg', 'images/cellar.jpg', 'images/cottage.jpg', 'images/grass.jpg'],
    ['images/lostplaces.jpg', 'images/grandcanyon.jpg', 'images/apartment.jpg', 'images/monastery.jpg', 'images/graveyard.jpg'],
    ['images/graffiti.jpg', 'images/lake.jpg', 'images/belem.jpg', 'images/phangnga.jpg', 'images/abandoned.jpg'],
    ['images/moscow.jpg', 'images/taxi.jpg', 'images/griffith.jpg', 'images/sydney.jpg', 'images/street.jpg'],
    ['images/bench.jpg', 'images/castle.jpg', 'images/paris.jpg', 'images/boat.jpg', 'images/house.jpg']
]

let score = 0;


let playerPosition = {
    row: Math.floor(map.length / 2),
    column: Math.floor(map[0].length / 2)
};

map[playerPosition.row][playerPosition.column] = 'P';


generateCat()

function generateCat(){
let catRow = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
let catColumn = Math.floor(Math.random() * (4 - 0 + 1)) + 0;

if(map[catRow][catColumn] == 'P' || map[catRow][catColumn] == 'Z')
{
    generateCat()
}
else{
    map[catRow][catColumn] = 'C';
}
}

let zomRow = 0;
let zomColumn = 0;
let zombiePosition = {
    row: 0,
    column: 0
}

generateZombie()



function generateZombie()
{
    zomRow = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
    zomColumn = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
    zombiePosition = {
        row: zomRow,
        column: zomColumn
    }

    if(map[zomRow][zomColumn] == 'P' || map[zomRow][zomColumn] == 'C'){
        generateZombie()
    }
    else{
        map[zomRow][zomColumn] = '*';
    }
}

function moveZombie()
{
    // Maybe in the future
}

const mapContainer = document.getElementById("map");

function mapDisplay() {
    let mapHTML = "<table>";
    for(let i = 0; i < map.length; i++) {
        mapHTML += "<tr>";
        for (let j = 0; j < map[i].length; j++) {
            mapHTML += "<td>" + map[i][j] + "</td>"; 
        }
        mapHTML += "</tr>";
    }
    mapHTML += "</table>";
    mapContainer.innerHTML = mapHTML;

}

placeImage = places[playerPosition.row][playerPosition.column]
document.getElementById("place").innerHTML = '<img src="' + placeImage + '">';


function movePlayer(direction) {
    document.getElementById("pic").innerHTML = '';
    document.getElementById("message").textContent = '';
    document.getElementById("info").innerHTML = '';
    let newRow = playerPosition.row;
    let newColumn = playerPosition.column;

    switch(direction) {
        case 'N':
            newRow--;
            break;
        case 'S':
            newRow++;
            break;
        case 'W':
            newColumn--;
            break;
        case 'E':
            newColumn++;
            break;
        default:
            return; 
    }
    if (newRow >= 0 && newRow < map.length && newColumn >= 0 && newColumn < map[0].length) {
        if(map[newRow][newColumn] == 'C')
        {
            map[playerPosition.row][playerPosition.column] = '*';
            map[newRow][newColumn] = 'P'

            playerPosition.row = newRow;
            playerPosition.column = newColumn;

            generateCat()
            mapDisplay();
            document.getElementById("message").textContent = "You found the cat!"
            document.getElementById("pic").innerHTML = '<img src="images/cat.jpg">';

            score++;
            document.getElementById("score").textContent = "Score: " + score;
            document.getElementById("info").innerHTML = "It was a ragdoll from " + catOrigin;
        }
        else if(newRow === zombiePosition.row && newColumn === zombiePosition.column)
        {
            
            zombiePosition.row = null;
            zombiePosition.column = null;
            generateZombie();
            document.getElementById("message").textContent = "You died of a zombie! Your score: " + score;
            score = 0;
            document.getElementById("score").textContent = "Score: " + score;
        }
        
        map[playerPosition.row][playerPosition.column] = '*'; 
        playerPosition.row = newRow;
        playerPosition.column = newColumn;
        map[playerPosition.row][playerPosition.column] = 'P'; 
        mapDisplay(); 
        
    } else 
    {
        document.getElementById("message").textContent = "Cannot move further in that direction!";
    }

    //moveZombie();

    placeImage = places[playerPosition.row][playerPosition.column]
    document.getElementById("place").innerHTML = '<img src="' + placeImage + '">';
}

mapDisplay()


//Api
let options = {
    method: 'GET',
    headers: { 'X-Api-Key': 'NQBhctmRhp1rRFOsQHdOQQ==ZFpr8XVms1v6M14C' }
  }

fetch('https://api.api-ninjas.com/v1/cats?name=ragdoll', options)
  .then(response => response.json())
  .then(function(data){ 
    console.log(data)
    catOrigin = data[0].origin
    
  }
)
  .catch(error => console.log(error));