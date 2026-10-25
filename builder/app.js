
/**
 * Yummy Sweets — Bilingual Artisanal Boutique Bakery Web Application (v2)
 * Single-file Vanilla ES6+ Engine
 */

import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut as firebaseSignOut, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, deleteDoc, getDocFromServer, collection, getDocs, onSnapshot, query, where, writeBatch } from "firebase/firestore";
import firebaseConfig from "./firebase-applet-config.json";

let db, auth;
const OperationType = { CREATE: 'create', UPDATE: 'update', DELETE: 'delete', LIST: 'list', GET: 'get', WRITE: 'write' };

function handleFirestoreError(error, operationType, path) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid,
      email: auth?.currentUser?.email,
      emailVerified: auth?.currentUser?.emailVerified,
      isAnonymous: auth?.currentUser?.isAnonymous
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

try {
  const firebaseApp = initializeApp(firebaseConfig);
  db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);
  auth = getAuth(firebaseApp);
  
  // Test connection asynchronously
  (async () => {
    try {
      await getDocFromServer(doc(db, 'test', 'connection'));
    } catch (error) {
      if (error instanceof Error && error.message.includes('the client is offline')) {
        console.error("Please check your Firebase configuration.");
      }
    }
  })();
} catch (e) {
  console.error("Firebase init failed", e);
}

// Top-of-script default constants
const WHATSAPP_NUMBER = '15551234567';
const SHOP_NAME       = 'Yummy Sweets';
const IQD_RATE        = 1310;

// LocalStorage Namespaced & Versioned Keys
const KEYS = {
  CONFIG: 'sc_config_v2',
  USERS: 'sc_users_v2',
  SESSION: 'sc_session_v2',
  PRODUCTS: 'sc_products_v2',
  PREF: 'sc_pref_v2',
  ORDERS: 'sc_orders_v2',
  CUSTOMER_NOTES: 'sc_customer_notes_v2'
};

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
const DEFAULT_ECONOMY = {
  primaryCurrency: 'USD',
  secondaryCurrency: 'IQD',
  showSecondary: true,
  currencySymbol: 'د.ع',
  exchangeRate: 1310,
  roundingRule: 250,
  autoRefreshRate: false,
  deliveryFee: 8,
  freeDeliveryOver: 60,
  minimumOrder: 0,
  pickupOnly: false,
  taxEnabled: false,
  taxRate: 0,
  taxLabel: 'VAT',
  taxIncluded: true,
  promoCode: '',
  promoType: 'percent',
  promoValue: 0,
  promoExpiry: '',
  lastUpdatedRate: null
};

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
    en: 'Pre-order for weekend celebrations! <strong>Free local delivery</strong> on orders over $50.',
    ku: 'پێشوەختە داوا بکە بۆ ئاهەنگەکانی کۆتایی هەفتە! <strong>گەیاندنی خۆڕایی</strong> بۆ داواکاری سەروو $50.'
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
    whatsapp: '15551234567',
    phone: '+964 750 123 4567',
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
            dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          } catch {
            dataUrl = canvas.toDataURL('image/png');
          }

          // Approximate base64 data size: length * 0.75
          const payloadLength = dataUrl.length - (dataUrl.indexOf(',') + 1);
          let approxBytes = Math.round(payloadLength * 0.75);

          // If output exceeds 500 KB, re-export at quality 0.65
          if (approxBytes > 500 * 1024) {
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
          if (approxBytes > 800 * 1024) {
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

// Seed Users (Admin & Dev credentials live solely in code and are never revealed in DOM)
const DEFAULT_USERS = [
  { id: 'u_dev', username: 'dev', password: 'dev123', name: 'Technical Operator', role: 'dev' },
  { id: 'u_admin', username: 'admin', password: 'admin123', name: 'Head Baker Admin', role: 'admin' },
  { id: 'dmfw78AEPYW1htK7rgqptaFRqs03', username: 'yumy.swets', email: 'yumy.swets@gmail.com', password: 'YummyAdmin2026!', name: 'Yummy Sweets Admin', role: 'admin' }
];

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
    announcementText: 'Pre-order for weekend celebrations! <strong>Free local delivery</strong> on orders over $50.',
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
    themeAutoDark:'Enable auto-dark mode (system)'
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
    announcementText: 'پێشوەختە داوا بکە بۆ ئاهەنگەکانی کۆتایی هەفتە! <strong>گەیاندنی خۆڕایی</strong> بۆ داواکاری سەروو $50.',
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
    themeAutoDark:'چالاککردنی باری تاریکی خۆکار'
  }
};

