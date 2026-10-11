# Walkthrough

## 2026-10-11 (Resizable swimlane header column)

- Findings: In de swimlane-weergave had de eerste kolom (de swimlane-header) een vaste breedte van `w-44` (176px). Lange namen werden afgekapt ("Techni..."), waardoor rijen niet meer leesbaar te koppelen waren aan hun swimlane.
- Conclusions: Een sleepbare resize-handle op de rand van de eerste kolom is de minst ingrijpende oplossing: de lijstkolommen (vaste kanban-breedtes van `w-72`) blijven ongemoeid en de gebruiker bepaalt zelf hoeveel ruimte de namen krijgen. Breedte wordt per browser onthouden via localStorage (`tabla.swimlaneHeaderWidth`), met een dubbele klik op de handle als reset naar 176px. Grenzen 120–420px voorkomen een onbruikbare layout.
- Actions: `src/components/SwimlaneBoard.tsx` — constante + `readStoredHeaderWidth()` toegevoegd (default/min/max), `headerWidth`-state met localStorage-persistentie, `startHeaderResize` (muis-drag) en `setHeaderWidthClamped`; `w-44` op de row-header vervangen door inline `width: headerWidth`; spacer in de kolomkop ook op `headerWidth`; absolute resize-handle (met `role="separator"`, aria-valuenow/min/max, pijltjestoetsen en dubbelklik-reset) over de volledige boardhoogte in de marge tussen kolom 1 en de kaartkolommen. `npm run build` groen. Tevens `walkthrough.md` aangemaakt (protocol). Nog te overwegen: dezelfde resize voor de lijstkolommen.

## 2026-10-11 (Alle kolommen in de swimlane-weergave resizebaar)

- Findings: Na de eerste kolom wilde Bo ook de lijstkolommen kunnen verbreden; die stonden op een vaste `w-72` (288px), dus lange lijstnamen en brede kaarten bleven krap.
- Conclusions: Dezelfde aanpak als de eerste kolom, maar dan per lijst: breedtes in een `Record<listId, number>` (default 288px, min 200, max 560), bewaard in localStorage onder `tabla.swimlaneListWidths`. Omdat de grid rij-gebaseerd is (elke swimlane is een rij met cellen), kunnen de grepen niet in de kolom zelf hangen — hun hoogte zou dan beperkt blijven tot de kolomkop. Daarom wordt de x-positie van elke kolom uitgerekend (`headerWidth + COL_GAP + som van voorgaande breedtes + gaps`, met `COL_GAP = 12` gelijk aan `gap-3`) en staat er per kolom één absoluut gepositioneerde greep over de volle boardhoogte. De sleep- en toetsenbordlogica is gedeeld in `startResize` en de nieuwe `ColumnResizer`-component.
- Actions: `src/components/SwimlaneBoard.tsx` — constanten `LIST_COL_*`, `COL_GAP` en `clamp()`, `readStoredListWidths()` met validatie, state `listWidths`/`resizingListId`, `listWidth()`, `setListWidthClamped()`, generieke `startResize()` waar `startHeaderResize` en `startListResize` op voortbouwen, `ColumnResizer`-component, `listColumns`-berekening, en `w-72` vervangen door inline `width` op zowel de kolomkoppen (`pl-1 pr-2` voor ruimte naast de greep) als de rij-cellen. `npm run build` groen. Nog te overwegen: dezelfde resize in de lijstweergave (`ListView`).

## 2026-10-11 (Startbreedte kolom 1 naar 250px)

- Findings: Bo wil dat de swimlane-headerkolom standaard breder is; 176px was te krap voor langere namen.
- Conclusions: `HEADER_COL_DEFAULT` van 176 naar 250px. De min (120) en max (420) blijven gelijk, en de dubbelklik-reset op de greep zet de kolom nu ook op 250px. Een eerder opgeslagen breedte in localStorage (`tabla.swimlaneHeaderWidth`) blijft voorgaan — wie de kolom al handmatig heeft gezet, houdt die waarde.
- Actions: `src/components/SwimlaneBoard.tsx` — `HEADER_COL_DEFAULT = 250`. `npm run build` groen.

