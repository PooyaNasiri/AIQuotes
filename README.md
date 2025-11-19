# AIQuotes — AI-powered Quote Gallery ✨

![AIQuotes Demo](https://img.shields.io/badge/demo-GitHub%20Pages-blue?logo=github&style=flat) ![License](https://img.shields.io/badge/license-See%20repo-lightgrey?style=flat) ![Status](https://img.shields.io/badge/status-active-brightgreen?style=flat)

Live demo → https://pooyanasiri.github.io/AIQuotes/

A minimal, elegant web app that presents AI-generated quotes in a beautiful, responsive gallery. Perfect for inspiration, sharing, and embedding on personal sites or demos.

Table of Contents
- Features
- Demo & Screenshots
- What’s New
- Installation & Local Development
- Build & Deploy
- Usage
- Customization
- Contributing
- License & Contact

Features
- Clean, responsive UI with a gallery layout
- AI-generated quotes curated for readability and shareability
- Copy and share quotes with one click
- Theme support: light and dark modes
- Fast, minimal footprint (ideal for GitHub Pages)
- Designed for accessibility and mobile-first responsiveness

Demo & Screenshots
- Live demo: https://pooyanasiri.github.io/AIQuotes/
- Visit the demo to see the latest UI, interactions, and theme toggling in action.

What’s New
- README refreshed and rewritten to match the updated codebase
- Demo link added and highlighted for easy access
- Documentation now reflects recent UI/UX and theme enhancements
- If you added or removed features beyond these (custom build scripts, new CLI commands, extra dependencies), let me know and I’ll update the instructions accordingly.

Installation & Local Development
1. Clone the repo
   git clone https://github.com/PooyaNasiri/AIQuotes.git
   cd AIQuotes

2. Install dependencies (if the project uses a package manager)
   npm install
   # or
   yarn

3. Start the development server
   npm run dev
   # or
   yarn dev

Notes:
- If this repository is a static HTML/CSS/JS site, you can preview it with a static server:
  npx serve .

Build & Deploy
- Build for production (if applicable)
  npm run build
  # or
  yarn build

- Deploy to GitHub Pages
  You can use GitHub Pages (the demo above is hosted there). If you use the `gh-pages` package:
  npm run deploy
  # or follow your chosen GitHub Actions workflow

Usage
- Browse the gallery and click any quote to copy or share.
- Toggle between light and dark themes using the theme switch in the top-right (demo).
- Use the demo to check behavior on different screen sizes.

Customization
- Theme colors and typography can be updated via the CSS variables (check the main stylesheet).
- To add/remove quotes or hook up your own quote generator, update the data source in src/data (or the equivalent file — search for "quotes" or "data" in the codebase).

Contributing
Contributions are welcome! A suggested workflow:
- Fork the repo
- Create a feature branch: git checkout -b feat/some-feature
- Make your changes, run tests / lint if present
- Commit and open a pull request

Please open an issue for feature requests or bug reports first so we can discuss scope and design.

Suggested commit message when applying this README:
"chore: refresh README — highlight demo and reflect recent UI updates"

License & Contact
- See the repository for license details.
- Author: Pooya Nasiri — https://github.com/PooyaNasiri

Acknowledgements
- Thanks to the contributors and to the open-source community for libraries and inspiration.

Enjoy the demo: https://pooyanasiri.github.io/AIQuotes/