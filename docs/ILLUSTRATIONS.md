# ILLUSTRATIONS.md — the building drawing

## Files (`assets/illustrations/`)
| File | Use |
|---|---|
| `building-iso-dark.svg` | Hero (Ink background). Paper lines, Spark thread. |
| `building-iso-light.svg` | Paper sections, OG image, print. Standalone: has its own background. |
| `building-iso-inline.svg` | Inline it in the page (paste the markup). Colours come from CSS variables `--ink --paper --spark`, so one file serves light and dark sections. No background rect. |
| `preview-*.png` | Quick look only. Do not ship. |
| `tools/gen-building-iso.py` | Generator (Python, no deps). Change spacing, furniture, colours, then re-run. |

An exploded isometric drawing of the three floors with a pitched roof drawn as a wireframe. Line art only, three colours, no text except the floor letters G / 1 / 2. It contains no measurements or numbers on purpose: do not add any.

## What is drawn (all illustrative, from the founder's plan)
- G: six small-group pods with a guide, a short stair.
- 1: silent hall desks, two glass discussion rooms, café tables by the stair.
- 2: founder desks, a prototype bench, a wall screen.
- A single Spark line with three nodes runs G -> 1 -> 2: one person moving between floors (the Thread).

## Groups you can target (ids)
`#site` `#floor-g` `#floor-1` `#floor-2` `#columns-*` `#roof` `#thread` `#labels` (delete `#labels` if you want zero text; the file works without it).

## Active-floor behaviour (CSS only)
```css
.building .floor { opacity: .28; transition: opacity .4s ease; }
.building:not([data-active]) .floor,
.building[data-active="g"] #floor-g,
.building[data-active="1"] #floor-1,
.building[data-active="2"] #floor-2 { opacity: 1; }
.building[data-active="g"] #roof, .building[data-active="1"] #roof { opacity: .35; }
@media (prefers-reduced-motion: reduce) { .building .floor { transition: none; } }
```
Dark section: `.dark .building { --ink:#F3EEE4; --paper:#15130F; --spark:#D9481F; }`
Set `data-active` from the floor gauge / scroll-spy. Status chips (LIVE NOW / OPENING NEXT / DIRECTION) are HTML next to each floor, not inside the SVG.

## Thread draw-on-scroll (progressive enhancement)
```js
const p = document.querySelector('.building #thread path');
if (p && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const L = p.getTotalLength();
  p.style.strokeDasharray = L; p.style.strokeDashoffset = L;
  // on scroll progress t in [0,1]: p.style.strokeDashoffset = L * (1 - t);
}
```
No JS = the full thread is shown.

## Layout
Aspect about 3:4 (tall). Hero: right column, ~560 px wide, text left. Mobile: full width under the headline. On the Building page: sticky on the left, text scrolls on the right.

## Rules
- Do not redraw it with an LLM. Edit the generator or ask for a new variant.
- Do not add text, numbers, dimensions, brand names or people photos to it.
- Test in a real browser that the inline version picks up `--ink/--paper/--spark` (they are set via `var()` in SVG attributes). If a browser ignores them, switch to a `<style>` block with classes.
- A real 3D (three.js) version is optional later. Not now: weight on phones and slow connections, and no accessibility benefit over this drawing.
