# 🥐 Bakery Website

A modern, fully responsive static website for a local bakery shop.

## Features

- **Sticky Navbar** with smooth scrolling and mobile hamburger menu
- **Hero Section** with animated blob image and floating badges
- **About Section** with bakery story and features
- **Menu/Products Section** with category filters and WhatsApp order buttons
- **Special Orders Section** (Birthday, Wedding, Custom Cakes, Party Orders)
- **Gallery Section** with lightbox viewer
- **Contact Section** with Google Maps embed
- **Floating WhatsApp Button** with pulse animation
- **Back to Top Button**
- **Footer** with social links and quick navigation

## Tech Stack

- HTML5
- CSS3 (Custom Properties, Grid, Flexbox, Animations)
- Vanilla JavaScript (ES6+)

## Deployment

### Vercel
1. Push to GitHub
2. Import repo on vercel.com
3. Deploy (automatic static detection)

### Netlify
1. Push to GitHub
2. New site from Git on netlify.com
3. Deploy (no build command needed)

### GitHub Pages
1. Push to GitHub
2. Go to Settings → Pages
3. Set source to main branch / root

## WhatsApp Integration

All order buttons use the format:
```
https://wa.me/918000920738?text=Hello%20Bakery%2C%20I%20want%20to%20order%20[Product]
```

## Customization

- **Colors**: Edit CSS variables in `style.css` `:root` section
- **Products**: Add/edit product cards in `index.html` menu section
- **WhatsApp Number**: Replace `918000920738` globally in `index.html`
- **Images**: Add local images to `/images/` folder and update `src` in HTML

## License
© 2026 Bakery. All Rights Reserved.
