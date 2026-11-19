# Big Rock Exchange - Website Content Guide (Hinglish)

Yeh guide client/team ke liye hai. Website ka design, layout aur code change karne ke liye developer chahiye, lekin **daily content** (banner, game, contact number, FAQ, SEO text, demo ID) aap khud edit kar sakte ho.

---

## 1. Website kaise kaam karti hai

- Website **Next.js** se bani hai aur build hone ke baad pure **static website** hoti hai.
- Saara editable content `content/` folder ki JSON files mein hai.
- Images `public/` folder mein hain; CMS se upload karne par nayi images `public/uploads/` mein jaati hain.
- Website ko do tareeke se edit kar sakte ho:
  1. **CMS (recommended)** - form bharne jaisa easy interface.
  2. **JSON file direct** - sirf technical person ke liye.
- Edit karne ke baad website ko dobara **build** karna padta hai. Build command: `npm run build`.

> Important: `content/` ke bahar ka code, CSS, layout ya components change mat karo. Woh developer ka kaam hai.

---

## 2. WhatsApp aur Telegram links

Website par ab yeh links live hain:

- **WhatsApp:** `https://walink.ai/bigrockweb`
- **Telegram:** `https://t.me/bigrockexchangeofficial`

1. CMS mein **Site settings -> Brand, contact, navigation & footer** kholo.
2. **Contact links** section mein yeh 2 fields update karo:
   - **WhatsApp (betting ID)**
   - **WhatsApp (support)**
3. Dono WhatsApp fields mein `https://walink.ai/bigrockweb` paste karo. Dono buttons same WhatsApp destination use karte hain.
4. WhatsApp number change karna ho to `walink.ai` par link update karo, ya naya link in dono fields mein paste karo.
5. Telegram field mein `https://t.me/bigrockexchangeofficial` hona chahiye.

Yeh links website ke header, sidebar, footer, payment section, floating button aur mobile bar - sab jagah use hote hain.

**Launch se pehle dono WhatsApp fields aur Telegram link check karna zaroori hai.** Agar dobara koi placeholder number daala, build warning degi.

---

## 3. CMS kaise kholein (local computer par)

Do terminal kholo.

**Terminal 1 - website:**
```bash
npm install
npm run dev
```

**Terminal 2 - CMS backend:**
```bash
npm run cms
```

Ab browser mein kholo:

```text
http://localhost:3000/admin/index.html
```

`Login` button dabao. Local mode mein username/password nahi maangta. Login ke baad left side mein saari collections dikhengi.

> Production build mein URL `/admin/` hota hai. Static hosting server ko `admin/index.html` serve karna chahiye.

---

## 4. CMS se content edit karne ka tareeka

1. Left menu se collection chuno (jaise **Homepage banners**).
2. Entry kholo.
3. Form mein change karo.
4. Top-right **Publish** dabao.
5. Local mode mein file turant `content/` mein save hoti hai.
6. Website par change dekhne ke liye build karo:

```bash
npm run build
```

Build ke baad `out/` folder hosting par upload karna hota hai.

### Production CMS login

Abhi CMS config `git-gateway` backend use karta hai. Production mein edit karne ke liye hosting par **git repository + Netlify Identity/Git Gateway** (ya compatible auth) setup karna padega. Hosting decide hone ke baad hi final login URL milega.

Agar simple username/password chahiye, developer `config.yml` mein backend change kar sakta hai.

---

## 5. Kaunsi file kya control karti hai

| CMS Collection | File | Kya edit hota hai |
| --- | --- | --- |
| Site settings | `content/site.json` | Brand name, logo, contact links, header, sidebar, footer, announcement, page SEO |
| Homepage banners | `content/banners.json` | Hero banner slides, images, links |
| Promo slider | `content/promos.json` | Offers section ke slides |
| Category tiles | `content/categories.json` | Casino, Sportsbook, Sports, Poker etc. cards |
| Games & wins | `content/games.json` | Top Games, Originals, Hot, Slots, Live, Bingo rails + Recent Big Wins |
| Inplay matches | `content/matches.json` | Cricket/Football/Tennis matches aur odds ke base values |
| Demo accounts | `content/demo-accounts.json` | Demo ID/password cards, logos, sites |
| Payment methods | `content/payments.json` | UPI, Paytm, PhonePe etc. logos |
| Section headings & buttons | `content/sections.json` | Section titles, button labels, filters, tab labels |
| How it works steps | `content/steps.json` | 4 steps ka text |
| Why Big Rock | `content/trust.json` | Trust/feature cards |
| FAQs | `content/faqs.json` | Questions aur answers |
| SEO article | `content/seo.json` | Neeche wala long SEO article aur block types |

---

## 6. Images kaise upload karein

1. CMS mein **Media** kholo.
2. Image upload karo.
3. Field ke saamne **Choose image** dabao aur uploaded image select karo.
4. **Width** aur **Height** fields mein image ke actual pixels likho. Isse layout stable rehta hai.
5. Image ka path `/uploads/...` se start hona chahiye. Existing images ke paths jaise `/Banner/01.png` bhi chalte hain.

Recommended sizes:

- **Banners:** approx `2172 x 634`
- **Promo slides:** approx `1774 x 887`
- **Game artwork:** portrait, approx `960 x 1280` (3:4)
- **Demo logos:** transparent PNG
- **Payment logos:** transparent PNG

