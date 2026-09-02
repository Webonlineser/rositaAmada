const fileInput = document.getElementById('excelFile');
const promoTitleInput = document.getElementById('promoTitleInput');
const promoImageInput = document.getElementById('promoImageInput');
const homeBannerImageInput = document.getElementById('homeBannerImageInput');
const homeEyebrowInput = document.getElementById('homeEyebrowInput');
const homeTitleInput = document.getElementById('homeTitleInput');
const homeTextInput = document.getElementById('homeTextInput');
const homeCtaInput = document.getElementById('homeCtaInput');
const infoBarTextInput = document.getElementById('infoBarTextInput');
const rotatingTextsInput = document.getElementById('rotatingTextsInput');
const previewTableBody = document.getElementById('previewTableBody');
const statusText = document.getElementById('statusText');
const summaryBadge = document.getElementById('summaryBadge');
const jsonOutput = document.getElementById('jsonOutput');
const btnPreview = document.getElementById('btnPreview');
const btnSaveLocal = document.getElementById('btnSaveLocal');
const btnDownloadJson = document.getElementById('btnDownloadJson');
const btnSaveSiteConfig = document.getElementById('btnSaveSiteConfig');

const state = {
  rows: [],
  fileName: '',
  config: {
    promoTitle: '',
    promoImage: ''
  }
};

const productKeys = {
  id: ['id', 'codigo', 'sku'],
  nombre: ['nombre', 'title', 'producto', 'product', 'titulo'],
  marca: ['marca', 'brand', 'fabricante'],
  categoria: ['categoria', 'category', 'tipo', 'departamento'],
  descripcion: ['descripcion', 'description', 'detalle', 'resumen'],
  precio: ['precio', 'price', 'valor'],
  stock: ['stock', 'cantidad', 'qty'],
  imagenes: ['imagenes', 'image', 'imagen', 'foto', 'img', 'foto_principal', 'imagen_principal'],
  talles: ['talles', 'tallas', 'tallas_disponibles', 'sizes', 'size', 'talle', 'talles_disponibles'],
  colores: ['colores', 'colores_disponibles', 'colors', 'color', 'colour', 'colores disponibles'],
  descuento: ['descuento', 'descuento_porcentaje', 'discount', 'porcentaje_descuento', 'off', 'promo_descuento'],
  nuevo: ['nuevo', 'es_nuevo', 'esnuevo', 'new', 'new_arrivals', 'newarrival', 'is_new'],
  promoTitle: ['titulo_promocional', 'promo_title', 'titulo_banner', 'title_promo', 'promo_titulo'],
  promoImage: ['imagen_promocional', 'promo_image', 'banner_imagen', 'imagen_banner', 'foto_promocional']
};

function findValue(row, candidates) {
  for (const candidate of candidates) {
    const value = row[candidate] ?? row[candidate.toUpperCase()] ?? row[candidate.toLowerCase()];
    if (value !== undefined && value !== null && value !== '') return value;
  }

  const normalizedKeys = Object.keys(row).reduce((acc, key) => {
    acc[key.toLowerCase()] = row[key];
    return acc;
  }, {});

  for (const candidate of candidates) {
    if (normalizedKeys[candidate] !== undefined && normalizedKeys[candidate] !== null && normalizedKeys[candidate] !== '') {
      return normalizedKeys[candidate];
    }
  }

  return '';
}

