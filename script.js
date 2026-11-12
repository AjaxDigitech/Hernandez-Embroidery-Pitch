var BODY = {
  Red: '#b3202a',
  Royal: '#1f3fa8',
  Black: '#15110d',
  Pink: '#d63384',
  Purple: '#5b2a86'
};

var TRIM = {
  Gold: '#d4af37',
  Silver: '#d9dce1',
  White: '#ffffff'
};

var P = {
  trunks: {
    n: 'Custom trunks',
    p: 85,
    d: 'Satin or sparkle, with waistband name, leg text and patches.'
  },
  robe: {
    n: 'Fight robe',
    p: 150,
    d: 'Walkout robe with your name across the back.'
  },
  hoodie: {
    n: 'Team hoodie',
    p: 55,
    d: 'Coach, team or gym lettering for the whole corner.'
  },
  hat: {
    n: 'Embroidered hat',
    p: 30,
    d: 'Your name or logo, stitched clean on the front.'
  }
};

var IMG = {
  trunks: 'images/product-trunks.jpg',
  robe: 'images/product-robe.jpg',
  hoodie: 'images/product-hoodie.jpg',
  hat: 'images/product-hat.jpg'
};

var S = {
  kind: 'trunks',
  body: 'Red',
  trim: 'Gold',
  text: 'RODRIGUEZ'
};

function art(k, b, t, txt) {
  var c = BODY[b];
  var g = TRIM[t];
  var x = (txt || 'YOUR NAME').toUpperCase();
  var n = x.length;

  var fs = Math.max(11, Math.min(28, 150 / (n * 0.5)));

  var T = function(y, s) {
    return '<text x="150" y="' + y + '" text-anchor="middle" font-family="Big Shoulders Display,Impact,sans-serif" font-weight="800" font-size="' + s + '" letter-spacing="1.5" fill="' + g + '">' + x.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</text>';
  };

  var o = '<svg viewBox="0 0 300 260" role="img" aria-label="' + P[k].n + ' preview">';

  if (k === 'trunks') {
    o += '<path d="M58 64H148L141 222Q98 234 44 218Z" fill="' + c + '"/>';
    o += '<path d="M152 64H242L256 218Q202 234 159 222Z" fill="' + c + '"/>';
    o += '<path d="M58 64L44 218M242 64L256 218" stroke="' + g + '" stroke-width="7" fill="none"/>';
    o += '<path d="M45 205Q98 220 141 210M159 210Q202 220 255 205" stroke="' + g + '" stroke-width="5" fill="none"/>';
    o += '<path d="M58 64H148L146 110Q100 118 52 100Z" fill="#fff" opacity=".08"/>';
    o += '<rect x="52" y="30" width="196" height="40" rx="5" fill="' + c + '" stroke="' + g + '" stroke-width="4"/>';
    o += '<rect x="52" y="30" width="196" height="40" rx="5" fill="#000" opacity=".25"/>';
    o += T(60, fs);
    o += '<circle cx="100" cy="150" r="17" fill="none" stroke="' + g + '" stroke-width="3"/>';
    o += '<path d="M92 150l8-9 8 9-8 9z" fill="' + g + '"/>';
  }

  if (k === 'robe') {
    o += '<path d="M92 40L150 30L208 40L262 118L238 140L222 116V246H78V116L62 140L38 118Z" fill="' + c + '"/>';
    o += '<path d="M92 40L150 30L208 40L150 90Z" fill="' + g + '"/>';
    o += '<path d="M78 236H222" stroke="' + g + '" stroke-width="8"/>';
    o += '<path d="M150 90V246" stroke="#000" opacity=".25" stroke-width="3"/>';
    o += T(150, fs * 0.8);
  }

  if (k === 'hoodie') {
    o += '<path d="M82 60L120 36Q150 74 180 36L218 60L262 112L238 134L222 108V236H78V108L62 134L38 112Z" fill="' + c + '"/>';
    o += '<path d="M120 36Q150 74 180 36Q150 22 120 36Z" fill="#000" opacity=".35"/>';
    o += '<path d="M100 190H200L208 236H92Z" fill="#000" opacity=".2"/>';
    o += T(138, fs * 0.75);
  }

  if (k === 'hat') {
    o += '<path d="M64 160Q60 66 150 66Q240 66 236 160Z" fill="' + c + '"/>';
    o += '<path d="M52 160H248Q262 190 150 196Q38 190 52 160Z" fill="' + c + '" stroke="' + g + '" stroke-width="4"/>';
    o += '<circle cx="150" cy="66" r="6" fill="' + g + '"/>';
    o += T(122, fs * 0.7);
  }

  return o + '</svg>';
}

