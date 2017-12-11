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
			case("mover"):{ //lo que le llega al servidor
				
					String id = "";
					int x= 100;
					int y = 100;
					
					if( dato.get("id").asText() != null)
						id = dato.get("id").asText();
					
					if( dato.get("x").asInt() != 100)
						x = dato.get("x").asInt();
					
					if( dato.get("y").asInt() != 100)
						y = dato.get("y").asInt();
					
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
					
					String id = "";
					int vida = 500;
					
					if( dato.get("id").asText() != null)
						id = dato.get("id").asText();
					
					if( dato.get("vida").asInt() != 500)
						vida = dato.get("vida").asInt();
					
					ObjectNode respuesta = mapper.createObjectNode();
					System.out.println("he guardado" + id + vida);
					
					respuesta.put("accion", action); 
					respuesta.put("id", id); 
					respuesta.put("vida", vida);
					
					sendOtherParticipants(session, respuesta);
					break;
					
				}
		}
			
	}

	private void sendOtherParticipants(WebSocketSession session, JsonNode node) throws IOException {

		System.out.println("Message sent: " + node.toString());
		
		ObjectNode newNode = mapper.createObjectNode();
		
		String action = node.get("accion").asText();
		JsonNode dato = node.get("dato");
		
		switch(action){
		
			case("mover"):{ //lo que le llega al servidor
				
				newNode.put("accion", node.get("accion").asText());
				newNode.put("id", node.get("id").asText());
				newNode.put("x", node.get("x").asInt());
				newNode.put("y", node.get("y").asInt());
				
				break;
				
				}
			
			case("atacar"):{
					
				newNode.put("accion", node.get("accion").asText());
				newNode.put("id", node.get("id").asText());
				newNode.put("vida", node.get("vida").asInt());
				
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
