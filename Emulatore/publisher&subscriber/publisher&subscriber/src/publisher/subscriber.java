package publisher;

import java.nio.charset.StandardCharsets;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.LinkedList;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttMessage;

public class subscriber implements MqttCallback {
	
	public static LinkedList<dispositivo_iot> vett = new LinkedList<>();
	
	@Override
	public void messageArrived(String topic, MqttMessage message) throws Exception {
		// TODO Auto-generated method stub
		// what happens when a new message arrive: in this case, we print it out.
        String strMsg = new String(message.getPayload(), StandardCharsets.UTF_8);
        //System.out.println("Message arrived for the topic '" + topic + "': " + strMsg);
        // additional action for the Last Will and Testament message
        if ("home/LWT".equals(topic)) {
            System.err.println("Publisher is gone!");
        }
        String[] splitted = strMsg.split(",");
        String[] more_split = splitted[0].split(":");
        String id_device = more_split[1];
        more_split = splitted[1].split(":");
        String new_stato = more_split[1];
        Integer y;
        if(new_stato.contains("0")) {
        	y = new Integer(0);
        }else {	
        	y = new Integer(1);
        }
        @SuppressWarnings("deprecation")
		Integer x = new Integer(id_device);
        
        //System.out.println("Ho ricevuto un messaggio per il device " + x + " con il seguente stato: " + y + "\n");
        for(dispositivo_iot disp : vett) {
        	if(disp.id_device == x) {
        		disp.stato = y;
        	}
        }
	}

	public static void main(String[] args) throws SQLException, InterruptedException {
		// TODO Auto-generated method stub
		Connection connection = null;
		pub_sub pubsub = new pub_sub();
		
		try{
	         connection = DriverManager.getConnection( "jdbc:sqlite:C:\\Users\\Gregl\\OneDrive\\Desktop\\PISSIR project\\gruppo-6\\WebApp\\iserra.db" );	//Attensione: prima di consegnare, modificare il path in base al pc che usiamo durante la discussione
	         if ( connection != null ){
	            System.out.println("Connessione ok!");
	         }
	      }
	      catch ( Exception ex ) {
	         System.err.println( ex.getClass().getName() + ": " + ex.getMessage() );
	         System.out.println("Errore");
	      }
	      
	      Statement statement = connection.createStatement();
	      ResultSet rs = statement.executeQuery("SELECT * FROM dispositivo_iot WHERE tipo = 'Attuatore';");
	      
	      //Elaborazione risultati
	      while(rs.next())
	      {
	    	  //Ottiene il dato
	    	  int id_device = rs.getInt("id_device"); 
	          String unita_misura = rs.getString("unita_misura");
	          int fk_prop = rs.getInt("fk_proprieta");
	          String funzione = rs.getString("funzione");
	          int stato = rs.getInt("stato");
	          
	          statement = connection.createStatement();
	          ResultSet rs1 = statement.executeQuery("SELECT fk_azienda FROM proprieta WHERE id_proprieta = '"+fk_prop+"';");
	          rs1.next();
	          int fk_azienda = rs1.getInt("fk_azienda");
	          
	          dispositivo_iot disp = new dispositivo_iot(id_device, unita_misura, fk_prop, fk_azienda, funzione, stato);
	          vett.add(disp);
	      }
	      

	      //for (dispositivo_iot disp : vett)	System.out.println(disp.id_device + " " + disp.unita_misura + " " + disp.fk_prop + " " +  disp.fk_azienda + " " + disp.funzione + " " + disp.stato);
	      
	  
	      //Chiude la connessione
	      connection.close();
	      
	      //Formato messaggio: {“id_device”: 045, “stato”: 1}
	      pubsub.startSubscriber();
	      //Formato topic attuatori: "azienda/X/proprieta/Y/attuatori"
	      

	      while(true) {
	    	  for(dispositivo_iot disp : vett)
	    		  System.out.println(disp.id_device + " " + disp.fk_prop + " " +  disp.fk_azienda + " " + disp.funzione + " " + disp.stato + " ");
	      	  System.out.println("Stampero' nuovamente lo stato degli attuatori tra 15 secondi!\n");
			  Thread.sleep(15000);
	      }
	}

	@Override
	public void connectionLost(Throwable cause) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deliveryComplete(IMqttDeliveryToken token) {
		// TODO Auto-generated method stub
		
	}

}
