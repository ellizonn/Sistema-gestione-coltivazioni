package publisher;

import java.nio.charset.StandardCharsets;

import org.eclipse.paho.client.mqttv3.*;


public class pub_sub {
	
	// init the client
    private MqttClient mqttClient;

    public pub_sub() {
        // the broker URL
        //String brokerURL = "tcp://127.0.0.1:1883"; //Locale
        String brokerURL = "tcp://193.206.52.98:1883";	//Server Alessandria
        // String brokerURL = "tcp://iotlabgw.edu-al.unipmn.it:1883";
    	//String brokerURL = "tcp://91.121.93.94:1883";	//Server di prova
        try {
            mqttClient = new MqttClient(brokerURL, MqttClient.generateClientId());

        } catch (MqttException e) {
            e.printStackTrace();
        }
    }

    public void startSubscriber() {
        try { 
        	char pwd[] = {'p','i','s','s','i','r','2','0','2','0'};
            MqttConnectOptions options = new MqttConnectOptions();
            options.setUserName("pissir");
            options.setPassword(pwd);
            // set a callback and connect to the broker
            mqttClient.setCallback(new subscriber());
            mqttClient.connect(options);

            //Subscribe to all subtopics of home
            final String topic = "azienda/+/proprieta/+/attuatori";
            //final String topic = "#";
            mqttClient.subscribe(topic);

            System.out.println("The subscriber is now listening to this topic: " + topic);

        } catch (MqttException e) {
            e.printStackTrace();
        }
    }

    public void startPublisher() {
        try { 
        	char pwd[] = {'p','i','s','s','i','r','2','0','2','0'};
            MqttConnectOptions options = new MqttConnectOptions();
            // persistent, durable connection
            options.setUserName("pissir");
            options.setPassword(pwd);
            options.setCleanSession(false);
            options.setWill(mqttClient.getTopic("home/LWT"), "I'm gone. Bye.".getBytes(), 0, false);

            // connect the publisher to the broker
            mqttClient.connect(options);

            // publish something...

            //  client.disconnect();

        } catch (MqttException e) {
            e.printStackTrace();
        }
    }

    public void publishMessage(String topic, String msg) throws MqttException {
        // get the topic
        MqttTopic myTopic = mqttClient.getTopic(topic);
        myTopic.publish(new MqttMessage(msg.toString().getBytes(StandardCharsets.UTF_8)));
        System.out.println("Messaggio pubblicato sul topic '" + myTopic + "': " + msg.toString());
    }

}
