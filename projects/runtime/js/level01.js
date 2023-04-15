var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function (game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1,
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "sawblade", "x": 600, "y": groundY - 60},
                { "type": "sawblade", "x": 900, "y": groundY },
                { "type": "reward", "x": 800, "y": groundY - 50 },
                { "type": "enemy", "x": 600, "y": groundY - 50 },
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        function createDanmaku(xvalue, yvalue) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            sawBladeHitZone.x = xvalue;
            sawBladeHitZone.y = yvalue;
            game.addGameItem(sawBladeHitZone);
            var obstacleImage = draw.bitmap("img/sawblade.png");
            var danmaku = draw.circle(26, "LightYellow", "Yellow", 10);
            sawBladeHitZone.addChild(danmaku);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        }

        function createFairy(xvalue) {
            var enemy = game.createGameItem("enemy", 25);
            var redSquare = draw.rect(50, 50, "Pink");
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x = xvalue;
            enemy.y = groundY - 50;
            enemy.velocityX = -1;
            enemy.onPlayerCollision = function () {
                game.changeIntegrity(-10);
            };
            enemy.onProjectileCollision = function () {
                game.increaseScore(100);
                enemy.fadeOut();
            };
            game.addGameItem(enemy);
        }

        function createSI(xvalue, ver) {
            var enemy = game.createGameItem("enemy", 25);
            var redSquare = draw.rect(50, 50, "Cyan");
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x = xvalue;
            enemy.y = groundY - 50;
            enemy.velocityX = -1;
            enemy.onProjectileCollision = function () {
                game.increaseScore(50);
                game.changeIntegrity(50);
                enemy.fadeOut();
            };
            game.addGameItem(enemy);
        }

        for (var i = 0; i < levelData.gameItems.length; i++) {
            var gameItemObject = levelData.gameItems[i];
            var firstX = gameItemObject.x;
            var firstY = gameItemObject.y;
            if (gameItemObject.type == "sawblade") {
                createDanmaku(firstX, firstY);
            } else if (gameItemObject.type == "reward") {
                createSI(firstX)
            } else if (gameItemObject.type == "enemy") {
                createFairy(firstX)
            }
        }
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if ((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