Image file ka naam change karne se pehle developer se pucho, kyunki purane references toot sakte hain.

---

## 7. Demo accounts

Demo accounts section mein jo ID/password dikhte hain, woh public hote hain.

Fields:

- **Name** - card ka naam
- **Logo** - exchange ka logo
- **Sites** - website names + links
- **ID / Password** - demo login
- **Get Instant Id Now** button ka link - `content/sections.json` mein **Demo Accounts** ke andar

Agar demo credentials public nahi karne, to developer se section hide karwao. Sirf text blank karna kaafi nahi ho sakta.

---

## 8. FAQ aur SEO article

### FAQ

`FAQs` collection mein question/answer add, edit ya delete kar sakte ho. Website par FAQ section aur Google ke FAQ structured data dono update hote hain.

### SEO article

`SEO article` collection mein:

- **Intro paragraph**
- **Article blocks**

Block types:

- `p` - normal paragraph
- `h3` / `h4` - heading
- `ul` / `ol` - bullet/number list (`bullets` mein items)
- `why` - bold title + explanation points

**Read more / Read less** labels **Section headings & buttons** mein hain.

---

## 9. Build aur testing

```bash
npm run validate   # content + images check
npm run build      # production build -> out/
npm start          # out/ ko local server par chalao
```

- `npm run validate` batata hai agar koi image missing hai ya JSON galat hai.
- Build fail ho to error message padho; aksar missing image ya galat JSON type hota hai.
- Build ke baad `out/` folder hi hosting par upload hota hai.

### Social preview URL (optional)

Agar Open Graph/Twitter image ka absolute URL chahiye, build se pehle env set karo:

```text
NEXT_PUBLIC_SITE_URL=https://your-final-domain
```

Yeh final domain pata hone par hi set karo. Set na karne par build warning deta hai, lekin website phir bhi ban jaati hai.

---

## 10. Registration form aur Google Sheet

Popup registration form ka data Google Sheet me bhejne ke liye webhook URL set hota hai.

1. Google Sheet ke saath Apps Script webhook deploy karo (script access: **Anyone**).
2. Project root me `.env.local` file banao aur URL paste karo:

```text
NEXT_PUBLIC_REGISTRATION_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

3. Apps Script webhook `application/x-www-form-urlencoded` parameters receive karta hai aur data **Big Rock Registrations** tab me save karta hai. Tab pehle se na ho to script use bana deta hai.
4. Form ye fields bhejta hai:

```text
name, mobile (+91 ke saath), consent, source, page, submittedAt
```

Apps Script ke liye `e_gs_SheetName=Big Rock Registrations` bhi bheja jata hai. Kisi doosre webhook par data JSON me jata hai.

5. Env set karne ke baad dobara `npm run build` chalao. Static website me URL build ke time hi add hota hai; sirf hosting par env change karne se purana URL hi rahega.
6. Popup form me mobile number fixed **+91** ke saath aata hai. User sirf 10 digits daalta hai; number 6–9 se start hona zaroori hai.
7. Submit hone par form data Sheet me save hota hai, modal band hota hai aur success toast dikhta hai. Fail hone par error modal ke andar dikhega.

Webhook URL website ke source me visible hota hai, isliye usme koi secret/password nahi daalna. URL missing ho to form error dikhata hai aur data save nahi hota.

Google Apps Script browser response ko CORS ki wajah se block kar sakta hai. Isliye Apps Script webhook use hone par form request bhej kar optimistic success dikhata hai. Entry Sheet me pahunchi ya nahi, ye test submission se confirm karo; response error browser me readable nahi hoga.

Agar Apps Script `The number of columns in the range must be at least 1` error de, to target sheet tab headers ke bina empty pada hai. `Big Rock Registrations` naam ka naya tab use karo ya us tab ki pehli row me headers add karo.

---

## 11. Publish karne se pehle checklist

- [ ] WhatsApp links `https://walink.ai/bigrockweb` par set hain
- [ ] Telegram link `https://t.me/bigrockexchangeofficial` hai
- [ ] Demo accounts ke ID/password sahi ya hataaye hue hain
- [ ] Saare banner/promo images upload hain aur links sahi hain
- [ ] FAQ answers legal/accurate hain
- [ ] Payment logos sahi hain
- [ ] `npm run validate` pass hai
- [ ] `npm run build` pass hai
- [ ] Mobile par website check ki hai
- [ ] Light/dark theme dono check kiye hain
- [ ] `/admin/` production par khulta hai aur login kaam karta hai
- [ ] Registration webhook URL set hai aur test entry `Big Rock Registrations` tab me pahunchi hai
- [ ] Registration form me +91 prefix aur 10-digit validation check ki hai
- [ ] Final domain `NEXT_PUBLIC_SITE_URL` mein set hai (agar social previews chahiye)

---

## 12. Kab developer chahiye

Developer ke bina mat karo:

- Naya section/add-on page banana
- Design, colour, font ya layout change
- Game rail ka behaviour change
- CMS mein naya field/collection add karna
- Hosting, domain, SSL ya Netlify Identity setup
- Koi bhi `.tsx`, `.css`, `next.config.ts` ya `lib/` file edit karna

Content se related simple changes aap khud kar sakte ho. Confusion ho to pehle backup lo ya developer ko pucho.
