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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/usuarios")
public class ControllerUsuarios {
	
	 private List<Usuario> usuarios = new CopyOnWriteArrayList<Usuario>();
	 
	 
	 @GetMapping(value = "/")
	 public List<Usuario> getUsuario(){
		  return usuarios;
	 }
	 
	 @PostMapping("/nuevo")
	 public ResponseEntity<Usuario> addUser(@RequestBody Usuario user){
		 System.out.println("Actualizando Usuarios");
		 System.out.println(user.getId());
		 System.out.println(user.getPuntos());
		 
		 Usuario nuevoUser = new Usuario (user.getId(), user.getPassword(), user.getPuntos() );

		 usuarios.add(nuevoUser);
				 
		 System.out.println("Dentro del if");
		 System.out.println("tamaño lista " + usuarios.size());
		 return new ResponseEntity<Usuario>(user, HttpStatus.CREATED);

	 } 
	 
	 @PutMapping("/modify")
	 public ResponseEntity<Usuario> setUser(@RequestBody Usuario user){
		 
		 Usuario nuevoUser = new Usuario (user.getId(), user.getPassword(), user.getPuntos() );
		 
		 for (int i = 0; i < usuarios.size(); i++){

			 if(usuarios.get(i).getId().equals(nuevoUser.getId()) ){

				 usuarios.get(i).setPuntos(user.getPuntos());
				 
				 System.out.println("Modificanco al usuario : " + user.getId() + " con: " + user.getPuntos());
				 System.out.println("Puntos usuario: " + usuarios.get(i).getPuntos());
		
		 		 return new ResponseEntity<Usuario>(user, HttpStatus.OK);
			 }
		 }
		 return new ResponseEntity<Usuario>(HttpStatus.NOT_FOUND);

	 }

}
