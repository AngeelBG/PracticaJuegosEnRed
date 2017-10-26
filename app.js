
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
             [1,1,1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1,1,1],
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
        var counter = 0;
        var image;
        var text;
        var pos;
        var marker;
        var player1;
        var player2;
        var tiledX;
        var tiledY;

        const ANCHOMAPA = 10;
        const ALTOMAPA = 10;


    function preload() {
        game.load.image('1', 'assets/TileG.png');
        game.load.image('2', 'assets/TileN.png');
        game.load.image('player1', 'assets/PLayer1.png');
        game.load.image('player1click', 'assets/PLayer1Click.png');
        game.load.image('Spitter', 'assets/Spitter.png');
        game.load.image('SpitterClick', 'assets/SpitterClick.png');
        //game.load.image('prueba', 'assets/Prueba.png');
        
    }
    function Tropa (id, sprite, x, y, mov, ataque, vida){
        //var id = id;
        //var mov = mov;
        var tropa = game.add.sprite(x, y, sprite);
        tropa.ataque = 2;
        var movi = 2;
        //var ataque = ataque;
        //var vida = vida;
        
        // funciones
        this.mover = function (x, y) {
            tropa.x = x;
            tropa.y = y;
        };
        
        //this.mov = 2;
        this.getX = function () {
            return x;
        };
        
        this.getY = function () {
            return y;
        };
        
        this.mov = function () {
            return movi;
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

        jugadores[2][5] = 2;
        jugadores[4][5] = 2;

        player1 =  game.add.sprite(2*anchoTile, 5*altoTile, 'player1');
        //player2 =  game.add.sprite(4*anchoTile, 5*altoTile, 'player1');
        
        //arrayPersonajes = new Array(6);
        //arrayPersonajes[0] = new Tropa ('alien', 'player1', 5*anchoTile, 5*altoTile, 2, 2, 20);
        
        player2 = new Tropa ('alien', 'player1', 5*anchoTile, 5*altoTile, 2, 2, 20);
        
        //player2.setSprite('player1');

        

        //  Enables all kind of input actions on this image (click, etc)
        player1.inputEnabled = true;
        player2.inputEnabled = true;


        player1.events.onInputDown.add(listener, this); //// NO FUNCIONA CON UN OBJETO (se puede poner un sprite constantemente encima?)

        
        //text = game.add.text(500, 500, '', { fill: '#ffffff' });
        //text.text = "x:" + pointer.x + " y:" + pointer.y;
  
    }

    /*function atacar(pointer, player){
        
        var distancia = player.rango;
        var daño = player.daño;
        
        var posicionX = Math.floor(player2.getX/(100));
        var posicionY = Math.floor(player2.getY/(60));
        
        var ratonX = Math.floor(pointer.x/(100));
        var ratonY = Math.floor(pointer.y/(60));
        
        /////////// copiar y pegar codigo de volver a pintar tiles antiguos
        
        if(( (Math.abs(ratonX - posicionX) + Math.abs(ratonY - posicionY)) <= distancia ) && (jugadores[ratonX][ratonY] == 2)){
            
            player.setVida(daño);
            //bloquear boton atacar y contador
        }
        
    }*/

    function moveSprite(pointer, player) {
        
        if(counter != 5){
            //Tile a la que me quiero mover
            tiledX = Math.floor(pointer.x/(100));
            tiledY = Math.floor(pointer.y/(60));

            actualTiledX = Math.floor(player.x/(100));
            actualTiledY = Math.floor(player.y/(60));

            var posicionX = Math.floor(player.x/(100));
            var posicionY = Math.floor(player.y/(60)); 

            for (var i=0; i < 10; i++){
                for (var j= 0; j<10 ; j++){
                    if((Math.abs(i - actualTiledX) + Math.abs(j - actualTiledY) <= player.mov) && (mapa[i][j]!=2) && ((i == tiledX)&(j == tiledY))){
                        player.mover(tiledX*100,tiledY*60);

                        counter++;
                        //text.destroy();
                        cambioEstadoBloqueado($("#Batacar"),true);

                        for (var k=0; k < 10; k++){
                            for (var l= 0; l <10 ; l++){
                                if((Math.abs(k - posicionX) + Math.abs(l - posicionY) <= player.mov)){

                                    tiles[k][l].loadTexture(tileType, 0);

                                }              
                            }
                        }
                    }else {
                    /* NO SE CONSIGUE BORRAR EL TEXTO UNA VEZ PUESTO */
                    text = game.add.text(500, 500, '', { fill: '#ffffff' });
                    text.text = "Selecciona una casilla válida"; 

                    }              
                }
            }

        }

    }

    function listener () {
        
        player1.loadTexture('player1click', 0);
        ponerVisibleButton($("#Bmover"), true);
        ponerVisibleButton($("#Batacar"), true);

    }

    function update() {
        
        game.debug.inputInfo(32, 32);
        pos = game.input.activePointer.position;
        //updateMarker();
        //var movimiento = arrayPersonajes[0].getX();
        game.debug.text("PlayerX:" + player1.x + " PlayerY:" + player1.y + "TileX:" + tiledX + " TileY:" + tiledY + " P: ", 180, 200);

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
	
	cambioEstadoBloqueado($("#Bstart"),false);
    
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
                    game.input.onDown.add(moveSprite, this, player2);
                    
                    //colorea de azul las tiles a las que puedo moverme
                    var posicionX = Math.floor(player2.getX()/(100));
                    var posicionY = Math.floor(player2.getY()/(60));

                    var mov = player2.mov();
                    for (var k=0; k < 10; k++){
                        for (var l= 0; l <10 ; l++){
                            if(( (Math.abs(k - posicionX) + Math.abs(l - posicionY)) <= mov )){

                                tiles[k][l].loadTexture('player1', 0);

                            }              
                        }
                    }
                    
                    
                    //cambioEstadoBloqueado($("#Bmover"),false);
                    cambioEstadoBloqueado($("#Batacar"),false);
				})
    
})
                

