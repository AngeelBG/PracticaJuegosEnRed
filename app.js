 var game = new Phaser.Game(1000, 600, Phaser.AUTO, 'zonaJuego', { preload: preload, create: create, update: update });
   

        var mapa = [
             [1,2,1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1,2,1],
             [1,1,2,1,1,1,1,2,1,1],
             [1,1,1,1,1,2,1,1,1,1],
             [1,1,1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1,2,1],
             [1,1,1,2,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,2,1,1],
             [1,2,1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1,1,1],
         ];

        var jugadores = [
             [1,1,1,1,1,1,1,1,1,1],       //LEYENDA
             [1,1,1,1,1,1,1,1,1,1],         //AlienQueen -> 2 
             [1,1,1,1,1,1,1,1,1,1],         //Spitter -> 3
             [1,1,1,1,1,1,1,1,1,1],         //Claw -> 4
             [1,1,1,1,1,1,1,1,1,1],         //Charguer -> 5
             [1,1,1,1,1,1,1,1,1,1],         //King -> 6
             [1,1,1,1,1,1,1,1,1,1],         //Tank -> 7
             [1,1,1,1,1,1,1,1,1,1],         //Marine -> 8
             [1,1,1,1,1,1,1,1,1,1],         //Ranger -> 9
             [1,1,1,1,1,1,1,1,1,1],
         ];
        
        var tiles = [
             [1,1,1,1,1,1,2,2,2,2],
             [1,2,2,2,2,1,1,1,2,2],
             [1,1,2,2,2,1,1,2,2,1],
             [2,2,2,2,2,2,2,2,2,1],
             [1,2,2,2,2,1,1,2,2,1],
             [1,1,1,1,1,1,2,2,2,1],
             [1,2,2,2,2,1,1,2,2,1],
             [1,2,2,2,2,1,1,2,2,1],
             [1,2,2,2,2,1,1,2,2,1],
             [1,2,1,2,2,1,1,2,2,1],
         ];

        var anchoTile = 100;
        var altoTile = 60;
        var counter = 1;
        var counter2 = 1;
        var image;
        var text;
        var textoTurno;
        var textoInfo;
        var textoInfoAtaque;
        var pos;
        var marker;
        var player1;
        var player2;
        var tiledX;
        var tiledY;
        var personajeSeleccionado;
        var personajeAtacado;
        var turno = 0;

        const ANCHOMAPA = 10;
        const ALTOMAPA = 10;


    function preload() {
        //game.load.image('1', 'assets/TileG.png');
        //game.load.image('2', 'assets/TileN.png');
        game.load.image('player1', 'assets/PLayer1.png');
        game.load.image('player1click', 'assets/PLayer1Click.png');
        game.load.image('Spitter', 'assets/Spitter.png');
        game.load.image('SpitterClick', 'assets/SpitterClick.png');
        
        game.load.image('1', 'assets/Cesped.png');
        game.load.image('2', 'assets/roca.png');
        game.load.image('atacar', 'assets/Atacada.png');
        game.load.image('eliminado', 'assets/Eliminado.png');
        game.load.image('button', 'assets/BotonAtras.png');
        
        game.load.image('AlienQueen', 'assets/AlienQueen.png');
        game.load.image('AlienQueenClick', 'assets/AlienQueenClick.png');
        game.load.image('Spitter', 'assets/Spitter.png');
        game.load.image('SpitterClick', 'assets/SpitterClick.png');
        
        game.load.image('King', 'assets/King.png');
        game.load.image('KingClick', 'assets/KingClick.png');
        game.load.image('Tank', 'assets/Tank.png');
        game.load.image('TankClick', 'assets/TankClick.png');
        //game.load.image('prueba', 'assets/Prueba.png');
        
    }
    function Tropa (nombre, sprite, x, y, mov, ataque, vida, rang, id){

        var tropa = game.add.sprite(x, y, sprite);
        var movi = mov;
        var damage = ataque;
        var range = rang;
        var life = vida;
        var nombre = nombre;
        var posx = x;
        var posy = y;
        var numeral = id;
        var hasMoved = false;
        var hasAttacked = false;

        
        // funciones
        this.mover = function (x, y) {
            tropa.x = x;
            tropa.y = y;
        };
        
        this.setSprite = function (sprite) {
            tropa.loadTexture(sprite, 0);
        };
        
        //this.mov = 2;
        this.getX = function () {
            return tropa.x;
        };
        
        this.getY = function () {
            return tropa.y;
        };
        
        this.getPosX = function () {
            return posx;
        };
        
        this.getPosY = function () {
            return posy;
        };
        
        this.getNumeral = function () {
            return numeral;
        };
        
        this.getNombre = function () {
            return nombre;
        };
        
        this.getHasMoved = function () {
            return hasMoved;
        };
        
        this.getHasAttacked = function () {
            return hasAttacked;
        };
        
        this.setHasMoved = function (cambio) {
            hasMoved = cambio;
            if(cambio) cambioEstadoBloqueado($("#Bmover"),false);
        };
        
        this.setHasAttacked = function (cambio) {
            hasAttacked = cambio;
            if(cambio) cambioEstadoBloqueado($("#Batacar"),false);
        };
        
        this.getLife = function () {
            return life;
        };
        
        this.setLife = function (nuevaVida) {
            life -= nuevaVida;
        };
        
        this.getRange = function () {
            return range;
        };
        
        this.getDamage = function () {
            return damage;
        };
        
        this.mov = function () {
            return movi;
        };
        
        this.kill = function () {
            tropa.kill();
        };
        
        this.setOpacity = function (op) {
            tropa.alpha = op;
        };
        
        
    }



    

    function create() {
        /* PINTADO DEL MAPA */
        for (var i=0; i < 10; i++){
            for (var j= 0; j<10 ; j++){
                var x = j * anchoTile;
                var y = i * altoTile;
                var tileType = mapa[i][j];
                tiles[i][j] = game.add.sprite(x, y, tileType);
            }
        }

        //arrayPersonajes[0] = new Tropa ('alien', 'player1', 5*anchoTile, 5*altoTile, 2, 2, 20);
        alien1 = new Tropa ('AlienQueen', 'AlienQueen', 4*anchoTile, 0*altoTile, 6, 200, 150, 1, 2);
        alien2 = new Tropa ('Spitter', 'Spitter', 6*anchoTile, 1*altoTile, 2, 20, 70, 4, 3);
        
        marine1 = new Tropa ('King', 'King', 4*anchoTile, 9*altoTile, 2, 30, 120, 2, 6);
        marine2 = new Tropa ('Tank', 'Tank', 6*anchoTile, 9*altoTile, 1, 25, 180, 1, 7);
        
        jugadores[0][4] = 2;
        jugadores[1][6] = 3;
        
        
        jugadores[9][4] = 6;
        jugadores[9][6] = 7;

        
        textoTurno = game.add.text(280, 30, '', { fill: '#CCEEFF' });
        textoTurno.fontSize = 50;
        textoTurno.stroke = '#000000';
        textoTurno.strokeThickness = 8;
        
        textoInfo = game.add.text(10, 10, '', { fill: '#CCEEFF' });
        textoInfo.fontSize = 20;
        textoInfo.stroke = '#000000';
        textoInfo.strokeThickness = 2;
        
        textoInfoAtaque = game.add.text(10, 10, '', { fill: '#F74B27' });
        textoInfoAtaque.fontSize = 20;
        textoInfoAtaque.stroke = '#000000';
        textoInfoAtaque.strokeThickness = 2;
        
        if (turno % 2 == 0){
            textoTurno.text = "Turno de los Aliens";
            setTimeout(function(){ textoTurno.setText(""); }, 3000);
            alien1.setOpacity(1);
            alien2.setOpacity(1);
            marine1.setOpacity(0.7);
            marine2.setOpacity(0.7);
        }else{
            textoTurno.x = 250;
            textoTurno.text = "Turno de los Space Marines";
            setTimeout(function(){ textoTurno.setText(""); }, 3000);
            alien1.setOpacity(0.7);
            alien2.setOpacity(0.7);
            marine1.setOpacity(1);
            marine2.setOpacity(1);
        }

        game.input.onDown.add(listener, this);

  
    }

   function atacarAliens(pointer){

        if((counter2 != 1) ){
            //Tile a la que quiero atacar
            tiledX = Math.floor(pointer.x/(100));
            tiledY = Math.floor(pointer.y/(60));

            actualTiledX = Math.floor(personajeSeleccionado.getX()/(100));
            actualTiledY = Math.floor(personajeSeleccionado.getY()/(60));

            var posicionX = Math.floor(personajeSeleccionado.getX()/(100));
            var posicionY = Math.floor(personajeSeleccionado.getY()/(60)); 

            for (var i=0; i < 10; i++){
                for (var j= 0; j<10 ; j++){
                    if((Math.abs(i - actualTiledX) + Math.abs(j - actualTiledY) <= personajeSeleccionado.getRange()) && (jugadores[j][i] != 1)  && ((i == tiledX)&(j == tiledY)) && ( (jugadores[j][i] == 6) | (jugadores[j][i] == 7) | (jugadores[j][i] == 8) | (jugadores[j][i] == 9) )){

                    identificador = jugadores[tiledY][tiledX];
                        
                        switch(identificador) {
                            case 6:
                                marine1.setOpacity(1);
                                setTimeout(function(){ marine1.setOpacity(0.5); }, 1000);
                                
                                marine1.setLife(personajeSeleccionado.getDamage());
                                if(marine1.getLife()<=0) {
                                    marine1.setSprite('eliminado');
                                    setTimeout(function(){ marine1.kill(); }, 1000);
                                    
                                    //jugadores[tiledY][tiledX] = 1;
                                    ///////////////GAME OVER
                                    game.world.removeAll();
                                    text = game.add.text(170, 225, '', { fill: '#ffffff' });
                                    text.fontSize = 70;
                                    text.text = "GANAN LOS ALIENS";
                                    
                                    var button = game.add.button(390, 300, 'button', actionOnClick, this, 0, 0, 0);
                                    ponerVisibleButton($("#Bmover"), false);
                                    ponerVisibleButton($("#Batacar"), false);
                                    ponerVisibleButton($("#Besperar"), false);
                                    ponerVisibleButton($("#Bfin"), false);
                                    
                                    jugadores[j][i] = 1;
                                }
                                
                                break;
                            case 7:
                                marine2.setOpacity(1);
                                setTimeout(function(){ marine2.setOpacity(0.5); }, 1000);                                
                                
                                marine2.setLife(personajeSeleccionado.getDamage());
                                if(marine2.getLife()<=0){
                                    marine2.setSprite('eliminado');
                                    setTimeout(function(){ marine2.kill();  }, 1000);
                                    jugadores[j][i] = 1;
                                    
                                } 
                                break;
                            default:
                        }
                        
                        textoInfoAtaque.x = (tiledX * 100);
                        textoInfoAtaque.y = (tiledY * 60)+60;
                        textoInfoAtaque.setText("-"+personajeSeleccionado.getDamage());
                        setTimeout(function(){ textoInfoAtaque.setText(""); }, 1000);
                        
                        personajeSeleccionado.setHasAttacked(true);

                        counter2++;

                        if (!personajeSeleccionado.getHasMoved()) cambioEstadoBloqueado($("#Bmover"),true);
                        cambioEstadoBloqueado($("#Besperar"),true);
                        cambioEstadoBloqueado($("#Bfin"),true);

                        for (var k=0; k < 10; k++){
                            for (var l= 0; l <10 ; l++){
                                if((Math.abs(k - posicionX) + Math.abs(l - posicionY) <= personajeSeleccionado.getRange())){
                                    var tileType = mapa[l][k];
                                    tiles[l][k].loadTexture(tileType, 0);

                                }              
                            }
                        }
                    }else {

                    }              
                }
            }

        }
        
    }

   function atacarMarines(pointer){

        if((counter2 != 1) ){
            //Tile a la que quiero atacar
            tiledX = Math.floor(pointer.x/(100));
            tiledY = Math.floor(pointer.y/(60));

            actualTiledX = Math.floor(personajeSeleccionado.getX()/(100));
            actualTiledY = Math.floor(personajeSeleccionado.getY()/(60));

            var posicionX = Math.floor(personajeSeleccionado.getX()/(100));
            var posicionY = Math.floor(personajeSeleccionado.getY()/(60)); 

            for (var i=0; i < 10; i++){
                for (var j= 0; j<10 ; j++){
                    if((Math.abs(i - actualTiledX) + Math.abs(j - actualTiledY) <= personajeSeleccionado.getRange()) && (jugadores[j][i] != 1)  && ((i == tiledX)&(j == tiledY)) && ( (jugadores[j][i] == 2) | (jugadores[j][i] == 3) | (jugadores[j][i] == 4) | (jugadores[j][i] == 5) )){

                    identificador = jugadores[tiledY][tiledX];
                        
                        switch(identificador) {
                            case 2:
                                alien1.setOpacity(1);
                                setTimeout(function(){ alien1.setOpacity(0.5); }, 1000);
                                
                                alien1.setLife(personajeSeleccionado.getDamage());
                                if(alien1.getLife()<=0) {
                                    alien1.setSprite('eliminado');
                                    setTimeout(function(){ alien1.kill();  }, 1000);
                                    //jugadores[tiledY][tiledX] = 1;
                                    ///////////////GAME OVER
                                    game.world.removeAll();
                                    text = game.add.text(500, 500, '', { fill: '#ffffff' });
                                    text.text = "GANAN LOS MARINES";
                                    

                                    ponerVisibleButton($("#Bmover"), false);
                                    ponerVisibleButton($("#Batacar"), false);
                                    ponerVisibleButton($("#Besperar"), false);
                                    ponerVisibleButton($("#Bfin"), false);
                                    jugadores[j][i] = 1;
                                }
                                
                                break;
                            case 3:
                                alien2.setOpacity(1);
                                setTimeout(function(){ alien2.setOpacity(0.5); }, 1000);                                
                                
                                alien2.setLife(personajeSeleccionado.getDamage());
                                if(alien2.getLife()<=0){
                                    alien2.setSprite('eliminado');
                                    setTimeout(function(){ alien2.kill();  }, 1000);
                                    jugadores[j][i] = 1;
                                    
                                } 
                                break;
                            default:
                        }
                        
                        textoInfoAtaque.x = (tiledX * 100);
                        textoInfoAtaque.y = (tiledY * 60)+60;
                        textoInfoAtaque.setText("-"+personajeSeleccionado.getDamage());
                        setTimeout(function(){ textoInfoAtaque.setText(""); }, 1000);
                        
                        personajeSeleccionado.setHasAttacked(true);

                        counter2++;

                        if (!personajeSeleccionado.getHasMoved()) cambioEstadoBloqueado($("#Bmover"),true);
                        cambioEstadoBloqueado($("#Besperar"),true);
                        cambioEstadoBloqueado($("#Bfin"),true);

                        for (var k=0; k < 10; k++){
                            for (var l= 0; l <10 ; l++){
                                if((Math.abs(k - posicionX) + Math.abs(l - posicionY) <= personajeSeleccionado.getRange())){
                                    var tileType = mapa[l][k];
                                    tiles[l][k].loadTexture(tileType, 0);

                                }              
                            }
                        }
                    }else {

                    }              
                }
            }

        }
        
    }

    function moveSprite(pointer) {
        
        if((counter != 1) && (personajeSeleccionado != null)){
            //Tile a la que me quiero mover
            tiledX = Math.floor(pointer.x/(100));
            tiledY = Math.floor(pointer.y/(60));

            actualTiledX = Math.floor(personajeSeleccionado.getX()/(100));
            actualTiledY = Math.floor(personajeSeleccionado.getY()/(60));

            var posicionX = Math.floor(personajeSeleccionado.getX()/(100));
            var posicionY = Math.floor(personajeSeleccionado.getY()/(60)); 

            for (var i=0; i < 10; i++){
                for (var j= 0; j<10 ; j++){
                    if((Math.abs(i - actualTiledX) + Math.abs(j - actualTiledY) <= personajeSeleccionado.mov()) && (mapa[j][i]!=2) && (jugadores[j][i] == 1) && ((i == tiledX)&(j == tiledY))){
                        personajeSeleccionado.mover(tiledX*100,tiledY*60);
                        jugadores[tiledY][tiledX] = personajeSeleccionado.getNumeral();
                        jugadores[posicionY][posicionX] = 1;
                        personajeSeleccionado.setHasMoved(true);
                        textoInfo.x = (tiledX * 100);
                        textoInfo.y = (tiledY * 60)+60;

                        counter++;
                        //text.destroy();
                        if (!personajeSeleccionado.getHasAttacked()) cambioEstadoBloqueado($("#Batacar"),true);
                        cambioEstadoBloqueado($("#Besperar"),true);
                        cambioEstadoBloqueado($("#Bfin"),true);

                        for (var k=0; k < 10; k++){
                            for (var l= 0; l <10 ; l++){
                                if((Math.abs(k - posicionX) + Math.abs(l - posicionY) <= personajeSeleccionado.mov())){
                                    var tileType = mapa[l][k];
                                    tiles[l][k].loadTexture(tileType, 0);

                                }              
                            }
                        }
                    }else {
                        
                    }              
                }
            }

        }

}

    function listener (pointer) {
        if ((counter != 0) && (counter2 !=0)){
            coordX = Math.floor(pointer.x/(100));
            coordY = Math.floor(pointer.y/(60));

            identificador = jugadores[coordY][coordX];
            
            if(turno % 2 == 0){
                switch(identificador) {
                    case 2:
                        alien2.setSprite('Spitter');
                        marine1.setSprite('King');
                        marine2.setSprite('Tank');
                        personajeSeleccionado = alien1;
                        alien1.setSprite('AlienQueenClick');
                        
                        break;
                    case 3:
                        alien1.setSprite('AlienQueen');
                        marine1.setSprite('King');
                        marine2.setSprite('Tank');
                        personajeSeleccionado = alien2;
                        alien2.setSprite('SpitterClick');
                        
                        break;
                    default:
                        personajeSeleccionado = null;

                }
            } else {
                switch(identificador) {
                    case 6:
                        marine2.setSprite('Tank');
                        alien1.setSprite('AlienQueen');
                        alien2.setSprite('Spitter');
                        personajeSeleccionado = marine1;
                        marine1.setSprite('KingClick');

                        break;
                    case 7:
                        marine1.setSprite('King');
                        alien1.setSprite('AlienQueen');
                        alien2.setSprite('Spitter');
                        personajeSeleccionado = marine2;
                        marine2.setSprite('TankClick');


                        break;

                    default:
                        personajeSeleccionado = null;
                        


                }
            }
        }
        
        if(personajeSeleccionado != null){
            textoInfo.x = (coordX * 100);
            textoInfo.y = (coordY * 60)+60;
            textoInfo.setText( ""+ personajeSeleccionado.getNombre() +" : " + personajeSeleccionado.getLife());
            
            if(!personajeSeleccionado.getHasMoved()){ 
                cambioEstadoBloqueado($("#Bmover"),true); 
                cambioEstadoBloqueado($("#Besperar"),true);
            }
            if(!personajeSeleccionado.getHasAttacked()){
                cambioEstadoBloqueado($("#Batacar"),true); 
                cambioEstadoBloqueado($("#Besperar"),true);
            }
            ponerVisibleButton($("#Bmover"), true);
            ponerVisibleButton($("#Batacar"), true);
            ponerVisibleButton($("#Besperar"), true);
            ponerVisibleButton($("#Bfin"), true);
        }else{
            textoInfo.setText("");
            marine2.setSprite('Tank');
            alien1.setSprite('AlienQueen');
            alien2.setSprite('Spitter');
            marine1.setSprite('King');
            ponerVisibleButton($("#Bmover"), false);
            ponerVisibleButton($("#Batacar"), false);
            ponerVisibleButton($("#Besperar"), false);
        }



    }

    function actionOnClick () {

        ponerVisible($("#menu"), true);
        ponerVisible($("#menuJugar"), false);

    }

    function update() {
        
        game.debug.inputInfo(32, 32);
        //pos = game.input.activePointer.position;
        //updateMarker();
        //var movimiento = arrayPersonajes[0].getX();
        //game.debug.text("PlayerX:" + player1.x + " PlayerY:" + player1.y + "TileX:" + tiledX + " TileY:" + tiledY + " P: ", 180, 200);
        //game.debug.text("Turno:" + turno, 180, 200);
        
        /*if (game.input.activePointer.isDown)
        {
            listener(this);
        }*/


    }


