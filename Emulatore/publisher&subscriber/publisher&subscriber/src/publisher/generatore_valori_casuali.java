package publisher;


public class generatore_valori_casuali {

	public float valori_temperatura(){
		
		float value = (float) Math.random() * 46;
		return value;
		
		//System.out.println("Ho misurato il seguente valore di temperatura: " + value + "�C.");
		
	}
	
	public float valori_luminosit�() {
		
		float value = (float) Math.random() * 4001;
		return value;
		
		//System.out.println("Ho misurato il seguente valore di luminosit�: " + value + " lumen.");
		
	}
	
	public float valori_umidit�() {

		float value = (float) Math.random() * 101;
		return value;
		
		//System.out.println("Ho misurato il seguente valore di umidit�: " + value + " %.");
		
	}
	
}
