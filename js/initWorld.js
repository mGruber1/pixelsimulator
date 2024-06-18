"use strict";

const worldMap = [];
const world = document.getElementById("world");
const tilesPerRow = 10;
const tileSize = world.offsetHeight / tilesPerRow;
let enemyCount = 0;
let intervalId;

const initWorldMap = (worldMap) => {
  for (let row = 0; row < tilesPerRow; row++) {
    worldMap[row] = [];
    for (let col = 1; col < tilesPerRow; col++) {
      const randomNum = Math.round(Math.random());
      if (randomNum === 1) {
        worldMap[row][col] = 1;
      }
    }
  }
  worldMap[0][0] = 0;
};

const renderWorld = (worldMap) => {
  world.innerHTML = "";
  for (let row = 0; row < tilesPerRow; row++) {
    for (let col = 0; col < tilesPerRow; col++) {
      if (worldMap[row][col] === 1) {
        const enemy = document.createElement("div");
        enemy.style.width = tileSize.toString() + "px";
        enemy.style.height = tileSize.toString() + "px";
        enemy.classList.add("enemy");
        world.appendChild(enemy);
      } else if (worldMap[row][col] === undefined) {
        const neutral = document.createElement("div");
        neutral.style.width = tileSize.toString() + "px";
        neutral.style.height = tileSize.toString() + "px";
        neutral.classList.add("neutral");
        world.appendChild(neutral);
      } else {
        const player = document.createElement("div");
        player.style.width = tileSize.toString() + "px";
        player.style.height = tileSize.toString() + "px";
        player.classList.add("player");
        world.appendChild(player);
      }
    }
  }
};

const getPlayerPosition = (worldMap) => {
  let playerPosition = [];
  for (let row = 0; row < tilesPerRow; row++) {
    for (let col = 0; col < tilesPerRow; col++) {
      if (worldMap[row][col] === 0) {
        playerPosition.push(row, col);
        return playerPosition;
      }
    }
  }
};

const setPlayerPosition = (direction, worldMap) => {
  const currentPosition = getPlayerPosition(worldMap);

  if (direction === "down") {
    worldMap[currentPosition[0] + 1][currentPosition[1]] = 0;
    worldMap[currentPosition[0]][currentPosition[1]] = undefined;
    renderWorld(worldMap);
  }

  if (direction === "up") {
    worldMap[currentPosition[0] - 1][currentPosition[1]] = 0;
    worldMap[currentPosition[0]][currentPosition[1]] = undefined;
    renderWorld(worldMap);
  }

  if (direction === "left") {
    worldMap[currentPosition[0]][currentPosition[1] - 1] = 0;
    worldMap[currentPosition[0]][currentPosition[1]] = undefined;
    renderWorld(worldMap);
  }

  if (direction === "right") {
    worldMap[currentPosition[0]][currentPosition[1] + 1] = 0;
    worldMap[currentPosition[0]][currentPosition[1]] = undefined;
    renderWorld(worldMap);
  }
};

document.addEventListener("keydown", (event) => {
  if (event.key === "s") {
    setPlayerPosition("down", worldMap);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "w") {
    setPlayerPosition("up", worldMap);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "a") {
    setPlayerPosition("left", worldMap);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "d") {
    setPlayerPosition("right", worldMap);
  }
});

const countEnemies = (worldMap, enemyCount) => {
  for (let row = 0; row < tilesPerRow; row++) {
    for (let col = 1; col < tilesPerRow; col++) {
      if (worldMap[row][col] === 1) {
        enemyCount += 1;
      }
    }
  }
  return enemyCount;
};

initWorldMap(worldMap);
renderWorld(worldMap);

intervalId = setInterval(() => {
  if (countEnemies(worldMap, enemyCount) === 0) {
    alert("GAME WON!");
    clearInterval(intervalId);
  }
}, 1000);
