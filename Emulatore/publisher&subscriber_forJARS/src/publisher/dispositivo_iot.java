package publisher;

public class dispositivo_iot {
	
	public int id_device;
	public String unita_misura;
	public int fk_prop;
	public int fk_azienda;
	public String funzione;
	public int stato;
	
	//Costruttore sensore
	public dispositivo_iot(int id_device, String unita_misura, int fk_prop, int fk_azienda, String funzione){
		this.id_device = id_device;
		this.unita_misura = unita_misura;
		this.fk_prop = fk_prop;
		this.fk_azienda = fk_azienda;
		this.funzione = funzione;
	}
	
	//Costruttore attuatore
	public dispositivo_iot(int id_device, String unita_misura, int fk_prop, int fk_azienda, String funzione, int stato) {
		this.id_device = id_device;
		this.unita_misura = unita_misura;
		this.fk_prop = fk_prop;
		this.fk_azienda = fk_azienda;
		this.funzione = funzione;
		this.stato = stato;
	}

}
