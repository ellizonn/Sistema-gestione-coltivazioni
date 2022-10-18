--
-- File generated with SQLiteStudio v3.3.3 on mar ott 18 15:44:15 2022
--
-- Text encoding used: System
--
PRAGMA foreign_keys = on;

-- Table: azienda_agricola
CREATE TABLE azienda_agricola (id_azienda INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, via STRING NOT NULL, citta STRING NOT NULL, CAP INTEGER (5) NOT NULL, civico INTEGER (5) NOT NULL, nomeaz STRING NOT NULL, piva INTEGER (16) NOT NULL UNIQUE);
INSERT INTO azienda_agricola (id_azienda, via, citta, CAP, civico, nomeaz, piva) VALUES (1, 'Via Roma', 'Casalbeltrame', 28060, 6, 'La Risarola', 254689785649875);
INSERT INTO azienda_agricola (id_azienda, via, citta, CAP, civico, nomeaz, piva) VALUES (2, 'Via Giglio', 'Lucca', 28100, 8, 'Floriade', 254114489758649);
INSERT INTO azienda_agricola (id_azienda, via, citta, CAP, civico, nomeaz, piva) VALUES (3, 'Via Caccianotti', 'Biandrate', 28061, 10, 'Canetta Serre', 4274586334519757);
INSERT INTO azienda_agricola (id_azienda, via, citta, CAP, civico, nomeaz, piva) VALUES (4, 'Via Andrea Costa', 'Novara', 28100, 4, 'Fasoli Piante', 5284529452240778);
INSERT INTO azienda_agricola (id_azienda, via, citta, CAP, civico, nomeaz, piva) VALUES (5, 'Via Stazione', 'Vercelli', 13100, 13, 'Syngenta', 2438462340663956);
INSERT INTO azienda_agricola (id_azienda, via, citta, CAP, civico, nomeaz, piva) VALUES (6, 'Via Duomo', 'Vercelli', 13100, 9, 'La Biula', 4522196507538623);
INSERT INTO azienda_agricola (id_azienda, via, citta, CAP, civico, nomeaz, piva) VALUES (7, 'Via Libera', 'Novara', 28100, 12, 'Rice Expert', 6482650783548607);
INSERT INTO azienda_agricola (id_azienda, via, citta, CAP, civico, nomeaz, piva) VALUES (8, 'Corso Cavallotti', 'Novara', 28100, 12, 'Nuares S.R.L.', 6482550851248674);
INSERT INTO azienda_agricola (id_azienda, via, citta, CAP, civico, nomeaz, piva) VALUES (9, 'Via Greppi', 'Novara', 28061, 1, 'Depaoli Luigino', 64982659705537564);
INSERT INTO azienda_agricola (id_azienda, via, citta, CAP, civico, nomeaz, piva) VALUES (10, 'Strada privata Sesia', 'Casalbeltrame', 28060, 34, 'Poderia', 3429675406238546);


