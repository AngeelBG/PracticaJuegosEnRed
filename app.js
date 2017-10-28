 var game = new Phaser.Game(1000, 600, Phaser.AUTO, 'zonaJuego', { preload: preload, create: create, update: update });
   

        var mapa = [
             [1,1,1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1,1,1],
             [1,1,1,2,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1,1,1],
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
        var image;
        var text;
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
        //var id = id;
        //var mov = mov;
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
        
        //var ataque = ataque;
        //var vida = vida;
        
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
        
        
        /*this.setSprite = function(sprite){
            this.sprite = game.add.sprite(this.x, this.y, sprite);
        }*/
        
        
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



        //player1 =  game.add.sprite(2*anchoTile, 5*altoTile, 'player1');
        //player2 =  game.add.sprite(4*anchoTile, 5*altoTile, 'player1');
        
        //arrayPersonajes = new Array(6);
        //arrayPersonajes[0] = new Tropa ('alien', 'player1', 5*anchoTile, 5*altoTile, 2, 2, 20);
        alien1 = new Tropa ('AlienQueen', 'AlienQueen', 4*anchoTile, 0*altoTile, 6, 200, 150, 1, 2);
        alien2 = new Tropa ('Spitter', 'Spitter', 6*anchoTile, 1*altoTile, 2, 20, 70, 4, 3);
        
        marine1 = new Tropa ('King', 'King', 4*anchoTile, 9*altoTile, 2, 30, 120, 2, 6);
        marine2 = new Tropa ('Tank', 'Tank', 6*anchoTile, 9*altoTile, 1, 25, 180, 1, 7);
        
        jugadores[0][4] = 2;
        jugadores[1][6] = 3;
        
        
        jugadores[9][4] = 6;
        jugadores[9][6] = 7;
        //jugadores[4][2] = 2;
        //jugadores[6][3] = 3;
        //player2.setSprite('player1');

        

        //  Enables all kind of input actions on this image (click, etc)
        //player1.inputEnabled = true;
        //player2.inputEnabled = true;

        game.input.onDown.add(listener, this);
        //player2.events.onInputDown.add(listener, this); //// NO FUNCIONA CON UN OBJETO (se puede poner un sprite constantemente encima?)

        
        //text = game.add.text(500, 500, '', { fill: '#ffffff' });
        //text.text = "x:" + pointer.x + " y:" + pointer.y;
  
    }

   function atacar(pointer){
        
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
                    if((Math.abs(i - actualTiledX) + Math.abs(j - actualTiledY) <= personajeSeleccionado.getRange()) && (jugadores[j][i] != 1)  && ((i == tiledX)&(j == tiledY)) && ( (jugadores[j][i] == 6) | (jugadores[j][i] == 7) | (jugadores[j][i] == 8) | (jugadores[j][i] == 9) )){

                    identificador = jugadores[tiledY][tiledX];
                        
                        switch(identificador) {
                            case 6:
                                marine1.setLife(personajeSeleccionado.getDamage());
                                if(marine1.getLife()<=0) {
                                    marine1.kill();
                                    jugadores[tiledY][tiledX] = 1;
                                    ///////////////GAME OVER
                                    game.world.removeAll();
                                    text = game.add.text(500, 500, '', { fill: '#ffffff' });
                                    text.text = "GANAN LOS ALIENS";
                                }
                                
                                break;
                            case 7:
                                marine2.setLife(personajeSeleccionado.getDamage());
                                if(marine2.getLife()<=0) marine2.kill();
                                break;
                            default:
                        }
                        
                        personajeSeleccionado.setHasAttacked(true);

                        counter++;
                        //text.destroy();
                        cambioEstadoBloqueado($("#Batacar"),false);

                        for (var k=0; k < 10; k++){
                            for (var l= 0; l <10 ; l++){
                                if((Math.abs(k - posicionX) + Math.abs(l - posicionY) <= personajeSeleccionado.getRange())){
                                    var tileType = mapa[l][k];
                                    tiles[l][k].loadTexture(tileType, 0);

                                }              
                            }
                        }
                    }else {
                    /* NO SE CONSIGUE BORRAR EL TEXTO UNA VEZ PUESTO */
                    //text = game.add.text(500, 500, '', { fill: '#ffffff' });
                    //text.text = "Selecciona una casilla válida"; 

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

                        counter++;
                        //text.destroy();
                        cambioEstadoBloqueado($("#Batacar"),true);
                        cambioEstadoBloqueado($("#Bmover"),false);

                        for (var k=0; k < 10; k++){
                            for (var l= 0; l <10 ; l++){
                                if((Math.abs(k - posicionX) + Math.abs(l - posicionY) <= personajeSeleccionado.mov())){
                                    var tileType = mapa[l][k];
                                    tiles[l][k].loadTexture(tileType, 0);

                                }              
                            }
                        }
                    }else {
                    /* NO SE CONSIGUE BORRAR EL TEXTO UNA VEZ PUESTO */
                    //text = game.add.text(500, 500, '', { fill: '#ffffff' });
                    //text.text = "Selecciona una casilla válida"; 

                    }              
                }
            }

        }

    }

    function listener (pointer) {
        if (counter != 0){
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
                        if(!personajeSeleccionado.getHasMoved()){ cambioEstadoBloqueado($("#Bmover"),true); cambioEstadoBloqueado($("#Besperar"),true);}
                        if(!personajeSeleccionado.getHasAttacked()){ cambioEstadoBloqueado($("#Batacar"),true); cambioEstadoBloqueado($("#Besperar"),true);}
                        break;
                    case 3:
                        alien1.setSprite('AlienQueen');
                        marine1.setSprite('King');
                        marine2.setSprite('Tank');
                        personajeSeleccionado = alien2;
                        alien2.setSprite('SpitterClick');
                        if(!personajeSeleccionado.getHasMoved()){ cambioEstadoBloqueado($("#Bmover"),true); cambioEstadoBloqueado($("#Besperar"),true);}
                        if(!personajeSeleccionado.getHasAttacked()){ cambioEstadoBloqueado($("#Batacar"),true); cambioEstadoBloqueado($("#Besperar"),true);}
                        break;
                    default:

                }
            } else {
                switch(identificador) {
                    case 6:
                        marine2.setSprite('Tank');
                        alien1.setSprite('AlienQueen');
                        alien2.setSprite('Spitter');
                        personajeSeleccionado = marine1;
                        marine1.setSprite('KingClick');
                        if(!personajeSeleccionado.getHasMoved()){ cambioEstadoBloqueado($("#Bmover"),true); cambioEstadoBloqueado($("#Besperar"),true);}
                        if(!personajeSeleccionado.getHasAttacked()){ cambioEstadoBloqueado($("#Batacar"),true); cambioEstadoBloqueado($("#Besperar"),true);}
                        break;
                    case 7:
                        marine1.setSprite('King');
                        alien1.setSprite('AlienQueen');
                        alien2.setSprite('Spitter');
                        personajeSeleccionado = marine2;
                        marine2.setSprite('TankClick');
                        if(!personajeSeleccionado.getHasMoved()){ cambioEstadoBloqueado($("#Bmover"),true); cambioEstadoBloqueado($("#Besperar"),true);}
                        if(!personajeSeleccionado.getHasAttacked()){ cambioEstadoBloqueado($("#Batacar"),true); cambioEstadoBloqueado($("#Besperar"),true);}
                        break;

                    default:

                }
            }
        }


        ponerVisibleButton($("#Bmover"), true);
        ponerVisibleButton($("#Batacar"), true);
        ponerVisibleButton($("#Besperar"), true);
        ponerVisibleButton($("#Bfin"), true);

    }

    function update() {
        
        game.debug.inputInfo(32, 32);
        pos = game.input.activePointer.position;
        //updateMarker();
        //var movimiento = arrayPersonajes[0].getX();
        //game.debug.text("PlayerX:" + player1.x + " PlayerY:" + player1.y + "TileX:" + tiledX + " TileY:" + tiledY + " P: ", 180, 200);
        game.debug.text("Turno:" + turno, 180, 200);
        
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
	
	cambioEstadoBloqueado($("#Bstart"),false);//////////////////////////////////////////////////////////// REVISAR
    
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
                    
                    
                    //cambioEstadoBloqueado($("#Bmover"),false);
                    cambioEstadoBloqueado($("#Batacar"),false);
				})
    
    $("#Batacar").click(
			function() {
                    counter = 0;
                    game.input.onDown.add(atacar, this);
                    
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
                    
                    
                    //cambioEstadoBloqueado($("#Bmover"),false);
                    cambioEstadoBloqueado($("#Batacar"),false);
				})
    
    $("#Besperar").click(
			function() {
                    personajeSeleccionado.setHasMoved(true);
                    personajeSeleccionado.setHasAttacked(true);
                    cambioEstadoBloqueado($("#Besperar"),false);
				})
    
    $("#Bfin").click(
			function() {
                    
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
				})
    
})
                
