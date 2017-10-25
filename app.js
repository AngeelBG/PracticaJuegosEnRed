

 var game = new Phaser.Game(1000, 600, Phaser.AUTO, 'menuJugar', { preload: preload, create: create, update: update });
   

        var mapa = [
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

        var anchoTile = 100;
        var altoTile = 60;
        var counter = 0;
        var image;
        var text;
        var pos;
        var marker;
        var player1;
        var tiledX;
        var tiledY;

        //var result = 'Drag a sprite';

    function preload() {
        game.load.image('1', 'assets/TileG.png');
        game.load.image('2', 'assets/TileN.png');
        game.load.image('player1', 'assets/PLayer1.png');
        game.load.image('Spitter', 'assets/Spitter.png');
        game.load.image('SpitterClick', 'assets/SpitterClick.png');
        //pos=game.input.activePointer.position;
        
    }

    function create() {
        /* PINTADO DEL MAPA */
        for (var i=0; i < 10; i++){
            for (var j= 0; j<10 ; j++){
                var x = j * anchoTile;
                var y = i * altoTile;
                var tileType = mapa[i][j];
                game.add.sprite(x, y, tileType);
            }
        }
       
        jugadores[2][5] = 2;
        
        //  This creates a simple sprite that is using our loaded image and
        //  displays it on-screen and assign it to a variable
        player1 =  game.add.sprite(2*anchoTile, 5*altoTile, 'player1');

        

        //  Enables all kind of input actions on this image (click, etc)
        player1.inputEnabled = true;

        text = game.add.text(250, 16, '', { fill: '#ffffff' });

        player1.events.onInputDown.add(listener, this);

  
    }

    function moveSprite(pointer) {

        tiledX = Math.floor(pointer.x/(100));
        tiledY = Math.floor(pointer.y/(60));
        
        if(tiledX >4){
            
        }else {
            player1.x = tiledX*100;
            player1.y = tiledY*60;
            counter++;
        }
        


        

    }


    function listener () {
        
        player1.loadTexture('SpitterClick', 0);
        ponerVisibleButton($("#Bmover"), true);
        ponerVisibleButton($("#Batacar"), true);
        //counter++;
        text.text = "You clicked " + counter + " times!";

    }

    function update() {
        
        game.debug.inputInfo(32, 32);
        pos = game.input.activePointer.position;

        game.debug.text("PlayerX:" + player1.x + " PlayerY:" + player1.y + "TileX:" + tiledX + " TileY:" + tiledY, 180, 200);
        

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
    $("#Bmover").click(
			function() {
                    game.input.onDown.add(moveSprite, this);
                    if(counter == 1){
                        player1.inputEnabled = false;
                    }
				})
    
})