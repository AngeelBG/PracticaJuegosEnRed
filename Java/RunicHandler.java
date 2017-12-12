package es.urjc.code.juegosenred;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class RunicHandler extends TextWebSocketHandler {

	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<String, WebSocketSession>();
	private ObjectMapper mapper = new ObjectMapper();
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("New user: " + session.getId());
		sessions.put(session.getId(), session);
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("Session closed: " + session.getId());
		sessions.remove(session.getId());
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		
		JsonNode node = mapper.readTree(message.getPayload());
		String action = node.get("accion").asText();
		JsonNode dato = node.get("dato");
		System.out.println("Mensaje recibido: "+action+"("+dato.toString()+")");
		
		

		
		switch(action){
		
			case("bloqueo"):{
	
				int	bloqueo = dato.get("bloqueo").asInt();
				
				ObjectNode respuesta = mapper.createObjectNode();
				
				respuesta.put("accion", action); 
				respuesta.put("bloqueo", bloqueo); 
				
				sendOtherParticipants(session, respuesta);
				break;
			}
			case("mover"):{ //lo que le llega al servidor

					int id = dato.get("id").asInt();
					int x = dato.get("x").asInt();
					int y = dato.get("y").asInt();
					
					ObjectNode respuesta = mapper.createObjectNode();
					System.out.println("he guardado" + id + x + y);
					
					respuesta.put("accion", action); 
					respuesta.put("id", id); 
					respuesta.put("x", x); 
					respuesta.put("y", y); 
					
					sendOtherParticipants(session, respuesta);
					break;
				
				}
				case("atacar"):{
					

					int id = dato.get("id").asInt();
					int vida = dato.get("vida").asInt();
					
					ObjectNode respuesta = mapper.createObjectNode();
					System.out.println("he guardado id" + id + vida);
					
					respuesta.put("accion", action); 
					respuesta.put("id", id); 
					respuesta.put("vida", vida);
					
					sendOtherParticipants(session, respuesta);
					break;
					
				}
				case("turno"):{
					

					int	turno = dato.get("turno").asInt();
					
					ObjectNode respuesta = mapper.createObjectNode();
					System.out.println("he pasado el turno: " + turno);
					
					respuesta.put("accion", action); 
					respuesta.put("turno", turno); 
					
					sendOtherParticipants(session, respuesta);
					break;
					
				}
				case("rendirse"):{

					int	ganador = dato.get("ganador").asInt();
					
					ObjectNode respuesta = mapper.createObjectNode();
					
					respuesta.put("accion", action); 
					respuesta.put("ganador", ganador); 
					
					sendOtherParticipants(session, respuesta);
					break;
				}
		}
			
	}

	private void sendOtherParticipants(WebSocketSession session, JsonNode node) throws IOException {

		System.out.println("Message sent: " + node.toString());
		
		ObjectNode newNode = mapper.createObjectNode();
		
		String action = node.get("accion").asText();
		//JsonNode dato = node.get("dato");
		
		switch(action){
			case("bloqueo"):{ //lo que le llega al servidor
				
				newNode.put("accion", node.get("accion").asText());
				newNode.put("bloqueo", node.get("bloqueo").asInt());
				
				break;
				
				}
		
			case("mover"):{ 
				
				newNode.put("accion", node.get("accion").asText());
				newNode.put("id", node.get("id").asInt());
				newNode.put("x", node.get("x").asInt());
				newNode.put("y", node.get("y").asInt());
				
				break;
				
				}
			
			case("atacar"):{
					
				newNode.put("accion", node.get("accion").asText());
				newNode.put("id", node.get("id").asInt());
				newNode.put("vida", node.get("vida").asInt());
				
				break;
					
				}
			case("turno"):{
				
				newNode.put("accion", node.get("accion").asText());
				newNode.put("turno", node.get("turno").asInt());
				
				break;
				
			}
			case("rendirse"):{
				
				newNode.put("accion", node.get("accion").asText());
				newNode.put("ganador", node.get("ganador").asInt());
				
				break;
				
			}
		}


		
		System.out.println("Message final: " + newNode.toString());
		
		for(WebSocketSession participant : sessions.values()) {
			if(!participant.getId().equals(session.getId())) {
				participant.sendMessage(new TextMessage(newNode.toString()));
			}
		}
	}

}
