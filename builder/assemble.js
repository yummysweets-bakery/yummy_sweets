import fs from 'fs';
import path from 'path';

// SITE_URL (e.g. https://example.com/) sets the canonical link and og:url. It is left out
// when unset rather than guessing which host is canonical.
const siteUrl = (process.env.SITE_URL || '').trim();
if (siteUrl && !/^https:\/\/[^\s"<>]+$/.test(siteUrl)) {
  console.error('SITE_URL must be an https:// URL');
  process.exit(1);
}
const siteMeta = siteUrl
  ? `<link rel="canonical" href="${siteUrl}" />\n  <meta property="og:url" content="${siteUrl}" />`
  : '';
const head = fs.readFileSync('builder/head.html', 'utf8').replace(/<!--SITE_URL_META[^>]*-->/, siteMeta);
const styles = fs.readFileSync('builder/styles.css', 'utf8');
const body = fs.readFileSync('builder/body.html', 'utf8');
const app = fs.readFileSync('builder/app.js', 'utf8');

const finalHtml = `${head}
  <style>
${styles}
  </style>
</head>
<body>
${body}

  <script type="module">
${app}
  </script>
</body>
</html>
`;

fs.writeFileSync('index.html', finalHtml, 'utf8');
console.log('Successfully generated self-contained index.html (Bytes: ' + Buffer.byteLength(finalHtml) + ')');
