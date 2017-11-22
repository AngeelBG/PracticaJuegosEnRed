package es.urjc.code.juegosenred;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/clasificacion")
public class Controller {
 
 private List<Ranking> clasif = new CopyOnWriteArrayList<Ranking>();
 
 private void createRanking(){
	 for(int i = 0; i<10; i++){
		 Ranking newRanking = new Ranking(i+1,"Jugador "+(i+1),(10-i)*2);
		 clasif.add(newRanking);
		 
	 }      
 }
 
 @GetMapping("/")
 public Collection<Ranking> getRanking(){
	 if(clasif.isEmpty()){
		 createRanking();
	 }
	 return clasif;
 }
 
 @PostMapping("/check")
 //llamamos a este metodo cuando se acaba la partida para ver si un jugador ha entrado en la lista de puntuaciones maximas
 public ResponseEntity<Ranking> validacion(@RequestBody Ranking clasificado){
	 //createRanking();
	 System.out.println("Actualizando clasificacion");
	 if(clasificado.getPuntos() > clasif.get(9).getPuntos()){ //clasif.size()
		 boolean duplicado = false;
		 Ranking actual = null;
	 for(Ranking r: clasif){ //recorremos todos los clasificados
		 if(r.getNombre().equals(clasificado.getNombre())){
			 duplicado = true;
			 actual = r;
		 }
	 }
	 
	 	 posicionesClasificacionNuevas(clasificado,duplicado,actual);
	 	 return new ResponseEntity<Ranking>(clasificado, HttpStatus.CREATED);
			 
		 }
		 return new ResponseEntity<Ranking>(HttpStatus.NOT_MODIFIED);
	 }
 
 //metodo que ordena de nuevo todas las posiciones segun el Ranking actual
 private void posicionesClasificacionNuevas(Ranking actual, boolean repetido, Ranking antiguo){
	 int i = 0;
	 boolean encontrado = false;
	 
	 if(!repetido){
		 while(!encontrado && i <clasif.size()){//mientras no haya encontrado un jugador con menos puntos y no se haya acabado la tabla
			 if(clasif.get(i).getPuntos() < actual.getPuntos()){//si el jugador actual tiene mas puntos que el resto se actualiza la tabla uno por uno
				for(int k = 9; k > i; k--){//vamos de abajo a arriba cambiandolos
					Ranking aux = clasif.get(k-1);
					aux.bajarPosicion();
					clasif.set(k,aux);
				}
				actual.setPosicion(i+1);
				clasif.set(i, actual);
				encontrado = true;
			 }
			 i++;
		 }
	 }else{
		 if(actual.getPuntos() > antiguo.getPuntos()){
			 while(!encontrado && i< clasif.size()){
				 if(clasif.get(i).getPuntos() < actual.getPuntos()){
					 for(int j = antiguo.getPosicion()-1; j> i; j--){
						 Ranking aux = clasif.get(j-1);
						 aux.bajarPosicion();
						 clasif.set(j, aux);
					 }
					 actual.setPosicion(i+1);
					 clasif.set(i, actual);
					 encontrado = true;
				 	}
				 	i++;
			 	}
		 	}
	 	}
 	}
} 