function dots(id, map, key) {
  var el = document.getElementById(id);
  el.innerHTML = '';
  Object.keys(map).forEach(function(k) {
    var d = document.createElement('button');
    d.type = 'button';
    d.className = 'dot';
    d.style.background = map[k];
    d.title = k;
    d.setAttribute('aria-label', k);
    d.setAttribute('aria-pressed', S[key] === k);
    d.onclick = function() {
      S[key] = k;
      sync();
    };
    el.appendChild(d);
  });
}

function price() {
  var a = +document.getElementById('qty').value || 1;
  var e = 0;
  document.querySelectorAll('[data-p]').forEach(function(c) {
    if (c.checked) e += +c.dataset.p;
  });
  return (P[S.kind].p + e) * a;
}

function sync() {
  document.getElementById('stage').innerHTML = art(S.kind, S.body, S.trim, S.text);
  document.getElementById('stage2').innerHTML = art(S.kind, S.body, S.trim, S.text);

  ['bodyDots', 'fBody'].forEach(function(i) {
    dots(i, BODY, 'body');
  });
  ['trimDots', 'fTrim'].forEach(function(i) {
    dots(i, TRIM, 'trim');
  });

  document.getElementById('prod').value = S.kind;
  document.getElementById('tot').textContent = '$' + price();
}

var cards = document.getElementById('cards');
var sel = document.getElementById('prod');

Object.keys(P).forEach(function(k) {
  var o = document.createElement('option');
  o.value = k;
  o.textContent = P[k].n + ' (from $' + P[k].p + ')';
  sel.appendChild(o);

  var c = document.createElement('div');
  c.className = 'card';
  c.innerHTML = '<div class="art"><img src="' + IMG[k] + '" alt="' + P[k].n + ' by Hernandez Custom Embroidery" loading="lazy"></div><div class="b"><h3>' + P[k].n + '</h3><p>' + P[k].d + '</p><span class="price">From $' + P[k].p + '</span><a class="btn" href="#order" data-k="' + k + '">Customize this</a></div>';
  cards.appendChild(c);
});

cards.addEventListener('click', function(e) {
  var k = e.target.dataset && e.target.dataset.k;
  if (k) {
    S.kind = k;
    sync();
  }
});

sel.onchange = function() {
  S.kind = sel.value;
  sync();
};

document.getElementById('nm').oninput = function() {
  S.text = this.value;
  document.getElementById('txt').value = this.value;
  sync();
};

document.getElementById('txt').value = S.text;

document.getElementById('txt').oninput = function() {
  S.text = this.value;
  document.getElementById('nm').value = this.value;
  sync();
};

document.getElementById('qty').oninput = sync;

document.querySelectorAll('[data-p]').forEach(function(c) {
  c.onchange = sync;
});

document.getElementById('form').onsubmit = function(e) {
  e.preventDefault();

  document.getElementById('sum').textContent = document.getElementById('qty').value + ' × ' + P[S.kind].n + ' for "' + (S.text || 'no text') + '", ' + S.body + ' with ' + S.trim + ' trim, size ' + document.getElementById('size').value + '. Estimated total $' + price() + '.';

  this.style.display = 'none';
  var d = document.getElementById('done');
  d.style.display = 'block';
  d.scrollIntoView({ block: 'center' });
};

sync();

var PS = {
  type: 'Embroidered',
  shape: 'Custom',
  bg: 'Black',
  th: 'Gold',
  border: 'Merrowed',
  back: 'Heat applied',
  img: null
};

var MULT = {
  'Embroidered': 1,
  '3D Puff': 1.5,
  Woven: 0.9,
  Chenille: 2
};

var TIERS = [
  [10, 0, '10 to 24'],
  [25, 0.08, '25 to 49'],
  [50, 0.15, '50 to 99'],
  [100, 0.25, '100 to 249'],
  [250, 0.32, '250+']
];

function $(i) {
  return document.getElementById(i);
}

function chips(id, opts, key) {
  var el = $(id);
  el.innerHTML = '';
  opts.forEach(function(o) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip';
    b.textContent = o;
    b.setAttribute('aria-pressed', PS[key] === o);
    b.onclick = function() {
      PS[key] = o;
      psync();
    };
    el.appendChild(b);
  });
}

function dots2(id, map, key) {
  var el = $(id);
  el.innerHTML = '';
  Object.keys(map).forEach(function(k) {
    var d = document.createElement('button');
    d.type = 'button';
    d.className = 'dot';
    d.style.background = map[k];
    d.title = k;
    d.setAttribute('aria-label', k);
    d.setAttribute('aria-pressed', PS[key] === k);
    d.onclick = function() {
      PS[key] = k;
      psync();
    };
    el.appendChild(d);
  });
}

function qd(q) {
  var d = 0;
  TIERS.forEach(function(t) {
    if (q >= t[0]) d = t[1];
  });
  return d;
}

function unit(q) {
  var a = ((+$('pw').value || 3) + (+$('ph').value || 3)) / 2;
  return Math.max(0.5, (0.9 + 0.5 * a) * MULT[PS.type] * (1 - qd(q))) + (PS.back === 'No backing' ? 0 : 0.5);
}

