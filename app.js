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
        var tiledX;
        var tiledY;
        var personajeSeleccionado;
        var personajeAtacado;
        var turno;
        var usuarios = [];
        var ranking = [];

        const ANCHOMAPA = 10;
        const ALTOMAPA = 10;


    function preload() {

        game.load.image('player1', 'assets/PLayer1.png');
        game.load.image('1', 'assets/Cesped.png');
        game.load.image('2', 'assets/roca.png');
        game.load.image('atacar', 'assets/Atacada.png');
        game.load.image('eliminado', 'assets/Eliminado.png');
        game.load.image('button', 'assets/BotonAtras.png');
        
        game.load.image('AlienQueen', 'assets/AlienQueen.png');
        game.load.image('AlienQueenClick', 'assets/AlienQueenClick.png');
        game.load.image('Spitter', 'assets/Spitter.png');
        game.load.image('SpitterClick', 'assets/SpitterClick.png');
        game.load.image('Claws', 'assets/Claws.png');
        game.load.image('ClawsClick', 'assets/ClawsClick.png');
        game.load.image('Charger', 'assets/Charger.png');
        game.load.image('ChargerClick', 'assets/ChargerClick.png');
        
        game.load.image('King', 'assets/King.png');
        game.load.image('KingClick', 'assets/KingClick.png');
        game.load.image('Tank', 'assets/Tank.png');
        game.load.image('TankClick', 'assets/TankClick.png');
        game.load.image('Marine', 'assets/Marine.png');
        game.load.image('MarineClick', 'assets/MarineClick.png');
        game.load.image('Ranger', 'assets/Ranger.png');
        game.load.image('RangerClick', 'assets/RangerClick.png');
        
    }

    function Usuario (id, puntos){
        var id = id;
        var puntos = puntos;
        
        this.getId = function () {
            return id;
        };
        
        this.getPuntos = function () {
            return puntos;
        };
        
        this.setPuntos = function (nuevosPuntos) {
            puntos = nuevosPuntos;
        };
  
    }
    
    //compruebo si el nombre del usuario está libre
    function usuarioValido(nuevoNombre){
        for (var i=0; i < usuarios.length; i++){
            if (usuarios[i].getId() == nuevoNombre) return false;
        }
        return true;
    }
    
    //compruebo si el usuario ganador está entre los mejores
    function usuarioGanador(usuario){
        for (var i=0; i < usuarios.length; i++){
            if (usuarios[i].getPuntos() <= usuario.getPuntos()) ranking.push(usuario);
        }
    }

    //ordena el array por el metodo de la burbuja
    function ordenarRanking(ranking){
		for(var i=1;i<ranking.length;i++){
			for(var j=0;j<(ranking.length-i);j++){
				if(ranking[j].getPuntos() >ranking[j+1].getPuntos()){
					var aux = ranking[j+1];
					ranking[j+1] = ranking[j];
					ranking[j] = aux;
				}
			}
		}
		return ranking;
	}

    //carga la clasificacion
    function cargarClasificacion(arrayRanking) {
        $("#Ranking")
                .html(
                    '<thead><th style ="width:60%">Jugador</th><th>Puntos</th></tr></thead>');
        for (var i = 0; i < ranking.length; i++) {
            $("#Ranking").append(
                    "</td> <td>" + arrayRanking[i].getId() + "</td> <td>" + arrayRanking[i].getPuntos() + "</tr></td></tbody>");
        }
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
        alien1 = new Tropa ('Alien Queen', 'AlienQueen', 4*anchoTile, 0*altoTile, 2, 40, 150, 1, 2);
        alien2 = new Tropa ('Spitter', 'Spitter', 6*anchoTile, 1*altoTile, 2, 20, 70, 4, 3);
        alien3 = new Tropa ('Claws', 'Claws', 4*anchoTile, 2*altoTile, 3, 30, 80, 1, 4);
        alien4 = new Tropa ('Charger', 'Charger', 2*anchoTile, 1*altoTile, 1, 20, 200, 1, 5);
        
        marine1 = new Tropa ('King', 'King', 4*anchoTile, 9*altoTile, 2, 30, 120, 2, 6);
        marine2 = new Tropa ('Tank', 'Tank', 6*anchoTile, 8*altoTile, 1, 25, 180, 1, 7);
        marine3 = new Tropa ('Marine', 'Marine', 4*anchoTile, 7*altoTile, 3, 25, 100, 1, 8);
        marine4 = new Tropa ('Ranger', 'Ranger', 2*anchoTile, 8*altoTile, 1, 20, 80, 3, 9);
        
        jugadores[0][4] = 2;
        jugadores[1][6] = 3;
        jugadores[2][4] = 4;
        jugadores[1][2] = 5;
        
        
        jugadores[9][4] = 6;
        jugadores[8][6] = 7;
        jugadores[7][4] = 8;
        jugadores[8][2] = 9;

        
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
        
        /*if (turno % 2 == 0){
            textoTurno.text = "Turno de los Aliens";
            setTimeout(function(){ textoTurno.setText(""); }, 3000);
            alien1.setOpacity(1);
            alien2.setOpacity(1);
            alien3.setOpacity(1);
            alien4.setOpacity(1);
            marine1.setOpacity(0.7);
            marine2.setOpacity(0.7);
            marine3.setOpacity(0.7);
            marine4.setOpacity(0.7);
        }else{
            textoTurno.x = 250;
            textoTurno.text = "Turno de los Space Marines";
            setTimeout(function(){ textoTurno.setText(""); }, 3000);
            alien1.setOpacity(0.7);
            alien2.setOpacity(0.7);
            alien3.setOpacity(0.7);
            alien4.setOpacity(0.7);
            marine1.setOpacity(1);
            marine2.setOpacity(1);
            marine3.setOpacity(1);
            marine4.setOpacity(1);
        }*/

        game.input.onDown.add(listener, this);

  
    }

    //Funcion para cuando toca el turno de los aliens
   function atacarAliens(pointer){

        if((counter2 != 1) ){
            //Tile a la que quiero atacar
            tiledX = Math.floor(pointer.x/(100));
            tiledY = Math.floor(pointer.y/(60));
            
            //Tile en la que se encuentra el personaje
            actualTiledX = Math.floor(personajeSeleccionado.getX()/(100));
            actualTiledY = Math.floor(personajeSeleccionado.getY()/(60));

            var posicionX = Math.floor(personajeSeleccionado.getX()/(100));
            var posicionY = Math.floor(personajeSeleccionado.getY()/(60)); 

            for (var i=0; i < 10; i++){
                for (var j= 0; j<10 ; j++){
                    //Compruebo las casillas a las que puedo atacar, y si hay un personaje enemigo en ella.
                    if((Math.abs(i - actualTiledX) + Math.abs(j - actualTiledY) <= personajeSeleccionado.getRange()) /*&& (jugadores[j][i] != 1)*/ && ((i == tiledX)&(j == tiledY)) && ( (jugadores[j][i] == 1) | (jugadores[j][i] == 6) | (jugadores[j][i] == 7) | (jugadores[j][i] == 8) | (jugadores[j][i] == 9) )){

                    identificador = jugadores[tiledY][tiledX];//identifico el personaje al que quiero atacar
                        
                        switch(identificador) {
                            case 6:
                                marine1.setOpacity(1);
                                setTimeout(function(){ marine1.setOpacity(0.5); }, 1000);
                                
                                marine1.setLife(personajeSeleccionado.getDamage());
                                if(marine1.getLife()<=0) {
                                    marine1.setSprite('eliminado');
                                    setTimeout(function(){ marine1.kill(); }, 1000);
                                    
                                    ///////////////GAME OVER
                                    game.world.removeAll();
                                    text = game.add.text(170, 225, '', { fill: '#ffffff' });
                                    text.fontSize = 70;
                                    text.text = "GANAN LOS ALIENS";
                                    
                                    var textUser = game.add.text(200, 400, '', { fill: '#ffffff' });
                                    textUser.fontSize = 30;
                                    newUser.setPuntos(1);
                                    textUser.text = "Usuario: "+ newUser.getId() +" +1p. Total: "+ newUser.getPuntos();
                                    
                                    usuarioGanador(newUser);
                                    ordenarRanking(ranking);
                                    cargarClasificacion(ranking);
                                    ponerVisible($("#imagenRanking"), false);
                                    
                                    var button = game.add.button(390, 300, 'button', actionOnClick, this, 0, 0, 0);
                                    ponerVisibleButton($("#Bmover"), false);
                                    ponerVisibleButton($("#Batacar"), false);
                                    ponerVisibleButton($("#Besperar"), false);
                                    ponerVisibleButton($("#Bfin"), false);
                                    ponerVisibleButton($("#Brendirse"), false);
                                    
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
                            case 8:
                                marine3.setOpacity(1);
                                setTimeout(function(){ marine3.setOpacity(0.5); }, 1000);                                
                                
                                marine3.setLife(personajeSeleccionado.getDamage());
                                if(marine3.getLife()<=0){
                                    marine3.setSprite('eliminado');
                                    setTimeout(function(){ marine3.kill();  }, 1000);
                                    jugadores[j][i] = 1;
                                    
                                } 
                                break;
                                
                            case 9:
                                marine4.setOpacity(1);
                                setTimeout(function(){ marine4.setOpacity(0.5); }, 1000);                                
                                
                                marine4.setLife(personajeSeleccionado.getDamage());
                                if(marine4.getLife()<=0){
                                    marine4.setSprite('eliminado');
                                    setTimeout(function(){ marine4.kill();  }, 1000);
                                    jugadores[j][i] = 1;
                                    
                                } 
                                break;
                            default:
                        }
                        
                        //Muestro feedback del ataque
                        textoInfoAtaque.x = (tiledX * 100);
                        textoInfoAtaque.y = (tiledY * 60)+60;
                        textoInfoAtaque.setText("-"+personajeSeleccionado.getDamage());
                        setTimeout(function(){ textoInfoAtaque.setText(""); }, 1000);
                        
                        personajeSeleccionado.setHasAttacked(true);

                        counter2++;

                        if (!personajeSeleccionado.getHasMoved()) cambioEstadoBloqueado($("#Bmover"),true);
                        cambioEstadoBloqueado($("#Besperar"),true);
                        cambioEstadoBloqueado($("#Bfin"),true);
                        
                        //Vuelvo las tiles del color original
                        for (var k=0; k < 10; k++){
                            for (var l= 0; l <10 ; l++){
                                if((Math.abs(k - posicionX) + Math.abs(l - posicionY) <= personajeSeleccionado.getRange())){
                                    var tileType = mapa[l][k]; //localizo la tile original
                                    tiles[l][k].loadTexture(tileType, 0);// la pinto

                                }              
                            }
                        }
                    }else {

                    }              
                }
            }

        }
        
    }
    
    ///Misma funcion que la anterior, pero para cuando atacan los Marines
   function atacarMarines(pointer){

        if((counter2 != 1) ){

            tiledX = Math.floor(pointer.x/(100));
            tiledY = Math.floor(pointer.y/(60));
            

            actualTiledX = Math.floor(personajeSeleccionado.getX()/(100));
            actualTiledY = Math.floor(personajeSeleccionado.getY()/(60));

            var posicionX = Math.floor(personajeSeleccionado.getX()/(100));
            var posicionY = Math.floor(personajeSeleccionado.getY()/(60)); 

            for (var i=0; i < 10; i++){
                for (var j= 0; j<10 ; j++){
                    if((Math.abs(i - actualTiledX) + Math.abs(j - actualTiledY) <= personajeSeleccionado.getRange()) /*&& (jugadores[j][i] != 1) */ && ((i == tiledX)&(j == tiledY)) && ( (jugadores[j][i] == 1) | (jugadores[j][i] == 2) | (jugadores[j][i] == 3) | (jugadores[j][i] == 4) | (jugadores[j][i] == 5) )){

                    identificador = jugadores[tiledY][tiledX];
                        
                        switch(identificador) {
                            case 2:
                                alien1.setOpacity(1);
                                setTimeout(function(){ alien1.setOpacity(0.5); }, 1000);
                                
                                alien1.setLife(personajeSeleccionado.getDamage());
                                if(alien1.getLife()<=0) {
                                    alien1.setSprite('eliminado');
                                    setTimeout(function(){ alien1.kill();  }, 1000);

                                    ///////////////GAME OVER
                                    game.world.removeAll();
                                    text = game.add.text(170, 225, '', { fill: '#ffffff' });
                                    text.fontSize = 70;
                                    text.text = "GANAN LOS MARINES";
                                    
                                    var textUser = game.add.text(200, 400, '', { fill: '#ffffff' });
                                    textUser.fontSize = 30;
                                    newUser.setPuntos(1);
                                    textUser.text = "Usuario: "+ newUser.getId() +" +1p. Total: "+ newUser.getPuntos();

                                    usuarioGanador(newUser);
                                    ordenarRanking(ranking);
                                    cargarClasificacion(ranking);
                                    ponerVisible($("#imagenRanking"), false);
                                    
                                    var button = game.add.button(390, 300, 'button', actionOnClick, this, 0, 0, 0);
                                    ponerVisibleButton($("#Bmover"), false);
                                    ponerVisibleButton($("#Batacar"), false);
                                    ponerVisibleButton($("#Besperar"), false);
                                    ponerVisibleButton($("#Bfin"), false);
                                    ponerVisibleButton($("#Brendirse"), false);
                                    
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
                            case 4:
                                alien3.setOpacity(1);
                                setTimeout(function(){ alien3.setOpacity(0.5); }, 1000);                                
                                
                                alien3.setLife(personajeSeleccionado.getDamage());
                                if(alien3.getLife()<=0){
                                    alien3.setSprite('eliminado');
                                    setTimeout(function(){ alien3.kill();  }, 1000);
                                    jugadores[j][i] = 1;
                                    
                                } 
                                break;
                            case 5:
                                alien4.setOpacity(1);
                                setTimeout(function(){ alien4.setOpacity(0.5); }, 1000);                                
                                
                                alien4.setLife(personajeSeleccionado.getDamage());
                                if(alien4.getLife()<=0){
                                    alien4.setSprite('eliminado');
                                    setTimeout(function(){ alien4.kill();  }, 1000);
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

    //Funcion que mueve los personajes por la pantalla
    function moveSprite(pointer) {
        
        if((counter != 1) && (personajeSeleccionado != null)){
            //Tile a la que me quiero mover
            tiledX = Math.floor(pointer.x/(100));
            tiledY = Math.floor(pointer.y/(60));

            //Tile que contiene la posicion del personaje seleccionado
            actualTiledX = Math.floor(personajeSeleccionado.getX()/(100));
            actualTiledY = Math.floor(personajeSeleccionado.getY()/(60));

            var posicionX = Math.floor(personajeSeleccionado.getX()/(100));
            var posicionY = Math.floor(personajeSeleccionado.getY()/(60)); 

            for (var i=0; i < 10; i++){
                for (var j= 0; j<10 ; j++){
                    //Compruebo las casillas a las cuales me puedo mover, evitando el movimiento en diagonal
                    if((Math.abs(i - actualTiledX) + Math.abs(j - actualTiledY) <= personajeSeleccionado.mov()) && (mapa[j][i]!=2) && (jugadores[j][i] == 1) && ((i == tiledX)&(j == tiledY))){
                        //Muevo el personaje y dejo libre la posicion de la matriz
                        personajeSeleccionado.mover(tiledX*100,tiledY*60);
                        jugadores[tiledY][tiledX] = personajeSeleccionado.getNumeral();
                        jugadores[posicionY][posicionX] = 1;
                        personajeSeleccionado.setHasMoved(true);
                        
                        //Muestro informacion de la vida y el nombre del personaje
                        textoInfo.x = (tiledX * 100);
                        textoInfo.y = (tiledY * 60)+60;

                        counter++;

                        if (!personajeSeleccionado.getHasAttacked()) cambioEstadoBloqueado($("#Batacar"),true);
                        cambioEstadoBloqueado($("#Besperar"),true);
                        cambioEstadoBloqueado($("#Bfin"),true);
                        
                        //Vuelvo a pintar las tiles de su color original
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

    //Funcion que recoge los clicks sobre la pantalla de juego, para saber si hemos pulsado o no sobre un personaje y cuál.
    function listener (pointer) {
        if ((counter != 0) && (counter2 !=0)){
            coordX = Math.floor(pointer.x/(100));
            coordY = Math.floor(pointer.y/(60));

            identificador = jugadores[coordY][coordX];  //Identifico el personaje clickado
                                                        //Y cambio el sprite a seleccionado y deselecciono el resto
            if(turno % 2 == 0){
                switch(identificador) {
                    case 2:
                        alien2.setSprite('Spitter');
                        alien3.setSprite('Claws');
                        alien4.setSprite('Charger');
                        marine1.setSprite('King');
                        marine2.setSprite('Tank');
                        marine3.setSprite('Marine');
                        marine4.setSprite('Ranger');
                        
                        personajeSeleccionado = alien1;
                        
                        alien1.setSprite('AlienQueenClick');
                        
                        //Muestro los datos del personaje seleccionado
                        textoInfo.x = (coordX * 100);
                        textoInfo.y = (coordY * 60)+60;
                        textoInfo.setText( ""+ personajeSeleccionado.getNombre() +" : " + personajeSeleccionado.getLife());

                        break;
                    case 3:
                        alien1.setSprite('AlienQueen');
                        alien3.setSprite('Claws');
                        alien4.setSprite('Charger');
                        marine1.setSprite('King');
                        marine2.setSprite('Tank');
                        marine3.setSprite('Marine');
                        marine4.setSprite('Ranger');
                        
                        personajeSeleccionado = alien2;
                        
                        alien2.setSprite('SpitterClick');
                        
                        //Muestro los datos del personaje seleccionado
                        textoInfo.x = (coordX * 100);
                        textoInfo.y = (coordY * 60)+60;
                        textoInfo.setText( ""+ personajeSeleccionado.getNombre() +" : " + personajeSeleccionado.getLife());
                        
                        break;
                    case 4:
                        alien1.setSprite('AlienQueen');
                        alien2.setSprite('Spitter');
                        alien4.setSprite('Charger');
                        marine1.setSprite('King');
                        marine2.setSprite('Tank');
                        marine3.setSprite('Marine');
                        marine4.setSprite('Ranger');
                        
                        personajeSeleccionado = alien3;
                        
                        alien3.setSprite('ClawsClick');
                        
                        //Muestro los datos del personaje seleccionado
                        textoInfo.x = (coordX * 100);
                        textoInfo.y = (coordY * 60)+60;
                        textoInfo.setText( ""+ personajeSeleccionado.getNombre() +" : " + personajeSeleccionado.getLife());
                        
                        break;
                    case 5:
                        alien1.setSprite('AlienQueen');
                        alien2.setSprite('Spitter');
                        alien3.setSprite('Claws');
                        marine1.setSprite('King');
                        marine2.setSprite('Tank');
                        marine3.setSprite('Marine');
                        marine4.setSprite('Ranger');
                        
                        personajeSeleccionado = alien4;
                        
                        alien4.setSprite('ChargerClick');
                        
                        //Muestro los datos del personaje seleccionado
                        textoInfo.x = (coordX * 100);
                        textoInfo.y = (coordY * 60)+60;
                        textoInfo.setText( ""+ personajeSeleccionado.getNombre() +" : " + personajeSeleccionado.getLife());
                        
                        break;
                    default:
                        personajeSeleccionado = null;

                }
            } else {
                switch(identificador) {
                    case 6:
                        alien1.setSprite('AlienQueen');
                        alien2.setSprite('Spitter');
                        alien3.setSprite('Claws');
                        alien4.setSprite('Charger');
                        marine2.setSprite('Tank');
                        marine3.setSprite('Marine');
                        marine4.setSprite('Ranger');
                        
                        personajeSeleccionado = marine1;
                        
                        marine1.setSprite('KingClick');
                        
                        //Muestro los datos del personaje seleccionado
                        textoInfo.x = (coordX * 100);
                        textoInfo.y = (coordY * 60)+60;
                        textoInfo.setText( ""+ personajeSeleccionado.getNombre() +" : " + personajeSeleccionado.getLife());
                        
                        break;
                    case 7:
                        alien1.setSprite('AlienQueen');
                        alien2.setSprite('Spitter');
                        alien3.setSprite('Claws');
                        alien4.setSprite('Charger');
                        marine1.setSprite('King');
                        marine3.setSprite('Marine');
                        marine4.setSprite('Ranger');
                        
                        personajeSeleccionado = marine2;
                        
                        marine2.setSprite('TankClick');
                        
                        //Muestro los datos del personaje seleccionado
                        textoInfo.x = (coordX * 100);
                        textoInfo.y = (coordY * 60)+60;
                        textoInfo.setText( ""+ personajeSeleccionado.getNombre() +" : " + personajeSeleccionado.getLife());
                        
                        break;
                    case 8:
                        alien1.setSprite('AlienQueen');
                        alien2.setSprite('Spitter');
                        alien3.setSprite('Claws');
                        alien4.setSprite('Charger');
                        marine1.setSprite('King');
                        marine2.setSprite('Tank');
                        marine4.setSprite('Ranger');
                        
                        personajeSeleccionado = marine3;
                        
                        marine3.setSprite('MarineClick');
                        
                        //Muestro los datos del personaje seleccionado
                        textoInfo.x = (coordX * 100);
                        textoInfo.y = (coordY * 60)+60;
                        textoInfo.setText( ""+ personajeSeleccionado.getNombre() +" : " + personajeSeleccionado.getLife());
                        
                        break;
                    case 9:
                        alien1.setSprite('AlienQueen');
                        alien2.setSprite('Spitter');
                        alien3.setSprite('Claws');
                        alien4.setSprite('Charger');
                        marine1.setSprite('King');
                        marine2.setSprite('Tank');
                        marine3.setSprite('Marine');
                        
                        personajeSeleccionado = marine4;
                        
                        marine4.setSprite('RangerClick');
                        
                        //Muestro los datos del personaje seleccionado
                        textoInfo.x = (coordX * 100);
                        textoInfo.y = (coordY * 60)+60;
                        textoInfo.setText( ""+ personajeSeleccionado.getNombre() +" : " + personajeSeleccionado.getLife());
                        
                        break;

                    default:
                        personajeSeleccionado = null;
                        


                }
            }
        }
        
        if(personajeSeleccionado != null){//Si he seleccionado un personaje
            
            //Activo y desactivo botones según las acciones que haya realizado
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
            //Al no haber clickeado ningun personaje, deselecciono todos, y quito los botones
            textoInfo.setText("");
            alien1.setSprite('AlienQueen');
            alien2.setSprite('Spitter');
            alien3.setSprite('Claws');
            alien4.setSprite('Charger');
            marine1.setSprite('King');
            marine2.setSprite('Tank');
            marine3.setSprite('Marine');
            marine4.setSprite('Ranger');
            ponerVisibleButton($("#Bmover"), false);
            ponerVisibleButton($("#Batacar"), false);
            ponerVisibleButton($("#Besperar"), false);
        }



    }

    //Funcion del boton de GAME OVER
    function actionOnClick () {

        ponerVisible($("#menu"), true);
        ponerVisible($("#menuJugar"), false);

    }

    function update() {
        
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
    
    // BOTONES MENUS DEL JUEGO 
    $("#Bjugar").click(
			function() {
                    ponerVisible($("#menu"), false);
                    ponerVisible($("#menuUsuario"), true);
                
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
    
    $("#Baliens").click(
			function() {
                    
                    var nombreUsuario = document.getElementById("apodo").value;
                
                    if ( (usuarioValido(nombreUsuario)) && (nombreUsuario != "")) {
                        newUser = new Usuario(nombreUsuario, 0);
                        usuarios.push(newUser);
                        $("#apodoDuplicado").html("");
                        ponerVisible($("#menuJugar"), true);
                        ponerVisible($("#menuUsuario"), false);
                    } else {
                        if (!(usuarioValido(nombreUsuario))) $("#apodoDuplicado").html("El nick ya está cogido");
                        if ((nombreUsuario == "")) $("#apodoDuplicado").html("El nick no puede estar vacío");
                    }
                
                    textoTurno.text = "Turno de los Aliens";
                    setTimeout(function(){ textoTurno.setText(""); }, 3000);
                    alien1.setOpacity(1);
                    alien2.setOpacity(1);
                    alien3.setOpacity(1);
                    alien4.setOpacity(1);
                    marine1.setOpacity(0.7);
                    marine2.setOpacity(0.7);
                    marine3.setOpacity(0.7);
                    marine4.setOpacity(0.7);
                    turno = 0;
				})
    
    $("#Bmarines").click(
			function() {
                
                    var nombreUsuario = document.getElementById("apodo").value;
                
                    if ( (usuarioValido(nombreUsuario)) && (nombreUsuario != "")) {
                        newUser = new Usuario(nombreUsuario, 0);
                        usuarios.push(newUser);
                        $("#apodoDuplicado").html("");
                        ponerVisible($("#menuJugar"), true);
                        ponerVisible($("#menuUsuario"), false);
                    } else {
                        if (!(usuarioValido(nombreUsuario))) $("#apodoDuplicado").html("El nick ya está cogido");
                        if ((nombreUsuario == "")) $("#apodoDuplicado").html("El nick no puede estar vacío");
                    }
                
                    textoTurno.x = 250;
                    textoTurno.text = "Turno de los Space Marines";
                    setTimeout(function(){ textoTurno.setText(""); }, 3000);
                    alien1.setOpacity(0.7);
                    alien2.setOpacity(0.7);
                    alien3.setOpacity(0.7);
                    alien4.setOpacity(0.7);
                    marine1.setOpacity(1);
                    marine2.setOpacity(1);
                    marine3.setOpacity(1);
                    marine4.setOpacity(1);
                    turno = 1;
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
    
    // BOTONES DE LA ZONA DE JUEGO 
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
                    
                    //Pinto los tiles de su color original, por si se da el caso de que alguien haya pulsado un boton y no haya realizado
                    //la accion, quedandose el mapa pintado.
                    for (var k=0; k < 10; k++){
                         for (var l= 0; l <10 ; l++){
                            var tileType = mapa[l][k];
                            tiles[l][k].loadTexture(tileType, 0);              
                        }
                    }
				})
    
    $("#Bfin").click(
            function() {
                    //Restauro las acciones
                    if(turno % 2 == 0){
                        alien1.setHasMoved(false);
                        alien2.setHasMoved(false);
                        alien3.setHasMoved(false);
                        alien4.setHasMoved(false);
                        alien1.setHasAttacked(false);
                        alien2.setHasAttacked(false);
                        alien3.setHasAttacked(false);
                        alien4.setHasAttacked(false);
                        
                    } else {
                        marine1.setHasMoved(false);
                        marine2.setHasMoved(false);
                        marine3.setHasMoved(false);
                        marine4.setHasMoved(false);
                        marine1.setHasAttacked(false);
                        marine2.setHasAttacked(false);
                        marine3.setHasAttacked(false);
                        marine4.setHasAttacked(false);
                    }
                
                    turno++;
                
                    //Deselecciono los sprites
                    alien1.setSprite('AlienQueen');
                    alien2.setSprite('Spitter');
                    alien3.setSprite('Claws');
                    alien4.setSprite('Charger');
                    marine1.setSprite('King');
                    marine2.setSprite('Tank');
                    marine3.setSprite('Marine');
                    marine4.setSprite('Ranger');
                
                    //Desactivo botones
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
                        alien3.setOpacity(1);
                        alien4.setOpacity(1);
                        marine1.setOpacity(0.7);
                        marine2.setOpacity(0.7);
                        marine3.setOpacity(0.7);
                        marine4.setOpacity(0.7);

                    }else{
                        textoTurno.x = 230;
                        textoTurno.text = "Turno de los Space Marines";
                        setTimeout(function(){ textoTurno.setText(""); }, 3000);
                        alien1.setOpacity(0.7);
                        alien2.setOpacity(0.7);
                        alien3.setOpacity(0.7);
                        alien4.setOpacity(0.7);
                        marine1.setOpacity(1);
                        marine2.setOpacity(1);
                        marine3.setOpacity(1);
                        marine4.setOpacity(1);
                    }
				})
    
    $("#Brendirse").click(
			function() {
                    if(turno % 2 == 0){
                        ///////////////GAME OVER
                        game.world.removeAll();
                        text = game.add.text(170, 225, '', { fill: '#ffffff' });
                        text.fontSize = 70;
                        text.text = "GANAN LOS ALIENS";
                        
                        var textUser = game.add.text(200, 400, '', { fill: '#ffffff' });
                        textUser.fontSize = 30;
                        newUser.setPuntos(1);
                        textUser.text = "Usuario: "+ newUser.getId() +" +1p. Total: "+ newUser.getPuntos();

                        usuarioGanador(newUser);
                        ordenarRanking(ranking);
                        cargarClasificacion(ranking);
                        ponerVisible($("#imagenRanking"), false);
                                    
                        var button = game.add.button(390, 300, 'button', actionOnClick, this, 0, 0, 0);
                        ponerVisibleButton($("#Bmover"), false);
                        ponerVisibleButton($("#Batacar"), false);
                        ponerVisibleButton($("#Besperar"), false);
                        ponerVisibleButton($("#Bfin"), false);
                        ponerVisibleButton($("#Brendirse"), false);
                        
                    } else {
                        game.world.removeAll();
                        text = game.add.text(170, 225, '', { fill: '#ffffff' });
                        text.fontSize = 70;
                        text.text = "GANAN LOS ALIENS";
                        
                        var textUser = game.add.text(200, 400, '', { fill: '#ffffff' });
                        textUser.fontSize = 30;
                        newUser.setPuntos(1);
                        textUser.text = "Usuario: "+ newUser.getId() +" +1p. Total: "+ newUser.getPuntos();
                        
                        usuarioGanador(newUser);
                        ordenarRanking(ranking);
                        cargarClasificacion(ranking);
                        ponerVisible($("#imagenRanking"), false);
                                    
                        var button = game.add.button(390, 300, 'button', actionOnClick, this, 0, 0, 0);
                        ponerVisibleButton($("#Bmover"), false);
                        ponerVisibleButton($("#Batacar"), false);
                        ponerVisibleButton($("#Besperar"), false);
                        ponerVisibleButton($("#Bfin"), false);
                        ponerVisibleButton($("#Brendirse"), false);
                    }
				})
    
})

                