-- Table: proprieta
CREATE TABLE proprieta (id_proprieta INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, estensione_ettari INTEGER NOT NULL, coltura STRING, data_semina DATE, lat REAL NOT NULL, long REAL NOT NULL, tipo_proprieta STRING NOT NULL, copertura_mobile BOOLEAN, fk_azienda INTEGER NOT NULL REFERENCES azienda_agricola (id_azienda) ON DELETE CASCADE ON UPDATE CASCADE);
INSERT INTO proprieta (id_proprieta, estensione_ettari, coltura, data_semina, lat, long, tipo_proprieta, copertura_mobile, fk_azienda) VALUES (128, 2, 'Mais', '2022-04-21', 15.0, 45.0, 'Campo', 1, 1);
INSERT INTO proprieta (id_proprieta, estensione_ettari, coltura, data_semina, lat, long, tipo_proprieta, copertura_mobile, fk_azienda) VALUES (129, 5, 'Grano', '2022-10-14', 12.0, 34.0, 'Campo', 0, 1);
INSERT INTO proprieta (id_proprieta, estensione_ettari, coltura, data_semina, lat, long, tipo_proprieta, copertura_mobile, fk_azienda) VALUES (130, 3, 'Patate', '2022-04-24', 10.0, 15.0, 'Serra', 1, 1);
INSERT INTO proprieta (id_proprieta, estensione_ettari, coltura, data_semina, lat, long, tipo_proprieta, copertura_mobile, fk_azienda) VALUES (131, 4, 'Fragole', '2022-02-11', 56.0, 47.0, 'Serra', 1, 2);
INSERT INTO proprieta (id_proprieta, estensione_ettari, coltura, data_semina, lat, long, tipo_proprieta, copertura_mobile, fk_azienda) VALUES (132, 8, 'riso', '2022-03-09', 12.0, 20.0, 'Campo', 0, 2);
INSERT INTO proprieta (id_proprieta, estensione_ettari, coltura, data_semina, lat, long, tipo_proprieta, copertura_mobile, fk_azienda) VALUES (133, 8, 'soia', '2022-07-01', 22.0, 25.0, 'Campo', 0, 2);
INSERT INTO proprieta (id_proprieta, estensione_ettari, coltura, data_semina, lat, long, tipo_proprieta, copertura_mobile, fk_azienda) VALUES (134, 2, 'carote', '2022-01-06', 43.0, 32.0, 'Serra', 1, 3);
INSERT INTO proprieta (id_proprieta, estensione_ettari, coltura, data_semina, lat, long, tipo_proprieta, copertura_mobile, fk_azienda) VALUES (135, 1, 'verza', '2021-12-31', 11.0, 10.0, 'Serra', 1, 3);
INSERT INTO proprieta (id_proprieta, estensione_ettari, coltura, data_semina, lat, long, tipo_proprieta, copertura_mobile, fk_azienda) VALUES (136, 4, 'pomodori', '2022-03-11', 12.0, 45.0, 'Serra', 1, 4);
INSERT INTO proprieta (id_proprieta, estensione_ettari, coltura, data_semina, lat, long, tipo_proprieta, copertura_mobile, fk_azienda) VALUES (137, 6, 'mais', '2022-04-08', 11.0, 2.0, 'Campo', 0, 4);

-- Table: utente
CREATE TABLE utente (id_utente STRING PRIMARY KEY NOT NULL, CF STRING (16) NOT NULL UNIQUE, nome STRING NOT NULL, cognome STRING NOT NULL, datan DATE NOT NULL, fk_azienda INTEGER NOT NULL REFERENCES azienda_agricola (id_azienda) ON DELETE CASCADE ON UPDATE CASCADE, tipo_utente STRING NOT NULL);
INSERT INTO utente (id_utente, CF, nome, cognome, datan, fk_azienda, tipo_utente) VALUES ('87b872df-799a-44a0-bf08-221111b1c2ab', 'RPLDFE44T56G965Y', 'Romani', 'Dario', '2000-12-23', 1, 'agricoltore');
INSERT INTO utente (id_utente, CF, nome, cognome, datan, fk_azienda, tipo_utente) VALUES ('ce0f4732-2ef1-436d-8c38-c946d661dc39', 'RTPFFD56G6F952O', 'Luciani', 'Mario', '1998-01-01', 1, 'collaboratore');
INSERT INTO utente (id_utente, CF, nome, cognome, datan, fk_azienda, tipo_utente) VALUES ('250f3714-c7b6-40f1-9dce-dccc5074471a', 'RFTGHL22T66F952R', 'Giacomo', 'Rossi', '1999-11-25', 2, 'agricoltore');
INSERT INTO utente (id_utente, CF, nome, cognome, datan, fk_azienda, tipo_utente) VALUES ('62261e1a-acfc-468b-bcff-50371ef46acd', 'MRNLCF56Y77J965Y', 'Luca', 'Marinetti', '1980-05-20', 2, 'collaboratore');
INSERT INTO utente (id_utente, CF, nome, cognome, datan, fk_azienda, tipo_utente) VALUES ('9efc0497-d9f1-47e3-a9f3-1fed0796bf6d', 'PRIGLU77D55F345U', 'Giulia', 'Pari', '1988-12-22', 3, 'agricoltore');
INSERT INTO utente (id_utente, CF, nome, cognome, datan, fk_azienda, tipo_utente) VALUES ('8786a904-ec0a-4b49-a1e2-6a425ec9444a', 'MGILCU66G55R458O', 'Lucia', 'Magi', '1955-09-17', 3, 'collaboratore');
INSERT INTO utente (id_utente, CF, nome, cognome, datan, fk_azienda, tipo_utente) VALUES ('856c1c9c-a637-43e3-8542-5b4b6b2f43e7', 'PLLMRO89Y77J123H', 'Mario', 'Pellina', '1989-02-01', 4, 'agricoltore');
INSERT INTO utente (id_utente, CF, nome, cognome, datan, fk_azienda, tipo_utente) VALUES ('28a4c8a0-5690-4800-b2d8-1bf67495292f', 'LUNMNL77I00F952T', 'Manlio', 'Luani', '1977-01-01', 4, 'collaboratore');