// función que permite poner visible o no una sección div, asi conseguimos que
// la tabla se oculte cuando inciamos partida
function ponerVisible(div, visible) {
	let
	estado = visible ? "block" : "none"; // block para que se vea, o none
											// para que no se vea
	div.css({
		"display" : estado
	});
}

// Lo mismo pero para los botones
function ponerVisibleButton(button, visible) {
	let
	estado = visible ? "inline" : "none"; 
											
	button.css({
		"display" : estado
	});
}


// función que cambia de estado a bloqueado y viceversa (uso de botones)
function cambioEstadoBloqueado(boton, nuevoEstado){
	if(nuevoEstado){// true para activarlo
		boton.css({"opacity":1}); // opacity 1 visible
		boton.prop("disabled", false);
	}else{
		boton.css({"opacity":0.5}); // opacity 0,5 no puede usarse
		boton.prop("disabled", true);
		}
}

// funcion que se invoca al cargar la pagina
$(function() {
	
	//cambioEstadoBloqueado($("#Bstart"),false);//////////////////////////////////////////////////////////// REVISAR
    
    $("#Bjugar").click(
			function() {
                    ponerVisible($("#menu"), false);
                    ponerVisible($("#menuJugar"), true);
                
				})
                
	
    
    $("#Binstrucciones").click(
			function() {
                    ponerVisible($("#menu"), false);
                    ponerVisible($("#menuInstrucciones"), true);
				})
                
	
    
    $("#Branking").click(
			function() {
                    ponerVisible($("#menu"), false);
                    ponerVisible($("#menuRanking"), true);
				})
    
    $("#Bpersonajes").click(
			function() {
                    ponerVisible($("#menu"), false);
                    ponerVisible($("#menuPersonajes"), true);
				})
    $("#BatrasIns").click(
			function() {
                    ponerVisible($("#menu"), true);
                    ponerVisible($("#menuInstrucciones"), false);
				})
    $("#BatrasRan").click(
			function() {
                    ponerVisible($("#menu"), true);
                    ponerVisible($("#menuRanking"), false);
				})
    $("#BatrasPer").click(
			function() {
                    ponerVisible($("#menu"), true);
                    ponerVisible($("#menuPersonajes"), false);
				})
    $("#Bmover").click(
			function() {
                    counter = 0;
                    game.input.onDown.add(moveSprite, this);
                    
                    var movido = personajeSeleccionado.getHasMoved();
                
                    if((personajeSeleccionado != null)  && ( movido == false) ){
                        //colorea de azul las tiles a las que puedo moverme
                        var posicionX = Math.floor(personajeSeleccionado.getX()/(100));
                        var posicionY = Math.floor(personajeSeleccionado.getY()/(60));

                        var mov = personajeSeleccionado.mov();
                        for (var k=0; k < 10; k++){
                            for (var l= 0; l <10 ; l++){
                                if(( (Math.abs(k - posicionX) + Math.abs(l - posicionY)) <= mov ) && (mapa[l][k]!=2) && (jugadores[l][k] == 1)){

                                    tiles[l][k].loadTexture('player1', 0);

                                }              
                            }
                        }
                    }
                    
                    
                    cambioEstadoBloqueado($("#Bmover"),false);
                    cambioEstadoBloqueado($("#Batacar"),false);
                    cambioEstadoBloqueado($("#Besperar"),false);
                    cambioEstadoBloqueado($("#Bfin"),false);
				})
    
    $("#Batacar").click(
			function() {
                    counter2 = 0;
                    if(turno % 2 == 0){
                        game.input.onDown.add(atacarAliens, this);
                    }else{
                        game.input.onDown.add(atacarMarines, this);                        
                    }

                    
                    var atacado = personajeSeleccionado.getHasAttacked();
                    if((personajeSeleccionado != null)  && ( atacado == false) ){
                        //colorea de azul las tiles a las que puedo moverme
                        var posicionX = Math.floor(personajeSeleccionado.getX()/(100));
                        var posicionY = Math.floor(personajeSeleccionado.getY()/(60));

                        var rang = personajeSeleccionado.getRange();
                        for (var k=0; k < 10; k++){
                            for (var l= 0; l <10 ; l++){
                                if(( (Math.abs(k - posicionX) + Math.abs(l - posicionY)) <= rang ) && (mapa[l][k]!=2) ){

                                    tiles[l][k].loadTexture('atacar', 0);

                                }              
                            }
                        }
                    }
                    
                    
                    cambioEstadoBloqueado($("#Bmover"),false);
                    cambioEstadoBloqueado($("#Batacar"),false);
                    cambioEstadoBloqueado($("#Besperar"),false);
                    cambioEstadoBloqueado($("#Bfin"),false);
				})
    
    $("#Besperar").click(
			function() {
                    personajeSeleccionado.setHasMoved(true);
                    personajeSeleccionado.setHasAttacked(true);
                    cambioEstadoBloqueado($("#Besperar"),false);
                    textoInfo.setText("");
                    //counter2 = 0;
                    //counter = 0;
                    for (var k=0; k < 10; k++){
                         for (var l= 0; l <10 ; l++){
                            var tileType = mapa[l][k];
                            tiles[l][k].loadTexture(tileType, 0);              
                        }
                    }
				})
    
    $("#Bfin").click(
			function() {
                    //counter2 = 0;
                    //counter = 0;
                
                    if(turno % 2 == 0){
                        alien1.setHasMoved(false);
                        alien2.setHasMoved(false);
                        alien1.setHasAttacked(false);
                        alien2.setHasAttacked(false);
                    } else {
                        marine1.setHasMoved(false);
                        marine2.setHasMoved(false);
                        marine1.setHasAttacked(false);
                        marine2.setHasAttacked(false);
                    }
                    turno++;
                    alien2.setSprite('Spitter');
                    marine1.setSprite('King');
                    marine2.setSprite('Tank');
                    alien1.setSprite('AlienQueen');
                
                    cambioEstadoBloqueado($("#Batacar"),true);
                    cambioEstadoBloqueado($("#Bmover"),true);
                    cambioEstadoBloqueado($("#Besperar"),true);
                    
                    ponerVisibleButton($("#Bmover"), false);
                    ponerVisibleButton($("#Batacar"), false);
                    ponerVisibleButton($("#Besperar"), false);
                    
                    textoInfo.setText("");
                
                    if (turno % 2 == 0){
                        textoTurno.x = 280;
                        textoTurno.text = "Turno de los Aliens";
                        setTimeout(function(){ textoTurno.setText(""); }, 3000);
                        alien1.setOpacity(1);
                        alien2.setOpacity(1);
                        marine1.setOpacity(0.7);
                        marine2.setOpacity(0.7);

                    }else{
                        textoTurno.x = 230;
                        textoTurno.text = "Turno de los Space Marines";
                        setTimeout(function(){ textoTurno.setText(""); }, 3000);
                        alien1.setOpacity(0.7);
                        alien2.setOpacity(0.7);
                        marine1.setOpacity(1);
                        marine2.setOpacity(1);
                    }
				})
    
})

                
