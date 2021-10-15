let length;
let plan = [];

let altplan = [];
let player;
let altplay;
//let goaly;
//let goalx;
//let i = 0;
let end = false;
let zug = true;
let lastdirec = "standing";
let c = 1;



function myInputEvent() {
  length = parseInt(this.value()); // vom Benutzer wird die Länge/Breite des Spielfeldes angegeben

  length = length * 2 + 1;
  //console.log(length);
  plan = [];
  for (let a = 0; a < length; a++) {
    plan.push([]);
    for (let b = 0; b < length; b++) {
      if (a === 0 || b === 0 || a === length - 1 || b === length - 1) {
        plan[a].push("w");
      } else if (a % 2 === 1 && b % 2 === 1) {
        plan[a].push("f");
      } else {
        plan[a].push("");
      }
      if (a === 1 && b === 1) {
        plan[a][b] = "x";
      }
    }
  }
  //console.log(plan);
  altplan = plan;
  player = new Player(plan);
  altplay = new Player(altplan);
  creategame();
}

function creategame() {
  while (zug === true) {
    //console.log(counter)
    let possible = altplay.checkdirec(altplan, lastdirec);
    //console.log(possible);
    //console.log(altplan);
    altplay.state = random(possible);
    lastdirec = altplay.state;
    if (possible.length === 0) {
      for (let x = 0; x < altplan.length; x++) {
        for (let y = 0; y < altplan[x].length; y++) {
          if (altplan[y][x] === "x") {
            altplan[y][x] = "g";
            altplan[1][1] = "x";
          }
        }
      }
      //console.log(altplan)
      break;
    }
    //console.log(altplay.state);
    altplay.build(altplan);
    //console.log(counter)
    plan = altplan;
  }
}

function setup() {
  createCanvas(1500, 700);
  
 
  let inp = createInput("");

  inp.position(0, 0);
  inp.size(100);
  inp.input(myInputEvent);
}

function draw() {
  background(255, 235, 205);
  if (end === false) {
    textSize(35);
    fill("dimgray");
    text("Versuch: " + c, 25, (plan.length / 2) * 50 + 150);
    textSize(25)
    text("Spielprinzip: Du suchst den Weg durch ein selbst erstelltes quadratisches Labyrinth, dessen Wände du nicht sehen kannst.\n\nRegeln: \n-> gib oben die Breite(/Länge) deines Spielfeldes ein (auch während des Spieles möglich) \n-> je größer das Spielfeld, desto schwieriger\n-> klicke dann einmal außerhalb der Textbox auf den Bildschirm \n-> du kannst den Spieler mit den Pfeiltasten bewegen \n-> wenn du gegen eine Wand läufst, wirst du zurückgesetzt \n\nZiel: erreiche das orangene Feld",50, (plan.length / 2) * 50 + 200)

    //console.log(plan)
    for (let x = 0; x < plan.length; x++) {
      for (let y = 0; y < plan[x].length; y++) {
        if (plan[y][x] === "g") {
          fill("orange");
          rect((50 * x) / 2, (y * 50) / 2, 50, 50);
        }
        if (plan[y][x] === "f" || plan[y][x] === "l") {
          fill("blue");
          rect((50 * x) / 2, (y * 50) / 2, 50, 50); //felder sind blau
        }
        if (plan[y][x] === "x") {
          player.paint(x, y); // Spieler als weißer Kreis
        }
      }
    }
  } else {
    textSize(30);
    fill("dimgray");
    text(
      "Super :D \n\nDu hast " +
        c +
        " Versuch(e) gebraucht,um das Rätsel zu lösen und das Ende zu erreichen.\n\n[drücke Enter für einen Neustart]",
      60,
      150
    );
  }
}

function keyPressed() {
  if (end === false) {
    if (keyCode === 37) {
      player.state = "links";
      player.move(c);
      player.state = "standing";
    } else if (keyCode === 38) {
      player.state = "oben";
      player.move(c);
      player.state = "standing";
    } else if (keyCode === 39) {
      player.state = "rechts";
      player.move(c);
      player.state = "standing";
    } else if (keyCode === 40) {
      player.state = "unten";
      player.move(c);
      player.state = "standing";
    }
  }
  if (keyCode === 13) {
    length = 0;
    plan = [];
    altplan = [];
    end = false;
    zug = true;
    lastdirec = "standing";
    c = 1;
  }
}
