import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const width = 5619;
const height = 4291;
const out = resolve("assets/generated/the-block-best-crypto-hardware-wallets-2026.svg");

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

function leaf(x, y, angle, scale = 1, flip = 1, opacity = 1) {
  return `
  <g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${angle.toFixed(1)}) scale(${(scale * flip).toFixed(3)} ${scale.toFixed(3)})" opacity="${opacity}">
    <path d="M0,0 C58,-70 162,-89 252,-13 C159,68 55,66 0,0 Z" fill="url(#leafGold)" stroke="#b88420" stroke-width="5" stroke-linejoin="round"/>
    <path d="M16,-2 C78,-8 159,-12 231,-12" fill="none" stroke="url(#leafVein)" stroke-width="5" stroke-linecap="round" opacity=".55"/>
    <path d="M82,-10 C118,-38 154,-51 199,-45" fill="none" stroke="#f1d58f" stroke-width="4" stroke-linecap="round" opacity=".42"/>
    <path d="M81,9 C126,31 168,35 215,12" fill="none" stroke="#8f6419" stroke-width="3.5" stroke-linecap="round" opacity=".28"/>
  </g>`;
}

function star(cx, cy, rOuter = 86, rInner = 35) {
  const pts = [];
  for (let i = 0; i < 10; i += 1) {
    const r = i % 2 === 0 ? rOuter : rInner;
    const a = (-90 + i * 36) * Math.PI / 180;
    pts.push(`${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r).toFixed(1)}`);
  }
  return `<polygon points="${pts.join(" ")}" fill="url(#richGold)" stroke="#b77e21" stroke-width="7" stroke-linejoin="round"/>`;
}

const leftLeaves = [
  [710, 3210, -48, .92], [870, 3035, -35, .92], [665, 2800, -64, .88], [920, 2620, -27, .9],
  [650, 2380, -73, .83], [940, 2220, -20, .83], [690, 1990, -81, .79], [1010, 1850, -11, .8],
  [760, 1665, -89, .75], [1120, 1545, -4, .77], [865, 1390, -97, .72], [1240, 1260, 3, .72],
  [1025, 1125, -104, .68], [1370, 1008, 10, .67], [1210, 875, -111, .62], [1536, 760, 17, .61],
  [1455, 622, -118, .56], [1735, 542, 24, .56], [680, 3450, -25, .8], [1050, 3500, -3, .78],
  [1290, 3658, -2, .75], [1625, 3820, 7, .67]
];

