package publisher;

import java.sql.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.LinkedList;

import org.eclipse.paho.client.mqttv3.MqttException;
 
public class publisher {
 
   public static void main ( String args[] ) throws SQLException, InterruptedException, MqttException{
 
      Connection connection = null;
      LinkedList<dispositivo_iot> vett = new LinkedList<>();
      generatore_valori_casuali gen = new generatore_valori_casuali();
      generatore_valori_configurazione gen2 = new generatore_valori_configurazione();
      pub_sub pubsub = new pub_sub();
 
      try{
         //connection = DriverManager.getConnection("jdbc:sqlite:C:\\Users\\Paolo\\Desktop\\progettopissir\\gruppo-6\\WebApp\\iserra.db" );	//Attenzione: prima di consegnare, modificare il path in base al pc che usiamo durante la discussione
    	  connection = DriverManager.getConnection("jdbc:sqlite:..\\..\\WebApp\\iserra.db" );
    	  if ( connection != null ){
            System.out.println("Connessione ok!");
         }
      }
      catch ( Exception ex ) {
         System.err.println( ex.getClass().getName() + ": " + ex.getMessage() );
         System.out.println("Errore");
      }
      
      Statement statement = connection.createStatement();
      ResultSet rs = statement.executeQuery("SELECT * FROM dispositivo_iot WHERE tipo = 'Sensore';");
      
      // Elabora i risultati
      while (rs.next()) 
      {
        // Ottiene il dato
    	int id_device = rs.getInt("id_device"); 
        String unita_misura = rs.getString("unita_misura");
        int fk_prop = rs.getInt("fk_proprieta");
        String funzione = rs.getString("funzione");
        
        statement = connection.createStatement();
        ResultSet rs1 = statement.executeQuery("SELECT fk_azienda FROM proprieta WHERE id_proprieta = '"+fk_prop+"';");
        rs1.next();
        int fk_azienda = rs1.getInt("fk_azienda");
        
        dispositivo_iot disp = new dispositivo_iot(id_device, unita_misura, fk_prop, fk_azienda, funzione);
        vett.add(disp);
        
      }
      
      //for (dispositivo_iot disp : vett)	System.out.println(disp.id_device + " " + disp.unita_misura + " " + disp.fk_prop + " " +  disp.fk_azienda + " " + disp.funzione);
      

      //Chiude la connessione
      connection.close();
      
      pubsub.startPublisher();
      String topic;	//Formato topic misure: "azienda/X/propieta/Y/misure"
      String msg;
      
      while(true) {
    	  	for (dispositivo_iot disp : vett) {
    	  		switch(disp.funzione) {
    	  		
    	  		case "Temperatura":
    	  			topic = "azienda/" + disp.fk_azienda + "/proprieta/" + disp.fk_prop + "/misure";
    	  			msg = "{\"id_device\":";
    	  			msg += disp.id_device;
    	  			msg += ", \"data_misurazione\":\"";
    	  			msg += LocalDate.now().toString();
    	  			msg += "\", \"ora_misurazione\":\"";
    	  			msg += LocalTime.now().toString();
    	  			msg += "\", \"valore_misurato\":";
    	  			//msg += gen2.valori_temperatura();	//Valore temperatura per far attivare la configurazione
    	  			msg += gen.valori_temperatura();
    	  			msg += ", \"unita_misura\":\"";
    	  			msg += disp.unita_misura;
    	  			msg += "\"}";
    	  			System.out.println(msg);
    	  			pubsub.publishMessage(topic, msg);
    	  			System.out.println("Genererò i prossimi valori tra 5 secondi!\n");
    				Thread.sleep(5000);
    	  			break;
    	  			
    	  		case "Luminosità":
    	  			topic = "azienda/" + disp.fk_azienda + "/proprieta/" + disp.fk_prop + "/misure";
    	  			msg = "{\"id_device\":";
    	  			msg += disp.id_device;
    	  			msg += ", \"data_misurazione\":\"";
    	  			msg += LocalDate.now().toString();
    	  			msg += "\", \"ora_misurazione\":\"";
    	  			msg += LocalTime.now().toString();
    	  			msg += "\", \"valore_misurato\":";
    	  			//msg += gen2.valori_luminosità();	//Valore luminosità per far attivare la configurazione
    	  			msg += gen.valori_luminosità();
    	  			msg += ", \"unita_misura\":\"";
    	  			msg += disp.unita_misura;
    	  			msg += "\"}";
    	  			System.out.println(msg);
    	  			pubsub.publishMessage(topic, msg);
    	  			System.out.println("Genererò i prossimi valori tra 5 secondi!\n");
    				Thread.sleep(5000);
    	  			break;
    	  			
    	  		case "Umidità":
    	  			topic = "azienda/" + disp.fk_azienda + "/proprieta/" + disp.fk_prop + "/misure";
    	  			msg = "{\"id_device\":";
    	  			msg += disp.id_device;
    	  			msg += ", \"data_misurazione\":\"";
    	  			msg += LocalDate.now().toString();
    	  			msg += "\", \"ora_misurazione\":\"";
    	  			msg += LocalTime.now().toString();
    	  			msg += "\", \"valore_misurato\":";
    	  			//msg += gen2.valori_umidità();	//Valore umidità per far attivare la configurazione
    	  			msg += gen.valori_umidità();
    	  			msg += ", \"unita_misura\":\"";
    	  			msg += disp.unita_misura;
    	  			msg += "\"}";
    	  			System.out.println(msg);
    	  			pubsub.publishMessage(topic, msg);
    	  			System.out.println("Genererò i prossimi valori tra 5 secondi!\n");
    				Thread.sleep(5000);
    	  			break;
    	  			
    	  		default:
    	  			break;
    	  		
    	  		}
    	  	}
		}
		
      
   }
   

}