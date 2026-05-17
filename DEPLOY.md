# Deploying White Cherry Cottages

This site is a plain static folder — no build step required. Below is the one-time setup to put it live and let the owner edit content via `/admin/`.

## 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin git@github.com:YOUR-ORG/white-cherry-cottages.git
git push -u origin main
```

## 2. Connect to Netlify

1. Go to <https://app.netlify.com/> → **Add new site** → **Import an existing project**.
2. Pick the GitHub repo.
3. Build settings: leave **Build command** blank and set **Publish directory** to `.` (or trust `netlify.toml`).
4. Click **Deploy**.

Once it's live, note your `*.netlify.app` URL and update `site_url` / `display_url` in `admin/config.yml` to match (or, after step 4, your custom domain).

## 3. Enable Netlify Identity

In the Netlify site dashboard:

1. **Site configuration → Identity → Enable Identity**.
2. **Registration**: set to **Invite only** (so only invited team members get an account).
3. **External providers** (optional): enable Google if the owner prefers Google login.
4. **Services → Git Gateway → Enable Git Gateway**. (This is what lets Decap commit edits.)

## 4. Invite the owner

Identity → **Invite users** → enter the owner's email. They receive a confirmation link, set a password, and can then log in at `https://your-site.netlify.app/admin/`.

## 5. Forms

The contact page uses Netlify Forms. The hidden form block at the bottom of `contact.html` is what Netlify scans at deploy time — once deployed, submissions appear under **Site → Forms** in Netlify and are emailed if you configure a notification.

## 6. Verifying

- Visit the site root — every page should render.
- Visit `/admin/` — log in, change the announcement bar text, save. A commit should appear on `main` within seconds; Netlify rebuilds and the change goes live in under a minute.

## Updating images later

The owner can upload images directly through the CMS (they land in `assets/img/uploads/`). The bundled placeholders in `assets/img/placeholders/` can be replaced 1-to-1 by dropping real photos in with the same filenames — no JSON edits needed.
