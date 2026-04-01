# ROI Calculator

En ROI-kalkylator för Superintelligent med svensk och engelsk språkversion.

## Syfte
Detta repo används för att bygga en lätt, snabb och tydlig kalkylator som kan publiceras som en egen sida eller under en subdomän.

## Innehåll
- `index.html` och `index.js` är den svenska, kanoniska källversionen
- `en/index.html` och `en/index.js` är den engelska spegelversionen
- delad logik och delat innehåll ligger i gemensamma moduler i repo-roten
- inga beroenden krävs för att komma igång

## Arbetsmodell
- svenska versionen är source of truth för produkt, design, copy och logik
- ändringar i svenska versionen ska speglas i engelska versionen i samma uppgift
- `/` och `/en/` ska hållas funktionellt och strukturellt parallella

## Nästa steg
- förbättra designen vidare utan att bryta språkparitet
- lägga till fler indatafält om kalkylatorns modell utökas
- koppla formulär till lead capture
- publicera via GitHub Pages

## Lokal användning
Öppna `index.html` direkt i webbläsaren eller kör en enkel lokal server.

## Publicering
Detta repo kan publiceras via GitHub Pages och kopplas till en egen subdomän, till exempel:
- `roi.superintelligent.se`

## Status
Aktiv tvåspråkig kalkylator