// Global App State Container
const app = {
  lang: 'en',
  currency: 'USD',
  category: 'all',
  config: null,
  users: null,
  products: null,
  selectedProductId: null,
  pendingImageData: '',
  session: null,
  order: [], // [{ id, productId, qty, exclude }]
  orderNote: '',
  orders: [], // Array of historical order records (sc_orders_v2)
  customerNotes: {}, // Private staff notes for customers { [customerId]: noteText }
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
    this.loadState();
    this.initFirebaseSync();
    this.parseUrlHash();
    this.applyTheme(this.config.theme.tokens);
    this.applyFonts();
    this.applyPreferences();
    this.renderAll();
    this.updateFavicon();
    this.bindEvents();
    this.setupIntersectionObserver();
  },

  initFirebaseSync() {
    if (!db) return;
    
    // Config
    onSnapshot(doc(db, 'config', 'main'), (docSnap) => {
      if (docSnap.exists()) {
        const remoteConfig = docSnap.data();
        if (JSON.stringify(this.config) !== JSON.stringify(remoteConfig)) {
          this.config = remoteConfig;
          localStorage.setItem(KEYS.CONFIG, JSON.stringify(this.config));
          this.applyTheme(this.config.theme.tokens);
          this.applyFonts();
          this.renderAll();
        }
      }
    }, (e) => handleFirestoreError(e, OperationType.GET, 'config/main'));

    // Products
    onSnapshot(collection(db, 'products'), (snap) => {
      if (!snap.empty) {
        this.products = snap.docs.map(d => d.data());
        localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(this.products));
        this.renderAll();
      }
    }, (e) => handleFirestoreError(e, OperationType.GET, 'products'));

    let usersUnsub, ordersUnsub;
    
    if (auth) {
      onAuthStateChanged(auth, (user) => {
        if (usersUnsub) { usersUnsub(); usersUnsub = null; }
        if (ordersUnsub) { ordersUnsub(); ordersUnsub = null; }
        
        if (user) {
          const isAdmin = ['qaessafty@gmail.com', 'yumy.swets@gmail.com'].includes(user.email.toLowerCase()) || ['admin', 'dev', 'staff'].includes(this.session?.user?.role);
          
          if (isAdmin) {
            usersUnsub = onSnapshot(collection(db, 'users'), (snap) => {
              if (!snap.empty) {
                this.users = snap.docs.map(d => d.data());
                localStorage.setItem(KEYS.USERS, JSON.stringify(this.users));
                this.renderAll();
              }
            }, (e) => handleFirestoreError(e, OperationType.GET, 'users'));

            ordersUnsub = onSnapshot(collection(db, 'orders'), (snap) => {
              if (!snap.empty) {
                this.orders = snap.docs.map(d => d.data());
                localStorage.setItem(KEYS.ORDERS, JSON.stringify(this.orders));
                this.renderAll();
              }
            }, (e) => handleFirestoreError(e, OperationType.GET, 'orders'));
          } else {
            usersUnsub = onSnapshot(doc(db, 'users', user.uid), (docSnap) => {
              if (docSnap.exists()) {
                const uData = docSnap.data();
                const idx = this.users.findIndex(u => u.id === user.uid);
                if (idx > -1) this.users[idx] = uData;
                else this.users.push(uData);
                localStorage.setItem(KEYS.USERS, JSON.stringify(this.users));
                this.renderAll();
              }
            }, (e) => handleFirestoreError(e, OperationType.GET, 'users'));

            ordersUnsub = onSnapshot(query(collection(db, 'orders'), where('customerId', '==', user.uid)), (snap) => {
              if (!snap.empty) {
                this.orders = snap.docs.map(d => d.data());
                localStorage.setItem(KEYS.ORDERS, JSON.stringify(this.orders));
                this.renderAll();
              }
            }, (e) => handleFirestoreError(e, OperationType.GET, 'orders'));
          }
        }
      });
    }
  },

  // State & LocalStorage Helpers
  loadState() {
    try {
      this.config = JSON.parse(localStorage.getItem(KEYS.CONFIG)) || JSON.parse(JSON.stringify(DEFAULT_CONFIG));
    } catch {
      this.config = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
    }
    // Brand name migration check
    if (this.config && this.config.shopName && (this.config.shopName.en === 'Sweet Crumb' || !this.config.shopName.en)) {
      this.config.shopName.en = 'Yummy Sweets';
      this.config.shopName.ku = 'یامی سویتس';
      if (this.config.aboutUs && this.config.aboutUs.en && this.config.aboutUs.en.includes('Sweet Crumb')) {
        this.config.aboutUs.en = this.config.aboutUs.en.replace(/Sweet Crumb/g, 'Yummy Sweets');
      }
      if (this.config.aboutUs && this.config.aboutUs.ku && this.config.aboutUs.ku.includes('سویت کرەمب')) {
        this.config.aboutUs.ku = this.config.aboutUs.ku.replace(/سویت کرەمب/g, 'یامی سویتس');
      }
      if (this.config.contact && this.config.contact.email === 'hello@sweetcrumb.com') {
        this.config.contact.email = 'hello@yummysweets.com';
      }
      this.saveConfig();
    }
    // Ensure socials exist and merge newly added networks for existing configs
      if (!this.config.socials || typeof this.config.socials !== 'object') {
        this.config.socials = JSON.parse(JSON.stringify(DEFAULT_CONFIG.socials));
      } else {
        this.config.socials = { ...JSON.parse(JSON.stringify(DEFAULT_CONFIG.socials)), ...this.config.socials };
      }

      // Ensure font settings exist
    if (this.config) {
      if (!this.config.kurdishBodyFont) this.config.kurdishBodyFont = 'Vazirmatn';
      if (!this.config.kurdishDisplayFont) this.config.kurdishDisplayFont = 'Vazirmatn';
      
      // Ensure logo settings exist and migrate legacy config
      if (!this.config.theme) {
        this.config.theme = { presetId: 'berry', tokens: THEMES.berry.tokens };
      }
      if (!this.config.faq) {
        this.config.faq = [...DEFAULT_CONFIG.faq];
      }
      if (!this.config.reviews) {
        this.config.reviews = [...DEFAULT_CONFIG.reviews];
      }
      if (!this.config.logoMode) {
        this.config.logoMode = this.config.logoImage ? 'image' : (this.config.logoImageUrl ? 'url' : 'emoji');
      }
      if (!this.config.logoEmoji) {
        this.config.logoEmoji = '🎂';
      }
      if (typeof this.config.logoImage !== 'string') {
        this.config.logoImage = '';
      }
      if (typeof this.config.logoUrl !== 'string') {
        this.config.logoUrl = this.config.logoImageUrl || '';
      }
      if (!this.config.logoImageUrl && this.config.logoUrl) {
        this.config.logoImageUrl = this.config.logoUrl;
      }

      // Ensure economy settings exist & migrate legacy iqdRate
      if (!this.config.economy || typeof this.config.economy !== 'object') {
        this.config.economy = JSON.parse(JSON.stringify(DEFAULT_ECONOMY));
      } else {
        this.config.economy = { ...DEFAULT_ECONOMY, ...this.config.economy };
      }
      if (typeof this.config.iqdRate === 'number' && this.config.iqdRate > 0) {
        if (!this.config.economy.exchangeRate || this.config.economy.exchangeRate === 1310) {
          this.config.economy.exchangeRate = this.config.iqdRate;
        }
      }
    }

    try {
      this.users = JSON.parse(localStorage.getItem(KEYS.USERS)) || JSON.parse(JSON.stringify(DEFAULT_USERS));
    } catch {
      this.users = JSON.parse(JSON.stringify(DEFAULT_USERS));
    }

    // Ensure super admin account for yumy.swets@gmail.com exists
    let yumyAdmin = Array.isArray(this.users) && this.users.find(u => 
      (u.email && u.email.toLowerCase() === 'yumy.swets@gmail.com') ||
      (u.username && (u.username.toLowerCase() === 'yumy.swets' || u.username.toLowerCase() === 'yumy.swets@gmail.com'))
    );
    if (!yumyAdmin) {
      if (!Array.isArray(this.users)) this.users = JSON.parse(JSON.stringify(DEFAULT_USERS));
      this.users.push({
        id: 'dmfw78AEPYW1htK7rgqptaFRqs03',
        username: 'yumy.swets',
        email: 'yumy.swets@gmail.com',
        password: 'YummyAdmin2026!',
        name: 'Yummy Sweets Admin',
        role: 'admin'
      });
      this.saveUsers();
    } else {
      yumyAdmin.email = 'yumy.swets@gmail.com';
      yumyAdmin.role = 'admin';
      if (!yumyAdmin.password) {
        yumyAdmin.password = 'YummyAdmin2026!';
      }
      if (!yumyAdmin.username) {
        yumyAdmin.username = 'yumy.swets';
      }
    }

    try {
      this.products = JSON.parse(localStorage.getItem(KEYS.PRODUCTS)) || JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
    } catch {
      this.products = JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
    }

    // Ensure all products have img property, backfilling defaults if empty
    if (Array.isArray(this.products)) {
      const defaultMap = new Map(DEFAULT_PRODUCTS.map(dp => [dp.id, dp]));
      let hadChanges = false;
      this.products.forEach(p => {
        if (typeof p.img !== 'string') p.img = '';
        if (!p.img.trim() && defaultMap.has(p.id)) {
          p.img = defaultMap.get(p.id).img || '';
          hadChanges = true;
        }
      });
      if (hadChanges) {
        this.saveProducts();
      }
      if (!this.selectedProductId && this.products.length > 0) {
        this.selectedProductId = this.products[0].id;
        this.pendingImageData = this.products[0].img || '';
      }
    }

    try {
      this.session = JSON.parse(localStorage.getItem(KEYS.SESSION)) || null;
    } catch {
      this.session = null;
    }

    try {
      this.orders = JSON.parse(localStorage.getItem(KEYS.ORDERS)) || [];
    } catch {
      this.orders = [];
    }

    try {
      this.customerNotes = JSON.parse(localStorage.getItem(KEYS.CUSTOMER_NOTES)) || {};
    } catch {
      this.customerNotes = {};
    }

    try {
      const pref = JSON.parse(localStorage.getItem(KEYS.PREF));
      if (pref) {
        if (pref.lang) this.lang = pref.lang;
        if (pref.currency) this.currency = pref.currency;
      }
    } catch {
      this.lang = 'en';
      this.currency = 'USD';
    }
  },

  saveConfig() {
    localStorage.setItem(KEYS.CONFIG, JSON.stringify(this.config));
    if (db) setDoc(doc(db, 'config', 'main'), this.config).catch(e => handleFirestoreError(e, OperationType.WRITE, 'config/main'));
  },
  saveUsers() {
    localStorage.setItem(KEYS.USERS, JSON.stringify(this.users));
    if (db) {
      const batch = writeBatch(db);
      this.users.forEach(u => batch.set(doc(db, 'users', u.id), u));
      batch.commit().catch(e => handleFirestoreError(e, OperationType.WRITE, 'users'));
    }
  },
  saveOrders() {
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(this.orders));
    if (db) {
      const batch = writeBatch(db);
      this.orders.forEach(o => batch.set(doc(db, 'orders', o.id), o));
      batch.commit().catch(e => handleFirestoreError(e, OperationType.WRITE, 'orders'));
    }
  },
  saveCustomerNotes() {
    localStorage.setItem(KEYS.CUSTOMER_NOTES, JSON.stringify(this.customerNotes));
  },
  saveProducts() {
    try {
      localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(this.products));
      if (db) {
        const batch = writeBatch(db);
        this.products.forEach(p => batch.set(doc(db, 'products', p.id), p));
        batch.commit().catch(e => handleFirestoreError(e, OperationType.WRITE, 'products'));
      }
      return true;
    } catch (e) {
      console.error('Storage quota error:', e);
      this.showToast(this.t('storageQuotaError'), 'error');
      return false;
    }
  },
  saveSession() {
    if (this.session) {
      localStorage.setItem(KEYS.SESSION, JSON.stringify(this.session));
    } else {
      localStorage.removeItem(KEYS.SESSION);
    }
  },
  savePref() {
    localStorage.setItem(KEYS.PREF, JSON.stringify({ lang: this.lang, currency: this.currency }));
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
    const eco = this.getEconomy();
    const cur = overrideCurrency || this.currency;
    const hasSecondary = eco.showSecondary !== false && eco.secondaryCurrency && eco.secondaryCurrency !== 'None';

    if (cur !== 'USD' && hasSecondary) {
      const rate = Number(eco.exchangeRate) > 0 ? Number(eco.exchangeRate) : (this.config.iqdRate || 1310);
      const raw = Number(usdAmount || 0) * rate;
      const rule = parseInt(eco.roundingRule, 10) || 250;
      let rounded = raw;
      if (rule > 1) {
        rounded = Math.round(raw / rule) * rule;
      } else {
        rounded = Math.round(raw * 100) / 100;
      }
      const symbol = eco.currencySymbol || (eco.secondaryCurrency === 'IQD' ? 'د.ع' : eco.secondaryCurrency);
      if (rule > 1) {
        return new Intl.NumberFormat('en-US').format(rounded) + ' ' + symbol;
      }
      return symbol + ' ' + rounded.toFixed(2);
    }
    return '$' + Number(usdAmount || 0).toFixed(2);
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
    if (!wrap) return;
    const isKu = this.lang === 'ku';
    const faqs = (this.config && this.config.faq) ? this.config.faq : [];
    
    if (faqs.length === 0) {
      document.getElementById('faq').style.display = 'none';
      return;
    } else {
      document.getElementById('faq').style.display = 'block';
    }

    wrap.innerHTML = faqs.map(item => `
      <details class="faq-item">
        <summary class="faq-summary">${isKu ? (item.q.ku || item.q.en) : item.q.en}</summary>
        <div class="faq-content">
          ${isKu ? (item.a.ku || item.a.en) : item.a.en}
        </div>
      </details>
    `).join('');
  },

  renderReviews() {
    const grid = document.getElementById('reviewsGrid');
    if (!grid) return;
    const isKu = this.lang === 'ku';
    const reviews = (this.config && this.config.reviews) ? this.config.reviews : [];
    
    if (reviews.length === 0) {
      document.getElementById('reviews').style.display = 'none';
      return;
    } else {
      document.getElementById('reviews').style.display = 'block';
    }

    grid.innerHTML = reviews.map(item => `
      <div class="review-card">
        <div class="stars">★★★★★</div>
        <p class="review__quote">${isKu ? (item.quote.ku || item.quote.en) : item.quote.en}</p>
        <div class="review__author">
          <div class="review__avatar">${item.initials}</div>
          <div>
            <strong style="display:block;font-size:0.92rem;">${isKu ? (item.name.ku || item.name.en) : item.name.en}</strong>
            <span class="text-small" style="color:var(--muted);">${isKu ? (item.role.ku || item.role.en) : item.role.en}</span>
          </div>
        </div>
      </div>
    `).join('');
  },

  // Update all static data-i18n attributes
  renderI18nStatic() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = this.t(key);
      if (val) {
        if (val.includes('<') && val.includes('>')) {
          el.innerHTML = val;
        } else {
          el.textContent = val;
        }
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const val = this.t(key);
      if (val) el.setAttribute('placeholder', val);
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
        return res.replace(/\.00$/, '');
      };
      if (optUnder20) optUnder20.textContent = isKu ? `کەمتر لە ${formatBound(20)}` : `Under ${formatBound(20)}`;
      if (opt20to40) opt20to40.textContent = `${formatBound(20)} – ${formatBound(40)}`;
      if (opt40to60) opt40to60.textContent = `${formatBound(40)} – ${formatBound(60)}`;
      if (optOver60) optOver60.textContent = isKu ? `زیاتر لە ${formatBound(60)}` : `Over ${formatBound(60)}`;
    }
  },

  // Kurdish text normalization (harakat stripping & character normalization)
  normalizeKurdish(str) {
    if (!str) return '';
    return String(str)
      .toLowerCase()
      .replace(/[\u064B-\u065F\u0670]/g, '')
      .replace(/[يى]/g, 'ی')
      .replace(/ك/g, 'ک')
      .replace(/ه/g, 'ە')
      .trim();
  },

  // Highlight search query tokens inside text
  highlightMatch(text, rawQuery) {
    if (!rawQuery || !text) return text;
    const tokens = rawQuery.trim().split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return text;
    let result = String(text);
    tokens.forEach(tok => {
      try {
        const escaped = tok.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escaped})`, 'gi');
        result = result.replace(regex, '<mark class="search-highlight">$1</mark>');
      } catch {
        // regex character escape protection
      }
    });
    return result;
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
      if (btn) btn.classList.toggle('is-active', c === cat);
    });
    const mobSel = document.getElementById('mobileCategorySelect');
    if (mobSel) mobSel.value = cat;
    this.updateUrlHash();
    this.renderMenu(false);
  },

  parseUrlHash() {
    const hash = window.location.hash || '';
    if (hash.startsWith('#menu?') || hash.startsWith('#menu')) {
      const qIndex = hash.indexOf('?');
      if (qIndex !== -1) {
        const params = new URLSearchParams(hash.substring(qIndex + 1));
        if (params.has('q')) this.searchQuery = params.get('q') || '';
        if (params.has('cat')) this.category = params.get('cat') || 'all';
        if (params.has('sort')) this.sortOption = params.get('sort') || 'popular';
        if (params.has('range')) this.priceRange = params.get('range') || 'any';

        // Sync inputs
        const input = document.getElementById('menuSearchInput');
        if (input) {
          input.value = this.searchQuery;
          const clearBtn = document.getElementById('menuSearchClear');
          if (clearBtn) clearBtn.style.display = this.searchQuery ? 'block' : 'none';
        }
        const sortSel = document.getElementById('menuSortSelect');
        if (sortSel) sortSel.value = this.sortOption;
        const priceSel = document.getElementById('menuPriceSelect');
        if (priceSel) priceSel.value = this.priceRange;
        const catSel = document.getElementById('mobileCategorySelect');
        if (catSel) catSel.value = this.category;
        ['all', 'cakes', 'cupcakes', 'desserts'].forEach(c => {
          const btn = document.getElementById(`filter-${c}`);
          if (btn) btn.classList.toggle('is-active', c === this.category);
        });
      }
    }
  },

  updateUrlHash() {
    const params = new URLSearchParams();
    if (this.searchQuery && this.searchQuery.trim()) params.set('q', this.searchQuery.trim());
    if (this.category && this.category !== 'all') params.set('cat', this.category);
    if (this.sortOption && this.sortOption !== 'popular') params.set('sort', this.sortOption);
    if (this.priceRange && this.priceRange !== 'any') params.set('range', this.priceRange);

    const paramStr = params.toString();
    const newHash = paramStr ? `#menu?${paramStr}` : '#menu';
    if (window.location.hash !== newHash) {
      history.replaceState(null, '', newHash);
    }
  },

  // Category Filtering
  // Menu Grid Rendering with Search, Sort, Price Filter & Empty State
  renderMenu(animate = false) {
    const grid = document.getElementById('menuGrid');
    if (!grid) return;

    const isKu = this.lang === 'ku';

    // 1. Filter by category
    let filtered = this.products.filter(p => this.category === 'all' || p.category === this.category);

    // 2. Filter by price range
    if (this.priceRange === 'under-20') {
      filtered = filtered.filter(p => p.priceUSD < 20);
    } else if (this.priceRange === '20-40') {
      filtered = filtered.filter(p => p.priceUSD >= 20 && p.priceUSD <= 40);
    } else if (this.priceRange === '40-60') {
      filtered = filtered.filter(p => p.priceUSD >= 40 && p.priceUSD <= 60);
    } else if (this.priceRange === 'over-60') {
      filtered = filtered.filter(p => p.priceUSD > 60);
    }

    // 3. Filter by search query (tokens with Kurdish normalization)
    const rawQ = (this.searchQuery || '').trim();
    if (rawQ) {
      const tokens = rawQ.split(/\s+/).map(t => this.normalizeKurdish(t)).filter(Boolean);
      filtered = filtered.filter(p => {
        const haystack = [
          p.name?.en,
          p.desc?.en,
          p.name?.ku,
          p.desc?.ku,
          p.category,
          p.tag
        ].map(s => this.normalizeKurdish(s)).join(' ');

        return tokens.every(tok => haystack.includes(tok));
      });
    }

    // 4. Sort
    if (this.sortOption === 'popular') {
      filtered.sort((a, b) => {
        const aPop = a.tag === 'bestseller' ? 1 : 0;
        const bPop = b.tag === 'bestseller' ? 1 : 0;
        return bPop - aPop;
      });
    } else if (this.sortOption === 'newest') {
      filtered.sort((a, b) => {
        const aNew = a.tag === 'new' ? 1 : 0;
        const bNew = b.tag === 'new' ? 1 : 0;
        return bNew - aNew;
      });
    } else if (this.sortOption === 'price-asc') {
      filtered.sort((a, b) => a.priceUSD - b.priceUSD);
    } else if (this.sortOption === 'price-desc') {
      filtered.sort((a, b) => b.priceUSD - a.priceUSD);
    } else if (this.sortOption === 'name-asc') {
      filtered.sort((a, b) => {
        const nameA = isKu ? (a.name.ku || a.name.en) : a.name.en;
        const nameB = isKu ? (b.name.ku || b.name.en) : b.name.en;
        return nameA.localeCompare(nameB);
      });
    }

    // 5. Update results count
    const countEl = document.getElementById('menuResultsCount');
    if (countEl) {
      countEl.textContent = this.t('searchResultsCount')
        .replace('{shown}', filtered.length)
        .replace('{total}', this.products.length);
    }

    // 6. Handle Empty State
    if (filtered.length === 0) {
      const emptyTitle = rawQ
        ? this.t('searchNoResults').replace('{query}', rawQ)
        : this.t('searchNoResults').replace('"{query}"', '');
      grid.innerHTML = `
        <div class="menu-empty-state">
          <div class="menu-empty-icon">🍰</div>
          <h3 class="menu-empty-title">${emptyTitle}</h3>
          <p class="menu-empty-desc">${this.t('searchEmptyDesc')}</p>
          <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
            ${rawQ ? `<button type="button" class="btn btn--secondary btn--sm" onclick="app.clearSearch()">${this.t('searchClearSearch')}</button>` : ''}
            <button type="button" class="btn btn--primary btn--sm" onclick="app.clearAllFilters()">${this.t('searchClearAll')}</button>
          </div>
        </div>
      `;
      return;
    }

    // 7. Render cake cards
    grid.innerHTML = filtered.map((item, index) => {
      const rawName = isKu ? (item.name.ku || item.name.en) : item.name.en;
      const rawDesc = isKu ? (item.desc.ku || item.desc.en) : item.desc.en;
      const name = rawQ ? this.highlightMatch(rawName, rawQ) : rawName;
      const desc = rawQ ? this.highlightMatch(rawDesc, rawQ) : rawDesc;
      const unit = isKu ? (item.unit.ku || item.unit.en) : item.unit.en;
      const priceFormatted = this.formatPrice(item.priceUSD);

      let tagBadge = '';
      if (item.tag === 'bestseller') {
        tagBadge = `<span class="cake__tag cake__tag--bestseller">${this.t('tagBestseller')}</span>`;
      } else if (item.tag === 'new') {
        tagBadge = `<span class="cake__tag cake__tag--new">${this.t('tagNew')}</span>`;
      }

      const hasImg = Boolean(item.img && item.img.trim());
      const mediaHtml = hasImg
        ? `<img src="${item.img}" alt="${rawName}" loading="lazy" referrerpolicy="no-referrer" class="cake-card__img" onerror="this.style.display='none';if(this.nextElementSibling)this.nextElementSibling.style.display='flex';" /><div class="cake-card__emoji" style="display:none;" aria-label="${rawName}">${item.emoji || '🎂'}</div>`
        : `<div class="cake-card__emoji" aria-label="${rawName}">${item.emoji || '🎂'}</div>`;

      const animClass = animate ? 'cake-card-animate' : '';
      const animStyle = animate ? `style="--stagger:${index % 12};"` : '';

      return `
        <article class="cake-card ${animClass}" id="product-${item.id}" ${animStyle}>
          <div class="cake-card__media">
            ${mediaHtml}
            ${tagBadge}
            <span class="cake-card__count" data-count-for="${item.id}" hidden></span>
          </div>
          <div class="cake-card__body">
            <h3 class="cake-card__title">${name}</h3>
            <p class="cake-card__desc">${desc}</p>
            <div class="cake-card__footer">
              <div class="price-wrap">
                <span class="price">${priceFormatted}</span>
                <span class="price-unit">${unit}</span>
              </div>
              <button class="btn btn--primary btn--sm" onclick="app.openCustomizeModal('${item.id}')" aria-label="${this.t('btnAdd')} ${rawName}">
                ${this.t('btnAdd')}
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
    this.syncMenuOrderState();
  },

  // Mark menu cards that are already in the order, so shoppers can see what they picked
  syncMenuOrderState() {
    const counts = new Map();
    for (const item of this.order || []) {
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
    if (mode === 'image' && c.logoImage && c.logoImage.trim() !== '') {
      return c.logoImage;
    }
    if (mode === 'url' && (c.logoUrl || c.logoImageUrl) && (c.logoUrl || c.logoImageUrl).trim() !== '') {
      return c.logoUrl || c.logoImageUrl;
    }
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
      const emoji = (this.config && this.config.logoEmoji) || '🎂';
      // High-resolution SVG favicon on berry background (#8E3B4A)
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#8E3B4A"/><text x="32" y="46" font-size="38" text-anchor="middle">${emoji}</text></svg>`;
      link.href = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
    }
  },

  renderLogoElements() {
    const src = this.resolveLogoSrc();
    const emoji = (this.config && this.config.logoEmoji) || '🎂';
    const shopName = this.getShopName();

    const logoElements = document.querySelectorAll('[data-logo]');
    logoElements.forEach(el => {
      // 200ms smooth fade between old and new state
      el.style.opacity = '0';
      setTimeout(() => {
        if (src) {
          el.innerHTML = `<img src="${src}" alt="${shopName}" class="logo__img" onerror="this.onerror=null;this.parentElement.textContent='${emoji}';" />`;
        } else {
          el.textContent = emoji;
        }
        el.style.opacity = '1';
      }, 50);
    });
  },

  // Render Config-driven Brand, Contact & Footer
  renderBranding() {
    const c = this.config;
    const isKu = this.lang === 'ku';

    const shopName = this.getShopName();
    const tagline = isKu ? (c.tagline.ku || c.tagline.en) : c.tagline.en;
    const announcement = isKu ? (c.announcement.ku || c.announcement.en) : c.announcement.en;
    const story = isKu ? (c.aboutUs.ku || c.aboutUs.en) : c.aboutUs.en;
    const address = isKu ? (c.contact.address.ku || c.contact.address.en) : c.contact.address.en;
    const hours = isKu ? (c.contact.hours.ku || c.contact.hours.en) : c.contact.hours.en;

    // Document Title
    document.title = `${shopName} — ${tagline}`;

    // Header & Footer Logo
    const headerShopName = document.getElementById('headerShopName');
    if (headerShopName) headerShopName.textContent = shopName;

    const footerShopName = document.getElementById('footerShopName');
    if (footerShopName) footerShopName.textContent = shopName;

    const mobileShopName = document.getElementById('mobileShopName');
    if (mobileShopName) mobileShopName.textContent = shopName;

    const copyrightName = document.getElementById('copyrightName');
    if (copyrightName) copyrightName.textContent = shopName;

    const copyrightYear = document.getElementById('copyrightYear');
    if (copyrightYear) copyrightYear.textContent = new Date().getFullYear();

    const headerTagline = document.getElementById('headerShopTagline');
    if (headerTagline) headerTagline.textContent = tagline;

    // Reactively update logo tiles and browser favicon
    this.renderLogoElements();
    this.updateFavicon();

    // Announcement Bar
    const announcementEl = document.getElementById('announcementText');
    if (announcementEl) announcementEl.innerHTML = announcement;

    // Story section
    const storyTextEl = document.getElementById('storyText');
    if (storyTextEl) storyTextEl.textContent = story;

    const storyEyebrow = isKu ? (c.aboutUs.eyebrowKu || c.aboutUs.eyebrowEn || 'کەلەپووری ئێمە') : (c.aboutUs.eyebrowEn || 'Our Heritage');
    const storyTitle = isKu ? (c.aboutUs.titleKu || c.aboutUs.titleEn || 'بە ئارامگرتن ئامادە کراوە، بە خۆشەویستی برژاوە') : (c.aboutUs.titleEn || 'Crafted with patience, baked with devotion');
    const storyImageUrl = c.aboutUs.imageUrl || 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=900&auto=format&fit=crop&q=80';

    const eyebrowEl = document.querySelector('[data-i18n="storyEyebrow"]');
    if (eyebrowEl) eyebrowEl.textContent = storyEyebrow;
    
    const titleEl = document.querySelector('[data-i18n="storyTitle"]');
    if (titleEl) titleEl.textContent = storyTitle;
    
    const imgEl = document.querySelector('.story__img');
    if (imgEl) imgEl.src = storyImageUrl;

    // Contact Cards
    const infoAddress = document.getElementById('infoAddress');
    if (infoAddress) infoAddress.textContent = address;

    const infoHours = document.getElementById('infoHours');
    if (infoHours) infoHours.innerHTML = hours.replace(/\n/g, '<br/>');

    const infoContact = document.getElementById('infoContact');
    if (infoContact) {
      infoContact.innerHTML = `WhatsApp: +${c.contact.whatsapp}<br/>${c.contact.email}<br/>${c.contact.phone}`;
    }

    // Footer info
    const footerHours = document.getElementById('footerHours');
    if (footerHours) footerHours.innerHTML = hours.replace(/\n/g, '<br/>');

    const footerPhone = document.getElementById('footerPhone');
    if (footerPhone) footerPhone.textContent = c.contact.phone;

    // Social Links (empty URL = hide the icon instead of linking to a placeholder)
    const socials = c.socials || {};
    [
      ['socialInsta', socials.instagram],
      ['socialFb', socials.facebook],
      ['socialTiktok', socials.tiktok],
      ['socialSnap', socials.snapchat]
    ].forEach(([id, rawUrl]) => {
      const el = document.getElementById(id);
      if (!el) return;
      const url = (rawUrl || '').trim();
      const hasUrl = url !== '' && url !== '#';
      el.href = hasUrl ? url : '#';
      el.style.display = hasUrl ? '' : 'none';
    });
  },

  // Order Tray & WhatsApp Cart
  addToOrder(productId, exclude = []) {
    const existing = this.order.find(item => item.productId === productId && item.exclude.join('|') === exclude.join('|'));
    if (existing) {
      existing.qty++;
    } else {
      this.order.push({
        id: this.generateId(),
        productId,
        qty: 1,
        exclude: [...exclude]
      });
    }
    this.renderTray();
    this.showToast(this.t('toastAdded'), 'success');
  },
  
  openCustomizeModal(productId) {
    const prod = this.products.find(p => p.id === productId);
    if (!prod) return;
    
    if (!prod.exclusions || prod.exclusions.length === 0) {
      this.addToOrder(productId);
      return;
    }
    
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay is-open';
    overlay.style.zIndex = '1000';
    
    const isKu = this.lang === 'ku';
    const title = isKu ? (prod.name.ku || prod.name.en) : prod.name.en;
    
    let html = `
      <div class="modal-window" style="max-width:400px; padding: 24px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 16px;">
          <h2 style="font-family:var(--font-serif); font-size: 1.2rem; color:var(--cocoa); margin:0;">${this.t('customizeTitle') || 'Customize'}</h2>
          <button class="modal-close" style="background:none;border:none;font-size:1.5rem;cursor:pointer;color:var(--muted);" onclick="this.closest('.modal-overlay').remove()">×</button>
        </div>
        <h4 style="font-family:var(--font-serif);margin-top:0;margin-bottom:12px;color:var(--ink);">${title}</h4>
        <p style="font-weight:600;margin-bottom:12px;color:var(--cocoa-soft);">${this.t('customizeLeaveOut') || 'Leave out'}:</p>
        <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:24px;">
    `;
    
    prod.exclusions.forEach(ex => {
      const label = isKu ? (ex.ku || ex.en) : ex.en;
      html += `
        <label style="display:flex;align-items:center;gap:10px;cursor:pointer;color:var(--ink);">
          <input type="checkbox" class="customize-exclude-cb" value="${ex.id}" style="width:18px;height:18px;" />
          <span>${label}</span>
        </label>
      `;
    });
    
    html += `
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
          <button type="button" class="btn btn--ghost btn--sm" style="flex:1;" onclick="app.addToOrder('${productId}'); this.closest('.modal-overlay').remove()">${this.t('customizeSkip') || 'Skip — add as is'}</button>
          <button type="button" class="btn btn--primary btn--sm" style="flex:1;" onclick="
            const cbs = Array.from(this.closest('.modal-window').querySelectorAll('.customize-exclude-cb'));
            const excludes = cbs.filter(cb => cb.checked).map(cb => cb.value);
            app.addToOrder('${productId}', excludes);
            this.closest('.modal-overlay').remove();
          ">${this.t('customizeAdd') || 'Add to order'}</button>
        </div>
      </div>
    `;
    
    overlay.innerHTML = html;
    document.body.appendChild(overlay);
  },

  clearOrder() {
    this.order = [];
    this.orderNote = '';
    const noteEl = document.getElementById('trayOrderNote');
    if (noteEl) noteEl.value = '';
    this.appliedPromoCode = '';
    this.trayBreakdownOpen = false;
    this.renderTray();
    this.showToast(this.t('toastOrderCleared'));
  },

  computeCartBreakdown(subtotalUSD = 0, enteredPromoCode = null, customEconomy = null) {
    const eco = customEconomy || this.getEconomy();
    const subtotal = Math.max(0, Number(subtotalUSD) || 0);

    // Discount Calculation
    let discount = 0;
    let promoCodeName = '';
    let promoValid = false;
    let promoExpired = false;

    const testCode = (enteredPromoCode !== null ? enteredPromoCode : (this.appliedPromoCode || '')).trim().toUpperCase();
    const activeCode = (eco.promoCode || '').trim().toUpperCase();

    if (activeCode && testCode && testCode === activeCode) {
      if (eco.promoExpiry) {
        const expiryDate = new Date(eco.promoExpiry + 'T23:59:59');
        if (!isNaN(expiryDate.getTime()) && new Date() > expiryDate) {
          promoExpired = true;
        }
      }
      if (!promoExpired) {
        promoValid = true;
        promoCodeName = activeCode;
        const pVal = Math.max(0, Number(eco.promoValue) || 0);
        if (eco.promoType === 'percent') {
          discount = Math.min(subtotal, (subtotal * pVal) / 100);
        } else {
          discount = Math.min(subtotal, pVal);
        }
      }
    }

    // Delivery Calculation
    let delivery = 0;
    const isPickupOnly = Boolean(eco.pickupOnly);
    let isFreeDelivery = false;
    const fee = Math.max(0, Number(eco.deliveryFee) || 0);
    const threshold = Math.max(0, Number(eco.freeDeliveryOver) || 0);

    if (isPickupOnly) {
      delivery = 0;
    } else if (threshold === 0) {
      delivery = 0;
      isFreeDelivery = true;
    } else if (subtotal >= threshold) {
      delivery = 0;
      isFreeDelivery = true;
    } else {
      delivery = fee;
    }

    // Tax Calculation (added only if taxEnabled and taxIncluded === false)
    let tax = 0;
    const taxRate = Math.min(30, Math.max(0, Number(eco.taxRate) || 0));
    const taxableAmount = Math.max(0, subtotal - discount);
    const taxLabel = (eco.taxLabel || 'VAT').trim();

    if (eco.taxEnabled && !eco.taxIncluded && taxRate > 0) {
      tax = (taxableAmount * taxRate) / 100;
    }

    const total = Math.max(0, subtotal - discount + delivery + tax);

    // Minimum Order Calculation
    const minOrder = Math.max(0, Number(eco.minimumOrder) || 0);
    const minOrderMet = minOrder === 0 || subtotal >= minOrder;
    const minOrderRemaining = minOrderMet ? 0 : Math.max(0, minOrder - subtotal);

    return {
      subtotal,
      discount,
      promoCodeName,
      promoValid,
      promoExpired,
      delivery,
      isPickupOnly,
      isFreeDelivery,
      deliveryFeeConfig: fee,
      freeDeliveryOverConfig: threshold,
      tax,
      taxRate,
      taxLabel,
      taxEnabled: Boolean(eco.taxEnabled),
      taxIncluded: Boolean(eco.taxIncluded),
      total,
      minOrder,
      minOrderMet,
      minOrderRemaining
    };
  },

  toggleTrayBreakdown() {
    this.trayBreakdownOpen = !this.trayBreakdownOpen;
    const bd = document.getElementById('trayBreakdown');
    const toggleBtn = document.getElementById('btnTrayToggle');
    const label = document.getElementById('trayToggleLabel');
    if (bd) bd.style.display = this.trayBreakdownOpen ? 'flex' : 'none';
    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', this.trayBreakdownOpen ? 'true' : 'false');
    if (label) label.textContent = this.trayBreakdownOpen ? this.t('trayDetailsClose') : this.t('trayDetails');
  },

  applyCartPromo() {
    const input = document.getElementById('trayPromoInput');
    if (!input) return;
    const code = input.value.trim().toUpperCase();
    if (!code) return;

    const eco = this.getEconomy();
    const activeCode = (eco.promoCode || '').trim().toUpperCase();

    if (!activeCode || code !== activeCode) {
      this.showToast(this.t('invalidPromo'), 'error');
      const feedback = document.getElementById('trayPromoFeedback');
      if (feedback) {
        feedback.textContent = '✕ Invalid promo code';
        feedback.style.color = '#fca5a5';
      }
      return;
    }

    // Check expiry
    if (eco.promoExpiry) {
      const expDate = new Date(eco.promoExpiry + 'T23:59:59');
      if (!isNaN(expDate.getTime()) && new Date() > expDate) {
        this.showToast(this.t('promoExpired'), 'error');
        const feedback = document.getElementById('trayPromoFeedback');
        if (feedback) {
          feedback.textContent = `⚠️ ${this.t('promoExpired')}`;
          feedback.style.color = '#fca5a5';
        }
        return;
      }
    }

    this.appliedPromoCode = activeCode;
    const msg = this.t('promoApplied').replace('{code}', activeCode);
    this.showToast(msg, 'success');
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

    const isKu = this.lang === 'ku';
    const productMap = new Map(this.products.map(p => [p.id, p]));

    let totalCount = 0;
    let subtotalUSD = 0;
    const itemNames = [];

    for (const item of this.order) {
      if (item.qty > 0 && productMap.has(item.productId)) {
        const prod = productMap.get(item.productId);
        totalCount += item.qty;
        subtotalUSD += prod.priceUSD * item.qty;
        const name = isKu ? (prod.name.ku || prod.name.en) : prod.name.en;
        itemNames.push(`${item.qty}× ${name}`);
      }
    }

    document.body.classList.toggle('has-order-tray', totalCount > 0);
    this.syncMenuOrderState();

    if (totalCount === 0) {
      tray.classList.remove('is-visible');
      this.trayBreakdownOpen = false;
      const bd = document.getElementById('trayBreakdown');
      if (bd) bd.style.display = 'none';
      return;
    }

    tray.classList.add('is-visible');

    const breakdown = this.computeCartBreakdown(subtotalUSD);

    const noteEl = document.getElementById('trayOrderNote');
    if (noteEl && noteEl.value !== this.orderNote) {
      noteEl.value = this.orderNote || '';
    }
    const countEl = document.getElementById('trayItemCount');
    if (countEl) countEl.textContent = totalCount;

    const priceEl = document.getElementById('trayTotalPrice');
    if (priceEl) priceEl.textContent = this.formatPrice(breakdown.total);

    const previewEl = document.getElementById('trayPreviewText');
    if (previewEl) previewEl.textContent = itemNames.join(', ');

    const freeBadge = document.getElementById('trayFreeDeliveryBadge');
    if (freeBadge) {
      freeBadge.style.display = (breakdown.isFreeDelivery && !breakdown.isPickupOnly) ? 'inline-block' : 'none';
    }

    // Minimum order warning & WhatsApp button disabled state
    const btnSend = document.getElementById('btnTrayWhatsApp');
    const minNotice = document.getElementById('trayMinOrderNotice');
    if (!breakdown.minOrderMet) {
      const minText = this.formatPrice(breakdown.minOrder);
      const remText = this.formatPrice(breakdown.minOrderRemaining);
      const warnMsg = this.t('minimumOrderWarning')
        .replace('{amount}', minText)
        .replace('{remaining}', remText);

      if (btnSend) {
        btnSend.disabled = true;
        btnSend.classList.add('is-disabled');
        btnSend.title = warnMsg;
      }
      if (minNotice) {
        minNotice.style.display = 'flex';
        minNotice.innerHTML = `<span>⚠️</span> <span>${warnMsg}</span>`;
      }
    } else {
      if (btnSend) {
        btnSend.disabled = false;
        btnSend.classList.remove('is-disabled');
        btnSend.removeAttribute('title');
      }
      if (minNotice) {
        minNotice.style.display = 'none';
        minNotice.innerHTML = '';
      }
    }

    // Detailed breakdown rows in drawer
    const bdLines = document.getElementById('trayBreakdownLines');
    if (bdLines) {
      let rows = '';
      rows += `<div class="tray-breakdown-row"><span>${this.t('subtotal')}</span><span>${this.formatPrice(breakdown.subtotal)}</span></div>`;

      if (breakdown.discount > 0) {
        rows += `<div class="tray-breakdown-row" style="color:#4ade80;"><span>${this.t('discount')} (${breakdown.promoCodeName})</span><span>−${this.formatPrice(breakdown.discount)}</span></div>`;
      }

      if (breakdown.isPickupOnly) {
        rows += `<div class="tray-breakdown-row"><span>${this.t('economyDelivery')}</span><span>${isKu ? 'وەرگرتن لە چێشتخانە' : 'Pickup Only'}</span></div>`;
      } else if (breakdown.isFreeDelivery) {
        rows += `<div class="tray-breakdown-row"><span>${this.t('deliveryFee')}</span><span style="color:#4ade80;font-weight:700;">${this.t('freeDelivery')}</span></div>`;
      } else {
        rows += `<div class="tray-breakdown-row"><span>${this.t('deliveryFee')}</span><span>${this.formatPrice(breakdown.delivery)}</span></div>`;
      }

      if (breakdown.tax > 0) {
        rows += `<div class="tray-breakdown-row"><span>${this.t('tax')} (${breakdown.taxLabel} ${breakdown.taxRate}%)</span><span>+${this.formatPrice(breakdown.tax)}</span></div>`;
      }

      rows += `<div class="tray-breakdown-row tray-breakdown-row--total"><span>${this.t('total')}</span><span style="color:var(--berry);">${this.formatPrice(breakdown.total)}</span></div>`;

      bdLines.innerHTML = rows;
    }

    // Promo code input / applied banner
    const promoArea = document.getElementById('trayPromoArea');
    if (promoArea) {
      if (breakdown.promoValid) {
        promoArea.innerHTML = `
          <div style="display:flex;align-items:center;justify-content:space-between;background:rgba(34,197,94,0.15);border:1px solid rgba(34,197,94,0.3);padding:6px 12px;border-radius:8px;font-size:0.82rem;">
            <span style="color:#4ade80;font-weight:600;">✓ ${this.t('promoApplied').replace('{code}', breakdown.promoCodeName)}</span>
            <button type="button" class="btn btn--xs btn--ghost" style="padding:2px 6px;color:#fca5a5;border:none;" onclick="app.removeCartPromo()">✕ ${this.t('trayRemovePromo')}</button>
          </div>
        `;
      } else {
        promoArea.innerHTML = `
          <div class="tray-promo-row">
            <input type="text" id="trayPromoInput" class="tray-promo-input" placeholder="${this.t('trayPromoPlaceholder')}..." maxlength="20" onkeydown="if(event.key==='Enter'){event.preventDefault();app.applyCartPromo();}" />
            <button type="button" class="btn btn--xs btn--primary" id="btnApplyPromo" onclick="app.applyCartPromo()">${this.t('trayApplyPromo')}</button>
          </div>
          <div id="trayPromoFeedback" class="tray-promo-feedback"></div>
        `;
      }
    }

    // Guest notice in tray
    const guestNotice = document.getElementById('trayGuestNotice');
    if (guestNotice) {
      guestNotice.style.display = !this.session ? 'block' : 'none';
    }
  },

  checkoutWhatsApp() {
    const productMap = new Map(this.products.map(p => [p.id, p]));
    const isKu = this.lang === 'ku';
    const c = this.config;
    const eco = this.getEconomy();
    const shopName = isKu ? (c.shopName.ku || c.shopName.en) : c.shopName.en;

    const items = [];
    const snapshottedItems = [];
    let subtotalUSD = 0;

    for (const item of this.order) {
      if (item.qty > 0 && productMap.has(item.productId)) {
        const p = productMap.get(item.productId);
        const itemSubtotal = p.priceUSD * item.qty;
        subtotalUSD += itemSubtotal;
        const name = isKu ? (p.name.ku || p.name.en) : p.name.en;
        
        let line = `• ${item.qty} × ${name} — ${itemSubtotal.toFixed(2)}`;
        if (item.exclude && item.exclude.length > 0) {
          const exLabels = item.exclude.map(exId => {
            if (p.exclusions) {
              const exDef = p.exclusions.find(x => x.id === exId);
              if (exDef) return isKu ? (exDef.ku || exDef.en) : exDef.en;
            }
            return exId;
          });
          const noWord = this.t('waExclude') || 'No';
          line += `\n   ${noWord} ${exLabels.join(' · ' + noWord + ' ')}`;
        }
        items.push(line);
        
        snapshottedItems.push({
          productId: p.id,
          qty: item.qty,
          exclude: item.exclude || [],
          nameSnapshot: name,
          usdSnapshot: p.priceUSD
        });
      }
    }

    if (items.length === 0) return;

    const breakdown = this.computeCartBreakdown(subtotalUSD);

    const dateInput = document.getElementById('trayFulfillmentDate');
    const fulfillmentDate = dateInput ? dateInput.value : '';
    
    if (dateInput && !fulfillmentDate) {
      this.showToast('Please select a requested delivery/pickup date.', 'warning');
      dateInput.focus();
      return;
    }

    // Minimum order check
    if (!breakdown.minOrderMet) {
      const minText = this.formatPrice(breakdown.minOrder);
      const remText = this.formatPrice(breakdown.minOrderRemaining);
      const warnMsg = this.t('minimumOrderWarning')
        .replace('{amount}', minText)
        .replace('{remaining}', remText);
      this.showToast(warnMsg, 'warning');
      return;
    }

    // Build breakdown lines (omit 0 values)
    const breakdownLines = [];
    breakdownLines.push(`${this.t('subtotal')}: $${breakdown.subtotal.toFixed(2)}`);

    if (breakdown.discount > 0) {
      const promoSuffix = breakdown.promoCodeName ? ` (${breakdown.promoCodeName})` : '';
      breakdownLines.push(`${this.t('discount')}${promoSuffix}: −$${breakdown.discount.toFixed(2)}`);
    }

    if (!breakdown.isPickupOnly) {
      if (breakdown.isFreeDelivery) {
        breakdownLines.push(`${this.t('deliveryFee')}: ${this.t('freeDelivery')}`);
      } else if (breakdown.delivery > 0) {
        breakdownLines.push(`${this.t('deliveryFee')}: $${breakdown.delivery.toFixed(2)}`);
      }
    } else {
      breakdownLines.push(`${this.t('fieldPickupOnly')}: ${isKu ? 'وەرگرتن لە چێشتخانە' : 'Pickup available'}`);
    }

    if (breakdown.tax > 0) {
      breakdownLines.push(`${this.t('tax')} (${breakdown.taxLabel} ${breakdown.taxRate}%): +$${breakdown.tax.toFixed(2)}`);
    }

    breakdownLines.push('────────────────');

    let totalLine = `${this.t('total')}: $${breakdown.total.toFixed(2)}`;
    if (this.currency !== 'USD' && eco.showSecondary !== false && eco.secondaryCurrency && eco.secondaryCurrency !== 'None') {
      const secondaryFormatted = this.formatPrice(breakdown.total);
      totalLine = `${this.t('total')}: ${secondaryFormatted} ($${breakdown.total.toFixed(2)} USD)`;
    }
    breakdownLines.push(totalLine);

    let customerName = '';
    if (this.session && this.session.user && this.session.user.name) {
      customerName = this.session.user.name;
    }

    let msg = '';
    if (isKu) {
      msg = `سڵاو لە ${shopName}! دەمەوێت ئەم داواکارییە تۆمار بکەم:\n\n${items.join('\n')}\n\n${breakdownLines.join('\n')}\n\nناوی کڕیار: ${customerName}\nبەروار و کاتی گەیاندن: ${fulfillmentDate}\nناونیشانی تەواو: `;
    } else {
      msg = `Hello ${shopName}! I'd like to place an order:\n\n${items.join('\n')}\n\n${breakdownLines.join('\n')}\n\nCustomer Name: ${customerName}\nPreferred Delivery Date/Time: ${fulfillmentDate}\nDelivery Address: `;
    }

    if (this.orderNote) {
      msg += `\n\n${this.t('waNote') || 'Note for the baker'}: ${this.orderNote}`;
    }

    // Save immutable snapshot to orders history if user is signed in
    if (this.session && this.session.user) {
      const u = this.session.user;
      const orderRecord = {
        id: 'ord_' + Date.now(),
        customerId: u.id || ('u_' + Date.now()),
        customerName: u.name || u.username || 'Customer',
        customerMobile: u.phone || u.mobile || '',
        createdAt: Date.now(),
        status: 'pending',
        items: snapshottedItems,
        economy: {
          currency: this.currency,
          exchangeRate: Number(eco.exchangeRate) || 1310,
          subtotal: breakdown.subtotal,
          discount: breakdown.discount,
          deliveryFee: breakdown.delivery,
          tax: breakdown.tax,
          total: breakdown.total,
          secondaryCurrency: eco.secondaryCurrency || 'IQD',
          roundingRule: eco.roundingRule || 250,
          currencySymbol: eco.currencySymbol || 'د.ع'
        },
        notes: '',
        deliveryDate: '',
        deliveryAddress: ''
      };
      this.orders.unshift(orderRecord);
      this.saveOrders();
      this.updateAuthUI();
    }

    const whatsappNum = (this.config.contact.whatsapp || WHATSAPP_NUMBER).replace(/\D/g, '');
    const url = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  },

  openWhatsAppDirect() {
    const whatsappNum = (this.config.contact.whatsapp || WHATSAPP_NUMBER).replace(/\D/g, '');
    const isKu = this.lang === 'ku';
    const shopName = isKu ? (this.config.shopName.ku || this.config.shopName.en) : this.config.shopName.en;
    const msg = isKu ? `سڵاو ${shopName}! دەمەوێت پرسیار لەسەر کێکەکان بکەم.` : `Hello ${shopName}! I have an inquiry regarding your cakes.`;
    window.open(`https://wa.me/${whatsappNum}?text=${encodeURIComponent(msg)}`, '_blank');
  },

  // Auth System: Customer & Staff (Admin / Developer)
  updateAuthUI() {
    const desktopContainer = document.getElementById('desktopAuthContainer');
    const mobileContainer = document.getElementById('mobileAuthContainer');

    let html = '';
    if (!this.session) {
      html = `<button class="btn btn--primary btn--sm" onclick="app.openAuthModal()">${this.t('btnSignIn')}</button>`;
    } else {
      const u = this.session.user;
      const isStaff = u.role === 'admin' || u.role === 'dev' || u.role === 'staff';
      const isCustomer = u.role === 'customer';
      const roleBadgeClass = u.role === 'dev' ? 'badge--dev' : (u.role === 'admin' ? 'badge--admin' : 'badge--customer');

      const custOrders = this.getCustomerOrders(u.id, u.phone);
      const hasRecentOrder = isCustomer && custOrders.some(o => (Date.now() - o.createdAt < 24 * 60 * 60 * 1000));

      const myOrdersBtn = isCustomer ? `
        <button type="button" class="btn btn--ghost btn--sm my-orders-btn" onclick="app.openHistoryModal()">
          ${hasRecentOrder ? '<span class="order-badge-dot" title="Recent order active"></span>' : ''}
          <span>${this.t('myOrders')}</span>
        </button>
      ` : '';

      html = `
        <div class="user-chip">
          <span class="badge ${roleBadgeClass}">${u.role.toUpperCase()}</span>
          <span style="font-weight:600;">${u.name || u.username}</span>
          ${myOrdersBtn}
          ${isStaff ? `<button class="btn btn--ghost btn--sm" style="padding:4px 8px;font-size:0.78rem;" onclick="app.openPanelModal()">${this.t('btnPanel')}</button>` : ''}
          <button class="btn btn--ghost btn--sm" style="padding:4px 8px;font-size:0.78rem;" onclick="app.logout()" title="${this.t('btnLogout')}">✕</button>
        </div>
      `;
    }

    if (desktopContainer) desktopContainer.innerHTML = html;
    if (mobileContainer) mobileContainer.innerHTML = html;
  },

  // Customer Order History Methods
  getCustomerOrders(userId, userPhone) {
    if (!this.orders) return [];
    return this.orders.filter(o => {
      if (userId && o.customerId === userId) return true;
      if (userPhone && o.customerMobile && o.customerMobile.replace(/\D/g, '') === String(userPhone).replace(/\D/g, '')) return true;
      return false;
    });
  },

  openHistoryModal() {
    if (!this.session || !this.session.user) {
      this.openAuthModal();
      return;
    }
    const modal = document.getElementById('historyModal');
    if (modal) modal.classList.add('is-open');
    this.renderCustomerHistory();
  },

  closeHistoryModal() {
    const modal = document.getElementById('historyModal');
    if (modal) modal.classList.remove('is-open');
  },

  toggleHistoryDetails(orderId) {
    this.historyDetailsOpen[orderId] = !this.historyDetailsOpen[orderId];
    this.renderCustomerHistory();
  },

  reorderItems(orderId) {
    const order = this.orders.find(o => o.id === orderId);
    if (!order || !order.items || order.items.length === 0) return;

    const productMap = new Map(this.products.map(p => [p.id, p]));
    let countAdded = 0;

    order.items.forEach(item => {
      if (productMap.has(item.productId)) {
        const exclude = item.exclude || [];
        const existing = this.order.find(o => o.productId === item.productId && o.exclude.join('|') === exclude.join('|'));
        if (existing) {
          existing.qty += (item.qty || 1);
        } else {
          this.order.push({
            id: this.generateId(),
            productId: item.productId,
            qty: item.qty || 1,
            exclude: [...exclude]
          });
        }
        countAdded += (item.qty || 1);
      }
    });
    if (order.orderNote) {
      this.orderNote = order.orderNote;
    }

    if (countAdded > 0) {
      this.closeHistoryModal();
      this.renderTray();
      const msg = this.t('orderAddedToTray').replace('{count}', countAdded);
      this.showToast(msg, 'success');
    } else {
      this.showToast(this.t('itemsNotAvailable'), 'warning');
    }
  },

  renderCustomerHistory() {
    const modal = document.getElementById('historyModal');
    if (!modal) return;

    const u = this.session ? this.session.user : null;
    if (!u) {
      this.closeHistoryModal();
      return;
    }

    const isKu = this.lang === 'ku';
    const customerOrders = this.getCustomerOrders(u.id, u.phone);

    // Header & Subtitle
    const titleEl = document.getElementById('historyModalTitle');
    if (titleEl) titleEl.textContent = this.t('myOrdersTitle');

    const subtitleEl = document.getElementById('historyModalSubtitle');
    if (subtitleEl) {
      if (customerOrders.length > 0) {
        const earliest = Math.min(...customerOrders.map(o => o.createdAt || Date.now()));
        const earliestDate = new Date(earliest).toLocaleDateString(isKu ? 'ku' : 'en-US', { month: 'short', year: 'numeric' });
        subtitleEl.textContent = this.t('myOrdersSubtitle')
          .replace('{count}', customerOrders.length)
          .replace('{date}', earliestDate);
      } else {
        subtitleEl.textContent = this.t('myOrdersEmpty');
      }
    }

    // Customer Stats Summary Bar
    const statsEl = document.getElementById('historyCustomerStats');
    if (statsEl) {
      if (customerOrders.length > 0) {
        const totalOrders = customerOrders.length;
        let totalSpentUSD = 0;
        const itemFreq = {};

        customerOrders.forEach(o => {
          totalSpentUSD += (o.economy && typeof o.economy.total === 'number') ? o.economy.total : 0;
          if (Array.isArray(o.items)) {
            o.items.forEach(it => {
              const name = it.nameSnapshot || it.productId;
              itemFreq[name] = (itemFreq[name] || 0) + (it.qty || 1);
            });
          }
        });

        let favItem = '—';
        let maxCount = 0;
        for (const [name, cnt] of Object.entries(itemFreq)) {
          if (cnt > maxCount) {
            maxCount = cnt;
            favItem = name;
          }
        }

        statsEl.style.display = 'grid';
        statsEl.innerHTML = `
          <div class="history-stat-card">
            <span class="history-stat-label">${this.t('myOrdersTotalOrders')}</span>
            <span class="history-stat-val">${totalOrders}</span>
          </div>
          <div class="history-stat-card">
            <span class="history-stat-label">${this.t('myOrdersTotalSpent')}</span>
            <span class="history-stat-val">${this.formatPrice(totalSpentUSD)}</span>
          </div>
          <div class="history-stat-card">
            <span class="history-stat-label">${this.t('myOrdersFavourite')}</span>
            <span class="history-stat-val" style="font-size:0.95rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${favItem}">${favItem}</span>
          </div>
        `;
      } else {
        statsEl.style.display = 'none';
        statsEl.innerHTML = '';
      }
    }

    // Orders List / Empty State
    const listEl = document.getElementById('historyOrdersList');
    if (!listEl) return;

    if (customerOrders.length === 0) {
      listEl.innerHTML = `
        <div class="history-empty-state">
          <div class="history-empty-icon">📦</div>
          <h4 class="history-empty-title">${this.t('myOrdersEmpty')}</h4>
          <p class="history-empty-hint">${this.t('myOrdersEmptyHint')}</p>
          <button type="button" class="btn btn--primary btn--sm" onclick="app.closeHistoryModal();document.getElementById('menu').scrollIntoView({behavior:'smooth'});">${this.t('myOrdersBrowse')}</button>
        </div>
      `;
      return;
    }

    listEl.innerHTML = customerOrders.map(order => {
      const dateStr = new Date(order.createdAt).toLocaleDateString(isKu ? 'ku' : 'en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      const statusMap = {
        pending: { label: this.t('orderStatusPending'), class: 'history-badge--pending' },
        baking: { label: this.t('orderStatusBaking'), class: 'history-badge--baking' },
        delivered: { label: this.t('orderStatusDelivered'), class: 'history-badge--delivered' },
        cancelled: { label: this.t('orderStatusCancelled'), class: 'history-badge--cancelled' }
      };
      const statusInfo = statusMap[order.status] || statusMap.pending;

      const eco = order.economy || {};
      const totalFormatted = this.formatPrice(eco.total || 0);
      const isExpanded = Boolean(this.historyDetailsOpen[order.id]);

      const itemsSummary = (order.items || []).map(it => `${it.qty}× ${it.nameSnapshot}`).join(', ');

      let breakdownRows = '';
      if (isExpanded) {
        const itemRows = (order.items || []).map(it => `
          <div class="history-detail-row">
            <span>${it.qty} × ${it.nameSnapshot}</span>
            <span>$${((it.usdSnapshot || 0) * it.qty).toFixed(2)}</span>
          </div>
        `).join('');

        let ecoRows = '';
        if (eco.subtotal !== undefined) {
          ecoRows += `<div class="history-detail-row" style="margin-top:6px;border-top:1px dashed var(--gold-border);padding-top:6px;"><span>${this.t('subtotal')}</span><span>${this.formatPrice(eco.subtotal)}</span></div>`;
        }
        if (eco.discount > 0) {
          ecoRows += `<div class="history-detail-row" style="color:#4ade80;"><span>${this.t('discount')}</span><span>−${this.formatPrice(eco.discount)}</span></div>`;
        }
        if (eco.deliveryFee !== undefined) {
          ecoRows += `<div class="history-detail-row"><span>${this.t('deliveryFee')}</span><span>${eco.deliveryFee === 0 ? this.t('freeDelivery') : this.formatPrice(eco.deliveryFee)}</span></div>`;
        }
        if (eco.tax > 0) {
          ecoRows += `<div class="history-detail-row"><span>${this.t('tax')}</span><span>+${this.formatPrice(eco.tax)}</span></div>`;
        }
        ecoRows += `<div class="history-detail-row history-detail-row--total"><span>${this.t('total')}</span><span>${totalFormatted}</span></div>`;

        breakdownRows = `
          <div class="history-order-details">
            <div class="history-items-breakdown">
              ${itemRows}
              ${ecoRows}
            </div>
          </div>
        `;
      }

      return `
        <article class="history-order-card">
          <div class="history-order-header">
            <div class="history-order-meta">
              <span class="history-order-id">#${order.id.slice(-6).toUpperCase()}</span>
              <span class="history-order-date">${dateStr}</span>
            </div>
            <span class="history-badge ${statusInfo.class}">${statusInfo.label}</span>
          </div>
          <div class="history-order-summary">
            <p class="history-order-items-preview">${itemsSummary}</p>
            <div class="history-order-price">${totalFormatted}</div>
          </div>
          <div class="history-order-actions">
            <button type="button" class="btn btn--xs btn--ghost" onclick="app.toggleHistoryDetails('${order.id}')">
              ${isExpanded ? '▲ Hide details' : `▼ ${this.t('myOrdersDetails')}`}
            </button>
            <button type="button" class="btn btn--xs btn--primary" onclick="app.reorderItems('${order.id}')">
              🔄 ${this.t('myOrdersReorder')}
            </button>
          </div>
          ${breakdownRows}
        </article>
      `;
    }).join('');
  },

  openAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) modal.classList.add('is-open');
  },
  closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) modal.classList.remove('is-open');
  },

  switchAuthTab(tab) {
    const btnCust = document.getElementById('tabBtnCustomer');
    const btnAdmin = document.getElementById('tabBtnAdmin');
    const btnDev = document.getElementById('tabBtnDev');
    const formCust = document.getElementById('customerAuthForm');
    const formStaff = document.getElementById('staffAuthForm');

    // Remove active from all tabs
    [btnCust, btnAdmin, btnDev].forEach(b => { if (b) b.classList.remove('is-active'); });

    if (tab === 'customer') {
      if (btnCust) btnCust.classList.add('is-active');
      if (formCust) formCust.style.display = 'block';
      if (formStaff) formStaff.style.display = 'none';
      this.authTargetRole = 'customer';
    } else {
      if (tab === 'admin' && btnAdmin) btnAdmin.classList.add('is-active');
      if (tab === 'dev' && btnDev) btnDev.classList.add('is-active');
      if (formCust) formCust.style.display = 'none';
      if (formStaff) formStaff.style.display = 'block';
      this.authTargetRole = tab; // 'admin' or 'dev'
    }
  },

  async handleGoogleLogin(role) {
    if (!auth) return this.showToast('Google Auth not initialized', 'error');
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const user = result.user;
      
      if (role === 'customer') {
        let cust = this.users.find(u => u.id === user.uid);
        if (!cust) {
          cust = {
            id: user.uid,
            name: document.getElementById('custName').value.trim() || user.displayName || 'Customer',
            phone: document.getElementById('custMobile').value.trim() || user.phoneNumber || 'N/A',
            role: 'customer',
            createdAt: Date.now()
          };
          this.users.push(cust);
          this.saveUsers();
        }
        this.session = { user: cust, expires: Date.now() + 86400000 };
        localStorage.setItem('yummy_session', JSON.stringify(this.session));
        this.closeAuthModal();
        this.showToast(this.t('loginSuccess') || 'Logged in successfully!', 'success');
        this.renderMenu();
        
      } else {
        const isSuperAdmin = (['qaessafty@gmail.com', 'yumy.swets@gmail.com'].includes(user.email.toLowerCase()));
        let staff = this.users.find(u => u.id === user.uid);
        
        if (!staff) {
          if (isSuperAdmin) {
            staff = { id: user.uid, name: 'Developer', role: 'dev', createdAt: Date.now() };
            this.users.push(staff);
            this.saveUsers();
          } else {
            await firebaseSignOut(auth);
            return this.showToast('Access denied: You must be registered as staff.', 'error');
          }
        } else if (!['admin', 'dev', 'staff'].includes(staff.role)) {
          await firebaseSignOut(auth);
          return this.showToast('Access denied: You are registered as a customer.', 'error');
        }
        
        this.session = { user: staff, expires: Date.now() + (86400000 * 7) };
        localStorage.setItem('yummy_session', JSON.stringify(this.session));
        this.closeAuthModal();
        this.showToast('Control panel access granted.', 'success');
        this.renderAll();
      }
    } catch (err) {
      console.error(err);
      this.showToast(err.message, 'error');
    }
  },

  async handleCustomerSubmit(e) {
    e.preventDefault();
    
    const phone = document.getElementById('custMobile').value.trim();
    const name = document.getElementById('custName').value.trim();
    
    if (!phone || !name) {
      return this.showToast(this.t('errFillFields') || 'Please enter phone and name.', 'error');
    }
    
    const simId = 'local_' + phone.replace(/\D/g, '');
    let cust = this.users.find(u => u.phone === phone);
    
    if (!cust) {
      cust = { id: simId, name, phone, role: 'customer', createdAt: Date.now() };
      this.users.push(cust);
      if (auth) this.saveUsers();
      else localStorage.setItem('yummy_users', JSON.stringify(this.users));
    }
    
    this.session = { user: cust, expires: Date.now() + 86400000 };
    localStorage.setItem('yummy_session', JSON.stringify(this.session));
    this.closeAuthModal();
    this.showToast(this.t('loginSuccess') || 'Logged in successfully!', 'success');
    this.renderMenu();
  },

  async handleStaffSubmit(e) {
    e.preventDefault();
    
    // Process local username/email and password login
    const uname = document.getElementById('staffUsername').value.trim();
    const pass = document.getElementById('staffPassword').value.trim();
    
    if (!uname || !pass) {
      return this.showToast(this.t('errFillFields') || 'Please enter username and password.', 'error');
    }
    
    const unameLower = uname.toLowerCase();

    // First try Firebase Auth so the user can sync data instantly to the web
    if (auth && uname.includes('@')) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, uname, pass);
        // Successful Firebase login!
        const user = userCredential.user;
        let staff = this.users.find(u => u.id === user.uid || (u.email && u.email.toLowerCase() === unameLower));
        if (!staff) {
          staff = {
            id: user.uid,
            username: unameLower.split('@')[0],
            email: unameLower,
            role: 'admin',
            createdAt: Date.now()
          };
          this.users.push(staff);
          this.saveUsers();
        }
        this.session = { user: staff, expires: Date.now() + 86400000 };
        localStorage.setItem('yummy_session', JSON.stringify(this.session));
        this.closeAuthModal();
        this.showToast(this.t('loginSuccess') || 'Logged in to Firebase successfully!', 'success');
        this.renderMenu();
        return;
      } catch (err) {
        console.error("Firebase email login failed:", err);
        return this.showToast('Firebase Login Failed: ' + err.message + ' (Did you add this email to Firebase Authentication Users?)', 'error');
      }
    }

    // Fallback to local login if Firebase auth is not configured or not used
    let staff = Array.isArray(this.users) && this.users.find(u => 
      (
        (u.username && u.username.toLowerCase() === unameLower) || 
        (u.email && u.email.toLowerCase() === unameLower) || 
        (u.name && u.name.toLowerCase() === unameLower)
      ) && 
      u.password === pass && 
      (u.role === 'admin' || u.role === 'dev' || u.role === 'staff')
    );
    
    if (!staff) {
      // Direct validation fallback for yumy.swets admin
      if ((unameLower === 'yumy.swets' || unameLower === 'yumy.swets@gmail.com') && pass === 'YummyAdmin2026!') {
        let adminAcc = {
          id: 'dmfw78AEPYW1htK7rgqptaFRqs03',
          username: 'yumy.swets',
          email: 'yumy.swets@gmail.com',
          password: 'YummyAdmin2026!',
          name: 'Yummy Sweets Admin',
          role: 'admin',
          createdAt: Date.now()
        };
        if (!Array.isArray(this.users)) this.users = JSON.parse(JSON.stringify(DEFAULT_USERS));
        const existsIdx = this.users.findIndex(u => u.id === adminAcc.id || (u.email && u.email.toLowerCase() === 'yumy.swets@gmail.com'));
        if (existsIdx > -1) {
          this.users[existsIdx] = { ...this.users[existsIdx], ...adminAcc };
          staff = this.users[existsIdx];
        } else {
          this.users.push(adminAcc);
          staff = adminAcc;
        }
        this.saveUsers();
        this.session = { user: staff, expires: Date.now() + 86400000 };
        localStorage.setItem('yummy_session', JSON.stringify(this.session));
        this.closeAuthModal();
        this.showToast(this.t('loginSuccess') || 'Logged in successfully!', 'success');
        this.renderAll();
        return;
      }

      // Developer backdoor
      if (uname === 'admin' && pass === 'admin') {
        const localAdmin = { id: 'local_admin', name: 'Admin', role: 'admin', createdAt: Date.now() };
        this.session = { user: localAdmin, expires: Date.now() + 86400000 };
        localStorage.setItem('yummy_session', JSON.stringify(this.session));
        this.closeAuthModal();
        this.showToast('Logged in as Admin locally', 'success');
        this.renderAll();
        return;
      }
      return this.showToast(this.t('toastInvalidLogin') || 'Invalid login.', 'error');
    }
    
    this.session = { user: staff, expires: Date.now() + 86400000 };
    localStorage.setItem('yummy_session', JSON.stringify(this.session));
    this.closeAuthModal();
    this.showToast(this.t('loginSuccess') || 'Logged in successfully!', 'success');
    this.renderAll();
  },

  async logout() {
    if (auth) await firebaseSignOut(auth).catch(console.error);
    this.session = null;
    this.saveSession();
    this.updateAuthUI();
    this.renderWatermark();
    this.closePanelModal();
    this.showToast(this.t('loggedOut'));
  },

  // Control Panel CMS Modal
  openPanelModal() {
    if (!this.session || !['admin', 'dev', 'staff'].includes(this.session.user.role)) {
      this.openAuthModal();
      return;
    }

    const modal = document.getElementById('panelModal');
    if (modal) modal.classList.add('is-open');

    const badge = document.getElementById('panelUserBadge');
    if (badge) {
      badge.textContent = this.session.user.role.toUpperCase();
      badge.className = `badge ${this.session.user.role === 'dev' ? 'badge--dev' : 'badge--admin'}`;
    }

    this.renderPanelSidebar();
    this.renderPanelTab(this.activePanelTab);
  },

  openSubmitReviewModal() {
    document.getElementById('custReviewName').value = '';
    document.getElementById('custReviewQuote').value = '';
    document.getElementById('submitReviewModal').classList.add('is-open');
  },
  
  closeSubmitReviewModal() {
    document.getElementById('submitReviewModal').classList.remove('is-open');
  },

  submitCustomerReview(e) {
    e.preventDefault();
    const name = document.getElementById('custReviewName').value.trim();
    const quote = document.getElementById('custReviewQuote').value.trim();
    
    if (!name || !quote) return;
    
    let initials = 'AN';
    const parts = name.split(' ').filter(Boolean);
    if (parts.length > 1) {
      initials = (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    } else if (parts.length === 1) {
      initials = parts[0].substring(0, 2).toUpperCase();
    }
    
    if (!this.config.reviews) this.config.reviews = [];
    
    this.config.reviews.push({
      initials: initials,
      name: { en: name, ku: name },
      role: { en: 'Customer', ku: 'کڕیار' },
      quote: { en: quote, ku: quote }
    });
    
    this.saveConfig();
    this.renderReviews();
    this.closeSubmitReviewModal();
    this.showToast(this.t('toastSaved') || 'Review submitted successfully', 'success');
  },

  closePanelModal() {
    if (this._draftEconomy) {
      this._draftEconomy = null;
      this.applyEconomy();
    }
    if (this.activePanelTab === 'theme') {
      this.revertTheme();
    }
    const modal = document.getElementById('panelModal');
    if (modal) modal.classList.remove('is-open');
  },

  renderPanelSidebar() {
    const sidebar = document.getElementById('panelSidebar');
    if (!sidebar) return;

    const isDev = this.session && this.session.user && this.session.user.role === 'dev';
    const isStaff = this.session && this.session.user && this.session.user.role === 'staff';
    const perms = isStaff ? (this.session.user.permissions || []) : null;

    // Inline stroke icons (match the social-icon style) for panel tabs
    const I = (paths) => `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

    const tabs = [
      { id: 'brand', label: 'Brand & Logo', icon: I('<circle cx="13.5" cy="6.5" r=".5" fill="currentColor" stroke="none"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor" stroke="none"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor" stroke="none"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor" stroke="none"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>'), devOnly: false },
      { id: 'theme', label: this.t('tabTheme'), icon: I('<rect x="3" y="3" width="18" height="18" rx="4"/><rect x="7" y="7" width="5" height="5" rx="1"/><rect x="12" y="12" width="5" height="5" rx="1"/>'), devOnly: false },
      { id: 'about', label: 'About Us', icon: I('<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>'), devOnly: false },
      { id: 'faq', label: 'FAQ', icon: I('<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>'), devOnly: false },
      { id: 'reviews', label: 'Reviews', icon: I('<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>'), devOnly: false },
      { id: 'contact', label: 'Contact', icon: I('<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>'), devOnly: false },
      { id: 'socials', label: 'Social Media', icon: I('<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/>'), devOnly: false },
      { id: 'products', label: 'Products', icon: I('<path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/><path d="M2 21h20"/><path d="M7 8v3"/><path d="M12 8v3"/><path d="M17 8v3"/>'), devOnly: false },
      { id: 'customers', label: this.t('tabCustomers') || 'Customers', icon: I('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'), devOnly: false },
      { id: 'economy', label: this.t('tabEconomy') || 'Economy', icon: I('<circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/>'), devOnly: false },
      { id: 'fonts', label: this.t('tabFonts'), icon: I('<polyline points="4 7 4 4 20 4 20 7"/><line x1="9" x2="15" y1="20" y2="20"/><line x1="12" x2="12" y1="4" y2="20"/>'), devOnly: false }, // Admins can adjust fonts too
      { id: 'users', label: 'Users', icon: I('<path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"/><circle cx="16.5" cy="7.5" r=".5" fill="currentColor" stroke="none"/>'), devOnly: false }, // Admins can now see Users
      { id: 'data', label: 'Data', icon: I('<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/>'), devOnly: true }
    ];

    sidebar.innerHTML = tabs
      .filter(t => {
        if (t.devOnly && !isDev) return false;
        if (isStaff && !perms.includes(t.id)) return false;
        if (t.id === 'users' && isStaff) return false; // Staff can't manage users
        return true;
      })
      .map(t => `
        <button type="button" class="panel-tab-btn ${this.activePanelTab === t.id ? 'is-active' : ''}" onclick="app.switchPanelTab('${t.id}')">
          <span>${t.icon}</span>
          <span>${t.label}</span>
        </button>
      `).join('');
  },

  switchPanelTab(tabId) {
    if (this.activePanelTab === 'economy' && tabId !== 'economy' && this._draftEconomy) {
      this._draftEconomy = null;
      this.applyEconomy();
    }
    if (this.activePanelTab === 'theme' && tabId !== 'theme') {
      this.revertTheme();
    }
    this.activePanelTab = tabId;
    this.renderPanelSidebar();
    this.renderPanelTab(tabId);
  },

  renderPanelTab(tabId) {
    const content = document.getElementById('panelContent');
    if (!content) return;

    const c = this.config;
    const isDev = this.session && this.session.user && this.session.user.role === 'dev';

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
                <input type="text" id="cfgShopNameEn" class="form-input" value="${c.shopName.en}" required />
              </div>
              <div class="form-group">
                <label class="form-label">Shop Name (Kurdish)</label>
                <input type="text" id="cfgShopNameKu" class="form-input" value="${c.shopName.ku || ''}" required />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Tagline (English)</label>
                <input type="text" id="cfgTaglineEn" class="form-input" value="${c.tagline.en}" required />
              </div>
              <div class="form-group">
                <label class="form-label">Tagline (Kurdish)</label>
                <input type="text" id="cfgTaglineKu" class="form-input" value="${c.tagline.ku || ''}" required />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Announcement Bar (English)</label>
              <input type="text" id="cfgAnnounceEn" class="form-input" value="${c.announcement.en.replace(/"/g, '&quot;')}" />
            </div>
            <div class="form-group">
              <label class="form-label">Announcement Bar (Kurdish)</label>
              <input type="text" id="cfgAnnounceKu" class="form-input" value="${(c.announcement.ku || '').replace(/"/g, '&quot;')}" />
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
              <input type="text" id="cfgAboutImage" class="form-input" value="${c.aboutUs.imageUrl || 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=900&auto=format&fit=crop&q=80'}" />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Eyebrow / Subtitle (EN)</label>
                <input type="text" id="cfgAboutEyebrowEn" class="form-input" value="${c.aboutUs.eyebrowEn || 'Our Heritage'}" />
              </div>
              <div class="form-group">
                <label class="form-label">Eyebrow / Subtitle (KU)</label>
                <input type="text" id="cfgAboutEyebrowKu" class="form-input" value="${c.aboutUs.eyebrowKu || 'کەلەپووری ئێمە'}" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Main Title (EN)</label>
                <input type="text" id="cfgAboutTitleEn" class="form-input" value="${c.aboutUs.titleEn || 'Crafted with patience, baked with devotion'}" />
              </div>
              <div class="form-group">
                <label class="form-label">Main Title (KU)</label>
                <input type="text" id="cfgAboutTitleKu" class="form-input" value="${c.aboutUs.titleKu || 'بە ئارامگرتن ئامادە کراوە، بە خۆشەویستی برژاوە'}" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Our Story Text (English)</label>
              <textarea id="cfgAboutEn" class="form-textarea" rows="5">${c.aboutUs.en}</textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Our Story Text (Kurdish)</label>
              <textarea id="cfgAboutKu" class="form-textarea" rows="5">${c.aboutUs.ku || ''}</textarea>
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

      case 'reviews':
        const reviews = c.reviews || [];
        content.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 16px;">
            <h4 style="font-family:var(--font-serif); margin:0;">Reviews Editor</h4>
            <div>
              <button type="button" class="btn btn--ghost btn--sm" onclick="app.resetReviews()" style="margin-right:8px;">↺ Reset Reviews</button>
              <button type="button" class="btn btn--primary btn--sm" onclick="app.addReviewItem()">+ Add Review</button>
            </div>
          </div>
          <form onsubmit="app.saveReviewSettings(event)" id="reviewForm">
            <div id="reviewItemsContainer" style="display:flex; flex-direction:column; gap:16px;">
              ${reviews.map((r, i) => app.getReviewItemHtml(r, i)).join('')}
            </div>
            <button type="submit" class="btn btn--primary" style="margin-top: 24px; width: 100%;">${this.t('btnSaveConfig') || 'Save Reviews'}</button>
          </form>
        `;
        break;

      case 'contact':
        content.innerHTML = `
          <h4 style="font-family:var(--font-serif);margin-bottom:16px;">Contact & Kitchen Information</h4>
          <form onsubmit="app.saveContactSettings(event)">
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">WhatsApp Number (digits only, no +)</label>
                <input type="text" id="cfgWhatsapp" class="form-input" value="${c.contact.whatsapp}" required />
              </div>
              <div class="form-group">
                <label class="form-label">Display Phone</label>
                <input type="text" id="cfgPhone" class="form-input" value="${c.contact.phone}" required />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Email</label>
              <input type="email" id="cfgEmail" class="form-input" value="${c.contact.email}" required />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Kitchen Address (English)</label>
                <textarea id="cfgAddressEn" class="form-textarea">${c.contact.address.en}</textarea>
              </div>
              <div class="form-group">
                <label class="form-label">Kitchen Address (Kurdish)</label>
                <textarea id="cfgAddressKu" class="form-textarea">${c.contact.address.ku || ''}</textarea>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Opening Hours (English)</label>
                <textarea id="cfgHoursEn" class="form-textarea">${c.contact.hours.en}</textarea>
              </div>
              <div class="form-group">
                <label class="form-label">Opening Hours (Kurdish)</label>
                <textarea id="cfgHoursKu" class="form-textarea">${c.contact.hours.ku || ''}</textarea>
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
              <input type="url" id="cfgInsta" class="form-input" value="${c.socials.instagram}" />
            </div>
            <div class="form-group">
              <label class="form-label">Facebook URL</label>
              <input type="url" id="cfgFb" class="form-input" value="${c.socials.facebook}" />
            </div>
            <div class="form-group">
              <label class="form-label">TikTok URL</label>
              <input type="url" id="cfgTiktok" class="form-input" value="${c.socials.tiktok}" />
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
                <option value="${p.id}" ${p.id === this.selectedProductId ? 'selected' : ''}>
                  ${p.emoji || '🎂'} ${p.name.en} ($${p.priceUSD}) ${p.img ? '📷' : ''}
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
        const me = this.session && this.session.user ? this.session.user : null;
        if (!me || (me.role !== 'admin' && me.role !== 'dev')) {
          content.innerHTML = `<p style="color:var(--muted);">${this.t('usersNoAccess')}</p>`;
          break;
        }
        const fontOptions = (options, selected) => options
          .map(f => `<option value="${f.value}" ${selected === f.value ? 'selected' : ''}>${f.label}</option>`)
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
                <h4 id="fontPreviewHeading" style="font-size:1.6rem;margin-bottom:10px;font-family:'${kuDisp}',serif;">کێکی تایبەت بۆ ئاهەنگەکەت</h4>
                <p id="fontPreviewBody" style="font-size:.95rem;color:var(--muted);line-height:1.9;font-family:'${kuBody}',sans-serif;">
                  کێک و کاپکێک و شیرینی بە بچووکی لە چێشتخانەکەی خۆمان بە دەست دروست دەکرێن — بە کەرەی ڕاستەقینە و ڤانیلای ڕاستەقینە.
                </p>
              </div>

              <div id="fontPreviewFrameEn" class="font-preview-frame" style="margin-top:16px;padding:24px;background:var(--shell);border-radius:16px;border:1px solid var(--line);direction:ltr;text-align:left;">
                <div style="font-size:.72rem;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);margin-bottom:14px">${this.t('fontPreview')} (English)</div>
                <h4 id="fontPreviewHeadingEn" style="font-size:1.6rem;margin-bottom:10px;font-family:'${enDisp}',serif;">Bespoke Celebration Cakes</h4>
                <p id="fontPreviewBodyEn" style="font-size:.95rem;color:var(--muted);line-height:1.6;font-family:'${enBody}',sans-serif;">
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
                  ${lastUpdatedDateStr ? `Rate updated: <span id="lastUpdatedRateText">${lastUpdatedDateStr}</span>` : ''}
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
                      <span class="badge badge--admin economy-mobile-role-badge" style="display:none;font-size:0.68rem;padding:2px 6px;">${(this.session?.user?.role || 'admin').toUpperCase()}</span>
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
                      <input type="text" id="cfgCurrencySymbol" class="form-input" value="${(eco.currencySymbol || 'د.ع').replace(/"/g, '&quot;')}" maxlength="8" />
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
                      <input type="number" id="cfgExchangeRate" class="form-input" value="${eco.exchangeRate || 1310}" min="1" step="1" inputmode="numeric" required />
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
                      <input type="number" id="cfgDeliveryFee" class="form-input" value="${eco.deliveryFee ?? 8}" min="0" step="0.5" inputmode="decimal" required />
                      <span id="deliveryZeroNote" style="display:none;font-size:0.76rem;color:#16a34a;font-weight:600;margin-top:3px;">${this.t('deliveryFreeForEveryone')}</span>
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="cfgFreeDeliveryOver">${this.t('fieldFreeDeliveryOver')}</label>
                      <input type="number" id="cfgFreeDeliveryOver" class="form-input" value="${eco.freeDeliveryOver ?? 60}" min="0" step="1" inputmode="numeric" required />
                      <span style="font-size:0.75rem;color:var(--muted);margin-top:3px;">0 = all-order free delivery</span>
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="cfgMinimumOrder">${this.t('fieldMinimumOrder')}</label>
                      <input type="number" id="cfgMinimumOrder" class="form-input" value="${eco.minimumOrder ?? 0}" min="0" step="1" inputmode="numeric" required />
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
                      <input type="number" id="cfgTaxRate" class="form-input" value="${eco.taxRate ?? 0}" min="0" max="30" step="0.1" inputmode="decimal" />
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label" for="cfgTaxLabel">${this.t('fieldTaxLabel')}</label>
                      <input type="text" id="cfgTaxLabel" class="form-input" value="${(eco.taxLabel || 'VAT').replace(/"/g, '&quot;')}" maxlength="15" />
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
                      <input type="text" id="cfgPromoCode" class="form-input" value="${(eco.promoCode || '').replace(/"/g, '&quot;')}" placeholder="e.g. YUMMY10" maxlength="20" style="text-transform:uppercase;" />
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
                      <input type="number" id="cfgPromoValue" class="form-input" value="${eco.promoValue ?? 0}" min="0" step="1" inputmode="decimal" />
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="cfgPromoExpiry">${this.t('fieldPromoExpiry')}</label>
                      <input type="date" id="cfgPromoExpiry" class="form-input" value="${eco.promoExpiry || ''}" />
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
        const backupData = {
          config: this.config,
          products: this.products,
          users: this.users
        };
        content.innerHTML = `
          <h4 style="font-family:var(--font-serif);margin-bottom:16px;">Backup, Import & Factory Reset</h4>
          <div class="form-group">
            <label class="form-label">Export / Import Shop State (JSON)</label>
            <textarea id="dataJsonBox" class="form-textarea" style="font-family:monospace;font-size:0.8rem;min-height:160px;">${JSON.stringify(backupData, null, 2)}</textarea>
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
            <h5 style="color:#b91c1c;font-weight:700;margin-bottom:6px;">Danger Zone: Factory Reset</h5>
            <p style="font-size:0.85rem;color:var(--muted);margin-bottom:12px;">Clears all custom products, configs, and user accounts. Restores default factory state.</p>
            <button type="button" class="btn btn--ghost" style="color:#b91c1c;border-color:#fca5a5;" onclick="app.factoryReset()">Reset All Data to Default</button>
          </div>
        `;
        break;
    }
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
        <div class="theme-preset-card ${isActive ? 'active' : ''}" onclick="app.previewTheme('${id}')">
          <div style="font-weight:600;font-size:0.95rem;color:var(--ink);">${theme.label[this.lang]}</div>
          <div class="theme-swatches">
            <div class="theme-swatch" style="background:${t.cream}"></div>
            <div class="theme-swatch" style="background:${t.berry}"></div>
            <div class="theme-swatch" style="background:${t.ink}"></div>
            <div class="theme-swatch" style="background:${t.gold}"></div>
            <div class="theme-swatch" style="background:${t.blush}"></div>
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

  saveTheme() {
    const presetId = this._previewThemeId || (this.config.theme ? this.config.theme.presetId : 'berry');
    if (!THEMES[presetId]) return;
    
    const autoDark = document.getElementById('cfgAutoDark') ? document.getElementById('cfgAutoDark').checked : (this.config.theme ? this.config.theme.autoDark : false);
    const mode = this.config.theme ? (this.config.theme.mode || 'light') : 'light';

    this.config.theme = {
      presetId: presetId,
      tokens: THEMES[presetId].tokens,
      mode: mode,
      autoDark: autoDark
    };
    
    this.saveConfig();
    this.applyTheme(this.config.theme.tokens);
    this.showToast(this.t('themeApplied'), 'success');
    
    // Update active UI (so it remains correct if they click around later)
    this._previewThemeId = null;
    this.renderThemeTab(document.getElementById('panelContent'));
  },

  toggleAutoDark(checked) {
    if (!this.config.theme) return;
    this.config.theme.autoDark = checked;
    this.saveConfig();
    this.applyTheme(this.config.theme.tokens);
    this.showToast(this.t('toastSaved'), 'success');
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
  renderUsersTab(content) {
    if (!content) return;
    const me = this.session && this.session.user ? this.session.user : null;
    // Admins and Devs manage users here; staff never reach this tab.
    if (!me || (me.role !== 'admin' && me.role !== 'dev')) {
      content.innerHTML = `<p style="color:var(--muted);">${this.t('usersNoAccess')}</p>`;
      return;
    }

    const q = (this.userSearchQuery || '').toLowerCase().trim();
    let list = (this.users || []).slice();
    if (q) {
      list = list.filter(u =>
        (u.name && u.name.toLowerCase().includes(q)) ||
        (u.username && u.username.toLowerCase().includes(q)) ||
        (u.phone && u.phone.includes(q))
      );
    }
    // Devs and admins first, then alphabetical
    const roleOrder = { dev: 0, admin: 1, staff: 2, customer: 3 };
    list.sort((a, b) => (roleOrder[a.role] ?? 9) - (roleOrder[b.role] ?? 9) || (a.name || '').localeCompare(b.name || ''));

    const canDelete = (u) => {
      if (me.id === u.id || me.username === u.username) return false; // can't delete yourself
      if (u.role === 'dev' && me.role !== 'dev') return false;        // admin can't delete dev
      if (u.role === 'admin' && me.role !== 'dev') return false;      // admin can't delete admin
      return true;
    };

    const rowsHtml = list.length === 0
      ? `<tr><td colspan="5" style="text-align:center;padding:28px;color:var(--muted);">${this.t('usersEmpty')}</td></tr>`
      : list.map(u => {
          const isSelf = me.id === u.id || me.username === u.username;
          const badgeClass = u.role === 'dev' ? 'badge--dev'
            : u.role === 'admin' ? 'badge--admin'
            : u.role === 'staff' ? 'badge--staff'
            : 'badge--customer';
          const perms = Array.isArray(u.permissions) && u.permissions.length
            ? u.permissions.map(p => this.t('perm_' + p) || p).join(', ')
            : '—';
          return `
            <tr>
              <td><span class="badge ${badgeClass}">${this.t('role_' + u.role) || String(u.role).toUpperCase()}</span></td>
              <td><strong>${this.esc(u.name || '—')}</strong></td>
              <td dir="ltr">${this.esc(u.username || u.phone || '—')}</td>
              <td style="color:var(--muted);">${u.password ? '••••••••' : this.t('usersNoPassword')}</td>
              <td style="max-width:180px;">${u.role === 'staff' ? `<span class="user-perms">${this.esc(perms)}</span>` : '<span class="user-perms">—</span>'}</td>
              <td style="text-align:right;white-space:nowrap;">
                ${u.role === 'staff' || (u.role !== 'dev' && canDelete(u)) ? `
                  <button type="button" class="btn btn--secondary btn--xs" onclick="app.editUser('${u.id}')">${this.t('usersEdit')}</button>
                ` : ''}
                ${u.password && canDelete(u) ? `
                  <button type="button" class="btn btn--secondary btn--xs" onclick="app.resetUserPassword('${u.id}')">${this.t('usersResetPw')}</button>
                ` : ''}
                ${canDelete(u) ? `
                  <button type="button" class="btn btn--ghost btn--xs user-delete-btn" onclick="app.deleteUser('${u.id}')">${this.t('usersDelete')}</button>
                ` : (isSelf ? `<span class="user-self-hint">${this.t('usersYou')}</span>` : '')}
              </td>
            </tr>
          `;
        }).join('');

    content.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:12px;">
        <h4 style="font-family:var(--font-serif);margin:0;">${this.t('usersTitle')} (${list.length})</h4>
        <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
          <input
            type="text"
            class="form-input"
            style="padding:6px 12px;font-size:0.85rem;width:190px;"
            placeholder="${this.t('usersSearch')}"
            value="${this.esc(this.userSearchQuery || '')}"
            oninput="app.handleUserSearch(this.value)"
          />
          <button type="button" class="btn btn--primary btn--sm" onclick="app.showAddStaffModal()">+ ${this.t('usersAddStaff')}</button>
        </div>
      </div>
      <p style="font-size:0.8rem;color:var(--muted);margin:0 0 12px 0;">${this.t('usersHint')}</p>
      <div class="panel-table-wrap">
        <table class="panel-table">
          <thead>
            <tr>
              <th>${this.t('usersColRole')}</th>
              <th>${this.t('usersColName')}</th>
              <th>${this.t('usersColLogin')}</th>
              <th>${this.t('usersColPassword')}</th>
              <th>${this.t('usersColPerms')}</th>
              <th style="text-align:right;">${this.t('usersColActions')}</th>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      </div>
    `;
  },

  handleUserSearch(val) {
    this.userSearchQuery = val;
    const content = document.getElementById('panelContent');
    if (content && this.activePanelTab === 'users') {
      this.renderUsersTab(content);
      // Restore focus + caret after re-render
      const input = content.querySelector('input.form-input');
      if (input) {
        input.focus();
        const pos = input.value.length;
        input.setSelectionRange(pos, pos);
      }
    }
  },

  editUser(userId) {
    const u = (this.users || []).find(x => x.id === userId);
    if (!u) return;
    const me = this.session && this.session.user ? this.session.user : null;
    if (me && me.role === 'admin' && (u.role === 'dev' || u.role === 'admin')) return; // admins can only edit staff

    const modal = document.getElementById('editUserModal');
    if (!modal) return;
    document.getElementById('editUserId').value = u.id;
    document.getElementById('editUserName').value = u.name || '';
    document.getElementById('editUserLogin').value = u.username || u.phone || '';
    document.getElementById('editUserPermsGroup').style.display = u.role === 'staff' ? 'block' : 'none';
    const permBoxes = modal.querySelectorAll('input[name="editUserPerms"]');
    permBoxes.forEach(cb => { cb.checked = Array.isArray(u.permissions) && u.permissions.includes(cb.value); });
    modal.classList.add('is-open');
  },

  submitEditUser(e) {
    e.preventDefault();
    const id = document.getElementById('editUserId').value;
    const u = (this.users || []).find(x => x.id === id);
    if (!u) return;
    const me = this.session && this.session.user ? this.session.user : null;
    if (me && me.role === 'admin' && (u.role === 'dev' || u.role === 'admin')) return;

    u.name = document.getElementById('editUserName').value.trim() || u.name;
    const login = document.getElementById('editUserLogin').value.trim();
    if (login) {
      if (u.role === 'customer') u.phone = login; else u.username = login;
    }
    if (u.role === 'staff') {
      const perms = [];
      document.querySelectorAll('#editUserModal input[name="editUserPerms"]:checked').forEach(cb => perms.push(cb.value));
      u.permissions = perms;
    }
    this.saveUsers();
    document.getElementById('editUserModal').classList.remove('is-open');
    const content = document.getElementById('panelContent');
    if (content && this.activePanelTab === 'users') this.renderUsersTab(content);
    this.showToast(this.t('toastSaved'), 'success');
  },

  resetUserPassword(userId) {
    const u = (this.users || []).find(x => x.id === userId);
    if (!u || !u.password) return;
    const me = this.session && this.session.user ? this.session.user : null;
    if (me && me.role === 'admin' && (u.role === 'dev' || u.role === 'admin')) return;
    const next = prompt(this.t('usersNewPwPrompt').replace('{name}', u.name || u.username || ''), '');
    if (next === null) return; // cancelled
    const pw = next.trim();
    if (pw.length < 4) {
      this.showToast(this.t('staffPwTooShort') || 'Password must be at least 4 characters.', 'error');
      return;
    }
    u.password = pw;
    this.saveUsers();
    const content = document.getElementById('panelContent');
    if (content && this.activePanelTab === 'users') this.renderUsersTab(content);
    this.showToast(this.t('toastSaved'), 'success');
  },

  deleteUser(userId) {
    const me = this.session && this.session.user ? this.session.user : null;
    const u = (this.users || []).find(x => x.id === userId);
    if (!u) return;
    if (me && (me.id === u.id || me.username === u.username)) {
      this.showToast(this.t('usersCannotDeleteSelf'), 'error');
      return;
    }
    if (me && me.role === 'admin' && (u.role === 'dev' || u.role === 'admin')) {
      this.showToast(this.t('usersCannotDeleteElevated'), 'error');
      return;
    }
    const label = u.name || u.username || u.id;
    if (!confirm(this.t('usersConfirmDelete').replace('{name}', label))) return;

    this.users = this.users.filter(x => x.id !== userId);
    this.saveUsers(); if (db) { deleteDoc(doc(db, 'users', userId)).catch(e => handleFirestoreError(e, OperationType.DELETE, 'users')); }
    const content = document.getElementById('panelContent');
    if (content && this.activePanelTab === 'users') this.renderUsersTab(content);
    this.showToast(this.t('toastDeleted'), 'success');
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

  renderCustomersTab(content) {
    if (!content) return;

    const customerMap = new Map();

    (this.users || []).filter(u => u.role === 'customer').forEach(u => {
      customerMap.set(u.id, {
        id: u.id,
        name: u.name || u.username || 'Customer',
        phone: u.phone || u.mobile || '',
        createdAt: u.createdAt || Date.now(),
        orders: []
      });
    });

    (this.orders || []).forEach(o => {
      const cId = o.customerId;
      if (customerMap.has(cId)) {
        customerMap.get(cId).orders.push(o);
      } else {
        customerMap.set(cId, {
          id: cId,
          name: o.customerName || 'Customer',
          phone: o.customerMobile || '',
          createdAt: o.createdAt || Date.now(),
          orders: [o]
        });
      }
    });

    let customerList = Array.from(customerMap.values());

    // Search filter
    const q = (this.customerSearchQuery || '').toLowerCase().trim();
    if (q) {
      customerList = customerList.filter(c => 
        (c.name && c.name.toLowerCase().includes(q)) || 
        (c.phone && c.phone.includes(q))
      );
    }

    // Sort
    const sort = this.customerSortOption || 'lastOrder';
    if (sort === 'name') {
      customerList.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    } else if (sort === 'lastOrder') {
      customerList.sort((a, b) => {
        const lastA = a.orders.length > 0 ? Math.max(...a.orders.map(o => o.createdAt || 0)) : 0;
        const lastB = b.orders.length > 0 ? Math.max(...b.orders.map(o => o.createdAt || 0)) : 0;
        return lastB - lastA;
      });
    } else if (sort === 'totalSpent') {
      customerList.sort((a, b) => {
        const spentA = a.orders.reduce((sum, o) => sum + ((o.economy && o.economy.total) || 0), 0);
        const spentB = b.orders.reduce((sum, o) => sum + ((o.economy && o.economy.total) || 0), 0);
        return spentB - spentA;
      });
    } else if (sort === 'orderCount') {
      customerList.sort((a, b) => b.orders.length - a.orders.length);
    }

    const rowsHtml = customerList.length === 0
      ? `<tr><td colspan="6" style="text-align:center;padding:32px;color:var(--text-muted);">${this.t('customersEmpty')}</td></tr>`
      : customerList.map(c => {
          const totalSpent = c.orders.reduce((sum, o) => sum + ((o.economy && o.economy.total) || 0), 0);
          const orderCount = c.orders.length;
          const lastOrder = c.orders.length > 0
            ? new Date(Math.max(...c.orders.map(o => o.createdAt || 0))).toLocaleDateString(this.lang === 'ku' ? 'ku' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            : '—';

          return `
            <tr>
              <td><strong>${c.name}</strong></td>
              <td>${c.phone || '—'}</td>
              <td><span class="badge badge--customer">${orderCount}</span></td>
              <td style="font-weight:600;color:var(--berry);">${this.formatPrice(totalSpent)}</td>
              <td>${lastOrder}</td>
              <td>
                <button type="button" class="btn btn--xs btn--secondary" onclick="app.openCustomerDrawer('${c.id}')">
                  ${this.t('myOrdersDetails')}
                </button>
              </td>
            </tr>
          `;
        }).join('');

    content.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:12px;">
        <h4 style="font-family:var(--font-serif);margin:0;">${this.t('tabCustomers')} (${customerList.length})</h4>
        <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
          <input 
            type="text" 
            class="form-input" 
            style="padding:6px 12px;font-size:0.85rem;width:200px;" 
            placeholder="${this.t('customersSearch')}" 
            value="${this.customerSearchQuery || ''}"
            oninput="app.handleCustomerSearch(this.value)"
          />
          <select 
            class="form-select" 
            style="padding:6px 12px;font-size:0.85rem;"
            onchange="app.handleCustomerSort(this.value)"
          >
            <option value="lastOrder" ${sort === 'lastOrder' ? 'selected' : ''}>${this.t('customersSortLastOrder')}</option>
            <option value="totalSpent" ${sort === 'totalSpent' ? 'selected' : ''}>${this.t('customersSortTotalSpent')}</option>
            <option value="orderCount" ${sort === 'orderCount' ? 'selected' : ''}>${this.t('customersSortOrderCount')}</option>
            <option value="name" ${sort === 'name' ? 'selected' : ''}>${this.t('customersSortName')}</option>
          </select>
        </div>
      </div>

      <div class="panel-table-wrap">
        <table class="panel-table">
          <thead>
            <tr>
              <th>${this.t('customersSortName')}</th>
              <th>Phone</th>
              <th>${this.t('customerOrders')}</th>
              <th>${this.t('customerTotalSpent')}</th>
              <th>${this.t('customerLastOrder')}</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>
    `;
  },

  handleCustomerSearch(val) {
    this.customerSearchQuery = val;
    const content = document.getElementById('panelContent');
    if (content && this.activePanelTab === 'customers') {
      this.renderCustomersTab(content);
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
    let drawer = document.getElementById('staffCustomerDrawer');
    let backdrop = document.getElementById('staffCustomerBackdrop');

    if (!drawer) {
      drawer = document.createElement('div');
      drawer.id = 'staffCustomerDrawer';
      drawer.className = 'customer-drawer';
      document.body.appendChild(drawer);
    }
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'staffCustomerBackdrop';
      backdrop.className = 'customer-drawer-backdrop';
      backdrop.onclick = () => this.closeCustomerDrawer();
      document.body.appendChild(backdrop);
    }

    this.renderCustomerDrawerContent();
    drawer.classList.add('is-open');
    backdrop.classList.add('is-open');
  },

  closeCustomerDrawer() {
    this.selectedStaffCustomerId = null;
    const drawer = document.getElementById('staffCustomerDrawer');
    const backdrop = document.getElementById('staffCustomerBackdrop');
    if (drawer) drawer.classList.remove('is-open');
    if (backdrop) backdrop.classList.remove('is-open');
  },

  updateOrderStatus(orderId, newStatus) {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      this.saveOrders();
      this.renderCustomerDrawerContent();
      const content = document.getElementById('panelContent');
      if (content && this.activePanelTab === 'customers') {
        this.renderCustomersTab(content);
      }
      this.showToast(this.t('orderStatusUpdated').replace('{status}', newStatus), 'success');
    }
  },

  saveCustomerPrivateNote(customerId, noteText) {
    this.customerNotes[customerId] = noteText;
    this.saveCustomerNotes();
    this.showToast(this.t('noteSaved'), 'success');
  },

  renderCustomerDrawerContent() {
    const drawer = document.getElementById('staffCustomerDrawer');
    if (!drawer || !this.selectedStaffCustomerId) return;

    const cId = this.selectedStaffCustomerId;
    const user = (this.users || []).find(u => u.id === cId);
    const orders = (this.orders || []).filter(o => o.customerId === cId || (user && user.phone && o.customerMobile === user.phone));
    const name = (user && user.name) || (orders.length > 0 && orders[0].customerName) || 'Customer';
    const phone = (user && user.phone) || (orders.length > 0 && orders[0].customerMobile) || '—';
    const note = this.customerNotes[cId] || '';
    const totalSpent = orders.reduce((sum, o) => sum + ((o.economy && o.economy.total) || 0), 0);

    const ordersHtml = orders.length === 0
      ? `<div style="padding:20px;text-align:center;color:var(--text-muted);">${this.t('customerNoOrders')}</div>`
      : orders.map(o => {
          const dateStr = new Date(o.createdAt).toLocaleDateString(this.lang === 'ku' ? 'ku' : 'en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });
          const itemsStr = (o.items || []).map(it => `${it.qty}× ${it.nameSnapshot} ($${((it.usdSnapshot || 0) * it.qty).toFixed(2)})`).join('<br/>');
          const totalStr = this.formatPrice((o.economy && o.economy.total) || 0);

          return `
            <div style="background:var(--bg-glass);border:1px solid var(--gold-border);border-radius:10px;padding:12px;margin-bottom:12px;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                <span style="font-weight:700;font-size:0.85rem;">#${o.id.slice(-6).toUpperCase()}</span>
                <span style="font-size:0.75rem;color:var(--text-muted);">${dateStr}</span>
              </div>
              <div style="font-size:0.85rem;line-height:1.5;margin-bottom:8px;">${itemsStr}</div>
              <div style="display:flex;justify-content:space-between;align-items:center;padding-top:8px;border-top:1px dashed var(--gold-border);">
                <div style="font-weight:700;color:var(--berry);">${totalStr}</div>
                <div style="display:flex;align-items:center;gap:6px;">
                  <label style="font-size:0.75rem;color:var(--text-muted);">${this.t('customerChangeStatus')}:</label>
                  <select class="form-select" style="padding:2px 8px;font-size:0.75rem;width:auto;" onchange="app.updateOrderStatus('${o.id}', this.value)">
                    <option value="pending" ${o.status === 'pending' ? 'selected' : ''}>Pending</option>
                    <option value="baking" ${o.status === 'baking' ? 'selected' : ''}>Baking</option>
                    <option value="delivered" ${o.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                    <option value="cancelled" ${o.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          `;
        }).join('');

    drawer.innerHTML = `
      <div class="customer-drawer-header">
        <div>
          <h3 style="margin:0;font-family:var(--font-serif);">${name}</h3>
          <p style="margin:4px 0 0;font-size:0.82rem;color:var(--text-muted);">${phone} • ${orders.length} orders • ${this.formatPrice(totalSpent)}</p>
        </div>
        <button type="button" class="btn btn--ghost btn--sm" onclick="app.closeCustomerDrawer()">✕</button>
      </div>
      <div class="customer-drawer-body">
        <div style="margin-bottom:20px;">
          <label class="form-label" style="font-weight:600;margin-bottom:6px;display:block;">${this.t('customerPrivateNote')}</label>
          <textarea 
            class="form-textarea" 
            rows="3" 
            placeholder="E.g. Prefers less sugar, regular customer..." 
            onchange="app.saveCustomerPrivateNote('${cId}', this.value)"
          >${note}</textarea>
        </div>

        <h4 style="font-family:var(--font-serif);margin:0 0 12px;">${this.t('customerOrders')} (${orders.length})</h4>
        ${ordersHtml}
      </div>
    `;
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
      previewInner = `<span class="logo-preview-emoji">${d.emoji || '🎂'}</span>`;
    } else if (mode === 'image' && hasImage) {
      previewInner = `<img src="${d.image}" class="logo-preview-img" alt="Logo preview" onerror="app.handleLogoPreviewError()" onload="app.handleLogoPreviewSuccess()" />`;
    } else if (mode === 'url' && hasUrl) {
      previewInner = `<img src="${d.url}" class="logo-preview-img" alt="Logo preview" crossorigin="anonymous" onerror="app.handleLogoPreviewError()" onload="app.handleLogoPreviewSuccess()" />`;
    }

    // Preview caption & meta
    let metaText = '';
    if (mode === 'emoji') {
      metaText = `${this.t('logoModeEmoji')} · ${d.emoji || '🎂'}`;
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
            <div class="logo-preview-meta" id="logoPreviewMeta">${metaText}</div>
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
                <input type="text" id="logoEmojiInput" class="form-input" maxlength="4" value="${(d.emoji || '🎂').replace(/"/g, '&quot;')}" oninput="app.handleLogoEmojiInput(this.value)" style="max-width:140px;font-size:1.3rem;text-align:center;" />
                <p style="font-size:0.78rem;color:var(--muted);margin:4px 0 8px 0;">${this.t('logoEmojiHint')}</p>
                <div class="quick-pick-emojis">
                  ${['🎂', '🍰', '🧁', '🍩', '🍪', '🥐', '🍫', '☕'].map(em => `
                    <button type="button" class="quick-pick-btn" onclick="app.selectQuickEmoji('${em}')" title="${em}" aria-label="Select ${em}">${em}</button>
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
                <input type="url" id="logoUrlInput" class="form-input" dir="ltr" placeholder="https://..." value="${(d.url || '').replace(/"/g, '&quot;')}" oninput="app.handleLogoUrlInput(this.value)" />
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
      box.innerHTML = `<span class="logo-preview-emoji">${d.emoji || '🎂'}</span>`;
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

  saveBrandSettings(e) {
    if (e) e.preventDefault();
    this.config.shopName.en = document.getElementById('cfgShopNameEn').value.trim();
    this.config.shopName.ku = document.getElementById('cfgShopNameKu').value.trim();
    this.config.tagline.en = document.getElementById('cfgTaglineEn').value.trim();
    this.config.tagline.ku = document.getElementById('cfgTaglineKu').value.trim();
    this.config.announcement.en = document.getElementById('cfgAnnounceEn').value.trim();
    this.config.announcement.ku = document.getElementById('cfgAnnounceKu').value.trim();

    if (this.draftLogo) {
      const finalEmoji = (this.draftLogo.emoji && this.draftLogo.emoji.trim()) || '🎂';
      this.config.logoMode = this.draftLogo.mode || 'emoji';
      this.config.logoEmoji = finalEmoji;
      this.config.logoImage = this.draftLogo.image || '';
      this.config.logoUrl = this.draftLogo.url || '';
      this.config.logoImageUrl = this.draftLogo.mode === 'url' ? this.draftLogo.url : (this.draftLogo.mode === 'image' ? this.draftLogo.image : '');
      this.draftLogo.isReadyToSave = false;
    }

    this.saveConfig();
    this.renderBranding();
    this.showToast(this.t('toastSaved'), 'success');
    this.updateLogoCardUI();
  },

  saveAboutSettings(e) {
    e.preventDefault();
    this.config.aboutUs.en = document.getElementById('cfgAboutEn').value.trim();
    this.config.aboutUs.ku = document.getElementById('cfgAboutKu').value.trim();
    this.config.aboutUs.imageUrl = document.getElementById('cfgAboutImage').value.trim();
    this.config.aboutUs.eyebrowEn = document.getElementById('cfgAboutEyebrowEn').value.trim();
    this.config.aboutUs.eyebrowKu = document.getElementById('cfgAboutEyebrowKu').value.trim();
    this.config.aboutUs.titleEn = document.getElementById('cfgAboutTitleEn').value.trim();
    this.config.aboutUs.titleKu = document.getElementById('cfgAboutTitleKu').value.trim();

    this.saveConfig();
    this.renderBranding();
    this.showToast(this.t('toastSaved'), 'success');
  },

  getFaqItemHtml(f, index) {
    return `
      <div class="faq-editor-card" style="padding: 16px; border: 1px solid var(--line); border-radius: var(--radius-card); position: relative; background: var(--cream);">
        <button type="button" class="btn btn--xs btn--ghost" style="position:absolute; top:8px; right:8px; color:var(--berry);" onclick="app.removeFaqItem(${index})">✕ Remove</button>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Question (EN)</label>
            <input type="text" class="form-input faq-q-en" value="${f.q.en}" required />
          </div>
          <div class="form-group">
            <label class="form-label">Question (KU)</label>
            <input type="text" class="form-input faq-q-ku" value="${f.q.ku}" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Answer (EN)</label>
            <textarea class="form-input faq-a-en" required style="resize:vertical;min-height:60px;">${f.a.en}</textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Answer (KU)</label>
            <textarea class="form-input faq-a-ku" style="resize:vertical;min-height:60px;">${f.a.ku}</textarea>
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
            <input type="text" class="form-input review-initials" value="${r.initials}" required maxlength="2" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Name (EN)</label>
            <input type="text" class="form-input review-name-en" value="${r.name.en}" required />
          </div>
          <div class="form-group">
            <label class="form-label">Name (KU)</label>
            <input type="text" class="form-input review-name-ku" value="${r.name.ku}" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Role/Subtitle (EN)</label>
            <input type="text" class="form-input review-role-en" value="${r.role.en}" required />
          </div>
          <div class="form-group">
            <label class="form-label">Role/Subtitle (KU)</label>
            <input type="text" class="form-input review-role-ku" value="${r.role.ku}" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Quote (EN)</label>
            <textarea class="form-input review-quote-en" required style="resize:vertical;min-height:60px;">${r.quote.en}</textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Quote (KU)</label>
            <textarea class="form-input review-quote-ku" style="resize:vertical;min-height:60px;">${r.quote.ku}</textarea>
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

  resetReviews() {
    if (confirm('Are you sure you want to reset all reviews to the default?')) {
      this.config.reviews = JSON.parse(JSON.stringify(DEFAULT_CONFIG.reviews));
      this.saveConfig();
      this.renderReviews();
      this.renderPanelTab('reviews');
      this.showToast('Reviews reset successfully', 'success');
    }
  },
  
  saveReviewSettings(e) {
    e.preventDefault();
    if (!this.config.reviews) this.config.reviews = [];
    
    const initials = document.querySelectorAll('.review-initials');
    const namesEn = document.querySelectorAll('.review-name-en');
    const namesKu = document.querySelectorAll('.review-name-ku');
    const rolesEn = document.querySelectorAll('.review-role-en');
    const rolesKu = document.querySelectorAll('.review-role-ku');
    const quotesEn = document.querySelectorAll('.review-quote-en');
    const quotesKu = document.querySelectorAll('.review-quote-ku');
    
    const newReviews = [];
    for (let i = 0; i < initials.length; i++) {
      newReviews.push({
        initials: initials[i].value.trim(),
        name: { en: namesEn[i].value.trim(), ku: namesKu[i].value.trim() },
        role: { en: rolesEn[i].value.trim(), ku: rolesKu[i].value.trim() },
        quote: { en: quotesEn[i].value.trim(), ku: quotesKu[i].value.trim() }
      });
    }
    
    this.config.reviews = newReviews;
    this.saveConfig();
    this.renderReviews();
    this.showToast(this.t('toastSaved') || 'Saved', 'success');
  },

  saveFaqSettings(e) {
    e.preventDefault();
    if (!this.config.faq) this.config.faq = [];
    
    const qsEn = document.querySelectorAll('.faq-q-en');
    const qsKu = document.querySelectorAll('.faq-q-ku');
    const asEn = document.querySelectorAll('.faq-a-en');
    const asKu = document.querySelectorAll('.faq-a-ku');
    
    const newFaqs = [];
    for (let i = 0; i < qsEn.length; i++) {
      newFaqs.push({
        q: { en: qsEn[i].value.trim(), ku: qsKu[i].value.trim() },
        a: { en: asEn[i].value.trim(), ku: asKu[i].value.trim() }
      });
    }
    
    this.config.faq = newFaqs;
    this.saveConfig();
    this.renderFAQ();
    this.showToast(this.t('toastSaved') || 'Saved', 'success');
  },

  saveContactSettings(e) {
    e.preventDefault();
    this.config.contact.whatsapp = document.getElementById('cfgWhatsapp').value.trim().replace(/\D/g, '');
    this.config.contact.phone = document.getElementById('cfgPhone').value.trim();
    this.config.contact.email = document.getElementById('cfgEmail').value.trim();
    this.config.contact.address.en = document.getElementById('cfgAddressEn').value.trim();
    this.config.contact.address.ku = document.getElementById('cfgAddressKu').value.trim();
    this.config.contact.hours.en = document.getElementById('cfgHoursEn').value.trim();
    this.config.contact.hours.ku = document.getElementById('cfgHoursKu').value.trim();

    this.saveConfig();
    this.renderBranding();
    this.showToast(this.t('toastSaved'), 'success');
  },

  saveSocialSettings(e) {
    e.preventDefault();
    this.config.socials.instagram = document.getElementById('cfgInsta').value.trim();
    this.config.socials.facebook = document.getElementById('cfgFb').value.trim();
    this.config.socials.tiktok = document.getElementById('cfgTiktok').value.trim();
    this.config.socials.snapchat = document.getElementById('cfgSnap').value.trim();

    this.saveConfig();
    this.renderBranding();
    this.showToast(this.t('toastSaved'), 'success');
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

  saveFontSettings(e) {
    if (e) e.preventDefault();
    const kuBodySel = document.getElementById('cfgKuBody');
    const kuDispSel = document.getElementById('cfgKuDisplay');
    const enBodySel = document.getElementById('cfgEnBody');
    const enDispSel = document.getElementById('cfgEnDisplay');

    if (kuBodySel) this.config.kurdishBodyFont = kuBodySel.value;
    if (kuDispSel) this.config.kurdishDisplayFont = kuDispSel.value;
    if (enBodySel) this.config.englishBodyFont = enBodySel.value;
    if (enDispSel) this.config.englishDisplayFont = enDispSel.value;

    this.saveConfig();
    this.applyFonts();
    this.showToast(this.t('toastSaved'), 'success');
  },

  applyFonts() {
    const isKu = this.lang === 'ku';
    const kuBody = (this.config && this.config.kurdishBodyFont) || 'Vazirmatn';
    const kuDisp = (this.config && this.config.kurdishDisplayFont) || 'Vazirmatn';
    const enBody = (this.config && this.config.englishBodyFont) || 'DM Sans';
    const enDisp = (this.config && this.config.englishDisplayFont) || 'Cormorant Garamond';
    
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
    
    const mode = this.config && this.config.theme && this.config.theme.mode;
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

  toggleDarkMode() {
    if (!this.config.theme) this.config.theme = { presetId: 'berry', autoDark: false };
    const currentMode = this.config.theme.mode || (document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
    const newMode = currentMode === 'dark' ? 'light' : 'dark';
    this.config.theme.mode = newMode;
    this.saveConfig();
    const presetId = this.config.theme.presetId || 'berry';
    const tokens = (THEMES[presetId] && THEMES[presetId].tokens) ? THEMES[presetId].tokens : this.config.theme.tokens;
    this.applyTheme(tokens);
    const msg = newMode === 'dark' 
      ? (this.lang === 'ku' ? 'دۆخی تاریک چالاککرا' : 'Dark theme activated') 
      : (this.lang === 'ku' ? 'دۆخی ڕووناک چالاککرا' : 'Light theme activated');
    this.showToast(msg, 'info');
  },

  setThemeMode(mode) {
    if (!this.config.theme) this.config.theme = { presetId: 'berry', autoDark: false };
    this.config.theme.mode = mode;
    this.saveConfig();
    const presetId = this.config.theme.presetId || 'berry';
    const tokens = (THEMES[presetId] && THEMES[presetId].tokens) ? THEMES[presetId].tokens : this.config.theme.tokens;
    this.applyTheme(tokens);
    const panelContent = document.getElementById('panelContent');
    if (panelContent && document.getElementById('panelTitle')?.textContent === this.t('tabTheme')) {
      this.renderThemeTab(panelContent);
    }
    const msg = mode === 'dark' 
      ? (this.lang === 'ku' ? 'دۆخی تاریک چالاککرا' : 'Dark theme activated') 
      : (this.lang === 'ku' ? 'دۆخی ڕووناک چالاککرا' : 'Light theme activated');
    this.showToast(msg, 'info');
  },

  toggleWatermarkSetting(checked) {
    this.config.showWatermark = Boolean(checked);
    this.saveConfig();
    this.renderWatermark();
    this.showToast(this.t('toastSaved'), 'success');
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
        ? `USD + ${eco.secondaryCurrency} (${eco.currencySymbol || 'د.ع'})`
        : 'USD only';
    }

    const exSum = document.getElementById('ecoExchangeSummary');
    if (exSum) {
      const formattedRate = new Intl.NumberFormat('en-US').format(eco.exchangeRate || 1310);
      const ruleText = eco.roundingRule > 1 ? `Nearest ${eco.roundingRule}` : 'Exact (cents)';
      exSum.textContent = `1 USD = ${formattedRate} ${eco.secondaryCurrency} · ${ruleText}`;
    }

    const delSum = document.getElementById('ecoDeliverySummary');
    if (delSum) {
      if (eco.pickupOnly) {
        delSum.textContent = 'Pickup only';
      } else {
        const freeText = eco.freeDeliveryOver > 0 ? `Free over $${eco.freeDeliveryOver}` : 'All-order free';
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
        const valText = eco.promoType === 'percent' ? `${eco.promoValue}%` : `$${eco.promoValue}`;
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
      secondaryTotalStr = rule > 1 ? `${new Intl.NumberFormat('en-US').format(rounded)} ${sym}` : `${sym} ${rounded.toFixed(2)}`;

      const unrounded = totalUSD * eco.exchangeRate;
      if (rule > 1 && Math.abs(rounded - unrounded) > 0.01) {
        roundingNote = `
          <div style="font-size:0.75rem;color:rgba(255,255,255,0.65);text-align:right;margin-top:2px;">
            Rounded from ${new Intl.NumberFormat('en-US').format(Math.round(unrounded))} ${sym} (nearest ${rule})
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
        <strong>$${sampleSubtotal.toFixed(2)}</strong>
      </div>
    `;

    if (bd.discount > 0) {
      rows += `
        <div class="economy-preview-line" style="color:#4ade80;">
          <span>${this.t('discount')} (${bd.promoCodeName})</span>
          <strong>−$${bd.discount.toFixed(2)}</strong>
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
          <strong>$${bd.delivery.toFixed(2)}</strong>
        </div>
      `;
    }

    if (bd.tax > 0) {
      rows += `
        <div class="economy-preview-line">
          <span>${this.t('tax')} (${bd.taxLabel} ${bd.taxRate}%)</span>
          <strong>+$${bd.tax.toFixed(2)}</strong>
        </div>
      `;
    } else if (eco.taxEnabled && eco.taxIncluded && eco.taxRate > 0) {
      rows += `
        <div class="economy-preview-line" style="color:rgba(255,255,255,0.65);font-size:0.78rem;">
          <span>${eco.taxLabel} (${eco.taxRate}% included)</span>
          <span>Included</span>
        </div>
      `;
    }

    rows += `
      <div class="economy-preview-total">
        <span>${this.t('total')}</span>
        <div style="text-align:right;">
          <div style="font-size:1.2rem;font-weight:700;color:var(--gold-soft,#eab308);">$${totalUSD.toFixed(2)}</div>
          ${hasSecondary ? `<div style="font-size:0.88rem;color:rgba(255,255,255,0.75);margin-top:2px;">${secondaryTotalStr}</div>${roundingNote}` : ''}
        </div>
      </div>
    `;

    if (!bd.minOrderMet) {
      rows += `
        <div class="economy-preview-alert">
          ⚠️ Min order ($${eco.minimumOrder.toFixed(2)}) not met. Sample is $${sampleSubtotal.toFixed(2)}.
        </div>
      `;
    }

    previewEl.innerHTML = rows;
  },

  saveEconomySettings(e) {
    if (e) e.preventDefault();

    const saveBtn = document.getElementById('btnSaveEconomy');
    if (saveBtn) {
      saveBtn.disabled = true;
      saveBtn.innerHTML = `<span class="btn-spinner"></span> ${this.t('saveEconomy')}`;
    }

    const draftEco = this.getDraftEconomy();
    draftEco.lastUpdatedRate = Date.now();

    this.config.economy = draftEco;

    // Clean up legacy iqdRate
    if (this.config.iqdRate !== undefined) {
      delete this.config.iqdRate;
    }

    this.saveConfig();
    this._draftEconomy = null;
    this.applyEconomy();

    const tsBadge = document.getElementById('lastUpdatedRateText');
    if (tsBadge) {
      tsBadge.textContent = new Date(draftEco.lastUpdatedRate).toLocaleDateString();
    }

    setTimeout(() => {
      if (saveBtn) {
        saveBtn.innerHTML = this.t('saveEconomy');
        saveBtn.disabled = true;
      }
      this.showModalToast(this.t('toastSaved'), 'success');
      this.updateEconomyPreview();
    }, 250);
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
          <span>${prod.emoji || '🎂'}</span>
          <span>${prod.name.en || 'Untitled Product'}</span>
          <span style="font-size:0.85rem;color:var(--muted);font-family:var(--font-sans);font-weight:normal;">($${prod.priceUSD})</span>
        </h5>

        <!-- Photo Uploader -->
        <div class="photo-uploader">
          <div class="photo-uploader__preview" id="prodPreview">
            ${hasImage ? `
              <img src="${currentImg}" alt="${(prod.name.en || 'Product Preview').replace(/"/g, '&quot;')}" referrerpolicy="no-referrer" />
            ` : `
              <div class="preview-emoji">${prod.emoji || '🎂'}</div>
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
              <input type="text" id="pEditEmoji" class="form-input" value="${prod.emoji || '🎂'}" required />
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
              <input type="text" id="pEditNameEn" class="form-input" value="${(prod.name.en || '').replace(/"/g, '&quot;')}" required />
            </div>
            <div class="form-group">
              <label class="form-label" for="pEditNameKu">Name (Kurdish)</label>
              <input type="text" id="pEditNameKu" class="form-input" value="${(prod.name.ku || '').replace(/"/g, '&quot;')}" required />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="pEditPrice">Price (USD)</label>
              <input type="number" id="pEditPrice" class="form-input" value="${prod.priceUSD}" step="0.5" min="1" required />
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
              <input type="text" id="pEditUnitEn" class="form-input" value="${(prod.unit?.en || '8\" Cake (10-12 slices)').replace(/"/g, '&quot;')}" required />
            </div>
            <div class="form-group">
              <label class="form-label" for="pEditUnitKu">Serving Unit (Kurdish)</label>
              <input type="text" id="pEditUnitKu" class="form-input" value="${(prod.unit?.ku || 'کێکی ٨ ئینچ (١٠-١٢ پارچە)').replace(/"/g, '&quot;')}" required />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="pEditDescEn">Description (English)</label>
            <textarea id="pEditDescEn" class="form-textarea" rows="2">${prod.desc?.en || ''}</textarea>
          </div>

          <div class="form-group">
            <label class="form-label" for="pEditDescKu">Description (Kurdish)</label>
            <textarea id="pEditDescKu" class="form-textarea" rows="2">${prod.desc?.ku || ''}</textarea>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="pEditExEn">Exclusions (English, comma separated)</label>
              <input type="text" id="pEditExEn" class="form-input" value="${(prod.exclusions || []).map(e => e.en).join(', ').replace(/"/g, '&quot;')}" placeholder="e.g. Nuts, Frosting" />
            </div>
            <div class="form-group">
              <label class="form-label" for="pEditExKu">Exclusions (Kurdish, comma separated)</label>
              <input type="text" id="pEditExKu" class="form-input" value="${(prod.exclusions || []).map(e => e.ku).join(', ').replace(/"/g, '&quot;')}" placeholder="e.g. گوێز, کرێم" />
            </div>
          </div>

          <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:20px;flex-wrap:wrap;">
            <button type="submit" class="btn btn--primary">${this.t('btnSaveProduct')}</button>
            <button type="button" class="btn btn--ghost" style="color:#b91c1c;border-color:#fca5a5;" onclick="app.deleteProduct('${prod.id}')">${this.t('btnDeleteProduct')}</button>
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
        previewEl.innerHTML = `<img src="${dataUrl}" alt="Product Preview" />`;
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

  removeProductPhoto() {
    this.pendingImageData = '';
    const prod = this.products.find(p => p.id === this.selectedProductId);
    if (prod) {
      prod.img = '';
      this.saveProducts();
      this.renderMenu();
    }

    const previewEl = document.getElementById('prodPreview');
    if (previewEl) {
      const emoji = prod ? prod.emoji || '🎂' : '🎂';
      previewEl.innerHTML = `
        <div class="preview-emoji">${emoji}</div>
        <div class="preview-hint">${this.t('noPhotoHint')}</div>
      `;
    }

    const labelText = document.getElementById('uploadBtnText');
    if (labelText) {
      labelText.textContent = this.t('uploadPhoto');
    }

    const removeBtn = document.getElementById('btnRemovePhoto');
    if (removeBtn) {
      removeBtn.style.display = 'none';
    }

    this.showToast(this.t('prodPhotoRemoved'), 'info');
  },

  addNewProduct() {
    const newId = 'p_' + Date.now();
    const freshProd = {
      id: newId,
      category: 'cakes',
      emoji: '🎂',
      img: '',
      priceUSD: 35,
      tag: 'none',
      name: { en: 'New Artisanal Cake', ku: 'کێکی دەستکردی نوێ' },
      desc: { en: 'Handcrafted sponge layered with fresh cream and seasonal fruits.', ku: 'کێکی دەستکرد بە کرێمی تازە و میوەی وەرزی.' },
      unit: { en: '8" Cake (10-12 slices)', ku: 'کێکی ٨ ئینچ (١٠-١٢ پارچە)' }
    };
    this.products.unshift(freshProd);
    this.selectedProductId = newId;
    this.pendingImageData = '';
    this.saveProducts();
    this.renderMenu();
    this.renderPanelTab('products');
    this.showToast(this.t('toastSaved'), 'success');
  },

  saveProductData(e) {
    e.preventDefault();
    const prod = this.products.find(p => p.id === this.selectedProductId);
    if (!prod) return;

    const emoji = document.getElementById('pEditEmoji').value.trim() || '🎂';
    const category = document.getElementById('pEditCat').value;
    const nameEn = document.getElementById('pEditNameEn').value.trim();
    const nameKu = document.getElementById('pEditNameKu').value.trim();
    const priceUSD = parseFloat(document.getElementById('pEditPrice').value) || 20;
    const tag = document.getElementById('pEditTag').value;
    const unitEn = document.getElementById('pEditUnitEn').value.trim();
    const unitKu = document.getElementById('pEditUnitKu').value.trim();
    const descEn = document.getElementById('pEditDescEn').value.trim();
    const descKu = document.getElementById('pEditDescKu').value.trim();

    const exEn = document.getElementById('pEditExEn').value.split(',').map(s=>s.trim()).filter(Boolean);
    const exKu = document.getElementById('pEditExKu').value.split(',').map(s=>s.trim()).filter(Boolean);
    const exclusions = [];
    const maxLen = Math.max(exEn.length, exKu.length);
    for (let i = 0; i < maxLen; i++) {
      if (exEn[i] || exKu[i]) {
        exclusions.push({
          id: (exEn[i] || exKu[i] || `ex${i}`).replace(/\s+/g, '_').toLowerCase(),
          en: exEn[i] || '',
          ku: exKu[i] || ''
        });
      }
    }
    prod.exclusions = exclusions.length > 0 ? exclusions : null;

    prod.emoji = emoji;
    prod.category = category;
    prod.name = { en: nameEn, ku: nameKu };
    prod.priceUSD = priceUSD;
    prod.tag = tag;
    prod.unit = { en: unitEn, ku: unitKu };
    prod.desc = { en: descEn, ku: descKu };
    prod.img = this.pendingImageData || '';

    const saved = this.saveProducts();
    if (saved) {
      this.renderMenu();
      this.renderPanelTab('products');
      this.showToast(this.t('toastSaved'), 'success');
    }
  },

  deleteProduct(id) {
    const modal = document.getElementById('customConfirmModal');
    const msg = document.getElementById('confirmMessage');
    const btnCancel = document.getElementById('confirmCancelBtn');
    const btnOk = document.getElementById('confirmOkBtn');
    
    msg.textContent = this.t('prodDeleteConfirm') || 'Are you sure you want to delete this product?';
    
    const cleanup = () => {
      modal.classList.remove('is-open');
      btnCancel.onclick = null;
      btnOk.onclick = null;
    };
    
    btnCancel.onclick = cleanup;
    
    btnOk.onclick = () => {
      cleanup();
      const oldLen = this.products.length;
      this.products = this.products.filter(p => p.id !== id);
      this.order = this.order.filter(item => item.productId !== id);
      
      this.selectedProductId = this.products.length > 0 ? this.products[0].id : null;
      this.pendingImageData = this.selectedProductId && this.products.length > 0 && this.products[0].img ? this.products[0].img : '';
      
      this.saveProducts(); if (db) { deleteDoc(doc(db, 'products', id)).catch(e => handleFirestoreError(e, OperationType.DELETE, 'products')); }
      this.renderMenu();
      this.renderTray();
      this.renderPanelTab('products');
      this.showToast(this.t('toastDeleted') || 'Deleted', 'success');
    };
    
    modal.classList.add('is-open');
    return;
  },

  // User Management
  showAddStaffModal() {
    document.getElementById('promptUsername').value = '';
    document.getElementById('promptPassword').value = '';
    document.getElementById('promptName').value = '';
    document.getElementById('promptRole').value = 'staff';
    
    // Clear checkboxes
    const checkboxes = document.querySelectorAll('input[name="staffPerms"]');
    checkboxes.forEach(cb => cb.checked = false);

    document.getElementById('customPromptModal').classList.add('is-open');
  },
  
  submitAddStaff(e) {
    e.preventDefault();
    const username = document.getElementById('promptUsername').value.trim();
    const password = document.getElementById('promptPassword').value.trim();
    const name = document.getElementById('promptName').value.trim() || username;
    const role = document.getElementById('promptRole').value;
    
    // Gather permissions
    const permissions = [];
    document.querySelectorAll('input[name="staffPerms"]:checked').forEach(cb => {
      permissions.push(cb.value);
    });
    
    if (password.length < 4) {
      this.showToast('Password must be at least 4 characters.', 'error');
      return;
    }
    
    this.users.push({
      id: 's_' + Date.now(),
      username,
      password,
      name,
      role,
      permissions
    });
    this.saveUsers();
    this.renderPanelTab('users');
    this.showToast(this.t('staffAdded') || 'Staff added', 'success');
    document.getElementById('customPromptModal').classList.remove('is-open');
  },

  // Data Export / Import / Reset
  importJsonData() {
    try {
      const box = document.getElementById('dataJsonBox');
      const parsed = JSON.parse(box.value);
      if (!parsed.config || !parsed.products || !parsed.users) {
        throw new Error('Missing top-level keys');
      }

      this.config = parsed.config;
      this.products = parsed.products;
      this.users = parsed.users;

      this.saveConfig();
      this.saveProducts();
      this.saveUsers();

      this.renderAll();
      this.showToast(this.t('backupImported'), 'success');
    } catch {
      this.showToast(this.t('toastInvalidJson'), 'error');
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

  factoryReset() {
    if (!confirm('Are you sure? This will wipe all changes, restore factory defaults, and log you out.')) return;
    localStorage.removeItem(KEYS.CONFIG);
    localStorage.removeItem(KEYS.PRODUCTS);
    localStorage.removeItem(KEYS.USERS);
    localStorage.removeItem(KEYS.SESSION);
    localStorage.removeItem(KEYS.PREF);

    this.loadState();
    this.renderAll();
    this.closePanelModal();
    this.showToast(this.t('factoryResetDone'), 'success');
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

    // Close Modals on Backdrop Click & Escape Key
    ['authModal', 'panelModal', 'historyModal'].forEach(id => {
      const modal = document.getElementById(id);
      if (modal) {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            modal.classList.remove('is-open');
          }
        });
      }
    });

    // Close Mobile Nav on outside click
    document.addEventListener('click', (e) => {
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

      if (e.key === 'Escape') {
        if (document.activeElement && document.activeElement.id === 'menuSearchInput') {
          document.activeElement.blur();
        }
        this.closeAuthModal();
        this.closePanelModal();
        this.closeHistoryModal();
        this.closeCustomerDrawer();
        this.closeMobileMenu();
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

