package publisher;


public class generatore_valori_casuali {

	public float valori_temperatura(){
		
		float value = (float) Math.random() * 46;
		return value;
		
		//System.out.println("Ho misurato il seguente valore di temperatura: " + value + "°C.");
		
	}
	
	public float valori_luminosità() {
		
		float value = (float) Math.random() * 4001;
		return value;
		
		//System.out.println("Ho misurato il seguente valore di luminosità: " + value + " lumen.");
		
	}
	
	public float valori_umidità() {

		float value = (float) Math.random() * 101;
		return value;
		
		//System.out.println("Ho misurato il seguente valore di umidità: " + value + " %.");
		
	}
	
}