function pArt() {
  var th = TRIM[PS.th];
  var bg = BODY[PS.bg];
  var sh = {
    Circle: '<circle cx="150" cy="110" r="92"',
    Square: '<rect x="58" y="18" width="184" height="184" rx="14"',
    Rectangle: '<rect x="30" y="45" width="240" height="130" rx="12"',
    Custom: '<path d="M150 14L250 40V110Q250 180 150 208Q50 180 50 110V40Z"'
  }[PS.shape];

  var m = PS.border === 'Merrowed';
  var x = ($('ptx').value || '').toUpperCase().replace(/&/g, '&amp;').replace(/</g, '&lt;');
  var fs = Math.max(12, Math.min(30, 150 / (x.length * 0.55 || 1)));

  var o = '<svg viewBox="0 0 300 220" role="img" aria-label="Patch preview">' + sh + ' fill="' + bg + '" stroke="' + th + '" stroke-width="' + (m ? 10 : 2) + '" stroke-linejoin="round"/>';

  o += '<g transform="translate(150 110) scale(.84) translate(-150 -110)">' + sh + ' fill="none" stroke="' + th + '" stroke-width="2" stroke-dasharray="6 4"/></g>';

  if (PS.img) {
    o += '<image href="' + PS.img + '" x="85" y="48" width="130" height="124" preserveAspectRatio="xMidYMid meet"/>';
  } else {
    o += '<path d="M150 52l14 24-14 24-14-24z" fill="' + th + '"/>';
    o += '<text x="150" y="' + (128 + fs * 0.2) + '" text-anchor="middle" font-family="Big Shoulders Display,Impact,sans-serif" font-weight="800" font-size="' + fs + '" letter-spacing="1.5" fill="' + th + '">' + x + '</text>';
  }

  return o + '</svg>';
}

function psync() {
  chips('pType', Object.keys(MULT), 'type');
  chips('pShape', ['Custom', 'Circle', 'Square', 'Rectangle'], 'shape');
  chips('pBorder', ['Merrowed', 'Heat cut'], 'border');
  chips('pBack', ['No backing', 'Heat applied', 'Peel & stick', 'Velcro'], 'back');
  dots2('pBg', BODY, 'bg');
  dots2('pTh', TRIM, 'th');

  $('pstage').innerHTML = pArt();

  var q = Math.max(10, +$('pqty').value || 10);
  var h = '<tr><th>Quantity</th><th>Each</th><th>Total</th></tr>';

  TIERS.forEach(function(t, i) {
    var n = TIERS[i + 1] ? TIERS[i + 1][0] : 1e9;
    var on = q >= t[0] && q < n;
    var u = unit(t[0]);
    h += '<tr' + (on ? ' class="on"' : '') + '><td>' + t[2] + '</td><td>$' + u.toFixed(2) + '</td><td>$' + (u * t[0]).toFixed(0) + '+</td></tr>';
  });

  $('ptab').innerHTML = h;
  $('ptot').textContent = '$' + (unit(q) * q).toFixed(2);
}

function fin(f, msg) {
  f.style.display = 'none';
  var d = f.nextElementSibling;
  d.querySelector('p').textContent = msg;
  d.style.display = 'block';
  d.scrollIntoView({ block: 'center' });
}

['ptx', 'pw', 'ph', 'pqty'].forEach(function(i) {
  $(i).oninput = psync;
});

$('pfile').onchange = function() {
  var f = this.files[0];
  if (!f) return;
  $('pfn').textContent = f.name;
  PS.img = null;
  if (/^image/.test(f.type)) {
    var r = new FileReader();
    r.onload = function() {
      PS.img = r.result;
      psync();
    };
    r.readAsDataURL(f);
  } else {
    psync();
  }
};

$('qbtn').onclick = function() {
  var q = $('qform');
  q.style.display = 'grid';
  q.scrollIntoView({ block: 'center' });
};

$('pform').onsubmit = function(e) {
  e.preventDefault();
  var q = Math.max(10, +$('pqty').value || 10);
  fin(this, q + ' × ' + PS.type + ' patches, ' + $('pw').value + ' × ' + $('ph').value + ' in, ' + PS.shape.toLowerCase() + ', ' + PS.back.toLowerCase() + '. Estimated total $' + (unit(q) * q).toFixed(2) + '. We will send your free digital proof to approve.');
};

$('qform').onsubmit = function(e) {
  e.preventDefault();
  fin(this, 'Thanks. We will review your request and call or text you with a custom quote.');
};

document.querySelector('#dform .drop input').onchange = function() {
  $('dfn').textContent = this.files.length + ' file' + (this.files.length > 1 ? 's' : '') + ' selected';
};

$('dform').onsubmit = function(e) {
  e.preventDefault();
  fin(this, 'Thanks. We will review your artwork and send a price and turnaround to ' + $('dem').value + '.');
};

psync();