-- Table: dispositivo_iot
CREATE TABLE dispositivo_iot (id_device INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, mod_interazione STRING NOT NULL, parametri_connessione STRING NOT NULL, tipo STRING NOT NULL, unita_misura STRING NOT NULL, funzione STRING NOT NULL, stato BOOLEAN NOT NULL, manuale BOOLEAN NOT NULL, fk_proprieta INTEGER REFERENCES proprieta (id_proprieta) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL);
INSERT INTO dispositivo_iot (id_device, mod_interazione, parametri_connessione, tipo, unita_misura, funzione, stato, manuale, fk_proprieta) VALUES (79, 'mqtt', 'pass001', 'Attuatore', '°C', 'Temperatura', 1, 0, 128);
INSERT INTO dispositivo_iot (id_device, mod_interazione, parametri_connessione, tipo, unita_misura, funzione, stato, manuale, fk_proprieta) VALUES (80, 'mqtt', 'pass002', 'Attuatore', 'lx', 'Luminosità', 1, 0, 128);
INSERT INTO dispositivo_iot (id_device, mod_interazione, parametri_connessione, tipo, unita_misura, funzione, stato, manuale, fk_proprieta) VALUES (81, 'mqtt', 'pass003', 'Attuatore', '%', 'Umidità', 1, 0, 128);
INSERT INTO dispositivo_iot (id_device, mod_interazione, parametri_connessione, tipo, unita_misura, funzione, stato, manuale, fk_proprieta) VALUES (82, 'mqtt', 'pass004', 'Sensore', '°C', 'Temperatura', 1, 0, 128);
INSERT INTO dispositivo_iot (id_device, mod_interazione, parametri_connessione, tipo, unita_misura, funzione, stato, manuale, fk_proprieta) VALUES (83, 'mqtt', 'pass005', 'Sensore', 'lx', 'Luminosità', 1, 0, 128);
INSERT INTO dispositivo_iot (id_device, mod_interazione, parametri_connessione, tipo, unita_misura, funzione, stato, manuale, fk_proprieta) VALUES (84, 'mqtt', 'pass006', 'Sensore', '%', 'Umidità', 1, 0, 128);
INSERT INTO dispositivo_iot (id_device, mod_interazione, parametri_connessione, tipo, unita_misura, funzione, stato, manuale, fk_proprieta) VALUES (85, 'mqtt', 'pass007', 'Attuatore', '°C', 'Temperatura', 1, 0, 129);
INSERT INTO dispositivo_iot (id_device, mod_interazione, parametri_connessione, tipo, unita_misura, funzione, stato, manuale, fk_proprieta) VALUES (86, 'mqtt', 'pass008', 'Attuatore', '%', 'Umidità', 1, 0, 129);
INSERT INTO dispositivo_iot (id_device, mod_interazione, parametri_connessione, tipo, unita_misura, funzione, stato, manuale, fk_proprieta) VALUES (87, 'mqtt', 'pass009', 'Sensore', '°C', 'Temperatura', 1, 0, 129);
INSERT INTO dispositivo_iot (id_device, mod_interazione, parametri_connessione, tipo, unita_misura, funzione, stato, manuale, fk_proprieta) VALUES (88, 'mqtt', 'pass010', 'Sensore', '°C', 'Temperatura', 1, 0, 129);
INSERT INTO dispositivo_iot (id_device, mod_interazione, parametri_connessione, tipo, unita_misura, funzione, stato, manuale, fk_proprieta) VALUES (89, 'mqtt', 'pass011', 'Attuatore', '°C', 'Temperatura', 1, 0, 130);
INSERT INTO dispositivo_iot (id_device, mod_interazione, parametri_connessione, tipo, unita_misura, funzione, stato, manuale, fk_proprieta) VALUES (90, 'mqtt', 'pass012', 'Attuatore', 'lx', 'Luminosità', 1, 0, 130);
INSERT INTO dispositivo_iot (id_device, mod_interazione, parametri_connessione, tipo, unita_misura, funzione, stato, manuale, fk_proprieta) VALUES (91, 'mqtt', 'pass013', 'Attuatore', '%', 'Umidità', 1, 0, 130);
INSERT INTO dispositivo_iot (id_device, mod_interazione, parametri_connessione, tipo, unita_misura, funzione, stato, manuale, fk_proprieta) VALUES (92, 'mqtt', 'pass014', 'Sensore', '°C', 'Temperatura', 1, 0, 130);
INSERT INTO dispositivo_iot (id_device, mod_interazione, parametri_connessione, tipo, unita_misura, funzione, stato, manuale, fk_proprieta) VALUES (93, 'mqtt', 'pass015', 'Sensore', 'lx', 'Luminosità', 1, 0, 130);
INSERT INTO dispositivo_iot (id_device, mod_interazione, parametri_connessione, tipo, unita_misura, funzione, stato, manuale, fk_proprieta) VALUES (94, 'mqtt', 'pass016', 'Sensore', '%', 'Umidità', 1, 0, 130);
INSERT INTO dispositivo_iot (id_device, mod_interazione, parametri_connessione, tipo, unita_misura, funzione, stato, manuale, fk_proprieta) VALUES (95, 'mqtt', 'pass017', 'Attuatore', 'lx', 'Luminosità', 1, 0, 131);
INSERT INTO dispositivo_iot (id_device, mod_interazione, parametri_connessione, tipo, unita_misura, funzione, stato, manuale, fk_proprieta) VALUES (96, 'mqtt', 'pass018', 'Attuatore', '°C', 'Temperatura', 1, 0, 131);
INSERT INTO dispositivo_iot (id_device, mod_interazione, parametri_connessione, tipo, unita_misura, funzione, stato, manuale, fk_proprieta) VALUES (97, 'mqtt', 'pass019', 'Sensore', '°C', 'Temperatura', 1, 0, 131);
INSERT INTO dispositivo_iot (id_device, mod_interazione, parametri_connessione, tipo, unita_misura, funzione, stato, manuale, fk_proprieta) VALUES (98, 'mqtt', 'pass020', 'Sensore', 'lx', 'Luminosità', 1, 0, 131);
INSERT INTO dispositivo_iot (id_device, mod_interazione, parametri_connessione, tipo, unita_misura, funzione, stato, manuale, fk_proprieta) VALUES (99, 'mqtt', 'pass020', 'Sensore', '%', 'Umidità', 1, 0, 131);
INSERT INTO dispositivo_iot (id_device, mod_interazione, parametri_connessione, tipo, unita_misura, funzione, stato, manuale, fk_proprieta) VALUES (100, 'mqtt', 'pass021', 'Attuatore', '°C', 'Temperatura', 1, 0, 132);
INSERT INTO dispositivo_iot (id_device, mod_interazione, parametri_connessione, tipo, unita_misura, funzione, stato, manuale, fk_proprieta) VALUES (101, 'mqtt', 'pass022', 'Sensore', '%', 'Umidità', 1, 0, 132);
INSERT INTO dispositivo_iot (id_device, mod_interazione, parametri_connessione, tipo, unita_misura, funzione, stato, manuale, fk_proprieta) VALUES (102, 'mqtt', 'pass023', 'Attuatore', '°C', 'Temperatura', 1, 0, 133);
INSERT INTO dispositivo_iot (id_device, mod_interazione, parametri_connessione, tipo, unita_misura, funzione, stato, manuale, fk_proprieta) VALUES (103, 'mqtt', 'pass024', 'Attuatore', 'lx', 'Luminosità', 1, 0, 133);
INSERT INTO dispositivo_iot (id_device, mod_interazione, parametri_connessione, tipo, unita_misura, funzione, stato, manuale, fk_proprieta) VALUES (104, 'mqtt', 'pass025', 'Sensore', '%', 'Umidità', 1, 0, 133);
INSERT INTO dispositivo_iot (id_device, mod_interazione, parametri_connessione, tipo, unita_misura, funzione, stato, manuale, fk_proprieta) VALUES (105, 'mqtt', 'pass026', 'Sensore', '°C', 'Temperatura', 1, 0, 133);
INSERT INTO dispositivo_iot (id_device, mod_interazione, parametri_connessione, tipo, unita_misura, funzione, stato, manuale, fk_proprieta) VALUES (106, 'mqtt', 'pass027', 'Attuatore', '°C', 'Temperatura', 1, 0, 134);
INSERT INTO dispositivo_iot (id_device, mod_interazione, parametri_connessione, tipo, unita_misura, funzione, stato, manuale, fk_proprieta) VALUES (107, 'mqtt', 'pass028', 'Sensore', '%', 'Umidità', 1, 0, 134);
INSERT INTO dispositivo_iot (id_device, mod_interazione, parametri_connessione, tipo, unita_misura, funzione, stato, manuale, fk_proprieta) VALUES (108, 'mqtt', 'pass029', 'Attuatore', '°C', 'Temperatura', 1, 0, 135);
INSERT INTO dispositivo_iot (id_device, mod_interazione, parametri_connessione, tipo, unita_misura, funzione, stato, manuale, fk_proprieta) VALUES (109, 'mqtt', 'pass030', 'Attuatore', '%', 'Umidità', 1, 0, 135);
INSERT INTO dispositivo_iot (id_device, mod_interazione, parametri_connessione, tipo, unita_misura, funzione, stato, manuale, fk_proprieta) VALUES (110, 'mqtt', 'pass031', 'Sensore', 'lx', 'Luminosità', 1, 0, 135);
INSERT INTO dispositivo_iot (id_device, mod_interazione, parametri_connessione, tipo, unita_misura, funzione, stato, manuale, fk_proprieta) VALUES (111, 'mqtt', 'pass032', 'Sensore', 'lx', 'Luminosità', 1, 0, 135);
INSERT INTO dispositivo_iot (id_device, mod_interazione, parametri_connessione, tipo, unita_misura, funzione, stato, manuale, fk_proprieta) VALUES (112, 'mqtt', 'pass033', 'Attuatore', '°C', 'Temperatura', 1, 0, 136);
INSERT INTO dispositivo_iot (id_device, mod_interazione, parametri_connessione, tipo, unita_misura, funzione, stato, manuale, fk_proprieta) VALUES (113, 'mqtt', 'pass034', 'Attuatore', 'lx', 'Luminosità', 1, 0, 136);
INSERT INTO dispositivo_iot (id_device, mod_interazione, parametri_connessione, tipo, unita_misura, funzione, stato, manuale, fk_proprieta) VALUES (114, 'mqtt', 'pass035', 'Sensore', '°C', 'Temperatura', 1, 0, 136);
INSERT INTO dispositivo_iot (id_device, mod_interazione, parametri_connessione, tipo, unita_misura, funzione, stato, manuale, fk_proprieta) VALUES (115, 'mqtt', 'pass036', 'Sensore', '%', 'Umidità', 1, 0, 136);
INSERT INTO dispositivo_iot (id_device, mod_interazione, parametri_connessione, tipo, unita_misura, funzione, stato, manuale, fk_proprieta) VALUES (116, 'mqtt', 'pass037', 'Attuatore', 'lx', 'Luminosità', 1, 0, 137);
INSERT INTO dispositivo_iot (id_device, mod_interazione, parametri_connessione, tipo, unita_misura, funzione, stato, manuale, fk_proprieta) VALUES (117, 'mqtt', 'pass038', 'Sensore', '°C', 'Temperatura', 1, 0, 137);

