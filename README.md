# PracticaJuegosEnRed
# Runic Wars

## _Link_:
Gameplay: https://youtu.be/zpRZDGNVl98

## _Descripción_:
 + **Objetivo**: Runic Wars es un juego de estrategia de guerra por turnos multijugador, inspirado en Warhammer, en el cual el objetivo es ir eliminando las tropas del equipo enemigo, para conseguir acabar con su Rey.
 + **Tropas**: el juego dispondrá de distintas tropas (soldados a melee, a rango, tanques, el rey, etc), las cuales, dependiendo del tipo, tendrán distintas posibilidades de ataque, movimiento, vida, etc. 
 + **Mapas**: habrá distintos mapas con diferentes layouts, cuyo terreno influirá en el porcentaje de acierto de la tropa seleccionada, obligándonos a tomar diferentes estrategias para derrotar al enemigo.
 + **Extras**:
   * Los jugadores al iniciar la partida elegirán un nick, con el cual se les identificará durante el juego y en el muro de la fama.
   * También se tendrá incorporada una interfaz con menus y un muro de la fama, el cual mostrará los jugadores con mayor victorias. 
   * Un jugador podrá crear una sala y esperar a que otro jugador se una, o unirse a una sala ya anteriormente creada por otro jugador. Al finalizar una partida, el muro de la fama se actualizará y se mostrará por pantalla a los jugadores.
   * Si un jugador quiere crear una sala con el mismo nombre de una sala creada previamente, se le devolverá un error. Las salas de borran automáticamente cuando todos los jugadores la han abandonado.
   * Un jugador podrá abandonar una sala en cualquier momento. Si queda un único jugador, la partida finalizá de forma automática.
 
## _Integrantes_:
  
| Nombre        | Apellidos       | Correo                       |              GitHub        |
| ------------- |:---------------:| ---------------------------- |--------------------------- |
| Ángel         |Bachiller García | a.bachillerg@alumnos.urjc.es |https://github.com/AngeelBG |
| Juan Carlos   |Laso Casares     | jc.laso@alumnos.urjc.es      |https://github.com/Juankr95 |

## _Pantallas_:

 + **Menu**: En el menú principal , tendremos varios botones:
   - Jugar :  nos lleva a la pantalla en la que podremos elegir nuestro usuario y nuestro equipo.
   - Instrucciones : abre una nueva pantalla con las instrucciones del juego.
   - Personajes : nos abre una pantalla con dos carrouseles, los cuales contienen la información de cada personaje del juego.
   - Ranking : muestra el ranking de los 10 mejores jugadores hasta el momento.
   
 ![alt text](https://github.com/AngeelBG/PracticaJuegosEnRed/blob/master/Pantallazos/Menu.PNG)
 
  + **Usuarios**: Al pulsar el boton Jugar, se abre la pantalla en la cual podemos elegir nuestro usuario (no puede estar vacío y tiene que ser único) y nuestro equipo (Aliens o Space Marines).
  
  ![alt text](https://github.com/AngeelBG/PracticaJuegosEnRed/blob/master/Pantallazos/Usuarios.PNG)
  
  + **Juego**: Abre la pantalla de juego.
  
  ![alt text](https://github.com/AngeelBG/PracticaJuegosEnRed/blob/master/Pantallazos/Juego.PNG)
  
  + **Instrucciones**: Contiene una imagen con la información necesaria para poder jugar correctamente a Runic Wars.
  
  ![alt text](https://github.com/AngeelBG/PracticaJuegosEnRed/blob/master/Pantallazos/Instrucciones.PNG)
  
  + **Ranking**: Muestra un primer ranking aleatorio (mediante una imagen en html) de unos 10 mejores jugadores random. Una vez se haya realizado un primer juego, el ranking se actualiza.
  
  ![alt text](https://github.com/AngeelBG/PracticaJuegosEnRed/blob/master/Pantallazos/Ranking.PNG)
  
  + **Personajes**: En su interior hay dos carrouseles, realizados con Boostrap, con imágenes de los personajes del juego, las cuales nos aportan información sobre su vida, movimiento, ataque, etc.
  
  ![alt text](https://github.com/AngeelBG/PracticaJuegosEnRed/blob/master/Pantallazos/Personajes.PNG)
  
## _Diagrama_:

  ![alt text](https://github.com/AngeelBG/PracticaJuegosEnRed/blob/master/Pantallazos/Diagrama.png)
  
## _Diagrama-UML_:
  
  ![alt text](https://github.com/AngeelBG/PracticaJuegosEnRed/blob/master/Pantallazos/UML-RunicWars.JPG)
  
## _Documentación del protocolo WS_:
  
  Cada mensaje de WebSocket consta de : una primera información de la acción que voy a realizar y una segunda información en formato JSON con un conjunto de datos de la acción mencionada.
  
Tipos:

Bloqueo: envía el ejercito que ha seleccionado el jugador, para bloquear así el botón para que el segundo jugador no lo seleccione.

Mover: cuando un jugador realiza la acción de movimiento, la manda al servidor con el id de la tropa que ha movido y la posición a la que se mueve, y este se la reenvía a todos los clientes.

Atacar: cuando se realiza la acción de atacar, manda al servidor el id de la tropa que ha sido atacada y la vida que le ha restado.

Turno: cuando el usuario finaliza el turno, se pasa la variable al servidor, el cual la devuelve al resto de jugadores.

Rendirse: cuando el jugador se rinde, se pasa el ganador al servidor, devolviéndolo al resto de jugadores después.

  
## _Instrucciones_:
1. Descargar el archivo de la carpeta Ejecutable.
2. Una vez descargado en tu ordenador, clickear boton derecho sobre el archivo y ejecutar con Java
3. Abrir el navegador (preferentemente Chrome) y poner la dirección : http://localhost:8022/