function normalizeNumber(value) {
  if (value === undefined || value === null || value === '') return 0;
  const parsed = Number(String(value).replace(/\$/g, '').replace(/\./g, '').replace(',', '.').trim());
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseList(value) {
  if (value === undefined || value === null || value === '') return [];
  return String(value)
    .split(/[;,|]/)
    .map(item => String(item).trim())
    .filter(Boolean);
}

function normalizeBoolean(value) {
  if (value === undefined || value === null || value === '') return false;
  const text = String(value).trim().toLowerCase();
  if (['si', 'sí', 'yes', 'true', '1', 'nuevo', 'new', 'new arrival', 'novedad', 'destacado'].includes(text)) return true;
  if (['no', 'false', '0'].includes(text)) return false;
  return !!text;
}

function normalizeDiscount(value) {
  if (value === undefined || value === null || value === '') return '';
  const text = String(value).trim();
  const match = text.match(/(\d+(?:[.,]\d+)?)/);
  if (!match) return '';
  const parsed = Number(match[1].replace('.', '').replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : '';
}

function getCurrentConfig() {
  return {
    promoTitle: promoTitleInput.value.trim(),
    promoImage: promoImageInput.value.trim()
  };
}

function getSiteContentConfig() {
  return {
    homeHero: {
      image: homeBannerImageInput?.value.trim() || '',
      eyebrow: homeEyebrowInput?.value.trim() || '',
      title: homeTitleInput?.value.trim() || '',
      text: homeTextInput?.value.trim() || '',
      cta: homeCtaInput?.value.trim() || ''
    },
    infoBarText: infoBarTextInput?.value.trim() || '',
    rotatingTexts: (rotatingTextsInput?.value || '')
      .split('|')
      .map(item => item.trim())
      .filter(Boolean)
  };
}

function buildJsonPayload() {
  return {
    promo: getCurrentConfig(),
    siteContent: getSiteContentConfig(),
    productos: state.rows.map((row, index) => normalizeProduct(row, index))
  };
}

function normalizeProduct(row, index) {
  const idCandidate = findValue(row, productKeys.id);
  const nombre = String(findValue(row, productKeys.nombre) || `Producto ${index + 1}`).trim();
  const marca = String(findValue(row, productKeys.marca) || 'Sin marca').trim();
  const categoria = String(findValue(row, productKeys.categoria) || 'General').trim();
  const descripcion = String(findValue(row, productKeys.descripcion) || nombre).trim();
  const precio = normalizeNumber(findValue(row, productKeys.precio));
  const stock = Math.max(0, Number(parseInt(findValue(row, productKeys.stock) || '0', 10) || 0));
  const imagenesRaw = findValue(row, productKeys.imagenes);
  const imagenes = imagenesRaw
    ? String(imagenesRaw)
        .split(/[;|,]/)
        .map(item => item.trim())
        .filter(Boolean)
    : [];

  const colores = parseList(findValue(row, productKeys.colores));
  const talles = parseList(findValue(row, productKeys.talles));
  const descuento = normalizeDiscount(findValue(row, productKeys.descuento));
  const nuevo = normalizeBoolean(findValue(row, productKeys.nuevo));

  return {
    id: idCandidate || `prod-${index + 1}`,
    nombre,
    marca,
    categoria,
    descripcion,
    precio,
    stock,
    imagenes,
    colores,
    talles,
    descuento: descuento || '',
    nuevo: Boolean(nuevo),
    new_arrivals: Boolean(nuevo),
    activo: true,
    fechaCreacion: new Date().toISOString(),
    promoTitle: findValue(row, productKeys.promoTitle) || getCurrentConfig().promoTitle || '',
    promoImage: findValue(row, productKeys.promoImage) || getCurrentConfig().promoImage || ''
  };
}

function renderPreview() {
  previewTableBody.innerHTML = '';

  if (!state.rows.length) {
    previewTableBody.innerHTML = '<tr class="empty-row"><td colspan="9">Todavía no hay productos cargados.</td></tr>';
    summaryBadge.textContent = '0 productos';
    return;
  }

  state.rows.forEach((row, index) => {
    const producto = normalizeProduct(row, index);
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${producto.id}</td>
      <td>${producto.nombre}</td>
      <td>${producto.marca}</td>
      <td>$${producto.precio.toLocaleString('es-AR')}</td>
      <td>${(producto.colores || []).join(', ') || '-'}</td>
      <td>${(producto.talles || []).join(', ') || '-'}</td>
      <td>${producto.stock}</td>
      <td>${producto.descuento !== '' && producto.descuento !== null && producto.descuento !== undefined ? `${producto.descuento}%` : '-'}</td>
      <td>${producto.nuevo ? 'Sí' : 'No'}</td>
    `;
    previewTableBody.appendChild(tr);
  });

  summaryBadge.textContent = `${state.rows.length} producto${state.rows.length > 1 ? 's' : ''}`;
}

function parseUploadedFile(file) {
  if (!file) return;

  const reader = new FileReader();

  reader.onload = (event) => {
    try {
      const buffer = event.target.result;
      const workbook = XLSX.read(buffer, { type: 'array' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(firstSheet, { defval: '', raw: false });

      state.rows = rows;
      state.fileName = file.name;

      const firstRow = rows[0] || {};
      const promoTitleFromFile = findValue(firstRow, productKeys.promoTitle);
      const promoImageFromFile = findValue(firstRow, productKeys.promoImage);
      state.config = {
        promoTitle: promoTitleFromFile || getCurrentConfig().promoTitle,
        promoImage: promoImageFromFile || getCurrentConfig().promoImage
      };

      promoTitleInput.value = state.config.promoTitle || '';
      promoImageInput.value = state.config.promoImage || '';

      renderPreview();
      jsonOutput.value = JSON.stringify(buildJsonPayload(), null, 2);

      statusText.textContent = `Archivo cargado: ${file.name}. ${rows.length} filas detectadas.`;
    } catch (error) {
      statusText.textContent = 'No se pudo leer ese archivo. Probá con un CSV o Excel válido.';
      console.error(error);
    }
  };

  reader.readAsArrayBuffer(file);
}

function saveToLocalStorage() {
  if (!state.rows.length) {
    statusText.textContent = 'Primero cargá un archivo para guardar la data.';
    return;
  }

  const payload = buildJsonPayload();
  localStorage.setItem('rositaProductosImportados', JSON.stringify(payload));
  statusText.textContent = `Datos guardados localmente para ${payload.productos.length} productos.`;
}

function downloadJson() {
  if (!state.rows.length) {
    statusText.textContent = 'Primero cargá un archivo para generar el JSON.';
    return;
  }

  const payload = buildJsonPayload();
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'productos-importados.json';
  a.click();
  URL.revokeObjectURL(url);

  statusText.textContent = 'JSON descargado correctamente.';
}

promoTitleInput.addEventListener('input', () => {
  state.config.promoTitle = promoTitleInput.value.trim();
  if (state.rows.length) {
    jsonOutput.value = JSON.stringify(buildJsonPayload(), null, 2);
  }
});

promoImageInput.addEventListener('input', () => {
  state.config.promoImage = promoImageInput.value.trim();
  if (state.rows.length) {
    jsonOutput.value = JSON.stringify(buildJsonPayload(), null, 2);
  }
});

btnSaveSiteConfig?.addEventListener('click', () => {
  const savedSiteConfig = getSiteContentConfig();
  localStorage.setItem('rositaSiteConfig', JSON.stringify(savedSiteConfig));
  statusText.textContent = 'Contenido general guardado en la web.';
  jsonOutput.value = JSON.stringify({
    promo: getCurrentConfig(),
    siteContent: savedSiteConfig,
    productos: state.rows.map((row, index) => normalizeProduct(row, index))
  }, null, 2);
});

fileInput.addEventListener('change', (event) => {
  const file = event.target.files?.[0];
  parseUploadedFile(file);
});

btnPreview.addEventListener('click', () => {
  const file = fileInput.files?.[0];
  parseUploadedFile(file);
});

btnSaveLocal.addEventListener('click', saveToLocalStorage);
btnDownloadJson.addEventListener('click', downloadJson);

if (localStorage.getItem('rositaSiteConfig')) {
  try {
    const savedSite = JSON.parse(localStorage.getItem('rositaSiteConfig'));
    if (savedSite?.homeHero) {
      homeBannerImageInput.value = savedSite.homeHero.image || '';
      homeEyebrowInput.value = savedSite.homeHero.eyebrow || '';
      homeTitleInput.value = savedSite.homeHero.title || '';
      homeTextInput.value = savedSite.homeHero.text || '';
      homeCtaInput.value = savedSite.homeHero.cta || '';
    }
    if (savedSite?.infoBarText) {
      infoBarTextInput.value = savedSite.infoBarText || '';
    }
    if (savedSite?.rotatingTexts?.length) {
      rotatingTextsInput.value = savedSite.rotatingTexts.join(' | ');
    }
  } catch (error) {
    console.error('No se pudo leer el contenido general del sitio', error);
  }
}

if (localStorage.getItem('rositaProductosImportados')) {
  try {
    const saved = JSON.parse(localStorage.getItem('rositaProductosImportados'));
    const products = Array.isArray(saved?.productos) ? saved.productos : Array.isArray(saved) ? saved : [];

    if (products.length) {
      state.rows = products.map((item) => ({
        id: item.id,
        nombre: item.nombre,
        marca: item.marca,
        categoria: item.categoria,
        descripcion: item.descripcion,
        precio: item.precio,
        stock: item.stock,
        imagenes: Array.isArray(item.imagenes) ? item.imagenes.join(',') : '',
        colores: Array.isArray(item.colores) ? item.colores.join(', ') : '',
        talles: Array.isArray(item.talles) ? item.talles.join(', ') : '',
        descuento: item.descuento || '',
        nuevo: item.nuevo || item.new_arrivals ? 'si' : 'no'
      }));

      state.config = saved?.promo || { promoTitle: '', promoImage: '' };
      promoTitleInput.value = state.config.promoTitle || '';
      promoImageInput.value = state.config.promoImage || '';

      renderPreview();
      jsonOutput.value = JSON.stringify({ promo: state.config, siteContent: getSiteContentConfig(), productos: products }, null, 2);
      statusText.textContent = 'Se recuperaron productos guardados localmente.';
    }
  } catch (error) {
    console.error('No se pudo leer localStorage', error);
  }
}