-- Table: misura
CREATE TABLE misura (id_misura INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, data_misurazione DATE NOT NULL, ora_misurazione TIME NOT NULL, valore_misurato REAL NOT NULL, unita_misura STRING NOT NULL, fk_device INTEGER REFERENCES dispositivo_iot (id_device) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL);

-- Table: piano_configurazione
CREATE TABLE piano_configurazione (id_piano INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, condizioni_misure STRING, attuatori_coinvolti STRING NOT NULL, conseguenze STRING NOT NULL, tipo_piano STRING NOT NULL, umidita_da INTEGER, umidita_a INTEGER, tempo_funzionamento INTEGER, temperatura_da REAL, temperatura_a REAL, luminosita_da INTEGER, luminosita_a INTEGER, orario_da TIME NOT NULL, orario_a TIME NOT NULL, fk_proprieta INTEGER REFERENCES proprieta (id_proprieta) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL, fk_utente STRING REFERENCES utente (id_utente) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL);
INSERT INTO piano_configurazione (id_piano, condizioni_misure, attuatori_coinvolti, conseguenze, tipo_piano, umidita_da, umidita_a, tempo_funzionamento, temperatura_da, temperatura_a, luminosita_da, luminosita_a, orario_da, orario_a, fk_proprieta, fk_utente) VALUES (12, 'NULL', 79, 'NULL', 'piano_illuminazione', 'NULL', 'NULL', 'NULL', 'NULL', 'NULL', 15, 30, '18:00', '06:00', 128, '87b872df-799a-44a0-bf08-221111b1c2ab');
INSERT INTO piano_configurazione (id_piano, condizioni_misure, attuatori_coinvolti, conseguenze, tipo_piano, umidita_da, umidita_a, tempo_funzionamento, temperatura_da, temperatura_a, luminosita_da, luminosita_a, orario_da, orario_a, fk_proprieta, fk_utente) VALUES (15, 'NULL', 90, 'NULL', 'piano_illuminazione', 'NULL', 'NULL', 'NULL', 'NULL', 'NULL', 15, 45, '18:00', '03:00', 130, '87b872df-799a-44a0-bf08-221111b1c2ab');
INSERT INTO piano_configurazione (id_piano, condizioni_misure, attuatori_coinvolti, conseguenze, tipo_piano, umidita_da, umidita_a, tempo_funzionamento, temperatura_da, temperatura_a, luminosita_da, luminosita_a, orario_da, orario_a, fk_proprieta, fk_utente) VALUES (16, 'NULL', 96, 'NULL', 'piano_riscaldamento', 'NULL', 'NULL', 'NULL', 0.0, 10.0, 'NULL', 'NULL', '19:09', '06:09', 131, '250f3714-c7b6-40f1-9dce-dccc5074471a');
INSERT INTO piano_configurazione (id_piano, condizioni_misure, attuatori_coinvolti, conseguenze, tipo_piano, umidita_da, umidita_a, tempo_funzionamento, temperatura_da, temperatura_a, luminosita_da, luminosita_a, orario_da, orario_a, fk_proprieta, fk_utente) VALUES (17, 'NULL', 100, 'NULL', 'piano_riscaldamento', 'NULL', 'NULL', 'NULL', 10.0, 19.0, 'NULL', 'NULL', '07:00', '14:00', 132, '250f3714-c7b6-40f1-9dce-dccc5074471a');
INSERT INTO piano_configurazione (id_piano, condizioni_misure, attuatori_coinvolti, conseguenze, tipo_piano, umidita_da, umidita_a, tempo_funzionamento, temperatura_da, temperatura_a, luminosita_da, luminosita_a, orario_da, orario_a, fk_proprieta, fk_utente) VALUES (18, 'NULL', 102, 'NULL', 'piano_irrigazione', 45, 79, 'NULL', 'NULL', 'NULL', 'NULL', 'NULL', '18:14', '18:14', 133, '250f3714-c7b6-40f1-9dce-dccc5074471a');
INSERT INTO piano_configurazione (id_piano, condizioni_misure, attuatori_coinvolti, conseguenze, tipo_piano, umidita_da, umidita_a, tempo_funzionamento, temperatura_da, temperatura_a, luminosita_da, luminosita_a, orario_da, orario_a, fk_proprieta, fk_utente) VALUES (19, 'NULL', 106, 'NULL', 'piano_riscaldamento', 'NULL', 'NULL', 'NULL', 1.0, 7.0, 'NULL', 'NULL', '18:16', '18:16', 134, '9efc0497-d9f1-47e3-a9f3-1fed0796bf6d');
INSERT INTO piano_configurazione (id_piano, condizioni_misure, attuatori_coinvolti, conseguenze, tipo_piano, umidita_da, umidita_a, tempo_funzionamento, temperatura_da, temperatura_a, luminosita_da, luminosita_a, orario_da, orario_a, fk_proprieta, fk_utente) VALUES (20, 'NULL', 109, 'NULL', 'piano_irrigazione', 10, 90, 'NULL', 'NULL', 'NULL', 'NULL', 'NULL', '19:18', '00:18', 135, '9efc0497-d9f1-47e3-a9f3-1fed0796bf6d');
INSERT INTO piano_configurazione (id_piano, condizioni_misure, attuatori_coinvolti, conseguenze, tipo_piano, umidita_da, umidita_a, tempo_funzionamento, temperatura_da, temperatura_a, luminosita_da, luminosita_a, orario_da, orario_a, fk_proprieta, fk_utente) VALUES (21, 'NULL', 112, 'NULL', 'piano_riscaldamento', 'NULL', 'NULL', 'NULL', 10.0, 15.0, 'NULL', 'NULL', '18:21', '15:21', 136, '856c1c9c-a637-43e3-8542-5b4b6b2f43e7');
INSERT INTO piano_configurazione (id_piano, condizioni_misure, attuatori_coinvolti, conseguenze, tipo_piano, umidita_da, umidita_a, tempo_funzionamento, temperatura_da, temperatura_a, luminosita_da, luminosita_a, orario_da, orario_a, fk_proprieta, fk_utente) VALUES (22, 'NULL', 116, 'NULL', 'piano_riscaldamento', 'NULL', 'NULL', 'NULL', 10.0, 20.0, 'NULL', 'NULL', '18:22', '18:22', 137, '856c1c9c-a637-43e3-8542-5b4b6b2f43e7');
INSERT INTO piano_configurazione (id_piano, condizioni_misure, attuatori_coinvolti, conseguenze, tipo_piano, umidita_da, umidita_a, tempo_funzionamento, temperatura_da, temperatura_a, luminosita_da, luminosita_a, orario_da, orario_a, fk_proprieta, fk_utente) VALUES (23, 'NULL', 85, 'NULL', 'piano_riscaldamento', 'NULL', 'NULL', 'NULL', 1.0, 10.0, 'NULL', 'NULL', '14:53', '16:53', 129, '87b872df-799a-44a0-bf08-221111b1c2ab');


COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
