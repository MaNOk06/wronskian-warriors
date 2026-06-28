# Wronskian Geniuses website

A multi-page site about the damped mass-spring-damper system, built for a MATH251 project. Plain HTML, CSS and JavaScript, with no build step and no framework. Every interactive graph is solved live in the browser with a fourth-order Runge-Kutta method.

## Pages
- `index.html` : home, with the problem definition, assumptions, full derivation, and links to the model and analysis
- `model.html` : the derivation, a comparison of our derivation with the original paper, and the four damping regimes
- `analysis.html` : the four cases, the replication of Krcheva (2024), the interactive sensitivity analysis, and the phase plane
- `team.html` : the team and contact
- `resources.html` : the original paper, our report, and the project code
- `favicon.svg` : the browser-tab icon

## Run it on your computer
Use a local server so the shared menu, the scripts and the stylesheet all load. Open the project folder in VS Code and use Live Server, or run:
```
python3 -m http.server 8000      then visit http://localhost:8000
```
Make sure `index.html`, the `css` folder and the `js` folder all sit together in the same folder you are serving.

## Put it online with Vercel
1. Put the contents of this folder at the top level of a Git repository, so `index.html`, `css` and `js` are at the repository root (not inside an extra folder).
2. On vercel.com choose Add New, then Project, and import the repository. Framework Preset: Other. Build command: empty. Output directory: root.
3. Deploy. If the styles do not load on Vercel, it almost always means the files are one folder too deep in the repository; either flatten them, or in Vercel set Settings, Build and Output, Root Directory to the folder that contains `index.html`.

## The replication comparison (figures)
The analysis page shows a case-by-case comparison: our own live graph on the left, and the matching MATLAB figure on the right. The figure images live in the `assets` folder next to `index.html`:
- `assets/fig4.png` : undamped, c = 0
- `assets/fig5.png` : underdamped, c = 2
- `assets/fig6.png` : critically damped, c = 8
- `assets/fig7.png` : overdamped, c = 10 (not added yet)

To add the overdamped figure: export it from MATLAB, save it as `assets/fig7.png`, then in `analysis.html` find the comment that begins "When you export the overdamped MATLAB figure" and replace the `<div class="repl-slot"> ... </div>` below it with:
`<img class="repl-img" src="assets/fig7.png" alt="MATLAB figure for the overdamped case">`

To swap any figure for the paper's own published plot instead of the MATLAB one, just replace that image file in `assets` (keep the same name).

## Changing the font (set up to be easy)
Headings use **Fredoka** and body text uses **Nunito**. To try another font, change two places.

1. In `css/style.css`, near the top, edit:
```css
--display: "Fredoka", "Trebuchet MS", system-ui, sans-serif;   /* headings */
--body:    "Nunito", system-ui, -apple-system, "Segoe UI", sans-serif; /* body text */
```
2. In the `<head>` of every HTML page, swap the Google Fonts link so the new fonts load. The current line is:
```html
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
```

Ready made sets (CSS values, then the family part for the link):
- Bubble (current): `"Fredoka"` + `"Nunito"` ; `family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800`
- Rounder: `"Baloo 2"` + `"Nunito"` ; `family=Baloo+2:wght@400;500;600;700&family=Nunito:wght@400;600;700`
- Soft and modern: `"Quicksand"` + `"Inter"` ; `family=Quicksand:wght@400;500;600;700&family=Inter:wght@400;500;600`
- Clean: `"Poppins"` + `"Karla"` ; `family=Poppins:wght@400;500;600;700&family=Karla:wght@400;500;700`
- Academic serif: `"Fraunces"` + `"Atkinson Hyperlegible"` ; `family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Atkinson+Hyperlegible:wght@400;700`

Keep the `&family=IBM+Plex+Mono:wght@400;500&display=swap` bit at the end of the link so the small code labels still render.

## Other easy edits
- **Team names, roles and emails:** in `team.html` (the addresses are placeholders).
- **Colours:** all colours live at the top of `css/style.css` under `:root`.
- **The menu:** defined once in the `NAV` list inside `js/components.js`.
