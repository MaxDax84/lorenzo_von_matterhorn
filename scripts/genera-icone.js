/**
 * genera-icone.js
 * Crea extension/icons/icon16.png, icon48.png, icon128.png
 * usando solo moduli Node.js built-in (zlib, fs, path).
 *
 * Icona: cerchio blu #4285F4 con lettera "F" bianca.
 */

const zlib = require('zlib');
const fs   = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'extension', 'icons');

// ── CRC-32 ────────────────────────────────────────────────────────────────
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xFFFFFFFF;
  for (const b of buf) c = CRC_TABLE[(c ^ b) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}

// ── PNG helpers ───────────────────────────────────────────────────────────
function u32be(n) {
  const b = Buffer.alloc(4);
  b.writeUInt32BE(n >>> 0, 0);
  return b;
}

function pngChunk(type, data) {
  const t = Buffer.from(type, 'ascii');
  const d = Buffer.isBuffer(data) ? data : Buffer.from(data);
  const crcBuf = Buffer.concat([t, d]);
  return Buffer.concat([u32be(d.length), t, d, u32be(crc32(crcBuf))]);
}

// ── Disegna pixel ─────────────────────────────────────────────────────────
// Colori
const BLUE  = [66,  133, 244]; // #4285F4
const WHITE = [255, 255, 255];
const TRANS = null;            // pixel trasparente (alpha=0)

// Bitmap 5×7 per la lettera "F" (1=bianco, 0=sfondo)
const F_BITMAP = [
  [1,1,1,1,1],
  [1,0,0,0,0],
  [1,1,1,1,0],
  [1,0,0,0,0],
  [1,0,0,0,0],
  [1,0,0,0,0],
  [1,0,0,0,0],
];

function isInCircle(x, y, cx, cy, r) {
  const dx = x - cx, dy = y - cy;
  return dx * dx + dy * dy <= r * r;
}

function drawIcon(size) {
  const cx = size / 2, cy = size / 2;
  const r  = size / 2 - 0.5;

  // Scala della lettera F rispetto alla dimensione
  const fCols = F_BITMAP[0].length; // 5
  const fRows = F_BITMAP.length;    // 7
  const scale = Math.max(1, Math.round(size / 18));
  const fW = fCols * scale;
  const fH = fRows * scale;
  const fX = Math.round((size - fW) / 2) - Math.round(scale * 0.5);
  const fY = Math.round((size - fH) / 2);

  const pixels = []; // array di [r,g,b,a] per riga

  for (let y = 0; y < size; y++) {
    const row = [];
    for (let x = 0; x < size; x++) {
      // Fuori dal cerchio → trasparente
      if (!isInCircle(x + 0.5, y + 0.5, cx, cy, r)) {
        row.push([0, 0, 0, 0]);
        continue;
      }

      // Lettera F?
      const fc = Math.floor((x - fX) / scale);
      const fr = Math.floor((y - fY) / scale);
      if (fr >= 0 && fr < fRows && fc >= 0 && fc < fCols && F_BITMAP[fr][fc]) {
        row.push([255, 255, 255, 255]);
      } else {
        row.push([BLUE[0], BLUE[1], BLUE[2], 255]);
      }
    }
    pixels.push(row);
  }
  return pixels;
}

function buildPNG(size) {
  const pixels = drawIcon(size);
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR — RGBA (color type 6)
  const ihdrData = Buffer.concat([
    u32be(size), u32be(size),
    Buffer.from([8, 6, 0, 0, 0])
  ]);
  const ihdr = pngChunk('IHDR', ihdrData);

  // Raw scanlines
  const lines = [];
  for (const row of pixels) {
    const line = Buffer.alloc(1 + size * 4);
    line[0] = 0; // filter None
    for (let x = 0; x < size; x++) {
      line[1 + x*4]     = row[x][0];
      line[1 + x*4 + 1] = row[x][1];
      line[1 + x*4 + 2] = row[x][2];
      line[1 + x*4 + 3] = row[x][3];
    }
    lines.push(line);
  }

  const raw        = Buffer.concat(lines);
  const compressed = zlib.deflateSync(raw, { level: 9 });
  const idat       = pngChunk('IDAT', compressed);
  const iend       = pngChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdr, idat, iend]);
}

// ── Main ──────────────────────────────────────────────────────────────────
fs.mkdirSync(OUT_DIR, { recursive: true });

for (const size of [16, 48, 128]) {
  const buf  = buildPNG(size);
  const file = path.join(OUT_DIR, `icon${size}.png`);
  fs.writeFileSync(file, buf);
  console.log(`✓  icon${size}.png  (${buf.length} bytes)`);
}

console.log('\n✅ Icone estensione generate in extension/icons/');
