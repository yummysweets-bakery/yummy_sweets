
/**
 * Yummy Sweets — Bilingual Artisanal Boutique Bakery Web Application (v3)
 * Vanilla ES modules. Pure logic lives in builder/lib/ and is unit tested (tests/unit).
 * Public reads: builder/lib/publicdata.js (Firestore Lite). Signed-in reads/writes: builder/lib/datastore.js
 * (full SDK, loaded on demand). Identity: builder/lib/session.js.
 */

import { buildStructuredData } from './builder/lib/seo.js';
import { firebaseReady } from './builder/lib/firebase.js';
import { fetchPublicConfig, fetchProducts, fetchApprovedReviews } from './builder/lib/publicdata.js';
import { describeDataError } from './builder/lib/errors.js';

// Full Firestore SDK (realtime + writes), loaded only for signed-in users and staff.
let store = null;
let storePromise = null;
function loadStore() {
  if (!storePromise) storePromise = import('./builder/lib/datastore.js').then(m => (store = m));
  return storePromise;
}
import {
  watchSession, signInWithGoogle, signInWithEmail, signOutUser, refreshClaims,
  isPrivileged, canAccessTab, describeAuthError, STAFF_PERMS,
} from './builder/lib/session.js';
import { escapeHTML, jsArg, sanitizeInlineHTML, stripTags, safeUrl, escapeMultiline } from './builder/lib/escape.js';
import { DEFAULT_ECONOMY as BASE_ECONOMY, computeBreakdown, formatMoney, checkPromo, hasSecondaryCurrency } from './builder/lib/pricing.js';
import { normalizeKurdish, searchTokens, matchesSearch, highlightMatches } from './builder/lib/search.js';
import { parseMenuHash, buildMenuHash, inPriceRange } from './builder/lib/urlstate.js';
import { loadCart, saveCart, sanitizeCart, addItem, changeQty, removeItem, priceLines, cartSubtotal, cartCount } from './builder/lib/cart.js';
import { earliestFulfillment, toLocalInputValue, validateFulfillment, formatFulfillment, leadHours } from './builder/lib/dates.js';
import { normalizeWhatsAppNumber, buildWhatsAppUrl, buildOrderMessage } from './builder/lib/whatsapp.js';
import { buildOrderRecord, validateOrderRecord } from './builder/lib/orders.js';
import { textOn } from './builder/lib/color.js';
import { ensureFonts } from './builder/lib/fonts.js';
import { srcsetFor } from './builder/lib/images.js';

// Top-of-script default constants
const SHOP_NAME       = 'Yummy Sweets';
const IQD_RATE        = 1310;

// localStorage keys. Only public data, per-viewer preferences, the cart and this
// device's own order history are cached — never sessions, roles or other people's data.
const KEYS = {
  CONFIG: 'sc_config_v2',
  PRODUCTS: 'sc_products_v2',
  PREF: 'sc_pref_v2',
  MY_ORDERS: 'ys_my_orders_v1',
  GUEST: 'ys_guest_v1',
  PRODUCTS_REMOTE: 'ys_products_remote_v1'
};

// Keys written by earlier versions. Some held plaintext staff passwords, forgeable
// sessions or staff copies of every customer's data, so they are deleted on startup.
const LEGACY_KEYS = ['sc_users_v2', 'sc_session_v2', 'yummy_session', 'yummy_users', 'sc_orders_v2', 'sc_customer_notes_v2'];

// Arabic & Kurdish Font Options
const FONT_OPTIONS = [
  { value: 'Vazirmatn', label: 'Vazirmatn (modern, clean)' },
  { value: 'Cairo', label: 'Cairo (friendly, round)' },
  { value: 'IBM Plex Sans Arabic', label: 'IBM Plex Sans Arabic (corporate)' },
  { value: 'Noto Naskh Arabic', label: 'Noto Naskh Arabic (calligraphic)' },
  { value: 'Noto Kufi Arabic', label: 'Noto Kufi Arabic (geometric)' },
  { value: 'Noto Sans Arabic', label: 'Noto Sans Arabic (neutral)' },
  { value: 'Amiri', label: 'Amiri (calligraphic, premium)' },
  { value: 'Tajawal', label: 'Tajawal (modern, legible)' },
  { value: 'Almarai', label: 'Almarai (clean, contemporary)' },
  { value: 'Rubik', label: 'Rubik (multilingual, rounded)' }
];

// English & Latin Font Options
const FONT_OPTIONS_EN = [
  { value: 'DM Sans', label: 'DM Sans (geometric, clean modern)' },
  { value: 'Cormorant Garamond', label: 'Cormorant Garamond (artisanal luxury serif)' },
  { value: 'Playfair Display', label: 'Playfair Display (editorial serif)' },
  { value: 'DM Serif Display', label: 'DM Serif Display (warm display serif)' },
  { value: 'Lora', label: 'Lora (classic contemporary)' },
  { value: 'Inter', label: 'Inter (clean neutral)' },
  { value: 'Outfit', label: 'Outfit (boutique sans)' }
];

// Economy Configuration Defaults
const DEFAULT_ECONOMY = { ...BASE_ECONOMY };

const THEMES = {
  berry: {
    label:{ en:'Berry', ku:'بێری' },
    tokens:{
      cream:'#FFFBF7', shell:'#FDF3EC', blush:'#F6DFD8', linen:'#FAF1EA',
      berry:'#8E3B4A', berryDark:'#6E2C39', berryDeep:'#4E1E28',
      cocoa:'#3B2A26', cocoaSoft:'#5A423C',
      gold:'#C9A227', goldSoft:'#E8C766',
      ink:'#2E2422', muted:'#7C6A66',
      line:'#EFE1D9', lineStrong:'#E4D0C5'
    }
  },
  chocolate: {
    label:{ en:'Chocolate', ku:'چاکۆلێت' },
    tokens:{
      cream:'#FFF9F2', shell:'#FBF0E2', blush:'#F2DFC7', linen:'#FDF5EA',
      berry:'#C89B6A', berryDark:'#A87A48', berryDeep:'#7A5230',
      cocoa:'#2A1710', cocoaSoft:'#4A2F22',
      gold:'#D4A24A', goldSoft:'#F0D196',
      ink:'#241410', muted:'#7A5C4A',
      line:'#EEDCC4', lineStrong:'#DEC5A4'
    }
  },
  sage: {
    label:{ en:'Sage', ku:'سەیج' },
    tokens:{
      cream:'#FAF7F0', shell:'#F2EBDF', blush:'#E3E9DC', linen:'#F6F2E9',
      berry:'#8FA88A', berryDark:'#6E8A69', berryDeep:'#4E6649',
      cocoa:'#3E4F3A', cocoaSoft:'#5C6E58',
      gold:'#B5614D', goldSoft:'#D68A70',
      ink:'#2A3327', muted:'#6E7868',
      line:'#E2DCCC', lineStrong:'#CFC7B2'
    }
  },
  rose: {
    label:{ en:'Rose', ku:'گۆڵ' },
    tokens:{
      cream:'#FFFBF8', shell:'#FBEFF0', blush:'#F5DCE0', linen:'#FDF3F4',
      berry:'#C97B84', berryDark:'#A85C67', berryDeep:'#7E3F4A',
      cocoa:'#5E2A3A', cocoaSoft:'#7C4756',
      gold:'#D4AF6A', goldSoft:'#EBCB91',
      ink:'#3A1F27', muted:'#8A6470',
      line:'#EFDCDE', lineStrong:'#DFC3C6'
    }
  },
  midnight: {
    label:{ en:'Midnight Noir', ku:'نیوەشەو' },
    isDark: true,
    tokens:{
      cream:'#15110E', shell:'#1E1814', blush:'#342820', linen:'#221B16',
      surface:'#241D18', surfaceHover:'#2D241E', surfaceInput:'#1B1512',
      berry:'#E07A5F', berryDark:'#C66247', berryDeep:'#F4A58E',
      cocoa:'#F7EFE8', cocoaSoft:'#D6C6B8',
      gold:'#E5B85C', goldSoft:'#F3D48E',
      ink:'#EDE3DA', muted:'#A89687',
      line:'#3A2E26', lineStrong:'#4F3F34'
    }
  }
};

// Seed Configuration
const DEFAULT_CONFIG = {
  shopName: { en: 'Yummy Sweets', ku: 'یامی سویتس' },
  theme: { presetId: 'berry', tokens: THEMES.berry.tokens, mode: 'light', autoDark: false },
  tagline: { en: 'Artisanal Boutique Bakery', ku: 'شیرینەمەنی دەستکردی نایاب' },
  englishBodyFont: 'DM Sans',
  englishDisplayFont: 'Cormorant Garamond',
  kurdishBodyFont: 'Vazirmatn',
  kurdishDisplayFont: 'Vazirmatn',
  logoMode: 'emoji',
  logoEmoji: '🎂',
  logoImage: '',
  logoUrl: '',
  logoImageUrl: '',
  announcement: {
    en: 'Pre-order for weekend celebrations! <strong>Free local delivery</strong> on orders over {freeDelivery}.',
    ku: 'پێشوەختە داوا بکە بۆ ئاهەنگەکانی کۆتایی هەفتە! <strong>گەیاندنی خۆڕایی</strong> بۆ داواکاری سەروو {freeDelivery}.'
  },
  aboutUs: {
    en: 'Yummy Sweets began as a dream in our home kitchen: to restore pure artisan craftsmanship to celebration cakes. We believe true indulgence comes from authentic, unadulterated ingredients. Every sponge is whipped by hand, every fruit compote simmered from scratch, and every ganache blended from fine single-origin cocoa.',
    ku: 'یامی سویتس وەک خەونێک لە چێشتخانەی ماڵەکەمانەوە دەستی پێکرد: گەڕاندنەوەی هونەری ڕەسەنی دەستکرد بۆ کێکەکانی ئاهەنگگێڕان. ئێمە باوەڕمان وایە کە چێژی ڕاستەقینە لە پێکهاتەی سروشتی و بێ ساختە دەست دەکەوێت. هەموو کێکێک بە دەست ئامادە دەکرێت و بە باشترین کەرەستە دەڕازێنرێتەوە.'
  },
  reviews: [
    { initials: 'SK', name: { en: 'Sara & Kareem', ku: 'سارا و کەریم' }, role: { en: 'Verified Customer', ku: 'کڕیاری دڵنیاکراو' }, quote: { en: '"The Pistachio Rose cake was the centerpiece of our anniversary dinner. Truly moist, not overly sweet, and breathtakingly decorated."', ku: '"کێکی فستق و گوڵاو جوانترین دیاری بوو بۆ ساڵیادی هاوسەرگیریمان. زۆر ناسک بوو و شیرینییەکەی تەواو لەجێی خۆیدا بوو."' } },
    { initials: 'DA', name: { en: 'Danyar Azad', ku: 'دانیار ئازاد' }, role: { en: 'Office Celebrations', ku: 'ئاهەنگی فەرمانگە' }, quote: { en: '"Ordering via WhatsApp was so fast! Sent the order at 10 AM, had freshly baked cupcakes at my office by 2 PM. Everyone raved about them."', ku: '"داواکردن بە واتسئاپ زۆر خێرا بوو! کاتژمێر ١٠ داوام کرد، کاتژمێر ٢ لە ئۆفیس پێم گەیشت."' } },
    { initials: 'LR', name: { en: 'Lina Rostam', ku: 'لینا ڕۆستەم' }, role: { en: 'Weekend Regular', ku: 'کڕیاری هەمیشەیی' }, quote: { en: '"Their French macarons and salted caramel tart are pure perfection. You can taste the real butter and quality vanilla in every single bite."', ku: '"ماکارۆن و تارتی کارامێلەکەیان بێ وێنەیە. تامی کەرەی ڕاستەقینە و ڤانێلای چاک لە هەموو پارچەیەکدا دیارە."' } }
  ],
  faq: [
    { q: { en: 'How far in advance should I place my cake order?', ku: 'چەند کاتژمێر پێشوەخت پێویستە کێک داوا بکەم؟' }, a: { en: 'For signature menu cakes, orders placed 24 hours in advance are guaranteed. Custom tiered celebration cakes require 48 to 72 hours notice.', ku: 'بۆ کێکە ئاساییەکانی لیستەکە، داواکاری ٢٤ کاتژمێر پێشتر گەرەنتی کراوە. بۆ کێکی تایبەتی چەندین نهۆم پێویستمان بە ٤٨ بۆ ٧٢ کاتژمێرە.' } },
    { q: { en: 'How does the WhatsApp checkout process work?', ku: 'شێوازی کڕین لەڕێگەی واتسئاپ چۆنە؟' }, a: { en: "When you tap 'Send Order via WhatsApp', your selected items are automatically drafted into a clean message. You can add your delivery address before sending.", ku: 'کاتێک دەست دەنێیت بە "ناردن لە واتسئاپ"، هەموو شیرینییە هەڵبژێردراوەکان لە پەیامێکی ڕێکخراودا ئامادە دەکرێن و ڕاستەوخۆ دەینێریت بۆمان!' } },
    { q: { en: 'Do you offer gluten-free or eggless options?', ku: 'ئایا کێکی بێ هێلکە یان بێ گلوتینتان هەیە؟' }, a: { en: 'Yes! We offer specialized eggless chocolate fudge cakes and almond-flour gluten-friendly tarts upon request. Please specify in your notes.', ku: 'بەڵێ! کێکی شوکۆڵاتەی تایبەت بەبێ هێلکە و تارتی ئاردی بادەم بۆ کەسانی هەستیار ئامادە دەکرێت بە داواکاری پێشوەختە.' } }
  ],
  contact: {
    // Set the real numbers in Control Panel → Contact. Checkout refuses to use an empty or placeholder number.
    whatsapp: '',
    phone: '',
    email: 'hello@yummysweets.com',
    address: {
      en: 'Dream City Avenue, Near English Village, Erbil, Kurdistan',
      ku: 'شەقامی دریم سیتی، نزیک گوندی ئینگلیزی، هەولێر، کوردستان'
    },
    hours: {
      en: 'Mon – Sun: 9:00 AM – 10:00 PM\nFresh bakes ready by 10 AM daily',
      ku: 'دووشەممە – یەکشەممە: ٩:٠٠ بەیانی – ١٠:٠٠ شەو\nشیرینی تازە کاتژمێر ١٠ی بەیانی ئامادەیە'
    }
  },
  socials: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    tiktok: 'https://tiktok.com',
    snapchat: 'https://snapchat.com'
  },
  iqdRate: IQD_RATE,
  economy: { ...DEFAULT_ECONOMY },
  showWatermark: true
};

// Client-side image processing helper (800px max width, quality compression, quota safe)
function processImageFile(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error('NO_FILE'));
    }
    if (!file.type || !file.type.startsWith('image/')) {
      return reject(new Error('INVALID_TYPE'));
    }
    const MAX_INPUT_BYTES = 5 * 1024 * 1024; // 5 MB
    if (file.size > MAX_INPUT_BYTES) {
      return reject(new Error('FILE_TOO_LARGE'));
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('READ_ERROR'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('DECODE_ERROR'));
      img.onload = () => {
        try {
          const MAX_WIDTH = 800;
          let targetWidth = img.naturalWidth || img.width;
          let targetHeight = img.naturalHeight || img.height;

          if (targetWidth > MAX_WIDTH) {
            const ratio = MAX_WIDTH / targetWidth;
            targetWidth = MAX_WIDTH;
            targetHeight = Math.round(targetHeight * ratio);
          }

          const canvas = document.createElement('canvas');
          canvas.width = targetWidth;
          canvas.height = targetHeight;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            return reject(new Error('CANVAS_ERROR'));
          }

          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

          let dataUrl = '';
          try {
            dataUrl = canvas.toDataURL('image/jpeg', 0.8);
          } catch {
            dataUrl = canvas.toDataURL('image/png');
          }

          // Approximate base64 data size: length * 0.75
          const payloadLength = dataUrl.length - (dataUrl.indexOf(',') + 1);
          let approxBytes = Math.round(payloadLength * 0.75);

          // Product photos are stored in Firestore and downloaded by every visitor:
          // aim for ~250 KB, and never exceed what firestore.rules accepts (~650 KB).
          if (approxBytes > 250 * 1024) {
            try {
              const lowerDataUrl = canvas.toDataURL('image/jpeg', 0.65);
              const lowerPayload = lowerDataUrl.length - (lowerDataUrl.indexOf(',') + 1);
              const lowerBytes = Math.round(lowerPayload * 0.75);
              dataUrl = lowerDataUrl;
              approxBytes = lowerBytes;
            } catch {
              // keep previous
            }
          }

          // If output still exceeds 800 KB, reject
          if (approxBytes > 640 * 1024) {
            return reject(new Error('OUTPUT_TOO_LARGE'));
          }

          resolve(dataUrl);
        } catch (err) {
          reject(err);
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// Client-side logo processing helper (256x256 square center-crop, max 150KB output, SVG sanitization, quota safe)
function processLogoFile(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error('NO_FILE'));
    }
    const MAX_INPUT_BYTES = 5 * 1024 * 1024; // 5 MB
    if (file.size > MAX_INPUT_BYTES) {
      return reject(new Error('FILE_TOO_LARGE'));
    }

    // SVG special case: read as text, sanitize, enforce 100 KB max
    if (file.type === 'image/svg+xml' || (file.name && file.name.toLowerCase().endsWith('.svg'))) {
      if (file.size > 100 * 1024) {
        return reject(new Error('OUTPUT_TOO_LARGE'));
      }
      const textReader = new FileReader();
      textReader.onerror = () => reject(new Error('READ_ERROR'));
      textReader.onload = (e) => {
        try {
          let svg = String(e.target.result || '');
          // Strip <script> tags, on* attributes, and javascript: URLs
          const scriptRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
          const onEventRegex = /\son\w+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi;
          const jsUrlRegex = /javascript\s*:[^"'>]+/gi;

          svg = svg.replace(scriptRegex, '');
          svg = svg.replace(onEventRegex, '');
          svg = svg.replace(jsUrlRegex, '');

          // Check for valid SVG tags
          if (!svg.includes('<svg') || !svg.includes('</svg>')) {
            return reject(new Error('INVALID_TYPE'));
          }

          const dataUrl = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
          const payloadLen = dataUrl.length - (dataUrl.indexOf(',') + 1);
          const approxBytes = Math.round(payloadLen * 0.75);
          resolve({ dataUrl, approxBytes, isSvg: true });
        } catch {
          reject(new Error('SANITIZATION_FAILED'));
        }
      };
      textReader.readAsText(file);
      return;
    }

    // Raster image processing: reject non-images
    if (!file.type || !file.type.startsWith('image/')) {
      return reject(new Error('INVALID_TYPE'));
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('READ_ERROR'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('DECODE_ERROR'));
      img.onload = () => {
        try {
          const natW = img.naturalWidth || img.width;
          const natH = img.naturalHeight || img.height;
          if (!natW || !natH) return reject(new Error('INVALID_DIMENSIONS'));

          const TARGET_SIZE = 256;
          // Scale so shorter side is 256px
          const scale = natW < natH ? (TARGET_SIZE / natW) : (TARGET_SIZE / natH);
          const scaledW = Math.round(natW * scale);
          const scaledH = Math.round(natH * scale);
          const offsetX = Math.round((scaledW - TARGET_SIZE) / 2);
          const offsetY = Math.round((scaledH - TARGET_SIZE) / 2);

          const canvas = document.createElement('canvas');
          canvas.width = TARGET_SIZE;
          canvas.height = TARGET_SIZE;
          const ctx = canvas.getContext('2d');
          if (!ctx) return reject(new Error('CANVAS_ERROR'));

          // Draw center-cropped
          ctx.drawImage(img, -offsetX, -offsetY, scaledW, scaledH);

          // Preserve PNG transparency if source is PNG/WebP
          const hasAlpha = file.type === 'image/png' || file.type === 'image/webp';
          let dataUrl = '';
          if (hasAlpha) {
            dataUrl = canvas.toDataURL('image/png');
          } else {
            dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          }

          let payloadLen = dataUrl.length - (dataUrl.indexOf(',') + 1);
          let approxBytes = Math.round(payloadLen * 0.75);

          // Check if output exceeds 150 KB
          if (approxBytes > 150 * 1024) {
            // Re-attempt compression with JPEG 0.80 if possible
            dataUrl = canvas.toDataURL('image/jpeg', 0.80);
            payloadLen = dataUrl.length - (dataUrl.indexOf(',') + 1);
            approxBytes = Math.round(payloadLen * 0.75);

            if (approxBytes > 150 * 1024) {
              return reject(new Error('OUTPUT_TOO_LARGE'));
            }
          }

          resolve({ dataUrl, approxBytes, isSvg: false });
        } catch (err) {
          reject(err);
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// Seed 14 Fully Bilingual Products with Real Bakery Photography
const DEFAULT_PRODUCTS = [
  {
    id: 'p1',
    category: 'cakes',
    emoji: '🎂',
    img: 'https://images.unsplash.com/photo-1562440499-64c9a111f713?w=800&auto=format&fit=crop&q=80',
    priceUSD: 38,
    tag: 'bestseller',
    name: { en: 'Pistachio Rose Layer Cake', ku: 'کێکی چین چینی فستق و گوڵاو' },
    desc: { en: 'Delicate roasted pistachio sponge layered with fragrant Persian rosewater mascarpone and white chocolate.', ku: 'کێکی ناسکی فستقی برژاو بە کرێمی گوڵاوی ئێرانی و شوکۆڵاتەی سپی.' },
    unit: { en: '8" Cake (10-12 slices)', ku: 'کێکی ٨ ئینچ (١٠-١٢ پارچە)' }
  },
  {
    id: 'p2',
    category: 'cakes',
    emoji: '🍫',
    img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80',
    priceUSD: 42,
    tag: 'bestseller',
    name: { en: 'Belgian Dark Truffle Cake', ku: 'کێکی تڕەفڵی شوکۆڵاتەی بەلجیکی' },
    desc: { en: 'Decadent 70% Callebaut dark chocolate layers drenched in whipped espresso ganache.', ku: 'چەندین چینی شوکۆڵاتەی تۆخی بەلجیکی لەگەڵ گاناشی قاوەی ئێسپرێسۆ.' },
    unit: { en: '8" Cake (10-12 slices)', ku: 'کێکی ٨ ئینچ (١٠-١٢ پارچە)' }
  },
  {
    id: 'p3',
    category: 'cakes',
    emoji: '🍓',
    img: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&auto=format&fit=crop&q=80',
    priceUSD: 40,
    tag: 'new',
    name: { en: 'Berry Chantilly Chiffon', ku: 'کێکی شیفۆنی تووتڕکی شانتیلی' },
    desc: { en: 'Feather-light vanilla chiffon crowned with fresh wild strawberries, blackberries, and sweet cream.', ku: 'کێکی زۆر سووکی ڤانێلا بە کرێمی تازە و تووی کێوی و فرەولەی سروشتی.' },
    unit: { en: '8" Cake (10-12 slices)', ku: 'کێکی ٨ ئینچ (١٠-١٢ پارچە)' }
  },
  {
    id: 'p4',
    category: 'cakes',
    emoji: '🥜',
    img: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=800&auto=format&fit=crop&q=80',
    priceUSD: 36,
    tag: 'none',
    name: { en: 'Salted Caramel Pecan Cake', ku: 'کێکی کارامێلی سوێر و گوێزی پێکەن' },
    desc: { en: 'Brown butter sponge paired with toasted Georgia pecans and fleur de sel caramel drizzle.', ku: 'کێکی کەرەی قاوەیی لەگەڵ گوێزی برژاو و سۆسی کارامێلی سوێری فەڕەنسی.' },
    unit: { en: '8" Cake (10-12 slices)', ku: 'کێکی ٨ ئینچ (١٠-١٢ پارچە)' }
  },
  {
    id: 'p5',
    category: 'cakes',
    emoji: '🍰',
    img: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=800&auto=format&fit=crop&q=80',
    priceUSD: 35,
    tag: 'none',
    name: { en: 'Signature Red Velvet', ku: 'ڕێد ڤێلڤێتی تایبەت' },
    desc: { en: 'Classic crimson buttermilk sponge layered with rich Madagascar vanilla cream cheese.', ku: 'کێکی سووری نەریتی لەگەڵ کرێم چیسی دەوڵەمەندی ڤانێلای ماداگاسکەر.' },
    unit: { en: '8" Cake (10-12 slices)', ku: 'کێکی ٨ ئینچ (١٠-١٢ پارچە)' }
  },
  {
    id: 'p6',
    category: 'cakes',
    emoji: '🍋',
    img: 'https://images.unsplash.com/photo-1534432182912-63863115e106?w=800&auto=format&fit=crop&q=80',
    priceUSD: 34,
    tag: 'none',
    name: { en: 'Lemon Lavender Dream', ku: 'کێکی لیمۆ و لاڤەندەر' },
    desc: { en: 'Zesty Meyer lemon curd layered with organic Provence lavender-infused buttercream.', ku: 'تامی ترش و شیری لیمۆی سروشتی بە کرێمی لاڤاندەری فەڕەنسی.' },
    unit: { en: '8" Cake (10-12 slices)', ku: 'کێکی ٨ ئینچ (١٠-١٢ پارچە)' }
  },
  {
    id: 'p7',
    category: 'cakes',
    emoji: '🌰',
    img: 'https://images.unsplash.com/photo-1542826438-bd32f43d626f?w=800&auto=format&fit=crop&q=80',
    priceUSD: 45,
    tag: 'new',
    name: { en: 'Hazelnut Praline Royal', ku: 'کێکی ڕۆیاڵی بوندوق و پڕالین' },
    desc: { en: 'Roasted Piedmont hazelnut dacquoise with crispy wafer crunch and silky Gianduja mousse.', ku: 'کێکی داگوایزی بوندوق لەگەڵ ویفەری کڕەنچی و مووسی شوکۆڵاتە.' },
    unit: { en: '8" Cake (12 slices)', ku: 'کێکی ٨ ئینچ (١٢ پارچە)' }
  },
  {
    id: 'p8',
    category: 'cupcakes',
    emoji: '🧁',
    img: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=800&auto=format&fit=crop&q=80',
    priceUSD: 18,
    tag: 'bestseller',
    name: { en: 'Tahitian Vanilla Cupcakes', ku: 'کەپکێکی ڤانێلای تاهیتی' },
    desc: { en: 'Moist golden sponge crowned with swirls of aromatic Tahitian vanilla bean buttercream.', ku: 'کەپکێکی نەرم و بەتام بە کرێمی تایبەتی دەنکۆڵەی ڤانێلا.' },
    unit: { en: 'Box of 6', ku: 'پاکەتی ٦ دانەیی' }
  },
  {
    id: 'p9',
    category: 'cupcakes',
    emoji: '🍮',
    img: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=800&auto=format&fit=crop&q=80',
    priceUSD: 20,
    tag: 'new',
    name: { en: 'Salted Dulce de Leche Cupcakes', ku: 'کەپکێکی کارامێلی دۆلسێ دێ لێچێ' },
    desc: { en: 'Cinnamon spiced cake with a molten caramelized milk center and toffee crunch.', ku: 'کێکی دارچینی بە ناوەرۆکی کارامێلی گەرم و تۆفی کڕەنچی.' },
    unit: { en: 'Box of 6', ku: 'پاکەتی ٦ دانەیی' }
  },
  {
    id: 'p10',
    category: 'cupcakes',
    emoji: '🫐',
    img: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=800&auto=format&fit=crop&q=80',
    priceUSD: 19,
    tag: 'none',
    name: { en: 'Wild Blueberry Zest Cupcakes', ku: 'کەپکێکی بلوبێری و توێکڵی لیمۆ' },
    desc: { en: 'Bursting with fresh blueberries and topped with a bright lemon meringue swirl.', ku: 'پڕ لە بلوبێری تازە لەگەڵ سۆسی سەرنجڕاکێشی لیمۆ و مێرێنگ.' },
    unit: { en: 'Box of 6', ku: 'پاکەتی ٦ دانەیی' }
  },
  {
    id: 'p11',
    category: 'cupcakes',
    emoji: '🍫',
    img: 'https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=800&auto=format&fit=crop&q=80',
    priceUSD: 20,
    tag: 'none',
    name: { en: 'Triple Chocolate Fudge Cupcakes', ku: 'کەپکێکی سێ قاتی شوکۆڵاتە' },
    desc: { en: 'Dark chocolate cake filled with molten ganache and sprinkled with cocoa nibs.', ku: 'کێکی شوکۆڵاتەی تۆخ بە ناوەرۆکی گاناش و کەرەستەی کاکاو.' },
    unit: { en: 'Box of 6', ku: 'پاکەتی ٦ دانەیی' }
  },
  {
    id: 'p12',
    category: 'desserts',
    emoji: '🥮',
    img: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=800&auto=format&fit=crop&q=80',
    priceUSD: 24,
    tag: 'bestseller',
    name: { en: 'Parisian Macaron Collection', ku: 'کۆمەڵەی ماکارۆنی پاریسی' },
    desc: { en: 'Delicate almond shells: Pistachio, Dark Chocolate, Rose Raspberry, and Salted Caramel.', ku: 'ماکارۆنی ڕەسەنی فەڕەنسی: فستق، شوکۆڵاتە، گوڵ، و کارامێل.' },
    unit: { en: 'Box of 12', ku: 'پاکەتی ١٢ دانەیی' }
  },
  {
    id: 'p13',
    category: 'desserts',
    emoji: '🧀',
    img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&auto=format&fit=crop&q=80',
    priceUSD: 28,
    tag: 'new',
    name: { en: 'Basque Burnt Cheesecake', ku: 'چیزکێکی باسکە سووتاوی ئیسپانی' },
    desc: { en: 'Caramelized crust with an ultra-creamy, molten center baked at high heat.', ku: 'تەختی کارامێلی سووتاو لەگەڵ ناوەرۆکی زۆر نەرم و پەنیری لەسەر شێوازی ئیسپانی.' },
    unit: { en: '7" Whole Cake', ku: 'کێکی تەواوی ٧ ئینچ' }
  },
  {
    id: 'p14',
    category: 'desserts',
    emoji: '🥧',
    img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80',
    priceUSD: 22,
    tag: 'none',
    name: { en: 'Salted Caramel Chocolate Tart', ku: 'تارتی شوکۆڵاتە و کارامێلی سوێر' },
    desc: { en: 'Crisp cocoa sablé pastry shell filled with gooey caramel and glossy chocolate glaze.', ku: 'تارتی برژاوی کاکاو پڕ لە کارامێلی سوێر و گاناشی گەشاوی شوکۆڵاتە.' },
    unit: { en: '8" Tart (8 slices)', ku: 'تارتی ٨ ئینچ (٨ پارچە)' }
  }
];

// Complete Bilingual Dictionary (English & Kurdish Sorani)
const TRANSLATIONS = {
  en: {
    btnCancel: "Cancel",
    btnSubmit: "Submit",
    btnSaveConfig: "Save Settings",
    economyTitle: "Pricing & Economy",
    economyDesc: "Manage currency conversion, delivery fees, and minimum order rules.",
    shopTagline: 'Artisanal Boutique Bakery',
    announcementText: 'Pre-order for weekend celebrations! <strong>Free local delivery</strong> on orders over {freeDelivery}.',
    navMenu: 'Menu',
    navHowItWorks: 'How It Works',
    navOurStory: 'Our Story',
    navReviews: 'Reviews',
    navContact: 'Contact',
    navFaq: 'FAQ',
    heroEyebrow: 'Artisanal Bakery & Pâtisserie',
    heroTitle: 'Handcrafted cakes made with <em>passion</em> & love',
    heroLead: 'We craft bespoke celebratory cakes, delicate pastries, and decadent cupcakes daily using premium organic ingredients. Delivered straight to your celebration with seamless WhatsApp ordering.',
    heroCtaPrimary: 'Explore Our Menu',
    heroCtaSecondary: 'Chat with Baker',
    trust1: '100% Organic Flours',
    trust2: 'Same-Day Fresh Bake',
    trust3: 'Custom Messages',
    badgeFresh: 'Fresh today from 6 AM',
    heroReviewSnippet: '"Best Red Velvet in town! Unmatched flavor."',
    feat1Title: 'Real Ingredients',
    feat1Desc: 'Pure butter, Belgian chocolate, fresh seasonal berries, and zero artificial preservatives.',
    feat2Title: 'Careful Delivery',
    feat2Desc: 'Handled with gentle temperature-controlled care so your cake arrives picture-perfect.',
    feat3Title: 'Custom Creations',
    feat3Desc: 'Bespoke tiers, customized chocolate writing, and tailored sweetness for every milestone.',
    menuEyebrow: 'Our Daily Selection',
    menuTitle: 'Baked Fresh For You',
    menuLead: "Browse our signature cakes, cupcakes, and desserts. Click 'Add to Order' to assemble your WhatsApp cart.",
    catAll: 'All Sweets',
    catCakes: 'Layer Cakes',
    catCupcakes: 'Cupcakes',
    catDesserts: 'Desserts',
    tagBestseller: 'Bestseller',
    tagNew: 'New',
    btnAdd: 'Add to Order',
    stepsEyebrow: 'Simple & Delightful',
    stepsTitle: 'How Ordering Works',
    stepsLead: 'Three effortless steps from our kitchen to your celebration table.',
    step1Title: 'Choose Your Favorites',
    step1Desc: "Browse our menu and pick the cakes, cupcakes, or desserts you'd love to share with loved ones.",
    step2Title: 'Send Via WhatsApp',
    step2Desc: 'Click Send Order to open an instant pre-formatted WhatsApp message directly to our head baker.',
    step3Title: 'Confirm & Celebrate',
    step3Desc: 'We confirm your delivery slot or pickup time, bake fresh that morning, and deliver to your door.',
    storyEyebrow: 'Our Heritage',
    storyTitle: 'Crafted with patience, baked with devotion',
    bullet1: 'Slow-fermented buttermilk and organic flours',
    bullet2: 'Zero synthetic flavorings or artificial frostings',
    bullet3: 'Dedicated pastry artisans with European techniques',
    reviewsEyebrow: 'Testimonials',
    reviewsTitle: 'Sweet Words from Customers',
    reviewsLead: 'Real feedback from memorable birthdays, weddings, and weekend family teas.',
    btnLeaveReview: 'Leave a Review',
    leaveReviewTitle: 'Leave a Review',
    leaveReviewDesc: 'We\'d love to hear about your experience!',
    reviewFormName: 'Your Name',
    reviewFormQuote: 'Your Review',
    review1Quote: '"The Pistachio Rose cake was the centerpiece of our anniversary dinner. Truly moist, not overly sweet, and breathtakingly decorated."',
    review1Role: 'Verified Customer',
    review2Quote: '"Ordering via WhatsApp was so fast! Sent the order at 10 AM, had freshly baked cupcakes at my office by 2 PM. Everyone raved about them."',
    review2Role: 'Office Celebrations',
    review3Quote: '"Their French macarons and salted caramel tart are pure perfection. You can taste the real butter and quality vanilla in every single bite."',
    review3Role: 'Weekend Regular',
    faqEyebrow: 'Common Inquiries',
    faqTitle: 'Frequently Asked Questions',
    faqLead: 'Everything you need to know about our ordering process, dietary needs, and delivery times.',
    faq1Q: 'How far in advance should I place my cake order?',
    faq1A: 'For signature menu cakes, orders placed 24 hours in advance are guaranteed. Custom tiered celebration cakes require 48 to 72 hours notice so our chefs can prepare custom decorations and specialty fillings.',
    faq2Q: 'How does the WhatsApp checkout process work?',
    faq2A: "When you tap 'Send Order via WhatsApp', your selected items, quantities, and totals are automatically drafted into a clean WhatsApp message. You can add your delivery address and date before sending it directly to our team!",
    faq3Q: 'Do you offer gluten-free or eggless options?',
    faq3A: 'Yes! We offer specialized eggless chocolate fudge cakes and almond-flour gluten-friendly tarts upon request. Please specify dietary preferences in your WhatsApp message notes.',
    faq4Q: 'Can I customize the cake writing or message?',
    faq4A: 'Every full-sized cake includes complimentary chocolate piped lettering on an artisan sugar plaque. Simply include your desired message in the order notes or chat.',
    faq5Q: 'What payment methods do you accept?',
    faq5A: 'We accept cash upon delivery, FastPay, FIB (First Iraqi Bank), and ZainCash transfers. Payment details are finalized during WhatsApp confirmation.',
    ctaTitle: 'Ready to make your occasion sweeter?',
    ctaLead: 'Have a custom design or special theme in mind? Our master bakers are ready to bring your vision to life.',
    ctaBtnWhatsApp: 'Chat on WhatsApp',
    ctaBtnMenu: 'View All Cakes',
    cardAddressTitle: 'Bakery Kitchen',
    cardHoursTitle: 'Opening Hours',
    cardContactTitle: 'Direct Contact',
    footerBlurb: 'A boutique bakery dedicated to handcrafted artisanal celebration cakes, gourmet cupcakes, and fine French pastries.',
    footerShopLinks: 'Shop',
    footerHelpLinks: 'Help & Info',
    footerHoursTitle: 'Baking Hours',
    footerBestsellers: 'Bestsellers',
    copyrightAllRights: 'All rights reserved.',
    footerTagline: 'Baked fresh daily with wholesome ingredients & pure love.',
    btnSignIn: 'Sign In',
    btnPanel: 'Control Panel',
    btnLogout: 'Log Out',
    trayItemLabel: 'items',
    trayItemLabelSingular: 'item',
    trayClear: 'Clear Order',
    traySendWhatsApp: 'Send Order via WhatsApp',
    tabCustomer: 'Customer',
    customerTitle: 'Quick Customer Sign In',
    customerDesc: 'Sign in with your phone and name. No password needed! Your name will pre-fill your WhatsApp orders.',
    labelPhone: 'Mobile Number (min 6 digits)',
    labelDisplayName: 'Your Name / Display Name',
    btnContinue: 'Continue as Customer',
    labelUsername: 'Username or Email',
    labelPassword: 'Password',
    tabAdmin: 'Admin',
    tabDev: 'Developer',
    staffFormDesc: 'Please enter your management credentials to access the bakery control panel.',
    historyZero: "You've placed 0 orders.",
    trayEmptyPreview: 'No items selected',
    storyImgTitle: 'Sweet Artisan Heritage',
    storyImgDesc: 'Fresh from our oven to your family celebration',
    review1Name: 'Sara & Kareem',
    review2Name: 'Danyar Azad',
    review3Name: 'Lina Rostam',
    footerOrdersInfo: 'Orders & inquiries:',
    invalidPromo: 'Invalid promo code',
    promoRemoved: 'Promo code removed',
    itemsNotAvailable: 'These items are currently not available on the menu.',
    signedInAs: 'Signed in as {name}',
    loggedInAs: 'Logged in as {role}',
    loggedOut: 'Logged out successfully.',
    orderStatusUpdated: 'Order status updated to {status}',
    noteSaved: 'Note saved',
    invalidUrl: 'Invalid URL scheme. Only http:// and https:// links are supported.',
    staffAdded: 'Staff user added successfully',
    usersTitle: 'User & Staff Management',
    usersAddStaff: 'Add Staff Account',
    usersSearch: 'Search users…',
    usersHint: 'Admins manage staff accounts and passwords. Developer and admin accounts are protected.',
    usersColRole: 'Role',
    usersColName: 'Name',
    usersColLogin: 'Username / Phone',
    usersColPassword: 'Password',
    usersColPerms: 'Permissions',
    usersColActions: 'Actions',
    usersNoPassword: 'Customer — no login',
    usersYou: '(You)',
    usersEmpty: 'No users match your search.',
    usersNoAccess: 'You do not have access to user management.',
    usersEdit: 'Edit',
    usersResetPw: 'Reset password',
    usersDelete: 'Delete',
    role_admin: 'ADMIN',
    role_dev: 'DEV',
    role_staff: 'STAFF',
    role_customer: 'CUSTOMER',
    perm_products: 'Products',
    perm_customers: 'Customers',
    perm_economy: 'Economy',
    perm_brand: 'Brand & Logo',
    perm_theme: 'Theme',
    perm_fonts: 'Fonts',
    perm_about: 'About Us',
    perm_contact: 'Contact',
    perm_socials: 'Social Media',
    editUserTitle: 'Edit User',
    usersNewPwPrompt: 'New password for {name}:',
    staffPwTooShort: 'Password must be at least 4 characters.',
    usersCannotDeleteSelf: 'You cannot delete your own account.',
    usersCannotDeleteElevated: 'Only the developer can delete admin or developer accounts.',
    usersConfirmDelete: 'Delete user "{name}"? This cannot be undone.',
    phonePreviewLabel: 'Preview width',
    phonePreviewDesktop: 'Desktop',
    phonePreviewPhone: 'Phone',
    backupImported: 'Backup imported successfully!',
    copiedJson: 'Copied JSON to clipboard!',
    factoryResetDone: 'Reset to factory defaults complete.',
    btnLogin: 'Login to Dashboard',
    panelTitle: 'Bakery Control Panel',
    uploadPhoto: 'Upload photo',
    replacePhoto: 'Replace photo',
    removePhoto: 'Remove photo',
    photoHint: 'JPG, PNG or WebP — auto-resized to 800px wide. Max 5 MB.',
    noPhotoHint: 'No photo yet — emoji will be shown',
    prodPhotoError: 'Failed to process image. Please try another file.',
    prodPhotoTooLarge: 'Processed image is too large. Please select a smaller file.',
    prodPhotoRemoved: 'Photo removed.',
    storageQuotaError: 'Storage full — try smaller images or remove some photos.',
    prodDeleteConfirm: 'Are you sure you want to delete this product?',
    btnAddNewProduct: '+ Add New Product',
    btnSaveProduct: 'Save Product',
    btnDeleteProduct: 'Delete Product',
    tabFonts: 'Fonts',
    fieldKurdishBody: 'Kurdish body font',
    fieldKurdishDisplay: 'Kurdish heading font',
    fieldEnglishBody: 'English body font',
    fieldEnglishDisplay: 'English heading font',
    saveFonts: 'Save fonts',
fontPreview: 'Preview',
    customizeTitle: 'Customize',
    customizeLeaveOut: 'Leave out',
    customizeSkip: 'Skip — add as is',
    customizeAdd: 'Add to order',
    customizeNone: 'Nothing to customize',
    orderNoteLabel: 'Note for the baker (optional)',
    orderNotePlaceholder: 'e.g. "Happy birthday Sara" or "leave at the door"',
    orderNoteTooLong: 'Note is too long — max 300 characters.',
    waNote: 'Note for the baker',
    waExclude: 'No',
    toastPhotoReady: 'Photo processed and ready to save.',
    toastAdded: 'Added to your order tray!',
    toastOrderCleared: 'Order tray cleared.',
    toastSaved: 'Saved successfully',
    toastDeleted: 'Deleted successfully',
    toastInvalidPhone: 'Please enter a valid mobile number with at least 6 digits.',
    toastInvalidLogin: 'Invalid username or password.',
    toastInvalidJson: 'Invalid JSON format. Please check your input.',
    tabEconomy: 'Economy',
    economyCurrencies: 'Currencies',
    economyExchange: 'Exchange rate',
    economyDelivery: 'Delivery',
    economyTax: 'Tax',
    economyDiscounts: 'Discounts',
    fieldPrimaryCurrency: 'Primary currency (locked)',
    fieldSecondaryCurrency: 'Secondary currency',
    fieldShowSecondary: 'Show secondary currency in storefront',
    fieldCurrencySymbol: 'Currency symbol',
    fieldExchangeRate: '1 USD = ? IQD',
    fieldRoundingRule: 'Round converted prices to',
    fieldAutoRefresh: 'Auto-refresh rate (not yet active)',
    fieldDeliveryFee: 'Flat delivery fee (USD)',
    fieldFreeDeliveryOver: 'Free delivery over (USD)',
    fieldMinimumOrder: 'Minimum order (USD)',
    fieldPickupOnly: 'Pickup only — hide delivery',
    fieldTaxEnabled: 'Charge tax',
    fieldTaxRate: 'Tax rate (%)',
    fieldTaxLabel: 'Tax label',
    fieldTaxIncluded: 'Prices already include tax',
    fieldPromoCode: 'Active promo code',
    fieldPromoType: 'Discount type',
    fieldPromoValue: 'Discount value',
    fieldPromoExpiry: 'Expires on',
    saveEconomy: 'Save economy settings',
    roundNearest1: 'Nearest 1',
    roundNearest250: 'Nearest 250',
    roundNearest500: 'Nearest 500',
    roundNearest1000: 'Nearest 1000',
    promoPercent: 'Percentage (%)',
    promoFixed: 'Fixed amount (USD)',
    subtotal: 'Subtotal',
    deliveryFee: 'Delivery',
    tax: 'Tax',
    discount: 'Discount',
    total: 'Total',
    freeDelivery: 'Free',
    minimumOrderWarning: 'Minimum order is {amount}. Add {remaining} more to checkout.',
    promoApplied: 'Promo code {code} applied',
    promoExpired: 'Promo code expired',
    economyPreview: 'Live preview',
    economyPreviewSample: 'Sample order: $50 subtotal',
    trayDetails: 'Details ▾',
    trayDetailsClose: 'Close ▴',
    trayDateLabel: 'Delivery or pickup date and time *',
    trayPaymentNote: 'Cash on delivery. We confirm the delivery fee on WhatsApp.',
    inOrderCount: '{n} in your order',
    skipToMenu: 'Skip to the menu',
    trayApplyPromo: 'Apply',
    trayRemovePromo: 'Remove',
    trayPromoPlaceholder: 'Promo code',
    deliveryFreeForEveryone: 'Free delivery for everyone',
    freeDeliveryWarning: 'Free delivery threshold is lower than minimum order — customers below minimum cannot checkout anyway.',
    promoActive: 'Active',
    promoTooShort: 'Needs 3+ chars',
    taxAddedCheckout: 'Added at checkout',
    taxIncludedLabel: 'incl.',
    pickupAvailable: 'Pickup available',
    justNow: 'Just now',
    roundedFrom: 'Rounded from {raw} to {rounded} (nearest {rule})',
    searchPlaceholder: 'Search cakes, cupcakes, desserts…',
    searchShortcut: 'Press ⌘K to search',
    searchResultsCount: 'Showing {shown} of {total} cakes',
    searchNoResults: 'No cakes match "{query}".',
    searchEmptyDesc: 'Try clearing your search query or selecting a different price range or category.',
    searchClearAll: 'Clear all filters',
    searchClearSearch: 'Clear search',
    sortLabel: 'Sort',
    sortPopular: 'Popular',
    sortNewest: 'Newest',
    sortPriceAsc: 'Price: Low to High',
    sortPriceDesc: 'Price: High to Low',
    sortNameAsc: 'Name A–Z',
    priceRangeLabel: 'Price',
    priceAny: 'Any price',
    priceUnder20: 'Under $20',
    price20to40: '$20 – $40',
    price40to60: '$40 – $60',
    priceOver60: 'Over $60',
    myOrders: 'My Orders',
    myOrdersTitle: 'My Orders',
    myOrdersSubtitle: 'You\'ve placed {count} orders since {date}.',
    myOrdersEmpty: 'No orders yet.',
    myOrdersEmptyHint: 'Browse the menu and place your first order — it\'ll appear here.',
    myOrdersBrowse: 'Browse the menu',
    myOrdersReorder: 'Reorder',
    myOrdersDetails: 'View details',
    myOrdersTotalSpent: 'Total spent',
    myOrdersTotalOrders: 'Orders',
    myOrdersFavourite: 'Most ordered',
    orderStatusPending: 'Pending',
    orderStatusBaking: 'Baking',
    orderStatusDelivered: 'Delivered',
    orderStatusCancelled: 'Cancelled',
    orderSignInToSave: 'Sign in to save this order to your history.',
    orderAddedToTray: '{count} items added to your order',
    tabCustomers: 'Customers',
    customersSearch: 'Search by name or mobile…',
    customersSortName: 'Name',
    customersSortLastOrder: 'Last order',
    customersSortTotalSpent: 'Total spent',
    customersSortOrderCount: 'Order count',
    customersEmpty: 'No customers yet.',
    customerOrders: 'Orders',
    customerTotalSpent: 'Total spent',
    customerLastOrder: 'Last order',
    customerNoOrders: 'This customer has no orders.',
    customerPrivateNote: 'Private note (staff only)',
    customerChangeStatus: 'Change status',
    logoSection: 'Logo',
    logoModeEmoji: 'Emoji',
    logoModeUpload: 'Upload',
    logoModeUrl: 'URL',
    logoPreview: 'Preview',
    logoUploadBtn: 'Upload logo',
    logoReplaceBtn: 'Replace logo',
    logoRemoveBtn: 'Remove logo',
    logoRemoveConfirm: 'Remove the current logo and use an emoji instead?',
    logoRemoved: 'Logo removed — using emoji.',
    logoUrlLabel: 'Remote image URL',
    logoUrlHint: 'Paste a direct link to a PNG, JPG, WebP or SVG file.',
    logoUrlValid: 'URL valid',
    logoUrlInvalid: "Couldn't load this URL",
    logoEmojiLabel: 'Emoji',
    logoEmojiHint: 'Pick one or paste your own.',
    logoEmojiEmpty: 'Empty — using default 🎂',
    logoUploadHint: 'Square images work best. Auto-resized to 256×256. Max 5 MB.',
    logoUploadReady: 'Ready to save',
    logoUploadError: "Couldn't read that image. Try a different file.",
    logoUploadTooLarge: 'Image too large after resizing. Try a simpler logo.',
    logoFaviconNote: 'Also updates the browser tab icon.',
    logoFallbackWarning: "Image couldn't load. Falling back to emoji.",
    tabTheme:'Theme',
    themePresetTitle:'Preset palettes',
    themePreviewTitle:'Live preview',
    themeSave:'Save theme',
    themeApplied:'Theme saved',
    themeReverted:'Reverted to last saved theme',
    themePreviewHeading:'A sample heading',
    themePreviewBody:'Body text on the base background, exactly as it will appear on the site.',
    themePreviewPrimary:'Primary button',
    themePreviewGhost:'Ghost button',
    themePreviewGold:'Gold accent ★★★★★',
    themePreviewPrice:'$38 · 49,750 د.ع',
    themePresetBerry:'Berry',
    themePresetChocolate:'Chocolate',
    themePresetSage:'Sage',
    themePresetRose:'Rose',
    themePresetMidnight:'Midnight',
    themeAutoDark:'Enable auto-dark mode (system)',
    // Added in v3: accounts, checkout, moderation and save states
    btnClose: 'Close',
    btnConfirm: 'Confirm',
    confirmTitle: 'Are you sure?',
    errFillFields: 'Please fill in the required fields.',
    errInvalidUrl: 'Use a full web address that starts with https://',
    errInvalidWhatsApp: 'Enter the WhatsApp number in international format, for example 9647501234567.',
    loginSuccess: 'You are signed in.',
    sessionExpired: 'Your staff sign-in has expired. Please sign in again.',
    staffAccessGranted: 'Signed in. Opening the control panel.',
    staffNoAccess: 'This account doesn\'t have staff access. Ask the shop owner to add you.',
    syncOffline: 'You\'re offline. Showing the menu saved on this device.',
    saveNeedsSignIn: 'Sign in with a staff account to save changes.',
    saveOffline: 'Not saved: you\'re offline. Your changes are still in the form — try again when you\'re connected.',
    saveDenied: 'Not saved: your account isn\'t allowed to change this section.',
    saveInvalid: 'Not saved: some values are not valid. Check the form and try again.',
    saveFailed: 'Not saved: something went wrong. Your changes are still in the form — try again.',
    statusSaving: 'Saving…',
    statusSaved: 'All changes saved',
    statusFailed: 'Last change not saved',
    menuNoProducts: 'The menu is being updated. Please check back soon.',
    cartEach: '{price} each',
    cartQtyLabel: 'Quantity of {name}',
    cartDecrease: 'One fewer {name}',
    cartIncrease: 'One more {name}',
    cartRemove: 'Remove {name}',
    cartItemRemoved: '{name} removed from your order.',
    cartClearTitle: 'Clear your order?',
    cartClearConfirm: 'This removes every item from your order tray.',
    trayItemsLabel: '{n} items',
    pickupOnlyLabel: 'Pickup from our kitchen',
    trayDateHint: 'We need at least {hours} hours. Earliest: {date}.',
    checkoutNeedName: 'Add your name so the bakery knows who the order is for.',
    checkoutNeedDate: 'Choose a delivery or pickup date and time.',
    checkoutBadDate: 'That date isn\'t valid. Choose it again from the calendar.',
    checkoutDateTooSoon: 'We need at least {hours} hours to bake your order. The earliest time is {date}.',
    checkoutDateTooFar: 'Please choose a date within the next 12 months.',
    checkoutNoWhatsApp: 'WhatsApp ordering isn\'t set up yet. Please contact the bakery directly.',
    checkoutOpened: 'WhatsApp opened. Complete sending your order in WhatsApp.',
    checkoutBlocked: 'WhatsApp didn\'t open automatically. Use the link below to send your order.',
    checkoutAgainTitle: 'Send this order again?',
    checkoutAgainConfirm: 'You already opened WhatsApp with this exact order. Open it again?',
    checkoutAgainOk: 'Open WhatsApp again',
    checkoutAddressLabel: 'Delivery address',
    orderSavedToHistory: 'Order saved to your order history.',
    orderHistorySaveFailed: 'Your order message is ready in WhatsApp, but it couldn\'t be saved to your online order history.',
    trayClearedAfterSend: 'Order tray cleared.',
    myOrdersBtn: 'My orders',
    myOrdersHideDetails: 'Hide details',
    historyScopeAccount: 'Orders linked to your account, plus any sent from this device.',
    historyScopeDevice: 'Orders sent from this device. Sign in to keep your history across devices.',
    historyRequestedFor: 'Requested for',
    orderStatusSent: 'Sent on WhatsApp',
    orderStatusConfirmed: 'Confirmed',
    orderStatusCompleted: 'Completed',
    customerFallbackName: 'Customer',
    contactNotSet: 'Contact details coming soon.',
    customersScopeHint: 'Shows customers with an account and the latest 200 orders.',
    darkModeOn: 'Dark mode on',
    darkModeOff: 'Light mode on',
    reviewVerifiedRole: 'Customer',
    reviewStarsLabel: 'Rated {n} out of 5',
    reviewsEmpty: 'No reviews yet. Be the first to share yours.',
    reviewPending: 'Thank you! Your review will appear once the bakery has approved it.',
    reviewDenied: 'Your review could not be sent. Please sign in again and retry.',
    reviewFailed: 'Your review could not be sent. Please try again.',
    reviewsPendingTitle: 'Waiting for approval',
    reviewsPendingEmpty: 'No reviews are waiting.',
    reviewsDecidedTitle: 'Recently moderated',
    reviewApprove: 'Approve',
    reviewReject: 'Reject',
    reviewUnpublish: 'Unpublish',
    reviewApproved: 'Review published.',
    reviewRejected: 'Review hidden.',
    reviewDeleteConfirm: 'Delete this review permanently?',
    reviewsCuratedTitle: 'Featured reviews',
    reviewsCuratedHint: 'Reviews you add here appear on the storefront as written.',
    reviewsResetBtn: 'Restore defaults',
    reviewsResetTitle: 'Restore the default reviews?',
    reviewsResetConfirm: 'This replaces your featured reviews with the original three.',
    reviewsAddBtn: 'Add review',
    tabBrand: 'Brand & Logo',
    tabAbout: 'About Us',
    tabFaq: 'FAQ',
    tabReviews: 'Reviews',
    tabContact: 'Contact',
    tabSocials: 'Social Media',
    tabProducts: 'Products',
    tabUsers: 'Staff',
    tabData: 'Data',
    usersClaimsHint: 'Staff access is granted by the shop owner with a one-time command. Add or change people here, then run:',
    staffUidInvalid: 'Paste the person\'s User UID from Firebase Authentication.',
    staffSavedHint: 'Saved. Run the staff command so the change takes effect, then ask them to sign in again.',
    staffRemovedHint: 'Removed from the list. Run the staff command to revoke their access.',
    prodDeleteTitle: 'Delete this product?',
    prodNewDraft: 'New product created. Fill it in and press Save to publish it.',
    prodPhotoRemovedPending: 'Photo removed. Press Save to apply.',
    prodPriceInvalid: 'Enter a price between 0 and 100,000.',
    importTitle: 'Import this backup?',
    importConfirm: 'This replaces the live shop settings and updates every product in the backup.',
    importBtn: 'Import backup',
    resetDeviceTitle: 'Reset this device',
    resetDeviceBtn: 'Clear data on this device',
    resetDeviceHint: 'Clears the menu, settings and order history cached in this browser. The live shop isn\'t changed.',
    resetDeviceConfirm: 'Clear everything cached in this browser? The live shop isn\'t changed.',
    resetDeviceDone: 'This device was reset. Live shop data is loading again.',
    leadTimeLabel: 'Preparation time (hours)',
    leadTimeHint: 'Customers cannot pick a delivery time sooner than this.',
    authErr_popupClosed: 'Sign-in was cancelled.',
    authErr_popupBlocked: 'Your browser blocked the sign-in window. Allow pop-ups and try again.',
    authErr_badCredentials: 'That email and password don\'t match.',
    authErr_badEmail: 'That email address doesn\'t look right.',
    authErr_tooMany: 'Too many attempts. Wait a few minutes and try again.',
    authErr_offline: 'You\'re offline. Connect and try again.',
    authErr_providerDisabled: 'This sign-in method isn\'t enabled for the shop yet.',
    authErr_unauthorizedDomain: 'Sign-in isn\'t allowed on this web address yet.',
    authErr_generic: 'Sign-in didn\'t work. Please try again.',
    fontPreview: 'Preview',
    authCustomerLead: 'Sign in with Google to keep your order history on every device and to leave reviews.',
    authGoogleBtn: 'Continue with Google',
    authGuestNote: 'No account needed to order — just add your name when you send your order.',
    authOr: 'or',
    btnSave: 'Save',
    btnSendReview: 'Send review',
    btnStaffLogin: 'Sign in',
    checkoutAddressOptional: 'Delivery address (optional for pickup)',
    checkoutDetailsLegend: 'Your details',
    checkoutDoneClear: 'I sent it — clear the tray',
    checkoutNameLabel: 'Name *',
    checkoutOpenAgain: 'Open WhatsApp',
    checkoutPhoneLabel: 'Phone (optional)',
    checkoutRemember: 'Remember my details on this device',
    labelEmail: 'Email',
    leaveReviewDescModerated: 'Tell us about your cake. Reviews appear after the bakery approves them.',
    perm_faq: 'FAQ',
    perm_reviews: 'Reviews',
    reviewRatingLabel: 'Your rating',
    reviewSignInNeeded: 'Please sign in with Google so we can make sure reviews come from real customers.',
    staffEntryLead: 'The person signs in with their own Google or email account. Copy their User UID from Firebase Authentication.',
    staffEntryTitle: 'Staff member',
    staffLoginLead: 'For the bakery team. Access is granted by the shop owner.',
    staffLoginLink: 'Staff sign-in',
    staffLoginTitle: 'Staff sign-in',
    staffPermsLegend: 'Sections staff can edit',
    staffUidLabel: 'User UID',
    trayHeading: 'Your order',
    trayYourOrder: 'Your order',
    trayCloseDetails: 'Close order details',
    trayItemsListLabel: 'Items in your order',
    btnClosePanel: 'Close control panel',
    colPhone: 'Phone',
  },
  ku: {
    btnCancel: "پاشگەزبوونەوە",
    btnSubmit: "ناردن",
    btnSaveConfig: "پاشەکەوتکردنی ڕێکخستنەکان",
    economyTitle: "نرخدانان و ئابووری",
    economyDesc: "بەڕێوەبردنی نرخی ئاڵوگۆڕ، کرێی گەیاندن و مەرجەکانی کەمترین داواکاری.",
    btnCancel: "پاشگەزبوونەوە",
    btnSubmit: "ناردن",
    btnSaveConfig: "پاشەکەوتکردنی ڕێکخستنەکان",
    economyTitle: "نرخدانان و ئابووری",
    economyDesc: "بەڕێوەبردنی نرخی ئاڵوگۆڕ، کرێی گەیاندن و مەرجەکانی کەمترین داواکاری.",
    shopTagline: 'شیرینەمەنی دەستکردی نایاب',
    announcementText: 'پێشوەختە داوا بکە بۆ ئاهەنگەکانی کۆتایی هەفتە! <strong>گەیاندنی خۆڕایی</strong> بۆ داواکاری سەروو {freeDelivery}.',
    navMenu: 'لیستی شیرینی',
    navHowItWorks: 'شێوازی داواکردن',
    navOurStory: 'چیرۆکی ئێمە',
    navReviews: 'ڕای کڕیاران',
    navContact: 'پەیوەندی',
    navFaq: 'پرسیارە باوەکان',
    heroEyebrow: 'شیرینەمەنی و پاتیسێری دەستکرد',
    heroTitle: 'کێکی تایبەت بە <em>شەیدایی</em> و خۆشەویستی',
    heroLead: 'ئێمە هەموو ڕۆژێک کێکی ئاهەنگگێڕان، شیرینی ناسک، و کەپکێکی بێوێنە بە کەرەستەی ئۆرگانیک دروست دەکەین. گەیاندنی خێرا لەڕێگەی واتسئاپەوە بۆ ئاهەنگەکانتان.',
    heroCtaPrimary: 'بینینی هەموو شیرینییەکان',
    heroCtaSecondary: 'گفتوگۆ لەگەڵ وەستای کێک',
    trust1: '١٠٠٪ ئاردی ئۆرگانیک',
    trust2: 'برژاوی ڕۆژ و تازە',
    trust3: 'نووسینی ناوی دڵخواز',
    badgeFresh: 'تازە لە کاتژمێر ٦ی بەیانییەوە',
    heroReviewSnippet: '"باشترین کێکی ڕێد ڤێلڤێت لە شاردا! تامی بێوێنەیە."',
    feat1Title: 'پێکهاتەی سروشتی',
    feat1Desc: 'کەرەی پاک، شوکۆڵاتەی بەلجیکی، میوەی تازە، و بەبێ هیچ ماددەیەکی پارێزەر.',
    feat2Title: 'گەیاندنی پارێزراو',
    feat2Desc: 'بە ئۆتۆمبێلی فێنککەرەوە دەگەیەنرێت بۆ ئەوەی کێکەکەت بە جوانی تەواو بگات.',
    feat3Title: 'دیزاینی دڵخواز',
    feat3Desc: 'کێکی چەندین نهۆم، نووسینی شوکۆڵاتەیی، و شیرینی تایبەت بۆ هەموو یادێک.',
    menuEyebrow: 'هەڵبژاردەی ڕۆژانەمان',
    menuTitle: 'بە تازەیی بۆ تۆ برژاوە',
    menuLead: 'سەیری کێک و کەپکێک و شیرینییەکانمان بکە. کرتە لەسەر "زیادکردن" بکە بۆ داواکردن لە واتسئاپ.',
    catAll: 'هەموو شیرینییەکان',
    catCakes: 'کێکەکان',
    catCupcakes: 'کەپکێک',
    catDesserts: 'دیسێرت',
    tagBestseller: 'پڕفرۆشترین',
    tagNew: 'نوێ',
    btnAdd: 'زیادکردن بۆ سەبەتە',
    stepsEyebrow: 'ئاسان و خێرا',
    stepsTitle: 'چۆنیەتی داواکردن',
    stepsLead: 'سێ هەنگاوی زۆر سادە لە چێشتخانەکەمانەوە بۆ سەر مێزی ئاهەنگەکەت.',
    step1Title: 'دڵخوازی خۆت هەڵبژێرە',
    step1Desc: 'سەیری لیستەکەمان بکە و ئەو شیرینییە هەڵبژێرە کە دەتەوێت لەگەڵ خۆشەویستانت بەشی بکەیت.',
    step2Title: 'لە واتسئاپەوە بینێرە',
    step2Desc: 'کرتە لەسەر ناردن بکە تا ڕاستەوخۆ داواکارییە ڕێکخراوەکەت بگاتە دەست وەستای شیرینی.',
    step3Title: 'وەریبگرە و ئاهەنگ بگێڕە',
    step3Desc: 'کاتی گەیاندن یان وەرگرتن دادەنێین، بە تازەیی دەبرژێنین و دەگەیەنینە بەردەم دەرگاتان.',
    storyEyebrow: 'مێژوو و ڕەسەنایەتی',
    storyTitle: 'بە ئارامی دروستکراو، بە دڵسۆزی برژاو',
    bullet1: 'کەرە و شیری سروشتی و ئاردی ئۆرگانیک',
    bullet2: 'بەبێ هیچ ڕەنگ و تامی دەستکرد',
    bullet3: 'وەستای ئەزمووندار بە شێوازی ئەوروپی',
    reviewsEyebrow: 'ڕای کڕیاران',
    reviewsTitle: 'وتەی شیرینی کڕیارە ئازیزەکانمان',
    reviewsLead: 'بۆچوونی ڕاستەقینە لە یادی لەدایکبوون و ئاهەنگە دڵخۆشکەرەکان.',
    btnLeaveReview: 'نووسینی بۆچوون',
    leaveReviewTitle: 'نووسینی بۆچوون',
    leaveReviewDesc: 'بە خۆشحاڵییەوە گوێبیستی ڕای ئێوە دەبین!',
    reviewFormName: 'ناوت',
    reviewFormQuote: 'بۆچوونەکەت',
    review1Quote: '"کێکی فستق و گوڵاو جوانترین دیاری بوو بۆ ساڵیادی هاوسەرگیریمان. زۆر ناسک بوو و شیرینییەکەی تەواو لەجێی خۆیدا بوو."',
    review1Role: 'کڕیاری دڵنیاکراو',
    review2Quote: '"داواکردن بە واتسئاپ زۆر خێرا بوو! کاتژمێر ١٠ داوام کرد، کاتژمێر ٢ لە ئۆفیس پێم گەیشت."',
    review2Role: 'ئاهەنگی فەرمانگە',
    review3Quote: '"ماکارۆن و تارتی کارامێلەکەیان بێ وێنەیە. تامی کەرەی ڕاستەقینە و ڤانێلای چاک لە هەموو پارچەیەکدا دیارە."',
    review3Role: 'کڕیاری هەمیشەیی',
    faqEyebrow: 'پرسیارە دووبارەکان',
    faqTitle: 'پرسیارە باوەکان',
    faqLead: 'هەموو زانیارییەک دەربارەی شێوازی داواکردن، جۆری کەرەستەکان و کاتی گەیاندن.',
    faq1Q: 'چەند کاتژمێر پێشوەخت پێویستە کێک داوا بکەم؟',
    faq1A: 'بۆ کێکە ئاساییەکانی لیستەکە، داواکاری ٢٤ کاتژمێر پێشتر گەرەنتی کراوە. بۆ کێکی تایبەتی چەندین نهۆم پێویستمان بە ٤٨ بۆ ٧٢ کاتژمێرە.',
    faq2Q: 'شێوازی کڕین لەڕێگەی واتسئاپ چۆنە؟',
    faq2A: 'کاتێک دەست دەنێیت بە "ناردن لە واتسئاپ"، هەموو شیرینییە هەڵبژێردراوەکان لە پەیامێکی ڕێکخراودا ئامادە دەکرێن و ڕاستەوخۆ دەینێریت بۆمان!',
    faq3Q: 'ئایا کێکی بێ هێلکە یان بێ گلوتینتان هەیە؟',
    faq3A: 'بەڵێ! کێکی شوکۆڵاتەی تایبەت بەبێ هێلکە و تارتی ئاردی بادەم بۆ کەسانی هەستیار ئامادە دەکرێت بە داواکاری پێشوەختە.',
    faq4Q: 'ئایا دەتوانم نووسینی سەر کێک دیاری بکەم؟',
    faq4A: 'بەڵێ، لەسەر هەموو کێکە گەورەکان نووسینی ناوی دڵخواز بە شوکۆڵاتە لەسەر پلێتی شەکری بە دیاری پێشکەش دەکرێت.',
    faq5Q: 'شێوازی پارەدان چۆنە؟',
    faq5A: 'پارەدان بە کاش لە کاتی وەرگرتن، هەروەها لەڕێگەی فاستپەی، بانکی یەکەمی عێراقی (FIB) و زەین کاش قبوڵ دەکرێت.',
    ctaTitle: 'ئامادەیت بۆنەکەت شیرینتر بکەیت؟',
    ctaLead: 'دیزاین یان بیرۆکەیەکی تایبەتت لە مێشکدایە؟ وەستاکانمان ئامادەن خەونەکەت بکەنە ڕاستی.',
    ctaBtnWhatsApp: 'پەیوەندی لە واتسئاپ',
    ctaBtnMenu: 'بینینی هەموو کێکەکان',
    cardAddressTitle: 'چێشتخانەی شیرینی',
    cardHoursTitle: 'کاتژمێرەکانی کارکردن',
    cardContactTitle: 'پەیوەندی ڕاستەوخۆ',
    footerBlurb: 'شیرینەمەنییەکی دەستکردی نایاب تایبەت بە کێکی بۆنەکان، کەپکێکی ناسک و شیرینی فەڕەنسی.',
    footerShopLinks: 'بەشەکانی فرۆشگا',
    footerHelpLinks: 'یارمەتی و زانیاری',
    footerHoursTitle: 'کاتەکانی برژاندن',
    footerBestsellers: 'پڕفرۆشترینەکان',
    copyrightAllRights: 'هەموو مافەکانی پارێزراوە.',
    footerTagline: 'ڕۆژانە بە کەرەستەی سروشتی و خۆشەویستی پاک دەبرژێنرێت.',
    btnSignIn: 'چوونەژوورەوە',
    btnPanel: 'پانێڵی کۆنتڕۆڵ',
    btnLogout: 'دەرچوون',
    trayItemLabel: 'بەند',
    trayItemLabelSingular: 'بەند',
    trayClear: 'سڕینەوەی سەبەتە',
    traySendWhatsApp: 'ناردنی داواکاری لە واتسئاپ',
    tabCustomer: 'کڕیار',
    customerTitle: 'چوونەژوورەوەی خێرای کڕیار',
    customerDesc: 'تەنها ژمارەی مۆبایل و ناوت بنووسە. بەبێ وشەی نهێنی! ناوت بۆ داواکاری واتسئاپ بەکاردێت.',
    labelPhone: 'ژمارەی مۆبایل (کەمترین ٦ ژمارە)',
    labelDisplayName: 'ناوی بەڕێزت',
    btnContinue: 'بەردەوامبوون وەک کڕیار',
    labelUsername: 'ناوی بەکارهێنەر یان ئیمەیڵ',
    labelPassword: 'وشەی نهێنی',
    tabAdmin: 'بەڕێوەبەر',
    tabDev: 'گەشەپێدەر',
    staffFormDesc: 'تکایە زانیارییەکانی چوونەژوورەوەت بنووسە بۆ بینینی پەنێڵی کۆنترۆڵ.',
    historyZero: "هیچ داواکارییەکت نەکردووە.",
    trayEmptyPreview: 'هیچ کاڵایەک هەڵنەبژێردراوە',
    storyImgTitle: 'کەلەپووری شیرینی دەستکرد',
    storyImgDesc: 'بە فرێشی لە فڕنەوە بۆ ئاهەنگی خێزانەکەت',
    review1Name: 'سارا و کەریم',
    review2Name: 'دانیار ئازاد',
    review3Name: 'لینا ڕۆستەم',
    footerOrdersInfo: 'داواکاری و پرسیار:',
    invalidPromo: 'کۆدی داشکاندن هەڵەیە',
    promoRemoved: 'کۆدی داشکاندن سڕایەوە',
    itemsNotAvailable: 'ئەم کاڵایانە لە ئێستادا لە مێنیودا بەردەست نین.',
    signedInAs: 'چوویتە ژوورەوە وەک {name}',
    loggedInAs: 'چوویتە ژوورەوە وەک {role}',
    loggedOut: 'بە سەرکەوتوویی چوویەدەرەوە.',
    orderStatusUpdated: 'باری داواکاری گۆڕدرا بۆ {status}',
    noteSaved: 'تێبینی پاشەکەوت کرا',
    invalidUrl: 'شێوازی بەستەر هەڵەیە. تەنها بەستەرەکانی http:// و https:// پشتگیری دەکرێن.',
    staffAdded: 'بەکارهێنەری ستاف بە سەرکەوتوویی زیادکرا',
    usersTitle: 'بەڕێوەبردنی بەکارهێنەران و ستاف',
    usersAddStaff: 'زیادکردنی ئەژمێری ستاف',
    usersSearch: 'گەڕان بۆ بەکارهێنەران…',
    usersHint: 'ئەدمینەکان ئەژمێرەکانی ستاف و تێپەڕەوشەکان بەڕێوە دەبەن. ئەژمێری گەشەپێدەر و ئەدمین پارێزراون.',
    usersColRole: 'ڕۆڵ',
    usersColName: 'ناو',
    usersColLogin: 'ناوی بەکارهێنەر / مۆبایل',
    usersColPassword: 'تێپەڕەوشە',
    usersColPerms: 'مۆڵەتەکان',
    usersColActions: 'کردارەکان',
    usersNoPassword: 'کڕیار — چوونەژوورەوەی نییە',
    usersYou: '(تۆ)',
    usersEmpty: 'هیچ بەکارهێنەرێک نەدۆزرایەوە.',
    usersNoAccess: 'ڕێگەت نییە بە بەڕێوەبردنی بەکارهێنەران.',
    usersEdit: 'دەستکاری',
    usersResetPw: 'گۆڕینی تێپەڕەوشە',
    usersDelete: 'سڕینەوە',
    role_admin: 'ئەدمین',
    role_dev: 'گەشەپێدەر',
    role_staff: 'ستاف',
    role_customer: 'کڕیار',
    perm_products: 'بەرهەمەکان',
    perm_customers: 'کڕیاران',
    perm_economy: 'ئابووری',
    perm_brand: 'براند و لۆگۆ',
    perm_theme: 'ڕووکار',
    perm_fonts: 'فۆنتەکان',
    perm_about: 'دەربارەی ئێمە',
    perm_contact: 'پەیوەندی',
    perm_socials: 'سۆشیال میدیا',
    editUserTitle: 'دەستکاریکردنی بەکارهێنەر',
    usersNewPwPrompt: 'تێپەڕەوشەی نوێ بۆ {name}:',
    staffPwTooShort: 'تێپەڕەوشە دەبێت لانیکەم ٤ پیت بێت.',
    usersCannotDeleteSelf: 'ناتوانیت ئەژمێری خۆت بسڕیتەوە.',
    usersCannotDeleteElevated: 'تەنها گەشەپێدەر دەتوانێت ئەژمێری ئەدمین و گەشەپێدەر بسڕێتەوە.',
    usersConfirmDelete: 'دڵنیایی لە سڕینەوەی "{name}"؟ ئەمە ناگەڕێتەوە.',
    phonePreviewLabel: 'پانی پیشاندان',
    phonePreviewDesktop: 'کۆمپیوتەر',
    phonePreviewPhone: 'مۆبایل',
    backupImported: 'باکئەپ بە سەرکەوتوویی هێنرایە ناوەوە!',
    copiedJson: 'JSON کۆپی کرا بۆ کلیپبۆرد!',
    factoryResetDone: 'گەڕانەوە بۆ باری بنەڕەتی بە سەرکەوتوویی تەواو بوو.',
    btnLogin: 'چوونەژوورەوە بۆ پانێڵ',
    panelTitle: 'پانێڵی کۆنتڕۆڵی شیرینەمەنی',
    uploadPhoto: 'وێنە باربکە',
    replacePhoto: 'وێنە بگۆڕە',
    removePhoto: 'سڕینەوەی وێنە',
    photoHint: 'JPG، PNG یان WebP — خۆکارانە قەبارەکەی دەکرێتە ٨٠٠ پێکسڵ. زۆرترین ٥ مێگابایت.',
    noPhotoHint: 'هێشتا وێنە نییە — ئیمۆجی پیشان دەدرێت',
    prodPhotoError: 'کرداری وێنەکە سەرکەوتوو نەبوو. تکایە فایلێکی تر تاقی بکەرەوە.',
    prodPhotoTooLarge: 'قەبارەی وێنەکە زۆر گەورەیە. تکایە وێنەیەکی بچووکتر هەڵبژێرە.',
    prodPhotoRemoved: 'وێنەکە سڕایەوە.',
    storageQuotaError: 'شوێنی پاشەکەوتکردن پڕبووە — وێنەی بچووکتر بەکاربێنە یان وێنەکان کەم بکەرەوە.',
    prodDeleteConfirm: 'دڵنیایت لە سڕینەوەی ئەم بەرهەمە؟',
    btnAddNewProduct: '+ زیادکردنی بەرهەمی نوێ',
    btnSaveProduct: 'پاشەکەوتکردنی بەرهەم',
    btnDeleteProduct: 'سڕینەوەی بەرهەم',
    tabFonts: 'فۆنتەکان',
    fieldKurdishBody: 'فۆنتی ناوەوە (کوردی)',
    fieldKurdishDisplay: 'فۆنتی سەرنوسراو (کوردی)',
    fieldEnglishBody: 'فۆنتی ناوەوە (ئینگلیزی)',
    fieldEnglishDisplay: 'فۆنتی سەرنوسراو (ئینگلیزی)',
    saveFonts: 'پاشەکەوتکردنی فۆنت',
fontPreview: 'پێشبینین',
    customizeTitle: 'دەستکاری کردن',
    customizeLeaveOut: 'لایببە',
    customizeSkip: 'تێپەڕاندن — وەک خۆی زیادی بکە',
    customizeAdd: 'زیادکردن بۆ داواکاری',
    customizeNone: 'هیچ شتێک نییە بۆ دەستکاریکردن',
    orderNoteLabel: 'تێبینی بۆ نانەوا (ئارەزوومەندانە)',
    orderNotePlaceholder: 'بۆ نموونە "جەژنی لەدایکبوون پیرۆز سارا"',
    orderNoteTooLong: 'تێبینییەکە زۆر درێژە — زۆرترین ٣٠٠ پیت.',
    waNote: 'تێبینی بۆ نانەوا',
    waExclude: 'بێ',
    toastPhotoReady: 'وێنەکە ئامادەکرا و دەتوانیت پاشەکەوتی بکەیت.',
    toastAdded: 'زیادکرا بۆ سەبەتەکەت!',
    toastOrderCleared: 'سەبەتەی داواکاری پاککرایەوە.',
    toastSaved: 'بە سەرکەوتوویی پاشەکەوت کرا',
    toastDeleted: 'بە سەرکەوتوویی سڕایەوە',
    toastInvalidPhone: 'تکایە ژمارەی مۆبایلی دروست بە کەمترین ٦ ژمارە بنووسە.',
    toastInvalidLogin: 'ناوی بەکارهێنەر یان وشەی نهێنی هەڵەیە.',
    toastInvalidJson: 'فۆرماتی JSON هەڵەیە، تکایە دڵنیابەرەوە.',
    tabEconomy: 'ئابووری',
    economyCurrencies: 'دراوەکان',
    economyExchange: 'نرخی ئاڵوگۆڕ',
    economyDelivery: 'گەیاندن',
    economyTax: 'باج',
    economyDiscounts: 'داشکاندن',
    fieldPrimaryCurrency: 'دراوی سەرەکی (داخراو)',
    fieldSecondaryCurrency: 'دراوی دووەم',
    fieldShowSecondary: 'پیشاندانی دراوی دووەم لە ماڵپەڕ',
    fieldCurrencySymbol: 'هێمای دراو',
    fieldExchangeRate: '1 دۆلار = ؟ دینار',
    fieldRoundingRule: 'خستنەوەی نرخی گۆڕدراو بۆ',
    fieldAutoRefresh: 'نوێکردنەوەی خۆکار (هێشتا چالاک نییە)',
    fieldDeliveryFee: 'کرێی گەیاندن (دۆلار)',
    fieldFreeDeliveryOver: 'گەیاندنی خۆڕایی بۆ سەرووی (دۆلار)',
    fieldMinimumOrder: 'کەمترین داواکاری (دۆلار)',
    fieldPickupOnly: 'تەنها وەرگرتن — گەیاندن بشارەوە',
    fieldTaxEnabled: 'وەرگرتنی باج',
    fieldTaxRate: 'ڕێژەی باج (%)',
    fieldTaxLabel: 'ناوی باج',
    fieldTaxIncluded: 'نرخەکان باج لەخۆدەگرن',
    fieldPromoCode: 'کۆدی داشکاندنی چالاک',
    fieldPromoType: 'جۆری داشکاندن',
    fieldPromoValue: 'بڕی داشکاندن',
    fieldPromoExpiry: 'بەسەرچوون لە',
    saveEconomy: 'پاشەکەوتکردنی ڕێکخستنی ئابووری',
    roundNearest1: 'نزیکترین 1',
    roundNearest250: 'نزیکترین 250',
    roundNearest500: 'نزیکترین 500',
    roundNearest1000: 'نزیکترین 1000',
    promoPercent: 'ڕێژە (%)',
    promoFixed: 'بڕی جێگیر (دۆلار)',
    subtotal: 'کۆی لاوەکی',
    deliveryFee: 'گەیاندن',
    tax: 'باج',
    discount: 'داشکاندن',
    total: 'کۆی گشتی',
    freeDelivery: 'خۆڕایی',
    minimumOrderWarning: 'کەمترین داواکاری {amount}ە. {remaining} زیاتر زیاد بکە بۆ تەواوکردن.',
    promoApplied: 'کۆدی داشکاندن {code} جێبەجێکرا',
    promoExpired: 'کۆدی داشکاندن بەسەرچووە',
    economyPreview: 'پێشبینینی ڕاستەوخۆ',
    economyPreviewSample: 'داواکاری نموونە: 50 دۆلار کۆی لاوەکی',
    trayDetails: 'وردەکاری ▾',
    trayDetailsClose: 'داخستن ▴',
    trayDateLabel: 'بەروار و کاتی گەیاندن یان وەرگرتن *',
    trayPaymentNote: 'پارەدان لە کاتی گەیاندن. کرێی گەیاندن لە واتسئاپ پشتڕاست دەکەینەوە.',
    inOrderCount: '{n} لە داواکارییەکەتدا',
    skipToMenu: 'بڕۆ بۆ لیستی شیرینی',
    trayApplyPromo: 'جێبەجێکردن',
    trayRemovePromo: 'سڕینەوە',
    trayPromoPlaceholder: 'کۆدی داشکاندن',
    deliveryFreeForEveryone: 'گەیاندنی خۆڕایی بۆ هەمووان',
    freeDeliveryWarning: 'ئاستی گەیاندنی خۆڕایی کەمترە لە کەمترین داواکاری — کڕیارانی خوار کەمترین ناتوانن داوا بکەن.',
    promoActive: 'چالاکە',
    promoTooShort: 'کەمترین ٣ پیت',
    taxAddedCheckout: 'لە کاتی کڕین زیاد دەکرێت',
    taxIncludedLabel: 'بەشدارە',
    pickupAvailable: 'وەرگرتن لە چێشتخانە بەردەستە',
    justNow: 'ئێستا',
    roundedFrom: 'خستنەوە لە {raw} بۆ {rounded} (نزیکترین {rule})',
    searchPlaceholder: 'گەڕان بۆ کێک، کاپکێک، شیرینی…',
    searchShortcut: '⌘K دابگرە بۆ گەڕان',
    searchResultsCount: '{shown} لە {total} کێک پیشان دەدرێت',
    searchNoResults: 'هیچ کێکێک نەدۆزرایەوە بۆ "{query}".',
    searchEmptyDesc: 'هەوڵبدە گەڕانەکەت بسڕیتەوە یان مەودای نرخ یان هاوپۆلێکی تر هەڵبژێریت.',
    searchClearAll: 'پاککردنەوەی هەموو فلتەرەکان',
    searchClearSearch: 'پاککردنەوەی گەڕان',
    sortLabel: 'ڕیزکردن',
    sortPopular: 'بەناوبانگ',
    sortNewest: 'نوێترین',
    sortPriceAsc: 'نرخ: لە کەمەوە بۆ زۆر',
    sortPriceDesc: 'نرخ: لە زۆرەوە بۆ کەم',
    sortNameAsc: 'ناو A–Z',
    priceRangeLabel: 'نرخ',
    priceAny: 'هەر نرخێک',
    priceUnder20: 'کەمتر لە 20 دۆلار',
    price20to40: '20 – 40 دۆلار',
    price40to60: '40 – 60 دۆلار',
    priceOver60: 'زیاتر لە 60 دۆلار',
    myOrders: 'داواکارییەکانم',
    myOrdersTitle: 'داواکارییەکانم',
    myOrdersSubtitle: '{count} داواکاریت کردووە لە {date}ەوە.',
    myOrdersEmpty: 'هێشتا هیچ داواکارییەک نییە.',
    myOrdersEmptyHint: 'مێنیو ببینە و یەکەم داواکاریت بکە — لێرە دەردەکەوێت.',
    myOrdersBrowse: 'مێنیو ببینە',
    myOrdersReorder: 'دووبارە داواکردن',
    myOrdersDetails: 'بینینی وردەکاری',
    myOrdersTotalSpent: 'کۆی خەرجکراو',
    myOrdersTotalOrders: 'داواکارییەکان',
    myOrdersFavourite: 'زۆرترین داواکراو',
    orderStatusPending: 'چاوەڕوان',
    orderStatusBaking: 'دەژەنرێت',
    orderStatusDelivered: 'گەیەندرا',
    orderStatusCancelled: 'هەڵوەشێنراوە',
    orderSignInToSave: 'بچۆ ژوورەوە بۆ پاشەکەوتکردنی ئەم داواکارییە.',
    orderAddedToTray: '{count} بەند زیادکرا بۆ داواکاریەکەت',
    tabCustomers: 'کڕیارەکان',
    customersSearch: 'گەڕان بە ناو یان مۆبایل…',
    customersSortName: 'ناو',
    customersSortLastOrder: 'دوایین داواکاری',
    customersSortTotalSpent: 'کۆی خەرجکراو',
    customersSortOrderCount: 'ژمارەی داواکاری',
    customersEmpty: 'هێشتا هیچ کڕیارێک نییە.',
    customerOrders: 'داواکارییەکان',
    customerTotalSpent: 'کۆی خەرجکراو',
    customerLastOrder: 'دوایین داواکاری',
    customerNoOrders: 'ئەم کڕیارە هیچ داواکارییەکی نییە.',
    customerPrivateNote: 'تێبینی تایبەت (تەنها کارمەندان)',
    customerChangeStatus: 'گۆڕینی دۆخ',
    logoSection: 'لۆگۆ',
    logoModeEmoji: 'ئیمۆجی',
    logoModeUpload: 'بارکردن',
    logoModeUrl: 'بەستەر',
    logoPreview: 'پێشبینین',
    logoUploadBtn: 'بارکردنی لۆگۆ',
    logoReplaceBtn: 'گۆڕینی لۆگۆ',
    logoRemoveBtn: 'سڕینەوەی لۆگۆ',
    logoRemoveConfirm: 'لۆگۆی ئێستا بسڕدرێتەوە و ئیمۆجی بەکاربهێنرێت؟',
    logoRemoved: 'لۆگۆ سڕایەوە — ئیمۆجی بەکاردێت.',
    logoUrlLabel: 'بەستەری وێنەی دوور',
    logoUrlHint: 'بەستەرێکی ڕاستەوخۆ بۆ فایلی PNG، JPG، WebP یان SVG دابنێ.',
    logoUrlValid: 'بەستەر دروستە',
    logoUrlInvalid: 'نەتوانرا ئەم بەستەرە بار بکرێت',
    logoEmojiLabel: 'ئیمۆجی',
    logoEmojiHint: 'یەکێک هەڵبژێرە یان هی خۆت دابنێ.',
    logoEmojiEmpty: 'بەتاڵ — 🎂 ی بنەڕەت بەکاردێت',
    logoUploadHint: 'وێنەی چوارگۆشە باشترینە. خۆکارانە بۆ 256×256 دەگۆڕدرێت. زۆرترین 5 مێگابایت.',
    logoUploadReady: 'ئامادەیە بۆ پاشەکەوتکردن',
    logoUploadError: 'نەتوانرا ئەم وێنەیە بخوێنرێتەوە. فایلێکی تر تاقی بکەوە.',
    logoUploadTooLarge: 'وێنە زۆر گەورەیە دوای گۆڕین. لۆگۆیەکی سادەتر تاقی بکەوە.',
    logoFaviconNote: 'هەروەها ئایکۆنی تابەکەش نوێ دەکاتەوە.',
    logoFallbackWarning: 'وێنە نەتوانرا بار بکرێت. ئیمۆجی بەکاردێت.',
    tabTheme:'ڕووکار',
    themePresetTitle:'پالێتە ئامادەکان',
    themePreviewTitle:'پێشبینینی ڕاستەوخۆ',
    themeSave:'پاشەکەوتکردنی ڕووکار',
    themeApplied:'ڕووکار پاشەکەوتکرا',
    themeReverted:'گەڕایەوە بۆ ڕووکاری پاشەکەوتکراو',
    themePreviewHeading:'سەرنوسراوێکی نموونە',
    themePreviewBody:'دەقی ناوەوە لەسەر ڕەنگی بنەڕەت، وەک چۆن لە ماڵپەڕ دەردەکەوێت.',
    themePreviewPrimary:'دوگمەی سەرەکی',
    themePreviewGhost:'دوگمەی شەفاف',
    themePreviewGold:'زێڕین ★★★★★',
    themePreviewPrice:'38$ · 49,750 د.ع',
    themePresetBerry:'بێری',
    themePresetChocolate:'چاکۆلێت',
    themePresetSage:'سەیج',
    themePresetRose:'گۆڵ',
    themePresetMidnight:'نیوەشەو',
    themeAutoDark:'چالاککردنی باری تاریکی خۆکار',
    // Added in v3: accounts, checkout, moderation and save states
    btnClose: 'داخستن',
    btnConfirm: 'دڵنیاکردنەوە',
    confirmTitle: 'دڵنیایت؟',
    errFillFields: 'تکایە خانە پێویستەکان پڕبکەرەوە.',
    errInvalidUrl: 'ناونیشانێکی تەواو بنووسە کە بە https:// دەست پێدەکات',
    errInvalidWhatsApp: 'ژمارەی واتسئاپ بە شێوەی نێودەوڵەتی بنووسە، بۆ نموونە 9647501234567.',
    loginSuccess: 'چوویتە ژوورەوە.',
    sessionExpired: 'ماوەی چوونەژوورەوەی کارمەند تەواو بووە. تکایە دووبارە بچۆ ژوورەوە.',
    staffAccessGranted: 'چوویتە ژوورەوە. پانێڵی کۆنترۆڵ دەکرێتەوە.',
    staffNoAccess: 'ئەم هەژمارە دەسەڵاتی کارمەندی نییە. داوا لە خاوەنی دوکان بکە زیادت بکات.',
    syncOffline: 'پەیوەندیت بە ئینتەرنێتەوە نییە. ئەو لیستەی لەسەر ئەم ئامێرە پاشەکەوت کراوە پیشان دەدرێت.',
    saveNeedsSignIn: 'بۆ پاشەکەوتکردن بە هەژماری کارمەند بچۆ ژوورەوە.',
    saveOffline: 'پاشەکەوت نەکرا: پەیوەندیت نییە. گۆڕانکارییەکانت لە فۆڕمەکەدا ماونەتەوە — کاتێک پەیوەندیت هەبوو دووبارە هەوڵ بدەرەوە.',
    saveDenied: 'پاشەکەوت نەکرا: هەژمارەکەت ڕێگەی گۆڕینی ئەم بەشەی نییە.',
    saveInvalid: 'پاشەکەوت نەکرا: هەندێک بەها دروست نین. فۆڕمەکە بپشکنە و دووبارە هەوڵ بدەرەوە.',
    saveFailed: 'پاشەکەوت نەکرا: هەڵەیەک ڕوویدا. گۆڕانکارییەکانت لە فۆڕمەکەدا ماونەتەوە — دووبارە هەوڵ بدەرەوە.',
    statusSaving: 'پاشەکەوت دەکرێت…',
    statusSaved: 'هەموو گۆڕانکارییەکان پاشەکەوت کران',
    statusFailed: 'دوایین گۆڕانکاری پاشەکەوت نەکرا',
    menuNoProducts: 'لیستی شیرینی نوێ دەکرێتەوە. تکایە دواتر سەردان بکەرەوە.',
    cartEach: 'دانەی {price}',
    cartQtyLabel: 'ژمارەی {name}',
    cartDecrease: 'یەک دانە کەمتر لە {name}',
    cartIncrease: 'یەک دانە زیاتر لە {name}',
    cartRemove: 'لابردنی {name}',
    cartItemRemoved: '{name} لە داواکارییەکەت لابرا.',
    cartClearTitle: 'داواکارییەکەت بسڕیتەوە؟',
    cartClearConfirm: 'هەموو کاڵاکان لە سەبەتەکەت لادەبرێن.',
    trayItemsLabel: '{n} کاڵا',
    pickupOnlyLabel: 'وەرگرتن لە چێشتخانەکەمان',
    trayDateHint: 'لانیکەم {hours} کاتژمێرمان پێویستە. زووترین کات: {date}.',
    checkoutNeedName: 'ناوەکەت بنووسە تا شیرینیخانەکە بزانێت داواکارییەکە بۆ کێیە.',
    checkoutNeedDate: 'بەروار و کاتی گەیاندن یان وەرگرتن هەڵبژێرە.',
    checkoutBadDate: 'ئەو بەروارە دروست نییە. دووبارە لە ڕۆژژمێرەکە هەڵیبژێرە.',
    checkoutDateTooSoon: 'لانیکەم {hours} کاتژمێرمان پێویستە بۆ ئامادەکردن. زووترین کات {date}ە.',
    checkoutDateTooFar: 'تکایە بەروارێک لە ماوەی ١٢ مانگی داهاتوودا هەڵبژێرە.',
    checkoutNoWhatsApp: 'داواکردن لە ڕێگەی واتسئاپ هێشتا ئامادە نییە. تکایە ڕاستەوخۆ پەیوەندی بە شیرینیخانەکەوە بکە.',
    checkoutOpened: 'واتسئاپ کرایەوە. ناردنی داواکارییەکەت لە واتسئاپدا تەواو بکە.',
    checkoutBlocked: 'واتسئاپ خۆکارانە نەکرایەوە. بۆ ناردنی داواکارییەکەت بەستەری خوارەوە بەکاربهێنە.',
    checkoutAgainTitle: 'ئەم داواکارییە دووبارە بنێریت؟',
    checkoutAgainConfirm: 'پێشتر هەمان داواکاریت لە واتسئاپ کردەوە. دووبارە بیکەیتەوە؟',
    checkoutAgainOk: 'دووبارە کردنەوەی واتسئاپ',
    checkoutAddressLabel: 'ناونیشانی گەیاندن',
    orderSavedToHistory: 'داواکارییەکە لە مێژووی داواکارییەکانت پاشەکەوت کرا.',
    orderHistorySaveFailed: 'نامەی داواکارییەکەت لە واتسئاپ ئامادەیە، بەڵام نەتوانرا لە مێژووی داواکارییە ئۆنلاینەکانت پاشەکەوت بکرێت.',
    trayClearedAfterSend: 'سەبەتەی داواکاری پاککرایەوە.',
    myOrdersBtn: 'داواکارییەکانم',
    myOrdersHideDetails: 'شاردنەوەی وردەکاری',
    historyScopeAccount: 'ئەو داواکارییانەی بە هەژمارەکەتەوە بەستراون، لەگەڵ ئەوانەی لەم ئامێرەوە نێردراون.',
    historyScopeDevice: 'ئەو داواکارییانەی لەم ئامێرەوە نێردراون. بچۆ ژوورەوە بۆ پاراستنی مێژووەکەت لە هەموو ئامێرەکاندا.',
    historyRequestedFor: 'داواکراو بۆ',
    orderStatusSent: 'لە واتسئاپ نێردرا',
    orderStatusConfirmed: 'پشتڕاستکرایەوە',
    orderStatusCompleted: 'تەواو بوو',
    customerFallbackName: 'کڕیار',
    contactNotSet: 'زانیاری پەیوەندی بەم زووانە زیاد دەکرێت.',
    customersScopeHint: 'ئەو کڕیارانەی هەژماریان هەیە و دوایین ٢٠٠ داواکاری پیشان دەدات.',
    darkModeOn: 'دۆخی تاریک چالاکە',
    darkModeOff: 'دۆخی ڕووناک چالاکە',
    reviewVerifiedRole: 'کڕیار',
    reviewStarsLabel: '{n} لە ٥ ئەستێرە',
    reviewsEmpty: 'هێشتا هیچ ڕایەک نییە. یەکەم کەس بە ڕاکەت بڵێ.',
    reviewPending: 'سوپاس! ڕاکەت دوای پەسەندکردنی شیرینیخانەکە دەردەکەوێت.',
    reviewDenied: 'ڕاکەت نەنێردرا. تکایە دووبارە بچۆ ژوورەوە و هەوڵ بدەرەوە.',
    reviewFailed: 'ڕاکەت نەنێردرا. تکایە دووبارە هەوڵ بدەرەوە.',
    reviewsPendingTitle: 'چاوەڕێی پەسەندکردن',
    reviewsPendingEmpty: 'هیچ ڕایەک چاوەڕێ ناکات.',
    reviewsDecidedTitle: 'بەم دواییانە بڕیاری لەسەر دراوە',
    reviewApprove: 'پەسەندکردن',
    reviewReject: 'ڕەتکردنەوە',
    reviewUnpublish: 'لابردن لە پیشاندان',
    reviewApproved: 'ڕاکە بڵاوکرایەوە.',
    reviewRejected: 'ڕاکە شاردرایەوە.',
    reviewDeleteConfirm: 'ئەم ڕایە بە یەکجاری بسڕیتەوە؟',
    reviewsCuratedTitle: 'ڕا هەڵبژێردراوەکان',
    reviewsCuratedHint: 'ئەو ڕایانەی لێرە زیادی دەکەیت وەک خۆیان لە ماڵپەڕەکەدا دەردەکەون.',
    reviewsResetBtn: 'گەڕاندنەوەی بنەڕەت',
    reviewsResetTitle: 'ڕا بنەڕەتییەکان بگەڕێنیتەوە؟',
    reviewsResetConfirm: 'ڕا هەڵبژێردراوەکانت بە سێ ڕا سەرەتاییەکە دەگۆڕدرێن.',
    reviewsAddBtn: 'زیادکردنی ڕا',
    tabBrand: 'براند و لۆگۆ',
    tabAbout: 'دەربارەی ئێمە',
    tabFaq: 'پرسیارە باوەکان',
    tabReviews: 'ڕاکان',
    tabContact: 'پەیوەندی',
    tabSocials: 'تۆڕە کۆمەڵایەتییەکان',
    tabProducts: 'بەرهەمەکان',
    tabUsers: 'کارمەندان',
    tabData: 'داتا',
    usersClaimsHint: 'دەسەڵاتی کارمەندان لەلایەن خاوەنی دوکانەوە بە فەرمانێکی یەکجاری دەدرێت. لێرە کەسەکان زیاد یان بگۆڕە، پاشان ئەمە جێبەجێ بکە:',
    staffUidInvalid: 'User UIDی کەسەکە لە Firebase Authenticationەوە دابنێ.',
    staffSavedHint: 'پاشەکەوت کرا. فەرمانی کارمەندان جێبەجێ بکە تا گۆڕانکارییەکە کاریگەر بێت، پاشان داوایان لێبکە دووبارە بچنە ژوورەوە.',
    staffRemovedHint: 'لە لیستەکە لابرا. فەرمانی کارمەندان جێبەجێ بکە بۆ هەڵوەشاندنەوەی دەسەڵاتەکەیان.',
    prodDeleteTitle: 'ئەم بەرهەمە بسڕیتەوە؟',
    prodNewDraft: 'بەرهەمێکی نوێ دروستکرا. پڕی بکەرەوە و پاشەکەوت دابگرە بۆ بڵاوکردنەوە.',
    prodPhotoRemovedPending: 'وێنەکە لابرا. بۆ جێبەجێکردن پاشەکەوت دابگرە.',
    prodPriceInvalid: 'نرخێک لە نێوان ٠ و ١٠٠،٠٠٠ بنووسە.',
    importTitle: 'ئەم باکئەپە هاوردە بکەیت؟',
    importConfirm: 'ڕێکخستنەکانی دوکان دەگۆڕدرێن و هەموو بەرهەمەکانی ناو باکئەپەکە نوێ دەکرێنەوە.',
    importBtn: 'هاوردەکردنی باکئەپ',
    resetDeviceTitle: 'ڕێکخستنەوەی ئەم ئامێرە',
    resetDeviceBtn: 'سڕینەوەی داتای ئەم ئامێرە',
    resetDeviceHint: 'لیستی شیرینی، ڕێکخستنەکان و مێژووی داواکاری پاشەکەوتکراو لەم وێبگەڕەدا دەسڕێتەوە. دوکانە زیندووەکە ناگۆڕدرێت.',
    resetDeviceConfirm: 'هەموو داتای پاشەکەوتکراوی ئەم وێبگەڕە بسڕیتەوە؟ دوکانە زیندووەکە ناگۆڕدرێت.',
    resetDeviceDone: 'ئەم ئامێرە ڕێکخرایەوە. داتای دوکان دووبارە بار دەکرێتەوە.',
    leadTimeLabel: 'کاتی ئامادەکردن (کاتژمێر)',
    leadTimeHint: 'کڕیاران ناتوانن کاتی گەیاندنێکی زووتر لەمە هەڵبژێرن.',
    authErr_popupClosed: 'چوونەژوورەوە هەڵوەشێنرایەوە.',
    authErr_popupBlocked: 'وێبگەڕەکەت پەنجەرەی چوونەژوورەوەی ڕاگرت. ڕێگە بە pop-up بدە و دووبارە هەوڵ بدەرەوە.',
    authErr_badCredentials: 'ئیمەیڵ و وشەی نهێنی یەک ناگرنەوە.',
    authErr_badEmail: 'ئەو ئیمەیڵە دروست نییە.',
    authErr_tooMany: 'هەوڵی زۆر درا. چەند خولەکێک چاوەڕێ بکە و دووبارە هەوڵ بدەرەوە.',
    authErr_offline: 'پەیوەندیت نییە. پەیوەندی بکە و دووبارە هەوڵ بدەرەوە.',
    authErr_providerDisabled: 'ئەم شێوازی چوونەژوورەوەیە هێشتا بۆ دوکانەکە چالاک نەکراوە.',
    authErr_unauthorizedDomain: 'چوونەژوورەوە لەسەر ئەم ناونیشانە هێشتا ڕێگەپێدراو نییە.',
    authErr_generic: 'چوونەژوورەوە سەرکەوتوو نەبوو. تکایە دووبارە هەوڵ بدەرەوە.',
    fontPreview: 'پێشبینین',
    authCustomerLead: 'بە Google بچۆ ژوورەوە بۆ پاراستنی مێژووی داواکارییەکانت لە هەموو ئامێرێکدا و نووسینی ڕا.',
    authGoogleBtn: 'بەردەوامبوون بە Google',
    authGuestNote: 'بۆ داواکردن پێویستت بە هەژمار نییە — تەنها ناوەکەت بنووسە کاتێک داواکارییەکەت دەنێریت.',
    authOr: 'یان',
    btnSave: 'پاشەکەوتکردن',
    btnSendReview: 'ناردنی ڕا',
    btnStaffLogin: 'چوونەژوورەوە',
    checkoutAddressOptional: 'ناونیشانی گەیاندن (بۆ وەرگرتن پێویست نییە)',
    checkoutDetailsLegend: 'زانیارییەکانت',
    checkoutDoneClear: 'ناردم — سەبەتەکە پاک بکەرەوە',
    checkoutNameLabel: 'ناو *',
    checkoutOpenAgain: 'کردنەوەی واتسئاپ',
    checkoutPhoneLabel: 'ژمارەی مۆبایل (ئارەزوومەندانە)',
    checkoutRemember: 'زانیارییەکانم لەسەر ئەم ئامێرە بهێڵەرەوە',
    labelEmail: 'ئیمەیڵ',
    leaveReviewDescModerated: 'باسی کێکەکەت بۆمان بکە. ڕاکان دوای پەسەندکردنی شیرینیخانەکە دەردەکەون.',
    perm_faq: 'پرسیارە باوەکان',
    perm_reviews: 'ڕاکان',
    reviewRatingLabel: 'هەڵسەنگاندنەکەت',
    reviewSignInNeeded: 'تکایە بە Google بچۆ ژوورەوە تا دڵنیا بین ڕاکان لە کڕیارانی ڕاستەقینەوەن.',
    staffEntryLead: 'کەسەکە بە هەژماری Google یان ئیمەیڵی خۆی دەچێتە ژوورەوە. User UIDەکەی لە Firebase Authenticationەوە کۆپی بکە.',
    staffEntryTitle: 'کارمەند',
    staffLoginLead: 'بۆ تیمی شیرینیخانە. دەسەڵات لەلایەن خاوەنی دوکانەوە دەدرێت.',
    staffLoginLink: 'چوونەژوورەوەی کارمەندان',
    staffLoginTitle: 'چوونەژوورەوەی کارمەندان',
    staffPermsLegend: 'ئەو بەشانەی کارمەند دەتوانێت دەستکاری بکات',
    staffUidLabel: 'User UID',
    trayHeading: 'داواکارییەکەت',
    trayYourOrder: 'داواکارییەکەت',
    trayCloseDetails: 'داخستنی وردەکاری داواکاری',
    trayItemsListLabel: 'کاڵاکانی ناو داواکارییەکەت',
    btnClosePanel: 'داخستنی پانێڵی کۆنترۆڵ',
    colPhone: 'مۆبایل',
  }
};

// Global App State Container
const app = {
  lang: 'en',
  currency: 'USD',
  category: 'all',
  config: null,
  products: null,
  selectedProductId: null,
  pendingImageData: '',
  session: null, // Derived from Firebase Auth + token claims only (see lib/session.js)
  profile: null, // Signed-in customer's own profile document
  cart: [], // [{ id, productId, qty, exclude }] — persisted under ys_cart_v1, no prices stored
  orderNote: '',
  myOrders: [], // Signed-in customer's orders (Firestore)
  localOrders: [], // Orders sent from this device (guests included)
  approvedReviews: [], // Moderated customer reviews
  staffOrders: [], // Staff-only listeners
  customers: [],
  allReviews: [],
  staffDirectory: [],
  configSource: 'default', // default | legacy | public
  syncState: 'connecting',
  checkoutInFlight: false,
  appliedPromoCode: '', // Active coupon applied in storefront cart
  trayBreakdownOpen: false, // Order tray breakdown open/closed toggle
  activePanelTab: 'brand',
  authTargetRole: 'admin', // For staff login tab distinction
  searchQuery: '',
  searchDebounceTimer: null,
  sortOption: 'popular', // popular | newest | price-asc | price-desc | name-asc
  priceRange: 'any', // any | under-20 | 20-40 | 40-60 | over-60
  historyDetailsOpen: {}, // { [orderId]: boolean }
  selectedStaffCustomerId: null,
  customerSearchQuery: '',
  customerSortOption: 'lastOrder',
  draftLogo: null,
  _logoUrlDebounce: null,

  // Initialize Application
  generateId() {
    return 'item_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
  },
  
  init() {
    this.purgeLegacyStorage();
    this.loadState();
    this.parseUrlHash();
    this.applyTheme(this.config.theme.tokens);
    this.applyFonts();
    this.applyPreferences();
    this.renderAll();
    this.updateFavicon();
    this.bindEvents();
    this.setupIntersectionObserver();
    this.initFirebaseSync();
    this.initSession();
    if (window.location.hash === '#staff') this.openStaffLogin();
  },

  purgeLegacyStorage() {
    LEGACY_KEYS.forEach(k => {
      try { localStorage.removeItem(k); } catch { /* storage unavailable */ }
    });
  },

  cacheGet(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  },

  cacheSet(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn('Could not cache', key, e && e.name);
      return false;
    }
  },


  // Public storefront data. Private (staff/customer) listeners start in startPrivateListeners().
  // Public storefront data: one-time Firestore Lite reads, refreshed when the tab regains focus.
  // Staff sessions also get realtime updates (startPrivateListeners).
  initFirebaseSync() {
    if (!firebaseReady()) {
      this.setSyncState('offline');
      return;
    }
    this.refreshPublicData();
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && Date.now() - (this._lastPublicFetch || 0) > 60_000) this.refreshPublicData();
    });
  },

  async refreshPublicData() {
    this._lastPublicFetch = Date.now();
    const results = await Promise.allSettled([fetchPublicConfig(), fetchProducts(), fetchApprovedReviews()]);
    const [config, products, reviews] = results;
    if (results.every(r => r.status === 'rejected')) {
      this.reportListenerError('storefront', results[0].reason);
      return;
    }
    this.setSyncState('online');
    if (config.status === 'fulfilled') this.applyRemoteConfig(config.value.data, config.value.source);
    else this.reportListenerError('config', config.reason);
    if (products.status === 'fulfilled') this.applyRemoteProducts(products.value.list, products.value.empty);
    else this.reportListenerError('products', products.reason);
    if (reviews.status === 'fulfilled') { this.approvedReviews = reviews.value; this.renderReviews(); }
    else this.reportListenerError('reviews', reviews.reason);
  },

  applyRemoteConfig(data, source) {
    this.configSource = source;
    if (!data) return;
    const next = this.normalizeConfig(data);
    if (JSON.stringify(next) === JSON.stringify(this.config)) return;
    this.config = next;
    this.cacheSet(KEYS.CONFIG, this.config);
    this.applyTheme(this.config.theme.tokens);
    this.applyFonts();
    this.applyPreferences();
    this.renderAll();
    this.refreshOpenPanel();
  },

  applyRemoteProducts(list, empty) {
    // An empty collection on a shop that never stored products keeps the built-in menu.
    // Once products have been stored remotely, an empty collection really means "no products".
    if (empty && !this.cacheGet(KEYS.PRODUCTS_REMOTE, false)) return;
    if (!empty) this.cacheSet(KEYS.PRODUCTS_REMOTE, true);
    this.products = list.map(p => this.normalizeProduct(p)).filter(Boolean);
    this.cacheSet(KEYS.PRODUCTS, this.products);
    this.cart = sanitizeCart(this.cart, this.products);
    this.persistCart();
    this.renderMenu();
    this.renderTray();
    this.refreshOpenPanel(['products']);
  },


  setSyncState(state) {
    if (this.syncState === state) return;
    this.syncState = state;
    const el = document.getElementById('syncNotice');
    if (!el) return;
    const show = state === 'offline';
    el.hidden = !show;
    el.textContent = show ? this.t('syncOffline') : '';
  },

  reportListenerError(name, err) {
    const kind = describeDataError(err);
    if (kind === 'offline') this.setSyncState('offline');
    else console.warn(`Live updates for ${name} stopped (${kind}).`);
  },

  // Re-render the open control-panel tab when data it shows has changed.
  refreshOpenPanel(tabs = null) {
    const modal = document.getElementById('panelModal');
    if (!modal || !modal.classList.contains('is-open')) return;
    if (tabs && !tabs.includes(this.activePanelTab)) return;
    // Leave forms alone while someone is typing in them.
    const content = document.getElementById('panelContent');
    if (content && content.contains(document.activeElement) && /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return;
    this.renderPanelTab(this.activePanelTab);
  },

  // ---------------------------------------------------------------- session
  async initSession(force = false) {
    if (this._sessionUnsub && !force) return;
    if (this._sessionUnsub) { this._sessionUnsub(); this._sessionUnsub = null; }
    try {
      this._sessionUnsub = await watchSession(s => this.applySession(s), { force });
    } catch (e) {
      console.warn('Sign-in is unavailable:', e && e.message);
      this.applySession(null);
    }
  },

  applySession(session) {
    if (session && session.expired) {
      this.showToast(this.t('sessionExpired'), 'warning');
      signOutUser().catch(() => {});
      session = null;
    }
    const key = s => (s ? `${s.uid}|${s.role}|${s.perms.join(',')}` : '');
    const changed = key(session) !== key(this.session);
    this.session = session;

    if (changed) {
      this.stopPrivateListeners();
      if (session) this.startPrivateListeners();
      this.profile = null;
      if (session) this.loadProfile();
    }
    if (!isPrivileged(session)) this.closePanelModal(true);

    this.updateAuthUI();
    this.renderTray();
    this.refreshOpenPanel();
  },

  async startPrivateListeners() {
    const s = this.session;
    if (!s || !firebaseReady()) return;
    await loadStore();
    // Signed out or switched account while the SDK was loading
    const sameUser = this.session && this.session.uid === s.uid && this.session.role === s.role;
    if (!sameUser) return;
    const u = this._privUnsubs = {};
    const onErr = name => err => this.reportListenerError(name, err);

    u.myOrders = store.watchMyOrders(s.uid, list => {
      this.myOrders = list;
      if (document.getElementById('historyModal')?.classList.contains('is-open')) this.renderCustomerHistory();
    }, onErr('my orders'));

    if (!isPrivileged(s)) return;
    // Staff see their own and colleagues' changes live.
    u.config = store.watchPublicConfig((data, source) => this.applyRemoteConfig(data, source), onErr('config'));
    u.products = store.watchProducts((list, empty) => this.applyRemoteProducts(list, empty), onErr('products'));
    if (canAccessTab(s, 'customers') || canAccessTab(s, 'economy')) {
      u.orders = store.watchRecentOrders(list => {
        this.staffOrders = list;
        this.refreshOpenPanel(['customers']);
        if (this.selectedStaffCustomerId) this.renderCustomerDrawerContent();
      }, onErr('orders'));
    }
    if (canAccessTab(s, 'customers')) {
      u.customers = store.watchCustomers(list => {
        this.customers = list;
        this.refreshOpenPanel(['customers']);
      }, onErr('customers'));
    }
    if (canAccessTab(s, 'reviews')) {
      u.reviews = store.watchAllReviews(list => {
        this.allReviews = list;
        this.approvedReviews = list.filter(r => r.status === 'approved');
        this.renderReviews();
        this.refreshOpenPanel(['reviews']);
      }, onErr('reviews'));
    }
    if (s.role === 'admin' || s.role === 'dev') {
      u.staff = store.watchStaffDirectory(list => {
        this.staffDirectory = list;
        this.refreshOpenPanel(['users']);
      }, onErr('staff directory'));
    }
  },


  // Stops privileged listeners and drops everything they loaded.
  stopPrivateListeners() {
    Object.values(this._privUnsubs || {}).forEach(fn => { try { fn(); } catch { /* already stopped */ } });
    this._privUnsubs = {};
    this.myOrders = [];
    this.staffOrders = [];
    this.customers = [];
    this.allReviews = [];
    this.staffDirectory = [];
    this.selectedStaffCustomerId = null;
    this.closeCustomerDrawer();
  },

  async loadProfile() {
    const s = this.session;
    if (!s) return;
    try {
      await loadStore();
      const p = await store.getProfile(s.uid);
      if (this.session && this.session.uid === s.uid) {
        this.profile = p || null;
        this.prefillCheckoutDetails();
      }
    } catch (e) {
      // A missing or unreadable profile is not fatal; checkout asks for details instead.
      console.warn('Profile not loaded:', describeDataError(e));
    }
  },


  // State & LocalStorage Helpers
  // Starting state: cached public data from the last visit, else the built-in defaults.
  loadState() {
    this.config = this.normalizeConfig(this.cacheGet(KEYS.CONFIG, null) || DEFAULT_CONFIG);

    const cachedProducts = this.cacheGet(KEYS.PRODUCTS, null);
    const products = Array.isArray(cachedProducts) ? cachedProducts : DEFAULT_PRODUCTS;
    this.products = products.map(p => this.normalizeProduct(p)).filter(Boolean);
    if (!this.selectedProductId && this.products.length > 0) {
      this.selectedProductId = this.products[0].id;
      this.pendingImageData = this.products[0].img || '';
    }

    this.cart = loadCart(localStorage, this.products);
    const localOrders = this.cacheGet(KEYS.MY_ORDERS, []);
    this.localOrders = Array.isArray(localOrders) ? localOrders.slice(0, 50) : [];

    const pref = this.cacheGet(KEYS.PREF, null);
    if (pref && typeof pref === 'object') {
      if (pref.lang === 'en' || pref.lang === 'ku') this.lang = pref.lang;
      if (typeof pref.currency === 'string') this.currency = pref.currency;
      if (pref.themeMode === 'light' || pref.themeMode === 'dark') this.themeModePref = pref.themeMode;
    }
  },

  // Fill in any missing sections so older or partial configs render safely.
  normalizeConfig(raw) {
    const base = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
    const c = raw && typeof raw === 'object' ? JSON.parse(JSON.stringify(raw)) : {};
    const out = { ...base, ...c };
    const mergeMap = key => {
      out[key] = { ...base[key], ...(c[key] && typeof c[key] === 'object' ? c[key] : {}) };
    };
    ['shopName', 'tagline', 'announcement', 'aboutUs', 'socials'].forEach(mergeMap);
    out.contact = { ...base.contact, ...(c.contact || {}) };
    out.contact.address = { ...base.contact.address, ...((c.contact && c.contact.address) || {}) };
    out.contact.hours = { ...base.contact.hours, ...((c.contact && c.contact.hours) || {}) };
    out.economy = { ...DEFAULT_ECONOMY, ...(c.economy || {}) };
    if (typeof c.iqdRate === 'number' && c.iqdRate > 0 && (!c.economy || !c.economy.exchangeRate)) {
      out.economy.exchangeRate = c.iqdRate;
    }
    out.theme = { ...base.theme, ...(c.theme || {}) };
    if (!out.theme.tokens) out.theme.tokens = (THEMES[out.theme.presetId] || THEMES.berry).tokens;
    if (!Array.isArray(out.faq)) out.faq = base.faq;
    if (!Array.isArray(out.reviews)) out.reviews = base.reviews;
    if (!out.shopName.en || out.shopName.en === 'Sweet Crumb') {
      out.shopName = { ...base.shopName };
    }
    out.kurdishBodyFont = out.kurdishBodyFont || 'Vazirmatn';
    out.kurdishDisplayFont = out.kurdishDisplayFont || 'Vazirmatn';
    if (!out.logoMode) out.logoMode = out.logoImage ? 'image' : (out.logoImageUrl ? 'url' : 'emoji');
    out.logoEmoji = out.logoEmoji || '🎂';
    out.logoImage = typeof out.logoImage === 'string' ? out.logoImage : '';
    out.logoUrl = typeof out.logoUrl === 'string' ? out.logoUrl : (out.logoImageUrl || '');
    // Never carry credentials or user lists inside the public config.
    delete out.users;
    delete out.updatedAt;
    delete out.updatedBy;
    return out;
  },

  normalizeProduct(p) {
    if (!p || typeof p !== 'object' || !p.id || !p.name) return null;
    const fallback = DEFAULT_PRODUCTS.find(d => d.id === p.id);
    return {
      ...p,
      name: { en: p.name.en || '', ku: p.name.ku || '' },
      desc: { en: (p.desc && p.desc.en) || '', ku: (p.desc && p.desc.ku) || '' },
      unit: { en: (p.unit && p.unit.en) || '', ku: (p.unit && p.unit.ku) || '' },
      priceUSD: Math.max(0, Number(p.priceUSD) || 0),
      img: typeof p.img === 'string' && p.img.trim() ? p.img : ((fallback && fallback.img) || ''),
      exclusions: Array.isArray(p.exclusions) ? p.exclusions : null,
    };
  },


  // Keys of the public config, grouped by control-panel section (mirrors firestore.rules).
  configKeysFor(section) {
    const map = {
      brand: ['shopName', 'tagline', 'logoMode', 'logoEmoji', 'logoImage', 'logoUrl', 'logoImageUrl', 'announcement'],
      theme: ['theme'],
      about: ['aboutUs'],
      faq: ['faq'],
      reviews: ['reviews'],
      contact: ['contact'],
      socials: ['socials'],
      economy: ['economy', 'iqdRate'],
      fonts: ['englishBodyFont', 'englishDisplayFont', 'kurdishBodyFont', 'kurdishDisplayFont'],
      watermark: ['showWatermark'],
    };
    return map[section] || [];
  },

  // Saves one section of the public config. Resolves true only after Firestore accepted it.
  // Until the shop has a config/public document, the first save migrates the whole config.
  async saveConfig(section, { quiet = false, config = this.config } = {}) {
    let keys = this.configKeysFor(section);
    if (this.configSource !== 'public' && (this.session?.role === 'admin' || this.session?.role === 'dev')) {
      keys = Object.keys({ brand: 1, theme: 1, about: 1, faq: 1, reviews: 1, contact: 1, socials: 1, economy: 1, fonts: 1 })
        .flatMap(s => this.configKeysFor(s));
      if (this.session.role === 'dev') keys.push('showWatermark');
    }
    const partial = {};
    keys.forEach(k => { if (config[k] !== undefined) partial[k] = config[k]; });
    const ok = await this.runWrite(() => store.savePublicConfig(partial, this.session?.uid), { quiet });
    if (ok) this.configSource = 'public';
    return ok;
  },
  // Edit a copy of the config, save the section, and only then show the change on the page.
  // If the save fails, the page and the form keep their current state so nothing typed is lost.
  async commitConfig(section, mutate, { quiet = false } = {}) {
    const draft = JSON.parse(JSON.stringify(this.config));
    const problem = mutate(draft);
    if (problem) {
      this.showToast(problem, 'error');
      return false;
    }
    const ok = await this.saveConfig(section, { quiet, config: draft });
    if (ok) {
      this.config = this.normalizeConfig(draft);
      this.cacheSet(KEYS.CONFIG, this.config);
      this.renderAll();
    }
    return ok;
  },


  // Wraps a Firestore write with honest status reporting. Returns true on success.
  async runWrite(fn, { quiet = false, successMsg = null } = {}) {
    if (!this.session) {
      this.showToast(this.t('saveNeedsSignIn'), 'error');
      return false;
    }
    if (!firebaseReady()) {
      this.showToast(this.t('saveOffline'), 'error');
      return false;
    }
    this.setPanelStatus('saving');
    try {
      await loadStore();
      await fn();
      this.setPanelStatus('saved');
      if (!quiet) this.showToast(successMsg || this.t('toastSaved'), 'success');
      return true;
    } catch (e) {
      const kind = describeDataError(e);
      this.setPanelStatus('failed');
      const key = { denied: 'saveDenied', offline: 'saveOffline', invalid: 'saveInvalid' }[kind] || 'saveFailed';
      this.showToast(this.t(key), 'error');
      console.warn('Write failed:', kind, e && e.code);
      return false;
    }
  },

  setPanelStatus(state) {
    const el = document.getElementById('panelSaveStatus');
    if (!el) return;
    const labels = { saving: this.t('statusSaving'), saved: this.t('statusSaved'), failed: this.t('statusFailed') };
    el.textContent = labels[state] || '';
    el.dataset.state = state;
  },

  // Saves a single product document. Resolves true only after Firestore accepted it.
  async saveProduct(product, opts = {}) {
    return this.runWrite(() => store.saveProduct(product, this.session?.uid), opts);
  },

  persistCart() {
    saveCart(localStorage, this.cart);
  },

  savePref() {
    this.cacheSet(KEYS.PREF, { lang: this.lang, currency: this.currency, themeMode: this.themeModePref || null });
  },


  t(key) {
    const dict = TRANSLATIONS[this.lang] || TRANSLATIONS.en;
    return dict[key] || TRANSLATIONS.en[key] || key;
  },

  // Escape user-provided strings before interpolating them into HTML templates
  esc(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  },

  getEconomy() {
    return this._draftEconomy || (this.config && this.config.economy) || DEFAULT_ECONOMY;
  },

  // Price Calculation & Dual Currency Formatting
  formatPrice(usdAmount, overrideCurrency = null) {
    const text = formatMoney(usdAmount, this.getEconomy(), overrideCurrency || this.currency, this.config?.iqdRate || IQD_RATE);
    // In Kurdish (RTL) keep "$38.00" / "49,750 د.ع" in reading order inside sentences.
    return this.lang === 'ku' ? '\u2066' + text + '\u2069' : text;
  },


  // Language & Direction Switching
  setLanguage(newLang) {
    if (this.lang === newLang) return;
    this.lang = newLang;
    this.savePref();
    this.applyPreferences();
    this.renderAll();
  },

  // Currency Switching
  setCurrency(newCur) {
    if (this.currency === newCur) return;
    this.currency = newCur;
    this.savePref();
    this.applyPreferences();
    this.renderMenu();
    this.renderTray();
  },

  applyPreferences() {
    const doc = document.documentElement;
    const isKu = this.lang === 'ku';

    doc.dir = isKu ? 'rtl' : 'ltr';
    doc.lang = isKu ? 'ckb' : 'en';

    this.applyFonts();

    const eco = this.getEconomy();
    const hasSecondary = eco.showSecondary !== false && eco.secondaryCurrency && eco.secondaryCurrency !== 'None';

    // If secondary currency is not shown or is None, lock currency to USD
    if (!hasSecondary && this.currency !== 'USD') {
      this.currency = 'USD';
    }

    // Toggle currency switcher in header and mobile drawer
    const headerCur = document.getElementById('headerCurrencySwitcher');
    if (headerCur) headerCur.style.display = hasSecondary ? 'inline-flex' : 'none';
    const mobileCur = document.getElementById('mobileCurrencySwitcher');
    if (mobileCur) mobileCur.style.display = hasSecondary ? 'inline-flex' : 'none';

    if (this.currency !== 'USD' && hasSecondary) {
      document.body.classList.add('cur-secondary', 'cur-iqd');
    } else {
      document.body.classList.remove('cur-secondary', 'cur-iqd');
    }

    // Update Language switcher buttons
    ['btnLangEn', 'btnLangEnMobile'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.toggle('is-active', !isKu);
    });
    ['btnLangKu', 'btnLangKuMobile'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.toggle('is-active', isKu);
    });

    // Update Currency switcher buttons
    const curSymbol = eco.currencySymbol || (eco.secondaryCurrency === 'IQD' ? 'د.ع' : eco.secondaryCurrency);
    const secLabel = `${eco.secondaryCurrency} ${curSymbol}`;
    ['btnCurIqd', 'btnCurIqdMobile'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.textContent = secLabel;
        el.classList.toggle('is-active', this.currency !== 'USD');
      }
    });
    ['btnCurUsd', 'btnCurUsdMobile'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.toggle('is-active', this.currency === 'USD');
    });
    this.updatePriceFilterLabels();
  },

  // Global Re-render
  renderAll() {
    this.renderI18nStatic();
    this.renderBranding();
    this.renderMenu();
    this.renderTray();
    this.updateAuthUI();
    this.renderWatermark();
    this.renderFAQ();
    this.renderReviews();
  },

  renderFAQ() {
    const wrap = document.getElementById('faqWrap');
    const section = document.getElementById('faq');
    if (!wrap || !section) return;
    const isKu = this.lang === 'ku';
    const faqs = (this.config && Array.isArray(this.config.faq)) ? this.config.faq : [];
    section.style.display = faqs.length === 0 ? 'none' : 'block';
    const pick = o => (isKu ? (o?.ku || o?.en) : o?.en) || '';

    wrap.innerHTML = faqs.map(item => `
      <details class="faq-item">
        <summary class="faq-summary">${escapeHTML(pick(item.q))}</summary>
        <div class="faq-content">${escapeMultiline(pick(item.a))}</div>
      </details>
    `).join('');
  },


  // Curated reviews from the config plus moderated (approved) customer reviews.
  renderReviews() {
    const grid = document.getElementById('reviewsGrid');
    const section = document.getElementById('reviews');
    if (!grid || !section) return;
    const isKu = this.lang === 'ku';
    const pick = o => (isKu ? (o?.ku || o?.en) : o?.en) || '';

    const curated = ((this.config && this.config.reviews) || []).map(r => ({
      initials: r.initials, name: pick(r.name), role: pick(r.role), quote: pick(r.quote), rating: 5,
    }));
    const approved = (this.approvedReviews || []).map(r => ({
      initials: this.initialsFor(r.name), name: r.name, role: this.t('reviewVerifiedRole'), quote: r.text,
      rating: Number.isInteger(r.rating) ? r.rating : 5,
    }));
    const all = [...approved, ...curated];

    // The section stays visible so customers can always leave a review.
    grid.innerHTML = all.length === 0
      ? `<p class="reviews-empty">${escapeHTML(this.t('reviewsEmpty'))}</p>`
      : all.map(item => `
      <figure class="review-card">
        <div class="stars" role="img" aria-label="${escapeHTML(this.t('reviewStarsLabel').replace('{n}', item.rating))}">${'★'.repeat(item.rating)}${'☆'.repeat(5 - item.rating)}</div>
        <blockquote class="review__quote">${escapeHTML(item.quote)}</blockquote>
        <figcaption class="review__author">
          <div class="review__avatar" aria-hidden="true">${escapeHTML(String(item.initials || '').slice(0, 2))}</div>
          <div>
            <strong class="review__name">${escapeHTML(item.name)}</strong>
            <span class="text-small review__role">${escapeHTML(item.role)}</span>
          </div>
        </figcaption>
      </figure>
    `).join('');
    section.style.display = 'block';
  },

  initialsFor(name) {
    const parts = String(name || '').trim().split(/\s+/).filter(Boolean);
    if (parts.length > 1) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return (parts[0] || '?').slice(0, 2).toUpperCase();
  },


  // Update all static data-i18n attributes
  // Update all static data-i18n attributes (translations are code constants; only they may contain markup)
  renderI18nStatic() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const val = this.t(el.getAttribute('data-i18n'));
      if (!val) return;
      if (val.includes('<') && val.includes('>')) el.innerHTML = sanitizeInlineHTML(val);
      else el.textContent = val;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const val = this.t(el.getAttribute('data-i18n-placeholder'));
      if (val) el.setAttribute('placeholder', val);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const val = this.t(el.getAttribute('data-i18n-aria'));
      if (val) el.setAttribute('aria-label', val);
    });
  },


  updatePriceFilterLabels() {
    const priceSel = document.getElementById('menuPriceSelect');
    if (priceSel) {
      const optUnder20 = priceSel.querySelector('option[value="under-20"]');
      const opt20to40 = priceSel.querySelector('option[value="20-40"]');
      const opt40to60 = priceSel.querySelector('option[value="40-60"]');
      const optOver60 = priceSel.querySelector('option[value="over-60"]');
      const isKu = this.lang === 'ku';
      const formatBound = (val) => {
        let res = this.formatPrice(val);
        return res.replace(/\.00(?=\u2069?$)/, '');
      };
      if (optUnder20) optUnder20.textContent = isKu ? `کەمتر لە ${formatBound(20)}` : `Under ${formatBound(20)}`;
      if (opt20to40) opt20to40.textContent = `${formatBound(20)} – ${formatBound(40)}`;
      if (opt40to60) opt40to60.textContent = `${formatBound(40)} – ${formatBound(60)}`;
      if (optOver60) optOver60.textContent = isKu ? `زیاتر لە ${formatBound(60)}` : `Over ${formatBound(60)}`;
    }
  },

  // Kurdish text normalization (harakat stripping & character normalization)
  normalizeKurdish(str) {
    return normalizeKurdish(str);
  },


  // Highlight search query tokens inside text
  // Returns escaped HTML with the query highlighted.
  highlightMatch(text, rawQuery) {
    return highlightMatches(text, rawQuery);
  },


  // Search input handler with 150ms debounce
  handleSearchInput(val) {
    clearTimeout(this.searchDebounceTimer);
    const clearBtn = document.getElementById('menuSearchClear');
    if (clearBtn) clearBtn.style.display = val.trim() ? 'block' : 'none';

    this.searchDebounceTimer = setTimeout(() => {
      this.searchQuery = val;
      this.updateUrlHash();
      this.renderMenu(false);
    }, 150);
  },

  clearSearch() {
    this.searchQuery = '';
    const input = document.getElementById('menuSearchInput');
    if (input) input.value = '';
    const clearBtn = document.getElementById('menuSearchClear');
    if (clearBtn) clearBtn.style.display = 'none';
    this.updateUrlHash();
    this.renderMenu(false);
  },

  clearAllFilters() {
    this.searchQuery = '';
    this.category = 'all';
    this.sortOption = 'popular';
    this.priceRange = 'any';

    const input = document.getElementById('menuSearchInput');
    if (input) input.value = '';
    const clearBtn = document.getElementById('menuSearchClear');
    if (clearBtn) clearBtn.style.display = 'none';

    const sortSel = document.getElementById('menuSortSelect');
    if (sortSel) sortSel.value = 'popular';

    const priceSel = document.getElementById('menuPriceSelect');
    if (priceSel) priceSel.value = 'any';

    const catSel = document.getElementById('mobileCategorySelect');
    if (catSel) catSel.value = 'all';

    ['all', 'cakes', 'cupcakes', 'desserts'].forEach(c => {
      const btn = document.getElementById(`filter-${c}`);
      if (btn) btn.classList.toggle('is-active', c === 'all');
    });

    this.updateUrlHash();
    this.renderMenu(false);
  },

  setSort(sort) {
    this.sortOption = sort;
    const sel = document.getElementById('menuSortSelect');
    if (sel) sel.value = sort;
    this.updateUrlHash();
    this.renderMenu(true);
  },

  setPriceRange(range) {
    this.priceRange = range;
    const sel = document.getElementById('menuPriceSelect');
    if (sel) sel.value = range;
    this.updateUrlHash();
    this.renderMenu(false);
  },

  setCategory(cat) {
    this.category = cat;
    ['all', 'cakes', 'cupcakes', 'desserts'].forEach(c => {
      const btn = document.getElementById(`filter-${c}`);
      if (btn) {
        btn.classList.toggle('is-active', c === cat);
        btn.setAttribute('aria-pressed', c === cat ? 'true' : 'false');
      }
    });
    const mobSel = document.getElementById('mobileCategorySelect');
    if (mobSel) mobSel.value = cat;
    this.updateUrlHash();
    this.renderMenu(false);
  },


  parseUrlHash() {
    const state = parseMenuHash(window.location.hash);
    this.searchQuery = state.q;
    this.category = state.cat;
    this.sortOption = state.sort;
    this.priceRange = state.range;

    const input = document.getElementById('menuSearchInput');
    if (input) input.value = this.searchQuery;
    const clearBtn = document.getElementById('menuSearchClear');
    if (clearBtn) clearBtn.style.display = this.searchQuery ? 'block' : 'none';
    const sortSel = document.getElementById('menuSortSelect');
    if (sortSel) sortSel.value = this.sortOption;
    const priceSel = document.getElementById('menuPriceSelect');
    if (priceSel) priceSel.value = this.priceRange;
    const catSel = document.getElementById('mobileCategorySelect');
    if (catSel) catSel.value = this.category;
    ['all', 'cakes', 'cupcakes', 'desserts'].forEach(c => {
      const btn = document.getElementById(`filter-${c}`);
      if (btn) {
        btn.classList.toggle('is-active', c === this.category);
        btn.setAttribute('aria-pressed', c === this.category ? 'true' : 'false');
      }
    });
  },


  updateUrlHash() {
    const newHash = buildMenuHash({ q: this.searchQuery, cat: this.category, sort: this.sortOption, range: this.priceRange });
    if (window.location.hash !== newHash) history.replaceState(null, '', newHash);
  },


  // Category Filtering
  // Menu Grid Rendering with Search, Sort, Price Filter & Empty State
  // Menu Grid Rendering with Search, Sort, Price Filter & Empty State
  renderMenu(animate = false) {
    const grid = document.getElementById('menuGrid');
    if (!grid) return;

    const isKu = this.lang === 'ku';
    const pick = o => (isKu ? (o?.ku || o?.en) : o?.en) || '';
    const rawQ = (this.searchQuery || '').trim();
    const tokens = searchTokens(rawQ);

    let filtered = this.products.filter(p =>
      (this.category === 'all' || p.category === this.category) &&
      inPriceRange(p.priceUSD, this.priceRange) &&
      matchesSearch(p, tokens)
    );

    const flagged = tag => (a, b) => (b.tag === tag ? 1 : 0) - (a.tag === tag ? 1 : 0);
    if (this.sortOption === 'popular') filtered.sort(flagged('bestseller'));
    else if (this.sortOption === 'newest') filtered.sort(flagged('new'));
    else if (this.sortOption === 'price-asc') filtered.sort((a, b) => a.priceUSD - b.priceUSD);
    else if (this.sortOption === 'price-desc') filtered.sort((a, b) => b.priceUSD - a.priceUSD);
    else if (this.sortOption === 'name-asc') filtered.sort((a, b) => pick(a.name).localeCompare(pick(b.name)));

    const countEl = document.getElementById('menuResultsCount');
    if (countEl) {
      countEl.textContent = this.t('searchResultsCount')
        .replace('{shown}', filtered.length)
        .replace('{total}', this.products.length);
    }

    if (filtered.length === 0) {
      const emptyTitle = this.products.length === 0
        ? this.t('menuNoProducts')
        : (rawQ ? this.t('searchNoResults').replace('{query}', rawQ) : this.t('searchNoResults').replace('"{query}"', '').replace('{query}', ''));
      grid.innerHTML = `
        <div class="menu-empty-state">
          <div class="menu-empty-icon" aria-hidden="true">🍰</div>
          <h3 class="menu-empty-title">${escapeHTML(emptyTitle)}</h3>
          ${this.products.length ? `<p class="menu-empty-desc">${escapeHTML(this.t('searchEmptyDesc'))}</p>
          <div class="menu-empty-actions">
            ${rawQ ? `<button type="button" class="btn btn--secondary btn--sm" onclick="app.clearSearch()">${escapeHTML(this.t('searchClearSearch'))}</button>` : ''}
            <button type="button" class="btn btn--primary btn--sm" onclick="app.clearAllFilters()">${escapeHTML(this.t('searchClearAll'))}</button>
          </div>` : ''}
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map((item, index) => {
      const rawName = pick(item.name);
      const name = rawQ ? highlightMatches(rawName, rawQ) : escapeHTML(rawName);
      const desc = rawQ ? highlightMatches(pick(item.desc), rawQ) : escapeHTML(pick(item.desc));
      const unit = escapeHTML(pick(item.unit));
      const priceFormatted = escapeHTML(this.formatPrice(item.priceUSD));
      const emoji = escapeHTML(item.emoji || '🎂');

      let tagBadge = '';
      if (item.tag === 'bestseller') tagBadge = `<span class="cake__tag cake__tag--bestseller">${escapeHTML(this.t('tagBestseller'))}</span>`;
      else if (item.tag === 'new') tagBadge = `<span class="cake__tag cake__tag--new">${escapeHTML(this.t('tagNew'))}</span>`;

      const imgSrc = safeUrl(item.img, { allowDataImage: true });
      const mediaHtml = imgSrc
        ? `<img src="${escapeHTML(imgSrc)}" ${srcsetFor(imgSrc) ? `srcset="${escapeHTML(srcsetFor(imgSrc))}" sizes="(max-width: 560px) 50vw, (max-width: 1100px) 33vw, 300px"` : ''} alt="${escapeHTML(rawName)}" loading="lazy" decoding="async" width="800" height="600" referrerpolicy="no-referrer" class="cake-card__img" onerror="this.style.display='none';if(this.nextElementSibling)this.nextElementSibling.style.display='flex';" /><div class="cake-card__emoji" style="display:none;" aria-hidden="true">${emoji}</div>`
        : `<div class="cake-card__emoji" aria-hidden="true">${emoji}</div>`;

      const animClass = animate ? 'cake-card-animate' : '';
      const animStyle = animate ? `style="--stagger:${index % 12};"` : '';
      const domId = 'product-' + String(item.id).replace(/[^A-Za-z0-9_-]/g, '_');

      return `
        <article class="cake-card ${animClass}" id="${escapeHTML(domId)}" ${animStyle}>
          <div class="cake-card__media">
            ${mediaHtml}
            ${tagBadge}
            <span class="cake-card__count" data-count-for="${escapeHTML(item.id)}" hidden></span>
          </div>
          <div class="cake-card__body">
            <h3 class="cake-card__title">${name}</h3>
            <p class="cake-card__desc">${desc}</p>
            <div class="cake-card__footer">
              <div class="price-wrap">
                <span class="price">${priceFormatted}</span>
                <span class="price-unit">${unit}</span>
              </div>
              <button type="button" class="btn btn--primary btn--sm" onclick="app.openCustomizeModal(${jsArg(item.id)})" aria-label="${escapeHTML(this.t('btnAdd') + ': ' + rawName)}">
                ${escapeHTML(this.t('btnAdd'))}
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
    this.syncMenuOrderState();
  },


  // Mark menu cards that are already in the order, so shoppers can see what they picked
  // Mark menu cards that are already in the cart, so shoppers can see what they picked
  syncMenuOrderState() {
    const counts = new Map();
    for (const item of this.cart || []) {
      if (item.qty > 0) counts.set(item.productId, (counts.get(item.productId) || 0) + item.qty);
    }
    document.querySelectorAll('.cake-card__count[data-count-for]').forEach(el => {
      const n = counts.get(el.dataset.countFor) || 0;
      const card = el.closest('.cake-card');
      if (card) card.classList.toggle('is-in-order', n > 0);
      el.hidden = n === 0;
      el.textContent = n > 0 ? this.t('inOrderCount').replace('{n}', n) : '';
    });
  },


  getShopName() {
    if (!this.config || !this.config.shopName) return 'Yummy Sweets';
    return (this.lang === 'ku') ? (this.config.shopName.ku || this.config.shopName.en) : this.config.shopName.en;
  },

  resolveLogoSrc() {
    const c = this.config;
    if (!c) return null;
    const mode = c.logoMode || (c.logoImage ? 'image' : (c.logoImageUrl ? 'url' : 'emoji'));
    if (mode === 'image' && c.logoImage) return safeUrl(c.logoImage, { allowDataImage: true }) || null;
    if (mode === 'url') return safeUrl(c.logoUrl || c.logoImageUrl) || null;
    return null;
  },


  updateFavicon() {
    const src = this.resolveLogoSrc();
    let link = document.querySelector('link[rel="icon"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    if (src) {
      link.href = src;
    } else {
      const emoji = escapeHTML(Array.from((this.config && this.config.logoEmoji) || '🎂').slice(0, 4).join(''));
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#8E3B4A"/><text x="32" y="46" font-size="38" text-anchor="middle">${emoji}</text></svg>`;
      link.href = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
    }
  },


  renderLogoElements() {
    const src = this.resolveLogoSrc();
    const emoji = (this.config && this.config.logoEmoji) || '🎂';
    const shopName = this.getShopName();

    document.querySelectorAll('[data-logo]').forEach(el => {
      el.style.opacity = '0';
      setTimeout(() => {
        el.textContent = '';
        if (src) {
          const img = document.createElement('img');
          img.src = src;
          img.alt = shopName;
          img.className = 'logo__img';
          img.onerror = () => { el.textContent = emoji; };
          el.appendChild(img);
        } else {
          el.textContent = emoji;
        }
        el.style.opacity = '1';
      }, 50);
    });
  },


  // Render Config-driven Brand, Contact & Footer
  // Announcement text with the live free-delivery threshold filled in.
  announcementHtml() {
    const c = this.config;
    const raw = (this.lang === 'ku' ? (c.announcement.ku || c.announcement.en) : c.announcement.en) || '';
    const eco = this.getEconomy();
    const threshold = Math.max(0, Number(eco.freeDeliveryOver) || 0);
    const amount = this.formatPrice(threshold).replace(/\.00(?=\u2069?$)/, '');
    let html = sanitizeInlineHTML(raw.replace(/\{freeDelivery\}/g, amount));
    // Old copy hardcoded "$50"; keep it truthful by showing the configured amount.
    html = html.replace(/\$50(?![0-9])/g, escapeHTML(amount));
    return html;
  },

  // JSON-LD for search engines, from the live config (only fields that are actually set).
  updateStructuredData(shopName) {
    const el = document.getElementById('ldJson');
    if (!el) return;
    const description = document.querySelector('meta[name="description"]')?.content || '';
    const url = document.querySelector('link[rel="canonical"]')?.href || '';
    el.textContent = JSON.stringify(buildStructuredData(this.config, { name: shopName, description, url }));
  },

  // Render Config-driven Brand, Contact & Footer
  renderBranding() {
    const c = this.config;
    const isKu = this.lang === 'ku';
    const pick = o => (isKu ? (o?.ku || o?.en) : o?.en) || '';
    const setText = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value; };

    const shopName = this.getShopName();
    const tagline = pick(c.tagline);
    document.title = `${shopName} — ${tagline}`;
    this.updateStructuredData(shopName);

    ['headerShopName', 'footerShopName', 'mobileShopName', 'copyrightName'].forEach(id => setText(id, shopName));
    setText('copyrightYear', new Date().getFullYear());
    setText('headerShopTagline', tagline);

    this.renderLogoElements();
    this.updateFavicon();

    const announcementEl = document.getElementById('announcementText');
    if (announcementEl) announcementEl.innerHTML = this.announcementHtml();
    const bar = document.getElementById('announcementBar');
    if (bar) bar.hidden = !stripTags(pick(c.announcement)).trim();

    setText('storyText', pick(c.aboutUs));
    const storyEyebrow = isKu ? (c.aboutUs.eyebrowKu || c.aboutUs.eyebrowEn || 'کەلەپووری ئێمە') : (c.aboutUs.eyebrowEn || 'Our Heritage');
    const storyTitle = isKu ? (c.aboutUs.titleKu || c.aboutUs.titleEn || 'بە ئارامگرتن ئامادە کراوە، بە خۆشەویستی برژاوە') : (c.aboutUs.titleEn || 'Crafted with patience, baked with devotion');
    const eyebrowEl = document.querySelector('[data-i18n="storyEyebrow"]');
    if (eyebrowEl) eyebrowEl.textContent = storyEyebrow;
    const titleEl = document.querySelector('[data-i18n="storyTitle"]');
    if (titleEl) titleEl.textContent = storyTitle;
    const imgEl = document.querySelector('.story__img');
    const storyImg = safeUrl(c.aboutUs.imageUrl);
    if (imgEl && storyImg && imgEl.getAttribute('src') !== storyImg) {
      imgEl.src = storyImg;
      const set = srcsetFor(storyImg, [480, 720, 900]);
      if (set) imgEl.srcset = set; else imgEl.removeAttribute('srcset');
    }

    // Contact details: empty values are hidden rather than shown as placeholders.
    setText('infoAddress', pick(c.contact.address));
    const hours = pick(c.contact.hours);
    ['infoHours', 'footerHours'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = escapeMultiline(hours);
    });

    const wa = normalizeWhatsAppNumber(c.contact.whatsapp);
    const phone = String(c.contact.phone || '').trim();
    const email = String(c.contact.email || '').trim();
    const infoContact = document.getElementById('infoContact');
    if (infoContact) {
      const rows = [];
      if (wa) rows.push(`<a href="https://wa.me/${wa}" target="_blank" rel="noopener noreferrer" dir="ltr">WhatsApp: +${wa}</a>`);
      if (email) rows.push(`<a href="mailto:${escapeHTML(email)}" dir="ltr">${escapeHTML(email)}</a>`);
      if (phone) rows.push(`<a href="tel:${escapeHTML(phone.replace(/[^\d+]/g, ''))}" dir="ltr">${escapeHTML(phone)}</a>`);
      infoContact.innerHTML = rows.length ? rows.join('<br>') : escapeHTML(this.t('contactNotSet'));
    }
    const footerPhone = document.getElementById('footerPhone');
    const footerPhoneRow = document.getElementById('footerPhoneRow');
    if (footerPhone) {
      footerPhone.textContent = phone || (wa ? '+' + wa : '');
      footerPhone.href = phone ? 'tel:' + phone.replace(/[^\d+]/g, '') : (wa ? 'https://wa.me/' + wa : '#');
    }
    if (footerPhoneRow) footerPhoneRow.hidden = !(phone || wa);

    const socials = c.socials || {};
    [
      ['socialInsta', socials.instagram],
      ['socialFb', socials.facebook],
      ['socialTiktok', socials.tiktok],
      ['socialSnap', socials.snapchat]
    ].forEach(([id, rawUrl]) => {
      const el = document.getElementById(id);
      if (!el) return;
      const url = safeUrl(rawUrl);
      const hasUrl = /^https?:\/\//i.test(url);
      el.href = hasUrl ? url : '#';
      el.style.display = hasUrl ? '' : 'none';
    });
  },


  // Order Tray & WhatsApp Cart
  // Order Tray & WhatsApp Cart
  addToOrder(productId, exclude = []) {
    if (!this.products.some(p => p.id === productId)) return;
    this.cart = addItem(this.cart, productId, exclude);
    this.persistCart();
    this.clearSentNotice();
    this.renderTray();
    this.syncMenuOrderState();
    this.showToast(this.t('toastAdded'), 'success');
  },

  changeCartQty(lineId, delta) {
    this.cart = changeQty(this.cart, lineId, delta);
    this.persistCart();
    this.clearSentNotice();
    this.renderTray();
    this.syncMenuOrderState();
    this.focusCartLine(lineId);
  },

  removeCartLine(lineId) {
    const line = priceLines(this.cart.filter(i => i.id === lineId), this.products, this.lang)[0];
    this.cart = removeItem(this.cart, lineId);
    this.persistCart();
    this.clearSentNotice();
    this.renderTray();
    this.syncMenuOrderState();
    if (line) this.announce(this.t('cartItemRemoved').replace('{name}', line.name));
    const tray = document.getElementById('trayLines');
    const next = tray && tray.querySelector('button');
    if (next) next.focus();
  },

  // Keep keyboard focus on the same line after the tray re-renders.
  focusCartLine(lineId) {
    const row = document.querySelector(`#trayLines [data-line="${CSS.escape(lineId)}"]`);
    if (row) {
      const btn = row.querySelector('[data-qty-action]');
      if (btn) btn.focus();
    } else {
      const first = document.querySelector('#trayLines button');
      if (first) first.focus();
    }
  },

  
  openCustomizeModal(productId) {
    const prod = this.products.find(p => p.id === productId);
    if (!prod) return;
    if (!prod.exclusions || prod.exclusions.length === 0) {
      this.addToOrder(productId);
      return;
    }

    const isKu = this.lang === 'ku';
    const pick = o => (isKu ? (o?.ku || o?.en) : o?.en) || '';
    const trigger = document.activeElement;
    document.getElementById('customizeModal')?.remove();

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'customizeModal';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'customizeTitle');
    overlay.innerHTML = `
      <div class="modal-window modal-window--narrow">
        <div class="modal-header">
          <h3 class="modal-title" id="customizeTitle">${escapeHTML(this.t('customizeTitle') || 'Customize')}</h3>
          <button type="button" class="modal-close" data-close aria-label="${escapeHTML(this.t('btnClose'))}">✕</button>
        </div>
        <div class="modal-body">
          <p class="customize-product">${escapeHTML(pick(prod.name))}</p>
          <fieldset class="customize-options">
            <legend>${escapeHTML(this.t('customizeLeaveOut') || 'Leave out')}</legend>
            ${prod.exclusions.map(ex => `
              <label class="customize-option">
                <input type="checkbox" value="${escapeHTML(ex.id)}" />
                <span>${escapeHTML(pick(ex))}</span>
              </label>`).join('')}
          </fieldset>
          <div class="modal-actions">
            <button type="button" class="btn btn--ghost" data-skip>${escapeHTML(this.t('customizeSkip') || 'Add as is')}</button>
            <button type="button" class="btn btn--primary" data-add>${escapeHTML(this.t('customizeAdd') || 'Add to order')}</button>
          </div>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    const close = () => { this.closeDialog('customizeModal'); overlay.remove(); };
    overlay.querySelector('[data-close]').onclick = close;
    overlay.querySelector('[data-skip]').onclick = () => { close(); this.addToOrder(productId); };
    overlay.querySelector('[data-add]').onclick = () => {
      const excludes = [...overlay.querySelectorAll('input:checked')].map(i => i.value);
      close();
      this.addToOrder(productId, excludes);
    };
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    this.openDialog('customizeModal', trigger, { onEscape: close });
  },


  async clearOrder() {
    if (this.cart.length === 0) return;
    const ok = await this.confirmDialog({
      title: this.t('cartClearTitle'),
      message: this.t('cartClearConfirm'),
      okLabel: this.t('trayClear'),
      danger: true,
    });
    if (!ok) return;
    this.resetCart();
    this.showToast(this.t('toastOrderCleared'));
  },

  resetCart() {
    this.cart = [];
    this.orderNote = '';
    const noteEl = document.getElementById('trayOrderNote');
    if (noteEl) noteEl.value = '';
    this.appliedPromoCode = '';
    this.trayBreakdownOpen = false;
    this.persistCart();
    this.clearSentNotice();
    this.renderTray();
    this.syncMenuOrderState();
  },


  computeCartBreakdown(subtotalUSD = 0, enteredPromoCode = null, customEconomy = null) {
    const eco = customEconomy || this.getEconomy();
    const code = enteredPromoCode !== null ? enteredPromoCode : (this.appliedPromoCode || '');
    return computeBreakdown(subtotalUSD, eco, code);
  },


  toggleTrayBreakdown(force = null) {
    this.trayBreakdownOpen = force === null ? !this.trayBreakdownOpen : Boolean(force);
    const bd = document.getElementById('trayBreakdown');
    const tray = document.getElementById('orderTray');
    const label = document.getElementById('trayToggleLabel');
    if (bd) bd.hidden = !this.trayBreakdownOpen;
    if (tray) tray.classList.toggle('is-expanded', this.trayBreakdownOpen);
    document.querySelectorAll('[aria-controls="trayBreakdown"]').forEach(b => b.setAttribute('aria-expanded', this.trayBreakdownOpen ? 'true' : 'false'));
    if (label) label.textContent = this.trayBreakdownOpen ? this.t('trayDetailsClose') : this.t('trayDetails');
    if (this.trayBreakdownOpen) this.prepareFulfillmentInput();
  },


  applyCartPromo() {
    const input = document.getElementById('trayPromoInput');
    if (!input) return;
    const feedback = document.getElementById('trayPromoFeedback');
    const result = checkPromo(this.getEconomy(), input.value);
    if (result.status === 'empty') return;
    if (result.status !== 'valid') {
      const msg = result.status === 'expired' ? this.t('promoExpired') : this.t('invalidPromo');
      if (feedback) { feedback.textContent = msg; feedback.dataset.state = 'error'; }
      input.setAttribute('aria-invalid', 'true');
      return;
    }
    this.appliedPromoCode = result.code;
    this.showToast(this.t('promoApplied').replace('{code}', result.code), 'success');
    this.renderTray();
  },


  removeCartPromo() {
    this.appliedPromoCode = '';
    this.renderTray();
    this.showToast(this.t('promoRemoved'), 'info');
  },

  renderTray() {
    const tray = document.getElementById('orderTray');
    if (!tray) return;

    const lines = priceLines(this.cart, this.products, this.lang);
    const count = cartCount(lines);
    const subtotalUSD = cartSubtotal(lines);

    document.body.classList.toggle('has-order-tray', count > 0);
    this.syncMenuOrderState();

    if (count === 0) {
      tray.classList.remove('is-visible', 'is-expanded');
      this.trayBreakdownOpen = false;
      const bd = document.getElementById('trayBreakdown');
      if (bd) bd.hidden = true;
      return;
    }
    tray.classList.add('is-visible');

    const breakdown = this.computeCartBreakdown(subtotalUSD);
    const setText = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    setText('trayItemCount', count);
    setText('trayTotalPrice', this.formatPrice(breakdown.total));
    setText('trayPreviewText', lines.map(l => `${l.qty}× ${l.name}`).join(', '));
    const countLabel = document.getElementById('trayItemCount');
    if (countLabel) countLabel.setAttribute('aria-label', this.t('trayItemsLabel').replace('{n}', count));

    const freeBadge = document.getElementById('trayFreeDeliveryBadge');
    if (freeBadge) freeBadge.hidden = !(breakdown.isFreeDelivery && !breakdown.isPickupOnly);

    const noteEl = document.getElementById('trayOrderNote');
    if (noteEl && noteEl.value !== this.orderNote) noteEl.value = this.orderNote || '';

    // Editable lines
    const linesEl = document.getElementById('trayLines');
    if (linesEl) {
      linesEl.innerHTML = lines.map(l => `
        <li class="tray-line" data-line="${escapeHTML(l.id)}">
          <div class="tray-line__info">
            <span class="tray-line__name">${escapeHTML(l.name)}</span>
            ${l.excludeLabels.length ? `<span class="tray-line__custom">${escapeHTML(this.t('waExclude') || 'No')} ${escapeHTML(l.excludeLabels.join(', '))}</span>` : ''}
            <span class="tray-line__unit">${escapeHTML(this.t('cartEach').replace('{price}', this.formatPrice(l.unitPriceUSD)))}</span>
          </div>
          <div class="tray-line__qty" role="group" aria-label="${escapeHTML(this.t('cartQtyLabel').replace('{name}', l.name))}">
            <button type="button" class="qty-btn" data-qty-action="dec" onclick="app.changeCartQty(${jsArg(l.id)}, -1)" aria-label="${escapeHTML(this.t('cartDecrease').replace('{name}', l.name))}">−</button>
            <output class="qty-value" aria-live="polite">${l.qty}</output>
            <button type="button" class="qty-btn" data-qty-action="inc" onclick="app.changeCartQty(${jsArg(l.id)}, 1)" aria-label="${escapeHTML(this.t('cartIncrease').replace('{name}', l.name))}" ${l.qty >= 99 ? 'disabled' : ''}>+</button>
          </div>
          <span class="tray-line__total">${escapeHTML(this.formatPrice(l.lineTotalUSD))}</span>
          <button type="button" class="tray-line__remove" onclick="app.removeCartLine(${jsArg(l.id)})" aria-label="${escapeHTML(this.t('cartRemove').replace('{name}', l.name))}">✕</button>
        </li>`).join('');
    }

    // Minimum order warning & send button state
    const btnSend = document.getElementById('btnTrayWhatsApp');
    const minNotice = document.getElementById('trayMinOrderNotice');
    if (!breakdown.minOrderMet) {
      const warnMsg = this.t('minimumOrderWarning')
        .replace('{amount}', this.formatPrice(breakdown.minOrder))
        .replace('{remaining}', this.formatPrice(breakdown.minOrderRemaining));
      if (btnSend) { btnSend.disabled = true; btnSend.classList.add('is-disabled'); btnSend.title = warnMsg; }
      if (minNotice) { minNotice.hidden = false; minNotice.textContent = warnMsg; }
    } else {
      if (btnSend) { btnSend.disabled = false; btnSend.classList.remove('is-disabled'); btnSend.removeAttribute('title'); }
      if (minNotice) { minNotice.hidden = true; minNotice.textContent = ''; }
    }

    // Totals
    const bdLines = document.getElementById('trayBreakdownLines');
    if (bdLines) {
      const row = (label, value, cls = '') => `<div class="tray-breakdown-row ${cls}"><span>${escapeHTML(label)}</span><span>${escapeHTML(value)}</span></div>`;
      let rows = row(this.t('subtotal'), this.formatPrice(breakdown.subtotal));
      if (breakdown.discount > 0) rows += row(`${this.t('discount')} (${breakdown.promoCodeName})`, '−' + this.formatPrice(breakdown.discount), 'tray-breakdown-row--discount');
      if (breakdown.isPickupOnly) rows += row(this.t('economyDelivery'), this.t('pickupOnlyLabel'));
      else if (breakdown.isFreeDelivery) rows += row(this.t('deliveryFee'), this.t('freeDelivery'), 'tray-breakdown-row--free');
      else rows += row(this.t('deliveryFee'), this.formatPrice(breakdown.delivery));
      if (breakdown.tax > 0) rows += row(`${this.t('tax')} (${breakdown.taxLabel} ${breakdown.taxRate}%)`, '+' + this.formatPrice(breakdown.tax));
      else if (breakdown.taxEnabled && breakdown.taxIncluded && breakdown.taxRate > 0) rows += row(`${breakdown.taxLabel} ${breakdown.taxRate}%`, this.t('taxIncludedLabel'));
      rows += row(this.t('total'), this.formatPrice(breakdown.total), 'tray-breakdown-row--total');
      bdLines.innerHTML = rows;
    }

    // Promo code
    const promoArea = document.getElementById('trayPromoArea');
    if (promoArea) {
      const hasPromo = Boolean(String(this.getEconomy().promoCode || '').trim());
      promoArea.hidden = !hasPromo && !breakdown.promoValid;
      if (breakdown.promoValid) {
        promoArea.innerHTML = `
          <div class="tray-promo-applied">
            <span>✓ ${escapeHTML(this.t('promoApplied').replace('{code}', breakdown.promoCodeName))}</span>
            <button type="button" class="tray-btn tray-btn--quiet tray-btn--small" onclick="app.removeCartPromo()">${escapeHTML(this.t('trayRemovePromo'))}</button>
          </div>`;
      } else if (!document.getElementById('trayPromoInput')) {
        promoArea.innerHTML = `
          <label class="tray-field__label" for="trayPromoInput">${escapeHTML(this.t('trayPromoPlaceholder'))}</label>
          <div class="tray-promo-row">
            <input type="text" id="trayPromoInput" class="tray-promo-input" maxlength="20" autocomplete="off" aria-describedby="trayPromoFeedback" onkeydown="if(event.key==='Enter'){event.preventDefault();app.applyCartPromo();}" />
            <button type="button" class="tray-btn tray-btn--quiet tray-btn--small" id="btnApplyPromo" onclick="app.applyCartPromo()">${escapeHTML(this.t('trayApplyPromo'))}</button>
          </div>
          <div id="trayPromoFeedback" class="tray-promo-feedback" role="status"></div>`;
      }
    }

    const guestNotice = document.getElementById('trayGuestNotice');
    if (guestNotice) guestNotice.hidden = Boolean(this.session);
  },

  // Date input: minimum = now + lead time; hint shows the earliest slot in the user's language.
  prepareFulfillmentInput() {
    const input = document.getElementById('trayFulfillmentDate');
    if (!input) return;
    const hours = leadHours(this.getEconomy());
    const earliest = earliestFulfillment(new Date(), hours);
    input.min = toLocalInputValue(earliest);
    const hint = document.getElementById('trayDateHint');
    if (hint) {
      hint.textContent = this.t('trayDateHint')
        .replace('{hours}', hours)
        .replace('{date}', formatFulfillment(earliest, this.lang));
    }
    this.prefillCheckoutDetails();
  },

  // Fill empty checkout fields from the signed-in profile or this device's saved details.
  prefillCheckoutDetails() {
    const saved = this.cacheGet(KEYS.GUEST, null) || {};
    const src = {
      name: (this.profile && this.profile.name) || saved.name || (this.session && this.session.name) || '',
      phone: (this.profile && this.profile.phone) || saved.phone || (this.session && this.session.phone) || '',
      address: (this.profile && this.profile.address) || saved.address || '',
    };
    [['trayCustName', 'name'], ['trayCustPhone', 'phone'], ['trayCustAddress', 'address']].forEach(([id, key]) => {
      const el = document.getElementById(id);
      if (el && !el.value && src[key]) el.value = src[key];
    });
    const remember = document.getElementById('trayRememberDetails');
    if (remember && saved.name) remember.checked = true;
  },

  setCheckoutError(message, fieldId = null) {
    const el = document.getElementById('trayCheckoutError');
    if (el) {
      el.textContent = message || '';
      el.hidden = !message;
    }
    document.querySelectorAll('#trayBreakdown [aria-invalid="true"]').forEach(i => i.removeAttribute('aria-invalid'));
    if (fieldId) {
      const field = document.getElementById(fieldId);
      if (field) {
        field.setAttribute('aria-invalid', 'true');
        field.focus();
      }
    }
  },

  clearSentNotice() {
    const notice = document.getElementById('traySentNotice');
    if (notice) notice.hidden = true;
    this.lastSentSignature = null;
  },


  // Builds the WhatsApp message from current prices, opens WhatsApp, and records the order.
  // Opening WhatsApp does not prove the message was sent, so the tray stays until the customer clears it.
  async checkoutWhatsApp() {
    if (this.checkoutInFlight) return;
    const lines = priceLines(this.cart, this.products, this.lang);
    if (lines.length === 0) return;
    const eco = this.getEconomy();
    const breakdown = this.computeCartBreakdown(cartSubtotal(lines));

    if (!this.trayBreakdownOpen) this.toggleTrayBreakdown(true);
    this.setCheckoutError('');

    if (!breakdown.minOrderMet) {
      this.setCheckoutError(this.t('minimumOrderWarning')
        .replace('{amount}', this.formatPrice(breakdown.minOrder))
        .replace('{remaining}', this.formatPrice(breakdown.minOrderRemaining)));
      return;
    }

    const name = (document.getElementById('trayCustName')?.value || '').trim();
    const phone = (document.getElementById('trayCustPhone')?.value || '').trim();
    const address = (document.getElementById('trayCustAddress')?.value || '').trim();
    if (!name) {
      this.setCheckoutError(this.t('checkoutNeedName'), 'trayCustName');
      return;
    }

    const dateValue = document.getElementById('trayFulfillmentDate')?.value || '';
    const dateCheck = validateFulfillment(dateValue, new Date(), leadHours(eco));
    if (!dateCheck.ok) {
      const key = { missing: 'checkoutNeedDate', invalid: 'checkoutBadDate', 'too-soon': 'checkoutDateTooSoon', 'too-far': 'checkoutDateTooFar' }[dateCheck.error];
      const msg = this.t(key)
        .replace('{hours}', leadHours(eco))
        .replace('{date}', dateCheck.earliest ? formatFulfillment(dateCheck.earliest, this.lang) : '');
      this.setCheckoutError(msg, 'trayFulfillmentDate');
      return;
    }

    const waNumber = normalizeWhatsAppNumber(this.config.contact.whatsapp);
    if (!waNumber) {
      this.setCheckoutError(this.t('checkoutNoWhatsApp'));
      return;
    }

    // Same cart sent moments ago: ask before opening a second order.
    const signature = JSON.stringify([this.cart, dateValue, name]);
    if (this.lastSentSignature === signature) {
      const again = await this.confirmDialog({ title: this.t('checkoutAgainTitle'), message: this.t('checkoutAgainConfirm'), okLabel: this.t('checkoutAgainOk') });
      if (!again) return;
    }

    const remember = document.getElementById('trayRememberDetails');
    if (remember && remember.checked) this.cacheSet(KEYS.GUEST, { name, phone, address });
    else if (remember) { try { localStorage.removeItem(KEYS.GUEST); } catch { /* ignore */ } }

    const orderRef = 'YS-' + Date.now().toString(36).toUpperCase().slice(-6);
    const fmt = v => this.formatPrice(v);
    const message = buildOrderMessage({
      lang: this.lang,
      shopName: this.getShopName(),
      lines,
      breakdown,
      fmt,
      customer: { name, phone, address },
      fulfillmentText: formatFulfillment(dateCheck.date, this.lang),
      note: (this.orderNote || '').trim(),
      orderRef,
    });
    const url = buildWhatsAppUrl(waNumber, message);

    // Open synchronously from the click so pop-up blockers allow it.
    const win = window.open(url, '_blank');
    if (win) { try { win.opener = null; } catch { /* cross-origin */ } }
    this.lastSentSignature = signature;
    this.showSentNotice(url, Boolean(win));

    // Record the order (device history always; Firestore when signed in).
    this.checkoutInFlight = true;
    try {
      const record = buildOrderRecord({
        customerId: this.session ? this.session.uid : 'guest',
        customer: { name, phone, address },
        lines,
        eco,
        promoCode: this.appliedPromoCode,
        currency: this.currency,
        fulfillmentAt: dateCheck.date,
        note: this.orderNote,
        lang: this.lang,
        ref: orderRef,
      });
      this.localOrders = [{
        id: orderRef,
        ref: orderRef,
        items: record.items,
        totals: record.totals,
        fulfillmentAt: dateCheck.date.getTime(),
        note: record.note,
        status: 'sent',
        createdAt: Date.now(),
      }, ...this.localOrders].slice(0, 50);
      this.cacheSet(KEYS.MY_ORDERS, this.localOrders);

      if (this.session && firebaseReady()) {
        const problems = validateOrderRecord(record);
        if (problems.length) throw Object.assign(new Error('invalid order: ' + problems.join(',')), { code: 'invalid-argument' });
        await loadStore();
        await store.createOrder(record);
        this.announce(this.t('orderSavedToHistory'));
      }
    } catch (e) {
      console.warn('Order not saved to history:', describeDataError(e));
      this.showToast(this.t('orderHistorySaveFailed'), 'warning');
    } finally {
      this.checkoutInFlight = false;
      this.updateAuthUI();
    }
  },

  showSentNotice(url, opened) {
    const notice = document.getElementById('traySentNotice');
    if (!notice) return;
    const text = document.getElementById('traySentText');
    if (text) text.textContent = opened ? this.t('checkoutOpened') : this.t('checkoutBlocked');
    const link = document.getElementById('traySentLink');
    if (link) link.href = url;
    notice.hidden = false;
    this.showToast(opened ? this.t('checkoutOpened') : this.t('checkoutBlocked'), opened ? 'success' : 'warning');
  },

  finishSentOrder() {
    this.resetCart();
    this.showToast(this.t('trayClearedAfterSend'), 'success');
  },


  openWhatsAppDirect() {
    const isKu = this.lang === 'ku';
    const shopName = this.getShopName();
    const msg = isKu ? `سڵاو ${shopName}! دەمەوێت پرسیار لەسەر کێکەکان بکەم.` : `Hello ${shopName}! I have an inquiry regarding your cakes.`;
    const url = buildWhatsAppUrl(this.config.contact.whatsapp, msg);
    if (!url) {
      this.showToast(this.t('checkoutNoWhatsApp'), 'error');
      return;
    }
    const win = window.open(url, '_blank');
    if (win) { try { win.opener = null; } catch { /* cross-origin */ } }
  },


  // Auth System: Customer & Staff (Admin / Developer)
  // Auth System: header chip derived from the Firebase session
  // Auth System: header controls derived from the Firebase session.
  // Desktop shows a compact account menu; the mobile drawer lists the same actions inline.
  updateAuthUI() {
    const desktopContainer = document.getElementById('desktopAuthContainer');
    const mobileContainer = document.getElementById('mobileAuthContainer');
    const s = this.session;
    const hasHistory = (this.localOrders && this.localOrders.length > 0) || Boolean(s);
    const ordersBtn = cls => hasHistory
      ? `<button type="button" class="${cls}" onclick="app.closeAccountMenu();app.openHistoryModal()">${escapeHTML(this.t('myOrdersBtn'))}</button>`
      : '';

    let desktop;
    let mobile;
    if (!s) {
      desktop = `
        <div class="auth-actions">
          ${ordersBtn('btn btn--ghost btn--sm')}
          <button type="button" class="btn btn--primary btn--sm" id="btnSignInDesktop" onclick="app.openAuthModal()">${escapeHTML(this.t('btnSignIn'))}</button>
        </div>`;
      mobile = desktop.replace('id="btnSignInDesktop"', 'id="btnSignInMobile"');
    } else {
      const privileged = isPrivileged(s);
      const display = s.name || s.email || this.t('customerFallbackName');
      const badge = privileged ? `<span class="badge ${s.role === 'dev' ? 'badge--dev' : 'badge--admin'}">${escapeHTML(this.t('role_' + s.role) || s.role)}</span>` : '';
      const items = cls => `
          ${ordersBtn(cls)}
          ${privileged ? `<button type="button" class="${cls}" onclick="app.closeAccountMenu();app.openPanelModal()">${escapeHTML(this.t('btnPanel'))}</button>` : ''}
          <button type="button" class="${cls}" onclick="app.closeAccountMenu();app.logout()">${escapeHTML(this.t('btnLogout'))}</button>`;
      desktop = `
        <div class="account-menu">
          <button type="button" class="btn btn--ghost btn--sm account-menu__toggle" id="accountMenuToggle" aria-expanded="false" aria-controls="accountMenuList" onclick="app.toggleAccountMenu()">
            ${badge}<span class="user-chip__name">${escapeHTML(display)}</span><span aria-hidden="true">▾</span>
          </button>
          <div class="account-menu__list" id="accountMenuList" hidden>${items('account-menu__item')}</div>
        </div>`;
      mobile = `
        <div class="user-chip user-chip--stacked">
          <div class="user-chip__who">${badge}<span class="user-chip__name">${escapeHTML(display)}</span></div>
          <div class="user-chip__actions">${items('btn btn--ghost btn--sm')}</div>
        </div>`;
    }
    // Only touch the DOM when something changed, so focused buttons are not replaced.
    const key = desktop + mobile;
    if (this._authHtml !== key) {
      if (desktopContainer) desktopContainer.innerHTML = desktop;
      if (mobileContainer) mobileContainer.innerHTML = mobile;
      this._authHtml = key;
    }
  },

  toggleAccountMenu(force = null) {
    const btn = document.getElementById('accountMenuToggle');
    const list = document.getElementById('accountMenuList');
    if (!btn || !list) return;
    const open = force === null ? list.hidden : Boolean(force);
    list.hidden = !open;
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) {
      const first = list.querySelector('button');
      if (first) first.focus();
    }
  },

  closeAccountMenu() {
    this.toggleAccountMenu(false);
  },



  // Customer Order History Methods
  // Signed-in customers see their Firestore history; everyone sees orders sent from this device.
  getCustomerOrders() {
    const remote = (this.session ? this.myOrders : []) || [];
    const seen = new Set(remote.flatMap(o => [o.id, o.ref].filter(Boolean)));
    const local = (this.localOrders || []).filter(o => !seen.has(o.id) && !seen.has(o.ref));
    return [...remote, ...local].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  },


  openHistoryModal() {
    this.renderCustomerHistory();
    this.openDialog('historyModal');
  },


  closeHistoryModal() {
    this.closeDialog('historyModal');
  },


  toggleHistoryDetails(orderId) {
    this.historyDetailsOpen[orderId] = !this.historyDetailsOpen[orderId];
    this.renderCustomerHistory();
  },

  reorderItems(orderId) {
    const order = this.getCustomerOrders().find(o => o.id === orderId);
    if (!order || !Array.isArray(order.items) || order.items.length === 0) return;
    let countAdded = 0;
    let cart = this.cart;
    order.items.forEach(item => {
      if (!this.products.some(p => p.id === item.productId)) return;
      const qty = Math.max(1, Math.min(99, Number(item.qty) || 1));
      for (let i = 0; i < qty; i++) cart = addItem(cart, item.productId, item.exclude || []);
      countAdded += qty;
    });
    this.cart = sanitizeCart(cart, this.products);
    this.persistCart();
    if (countAdded > 0) {
      this.closeHistoryModal();
      this.renderTray();
      this.showToast(this.t('orderAddedToTray').replace('{count}', countAdded), 'success');
    } else {
      this.showToast(this.t('itemsNotAvailable'), 'warning');
    }
  },


  renderCustomerHistory() {
    const modal = document.getElementById('historyModal');
    if (!modal) return;
    const isKu = this.lang === 'ku';
    const locale = isKu ? 'ckb' : 'en-GB';
    const orders = this.getCustomerOrders();
    const fmtDate = (ms, withTime = true) => {
      if (!ms) return '—';
      try {
        return new Date(ms).toLocaleDateString(locale, withTime
          ? { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }
          : { month: 'short', year: 'numeric' });
      } catch {
        return new Date(ms).toISOString().slice(0, 16).replace('T', ' ');
      }
    };

    const subtitleEl = document.getElementById('historyModalSubtitle');
    if (subtitleEl) {
      subtitleEl.textContent = orders.length
        ? this.t('myOrdersSubtitle').replace('{count}', orders.length).replace('{date}', fmtDate(Math.min(...orders.map(o => o.createdAt || Date.now())), false))
        : this.t('myOrdersEmpty');
    }
    const scopeEl = document.getElementById('historyScopeNote');
    if (scopeEl) scopeEl.textContent = this.session ? this.t('historyScopeAccount') : this.t('historyScopeDevice');

    const statsEl = document.getElementById('historyCustomerStats');
    if (statsEl) {
      if (orders.length) {
        const spent = orders.reduce((sum, o) => sum + (Number(o.totals?.total ?? o.economy?.total) || 0), 0);
        const freq = {};
        orders.forEach(o => (o.items || []).forEach(it => {
          const n = it.name || it.nameSnapshot || it.productId;
          freq[n] = (freq[n] || 0) + (it.qty || 1);
        }));
        const fav = Object.entries(freq).sort((a, b) => b[1] - a[1])[0];
        statsEl.hidden = false;
        statsEl.innerHTML = `
          <div class="history-stat-card"><span class="history-stat-label">${escapeHTML(this.t('myOrdersTotalOrders'))}</span><span class="history-stat-val">${orders.length}</span></div>
          <div class="history-stat-card"><span class="history-stat-label">${escapeHTML(this.t('myOrdersTotalSpent'))}</span><span class="history-stat-val">${escapeHTML(this.formatPrice(spent))}</span></div>
          <div class="history-stat-card"><span class="history-stat-label">${escapeHTML(this.t('myOrdersFavourite'))}</span><span class="history-stat-val history-stat-val--text">${escapeHTML(fav ? fav[0] : '—')}</span></div>`;
      } else {
        statsEl.hidden = true;
        statsEl.innerHTML = '';
      }
    }

    const listEl = document.getElementById('historyOrdersList');
    if (!listEl) return;
    if (!orders.length) {
      listEl.innerHTML = `
        <div class="history-empty-state">
          <div class="history-empty-icon" aria-hidden="true">📦</div>
          <h4 class="history-empty-title">${escapeHTML(this.t('myOrdersEmpty'))}</h4>
          <p class="history-empty-hint">${escapeHTML(this.t('myOrdersEmptyHint'))}</p>
          <button type="button" class="btn btn--primary btn--sm" onclick="app.closeHistoryModal();document.getElementById('menu').scrollIntoView();">${escapeHTML(this.t('myOrdersBrowse'))}</button>
        </div>`;
      return;
    }

    const statusInfo = s => {
      const norm = { baking: 'confirmed', delivered: 'completed' }[s] || s;
      const map = {
        sent: ['orderStatusSent', 'history-badge--pending'],
        pending: ['orderStatusPending', 'history-badge--pending'],
        confirmed: ['orderStatusConfirmed', 'history-badge--baking'],
        completed: ['orderStatusCompleted', 'history-badge--delivered'],
        cancelled: ['orderStatusCancelled', 'history-badge--cancelled'],
      };
      const [key, cls] = map[norm] || map.pending;
      return { label: this.t(key), cls };
    };

    listEl.innerHTML = orders.map(order => {
      const st = statusInfo(order.status);
      const totals = order.totals || { total: order.economy?.total || 0 };
      const items = order.items || [];
      const isExpanded = Boolean(this.historyDetailsOpen[order.id]);
      const itemName = it => it.name || it.nameSnapshot || it.productId;
      const ref = order.ref || ('#' + String(order.id).slice(-6).toUpperCase());
      const details = !isExpanded ? '' : `
        <div class="history-order-details">
          <div class="history-items-breakdown">
            ${items.map(it => `<div class="history-detail-row"><span>${escapeHTML(it.qty)} × ${escapeHTML(itemName(it))}</span><span>${escapeHTML(this.formatPrice((it.unitPriceUSD ?? it.usdSnapshot ?? 0) * (it.qty || 1)))}</span></div>`).join('')}
            ${order.fulfillmentAt ? `<div class="history-detail-row"><span>${escapeHTML(this.t('historyRequestedFor'))}</span><span>${escapeHTML(formatFulfillment(new Date(order.fulfillmentAt), this.lang))}</span></div>` : ''}
            ${order.note ? `<div class="history-detail-row"><span>${escapeHTML(this.t('orderNoteLabel'))}</span><span>${escapeHTML(order.note)}</span></div>` : ''}
            <div class="history-detail-row history-detail-row--total"><span>${escapeHTML(this.t('total'))}</span><span>${escapeHTML(this.formatPrice(totals.total || 0))}</span></div>
          </div>
        </div>`;
      return `
        <article class="history-order-card">
          <div class="history-order-header">
            <div class="history-order-meta">
              <span class="history-order-id">${escapeHTML(ref)}</span>
              <span class="history-order-date">${escapeHTML(fmtDate(order.createdAt))}</span>
            </div>
            <span class="history-badge ${st.cls}">${escapeHTML(st.label)}</span>
          </div>
          <div class="history-order-summary">
            <p class="history-order-items-preview">${escapeHTML(items.map(it => `${it.qty}× ${itemName(it)}`).join(', '))}</p>
            <div class="history-order-price">${escapeHTML(this.formatPrice(totals.total || 0))}</div>
          </div>
          <div class="history-order-actions">
            <button type="button" class="btn btn--xs btn--ghost" aria-expanded="${isExpanded}" onclick="app.toggleHistoryDetails(${jsArg(order.id)})">${escapeHTML(isExpanded ? this.t('myOrdersHideDetails') : this.t('myOrdersDetails'))}</button>
            <button type="button" class="btn btn--xs btn--primary" onclick="app.reorderItems(${jsArg(order.id)})">${escapeHTML(this.t('myOrdersReorder'))}</button>
          </div>
          ${details}
        </article>`;
    }).join('');
  },


  // Customer sign-in (Google). Loads Firebase Auth on first use.
  openAuthModal() {
    this.initSession(true);
    this.setAuthMessage('authMessage', '');
    this.openDialog('authModal');
  },

  openStaffLogin() {
    this.initSession(true);
    this.setAuthMessage('staffAuthMessage', '');
    this.closeDialog('authModal');
    this.openDialog('staffAuthModal');
  },

  closeStaffLogin() {
    this.closeDialog('staffAuthModal');
    if (window.location.hash === '#staff') history.replaceState(null, '', window.location.pathname + window.location.search);
  },

  setAuthMessage(id, message, type = 'error') {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = message || '';
    el.hidden = !message;
    el.dataset.type = type;
  },

  closeAuthModal() {
    this.closeDialog('authModal');
  },



  async handleGoogleLogin(target = 'customer') {
    const msgId = target === 'staff' ? 'staffAuthMessage' : 'authMessage';
    this.setAuthMessage(msgId, '');
    try {
      await signInWithGoogle();
      await this.initSession(true);
      await this.afterSignIn(target, msgId);
    } catch (err) {
      this.setAuthMessage(msgId, this.t('authErr_' + describeAuthError(err)));
    }
  },


  async afterSignIn(target, msgId) {
    const session = await refreshClaims().catch(() => null) || this.session;
    if (session) this.applySession(session);
    if (target === 'staff') {
      if (isPrivileged(session)) {
        this.closeStaffLogin();
        this.showToast(this.t('staffAccessGranted'), 'success');
        this.openPanelModal();
      } else {
        this.setAuthMessage(msgId, this.t('staffNoAccess'));
      }
      return;
    }
    this.closeAuthModal();
    this.showToast(this.t('loginSuccess'), 'success');
  },



  async handleStaffSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('staffEmail').value.trim();
    const password = document.getElementById('staffPassword').value;
    if (!email || !password) {
      this.setAuthMessage('staffAuthMessage', this.t('errFillFields'));
      return;
    }
    const btn = document.getElementById('btnStaffLogin');
    if (btn) btn.disabled = true;
    try {
      await signInWithEmail(email, password);
      document.getElementById('staffPassword').value = '';
      await this.initSession(true);
      await this.afterSignIn('staff', 'staffAuthMessage');
    } catch (err) {
      this.setAuthMessage('staffAuthMessage', this.t('authErr_' + describeAuthError(err)));
    } finally {
      if (btn) btn.disabled = false;
    }
  },


  async logout() {
    try {
      await signOutUser();
    } catch (e) {
      console.warn('Sign-out problem:', e && e.code);
    }
    this.closePanelModal(true);
    this.applySession(null);
    this.showToast(this.t('loggedOut'));
  },


  // Control Panel CMS Modal
  // Control Panel CMS Modal — only for sessions with privileged token claims.
  openPanelModal() {
    if (!isPrivileged(this.session)) {
      if (this.session) this.showToast(this.t('staffNoAccess'), 'error');
      else this.openStaffLogin();
      return;
    }
    const badge = document.getElementById('panelUserBadge');
    if (badge) {
      badge.textContent = this.t('role_' + this.session.role) || this.session.role;
      badge.className = `badge ${this.session.role === 'dev' ? 'badge--dev' : 'badge--admin'}`;
    }
    if (!canAccessTab(this.session, this.activePanelTab)) {
      this.activePanelTab = ['brand', 'products', 'customers', 'reviews', 'economy', 'theme', 'about', 'faq', 'contact', 'socials', 'fonts']
        .find(t => canAccessTab(this.session, t)) || 'brand';
    }
    this.renderPanelSidebar();
    this.renderPanelTab(this.activePanelTab);
    this.openDialog('panelModal');
  },


  openSubmitReviewModal() {
    const form = document.getElementById('reviewSubmitForm');
    const gate = document.getElementById('reviewSignInGate');
    const signedIn = Boolean(this.session);
    if (form) form.hidden = !signedIn;
    if (gate) gate.hidden = signedIn;
    this.setAuthMessage('reviewMessage', '');
    if (signedIn) {
      const nameEl = document.getElementById('custReviewName');
      if (nameEl && !nameEl.value) nameEl.value = (this.profile && this.profile.name) || this.session.name || '';
    } else {
      this.initSession(true);
    }
    this.openDialog('submitReviewModal');
  },

  
  closeSubmitReviewModal() {
    this.closeDialog('submitReviewModal');
  },


  // Reviews go to the moderation queue; nothing is shown publicly until staff approve it.
  async submitCustomerReview(e) {
    e.preventDefault();
    if (!this.session) {
      this.openSubmitReviewModal();
      return;
    }
    const nameEl = document.getElementById('custReviewName');
    const quoteEl = document.getElementById('custReviewQuote');
    const ratingEl = document.querySelector('input[name="reviewRating"]:checked');
    const name = nameEl.value.trim();
    const text = quoteEl.value.trim();
    if (!name || !text) {
      this.setAuthMessage('reviewMessage', this.t('errFillFields'));
      return;
    }
    const btn = document.getElementById('btnSubmitReview');
    if (btn) btn.disabled = true;
    this.setAuthMessage('reviewMessage', this.t('statusSaving'), 'info');
    try {
      await loadStore();
      await store.submitReview({ uid: this.session.uid, name, text, rating: ratingEl ? Number(ratingEl.value) : undefined, lang: this.lang });
      quoteEl.value = '';
      this.setAuthMessage('reviewMessage', '');
      this.closeSubmitReviewModal();
      this.showToast(this.t('reviewPending'), 'success');
    } catch (err) {
      const kind = describeDataError(err);
      this.setAuthMessage('reviewMessage', this.t(kind === 'offline' ? 'saveOffline' : (kind === 'denied' ? 'reviewDenied' : 'reviewFailed')));
    } finally {
      if (btn) btn.disabled = false;
    }
  },

  async signInForReview() {
    try {
      await signInWithGoogle();
      await this.initSession(true);
      const s = await refreshClaims().catch(() => null);
      if (s) this.applySession(s);
      this.openSubmitReviewModal();
    } catch (err) {
      this.setAuthMessage('reviewMessage', this.t('authErr_' + describeAuthError(err)));
    }
  },


  closePanelModal(silent = false) {
    if (this._draftEconomy) {
      this._draftEconomy = null;
      this.applyEconomy();
    }
    if (this.activePanelTab === 'theme') this.revertTheme();
    this.closeCustomerDrawer();
    this.closeDialog('panelModal');
    if (silent) {
      const content = document.getElementById('panelContent');
      if (content && !isPrivileged(this.session)) content.innerHTML = '';
    }
  },

  // ---------------------------------------------------------------- dialogs
  // Accessible dialogs: focus moves in, Tab is kept inside, Escape closes, focus returns to the trigger.
  openDialog(id, trigger = document.activeElement, { onEscape = null } = {}) {
    const el = document.getElementById(id);
    if (!el) return;
    this._dialogs = (this._dialogs || []).filter(d => d.id !== id);
    this._dialogs.push({ id, trigger, triggerId: trigger && trigger.id ? trigger.id : null, onEscape });
    el.classList.add('is-open');
    el.removeAttribute('aria-hidden');
    document.body.classList.add('has-dialog');
    requestAnimationFrame(() => {
      const target = el.querySelector('[data-autofocus]:not([hidden])') ||
        [...el.querySelectorAll(this.focusableSelector())].find(n => n.offsetParent !== null);
      if (target) target.focus();
      else {
        const win = el.querySelector('.modal-window') || el;
        win.setAttribute('tabindex', '-1');
        win.focus();
      }
    });
  },

  closeDialog(id) {
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove('is-open');
      el.setAttribute('aria-hidden', 'true');
    }
    const stack = this._dialogs || [];
    const entry = stack.find(d => d.id === id);
    this._dialogs = stack.filter(d => d.id !== id);
    if (!this._dialogs.length) document.body.classList.remove('has-dialog');
    if (entry) {
      // The trigger may have been re-rendered while the dialog was open; fall back to its id.
      const target = entry.trigger && document.contains(entry.trigger)
        ? entry.trigger
        : (entry.triggerId ? document.getElementById(entry.triggerId) : null);
      if (target && typeof target.focus === 'function') target.focus();
    }
  },

  focusableSelector() {
    return 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  },

  handleDialogKeys(e) {
    const stack = this._dialogs || [];
    if (!stack.length) return false;
    const top = stack[stack.length - 1];
    const el = document.getElementById(top.id);
    if (!el || !el.classList.contains('is-open')) {
      this._dialogs = stack.slice(0, -1);
      return false;
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      if (top.onEscape) top.onEscape();
      else this.closeDialogById(top.id);
      return true;
    }
    if (e.key === 'Tab') {
      const items = [...el.querySelectorAll(this.focusableSelector())].filter(n => n.offsetParent !== null);
      if (!items.length) { e.preventDefault(); return true; }
      const first = items[0];
      const last = items[items.length - 1];
      if (!el.contains(document.activeElement)) { e.preventDefault(); first.focus(); return true; }
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); return true; }
      if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); return true; }
    }
    return false;
  },

  // Close through the dialog's own close handler so it can clean up.
  closeDialogById(id) {
    const handlers = {
      authModal: () => this.closeAuthModal(),
      staffAuthModal: () => this.closeStaffLogin(),
      historyModal: () => this.closeHistoryModal(),
      panelModal: () => this.closePanelModal(),
      submitReviewModal: () => this.closeSubmitReviewModal(),
      customConfirmModal: () => this._confirmResolve && this._confirmResolve(false),
    };
    (handlers[id] || (() => this.closeDialog(id)))();
  },

  // Promise-based confirmation using the page's own dialog (replaces window.confirm).
  confirmDialog({ title, message, okLabel, cancelLabel, danger = false }) {
    const modal = document.getElementById('customConfirmModal');
    if (!modal) return Promise.resolve(window.confirm(message));
    document.getElementById('confirmTitle').textContent = title || this.t('confirmTitle');
    document.getElementById('confirmMessage').textContent = message || '';
    const ok = document.getElementById('confirmOkBtn');
    const cancel = document.getElementById('confirmCancelBtn');
    ok.textContent = okLabel || this.t('btnConfirm');
    cancel.textContent = cancelLabel || this.t('btnCancel');
    ok.classList.toggle('btn--danger', danger);
    return new Promise(resolve => {
      const done = value => {
        ok.onclick = null;
        cancel.onclick = null;
        this._confirmResolve = null;
        this.closeDialog('customConfirmModal');
        resolve(value);
      };
      this._confirmResolve = done;
      ok.onclick = () => done(true);
      cancel.onclick = () => done(false);
      this.openDialog('customConfirmModal');
    });
  },

  // Screen-reader announcement through the polite live region.
  announce(message) {
    const el = document.getElementById('srAnnouncer');
    if (!el) return;
    el.textContent = '';
    setTimeout(() => { el.textContent = message; }, 30);
  },


  panelTabs() {
    const I = (paths) => `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
    return [
      { id: 'brand', label: this.t('tabBrand'), icon: I('<path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.6-.7 1.6-1.7 0-.4-.2-.8-.4-1.1-.3-.3-.4-.7-.4-1.1a1.6 1.6 0 0 1 1.7-1.7h2c3 0 5.5-2.5 5.5-5.5C22 6 17.5 2 12 2z"/>') },
      { id: 'theme', label: this.t('tabTheme'), icon: I('<rect x="3" y="3" width="18" height="18" rx="4"/><rect x="7" y="7" width="5" height="5" rx="1"/><rect x="12" y="12" width="5" height="5" rx="1"/>') },
      { id: 'about', label: this.t('tabAbout'), icon: I('<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>') },
      { id: 'faq', label: this.t('tabFaq'), icon: I('<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>') },
      { id: 'reviews', label: this.t('tabReviews'), icon: I('<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>') },
      { id: 'contact', label: this.t('tabContact'), icon: I('<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>') },
      { id: 'socials', label: this.t('tabSocials'), icon: I('<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/>') },
      { id: 'products', label: this.t('tabProducts'), icon: I('<path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/><path d="M2 21h20"/><path d="M7 8v3"/><path d="M12 8v3"/><path d="M17 8v3"/>') },
      { id: 'customers', label: this.t('tabCustomers'), icon: I('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>') },
      { id: 'economy', label: this.t('tabEconomy'), icon: I('<circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/>') },
      { id: 'fonts', label: this.t('tabFonts'), icon: I('<polyline points="4 7 4 4 20 4 20 7"/><line x1="9" x2="15" y1="20" y2="20"/><line x1="12" x2="12" y1="4" y2="20"/>') },
      { id: 'users', label: this.t('tabUsers'), icon: I('<path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"/><circle cx="16.5" cy="7.5" r=".5" fill="currentColor" stroke="none"/>') },
      { id: 'data', label: this.t('tabData'), icon: I('<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/>') },
    ];
  },

  // Tabs shown here are a convenience; every write is still checked by firestore.rules.
  renderPanelSidebar() {
    const sidebar = document.getElementById('panelSidebar');
    if (!sidebar) return;
    const s = this.session;
    sidebar.setAttribute('role', 'tablist');
    sidebar.setAttribute('aria-orientation', 'vertical');
    sidebar.setAttribute('aria-label', this.t('panelTitle'));
    sidebar.innerHTML = this.panelTabs()
      .filter(tab => (tab.id === 'users' ? (s && (s.role === 'admin' || s.role === 'dev')) : canAccessTab(s, tab.id)))
      .map(tab => {
        const active = this.activePanelTab === tab.id;
        return `
        <button type="button" role="tab" id="panelTab-${tab.id}" aria-controls="panelContent" aria-selected="${active}" tabindex="${active ? 0 : -1}"
          class="panel-tab-btn ${active ? 'is-active' : ''}" onclick="app.switchPanelTab('${tab.id}')">
          <span>${tab.icon}</span>
          <span>${escapeHTML(tab.label)}</span>
        </button>`;
      }).join('');
    const content = document.getElementById('panelContent');
    if (content) {
      content.setAttribute('role', 'tabpanel');
      content.setAttribute('aria-labelledby', `panelTab-${this.activePanelTab}`);
    }
  },

  // Arrow-key navigation between panel tabs (WAI-ARIA tabs pattern).
  handlePanelTabKeys(e) {
    const tab = e.target.closest && e.target.closest('[role="tab"]');
    if (!tab || !['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
    const tabs = [...document.querySelectorAll('#panelSidebar [role="tab"]')];
    let i = tabs.indexOf(tab);
    if (e.key === 'Home') i = 0;
    else if (e.key === 'End') i = tabs.length - 1;
    else i = (i + (['ArrowDown', 'ArrowRight'].includes(e.key) ? 1 : -1) + tabs.length) % tabs.length;
    e.preventDefault();
    const id = tabs[i].id.replace('panelTab-', '');
    this.switchPanelTab(id);
    const next = document.getElementById('panelTab-' + id);
    if (next) next.focus();
  },


  switchPanelTab(tabId) {
    const s = this.session;
    const allowed = tabId === 'users' ? (s && (s.role === 'admin' || s.role === 'dev')) : canAccessTab(s, tabId);
    if (!allowed) return;
    if (this.activePanelTab === 'economy' && tabId !== 'economy' && this._draftEconomy) {
      this._draftEconomy = null;
      this.applyEconomy();
    }
    if (this.activePanelTab === 'theme' && tabId !== 'theme') this.revertTheme();
    this.activePanelTab = tabId;
    this.setPanelStatus('');
    this.renderPanelSidebar();
    this.renderPanelTab(tabId);
  },


  renderPanelTab(tabId) {
    const content = document.getElementById('panelContent');
    if (!content) return;

    const c = this.config;
    const isDev = Boolean(this.session && this.session.role === 'dev');

    switch (tabId) {
      case 'theme':
        this.renderThemeTab(content);
        break;

      case 'customers':
        this.renderCustomersTab(content);
        break;

      case 'brand':
        if (!this.draftLogo) this.initLogoDraft();
        content.innerHTML = `
          <h4 style="font-family:var(--font-serif);margin-bottom:16px;">Brand & Announcement</h4>
          <form onsubmit="app.saveBrandSettings(event)">
            <div id="logoEditorContainer">
              ${this.getLogoEditorHtml()}
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Shop Name (English)</label>
                <input type="text" id="cfgShopNameEn" class="form-input" value="${escapeHTML(c.shopName.en)}" required />
              </div>
              <div class="form-group">
                <label class="form-label">Shop Name (Kurdish)</label>
                <input type="text" id="cfgShopNameKu" class="form-input" value="${escapeHTML(c.shopName.ku || '')}" required />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Tagline (English)</label>
                <input type="text" id="cfgTaglineEn" class="form-input" value="${escapeHTML(c.tagline.en)}" required />
              </div>
              <div class="form-group">
                <label class="form-label">Tagline (Kurdish)</label>
                <input type="text" id="cfgTaglineKu" class="form-input" value="${escapeHTML(c.tagline.ku || '')}" required />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Announcement Bar (English)</label>
              <input type="text" id="cfgAnnounceEn" class="form-input" value="${escapeHTML(c.announcement.en)}" />
            </div>
            <div class="form-group">
              <label class="form-label">Announcement Bar (Kurdish)</label>
              <input type="text" id="cfgAnnounceKu" class="form-input" value="${escapeHTML((c.announcement.ku || ''))}" />
            </div>
            <button type="submit" class="btn btn--primary">Save Changes</button>
          </form>
        `;
        break;

      case 'about':
        content.innerHTML = `
          <h4 style="font-family:var(--font-serif);margin-bottom:16px;">Our Story & Heritage</h4>
          <form onsubmit="app.saveAboutSettings(event)">
            <div class="form-group">
              <label class="form-label">Image URL</label>
              <input type="text" id="cfgAboutImage" class="form-input" value="${escapeHTML(c.aboutUs.imageUrl || 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=900&auto=format&fit=crop&q=80')}" />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Eyebrow / Subtitle (EN)</label>
                <input type="text" id="cfgAboutEyebrowEn" class="form-input" value="${escapeHTML(c.aboutUs.eyebrowEn || 'Our Heritage')}" />
              </div>
              <div class="form-group">
                <label class="form-label">Eyebrow / Subtitle (KU)</label>
                <input type="text" id="cfgAboutEyebrowKu" class="form-input" value="${escapeHTML(c.aboutUs.eyebrowKu || 'کەلەپووری ئێمە')}" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Main Title (EN)</label>
                <input type="text" id="cfgAboutTitleEn" class="form-input" value="${escapeHTML(c.aboutUs.titleEn || 'Crafted with patience, baked with devotion')}" />
              </div>
              <div class="form-group">
                <label class="form-label">Main Title (KU)</label>
                <input type="text" id="cfgAboutTitleKu" class="form-input" value="${escapeHTML(c.aboutUs.titleKu || 'بە ئارامگرتن ئامادە کراوە، بە خۆشەویستی برژاوە')}" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Our Story Text (English)</label>
              <textarea id="cfgAboutEn" class="form-textarea" rows="5">${escapeHTML(c.aboutUs.en)}</textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Our Story Text (Kurdish)</label>
              <textarea id="cfgAboutKu" class="form-textarea" rows="5">${escapeHTML(c.aboutUs.ku || '')}</textarea>
            </div>
            <button type="submit" class="btn btn--primary">Save Changes</button>
          </form>
        `;
        break;

      case 'faq':
        const faqs = c.faq || [];
        content.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 16px;">
            <h4 style="font-family:var(--font-serif); margin:0;">FAQ Editor</h4>
            <button type="button" class="btn btn--primary btn--sm" onclick="app.addFaqItem()">+ Add Question</button>
          </div>
          <form onsubmit="app.saveFaqSettings(event)" id="faqForm">
            <div id="faqItemsContainer" style="display:flex; flex-direction:column; gap:16px;">
              ${faqs.map((f, i) => app.getFaqItemHtml(f, i)).join('')}
            </div>
            <button type="submit" class="btn btn--primary" style="margin-top: 24px; width: 100%;">${this.t('btnSaveConfig') || 'Save FAQ'}</button>
          </form>
        `;
        break;

      case 'reviews': {
        const reviews = c.reviews || [];
        content.innerHTML = `
          ${this.reviewModerationHtml()}
          <div class="panel-tab-head">
            <h4 class="panel-tab-title">${escapeHTML(this.t('reviewsCuratedTitle'))}</h4>
            <div class="panel-tab-tools">
              <button type="button" class="btn btn--ghost btn--sm" onclick="app.resetReviews()">↺ ${escapeHTML(this.t('reviewsResetBtn'))}</button>
              <button type="button" class="btn btn--primary btn--sm" onclick="app.addReviewItem()">+ ${escapeHTML(this.t('reviewsAddBtn'))}</button>
            </div>
          </div>
          <p class="panel-hint">${escapeHTML(this.t('reviewsCuratedHint'))}</p>
          <form onsubmit="app.saveReviewSettings(event)" id="reviewForm">
            <div id="reviewItemsContainer" class="editor-list">
              ${reviews.map((r, i) => app.getReviewItemHtml(r, i)).join('')}
            </div>
            <button type="submit" class="btn btn--primary btn--block">${escapeHTML(this.t('btnSaveConfig'))}</button>
          </form>
        `;
        break;
      }

      case 'contact':
        content.innerHTML = `
          <h4 style="font-family:var(--font-serif);margin-bottom:16px;">Contact & Kitchen Information</h4>
          <form onsubmit="app.saveContactSettings(event)">
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">WhatsApp Number (digits only, no +)</label>
                <input type="text" id="cfgWhatsapp" class="form-input" value="${escapeHTML(c.contact.whatsapp)}" required />
              </div>
              <div class="form-group">
                <label class="form-label">Display Phone</label>
                <input type="text" id="cfgPhone" class="form-input" value="${escapeHTML(c.contact.phone)}" required />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Email</label>
              <input type="email" id="cfgEmail" class="form-input" value="${escapeHTML(c.contact.email)}" required />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Kitchen Address (English)</label>
                <textarea id="cfgAddressEn" class="form-textarea">${escapeHTML(c.contact.address.en)}</textarea>
              </div>
              <div class="form-group">
                <label class="form-label">Kitchen Address (Kurdish)</label>
                <textarea id="cfgAddressKu" class="form-textarea">${escapeHTML(c.contact.address.ku || '')}</textarea>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Opening Hours (English)</label>
                <textarea id="cfgHoursEn" class="form-textarea">${escapeHTML(c.contact.hours.en)}</textarea>
              </div>
              <div class="form-group">
                <label class="form-label">Opening Hours (Kurdish)</label>
                <textarea id="cfgHoursKu" class="form-textarea">${escapeHTML(c.contact.hours.ku || '')}</textarea>
              </div>
            </div>
            <button type="submit" class="btn btn--primary">Save Changes</button>
          </form>
        `;
        break;

      case 'socials':
        content.innerHTML = `
          <h4 style="font-family:var(--font-serif);margin-bottom:6px;">Social Media URLs</h4>
          <p style="font-size:0.8rem;color:var(--muted);margin:0 0 16px 0;">Leave a field empty to hide its icon in the footer.</p>
          <form onsubmit="app.saveSocialSettings(event)">
            <div class="form-group">
              <label class="form-label">Instagram URL</label>
              <input type="url" id="cfgInsta" class="form-input" value="${escapeHTML(c.socials.instagram)}" />
            </div>
            <div class="form-group">
              <label class="form-label">Facebook URL</label>
              <input type="url" id="cfgFb" class="form-input" value="${escapeHTML(c.socials.facebook)}" />
            </div>
            <div class="form-group">
              <label class="form-label">TikTok URL</label>
              <input type="url" id="cfgTiktok" class="form-input" value="${escapeHTML(c.socials.tiktok)}" />
            </div>
            <div class="form-group">
              <label class="form-label">Snapchat URL</label>
              <input type="url" id="cfgSnap" class="form-input" dir="ltr" value="${this.esc(c.socials.snapchat || '')}" />
            </div>
            <button type="submit" class="btn btn--primary">Save Changes</button>
          </form>
        `;
        break;

      case 'products':
        if (!this.selectedProductId || !this.products.some(p => p.id === this.selectedProductId)) {
          this.selectedProductId = this.products.length > 0 ? this.products[0].id : null;
        }
        const activeProd = this.products.find(p => p.id === this.selectedProductId);
        this.pendingImageData = activeProd ? (activeProd.img || '') : '';

        content.innerHTML = `
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;gap:12px;flex-wrap:wrap;">
            <div>
              <h4 style="font-family:var(--font-serif);margin:0 0 4px 0;">Product Catalogue (${this.products.length})</h4>
              <p style="font-size:0.82rem;color:var(--muted);margin:0;">Manage pricing, bilingual names, descriptions, and photo gallery.</p>
            </div>
            <button type="button" class="btn btn--primary btn--sm" onclick="app.addNewProduct()">
              ${this.t('btnAddNewProduct')}
            </button>
          </div>
          <div class="form-group" style="margin-bottom:18px;">
            <label class="form-label" for="prodSelect">Select product to edit:</label>
            <select class="form-select" id="prodSelect" onchange="app.selectProductForEditing(this.value)">
              ${this.products.map(p => `
                <option value="${escapeHTML(p.id)}" ${p.id === this.selectedProductId ? 'selected' : ''}>
                  ${escapeHTML(p.emoji || '🎂')} ${escapeHTML(p.name.en)} ($${escapeHTML(p.priceUSD)}) ${p.img ? '📷' : ''}
                </option>
              `).join('')}
            </select>
          </div>
          <div id="productEditorArea">
            <!-- Injected by renderProductEditor -->
          </div>
        `;
        this.renderProductEditor();
        break;

      case 'fonts': {
        if (!canAccessTab(this.session, 'fonts')) {
          content.innerHTML = `<p class="panel-hint">${escapeHTML(this.t('usersNoAccess'))}</p>`;
          break;
        }
        const fontOptions = (options, selected) => options
          .map(f => `<option value="${escapeHTML(f.value)}" ${selected === f.value ? 'selected' : ''}>${escapeHTML(f.label)}</option>`)
          .join('');

        const kuBody = c.kurdishBodyFont || 'Vazirmatn';
        const kuDisp = c.kurdishDisplayFont || 'Vazirmatn';
        const enBody = c.englishBodyFont || 'DM Sans';
        const enDisp = c.englishDisplayFont || 'Cormorant Garamond';

        content.innerHTML = `
          <h4 style="font-family:var(--font-serif);margin-bottom:16px;">${this.t('tabFonts')}</h4>
          <form onsubmit="app.saveFontSettings(event)">
            <div style="font-size:0.9rem;font-weight:600;color:var(--berry);margin-bottom:8px;">Kurdish / Arabic Typography (RTL)</div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="cfgKuBody">${this.t('fieldKurdishBody')}</label>
                <select id="cfgKuBody" class="form-select" onchange="app.handleFontPreviewChange()">
                  ${fontOptions(FONT_OPTIONS, kuBody)}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" for="cfgKuDisplay">${this.t('fieldKurdishDisplay')}</label>
                <select id="cfgKuDisplay" class="form-select" onchange="app.handleFontPreviewChange()">
                  ${fontOptions(FONT_OPTIONS, kuDisp)}
                </select>
              </div>
            </div>

            <div style="font-size:0.9rem;font-weight:600;color:var(--berry);margin-top:16px;margin-bottom:8px;">English / Latin Typography (LTR)</div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="cfgEnBody">${this.t('fieldEnglishBody')}</label>
                <select id="cfgEnBody" class="form-select" onchange="app.handleFontPreviewChange()">
                  ${fontOptions(FONT_OPTIONS_EN, enBody)}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" for="cfgEnDisplay">${this.t('fieldEnglishDisplay')}</label>
                <select id="cfgEnDisplay" class="form-select" onchange="app.handleFontPreviewChange()">
                  ${fontOptions(FONT_OPTIONS_EN, enDisp)}
                </select>
              </div>
            </div>

            <div id="fontPreviewMount">
              <div id="fontPreviewFrame" class="font-preview-frame" style="margin-top:24px;padding:24px;background:var(--shell);border-radius:16px;border:1px solid var(--line);direction:rtl;text-align:right;">
                <div style="font-size:.72rem;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);margin-bottom:14px">${this.t('fontPreview')} (کوردی)</div>
                <h4 id="fontPreviewHeading" style="font-size:1.6rem;margin-bottom:10px;font-family:'${escapeHTML(kuDisp)}',serif;">کێکی تایبەت بۆ ئاهەنگەکەت</h4>
                <p id="fontPreviewBody" style="font-size:.95rem;color:var(--muted);line-height:1.9;font-family:'${escapeHTML(kuBody)}',sans-serif;">
                  کێک و کاپکێک و شیرینی بە بچووکی لە چێشتخانەکەی خۆمان بە دەست دروست دەکرێن — بە کەرەی ڕاستەقینە و ڤانیلای ڕاستەقینە.
                </p>
              </div>

              <div id="fontPreviewFrameEn" class="font-preview-frame" style="margin-top:16px;padding:24px;background:var(--shell);border-radius:16px;border:1px solid var(--line);direction:ltr;text-align:left;">
                <div style="font-size:.72rem;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);margin-bottom:14px">${this.t('fontPreview')} (English)</div>
                <h4 id="fontPreviewHeadingEn" style="font-size:1.6rem;margin-bottom:10px;font-family:'${escapeHTML(enDisp)}',serif;">Bespoke Celebration Cakes</h4>
                <p id="fontPreviewBodyEn" style="font-size:.95rem;color:var(--muted);line-height:1.6;font-family:'${escapeHTML(enBody)}',sans-serif;">
                  Handcrafted layered cakes, cupcakes, and French desserts baked fresh daily with organic butter, bourbon vanilla, and seasonal fruit.
                </p>
              </div>
            </div>

            <div style="margin-top:20px;display:flex;align-items:center;gap:12px;">
              <button class="btn btn--primary btn--sm" type="submit">${this.t('saveFonts')}</button>
            </div>
            <div style="font-size:0.8rem;color:var(--muted);margin-top:10px;">
              Font selections preview live immediately; click save to persist your preferences.
            </div>
          </form>
        `;
        this.addPhonePreviewToggle(document.getElementById('fontPreviewMount'), { frameId: 'fontPreviewFrame', mountId: 'fontPreviewMount' });
        break;
      }

      case 'economy':
        const eco = this.config.economy || DEFAULT_ECONOMY;
        const lastUpdatedDateStr = eco.lastUpdatedRate ? new Date(eco.lastUpdatedRate).toLocaleDateString() : '';
        content.innerHTML = `
          <div style="margin-bottom:20px;">
            <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
              <div>
                <h4 style="font-family:var(--font-serif);margin:0 0 4px 0;">${this.t('economyTitle')}</h4>
                <p style="font-size:0.86rem;color:var(--muted);margin:0;">${this.t('economyDesc')}</p>
              </div>
              <div style="display:flex;align-items:center;gap:8px;">
                <span id="rateTimestampBadge" style="font-size:0.75rem;color:var(--muted);">
                  ${lastUpdatedDateStr ? `Rate updated: <span id="lastUpdatedRateText">${escapeHTML(lastUpdatedDateStr)}</span>` : ''}
                </span>
              </div>
            </div>
          </div>

          <div class="economy-panel-layout">
            <!-- Form Column -->
            <form id="economySettingsForm" onsubmit="app.saveEconomySettings(event)" oninput="app.handleEconomyInput(event)" onchange="app.handleEconomyInput(event)" style="display:flex;flex-direction:column;gap:14px;">
              
              <!-- 1. Currencies -->
              <details class="economy-accordion" id="ecoAccordionCurrencies" open>
                <summary class="economy-accordion__summary">
                  <div class="economy-accordion__header-row">
                    <h5 class="economy-accordion__title">
                      <span>🌐</span> <span>${this.t('economyCurrencies')}</span>
                      <span class="badge badge--admin economy-mobile-role-badge" style="display:none;font-size:0.68rem;padding:2px 6px;">${escapeHTML(this.t('role_' + (this.session?.role || 'admin')))}</span>
                    </h5>
                    <span class="economy-accordion__chevron">▼</span>
                  </div>
                  <span class="economy-accordion__subtext" id="ecoCurrenciesSummary">Loading...</span>
                </summary>
                <div class="economy-accordion__body">
                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label" for="cfgPrimaryCurrency">${this.t('fieldPrimaryCurrency')}</label>
                      <input type="text" id="cfgPrimaryCurrency" class="form-input" value="USD ($)" disabled style="background:var(--shell);cursor:not-allowed;" />
                      <span style="font-size:0.75rem;color:var(--muted);margin-top:2px;">Base currency for all products</span>
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="cfgSecondaryCurrency">${this.t('fieldSecondaryCurrency')}</label>
                      <select id="cfgSecondaryCurrency" class="form-select">
                        <option value="IQD" ${eco.secondaryCurrency === 'IQD' ? 'selected' : ''}>IQD — Iraqi Dinar</option>
                        <option value="EUR" ${eco.secondaryCurrency === 'EUR' ? 'selected' : ''}>EUR — Euro</option>
                        <option value="TRY" ${eco.secondaryCurrency === 'TRY' ? 'selected' : ''}>TRY — Turkish Lira</option>
                        <option value="AED" ${eco.secondaryCurrency === 'AED' ? 'selected' : ''}>AED — UAE Dirham</option>
                        <option value="None" ${eco.secondaryCurrency === 'None' ? 'selected' : ''}>None (USD Only)</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-row" style="align-items:center;">
                    <div class="form-group">
                      <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-weight:600;font-size:0.88rem;">
                        <input type="checkbox" id="cfgShowSecondary" ${eco.showSecondary !== false ? 'checked' : ''} />
                        <span>${this.t('fieldShowSecondary')}</span>
                      </label>
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="cfgCurrencySymbol">${this.t('fieldCurrencySymbol')}</label>
                      <input type="text" id="cfgCurrencySymbol" class="form-input" value="${escapeHTML((eco.currencySymbol || 'د.ع'))}" maxlength="8" />
                    </div>
                  </div>
                </div>
              </details>

              <!-- 2. Exchange Rate -->
              <details class="economy-accordion" id="ecoAccordionExchange" open>
                <summary class="economy-accordion__summary">
                  <div class="economy-accordion__header-row">
                    <h5 class="economy-accordion__title">
                      <span>💱</span> <span>${this.t('economyExchange')}</span>
                    </h5>
                    <span class="economy-accordion__chevron">▼</span>
                  </div>
                  <span class="economy-accordion__subtext" id="ecoExchangeSummary">Loading...</span>
                </summary>
                <div class="economy-accordion__body">
                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label" for="cfgExchangeRate">${this.t('fieldExchangeRate')}</label>
                      <input type="number" id="cfgExchangeRate" class="form-input" value="${escapeHTML(eco.exchangeRate || 1310)}" min="1" step="1" inputmode="numeric" required />
                      <span style="font-size:0.75rem;color:var(--muted);margin-top:2px;">1 USD = X in secondary currency</span>
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="cfgRoundingRule">${this.t('fieldRoundingRule')}</label>
                      <select id="cfgRoundingRule" class="form-select">
                        <option value="250" ${parseInt(eco.roundingRule, 10) === 250 ? 'selected' : ''}>${this.t('roundNearest250')}</option>
                        <option value="500" ${parseInt(eco.roundingRule, 10) === 500 ? 'selected' : ''}>${this.t('roundNearest500')}</option>
                        <option value="1000" ${parseInt(eco.roundingRule, 10) === 1000 ? 'selected' : ''}>${this.t('roundNearest1000')}</option>
                        <option value="1" ${parseInt(eco.roundingRule, 10) === 1 ? 'selected' : ''}>${this.t('roundNearest1')}</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-row" style="align-items:center;">
                    <div class="form-group">
                      <label style="display:flex;align-items:center;gap:10px;cursor:not-allowed;font-size:0.88rem;color:var(--muted);">
                        <input type="checkbox" id="cfgAutoRefresh" disabled />
                        <span>${this.t('fieldAutoRefresh')}</span>
                      </label>
                    </div>
                  </div>
                </div>
              </details>

              <!-- 3. Delivery -->
              <details class="economy-accordion" id="ecoAccordionDelivery">
                <summary class="economy-accordion__summary">
                  <div class="economy-accordion__header-row">
                    <h5 class="economy-accordion__title">
                      <span>🚚</span> <span>${this.t('economyDelivery')}</span>
                    </h5>
                    <span class="economy-accordion__chevron">▼</span>
                  </div>
                  <span class="economy-accordion__subtext" id="ecoDeliverySummary">Loading...</span>
                </summary>
                <div class="economy-accordion__body">
                  <div class="form-row--3">
                    <div class="form-group">
                      <label class="form-label" for="cfgDeliveryFee">${this.t('fieldDeliveryFee')}</label>
                      <input type="number" id="cfgDeliveryFee" class="form-input" value="${escapeHTML(eco.deliveryFee ?? 8)}" min="0" step="0.5" inputmode="decimal" required />
                      <span id="deliveryZeroNote" style="display:none;font-size:0.76rem;color:#16a34a;font-weight:600;margin-top:3px;">${this.t('deliveryFreeForEveryone')}</span>
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="cfgFreeDeliveryOver">${this.t('fieldFreeDeliveryOver')}</label>
                      <input type="number" id="cfgFreeDeliveryOver" class="form-input" value="${escapeHTML(eco.freeDeliveryOver ?? 60)}" min="0" step="1" inputmode="numeric" required />
                      <span style="font-size:0.75rem;color:var(--muted);margin-top:3px;">0 = all-order free delivery</span>
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="cfgMinimumOrder">${this.t('fieldMinimumOrder')}</label>
                      <input type="number" id="cfgMinimumOrder" class="form-input" value="${escapeHTML(eco.minimumOrder ?? 0)}" min="0" step="1" inputmode="numeric" required />
                      <span style="font-size:0.75rem;color:var(--muted);margin-top:3px;">0 = no minimum order</span>
                    </div>
                  </div>

                  <!-- Inline Amber Warning if Free Delivery is lower than Min Order -->
                  <div id="freeDeliveryWarn" class="eco-warning-box" style="display:none;" role="alert" aria-live="polite">
                    <span>⚠️</span> <span>${this.t('freeDeliveryWarning')}</span>
                  </div>

                  <div style="padding-top:4px;">
                    <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-weight:600;font-size:0.88rem;">
                      <input type="checkbox" id="cfgPickupOnly" ${eco.pickupOnly ? 'checked' : ''} />
                      <span>${this.t('fieldPickupOnly')}</span>
                    </label>
                  </div>
                </div>
              </details>

              <!-- 4. Tax -->
              <details class="economy-accordion" id="ecoAccordionTax">
                <summary class="economy-accordion__summary">
                  <div class="economy-accordion__header-row">
                    <h5 class="economy-accordion__title">
                      <span>🧾</span> <span>${this.t('economyTax')}</span>
                    </h5>
                    <span class="economy-accordion__chevron">▼</span>
                  </div>
                  <span class="economy-accordion__subtext" id="ecoTaxSummary">Loading...</span>
                </summary>
                <div class="economy-accordion__body">
                  <div class="form-row">
                    <div class="form-group" style="display:flex;align-items:center;padding-top:20px;">
                      <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-weight:600;font-size:0.88rem;">
                        <input type="checkbox" id="cfgTaxEnabled" ${eco.taxEnabled ? 'checked' : ''} />
                        <span>${this.t('fieldTaxEnabled')}</span>
                      </label>
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="cfgTaxRate">${this.t('fieldTaxRate')}</label>
                      <input type="number" id="cfgTaxRate" class="form-input" value="${escapeHTML(eco.taxRate ?? 0)}" min="0" max="30" step="0.1" inputmode="decimal" />
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label" for="cfgTaxLabel">${this.t('fieldTaxLabel')}</label>
                      <input type="text" id="cfgTaxLabel" class="form-input" value="${escapeHTML((eco.taxLabel || 'VAT'))}" maxlength="15" />
                    </div>
                    <div class="form-group" style="display:flex;align-items:center;padding-top:24px;">
                      <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-size:0.88rem;">
                        <input type="checkbox" id="cfgTaxIncluded" ${eco.taxIncluded !== false ? 'checked' : ''} />
                        <span>${this.t('fieldTaxIncluded')}</span>
                      </label>
                    </div>
                  </div>
                </div>
              </details>

              <!-- 5. Discounts -->
              <details class="economy-accordion" id="ecoAccordionDiscounts">
                <summary class="economy-accordion__summary">
                  <div class="economy-accordion__header-row">
                    <h5 class="economy-accordion__title">
                      <span>🎟️</span> <span>${this.t('economyDiscounts')}</span>
                    </h5>
                    <span class="economy-accordion__chevron">▼</span>
                  </div>
                  <span class="economy-accordion__subtext" id="ecoDiscountsSummary">Loading...</span>
                </summary>
                <div class="economy-accordion__body">
                  <div class="form-row">
                    <div class="form-group">
                      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">
                        <label class="form-label" for="cfgPromoCode" style="margin-bottom:0;">${this.t('fieldPromoCode')}</label>
                        <span id="promoValidityBadge" class="promo-pill" style="display:none;"></span>
                      </div>
                      <input type="text" id="cfgPromoCode" class="form-input" value="${escapeHTML((eco.promoCode || ''))}" placeholder="e.g. YUMMY10" maxlength="20" style="text-transform:uppercase;" />
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="cfgPromoType">${this.t('fieldPromoType')}</label>
                      <select id="cfgPromoType" class="form-select">
                        <option value="percent" ${eco.promoType === 'percent' ? 'selected' : ''}>${this.t('promoPercent')}</option>
                        <option value="fixed" ${eco.promoType === 'fixed' ? 'selected' : ''}>${this.t('promoFixed')}</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label" for="cfgPromoValue">${this.t('fieldPromoValue')}</label>
                      <input type="number" id="cfgPromoValue" class="form-input" value="${escapeHTML(eco.promoValue ?? 0)}" min="0" step="1" inputmode="decimal" />
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="cfgPromoExpiry">${this.t('fieldPromoExpiry')}</label>
                      <input type="date" id="cfgPromoExpiry" class="form-input" value="${escapeHTML(eco.promoExpiry || '')}" />
                    </div>
                  </div>
                </div>
              </details>

              <!-- Sticky Save Footer Bar -->
              <div class="economy-sticky-footer">
                <button type="submit" id="btnSaveEconomy" class="btn btn--primary btn-save-economy" disabled aria-label="Save economy settings">${this.t('saveEconomy')}</button>
              </div>
            </form>

            <!-- Live Preview Card Column -->
            <div class="economy-preview-container" id="economyLivePreviewContainer" role="region" aria-label="Live preview">
              <div class="economy-preview-sticky is-collapsed" id="economyPreviewStickyCard">
                <div class="economy-preview-heading" onclick="app.toggleMobilePreviewExpand()" role="button" tabindex="0" aria-label="Toggle preview breakdown">
                  <div style="display:flex;align-items:center;gap:8px;">
                    <span>⚡</span> <span>${this.t('economyPreview')}</span>
                  </div>
                  <div style="display:flex;align-items:center;gap:8px;">
                    <span id="mobilePreviewSummaryText" style="font-size:0.95rem;font-weight:700;color:var(--berry);"></span>
                    <span class="economy-preview-chevron" id="previewChevron">▲</span>
                  </div>
                </div>
                <p class="economy-preview-sample-note" style="font-size:0.8rem;color:var(--muted);margin:0 0 14px 0;">${this.t('economyPreviewSample')}</p>
                <div id="economyLivePreviewCard" class="economy-preview-box"></div>
              </div>
            </div>
          </div>
        `;
        this.updateEconomyPreview();
        break;

      case 'users':
        this.renderUsersTab(content);
        break;

      case 'data':
        if (!isDev) return;
        // Backups contain the public shop content only — never accounts or customer data.
        const backupData = {
          config: this.config,
          products: this.products
        };
        content.innerHTML = `
          <h4 style="font-family:var(--font-serif);margin-bottom:16px;">Backup, Import & Factory Reset</h4>
          <div class="form-group">
            <label class="form-label">Export / Import Shop State (JSON)</label>
            <textarea id="dataJsonBox" class="form-textarea" style="font-family:monospace;font-size:0.8rem;min-height:160px;">${escapeHTML(JSON.stringify(backupData, null, 2))}</textarea>
          </div>
          <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:24px;">
            <button type="button" class="btn btn--primary" onclick="app.importJsonData()">Import JSON Backup</button>
            <button type="button" class="btn btn--ghost" onclick="app.copyJsonData()">Copy JSON to Clipboard</button>
          </div>
          <div style="border-top:1px solid var(--line);padding-top:20px;margin-bottom:20px;">
            <h5 style="font-family:var(--font-serif);font-size:1rem;margin-bottom:8px;">Developer Flags</h5>
            <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-weight:600;font-size:0.88rem;">
              <input type="checkbox" id="cfgWatermark" ${this.config.showWatermark !== false ? 'checked' : ''} onchange="app.toggleWatermarkSetting(this.checked)" />
              <span>Show watermark pill ("developed with respect and love by null-tech")</span>
            </label>
          </div>
          <div style="border-top:1px solid var(--line);padding-top:20px;">
            <h5 class="danger-title">${escapeHTML(this.t('resetDeviceTitle'))}</h5>
            <p class="panel-hint">${escapeHTML(this.t('resetDeviceHint'))}</p>
            <button type="button" class="btn btn--ghost btn--danger-outline" onclick="app.factoryReset()">${escapeHTML(this.t('resetDeviceBtn'))}</button>
          </div>
        `;
        break;
    }
  },
  // Customer reviews waiting for a decision, newest first.
  reviewModerationHtml() {
    const all = this.allReviews || [];
    const pending = all.filter(r => r.status === 'pending');
    const decided = all.filter(r => r.status !== 'pending').slice(0, 20);
    const locale = this.lang === 'ku' ? 'ckb' : 'en-GB';
    const card = r => `
      <article class="moderation-card" data-status="${escapeHTML(r.status)}">
        <header class="moderation-card__head">
          <strong>${escapeHTML(r.name)}</strong>
          <span class="text-small panel-muted">${escapeHTML(r.createdAt ? new Date(r.createdAt).toLocaleString(locale) : '')}</span>
          ${Number.isInteger(r.rating) ? `<span class="stars" aria-label="${escapeHTML(this.t('reviewStarsLabel').replace('{n}', r.rating))}">${'★'.repeat(r.rating)}</span>` : ''}
        </header>
        <p class="moderation-card__text">${escapeHTML(r.text)}</p>
        <div class="moderation-card__actions">
          ${r.status !== 'approved' ? `<button type="button" class="btn btn--primary btn--xs" onclick="app.moderate(${jsArg(r.id)}, 'approved')">${escapeHTML(this.t('reviewApprove'))}</button>` : ''}
          ${r.status !== 'rejected' ? `<button type="button" class="btn btn--ghost btn--xs" onclick="app.moderate(${jsArg(r.id)}, 'rejected')">${escapeHTML(this.t(r.status === 'approved' ? 'reviewUnpublish' : 'reviewReject'))}</button>` : ''}
          <button type="button" class="btn btn--ghost btn--xs user-delete-btn" onclick="app.removeModeratedReview(${jsArg(r.id)})">${escapeHTML(this.t('usersDelete'))}</button>
        </div>
      </article>`;
    return `
      <section class="moderation" aria-labelledby="moderationTitle">
        <h4 class="panel-tab-title" id="moderationTitle">${escapeHTML(this.t('reviewsPendingTitle'))} (${pending.length})</h4>
        ${pending.length ? pending.map(card).join('') : `<p class="panel-hint">${escapeHTML(this.t('reviewsPendingEmpty'))}</p>`}
        ${decided.length ? `<details class="moderation-history"><summary>${escapeHTML(this.t('reviewsDecidedTitle'))} (${decided.length})</summary>${decided.map(card).join('')}</details>` : ''}
      </section>`;
  },

  async moderate(id, status) {
    await this.runWrite(() => store.moderateReview(id, status, this.session?.uid), {
      successMsg: status === 'approved' ? this.t('reviewApproved') : this.t('reviewRejected'),
    });
  },

  async removeModeratedReview(id) {
    const ok = await this.confirmDialog({ title: this.t('usersDelete'), message: this.t('reviewDeleteConfirm'), okLabel: this.t('usersDelete'), danger: true });
    if (!ok) return;
    await this.runWrite(() => store.deleteReview(id), { successMsg: this.t('toastDeleted') });
  },


  // Theme System (Section 7.16)
  renderThemeTab(content) {
    if (!content) return;
    
    // Check current preset
    const currentPreset = this.config.theme ? this.config.theme.presetId : 'berry';
    const currentMode = this.config.theme ? (this.config.theme.mode || 'light') : 'light';
    
    let presetsHtml = '';
    Object.keys(THEMES).forEach(id => {
      const theme = THEMES[id];
      const t = theme.tokens;
      const isActive = id === currentPreset;
      
      presetsHtml += `
        <div class="theme-preset-card ${isActive ? 'active' : ''}" onclick="app.previewTheme(${jsArg(id)})">
          <div style="font-weight:600;font-size:0.95rem;color:var(--ink);">${escapeHTML(theme.label[this.lang])}</div>
          <div class="theme-swatches">
            <div class="theme-swatch" style="background:${escapeHTML(t.cream)}"></div>
            <div class="theme-swatch" style="background:${escapeHTML(t.berry)}"></div>
            <div class="theme-swatch" style="background:${escapeHTML(t.ink)}"></div>
            <div class="theme-swatch" style="background:${escapeHTML(t.gold)}"></div>
            <div class="theme-swatch" style="background:${escapeHTML(t.blush)}"></div>
          </div>
        </div>
      `;
    });

    content.innerHTML = `
      <div class="theme-panel-layout">
        <div>
          <div style="margin-bottom: 20px;">
            <div style="font-size:0.85rem;font-weight:600;color:var(--muted);margin-bottom:8px;">Appearance Mode</div>
            <div class="switch-group" style="display:inline-flex;">
              <button type="button" class="switch-btn ${currentMode !== 'dark' ? 'is-active' : ''}" onclick="app.setThemeMode('light')">☀️ Light</button>
              <button type="button" class="switch-btn ${currentMode === 'dark' ? 'is-active' : ''}" onclick="app.setThemeMode('dark')">🌙 Dark</button>
            </div>
          </div>

          <h4 style="font-family:var(--font-serif);margin-bottom:16px;">${this.t('themePresetTitle')}</h4>
          <div class="theme-presets" style="margin-bottom:24px;">
            ${presetsHtml}
          </div>
          <div style="margin-bottom: 24px;">
            <label style="display:flex;align-items:center;gap:10px;font-size:0.9rem;font-weight:600;color:var(--cocoa);cursor:pointer;">
              <input type="checkbox" id="cfgAutoDark" onchange="app.toggleAutoDark(this.checked)" ${this.config.theme && this.config.theme.autoDark ? 'checked' : ''} style="width:18px;height:18px;">
              ${this.t('themeAutoDark')}
            </label>
          </div>
          <button type="button" class="btn btn--primary" onclick="app.saveTheme()">
            ${this.t('themeSave')}
          </button>
        </div>
        <div>
          <h4 style="font-family:var(--font-serif);margin-bottom:16px;">${this.t('themePreviewTitle')}</h4>
          <div id="themePreviewMount">
          <div id="themePreviewCard" class="theme-preview-card" style="margin-bottom:16px;">
            <h3>${this.t('themePreviewHeading')}</h3>
            <p>${this.t('themePreviewBody')}</p>
            <div class="theme-preview-buttons">
              <div class="btn btn--primary" onclick="app.showToast(this.innerText, 'info')" style="font-size:0.85rem;padding:6px 12px;cursor:pointer;">${this.t('themePreviewPrimary')}</div>
              <div class="btn btn--ghost" onclick="app.showToast(this.innerText, 'info')" style="font-size:0.85rem;padding:6px 12px;cursor:pointer;">${this.t('themePreviewGhost')}</div>
            </div>
            <div class="theme-preview-gold">${this.t('themePreviewGold')}</div>
            <div class="theme-preview-price">${this.t('themePreviewPrice')}</div>
          </div>
          </div>
        </div>
      </div>
    `;
    this.addPhonePreviewToggle(document.getElementById('themePreviewMount'), { frameId: 'themePreviewCard', mountId: 'themePreviewMount' });
  },

  previewTheme(presetId) {
    if (!THEMES[presetId]) return;
    
    // Apply live
    this.applyTheme(THEMES[presetId].tokens);
    
    // Update active class on preset cards
    const cards = document.querySelectorAll('.theme-preset-card');
    cards.forEach(card => card.classList.remove('active'));
    
    // Find the clicked card by label and make it active
    const themeName = THEMES[presetId].label[this.lang];
    cards.forEach(card => {
      if (card.querySelector('div').textContent === themeName) {
        card.classList.add('active');
      }
    });
    
    // Store preview state temporarily
    this._previewThemeId = presetId;
  },

  async saveTheme() {
    const presetId = this._previewThemeId || (this.config.theme ? this.config.theme.presetId : 'berry');
    if (!THEMES[presetId]) return;
    const autoDark = document.getElementById('cfgAutoDark') ? document.getElementById('cfgAutoDark').checked : Boolean(this.config.theme && this.config.theme.autoDark);
    const mode = (this.config.theme && this.config.theme.mode) || 'light';
    const ok = await this.commitConfig('theme', c => {
      c.theme = { presetId, tokens: THEMES[presetId].tokens, mode, autoDark };
      return null;
    }, { quiet: true });
    if (ok) {
      this._previewThemeId = null;
      this.applyTheme(this.config.theme.tokens);
      this.showToast(this.t('themeApplied'), 'success');
      this.renderThemeTab(document.getElementById('panelContent'));
    }
  },


  async toggleAutoDark(checked) {
    const ok = await this.commitConfig('theme', c => { c.theme = { ...c.theme, autoDark: Boolean(checked) }; return null; });
    if (ok) this.applyTheme(this.config.theme.tokens);
    else this.renderThemeTab(document.getElementById('panelContent'));
  },


  revertTheme() {
    if (this._previewThemeId) {
      document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
      const presetId = this.config.theme ? this.config.theme.presetId : 'berry';
      if (THEMES[presetId]) {
        this.applyTheme(THEMES[presetId].tokens);
      }
      this._previewThemeId = null;
      
      // Remove transition after it's done so it doesn't break instant changes later
      setTimeout(() => {
        document.body.style.transition = '';
      }, 300);
      
      this.showToast(this.t('themeReverted'));
    }
  },

  // Staff Panel: Customers Management (Section 7.7d)
  // ─── Users Tab (Admin & Dev) ────────────────────────────────────────────
  // ─── Users Tab: staff directory (Admin & Dev) ─────────────────────────────
  // Roles are enforced with Firebase custom claims. This list records who should have which role;
  // scripts/set-staff-claims.mjs applies it. Passwords are managed in Firebase Authentication only.
  renderUsersTab(content) {
    if (!content) return;
    const me = this.session;
    if (!me || (me.role !== 'admin' && me.role !== 'dev')) {
      content.innerHTML = `<p class="panel-hint">${escapeHTML(this.t('usersNoAccess'))}</p>`;
      return;
    }
    const q = (this.userSearchQuery || '').toLowerCase().trim();
    let list = (this.staffDirectory || []).slice();
    if (q) list = list.filter(u => [u.name, u.email, u.uid].some(x => String(x || '').toLowerCase().includes(q)));
    list.sort((a, b) => (a.role === 'admin' ? 0 : 1) - (b.role === 'admin' ? 0 : 1) || String(a.name || '').localeCompare(String(b.name || '')));

    const rowsHtml = list.length === 0
      ? `<tr><td colspan="5" class="panel-table__empty">${escapeHTML(this.t('usersEmpty'))}</td></tr>`
      : list.map(u => {
          const perms = u.role === 'staff' && Array.isArray(u.perms) && u.perms.length ? u.perms.map(p => this.t('perm_' + p) || p).join(', ') : '—';
          const isSelf = u.uid === me.uid;
          return `
            <tr>
              <td><span class="badge ${u.role === 'admin' ? 'badge--admin' : 'badge--staff'}">${escapeHTML(this.t('role_' + u.role) || u.role)}</span></td>
              <td><strong>${escapeHTML(u.name || '—')}</strong></td>
              <td dir="ltr">${escapeHTML(u.email || '—')}<br><span class="text-small panel-muted">${escapeHTML(u.uid)}</span></td>
              <td class="user-perms">${escapeHTML(perms)}</td>
              <td class="panel-table__actions">
                <button type="button" class="btn btn--secondary btn--xs" onclick="app.editUser(${jsArg(u.uid)})">${escapeHTML(this.t('usersEdit'))}</button>
                ${isSelf ? `<span class="user-self-hint">${escapeHTML(this.t('usersYou'))}</span>` : `<button type="button" class="btn btn--ghost btn--xs user-delete-btn" onclick="app.deleteUser(${jsArg(u.uid)})">${escapeHTML(this.t('usersDelete'))}</button>`}
              </td>
            </tr>`;
        }).join('');

    content.innerHTML = `
      <div class="panel-tab-head">
        <h4 class="panel-tab-title">${escapeHTML(this.t('usersTitle'))} (${list.length})</h4>
        <div class="panel-tab-tools">
          <label class="sr-only" for="userSearchInput">${escapeHTML(this.t('usersSearch'))}</label>
          <input type="search" id="userSearchInput" class="form-input form-input--compact" placeholder="${escapeHTML(this.t('usersSearch'))}" value="${escapeHTML(this.userSearchQuery || '')}" oninput="app.handleUserSearch(this.value)" />
          <button type="button" class="btn btn--primary btn--sm" onclick="app.showAddStaffModal()">+ ${escapeHTML(this.t('usersAddStaff'))}</button>
        </div>
      </div>
      <div class="panel-callout" role="note">
        <p>${escapeHTML(this.t('usersClaimsHint'))}</p>
        <code dir="ltr">npm run staff:claims</code>
      </div>
      <div class="panel-table-wrap">
        <table class="panel-table">
          <thead>
            <tr>
              <th scope="col">${escapeHTML(this.t('usersColRole'))}</th>
              <th scope="col">${escapeHTML(this.t('usersColName'))}</th>
              <th scope="col">${escapeHTML(this.t('usersColLogin'))}</th>
              <th scope="col">${escapeHTML(this.t('usersColPerms'))}</th>
              <th scope="col" class="panel-table__actions">${escapeHTML(this.t('usersColActions'))}</th>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      </div>`;
  },


  handleUserSearch(val) {
    this.userSearchQuery = val;
    const content = document.getElementById('panelContent');
    if (content && this.activePanelTab === 'users') {
      this.renderUsersTab(content);
      const input = document.getElementById('userSearchInput');
      if (input) {
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
      }
    }
  },


  editUser(uid) {
    const u = (this.staffDirectory || []).find(x => x.uid === uid);
    if (!u) return;
    this.showAddStaffModal(u);
  },




  async deleteUser(uid) {
    const u = (this.staffDirectory || []).find(x => x.uid === uid);
    if (!u || uid === this.session?.uid) return;
    const ok = await this.confirmDialog({
      title: this.t('usersDelete'),
      message: this.t('usersConfirmDelete').replace('{name}', u.name || u.email || u.uid),
      okLabel: this.t('usersDelete'),
      danger: true,
    });
    if (!ok) return;
    await this.runWrite(() => store.deleteStaffEntry(uid), { successMsg: this.t('staffRemovedHint') });
  },


  // ─── Phone Preview (Theme & Fonts tabs) ────────────────────────────────
  // Injects a Desktop/Phone toggle bar before an element and, when Phone is
  // active, wraps that element in a fixed 390px device frame.
  addPhonePreviewToggle(anchorEl, frameHtml) {
    if (!anchorEl) return;
    const bar = document.createElement('div');
    bar.className = 'phone-preview-bar';
    bar.setAttribute('role', 'group');
    bar.setAttribute('aria-label', this.t('phonePreviewLabel'));
    bar.innerHTML = `
      <button type="button" class="phone-preview-btn is-active" data-phone-mode="desktop"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg> ${this.t('phonePreviewDesktop')}</button>
      <button type="button" class="phone-preview-btn" data-phone-mode="phone"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg> ${this.t('phonePreviewPhone')}</button>
    `;
    anchorEl.parentNode.insertBefore(bar, anchorEl);

    bar.addEventListener('click', (e) => {
      const btn = e.target.closest('.phone-preview-btn');
      if (!btn) return;
      this.setPhonePreviewMode(bar, btn.dataset.phoneMode, frameHtml);
    });
  },

  setPhonePreviewMode(bar, mode, frameHtml) {
    if (!bar) return;
    bar.querySelectorAll('.phone-preview-btn').forEach(b => b.classList.toggle('is-active', b.dataset.phoneMode === mode));
    const target = document.getElementById(frameHtml.frameId);
    const mount = document.getElementById(frameHtml.mountId);
    if (!target || !mount) return;

    if (mode === 'phone') {
      if (!target.classList.contains('phone-frame')) {
        const notch = document.createElement('div');
        notch.className = 'phone-frame__notch';
        mount.insertBefore(notch, target);
        target.classList.add('phone-frame');
      }
    } else {
      const notch = mount.querySelector(':scope > .phone-frame__notch');
      if (notch) notch.remove();
      target.classList.remove('phone-frame');
    }
  },

  orderTotal(o) {
    return Number(o.totals?.total ?? o.economy?.total) || 0;
  },

  renderCustomersTab(content) {
    if (!content) return;
    const customerMap = new Map();
    (this.customers || []).forEach(u => {
      customerMap.set(u.id, { id: u.id, name: u.name || this.t('customerFallbackName'), phone: u.phone || '', orders: [] });
    });
    (this.staffOrders || []).forEach(o => {
      const id = o.customerId;
      if (!customerMap.has(id)) {
        customerMap.set(id, { id, name: (o.customer && o.customer.name) || this.t('customerFallbackName'), phone: (o.customer && o.customer.phone) || '', orders: [] });
      }
      customerMap.get(id).orders.push(o);
    });

    let list = [...customerMap.values()];
    const q = (this.customerSearchQuery || '').toLowerCase().trim();
    if (q) list = list.filter(c => String(c.name).toLowerCase().includes(q) || String(c.phone).includes(q));
    const last = c => (c.orders.length ? Math.max(...c.orders.map(o => o.createdAt || 0)) : 0);
    const spent = c => c.orders.reduce((s, o) => s + this.orderTotal(o), 0);
    const sort = this.customerSortOption || 'lastOrder';
    if (sort === 'name') list.sort((a, b) => String(a.name).localeCompare(String(b.name)));
    else if (sort === 'totalSpent') list.sort((a, b) => spent(b) - spent(a));
    else if (sort === 'orderCount') list.sort((a, b) => b.orders.length - a.orders.length);
    else list.sort((a, b) => last(b) - last(a));

    const locale = this.lang === 'ku' ? 'ckb' : 'en-GB';
    const rowsHtml = list.length === 0
      ? `<tr><td colspan="6" class="panel-table__empty">${escapeHTML(this.t('customersEmpty'))}</td></tr>`
      : list.map(c => `
          <tr>
            <td><strong>${escapeHTML(c.name)}</strong></td>
            <td dir="ltr">${escapeHTML(c.phone || '—')}</td>
            <td><span class="badge badge--customer">${c.orders.length}</span></td>
            <td class="panel-money">${escapeHTML(this.formatPrice(spent(c)))}</td>
            <td>${escapeHTML(last(c) ? new Date(last(c)).toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' }) : '—')}</td>
            <td><button type="button" class="btn btn--xs btn--secondary" onclick="app.openCustomerDrawer(${jsArg(c.id)})">${escapeHTML(this.t('myOrdersDetails'))}</button></td>
          </tr>`).join('');

    const opt = (v, k) => `<option value="${v}" ${sort === v ? 'selected' : ''}>${escapeHTML(this.t(k))}</option>`;
    content.innerHTML = `
      <div class="panel-tab-head">
        <h4 class="panel-tab-title">${escapeHTML(this.t('tabCustomers'))} (${list.length})</h4>
        <div class="panel-tab-tools">
          <label class="sr-only" for="customerSearchInput">${escapeHTML(this.t('customersSearch'))}</label>
          <input type="search" id="customerSearchInput" class="form-input form-input--compact" placeholder="${escapeHTML(this.t('customersSearch'))}" value="${escapeHTML(this.customerSearchQuery || '')}" oninput="app.handleCustomerSearch(this.value)" />
          <label class="sr-only" for="customerSortSelect">${escapeHTML(this.t('sortLabel'))}</label>
          <select id="customerSortSelect" class="form-select form-input--compact" onchange="app.handleCustomerSort(this.value)">
            ${opt('lastOrder', 'customersSortLastOrder')}${opt('totalSpent', 'customersSortTotalSpent')}${opt('orderCount', 'customersSortOrderCount')}${opt('name', 'customersSortName')}
          </select>
        </div>
      </div>
      <p class="panel-hint">${escapeHTML(this.t('customersScopeHint'))}</p>
      <div class="panel-table-wrap">
        <table class="panel-table">
          <thead><tr>
            <th scope="col">${escapeHTML(this.t('customersSortName'))}</th>
            <th scope="col">${escapeHTML(this.t('colPhone'))}</th>
            <th scope="col">${escapeHTML(this.t('customerOrders'))}</th>
            <th scope="col">${escapeHTML(this.t('customerTotalSpent'))}</th>
            <th scope="col">${escapeHTML(this.t('customerLastOrder'))}</th>
            <th scope="col"><span class="sr-only">${escapeHTML(this.t('usersColActions'))}</span></th>
          </tr></thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      </div>`;
  },


  handleCustomerSearch(val) {
    this.customerSearchQuery = val;
    const content = document.getElementById('panelContent');
    if (content && this.activePanelTab === 'customers') {
      this.renderCustomersTab(content);
      const input = document.getElementById('customerSearchInput');
      if (input) { input.focus(); input.setSelectionRange(input.value.length, input.value.length); }
    }
  },


  handleCustomerSort(val) {
    this.customerSortOption = val;
    const content = document.getElementById('panelContent');
    if (content && this.activePanelTab === 'customers') {
      this.renderCustomersTab(content);
    }
  },

  openCustomerDrawer(customerId) {
    this.selectedStaffCustomerId = customerId;
    this.customerNoteText = '';
    let drawer = document.getElementById('staffCustomerDrawer');
    let backdrop = document.getElementById('staffCustomerBackdrop');
    if (!drawer) {
      drawer = document.createElement('div');
      drawer.id = 'staffCustomerDrawer';
      drawer.className = 'customer-drawer';
      drawer.setAttribute('role', 'dialog');
      drawer.setAttribute('aria-modal', 'true');
      drawer.setAttribute('aria-labelledby', 'customerDrawerTitle');
      document.body.appendChild(drawer);
    }
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'staffCustomerBackdrop';
      backdrop.className = 'customer-drawer-backdrop';
      backdrop.onclick = () => this.closeCustomerDrawer();
      document.body.appendChild(backdrop);
    }
    if (this._noteUnsub) this._noteUnsub();
    this._noteUnsub = canAccessTab(this.session, 'customers') && store
      ? store.watchCustomerNote(customerId, text => {
          this.customerNoteText = text;
          const box = document.getElementById('customerNoteBox');
          if (box && document.activeElement !== box) box.value = text;
        }, err => this.reportListenerError('customer note', err))
      : null;
    this.renderCustomerDrawerContent();
    backdrop.classList.add('is-open');
    this.openDialog('staffCustomerDrawer', document.activeElement, { onEscape: () => this.closeCustomerDrawer() });
  },


  closeCustomerDrawer() {
    if (this._noteUnsub) { this._noteUnsub(); this._noteUnsub = null; }
    const wasOpen = Boolean(this.selectedStaffCustomerId);
    this.selectedStaffCustomerId = null;
    const backdrop = document.getElementById('staffCustomerBackdrop');
    if (backdrop) backdrop.classList.remove('is-open');
    if (wasOpen) this.closeDialog('staffCustomerDrawer');
  },


  async updateOrderStatus(orderId, newStatus) {
    const ok = await this.runWrite(() => store.updateOrderStatus(orderId, newStatus, this.session?.uid), { quiet: true });
    if (ok) this.showToast(this.t('orderStatusUpdated').replace('{status}', this.t('orderStatus' + newStatus[0].toUpperCase() + newStatus.slice(1))), 'success');
    else this.renderCustomerDrawerContent();
  },


  async saveCustomerPrivateNote(customerId, noteText) {
    await this.runWrite(() => store.saveCustomerNote(customerId, noteText, this.session?.uid), { successMsg: this.t('noteSaved') });
  },


  renderCustomerDrawerContent() {
    const drawer = document.getElementById('staffCustomerDrawer');
    const cId = this.selectedStaffCustomerId;
    if (!drawer || !cId) return;
    const profile = (this.customers || []).find(u => u.id === cId);
    const orders = (this.staffOrders || []).filter(o => o.customerId === cId);
    const name = (profile && profile.name) || (orders[0] && orders[0].customer && orders[0].customer.name) || this.t('customerFallbackName');
    const phone = (profile && profile.phone) || (orders[0] && orders[0].customer && orders[0].customer.phone) || '—';
    const totalSpent = orders.reduce((s, o) => s + this.orderTotal(o), 0);
    const locale = this.lang === 'ku' ? 'ckb' : 'en-GB';
    const statuses = ['pending', 'confirmed', 'completed', 'cancelled'];

    const ordersHtml = orders.length === 0
      ? `<p class="panel-hint">${escapeHTML(this.t('customerNoOrders'))}</p>`
      : orders.map(o => {
          const items = (o.items || []).map(it => `${it.qty}× ${it.name || it.nameSnapshot || it.productId} (${this.formatPrice((it.unitPriceUSD ?? it.usdSnapshot ?? 0) * it.qty)})`);
          const status = { baking: 'confirmed', delivered: 'completed' }[o.status] || o.status;
          return `
            <div class="drawer-order">
              <div class="drawer-order__head">
                <span class="drawer-order__id">#${escapeHTML(String(o.id).slice(-6).toUpperCase())}</span>
                <span class="drawer-order__date">${escapeHTML(new Date(o.createdAt).toLocaleString(locale))}</span>
              </div>
              <div class="drawer-order__items">${items.map(escapeHTML).join('<br>')}</div>
              ${o.fulfillmentAt ? `<div class="drawer-order__meta">${escapeHTML(this.t('historyRequestedFor'))}: ${escapeHTML(formatFulfillment(new Date(o.fulfillmentAt), this.lang))}</div>` : ''}
              ${o.customer && o.customer.address ? `<div class="drawer-order__meta">${escapeHTML(this.t('checkoutAddressLabel'))}: ${escapeHTML(o.customer.address)}</div>` : ''}
              ${o.note ? `<div class="drawer-order__meta">${escapeHTML(this.t('orderNoteLabel'))}: ${escapeHTML(o.note)}</div>` : ''}
              <div class="drawer-order__foot">
                <strong class="panel-money">${escapeHTML(this.formatPrice(this.orderTotal(o)))}</strong>
                <label class="drawer-order__status">
                  <span>${escapeHTML(this.t('customerChangeStatus'))}</span>
                  <select class="form-select form-input--compact" onchange="app.updateOrderStatus(${jsArg(o.id)}, this.value)">
                    ${statuses.map(st => `<option value="${st}" ${status === st ? 'selected' : ''}>${escapeHTML(this.t('orderStatus' + st[0].toUpperCase() + st.slice(1)))}</option>`).join('')}
                  </select>
                </label>
              </div>
            </div>`;
        }).join('');

    drawer.innerHTML = `
      <div class="customer-drawer-header">
        <div>
          <h3 id="customerDrawerTitle" class="customer-drawer-title">${escapeHTML(name)}</h3>
          <p class="panel-hint" dir="auto">${escapeHTML(phone)} · ${orders.length} · ${escapeHTML(this.formatPrice(totalSpent))}</p>
        </div>
        <button type="button" class="modal-close" onclick="app.closeCustomerDrawer()" aria-label="${escapeHTML(this.t('btnClose'))}">✕</button>
      </div>
      <div class="customer-drawer-body">
        <div class="form-group">
          <label class="form-label" for="customerNoteBox">${escapeHTML(this.t('customerPrivateNote'))}</label>
          <textarea id="customerNoteBox" class="form-textarea" rows="3" onchange="app.saveCustomerPrivateNote(${jsArg(cId)}, this.value)">${escapeHTML(this.customerNoteText || '')}</textarea>
        </div>
        <h4 class="panel-tab-title">${escapeHTML(this.t('customerOrders'))} (${orders.length})</h4>
        ${ordersHtml}
      </div>`;
  },


  // Save Handlers for Tabs
  initLogoDraft() {
    const c = this.config || DEFAULT_CONFIG;
    let bytes = 0;
    if (c.logoImage) {
      const len = c.logoImage.length - (c.logoImage.indexOf(',') + 1);
      bytes = Math.round(len * 0.75);
    }
    this.draftLogo = {
      mode: c.logoMode || (c.logoImage ? 'image' : (c.logoUrl ? 'url' : 'emoji')),
      emoji: c.logoEmoji || '🎂',
      image: c.logoImage || '',
      url: c.logoUrl || c.logoImageUrl || '',
      imageBytes: bytes,
      isSvg: c.logoImage ? c.logoImage.includes('image/svg') : false,
      urlStatus: null,
      isReadyToSave: false,
      fallback: false
    };
  },

  getLogoEditorHtml() {
    if (!this.draftLogo) {
      this.initLogoDraft();
    }
    const d = this.draftLogo;
    const mode = d.mode;

    // Preview content
    let previewInner = '';
    const hasImage = mode === 'image' && Boolean(d.image && d.image.trim());
    const hasUrl = mode === 'url' && Boolean(d.url && d.url.trim());

    if (d.fallback || mode === 'emoji' || (!hasImage && !hasUrl)) {
      previewInner = `<span class="logo-preview-emoji">${escapeHTML(d.emoji || '🎂')}</span>`;
    } else if (mode === 'image' && hasImage) {
      previewInner = `<img src="${escapeHTML(d.image)}" class="logo-preview-img" alt="Logo preview" onerror="app.handleLogoPreviewError()" onload="app.handleLogoPreviewSuccess()" />`;
    } else if (mode === 'url' && hasUrl) {
      previewInner = `<img src="${escapeHTML(d.url)}" class="logo-preview-img" alt="Logo preview" crossorigin="anonymous" onerror="app.handleLogoPreviewError()" onload="app.handleLogoPreviewSuccess()" />`;
    }

    // Preview caption & meta
    let metaText = '';
    if (mode === 'emoji') {
      metaText = `${this.t('logoModeEmoji')} · ${escapeHTML(d.emoji || '🎂')}`;
    } else if (mode === 'image') {
      const sizeStr = d.imageBytes > 0
        ? (d.imageBytes > 1024 ? Math.round(d.imageBytes / 1024) + ' KB' : d.imageBytes + ' B')
        : 'Active';
      metaText = `${this.t('logoModeUpload')} · ${sizeStr}`;
    } else if (mode === 'url') {
      metaText = this.t('logoUrlLabel');
    }

    // Status chips
    let statusChip = '';
    if (d.isReadyToSave) {
      statusChip = `<span class="logo-chip logo-chip--ready">✓ ${this.t('logoUploadReady')}</span>`;
    } else if (mode === 'url' && d.urlStatus === 'valid') {
      statusChip = `<span class="logo-chip logo-chip--valid">✓ ${this.t('logoUrlValid')}</span>`;
    } else if (mode === 'url' && d.urlStatus === 'invalid') {
      statusChip = `<span class="logo-chip logo-chip--error">✗ ${this.t('logoUrlInvalid')}</span>`;
    }

    // Can show Remove button if image or url is active/filled
    const showRemove = (mode === 'image' && Boolean(d.image)) || (mode === 'url' && Boolean(d.url));

    return `
      <div class="logo-card">
        <div class="logo-card__header">
          <h5 class="logo-card__title">
            <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="4"/><rect x="7" y="7" width="5" height="5" rx="1"/><rect x="12" y="12" width="5" height="5" rx="1"/></svg></span> <span>${this.t('logoSection')}</span>
          </h5>
          <span style="font-size:0.75rem;color:var(--muted);">${this.t('logoFaviconNote')}</span>
        </div>
        <div class="logo-card__body">
          <!-- Preview Column -->
          <div class="logo-preview-col">
            <div class="logo-preview-box ${d.fallback ? 'is-fallback' : ''}" id="logoPreviewBox">
              ${previewInner}
            </div>
            <div class="logo-preview-meta" id="logoPreviewMeta">${escapeHTML(metaText)}</div>
            ${statusChip ? `<div id="logoStatusChipArea">${statusChip}</div>` : '<div id="logoStatusChipArea"></div>'}
            ${d.fallback ? `<div class="logo-warning-note">${this.t('logoFallbackWarning')}</div>` : ''}
            ${showRemove ? `
              <button type="button" class="btn btn--ghost btn--sm" style="color:#b91c1c;border-color:#fca5a5;padding:4px 10px;font-size:0.78rem;margin-top:4px;" onclick="app.removeLogo()">
                ${this.t('logoRemoveBtn')}
              </button>
            ` : ''}
          </div>

          <!-- Controls Column -->
          <div class="logo-controls-col">
            <!-- Mode Switcher -->
            <div class="logo-mode-switcher" role="radiogroup" aria-label="Logo Mode">
              <button type="button" class="logo-mode-btn ${mode === 'emoji' ? 'is-active' : ''}" onclick="app.setLogoMode('emoji')">
                ${this.t('logoModeEmoji')}
              </button>
              <button type="button" class="logo-mode-btn ${mode === 'image' ? 'is-active' : ''}" onclick="app.setLogoMode('image')">
                ${this.t('logoModeUpload')}
              </button>
              <button type="button" class="logo-mode-btn ${mode === 'url' ? 'is-active' : ''}" onclick="app.setLogoMode('url')">
                ${this.t('logoModeUrl')}
              </button>
            </div>

            <!-- Mode 1: Emoji -->
            <div id="logoModeEmojiArea" style="display:${mode === 'emoji' ? 'block' : 'none'};">
              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label" for="logoEmojiInput">${this.t('logoEmojiLabel')}</label>
                <input type="text" id="logoEmojiInput" class="form-input" maxlength="4" value="${escapeHTML((d.emoji || '🎂'))}" oninput="app.handleLogoEmojiInput(this.value)" style="max-width:140px;font-size:1.3rem;text-align:center;" />
                <p style="font-size:0.78rem;color:var(--muted);margin:4px 0 8px 0;">${this.t('logoEmojiHint')}</p>
                <div class="quick-pick-emojis">
                  ${['🎂', '🍰', '🧁', '🍩', '🍪', '🥐', '🍫', '☕'].map(em => `
                    <button type="button" class="quick-pick-btn" onclick="app.selectQuickEmoji(${jsArg(em)})" title="${escapeHTML(em)}" aria-label="Select ${escapeHTML(em)}">${escapeHTML(em)}</button>
                  `).join('')}
                </div>
              </div>
            </div>

            <!-- Mode 2: Upload -->
            <div id="logoModeUploadArea" style="display:${mode === 'image' ? 'block' : 'none'};">
              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label">${this.t('logoModeUpload')}</label>
                <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
                  <label class="upload-btn" for="logoFileInput" style="cursor:pointer;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                    <span>${d.image ? this.t('logoReplaceBtn') : this.t('logoUploadBtn')}</span>
                    <input type="file" id="logoFileInput" accept="image/png,image/jpeg,image/webp,image/svg+xml" onchange="app.handleLogoFileUpload(event)" style="display:none;" />
                  </label>
                </div>
                <p style="font-size:0.78rem;color:var(--muted);margin-top:8px;">${this.t('logoUploadHint')}</p>
              </div>
            </div>

            <!-- Mode 3: URL -->
            <div id="logoModeUrlArea" style="display:${mode === 'url' ? 'block' : 'none'};">
              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label" for="logoUrlInput">${this.t('logoUrlLabel')}</label>
                <input type="url" id="logoUrlInput" class="form-input" dir="ltr" placeholder="https://..." value="${escapeHTML((d.url || ''))}" oninput="app.handleLogoUrlInput(this.value)" />
                <p style="font-size:0.78rem;color:var(--muted);margin-top:4px;">${this.t('logoUrlHint')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  updateLogoCardUI() {
    const container = document.getElementById('logoEditorContainer');
    if (container) {
      container.innerHTML = this.getLogoEditorHtml();
    }
  },

  setLogoMode(mode) {
    if (!this.draftLogo) this.initLogoDraft();
    this.draftLogo.mode = mode;
    this.draftLogo.fallback = false;
    this.updateLogoCardUI();
  },

  handleLogoEmojiInput(val) {
    if (!this.draftLogo) this.initLogoDraft();
    this.draftLogo.emoji = val.trim() || '🎂';
    this.draftLogo.fallback = false;
    this.updateLogoPreviewBox();
  },

  selectQuickEmoji(em) {
    if (!this.draftLogo) this.initLogoDraft();
    this.draftLogo.emoji = em;
    this.draftLogo.fallback = false;
    const inp = document.getElementById('logoEmojiInput');
    if (inp) inp.value = em;
    this.updateLogoPreviewBox();
  },

  updateLogoPreviewBox() {
    const box = document.getElementById('logoPreviewBox');
    const meta = document.getElementById('logoPreviewMeta');
    const d = this.draftLogo;
    if (!box || !d) return;

    if (d.mode === 'emoji') {
      box.className = 'logo-preview-box';
      box.innerHTML = `<span class="logo-preview-emoji">${escapeHTML(d.emoji || '🎂')}</span>`;
      if (meta) meta.textContent = `${this.t('logoModeEmoji')} · ${d.emoji || '🎂'}`;
    }
  },

  async handleLogoFileUpload(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    try {
      const res = await processLogoFile(file);
      if (!this.draftLogo) this.initLogoDraft();
      this.draftLogo.image = res.dataUrl;
      this.draftLogo.imageBytes = res.approxBytes;
      this.draftLogo.isSvg = res.isSvg;
      this.draftLogo.mode = 'image';
      this.draftLogo.isReadyToSave = true;
      this.draftLogo.fallback = false;
      this.updateLogoCardUI();
      this.showToast(this.t('toastPhotoReady') || 'Logo ready to save', 'info');
    } catch (err) {
      console.error('Logo upload error:', err);
      if (err.message === 'FILE_TOO_LARGE' || err.message === 'OUTPUT_TOO_LARGE') {
        this.showToast(this.t('logoUploadTooLarge'), 'error');
      } else {
        this.showToast(this.t('logoUploadError'), 'error');
      }
    } finally {
      e.target.value = '';
    }
  },

  handleLogoUrlInput(val) {
    if (!this.draftLogo) this.initLogoDraft();
    const clean = val.trim();
    if (clean.toLowerCase().startsWith('javascript:') || clean.toLowerCase().startsWith('data:')) {
      this.showToast(this.t('invalidUrl'), 'error');
      this.draftLogo.urlStatus = 'invalid';
      this.draftLogo.fallback = true;
      this.updateLogoCardUI();
      return;
    }

    this.draftLogo.url = clean;
    this.draftLogo.urlStatus = null;
    this.draftLogo.fallback = false;

    if (this._logoUrlDebounce) clearTimeout(this._logoUrlDebounce);
    this._logoUrlDebounce = setTimeout(() => {
      if (!this.draftLogo.url) {
        this.draftLogo.urlStatus = null;
        this.draftLogo.fallback = false;
        this.updateLogoCardUI();
        return;
      }
      const testImg = new Image();
      let resolved = false;
      const timer = setTimeout(() => {
        if (!resolved) {
          resolved = true;
          this.draftLogo.urlStatus = 'invalid';
          this.draftLogo.fallback = true;
          this.updateLogoCardUI();
        }
      }, 1500);

      testImg.onload = () => {
        if (!resolved) {
          resolved = true;
          clearTimeout(timer);
          this.draftLogo.urlStatus = 'valid';
          this.draftLogo.fallback = false;
          this.updateLogoCardUI();
        }
      };
      testImg.onerror = () => {
        if (!resolved) {
          resolved = true;
          clearTimeout(timer);
          this.draftLogo.urlStatus = 'invalid';
          this.draftLogo.fallback = true;
          this.updateLogoCardUI();
        }
      };
      testImg.crossOrigin = 'anonymous';
      testImg.src = this.draftLogo.url;
    }, 300);
  },

  handleLogoPreviewError() {
    if (this.draftLogo) {
      this.draftLogo.fallback = true;
      this.updateLogoCardUI();
    }
  },

  handleLogoPreviewSuccess() {
    if (this.draftLogo && this.draftLogo.fallback) {
      this.draftLogo.fallback = false;
      this.updateLogoCardUI();
    }
  },

  removeLogo() {
    if (!this.draftLogo) this.initLogoDraft();
    this.draftLogo.image = '';
    this.draftLogo.url = '';
    this.draftLogo.imageBytes = 0;
    this.draftLogo.mode = 'emoji';
    this.draftLogo.fallback = false;
    this.draftLogo.urlStatus = null;
    this.draftLogo.isReadyToSave = false;
    this.updateLogoCardUI();
    this.showToast(this.t('logoRemoved'), 'info');
  },

  async saveBrandSettings(e) {
    if (e) e.preventDefault();
    const v = id => document.getElementById(id).value.trim();
    const ok = await this.commitConfig('brand', c => {
      c.shopName = { en: v('cfgShopNameEn'), ku: v('cfgShopNameKu') };
      c.tagline = { en: v('cfgTaglineEn'), ku: v('cfgTaglineKu') };
      c.announcement = { en: v('cfgAnnounceEn'), ku: v('cfgAnnounceKu') };
      if (this.draftLogo) {
        c.logoMode = this.draftLogo.mode || 'emoji';
        c.logoEmoji = (this.draftLogo.emoji && this.draftLogo.emoji.trim()) || '🎂';
        c.logoImage = this.draftLogo.image || '';
        c.logoUrl = safeUrl(this.draftLogo.url || '');
        c.logoImageUrl = c.logoMode === 'url' ? c.logoUrl : '';
      }
      return null;
    });
    if (ok && this.draftLogo) {
      this.draftLogo.isReadyToSave = false;
      this.updateLogoCardUI();
    }
  },


  async saveAboutSettings(e) {
    e.preventDefault();
    const v = id => document.getElementById(id).value.trim();
    await this.commitConfig('about', c => {
      const imageUrl = v('cfgAboutImage');
      if (imageUrl && !safeUrl(imageUrl)) return this.t('errInvalidUrl');
      c.aboutUs = {
        ...c.aboutUs,
        en: v('cfgAboutEn'), ku: v('cfgAboutKu'), imageUrl,
        eyebrowEn: v('cfgAboutEyebrowEn'), eyebrowKu: v('cfgAboutEyebrowKu'),
        titleEn: v('cfgAboutTitleEn'), titleKu: v('cfgAboutTitleKu'),
      };
      return null;
    });
  },


  getFaqItemHtml(f, index) {
    return `
      <div class="faq-editor-card" style="padding: 16px; border: 1px solid var(--line); border-radius: var(--radius-card); position: relative; background: var(--cream);">
        <button type="button" class="btn btn--xs btn--ghost" style="position:absolute; top:8px; right:8px; color:var(--berry);" onclick="app.removeFaqItem(${index})">✕ Remove</button>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Question (EN)</label>
            <input type="text" class="form-input faq-q-en" value="${escapeHTML(f.q.en)}" required />
          </div>
          <div class="form-group">
            <label class="form-label">Question (KU)</label>
            <input type="text" class="form-input faq-q-ku" value="${escapeHTML(f.q.ku)}" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Answer (EN)</label>
            <textarea class="form-input faq-a-en" required style="resize:vertical;min-height:60px;">${escapeHTML(f.a.en)}</textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Answer (KU)</label>
            <textarea class="form-input faq-a-ku" style="resize:vertical;min-height:60px;">${escapeHTML(f.a.ku)}</textarea>
          </div>
        </div>
      </div>
    `;
  },
  
  addFaqItem() {
    if (!this.config.faq) this.config.faq = [];
    this.config.faq.push({ q: { en: '', ku: '' }, a: { en: '', ku: '' } });
    this.renderPanelTab('faq');
  },
  
  removeFaqItem(index) {
    if (!this.config.faq) return;
    this.config.faq.splice(index, 1);
    this.renderPanelTab('faq');
  },
  
  getReviewItemHtml(r, index) {
    return `
      <div class="faq-editor-card" style="padding: 16px; border: 1px solid var(--line); border-radius: var(--radius-card); position: relative; background: var(--cream);">
        <button type="button" class="btn btn--xs btn--ghost" style="position:absolute; top:8px; right:8px; color:var(--berry);" onclick="app.removeReviewItem(${index})">✕ Remove</button>
        <div class="form-row">
          <div class="form-group" style="flex:0.3">
            <label class="form-label">Initials</label>
            <input type="text" class="form-input review-initials" value="${escapeHTML(r.initials)}" required maxlength="2" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Name (EN)</label>
            <input type="text" class="form-input review-name-en" value="${escapeHTML(r.name.en)}" required />
          </div>
          <div class="form-group">
            <label class="form-label">Name (KU)</label>
            <input type="text" class="form-input review-name-ku" value="${escapeHTML(r.name.ku)}" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Role/Subtitle (EN)</label>
            <input type="text" class="form-input review-role-en" value="${escapeHTML(r.role.en)}" required />
          </div>
          <div class="form-group">
            <label class="form-label">Role/Subtitle (KU)</label>
            <input type="text" class="form-input review-role-ku" value="${escapeHTML(r.role.ku)}" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Quote (EN)</label>
            <textarea class="form-input review-quote-en" required style="resize:vertical;min-height:60px;">${escapeHTML(r.quote.en)}</textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Quote (KU)</label>
            <textarea class="form-input review-quote-ku" style="resize:vertical;min-height:60px;">${escapeHTML(r.quote.ku)}</textarea>
          </div>
        </div>
      </div>
    `;
  },
  
  addReviewItem() {
    if (!this.config.reviews) this.config.reviews = [];
    this.config.reviews.push({ initials: 'AN', name: { en: 'Anonymous', ku: '' }, role: { en: 'Customer', ku: '' }, quote: { en: '', ku: '' } });
    this.renderPanelTab('reviews');
  },
  
  removeReviewItem(index) {
    if (!this.config.reviews) return;
    this.config.reviews.splice(index, 1);
    this.renderPanelTab('reviews');
  },

  async resetReviews() {
    const ok = await this.confirmDialog({ title: this.t('reviewsResetTitle'), message: this.t('reviewsResetConfirm'), okLabel: this.t('reviewsResetBtn') });
    if (!ok) return;
    const saved = await this.commitConfig('reviews', c => { c.reviews = JSON.parse(JSON.stringify(DEFAULT_CONFIG.reviews)); return null; });
    if (saved) this.renderPanelTab('reviews');
  },

  
  async saveReviewSettings(e) {
    e.preventDefault();
    const all = cls => [...document.querySelectorAll(cls)].map(i => i.value.trim());
    const initials = all('.review-initials'), namesEn = all('.review-name-en'), namesKu = all('.review-name-ku');
    const rolesEn = all('.review-role-en'), rolesKu = all('.review-role-ku'), quotesEn = all('.review-quote-en'), quotesKu = all('.review-quote-ku');
    await this.commitConfig('reviews', c => {
      c.reviews = initials.map((ini, i) => ({
        initials: ini.slice(0, 2),
        name: { en: namesEn[i], ku: namesKu[i] },
        role: { en: rolesEn[i], ku: rolesKu[i] },
        quote: { en: quotesEn[i], ku: quotesKu[i] },
      }));
      return null;
    });
  },


  async saveFaqSettings(e) {
    e.preventDefault();
    const all = cls => [...document.querySelectorAll(cls)].map(i => i.value.trim());
    const qsEn = all('.faq-q-en'), qsKu = all('.faq-q-ku'), asEn = all('.faq-a-en'), asKu = all('.faq-a-ku');
    await this.commitConfig('faq', c => {
      c.faq = qsEn.map((q, i) => ({ q: { en: q, ku: qsKu[i] }, a: { en: asEn[i], ku: asKu[i] } }));
      return null;
    });
  },


  async saveContactSettings(e) {
    e.preventDefault();
    const v = id => document.getElementById(id).value.trim();
    await this.commitConfig('contact', c => {
      const wa = v('cfgWhatsapp').replace(/\D/g, '');
      if (wa && !normalizeWhatsAppNumber(wa)) return this.t('errInvalidWhatsApp');
      c.contact = {
        ...c.contact,
        whatsapp: wa,
        phone: v('cfgPhone'),
        email: v('cfgEmail'),
        address: { en: v('cfgAddressEn'), ku: v('cfgAddressKu') },
        hours: { en: v('cfgHoursEn'), ku: v('cfgHoursKu') },
      };
      return null;
    });
  },


  async saveSocialSettings(e) {
    e.preventDefault();
    const v = id => document.getElementById(id).value.trim();
    await this.commitConfig('socials', c => {
      const next = { instagram: v('cfgInsta'), facebook: v('cfgFb'), tiktok: v('cfgTiktok'), snapchat: v('cfgSnap') };
      if (Object.values(next).some(u => u && !/^https:\/\//i.test(u))) return this.t('errInvalidUrl');
      c.socials = next;
      return null;
    });
  },


  handleFontPreviewChange() {
    const kuBodySel = document.getElementById('cfgKuBody');
    const kuDispSel = document.getElementById('cfgKuDisplay');
    const enBodySel = document.getElementById('cfgEnBody');
    const enDispSel = document.getElementById('cfgEnDisplay');

    const kuBody = kuBodySel ? kuBodySel.value : ((this.config && this.config.kurdishBodyFont) || 'Vazirmatn');
    const kuDisp = kuDispSel ? kuDispSel.value : ((this.config && this.config.kurdishDisplayFont) || 'Vazirmatn');
    const enBody = enBodySel ? enBodySel.value : ((this.config && this.config.englishBodyFont) || 'DM Sans');
    const enDisp = enDispSel ? enDispSel.value : ((this.config && this.config.englishDisplayFont) || 'Cormorant Garamond');
    ensureFonts([kuBody, kuDisp, enBody, enDisp]);

    const kuHeading = document.getElementById('fontPreviewHeading');
    const kuPara = document.getElementById('fontPreviewBody');
    if (kuHeading) kuHeading.style.fontFamily = `'${kuDisp}', serif`;
    if (kuPara) kuPara.style.fontFamily = `'${kuBody}', sans-serif`;

    const enHeading = document.getElementById('fontPreviewHeadingEn');
    const enPara = document.getElementById('fontPreviewBodyEn');
    if (enHeading) enHeading.style.fontFamily = `'${enDisp}', serif`;
    if (enPara) enPara.style.fontFamily = `'${enBody}', sans-serif`;

    // Apply preview variables
    document.documentElement.style.setProperty('--font-ku-body', `'${kuBody}', system-ui, sans-serif`);
    document.documentElement.style.setProperty('--font-ku-display', `'${kuDisp}', serif`);
    
    if (this.lang === 'ku') {
      document.documentElement.style.setProperty('--font-body', `'${kuBody}', system-ui, sans-serif`);
      document.documentElement.style.setProperty('--font-heading', `'${kuDisp}', serif`);
      document.documentElement.style.setProperty('--font-serif', `'${kuDisp}', serif`);
      document.documentElement.style.setProperty('--font-ui', `'${kuBody}', system-ui, sans-serif`);
      document.documentElement.style.setProperty('--font-accent', `'${kuDisp}', serif`);
    } else {
      document.documentElement.style.setProperty('--font-body', `'${enBody}', system-ui, sans-serif`);
      document.documentElement.style.setProperty('--font-heading', `'${enDisp}', serif`);
      document.documentElement.style.setProperty('--font-serif', `'${enDisp}', serif`);
      document.documentElement.style.setProperty('--font-ui', `'${enBody}', system-ui, sans-serif`);
      document.documentElement.style.setProperty('--font-accent', `'${enDisp}', serif`);
    }
  },

  async saveFontSettings(e) {
    if (e) e.preventDefault();
    const sel = id => document.getElementById(id);
    await this.commitConfig('fonts', c => {
      if (sel('cfgKuBody')) c.kurdishBodyFont = sel('cfgKuBody').value;
      if (sel('cfgKuDisplay')) c.kurdishDisplayFont = sel('cfgKuDisplay').value;
      if (sel('cfgEnBody')) c.englishBodyFont = sel('cfgEnBody').value;
      if (sel('cfgEnDisplay')) c.englishDisplayFont = sel('cfgEnDisplay').value;
      return null;
    });
    this.applyFonts();
  },


  applyFonts() {
    const isKu = this.lang === 'ku';
    const kuBody = (this.config && this.config.kurdishBodyFont) || 'Vazirmatn';
    const kuDisp = (this.config && this.config.kurdishDisplayFont) || 'Vazirmatn';
    const enBody = (this.config && this.config.englishBodyFont) || 'DM Sans';
    const enDisp = (this.config && this.config.englishDisplayFont) || 'Cormorant Garamond';
    ensureFonts(isKu ? [kuBody, kuDisp] : [enBody, enDisp]);
    
    // Set preview variables
    document.documentElement.style.setProperty('--font-ku-body', `'${kuBody}', system-ui, sans-serif`);
    document.documentElement.style.setProperty('--font-ku-display', `'${kuDisp}', serif`);
    
    // Apply based on current language
    if (isKu) {
      document.documentElement.style.setProperty('--font-body', `'${kuBody}', system-ui, sans-serif`);
      document.documentElement.style.setProperty('--font-heading', `'${kuDisp}', serif`);
      document.documentElement.style.setProperty('--font-serif', `'${kuDisp}', serif`);
      document.documentElement.style.setProperty('--font-ui', `'${kuBody}', system-ui, sans-serif`);
      document.documentElement.style.setProperty('--font-accent', `'${kuDisp}', serif`);
    } else {
      document.documentElement.style.setProperty('--font-body', `'${enBody}', system-ui, sans-serif`);
      document.documentElement.style.setProperty('--font-heading', `'${enDisp}', serif`);
      document.documentElement.style.setProperty('--font-serif', `'${enDisp}', serif`);
      document.documentElement.style.setProperty('--font-ui', `'${enBody}', system-ui, sans-serif`);
      document.documentElement.style.setProperty('--font-accent', `'${enDisp}', serif`);
    }
  },

  applyTheme(tokens) {
    const r = document.documentElement.style;
    const baseTokens = tokens || (this.config.theme && this.config.theme.tokens) || THEMES.berry.tokens;
    let activeTokens = { ...baseTokens };
    
    const mode = this.themeModePref || (this.config && this.config.theme && this.config.theme.mode);
    const isAutoDark = this.config && this.config.theme && this.config.theme.autoDark;
    const isSystemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const presetId = this.config && this.config.theme && this.config.theme.presetId;
    
    const isDark = mode === 'dark' || (mode !== 'light' && isAutoDark && isSystemDark) || (presetId === 'midnight' && mode !== 'light');
    
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('is-dark');
      document.body.classList.add('is-dark');

      activeTokens = {
        ...activeTokens,
        cream: '#15110E',
        shell: '#1E1814',
        surface: '#241D18',
        surfaceHover: '#2E241E',
        surfaceInput: '#1A1411',
        blush: '#342820',
        linen: '#221B16',
        berry: activeTokens.berry && activeTokens.berry !== '#8E3B4A' && activeTokens.berry !== '#1F2E4A' ? activeTokens.berry : '#E07A5F',
        berryDark: '#C66247',
        berryDeep: '#F4A58E',
        cocoa: '#F7EFE8',
        cocoaSoft: '#D6C6B8',
        gold: '#E5B85C',
        goldSoft: '#F3D48E',
        ink: '#EDE3DA',
        muted: '#A89687',
        line: '#3A2E26',
        lineStrong: '#4F3F34',
        headerBg: 'rgba(21, 17, 14, 0.94)',
        headerBgStuck: 'rgba(21, 17, 14, 0.98)',
        footerBg: '#100C0A',
        footerText: '#EDE3DA',
        footerMuted: 'rgba(237, 227, 218, 0.7)'
      };
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.classList.remove('is-dark');
      document.body.classList.remove('is-dark');

      activeTokens = {
        surface: '#FFFFFF',
        surfaceHover: '#FFF7F0',
        surfaceInput: '#FFFFFF',
        headerBg: 'rgba(247, 241, 232, 0.94)',
        headerBgStuck: 'rgba(247, 241, 232, 0.98)',
        footerBg: '#2C211B',
        footerText: '#FFFBF7',
        footerMuted: 'rgba(255, 251, 247, 0.75)',
        ...activeTokens
      };
    }

    if (isAutoDark) {
      document.documentElement.setAttribute('data-auto-dark', 'true');
    } else {
      document.documentElement.removeAttribute('data-auto-dark');
    }

    // Text placed on the accent and gold colours: whichever of light/dark text has more contrast.
    activeTokens.onAccent = textOn(activeTokens.berry || '#8B4A32');
    activeTokens.onGold = textOn(activeTokens.gold || '#C99A3D');

    Object.entries(activeTokens).forEach(([key, value]) => {
      r.setProperty('--' + key.replace(/([A-Z])/g, '-$1').toLowerCase(), value);
    });
    document.body.style.background = activeTokens.cream;
    document.body.style.color = activeTokens.ink;
    
    // Update theme-color meta tag
    let metaTheme = document.querySelector('meta[name="theme-color"]');
    if (!metaTheme) {
      metaTheme = document.createElement('meta');
      metaTheme.name = "theme-color";
      document.head.appendChild(metaTheme);
    }
    metaTheme.content = isDark ? '#15110E' : activeTokens.berry;

    this.updateThemeToggleUI(isDark);
  },

  updateThemeToggleUI(isDark) {
    const btn = document.getElementById('themeModeToggle');
    const icon = document.getElementById('themeModeIcon');
    const mobileBtn = document.getElementById('mobileThemeModeToggle');
    const mobileIcon = document.getElementById('mobileThemeModeIcon');
    const text = isDark ? '☀️' : '🌙';
    if (icon) icon.textContent = text;
    if (mobileIcon) mobileIcon.textContent = text;
    if (btn) {
      btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      btn.title = isDark ? (this.lang === 'ku' ? 'دۆخی ڕووناک' : 'Switch to Light Mode') : (this.lang === 'ku' ? 'دۆخی تاریک' : 'Switch to Dark Mode');
      btn.classList.toggle('is-active', isDark);
    }
    if (mobileBtn) {
      mobileBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      mobileBtn.title = isDark ? (this.lang === 'ku' ? 'دۆخی ڕووناک' : 'Switch to Light Mode') : (this.lang === 'ku' ? 'دۆخی تاریک' : 'Switch to Dark Mode');
      mobileBtn.classList.toggle('is-active', isDark);
    }
  },

  // Visitor preference only: stored on this device, never written to the shop's settings.
  toggleDarkMode() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    this.themeModePref = isDark ? 'light' : 'dark';
    this.savePref();
    const presetId = (this.config.theme && this.config.theme.presetId) || 'berry';
    const tokens = (THEMES[presetId] && THEMES[presetId].tokens) || this.config.theme.tokens;
    this.applyTheme(tokens);
    this.announce(this.themeModePref === 'dark' ? this.t('darkModeOn') : this.t('darkModeOff'));
  },


  // Shop default (Theme tab). Visitors who picked a mode themselves keep their choice.
  async setThemeMode(mode) {
    const ok = await this.commitConfig('theme', c => { c.theme = { ...c.theme, mode: mode === 'dark' ? 'dark' : 'light' }; return null; });
    if (!ok) return;
    this.themeModePref = null;
    this.savePref();
    const presetId = this.config.theme.presetId || 'berry';
    this.applyTheme((THEMES[presetId] && THEMES[presetId].tokens) || this.config.theme.tokens);
    if (this.activePanelTab === 'theme') this.renderThemeTab(document.getElementById('panelContent'));
  },


  async toggleWatermarkSetting(checked) {
    const ok = await this.commitConfig('watermark', c => { c.showWatermark = Boolean(checked); return null; });
    if (!ok) {
      const box = document.getElementById('cfgWatermark');
      if (box) box.checked = !checked;
    }
  },


  getDraftEconomy() {
    const savedEco = (this.config && this.config.economy) || DEFAULT_ECONOMY;
    const form = document.getElementById('economySettingsForm');
    if (!form) return savedEco;

    const secCur = document.getElementById('cfgSecondaryCurrency')?.value || savedEco.secondaryCurrency;
    const showSec = document.getElementById('cfgShowSecondary')?.checked ?? savedEco.showSecondary;
    const curSymbol = document.getElementById('cfgCurrencySymbol')?.value?.trim() || (secCur === 'IQD' ? 'د.ع' : secCur);
    const rate = Math.max(1, parseFloat(document.getElementById('cfgExchangeRate')?.value) || 1310);
    const roundRule = parseInt(document.getElementById('cfgRoundingRule')?.value, 10) || 250;
    const delFee = Math.max(0, parseFloat(document.getElementById('cfgDeliveryFee')?.value) || 0);
    const freeDel = Math.max(0, parseFloat(document.getElementById('cfgFreeDeliveryOver')?.value) || 0);
    const minOrder = Math.max(0, parseFloat(document.getElementById('cfgMinimumOrder')?.value) || 0);
    const pickupOnly = Boolean(document.getElementById('cfgPickupOnly')?.checked);
    const taxEnabled = Boolean(document.getElementById('cfgTaxEnabled')?.checked);
    const taxRate = Math.min(30, Math.max(0, parseFloat(document.getElementById('cfgTaxRate')?.value) || 0));
    const taxLabel = document.getElementById('cfgTaxLabel')?.value?.trim() || 'VAT';
    const taxIncluded = Boolean(document.getElementById('cfgTaxIncluded')?.checked);
    const promoCode = document.getElementById('cfgPromoCode')?.value?.trim().toUpperCase() || '';
    const promoType = document.getElementById('cfgPromoType')?.value || 'percent';
    const promoValue = Math.max(0, parseFloat(document.getElementById('cfgPromoValue')?.value) || 0);
    const promoExpiry = document.getElementById('cfgPromoExpiry')?.value || '';

    return {
      primaryCurrency: 'USD',
      secondaryCurrency: secCur,
      showSecondary: showSec,
      currencySymbol: curSymbol,
      exchangeRate: rate,
      roundingRule: roundRule,
      autoRefreshRate: false,
      deliveryFee: delFee,
      freeDeliveryOver: freeDel,
      minimumOrder: minOrder,
      pickupOnly,
      taxEnabled,
      taxRate,
      taxLabel,
      taxIncluded,
      promoCode,
      promoType,
      promoValue,
      promoExpiry,
      lastUpdatedRate: savedEco.lastUpdatedRate
    };
  },

  isEconomyDirty(draft, saved) {
    if (!draft || !saved) return false;
    return draft.secondaryCurrency !== saved.secondaryCurrency ||
      draft.showSecondary !== saved.showSecondary ||
      draft.currencySymbol !== saved.currencySymbol ||
      draft.exchangeRate !== saved.exchangeRate ||
      draft.roundingRule !== saved.roundingRule ||
      draft.deliveryFee !== saved.deliveryFee ||
      draft.freeDeliveryOver !== saved.freeDeliveryOver ||
      draft.minimumOrder !== saved.minimumOrder ||
      draft.pickupOnly !== saved.pickupOnly ||
      draft.taxEnabled !== saved.taxEnabled ||
      draft.taxRate !== saved.taxRate ||
      draft.taxLabel !== saved.taxLabel ||
      draft.taxIncluded !== saved.taxIncluded ||
      draft.promoCode !== saved.promoCode ||
      draft.promoType !== saved.promoType ||
      draft.promoValue !== saved.promoValue ||
      draft.promoExpiry !== saved.promoExpiry;
  },

  handleEconomyInput(e) {
    if (e && e.target) {
      if (e.target.id === 'cfgPromoCode') {
        e.target.value = e.target.value.toUpperCase().replace(/[^A-Z0-9_-]/g, '');
      }
      if (e.target.id === 'cfgExchangeRate') {
        this.onExchangeRateInput(e.target.value);
      } else {
        const draftEco = this.getDraftEconomy();
        this.applyEconomy(draftEco);
      }
    }
    this.updateEconomyPreview();
  },

  onExchangeRateInput(val) {
    if (this._exchangeRateDebounceTimer) {
      clearTimeout(this._exchangeRateDebounceTimer);
    }
    this._exchangeRateDebounceTimer = setTimeout(() => {
      const draftEco = this.getDraftEconomy();
      this.applyEconomy(draftEco);
      this.updateEconomyPreview();
    }, 200);
  },

  applyEconomy(overrideEco = null) {
    this._draftEconomy = overrideEco;
    this.applyPreferences();
    this.renderMenu();
    this.renderTray();
  },

  toggleMobilePreviewExpand() {
    const card = document.getElementById('economyPreviewStickyCard');
    if (!card) return;
    const isCollapsed = card.classList.contains('is-collapsed');
    card.classList.toggle('is-collapsed', !isCollapsed);
    card.classList.toggle('is-expanded', isCollapsed);
    const chevron = document.getElementById('previewChevron');
    if (chevron) {
      chevron.textContent = isCollapsed ? '▼' : '▲';
    }
  },

  showModalToast(msg, type = 'success') {
    const container = document.getElementById('modalToastContainer');
    if (!container) {
      this.showToast(msg, type);
      return;
    }
    const toast = document.createElement('div');
    toast.className = `modal-toast modal-toast--${type}`;
    toast.innerHTML = `<span>✓</span> <span>${msg}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'modalToastOut 220ms cubic-bezier(.2,.8,.3,1) forwards';
      setTimeout(() => toast.remove(), 220);
    }, 2800);
  },

  updateEconomyPreview() {
    const previewEl = document.getElementById('economyLivePreviewCard');
    if (!previewEl) return;

    const savedEco = (this.config && this.config.economy) || DEFAULT_ECONOMY;
    const eco = this.getDraftEconomy();

    // Check dirty state for Save button
    const isDirty = this.isEconomyDirty(eco, savedEco);
    const saveBtn = document.getElementById('btnSaveEconomy');
    if (saveBtn) {
      saveBtn.disabled = !isDirty;
    }

    // Update Accordion Subtexts
    const curSum = document.getElementById('ecoCurrenciesSummary');
    if (curSum) {
      curSum.textContent = (eco.showSecondary && eco.secondaryCurrency && eco.secondaryCurrency !== 'None')
        ? `USD + ${escapeHTML(eco.secondaryCurrency)} (${escapeHTML(eco.currencySymbol || 'د.ع')})`
        : 'USD only';
    }

    const exSum = document.getElementById('ecoExchangeSummary');
    if (exSum) {
      const formattedRate = new Intl.NumberFormat('en-US').format(eco.exchangeRate || 1310);
      const ruleText = eco.roundingRule > 1 ? `Nearest ${escapeHTML(eco.roundingRule)}` : 'Exact (cents)';
      exSum.textContent = `1 USD = ${formattedRate} ${eco.secondaryCurrency} · ${ruleText}`;
    }

    const delSum = document.getElementById('ecoDeliverySummary');
    if (delSum) {
      if (eco.pickupOnly) {
        delSum.textContent = 'Pickup only';
      } else {
        const freeText = eco.freeDeliveryOver > 0 ? `Free over $${escapeHTML(eco.freeDeliveryOver)}` : 'All-order free';
        delSum.textContent = `$${eco.deliveryFee} flat · ${freeText} · Min $${eco.minimumOrder}`;
      }
    }

    const taxSum = document.getElementById('ecoTaxSummary');
    if (taxSum) {
      if (!eco.taxEnabled) {
        taxSum.textContent = 'Off';
      } else {
        taxSum.textContent = `${eco.taxRate}% (${eco.taxLabel || 'VAT'}) ${eco.taxIncluded ? 'included' : '+checkout'}`;
      }
    }

    const discSum = document.getElementById('ecoDiscountsSummary');
    if (discSum) {
      if (!eco.promoCode) {
        discSum.textContent = 'No active code';
      } else {
        const valText = eco.promoType === 'percent' ? `${escapeHTML(eco.promoValue)}%` : `$${escapeHTML(eco.promoValue)}`;
        discSum.textContent = `${eco.promoCode} (${valText} off)`;
      }
    }

    // Promo Validity Badge
    const promoBadge = document.getElementById('promoValidityBadge');
    if (promoBadge) {
      const code = eco.promoCode;
      if (!code) {
        promoBadge.style.display = 'none';
      } else if (code.length < 3) {
        promoBadge.style.display = 'inline-block';
        promoBadge.className = 'promo-pill promo-pill--short';
        promoBadge.textContent = this.t('promoTooShort');
      } else if (eco.promoExpiry && new Date(eco.promoExpiry + 'T23:59:59') < new Date()) {
        promoBadge.style.display = 'inline-block';
        promoBadge.className = 'promo-pill promo-pill--expired';
        promoBadge.textContent = this.t('promoExpired');
      } else {
        promoBadge.style.display = 'inline-block';
        promoBadge.className = 'promo-pill promo-pill--active';
        promoBadge.textContent = this.t('promoActive');
      }
    }

    // Free Delivery vs Min Order Inline Warning
    const freeDelWarn = document.getElementById('freeDeliveryWarn');
    if (freeDelWarn) {
      const showWarn = !eco.pickupOnly && eco.freeDeliveryOver > 0 && eco.minimumOrder > 0 && eco.freeDeliveryOver < eco.minimumOrder;
      freeDelWarn.style.display = showWarn ? 'flex' : 'none';
    }

    // Zero Delivery Fee Note
    const delZeroNote = document.getElementById('deliveryZeroNote');
    if (delZeroNote) {
      delZeroNote.style.display = (!eco.pickupOnly && eco.deliveryFee === 0) ? 'block' : 'none';
    }

    // Sample Order Calculation (Sample item: $50 cake)
    const sampleSubtotal = 50;
    const testPromo = eco.promoCode;
    const bd = this.computeCartBreakdown(sampleSubtotal, testPromo, eco);

    const hasSecondary = eco.showSecondary !== false && eco.secondaryCurrency && eco.secondaryCurrency !== 'None';
    const totalUSD = bd.total;

    let secondaryTotalStr = '';
    let roundingNote = '';
    if (hasSecondary) {
      const raw = totalUSD * eco.exchangeRate;
      const rule = parseInt(eco.roundingRule, 10) || 250;
      let rounded = raw;
      if (rule > 1) {
        rounded = Math.round(raw / rule) * rule;
      } else {
        rounded = Math.round(raw * 100) / 100;
      }
      const sym = eco.currencySymbol || 'د.ع';
      secondaryTotalStr = rule > 1 ? `${escapeHTML(new Intl.NumberFormat('en-US').format(rounded))} ${escapeHTML(sym)}` : `${escapeHTML(sym)} ${escapeHTML(rounded.toFixed(2))}`;

      const unrounded = totalUSD * eco.exchangeRate;
      if (rule > 1 && Math.abs(rounded - unrounded) > 0.01) {
        roundingNote = `
          <div class="economy-preview-rounding">
            Rounded from ${escapeHTML(new Intl.NumberFormat('en-US').format(Math.round(unrounded)))} ${escapeHTML(sym)} (nearest ${escapeHTML(rule)})
          </div>
        `;
      }
    }

    // Update Mobile Collapsed Summary Bar
    const mobSummary = document.getElementById('mobilePreviewSummaryText');
    if (mobSummary) {
      mobSummary.textContent = `$${totalUSD.toFixed(2)}${hasSecondary ? ` · ${secondaryTotalStr}` : ''}`;
    }

    let rows = `
      <div class="economy-preview-line">
        <span>${this.t('subtotal')}</span>
        <strong>$${escapeHTML(sampleSubtotal.toFixed(2))}</strong>
      </div>
    `;

    if (bd.discount > 0) {
      rows += `
        <div class="economy-preview-line" style="color:#4ade80;">
          <span>${this.t('discount')} (${escapeHTML(bd.promoCodeName)})</span>
          <strong>−$${escapeHTML(bd.discount.toFixed(2))}</strong>
        </div>
      `;
    }

    if (bd.isPickupOnly) {
      rows += `
        <div class="economy-preview-line">
          <span>${this.t('economyDelivery')}</span>
          <span style="color:#93c5fd;font-weight:600;">Pickup Only</span>
        </div>
      `;
    } else if (bd.isFreeDelivery) {
      rows += `
        <div class="economy-preview-line">
          <span>${this.t('deliveryFee')}</span>
          <span style="color:#4ade80;font-weight:700;">${this.t('freeDelivery')}</span>
        </div>
      `;
    } else {
      rows += `
        <div class="economy-preview-line">
          <span>${this.t('deliveryFee')}</span>
          <strong>$${escapeHTML(bd.delivery.toFixed(2))}</strong>
        </div>
      `;
    }

    if (bd.tax > 0) {
      rows += `
        <div class="economy-preview-line">
          <span>${this.t('tax')} (${escapeHTML(bd.taxLabel)} ${escapeHTML(bd.taxRate)}%)</span>
          <strong>+$${escapeHTML(bd.tax.toFixed(2))}</strong>
        </div>
      `;
    } else if (eco.taxEnabled && eco.taxIncluded && eco.taxRate > 0) {
      rows += `
        <div class="economy-preview-line" style="color:rgba(255,255,255,0.65);font-size:0.78rem;">
          <span>${escapeHTML(eco.taxLabel)} (${escapeHTML(eco.taxRate)}% included)</span>
          <span>Included</span>
        </div>
      `;
    }

    rows += `
      <div class="economy-preview-total">
        <span>${this.t('total')}</span>
        <div style="text-align:right;">
          <div class="economy-preview-total-value">$${escapeHTML(totalUSD.toFixed(2))}</div>
          ${hasSecondary ? `<div class="economy-preview-secondary">${secondaryTotalStr}</div>${roundingNote}` : ''}
        </div>
      </div>
    `;

    if (!bd.minOrderMet) {
      rows += `
        <div class="economy-preview-alert">
          ⚠️ Min order ($${escapeHTML(eco.minimumOrder.toFixed(2))}) not met. Sample is $${escapeHTML(sampleSubtotal.toFixed(2))}.
        </div>
      `;
    }

    previewEl.innerHTML = rows;
  },

  async saveEconomySettings(e) {
    if (e) e.preventDefault();
    const saveBtn = document.getElementById('btnSaveEconomy');
    if (saveBtn) {
      saveBtn.disabled = true;
      saveBtn.textContent = this.t('statusSaving');
    }
    const draftEco = this.getDraftEconomy();
    draftEco.lastUpdatedRate = Date.now();
    const lead = parseInt(document.getElementById('cfgLeadTime')?.value, 10);
    draftEco.leadTimeHours = Number.isFinite(lead) && lead >= 0 && lead <= 720 ? lead : leadHours(this.config.economy);

    const ok = await this.commitConfig('economy', c => { c.economy = draftEco; return null; }, { quiet: true });
    if (saveBtn) saveBtn.textContent = this.t('saveEconomy');
    if (ok) {
      this._draftEconomy = null;
      this.applyEconomy();
      const tsBadge = document.getElementById('lastUpdatedRateText');
      if (tsBadge) tsBadge.textContent = new Date(draftEco.lastUpdatedRate).toLocaleDateString();
      if (saveBtn) saveBtn.disabled = true;
      this.showModalToast(this.t('toastSaved'), 'success');
      this.updateEconomyPreview();
    } else if (saveBtn) {
      saveBtn.disabled = false;
    }
  },


  // Product Selector & Live Editor
  selectProductForEditing(prodId) {
    if (prodId === 'new') {
      this.addNewProduct();
      return;
    }
    this.selectedProductId = prodId;
    const prod = this.products.find(p => p.id === prodId);
    this.pendingImageData = prod ? (prod.img || '') : '';
    this.renderProductEditor();
  },

  renderProductEditor() {
    const area = document.getElementById('productEditorArea');
    if (!area) return;

    const prod = this.products.find(p => p.id === this.selectedProductId);
    if (!prod) {
      area.innerHTML = `
        <div style="text-align:center;padding:36px 20px;background:var(--shell);border-radius:var(--radius-card);border:1px dashed var(--line);">
          <p style="color:var(--muted);margin-bottom:12px;">No product selected.</p>
          <button type="button" class="btn btn--primary btn--sm" onclick="app.addNewProduct()">${this.t('btnAddNewProduct')}</button>
        </div>
      `;
      return;
    }

    const currentImg = this.pendingImageData || prod.img || '';
    const hasImage = Boolean(currentImg && currentImg.trim() !== '');

    area.innerHTML = `
      <div style="background:var(--cream);padding:22px;border-radius:var(--radius-card);border:1px solid var(--line);margin-top:14px;">
        <h5 style="font-family:var(--font-serif);font-size:1.15rem;margin:0 0 16px 0;display:flex;align-items:center;gap:8px;">
          <span>${escapeHTML(prod.emoji || '🎂')}</span>
          <span>${escapeHTML(prod.name.en || 'Untitled Product')}</span>
          <span style="font-size:0.85rem;color:var(--muted);font-family:var(--font-sans);font-weight:normal;">($${escapeHTML(prod.priceUSD)})</span>
        </h5>

        <!-- Photo Uploader -->
        <div class="photo-uploader">
          <div class="photo-uploader__preview" id="prodPreview">
            ${hasImage ? `
              <img src="${escapeHTML(currentImg)}" alt="${escapeHTML((prod.name.en || 'Product Preview'))}" referrerpolicy="no-referrer" />
            ` : `
              <div class="preview-emoji">${escapeHTML(prod.emoji || '🎂')}</div>
              <div class="preview-hint">${this.t('noPhotoHint')}</div>
            `}
          </div>
          <div class="photo-uploader__controls">
            <label class="upload-btn" for="prodImageInput">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              <span id="uploadBtnText">${hasImage ? this.t('replacePhoto') : this.t('uploadPhoto')}</span>
              <input type="file" id="prodImageInput" accept="image/jpeg,image/png,image/webp" onchange="app.handlePhotoUpload(event)" />
            </label>
            <button type="button" class="btn btn--ghost btn--sm" id="btnRemovePhoto" style="${hasImage ? 'display:inline-flex;' : 'display:none;'} color:#b91c1c; border-color:#fca5a5;" onclick="app.removeProductPhoto()">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px;" aria-hidden="true">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
              ${this.t('removePhoto')}
            </button>
            <p class="photo-hint">${this.t('photoHint')}</p>
          </div>
        </div>

        <form onsubmit="app.saveProductData(event)">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="pEditEmoji">Emoji Fallback Icon</label>
              <input type="text" id="pEditEmoji" class="form-input" value="${escapeHTML(prod.emoji || '🎂')}" required />
            </div>
            <div class="form-group">
              <label class="form-label" for="pEditCat">Category</label>
              <select id="pEditCat" class="form-select">
                <option value="cakes" ${prod.category === 'cakes' ? 'selected' : ''}>Layer Cakes</option>
                <option value="cupcakes" ${prod.category === 'cupcakes' ? 'selected' : ''}>Cupcakes</option>
                <option value="desserts" ${prod.category === 'desserts' ? 'selected' : ''}>Desserts</option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="pEditNameEn">Name (English)</label>
              <input type="text" id="pEditNameEn" class="form-input" value="${escapeHTML((prod.name.en || ''))}" required />
            </div>
            <div class="form-group">
              <label class="form-label" for="pEditNameKu">Name (Kurdish)</label>
              <input type="text" id="pEditNameKu" class="form-input" value="${escapeHTML((prod.name.ku || ''))}" required />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="pEditPrice">Price (USD)</label>
              <input type="number" id="pEditPrice" class="form-input" value="${escapeHTML(prod.priceUSD)}" step="0.5" min="1" required />
            </div>
            <div class="form-group">
              <label class="form-label" for="pEditTag">Product Tag</label>
              <select id="pEditTag" class="form-select">
                <option value="none" ${prod.tag === 'none' ? 'selected' : ''}>None</option>
                <option value="bestseller" ${prod.tag === 'bestseller' ? 'selected' : ''}>Bestseller</option>
          <option value="popular" ${prod.tag === 'popular' ? 'selected' : ''}>Popular</option>
          <option value="limited" ${prod.tag === 'limited' ? 'selected' : ''}>Limited</option>
          <option value="sale" ${prod.tag === 'sale' ? 'selected' : ''}>Sale</option>
                <option value="new" ${prod.tag === 'new' ? 'selected' : ''}>New</option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="pEditUnitEn">Serving Unit (English)</label>
              <input type="text" id="pEditUnitEn" class="form-input" value="${escapeHTML((prod.unit?.en || '8\" Cake (10-12 slices)'))}" required />
            </div>
            <div class="form-group">
              <label class="form-label" for="pEditUnitKu">Serving Unit (Kurdish)</label>
              <input type="text" id="pEditUnitKu" class="form-input" value="${escapeHTML((prod.unit?.ku || 'کێکی ٨ ئینچ (١٠-١٢ پارچە)'))}" required />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="pEditDescEn">Description (English)</label>
            <textarea id="pEditDescEn" class="form-textarea" rows="2">${escapeHTML(prod.desc?.en || '')}</textarea>
          </div>

          <div class="form-group">
            <label class="form-label" for="pEditDescKu">Description (Kurdish)</label>
            <textarea id="pEditDescKu" class="form-textarea" rows="2">${escapeHTML(prod.desc?.ku || '')}</textarea>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="pEditExEn">Exclusions (English, comma separated)</label>
              <input type="text" id="pEditExEn" class="form-input" value="${escapeHTML((prod.exclusions || []).map(e => e.en).join(', '))}" placeholder="e.g. Nuts, Frosting" />
            </div>
            <div class="form-group">
              <label class="form-label" for="pEditExKu">Exclusions (Kurdish, comma separated)</label>
              <input type="text" id="pEditExKu" class="form-input" value="${escapeHTML((prod.exclusions || []).map(e => e.ku).join(', '))}" placeholder="e.g. گوێز, کرێم" />
            </div>
          </div>

          <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:20px;flex-wrap:wrap;">
            <button type="submit" class="btn btn--primary">${this.t('btnSaveProduct')}</button>
            <button type="button" class="btn btn--ghost" style="color:#b91c1c;border-color:#fca5a5;" onclick="app.deleteProduct(${jsArg(prod.id)})">${this.t('btnDeleteProduct')}</button>
          </div>
        </form>
      </div>
    `;
  },

  editProduct(prodId) {
    this.selectProductForEditing(prodId);
  },

  async handlePhotoUpload(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    try {
      const dataUrl = await processImageFile(file);
      this.pendingImageData = dataUrl;

      // Update preview element
      const previewEl = document.getElementById('prodPreview');
      if (previewEl) {
        previewEl.innerHTML = `<img src="${escapeHTML(dataUrl)}" alt="Product Preview" />`;
      }

      // Update button text
      const labelText = document.getElementById('uploadBtnText');
      if (labelText) {
        labelText.textContent = this.t('replacePhoto');
      }

      // Show remove button
      const removeBtn = document.getElementById('btnRemovePhoto');
      if (removeBtn) {
        removeBtn.style.display = 'inline-flex';
      }

      this.showToast(this.t('toastPhotoReady'), 'info');
    } catch (err) {
      console.error('Image processing error:', err);
      if (err.message === 'OUTPUT_TOO_LARGE' || err.message === 'FILE_TOO_LARGE') {
        this.showToast(this.t('prodPhotoTooLarge'), 'error');
      } else {
        this.showToast(this.t('prodPhotoError'), 'error');
      }
    } finally {
      event.target.value = '';
    }
  },

  // Removes the photo from the form; the change is stored when the product is saved.
  removeProductPhoto() {
    this.pendingImageData = '';
    const prod = this.products.find(p => p.id === this.selectedProductId);
    const previewEl = document.getElementById('prodPreview');
    if (previewEl) {
      previewEl.innerHTML = `
        <div class="preview-emoji">${escapeHTML(prod ? prod.emoji || '🎂' : '🎂')}</div>
        <div class="preview-hint">${escapeHTML(this.t('noPhotoHint'))}</div>`;
    }
    const labelText = document.getElementById('uploadBtnText');
    if (labelText) labelText.textContent = this.t('uploadPhoto');
    const removeBtn = document.getElementById('btnRemovePhoto');
    if (removeBtn) removeBtn.style.display = 'none';
    this.showToast(this.t('prodPhotoRemovedPending'), 'info');
  },


  // New products exist only in the form until "Save" succeeds.
  addNewProduct() {
    const newId = 'p_' + Date.now().toString(36);
    const freshProd = {
      id: newId,
      category: 'cakes',
      emoji: '🎂',
      img: '',
      priceUSD: 35,
      tag: 'none',
      name: { en: 'New Artisanal Cake', ku: 'کێکی دەستکردی نوێ' },
      desc: { en: 'Handcrafted sponge layered with fresh cream and seasonal fruits.', ku: 'کێکی دەستکرد بە کرێمی تازە و میوەی وەرزی.' },
      unit: { en: '8" Cake (10-12 slices)', ku: 'کێکی ٨ ئینچ (١٠-١٢ پارچە)' },
      _unsaved: true,
    };
    this.products.unshift(freshProd);
    this.selectedProductId = newId;
    this.pendingImageData = '';
    this.renderPanelTab('products');
    this.showToast(this.t('prodNewDraft'), 'info');
  },


  async saveProductData(e) {
    e.preventDefault();
    const current = this.products.find(p => p.id === this.selectedProductId);
    if (!current) return;
    const v = id => document.getElementById(id).value.trim();
    const priceUSD = parseFloat(document.getElementById('pEditPrice').value);
    if (!Number.isFinite(priceUSD) || priceUSD < 0 || priceUSD > 100000) {
      this.showToast(this.t('prodPriceInvalid'), 'error');
      return;
    }
    const exEn = v('pEditExEn').split(',').map(s => s.trim()).filter(Boolean);
    const exKu = v('pEditExKu').split(',').map(s => s.trim()).filter(Boolean);
    const exclusions = [];
    for (let i = 0; i < Math.max(exEn.length, exKu.length); i++) {
      if (exEn[i] || exKu[i]) {
        exclusions.push({ id: (exEn[i] || exKu[i] || `ex${i}`).replace(/\s+/g, '_').toLowerCase().slice(0, 40), en: exEn[i] || '', ku: exKu[i] || '' });
      }
    }
    const next = {
      id: current.id,
      emoji: v('pEditEmoji') || '🎂',
      category: document.getElementById('pEditCat').value,
      name: { en: v('pEditNameEn'), ku: v('pEditNameKu') },
      priceUSD,
      tag: document.getElementById('pEditTag').value,
      unit: { en: v('pEditUnitEn'), ku: v('pEditUnitKu') },
      desc: { en: v('pEditDescEn'), ku: v('pEditDescKu') },
      exclusions: exclusions.length ? exclusions.slice(0, 20) : null,
      img: this.pendingImageData || '',
    };
    if (!next.name.en) {
      this.showToast(this.t('errFillFields'), 'error');
      return;
    }
    const ok = await this.saveProduct(next);
    if (!ok) return;
    const idx = this.products.findIndex(p => p.id === next.id);
    if (idx > -1) this.products[idx] = this.normalizeProduct(next);
    this.cacheSet(KEYS.PRODUCTS, this.products);
    this.cacheSet(KEYS.PRODUCTS_REMOTE, true);
    this.renderMenu();
    this.renderPanelTab('products');
  },


  async deleteProduct(id) {
    const prod = this.products.find(p => p.id === id);
    if (!prod) return;
    const ok = await this.confirmDialog({
      title: this.t('prodDeleteTitle'),
      message: this.t('prodDeleteConfirm'),
      okLabel: this.t('usersDelete'),
      danger: true,
    });
    if (!ok) return;
    if (!prod._unsaved) {
      const deleted = await this.runWrite(() => store.deleteProduct(id), { successMsg: this.t('toastDeleted') });
      if (!deleted) return;
    }
    this.products = this.products.filter(p => p.id !== id);
    this.cacheSet(KEYS.PRODUCTS, this.products);
    this.cart = sanitizeCart(this.cart, this.products);
    this.persistCart();
    this.selectedProductId = this.products.length ? this.products[0].id : null;
    this.pendingImageData = this.products.length ? (this.products[0].img || '') : '';
    this.renderMenu();
    this.renderTray();
    this.renderPanelTab('products');
  },


  // User Management
  // Add or edit a staff directory entry (uid + email from Firebase Authentication).
  showAddStaffModal(entry = null) {
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
    set('promptUid', entry ? entry.uid : '');
    set('promptEmail', entry ? (entry.email || '') : '');
    set('promptName', entry ? (entry.name || '') : '');
    set('promptRole', entry ? entry.role : 'staff');
    const uidInput = document.getElementById('promptUid');
    if (uidInput) uidInput.readOnly = Boolean(entry);
    document.querySelectorAll('input[name="staffPerms"]').forEach(cb => {
      cb.checked = Boolean(entry && Array.isArray(entry.perms) && entry.perms.includes(cb.value));
    });
    this.setAuthMessage('staffFormMessage', '');
    this.openDialog('customPromptModal');
  },

  
  async submitAddStaff(e) {
    e.preventDefault();
    const uid = document.getElementById('promptUid').value.trim();
    const email = document.getElementById('promptEmail').value.trim();
    const name = document.getElementById('promptName').value.trim();
    const role = document.getElementById('promptRole').value === 'admin' ? 'admin' : 'staff';
    const perms = [...document.querySelectorAll('input[name="staffPerms"]:checked')].map(cb => cb.value).filter(p => STAFF_PERMS.includes(p));
    if (!/^[A-Za-z0-9_-]{6,128}$/.test(uid)) {
      this.setAuthMessage('staffFormMessage', this.t('staffUidInvalid'));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.setAuthMessage('staffFormMessage', this.t('authErr_badEmail'));
      return;
    }
    const ok = await this.runWrite(() => store.saveStaffEntry(uid, { email, name, role, perms: role === 'staff' ? perms : [] }, this.session?.uid), { successMsg: this.t('staffSavedHint') });
    if (ok) this.closeDialog('customPromptModal');
  },


  // Data Export / Import / Reset
  // Imports shop content (config + products). Accounts are never imported.
  async importJsonData() {
    let parsed;
    try {
      parsed = JSON.parse(document.getElementById('dataJsonBox').value);
      if (!parsed || typeof parsed.config !== 'object' || !Array.isArray(parsed.products)) throw new Error('shape');
    } catch {
      this.showToast(this.t('toastInvalidJson'), 'error');
      return;
    }
    const ok = await this.confirmDialog({ title: this.t('importTitle'), message: this.t('importConfirm'), okLabel: this.t('importBtn') });
    if (!ok) return;
    const config = this.normalizeConfig(parsed.config);
    const products = parsed.products.map(p => this.normalizeProduct(p)).filter(Boolean);
    const sections = ['brand', 'theme', 'about', 'faq', 'reviews', 'contact', 'socials', 'economy', 'fonts'];
    let saved = await this.runWrite(async () => {
      const partial = {};
      sections.flatMap(s => this.configKeysFor(s)).forEach(k => { if (config[k] !== undefined) partial[k] = config[k]; });
      await store.savePublicConfig(partial, this.session?.uid);
      for (const p of products) await store.saveProduct(p, this.session?.uid);
    }, { successMsg: this.t('backupImported') });
    if (saved) {
      this.config = config;
      this.products = products;
      this.renderAll();
    }
  },


  copyJsonData() {
    const box = document.getElementById('dataJsonBox');
    if (box) {
      navigator.clipboard.writeText(box.value).then(() => {
        this.showToast(this.t('copiedJson'), 'success');
      }).catch(() => {
        box.select();
        document.execCommand('copy');
        this.showToast(this.t('copiedJson'), 'success');
      });
    }
  },

  // Clears what this browser has cached. The live shop data in Firestore is not touched.
  async factoryReset() {
    const ok = await this.confirmDialog({ title: this.t('resetDeviceTitle'), message: this.t('resetDeviceConfirm'), okLabel: this.t('resetDeviceBtn'), danger: true });
    if (!ok) return;
    [KEYS.CONFIG, KEYS.PRODUCTS, KEYS.PRODUCTS_REMOTE, KEYS.MY_ORDERS, KEYS.GUEST, 'ys_cart_v1'].forEach(k => {
      try { localStorage.removeItem(k); } catch { /* ignore */ }
    });
    this.loadState();
    this.renderAll();
    this.showToast(this.t('resetDeviceDone'), 'success');
  },


  // Watermark Pill ("developed with respect and love by null-tech")
  renderWatermark() {
    const pill = document.getElementById('watermarkPill');
    if (!pill) return;

    const show = (this.config && this.config.showWatermark !== false);
    pill.style.display = show ? 'inline-flex' : 'none';
  },

  // Toast System
  showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type === 'success' ? 'toast--success' : (type === 'error' ? 'toast--error' : '')}`;
    toast.textContent = message;

    container.appendChild(toast);

    // Slide in
    setTimeout(() => {
      toast.classList.add('is-show');
    }, 10);

    // Auto dismiss after 2.2s as specified in micro-interactions
    setTimeout(() => {
      toast.classList.remove('is-show');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 2200);
  },

  // Mobile Menu
  toggleMobileMenu() {
    const nav = document.getElementById('mobileNav');
    const btn = document.getElementById('burgerBtn');
    if (!nav || !btn) return;

    const header = document.getElementById('mainHeader');
    if (header) nav.style.top = `${Math.max(0, header.getBoundingClientRect().bottom)}px`;

    const isOpen = nav.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  },

  closeMobileMenu() {
    const nav = document.getElementById('mobileNav');
    const btn = document.getElementById('burgerBtn');
    if (nav) nav.classList.remove('is-open');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  },

  // Global Event Binding
  bindEvents() {
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (this.config && this.config.theme && this.config.theme.autoDark) {
          this.applyTheme(this.config.theme.tokens);
        }
      });
    }

    // Sticky Header Scroll Detection
    const header = document.getElementById('mainHeader');
    window.addEventListener('scroll', () => {
      if (header) {
        if (window.scrollY > 15) {
          header.classList.add('is-stuck');
        } else {
          header.classList.remove('is-stuck');
        }
      }
    }, { passive: true });

    this.setupScrollSpy();

    // Close dialogs on backdrop click
    ['authModal', 'staffAuthModal', 'panelModal', 'historyModal', 'submitReviewModal', 'customPromptModal'].forEach(id => {
      const modal = document.getElementById(id);
      if (modal) {
        modal.setAttribute('aria-hidden', 'true');
        modal.addEventListener('click', (e) => {
          if (e.target === modal) this.closeDialogById(id);
        });
      }
    });

    // Panel tabs: arrow-key navigation
    const sidebar = document.getElementById('panelSidebar');
    if (sidebar) sidebar.addEventListener('keydown', e => this.handlePanelTabKeys(e));

    // Footer / hash route to the staff sign-in
    window.addEventListener('hashchange', () => {
      if (window.location.hash === '#staff') this.openStaffLogin();
    });

    // Checkout detail fields: keep the note in state, clear errors while typing
    const note = document.getElementById('trayOrderNote');
    if (note) note.addEventListener('input', () => { this.orderNote = note.value; });
    ['trayCustName', 'trayFulfillmentDate'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', () => { if (el.getAttribute('aria-invalid')) this.setCheckoutError(''); });
    });

    // Close the account menu and mobile nav on outside click
    document.addEventListener('click', (e) => {
      const menu = document.querySelector('.account-menu');
      if (menu && !menu.contains(e.target)) this.closeAccountMenu();
      const nav = document.getElementById('mobileNav');
      const burger = document.getElementById('burgerBtn');
      if (nav && nav.classList.contains('is-open')) {
        if (!nav.contains(e.target) && !burger.contains(e.target)) {
          this.closeMobileMenu();
        }
      }
    });

    window.addEventListener('keydown', (e) => {
      // ⌘K / Ctrl+K search shortcut
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('menuSearchInput');
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      }

      // Open dialogs handle Escape and keep Tab focus inside themselves
      if (this.handleDialogKeys(e)) return;

      if (e.key === 'Escape') {
        if (document.activeElement && document.activeElement.id === 'menuSearchInput') {
          document.activeElement.blur();
        }
        const accountList = document.getElementById('accountMenuList');
        if (accountList && !accountList.hidden) {
          this.closeAccountMenu();
          document.getElementById('accountMenuToggle')?.focus();
        } else if (document.getElementById('mobileNav')?.classList.contains('is-open')) {
          this.closeMobileMenu();
          document.getElementById('burgerBtn')?.focus();
        } else if (this.trayBreakdownOpen) {
          this.toggleTrayBreakdown(false);
          document.getElementById('btnTrayToggle')?.focus();
        }
      }
    });
  },

  // Highlight the nav link of the section currently on screen
  setupScrollSpy() {
    if (!('IntersectionObserver' in window)) return;
    const links = document.querySelectorAll('#desktopNav .nav__link, #mobileNav .nav__link');
    const ids = [...new Set([...links].map(a => a.getAttribute('href')).filter(h => h && h.startsWith('#')))];
    // The why-us strip continues the story, so it keeps "Our Story" lit
    const alias = { features: 'story' };
    const sections = [...ids, '#features'].map(h => document.querySelector(h)).filter(Boolean);

    const onScreen = new Set();
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) onScreen.add(entry.target);
        else onScreen.delete(entry.target);
      });
      // Sections not in the nav (like the hero) clear the highlight
      const current = sections.find(sec => onScreen.has(sec));
      const href = current ? `#${alias[current.id] || current.id}` : null;
      links.forEach(a => {
        const active = a.getAttribute('href') === href;
        a.classList.toggle('is-active', active);
        if (active) a.setAttribute('aria-current', 'location');
        else a.removeAttribute('aria-current');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(sec => spy.observe(sec));
  },

  // Smooth Scroll Reveal via IntersectionObserver
  setupIntersectionObserver() {
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Staggered reveal
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, (index % 4) * 70);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    const targets = document.querySelectorAll('.feature-card, .cake-card, .step-card, .review-card, .faq-item, .info-card');
    targets.forEach(el => {
      // Leave content that is already on screen alone so it never flashes out
      if (el.getBoundingClientRect().top < window.innerHeight) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      observer.observe(el);
    });
  }
};

// Expose app globally for inline event handlers immediately
window.app = app;

// Auto-run boot sequence on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => app.init());
} else {
  app.init();
}

// Expose app globally for inline event handlers

