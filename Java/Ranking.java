package es.urjc.code.juegosenred;

public class Ranking {
private int id;
private int posicion;
private String nombre;
private int puntos;

public Ranking(){
}

public Ranking(int posicion, String nombre, int puntos){
	this.posicion = posicion;
	this.nombre = nombre;
	this.puntos = puntos;
	
}

public int getId() {
	return id;
}

public void setId(int id) {
	this.id = id;
}

public int getPosicion() {
	return posicion;
}

public void setPosicion(int posicion) {
	this.posicion = posicion;
}

public void bajarPosicion() {
	this.posicion += 1;
}
public String getNombre() {
	return nombre;
}

public void setNombre(String nombre) {
	this.nombre = nombre;
}

public int getPuntos() {
	return puntos;
}

public void setPuntos(int puntos) {
	this.puntos = puntos;
}

}