const rightLeaves = leftLeaves.map(([x, y, a, s]) => [width - x, y, 180 - a, s]);

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">
<title id="title">${esc("Featured in The Block - Best Crypto Hardware Wallets 2026")}</title>
<desc id="desc">${esc("A vector award badge with gold laurel branches, The Block branding, Best Crypto Hardware Wallets, and 2026.")}</desc>
<defs>
  <radialGradient id="paperGlow" cx="50%" cy="46%" r="65%">
    <stop offset="0%" stop-color="#ffffff"/>
    <stop offset="64%" stop-color="#ffffff"/>
    <stop offset="100%" stop-color="#f5f3ef"/>
  </radialGradient>
  <linearGradient id="blackInk" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#1d1d1f"/>
    <stop offset="50%" stop-color="#050506"/>
    <stop offset="100%" stop-color="#181819"/>
  </linearGradient>
  <linearGradient id="richGold" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#b67818"/>
    <stop offset="22%" stop-color="#f4d889"/>
    <stop offset="46%" stop-color="#c78a22"/>
    <stop offset="70%" stop-color="#9f6715"/>
    <stop offset="100%" stop-color="#e8bf62"/>
  </linearGradient>
  <linearGradient id="leafGold" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="#b97918"/>
    <stop offset="30%" stop-color="#f2d58a"/>
    <stop offset="58%" stop-color="#c98921"/>
    <stop offset="82%" stop-color="#a76e18"/>
    <stop offset="100%" stop-color="#efcf7a"/>
  </linearGradient>
  <linearGradient id="leafVein" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="#f7df9b"/>
    <stop offset="55%" stop-color="#a36d19"/>
    <stop offset="100%" stop-color="#ffe5a2"/>
  </linearGradient>
  <linearGradient id="ruleGold" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="#ffffff" stop-opacity="0"/>
    <stop offset="12%" stop-color="#c6871e"/>
    <stop offset="48%" stop-color="#f3d68c"/>
    <stop offset="88%" stop-color="#b87818"/>
    <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
  </linearGradient>
  <filter id="softShadow" x="-20%" y="-20%" width="140%" height="150%">
    <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#000000" flood-opacity=".18"/>
  </filter>
  <filter id="goldShadow" x="-20%" y="-20%" width="140%" height="150%">
    <feDropShadow dx="0" dy="13" stdDeviation="9" flood-color="#6d4308" flood-opacity=".25"/>
  </filter>
  <style>
    .sans { font-family: Helvetica, Arial, sans-serif; }
    .top-copy { font-size: 237px; font-weight: 500; letter-spacing: 34px; fill: url(#blackInk); }
    .brand { font-size: 462px; font-weight: 900; letter-spacing: 4px; fill: url(#blackInk); }
    .award { font-size: 365px; font-weight: 800; letter-spacing: -4px; fill: url(#richGold); }
    .year { font-size: 345px; font-weight: 900; letter-spacing: 72px; fill: url(#blackInk); }
  </style>
</defs>

<rect width="100%" height="100%" fill="url(#paperGlow)"/>

<g id="laurel" filter="url(#goldShadow)">
  <path d="M2821,4052 C2525,3864 2030,3748 1585,3655 C1010,3535 653,3138 618,2465 C593,1985 744,1527 1042,1122 C1250,839 1478,651 1683,497"
        fill="none" stroke="url(#richGold)" stroke-width="24" stroke-linecap="round"/>
  <path d="M2798,4052 C3094,3864 3589,3748 4034,3655 C4609,3535 4966,3138 5001,2465 C5026,1985 4875,1527 4577,1122 C4369,839 4141,651 3936,497"
        fill="none" stroke="url(#richGold)" stroke-width="24" stroke-linecap="round"/>
  <path d="M2659,3985 C2716,4038 2776,4062 2810,4064 C2842,4061 2902,4035 2961,3985" fill="none" stroke="#a96f18" stroke-width="24" stroke-linecap="round"/>
  ${leftLeaves.map((args) => leaf(...args)).join("\n")}
  ${rightLeaves.map((args) => leaf(...args)).join("\n")}
</g>

<g id="the-block-mark" transform="translate(2809.5 704)" filter="url(#softShadow)">
  <path d="M0,-278 L274,-165 L274,165 L0,278 L-274,165 L-274,-165 Z" fill="none" stroke="#111113" stroke-width="43" stroke-linejoin="miter"/>
  <path d="M-274,-165 L0,-52 L274,-165" fill="none" stroke="#111113" stroke-width="43" stroke-linejoin="miter"/>
  <path d="M-274,165 L0,52 L274,165" fill="none" stroke="#111113" stroke-width="43" stroke-linejoin="miter"/>
  <path d="M0,-52 L0,52" fill="none" stroke="#111113" stroke-width="43" stroke-linecap="square"/>
  <path d="M-82,-50 L0,-84 L82,-50 L82,50 L0,84 L-82,50 Z" fill="none" stroke="#111113" stroke-width="38" stroke-linejoin="miter"/>
</g>

<text class="sans top-copy" text-anchor="middle" x="2809.5" y="1313">FEATURED IN</text>
<text class="sans brand" text-anchor="middle" x="2809.5" y="1820">THE BLOCK</text>

<g id="separator">
  <path d="M1260,2047 C1668,2032 2088,2033 2513,2047 C2116,2071 1669,2074 1260,2047 Z" fill="url(#ruleGold)"/>
  <circle cx="2809.5" cy="2048" r="61" fill="url(#blackInk)" filter="url(#softShadow)"/>
  <path d="M3106,2047 C3514,2032 3934,2033 4359,2047 C3962,2071 3515,2074 3106,2047 Z" fill="url(#ruleGold)"/>
</g>

<g id="award-title" filter="url(#goldShadow)">
  <text class="sans award" text-anchor="middle" x="2809.5" y="2540">Best Crypto</text>
  <text class="sans award" text-anchor="middle" x="2809.5" y="2923">Hardware Wallets</text>
</g>

<g id="year-row" filter="url(#softShadow)">
  ${star(2075, 3429, 86, 34)}
  <text class="sans year" text-anchor="middle" x="2814" y="3562">2026</text>
  ${star(3548, 3429, 86, 34)}
</g>
</svg>
`;

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, svg, "utf8");
console.log(out);
