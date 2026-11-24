# Il Sistema — Via del Fulmine

Web app personale in stile *Solo Leveling* per tracciare i progressi nel kenjutsu:
livelli e ranghi, 5 statistiche (FOR, VEL, RES, TEC, DIS), Daily Quest, Main Quest del peso,
diario di lezione con Quest Correttive, registro kata e i 10 stadi della Via del Fulmine fino a Raijin.

## Installazione su iPhone
1. Apri il sito in **Safari**.
2. Tocca **Condividi → Aggiungi alla schermata Home**.
3. Apri sempre l'app dall'icona: i dati sono salvati solo su quel dispositivo.

## Dati
- Tutto resta nel `localStorage` del telefono, niente viene inviato a server.
- Usa **Sistema → Esporta** per salvare una copia (Salva su File / iCloud Drive) e **Importa** per ripristinarla.

## File
- `index.html` — l'app completa (HTML, CSS e JavaScript)
- `manifest.json` — dati per l'installazione sulla schermata Home
- `sw.js` — service worker per l'uso offline
- `icons/` — icone dell'app
