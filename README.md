# Term by Term: WEBPROG Activity 3 blog

A ten-article blog about my second year of BSIT at Asia Pacific College, built for Web Programming (WEBPROG): CSS Grid and a mobile-first layout.

**Live site:** https://evanexanes.github.io/webprog-activity3-term-by-term/

**Pages:** Home, Articles, About, and ten article pages (13 in all). Every article starts from work I handed in and says which.

## What the activity asked for
- **CSS Grid** for the page layouts: a 12-column grid for the Home hero, a two-column article page (text and aside), and Grid tiles for the course map.
- **Mobile friendly** from 320 px up: one column on a phone, two at tablet width, the full grid from 960 px. No sideways scrolling, 44 px tap targets, and text never smaller than 12 px.
- **Phone menu:** below 640 px the links move into a drawer opened by a hamburger button. It traps focus, closes on Escape, and returns focus to the button. With JavaScript off, the links stay in the header.

## Design
Cream canvas, black Outfit headings, hairline rules and the denim gradient used sparingly, the same system as my portfolio. Every image is a screenshot of my own work or a card made from numbers in the article. One light theme at every width, with no theme switch.

## Run it
No build step and no framework. Download the folder and open `index.html` in a browser. Keep `fonts/` and `images/` next to the HTML files, because the pages load them by relative path.

Outfit and Inter are bundled in `fonts/` (both under the SIL Open Font License), so the pages make no network requests. The only script is `menu.js`, the phone menu.

## Source file headers
Every HTML, CSS and JavaScript file opens with a header block: program name, description, author, date compiled and a change history. A commit that changes a file adds a row to its history.
