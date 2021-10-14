class Player {
    constructor(plan, end) {
      this.state = "standing"; //rechts,links,oben,unten
    }
  
    paint(x, y) {
      if (end) {
        fill("green");
        rect((50 * x) / 2, (y * 50) / 2, 50, 50);
      } else {
        fill("blue");
        rect((50 * x) / 2, (y * 50) / 2, 50, 50);
      }
      fill("white");
      circle((x * 50) / 2 + 25, (y * 50) / 2 + 25, 25);
    }
  
    move() {
      let dx = 0;
      let dy = 0;
  
      if (this.state === "rechts") {
        dx = 2;
      } else if (this.state === "links") {
        dx = -2;
      } else if (this.state === "unten") {
        dy = 2;
      } else if (this.state === "oben") {
        dy = -2;
      }
  
      for (let x = 0; x < plan.length; x++) {
        for (let y = 0; y < plan[x].length; y++) {
          if (plan[y][x] === "x") {
            //console.log(x, y, dx, dy);
  
            if (
              y + dy < 0 ||
              y + dy > plan.length - 1 ||
              x + dx < 0 ||
              x + dx > plan.length - 1
            ) {
              plan[y][x] = "f";
              plan[1][1] = "x";
              console.log("wall");
              c+=1
            } else if (plan[y + dy/2][x + dx/2] === "w"){
                       plan[y][x] = "f";
              plan[1][1] = "x";
              console.log("wall");
              c+=1
                       }
            else if (plan[y + dy][x + dx] === "g") {
              end = true;
              plan[y][x] = "f";
              plan[y + dy][x + dx] = "x";
              return;
            } else {
              plan[y][x] = "f";
              plan[y + dy][x + dx] = "x";
            }
            return;
          }
        }
      }
    }
    checkdirec(plan, lastdirec) {
      let resultArray = [];
      for (let x = 0; x < plan.length; x++) {
        for (let y = 0; y < plan[x].length; y++) {
          if (plan[y][x] === "x") {
            if (plan[y + 1][x] !== "w" && lastdirec !== "oben") {
              resultArray.push("unten");
            }
            if (plan[y - 1][x] !== "w" && lastdirec !== "unten") {
              resultArray.push("oben");
            }
            if (plan[y][x + 1] !== "w" && lastdirec !== "links") {
              resultArray.push("rechts");
            }
            if (plan[y][x - 1] !== "w" && lastdirec !== "rechts") {
              resultArray.push("links");
            }
          }
        }
      }
      return resultArray;
    }
  
    build(plan) {
      let dx = 0;
      let dy = 0;
  
      if (this.state === "rechts") {
        dx = 2;
      } else if (this.state === "links") {
        dx = -2;
      } else if (this.state === "unten") {
        dy = 2;
      } else if (this.state === "oben") {
        dy = -2;
      }
      //console.log(dx, dy);
      for (let x = 0; x < plan.length; x++) {
        for (let y = 0; y < plan[x].length; y++) {
          if (plan[y][x] === "x") {
            // jedes Feld wird nach dem Spieler abgesucht
            plan[y + dy][x + dx] = "n"; // n=next         // das Feld, auf das der Spieler in diesem Zug tritt, wird als solches markiert
  
            if (y + 2 < plan.length) {
              if (plan[y + 2][x] === "f") {
                plan[y + 1][x] = "w"; // wenn sich unterhalb des aktuellen Feldes ein Feld befindet, auf das nicht gezogen wird und das nicht schon bezogen worden ist: Wand setzen
              }
            }
            if (y - 2 > 0) {
              if (plan[y - 2][x] === "f") {
                plan[y - 1][x] = "w"; // oberhalb analog zu unterhalb
              }
            }
            if (x + 2 < plan.length) {
              if (plan[y][x + 2] === "f") {
                plan[y][x + 1] = "w"; // rechts analog zu unterhalb
              }
            }
            if (x - 2 > 0) {
              if (plan[y][x - 2] === "f") {
                plan[y][x - 1] = "w"; // links analog zu unterhalb
              }
            }
  
            plan[y + dy][x + dx] = "x"; // der Spieler wird weiterbewegt
            plan[y][x] = "l"; // das letzte Feld wird als "begangen" markiert
            this.state = "standing";
            return;
          }
        }
      }
    }
  }