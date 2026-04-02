# Design Tokens

Denna fil är repoets källa för färg-, typografi- och interaktionspolicy. Ändra tokenvärden här först och synka sedan CSS-användning mot de semantiska tokennamnen i `color-tokens.css`.

## Typografi
- Rubriker använder `Raleway` via `--font-heading`.
- Löpande text, formulär, labels, CTA-text och små UI-element använder `Inter` via `--font-body`.
- Små UI-labels och kicker/eyebrow använder body-font i versaler, inte heading-font.
- Displayvärden och egentliga rubriker får använda heading-font när de fungerar som rubrik/visuell fokuspunkt.

## Typografiska beslut att hålla centrala
- `--font-heading`, `--font-body`
- vikter för body, labels, CTA och rubriker
- line-height och letter-spacing för heading respektive body
- fallback-kedjor om webbfont inte laddas

## Varumärkesfärger
- Primär accent: `#6F00FF`
- Sekundär färg: `#D6BA55`

## Skalor
### Primär skala
- `--brand-primary-50`: `#F5EFFF`
- `--brand-primary-100`: `#EDE5FF`
- `--brand-primary-200`: `#D8C2FF`
- `--brand-primary-500`: `#6F00FF`
- `--brand-primary-700`: `#5300C8`

### Sekundär skala
- `--brand-secondary-50`: `#FCF8EB`
- `--brand-secondary-100`: `#F5EDD0`
- `--brand-secondary-200`: `#EADCA7`
- `--brand-secondary-300`: `#D6BA55`
- `--brand-secondary-600`: `#8E7426`
- `--brand-secondary-700`: `#725C1C`
- `--brand-secondary-800`: `#5B4916`

## Användningsregler
- Bakgrunder och större ytor ska använda ljusa toner från den sekundära skalan.
- Rubriker och kicker-element får använda mörkare accenter från den sekundära skalan.
- CTAs ska alltid använda primär färg för bakgrund och interaktiv accent.
- Länkar ska alltid använda primär färg.
- När en komponent behöver både bakgrund och interaktiv markering ska bakgrunden komma från sekundär skala och interaktiv markering från primär skala.

## Semantiska tokens
- `--color-bg-*`: bakgrunder och ytor, baserade på sekundär skala
- `--color-heading-accent`: rubrikaccenter och kicker-element
- `--color-link`, `--color-link-hover`: alla länkar
- `--color-cta-*`: alla CTA-knappar
- `--color-primary-*`: fokus, interaktiva borders och primär skugga
- `--color-secondary-*`: sekundära overlays, borders och glows
- `--font-*`: rubrik- och body-typografi
- `--color-interactive-*`, `--shadow-interactive-*`: hover, focus, selected och pressed för interaktiva ytor

## Interaktionsregler
- Primär färg betyder alltid handling eller vald/interaktiv status.
- CTAs använder full primär fyllning.
- Valda ytor använder primär border, lätt primär toning och en intern accent, men ska inte se ut som fulla CTA-knappar.
- Hover och focus ska vara visuellt släkt med selected state men svagare än selected.
- Samma state-språk ska återanvändas för basis-val, tabellmarkeringar och andra valbara ytor.

## Ändringsprincip
- Justera först brand scales i `color-tokens.css`.
- Justera fontfamiljer, vikter och state-intensitet i samma fil innan komponent-CSS ändras.
- Behåll semantiska tokennamn stabila så att komponentkod inte behöver skrivas om när paletten justeras.
- Lägg inte till nya hårdkodade hexvärden i HTML eller komponentregler om en semantisk token räcker.
