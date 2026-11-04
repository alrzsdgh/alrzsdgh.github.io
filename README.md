# alrzsdgh.github.io

Personal academic website of **Alireza Sadeghi**, Ph.D. student in Electrical Engineering at Clemson University.

Plain HTML, CSS and JavaScript. No build step, no framework, so GitHub Pages serves it as is.

```
index.html                      all page content (edit this to update the site)
style.css                       design, colors, light/dark theme
main.js                         dark-mode toggle, publication filters, small animations
assets/Alireza_Sadeghi_CV.pdf   the CV linked from the site
.nojekyll                       tells GitHub Pages to serve the files without Jekyll
```

## Put it online with GitHub Pages (about 5 minutes)

1. **Create the repository.** On GitHub, click **New repository** and name it exactly
   `alrzsdgh.github.io` (your username followed by `.github.io`). Make it **Public**.
   Don't add a README.
2. **Upload the files.** Either drag-and-drop everything in this folder (except `CV.pdf`
   and `.claude/`) onto the repository page with **Add file → Upload files**, or use git:

   ```bash
   cd C:\Users\alirezs\Desktop\Intern\Website
   git init
   git add index.html style.css main.js README.md .nojekyll .gitignore assets
   git commit -m "Personal website"
   git branch -M main
   git remote add origin https://github.com/alrzsdgh/alrzsdgh.github.io.git
   git push -u origin main
   ```
3. **Turn on Pages.** In the repository go to **Settings → Pages**. Under *Build and
   deployment* choose **Deploy from a branch**, branch **main**, folder **/ (root)**, then **Save**.
4. **Visit** <https://alrzsdgh.github.io> after a minute or two.
   The **Actions** tab shows deployment progress.

### Optional
- **Custom domain** (e.g. `alirezasadeghi.com`): buy it from any registrar, add it under
  **Settings → Pages → Custom domain**, and point DNS at GitHub as described in
  [GitHub's guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site). Tick **Enforce HTTPS**.
- **Google Scholar / LinkedIn:** set your Scholar "Homepage" and LinkedIn "Website" to the new URL.
- **Search engines:** submit the URL in [Google Search Console](https://search.google.com/search-console).

## Updating the site

Edit `index.html` and push (or edit the file directly on GitHub and commit). The live site updates in about a minute.

- **Add your portrait to the hero:** save a photo of yourself, ideally on a dark background, as
  `assets/hero.jpg`. It appears on the right side of the black hero section automatically; no code change needed.
- **Typing words in the hero:** edit the `words` list in `main.js`.
- **Skill bars:** edit the percentages (`--w:95%` and the `95%` label) in the About section of `index.html`.
- **New paper:** copy one `<li class="pub" …>` block in the Publications section and edit it.
  The `data-tags` value (`causal`, `health`, `review`) controls which filter buttons show it.
- **News:** add an `<li>` at the top of the News list.
- **Citation numbers:** update the numbers in the stats bar (`data-count` and the text) and the "Google Scholar, …" date.
- **New CV:** replace `assets/Alireza_Sadeghi_CV.pdf`, keeping the same file name.

## Preview locally

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>.
