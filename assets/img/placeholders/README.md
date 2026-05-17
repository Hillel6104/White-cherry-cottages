# Placeholder images

Drop real photos into this folder using the exact filenames below to replace the placeholders without touching any JSON. (Owners can also upload via the CMS — Decap saves to `assets/img/uploads/`, and the JSON `image` fields are pointed at the new file automatically.)

If a file is missing, the site falls back to a soft wood-tone gradient via `wccImgFallback()` in `assets/js/site.js` — pages still look intentional, just without photography.

## Expected filenames

### Home
- `hero.jpg` — full-bleed hero image (recommended 2400×1500, JPG, <400 KB)
- `welcome.jpg` — welcome section inset (1200×960)
- `teaser-cabins.jpg`, `teaser-amenities.jpg`, `teaser-gallery.jpg` — home page teaser cards (1200×900)

### Cabins (2 photos each)
- `cabin-birch-1.jpg`, `cabin-birch-2.jpg`
- `cabin-maple-1.jpg`, `cabin-maple-2.jpg`
- `cabin-cedar-1.jpg`, `cabin-cedar-2.jpg`
- `cabin-pine-1.jpg`, `cabin-pine-2.jpg`
- `cabin-spruce-1.jpg`, `cabin-spruce-2.jpg`
- `cabin-hemlock-1.jpg`, `cabin-hemlock-2.jpg`
- `cabin-aspen-1.jpg`, `cabin-aspen-2.jpg`
- `cabin-willow-1.jpg`, `cabin-willow-2.jpg`
- `cabin-chestnut-1.jpg`, `cabin-chestnut-2.jpg`
- `cabin-sycamore-1.jpg`, `cabin-sycamore-2.jpg`
- `cabin-juniper-1.jpg`, `cabin-juniper-2.jpg`
- `cabin-linden-1.jpg`, `cabin-linden-2.jpg`
- `cabin-beech-1.jpg`, `cabin-beech-2.jpg`
- `cabin-oak-1.jpg`, `cabin-oak-2.jpg`
- `cabin-hickory-1.jpg`, `cabin-hickory-2.jpg`
- `cabin-dogwood-1.jpg`, `cabin-dogwood-2.jpg`

Recommended size for cabin photos: 1600×1200 (4:3), JPG.

### Gallery
- `gallery-1.jpg` through `gallery-12.jpg` — vary the aspect ratios; the masonry layout looks best with a mix of portrait and landscape.

## Notes

- JPG is preferred over PNG for photographs (smaller file size).
- Keep each file under ~500 KB so the site stays fast.
- All paths in the JSON files start with `/assets/img/placeholders/` — if you move images elsewhere, update the JSON.
