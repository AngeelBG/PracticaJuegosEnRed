package es.urjc.code.juegosenred;

public class Usuario {
	private String id;
	private String password;
	private int puntos;
	
	public Usuario(){
	}

	public Usuario(String id, String password, int puntos){
		this.id = id;
		this.password = password;
		this.puntos = puntos;
		
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public int getPuntos() {
		return puntos;
	}
	public void setPuntos(int puntos) {
		this.puntos = puntos;
	}
	
}
