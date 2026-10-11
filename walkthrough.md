# Walkthrough

## 2026-10-11 (Resizable swimlane header column)

- Findings: In de swimlane-weergave had de eerste kolom (de swimlane-header) een vaste breedte van `w-44` (176px). Lange namen werden afgekapt ("Techni..."), waardoor rijen niet meer leesbaar te koppelen waren aan hun swimlane.
- Conclusions: Een sleepbare resize-handle op de rand van de eerste kolom is de minst ingrijpende oplossing: de lijstkolommen (vaste kanban-breedtes van `w-72`) blijven ongemoeid en de gebruiker bepaalt zelf hoeveel ruimte de namen krijgen. Breedte wordt per browser onthouden via localStorage (`tabla.swimlaneHeaderWidth`), met een dubbele klik op de handle als reset naar 176px. Grenzen 120–420px voorkomen een onbruikbare layout.
- Actions: `src/components/SwimlaneBoard.tsx` — constante + `readStoredHeaderWidth()` toegevoegd (default/min/max), `headerWidth`-state met localStorage-persistentie, `startHeaderResize` (muis-drag) en `setHeaderWidthClamped`; `w-44` op de row-header vervangen door inline `width: headerWidth`; spacer in de kolomkop ook op `headerWidth`; absolute resize-handle (met `role="separator"`, aria-valuenow/min/max, pijltjestoetsen en dubbelklik-reset) over de volledige boardhoogte in de marge tussen kolom 1 en de kaartkolommen. `npm run build` groen. Tevens `walkthrough.md` aangemaakt (protocol). Nog te overwegen: dezelfde resize voor de lijstkolommen.
