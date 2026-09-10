import {
  loginAdmin,
  monitorAuth,
  logoutAdmin,
  saveSiteConfig,
  loadSiteConfig,
  saveProduct,
  saveProducts,
  saveCatalogSnapshot,
  loadProducts,
  savePromoBanner,
  loadPromoBanner,
  uploadImage
} from './firebase-setup.js';

const $ = (id) => document.getElementById(id);
const state = {
  products: [],
  rows: [],
  currentProductId: null,
  siteConfig: {},
  promoBanner: {},
  categoryBanners: {},
  currentProductImages: [],
  catalogFlyers: [],
  stockSearch: '',
  stockPage: 1,
  stockSort: 'codigo-asc',
  demoMode: sessionStorage.getItem('rositaDemoMode') === 'true' || localStorage.getItem('rositaDemoMode') === 'true'
};

if (state.demoMode) {
  localStorage.setItem('rositaDemoMode', 'true');
}

const DEMO_USERNAME = 'nicolas43';
const DEMO_PASSWORD = '1234';

function isLocalEnvironment() {
  return ['localhost', '127.0.0.1', ''].includes(window.location.hostname);
}

const colorAliases = {
  negro: 'black', blanco: 'white', rojo: 'red', azul: 'blue', verde: 'green', amarillo: 'yellow',
  gris: 'gray', grisaceo: 'gray', marron: 'brown', marrón: 'brown', beige: 'beige', rosa: 'pink',
  naranja: 'orange', violeta: 'purple', morado: 'purple'
};

const cssColorOptions = ['black', 'white', 'gray', 'red', 'blue', 'green', 'yellow', 'orange', 'pink', 'purple', 'brown', 'beige'];

const productKeys = {
  id: ['id', 'codigo', 'sku', 'codigo_producto'],
  nombre: ['nombre', 'title', 'producto', 'product', 'titulo'],
  marca: ['marca', 'brand', 'fabricante'],
  categoria: ['categoria', 'category', 'tipo', 'departamento'],
  descripcion: ['descripcion', 'description', 'detalle', 'resumen'],
  precio: ['precio', 'price', 'valor'],
  stock: ['stock', 'cantidad', 'qty'],
  imagenes: ['imagenes', 'image', 'imagen', 'foto', 'img', 'foto_principal', 'imagen_principal'],
  talles: ['talles', 'tallas', 'tallas_disponibles', 'sizes', 'size', 'talle'],
  colores: ['colores', 'colores_disponibles', 'colors', 'color', 'colour'],
  descuento: ['descuento', 'descuento_porcentaje', 'discount', 'porcentaje_descuento', 'off'],
  nuevo: ['nuevo', 'es_nuevo', 'new', 'new_arrivals', 'newarrival', 'is_new'],
  activo: ['activo', 'active', 'visible', 'publicado'],
  stockDetalle: ['stock_detalle', 'stock_por_variante', 'variant_stock']
};

function findValue(row, candidates) {
  const normalized = Object.keys(row).reduce((result, key) => {
    result[key.trim().toLowerCase().replace(/\s+/g, '_')] = row[key];
    return result;
  }, {});
  for (const candidate of candidates) {
    const value = normalized[candidate.toLowerCase()];
    if (value !== undefined && value !== null && value !== '') return value;
  }
  return '';
}

function normalizeNumber(value) {
  if (value === undefined || value === null || value === '') return 0;
  const text = String(value).replace(/\$/g, '').replace(/\s/g, '');
  const parsed = Number(text.includes(',') ? text.replace(/\./g, '').replace(',', '.') : text);
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseList(value) {
  if (Array.isArray(value)) return value.flatMap(parseList);
  if (value === undefined || value === null || value === '') return [];
  return String(value).split(/[;,|]/).map((item) => item.trim()).filter(Boolean);
}

function normalizeColors(value) {
  return [...new Set(parseList(value).map((color) => {
    const normalized = color.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return colorAliases[normalized] || normalized;
  }))];
}

function normalizeBoolean(value, fallback = false) {
  if (typeof value === 'boolean') return value;
  if (value === undefined || value === null || value === '') return fallback;
  return ['si', 'sí', 'yes', 'true', '1', 'nuevo', 'new', 'activo', 'visible'].includes(String(value).trim().toLowerCase());
}

function normalizeDiscount(value) {
  const parsed = normalizeNumber(value);
  return parsed > 0 ? Math.min(parsed, 100) : 0;
}

function totalStockFromDetails(stockDetalle) {
  return Object.values(stockDetalle || {}).reduce((total, sizes) => total + Object.values(sizes || {}).reduce((sum, quantity) => sum + Math.max(0, Number(quantity) || 0), 0), 0);
}

function uniqueProductValues(field) {
  return [...new Set(state.products.map((product) => product[field]).filter(Boolean).map(String))].sort();
}

function populateProductSelectors() {
  [['manualProductBrand', 'Seleccioná una marca', 'marca'], ['manualProductCategory', 'Seleccioná una categoría', 'categoria'], ['productBrandInput', 'Seleccioná una marca', 'marca'], ['productCategoryInput', 'Seleccioná una categoría', 'categoria']].forEach(([id, placeholder, field]) => {
    const select = $(id);
    if (!select) return;
    const currentValue = select.value;
    select.innerHTML = `<option value="">${placeholder}</option>`;
    uniqueProductValues(field).forEach((value) => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });
    if (currentValue && uniqueProductValues(field).includes(currentValue)) select.value = currentValue;
  });
}

function getVariantColors() {
  return normalizeColors($('manualProductColors').value);
}

function refreshVariantColorOptions() {
  const colors = [...new Set([...cssColorOptions, ...getVariantColors()])];
  document.querySelectorAll('.variant-color').forEach((select) => {
    const currentValue = select.value;
    select.innerHTML = '';
    (colors.length ? colors : ['default']).forEach((color) => {
      const option = document.createElement('option');
      option.value = color;
      option.textContent = color === 'default' ? 'General' : color;
      select.appendChild(option);
    });
    if (colors.includes(currentValue)) select.value = currentValue;
  });
}

function addVariantRow() {
  const row = document.createElement('div');
  row.className = 'variant-row';
  row.innerHTML = '<select class="variant-color" aria-label="Color de variante"></select><select class="variant-size" aria-label="Talle de variante" required><option value="">Seleccionar talle</option><option>XS</option><option>S</option><option>M</option><option>L</option><option>XL</option><option>XXL</option><option>36</option><option>37</option><option>38</option><option>39</option><option>40</option><option>41</option><option>42</option><option>43</option><option>44</option><option>45</option><option>46</option></select><input class="variant-quantity" type="number" min="0" value="0" aria-label="Cantidad de variante" required><button class="btn btn-muted variant-remove" type="button" aria-label="Quitar variante">Quitar</button>';
  $('manualVariants').appendChild(row);
  refreshVariantColorOptions();
  row.querySelector('.variant-remove').addEventListener('click', () => {
    row.remove();
    updateCalculatedStock();
  });
  row.querySelector('.variant-quantity').addEventListener('input', updateCalculatedStock);
}

function updateCalculatedStock() {
  const total = [...document.querySelectorAll('.variant-quantity')].reduce((sum, input) => sum + Math.max(0, Number(input.value) || 0), 0);
  $('manualProductStock').value = total;
}

function readManualVariants() {
  const stockDetalle = {};
  const sizes = new Set();
  const colors = new Set();
  let total = 0;
  document.querySelectorAll('.variant-row').forEach((row) => {
    const color = row.querySelector('.variant-color').value || 'default';
    const size = row.querySelector('.variant-size').value.trim();
    const quantity = Math.max(0, Number(row.querySelector('.variant-quantity').value) || 0);
    if (!size) return;
    if (!stockDetalle[color]) stockDetalle[color] = {};
    stockDetalle[color][size] = quantity;
    colors.add(color);
    sizes.add(size);
    total += quantity;
  });
  return { stockDetalle, sizes: [...sizes], colors: [...colors], total };
}

function normalizeProduct(row, index) {
  const id = findValue(row, productKeys.id) || `prod-${index + 1}`;
  const descuento = normalizeDiscount(findValue(row, productKeys.descuento));
  const nuevo = normalizeBoolean(findValue(row, productKeys.nuevo));
  const stockDetalleRaw = findValue(row, productKeys.stockDetalle);
  let stockDetalle = {};
  if (stockDetalleRaw) {
    try { stockDetalle = typeof stockDetalleRaw === 'object' ? stockDetalleRaw : JSON.parse(stockDetalleRaw); } catch { stockDetalle = {}; }
  }
  return {
    id: String(id).trim(),
    nombre: String(findValue(row, productKeys.nombre) || `Producto ${index + 1}`).trim(),
    marca: String(findValue(row, productKeys.marca) || 'Sin marca').trim(),
    categoria: String(findValue(row, productKeys.categoria) || 'General').trim(),
    descripcion: String(findValue(row, productKeys.descripcion) || '').trim(),
    precio: normalizeNumber(findValue(row, productKeys.precio)),
    stock: totalStockFromDetails(stockDetalle) || Math.max(0, Math.floor(normalizeNumber(findValue(row, productKeys.stock)))),
    imagenes: parseList(findValue(row, productKeys.imagenes)).slice(0, 4),
    colores: normalizeColors(findValue(row, productKeys.colores)),
    talle: parseList(findValue(row, productKeys.talles)),
    talles: parseList(findValue(row, productKeys.talles)),
    stock_detalle: stockDetalle,
    descuento,
    sale: descuento > 0,
    nuevo,
    new_arrivals: nuevo,
    activo: normalizeBoolean(findValue(row, productKeys.activo), true),
    origen: String(row.origen || 'excel'),
    fechaCreacion: row.fechaCreacion || new Date().toISOString(),
    fechaActualizacion: new Date().toISOString()
  };
}

function productFromFirestore(product) {
  return normalizeProduct({ ...product, talles: product.talles || product.talle, colores: product.colores }, 0);
}

function setStatus(message, type = 'success') {
  $('statusText').textContent = message;
  const statusBox = $('statusText').closest('.status-box');
  if (statusBox) {
    statusBox.classList.toggle('status-error', type === 'error');
    statusBox.classList.toggle('status-warning', type === 'warning');
  }
}

function showPanelToast(message, type = 'success') {
  const toast = $('panelToast');
  toast.textContent = message;
  toast.className = `panel-toast visible ${type === 'error' ? 'panel-toast-error' : ''}`;
  window.clearTimeout(showPanelToast.timeout);
  showPanelToast.timeout = window.setTimeout(() => {
    toast.classList.remove('visible');
  }, 4200);
}

function showDataWarnings(incomplete) {
  const details = incomplete.slice(0, 8).map(({ product, missing }) => `${product.id}: falta ${missing.join(', ')}`).join(' | ');
  const warning = document.createElement('div');
  warning.className = 'status-box status-warning data-warning';
  warning.innerHTML = `<p><strong>Revisá estos productos antes de publicar:</strong> ${details}${incomplete.length > 8 ? ' | y otros...' : ''}</p>`;
  $('statusText').closest('.admin-card').appendChild(warning);
  setTimeout(() => warning.remove(), 9000);
}

function renderPreview() {
  const body = $('previewTableBody');
  body.innerHTML = '';
  const query = state.stockSearch.trim().toLowerCase();
  const filteredProducts = state.products.filter((product) => !query || [product.id, product.nombre, product.marca, product.categoria].some((value) => String(value || '').toLowerCase().includes(query)));
  const sortedProducts = [...filteredProducts].sort((first, second) => {
    switch (state.stockSort) {
      case 'nombre-asc': return String(first.nombre).localeCompare(String(second.nombre), 'es');
      case 'precio-asc': return Number(first.precio || 0) - Number(second.precio || 0);
      case 'precio-desc': return Number(second.precio || 0) - Number(first.precio || 0);
      case 'stock-desc': return Number(second.stock || 0) - Number(first.stock || 0);
      case 'stock-asc': return Number(first.stock || 0) - Number(second.stock || 0);
      case 'sale-desc': return Number(second.descuento || 0) - Number(first.descuento || 0);
      case 'novedad-desc': return Number(Boolean(second.nuevo || second.new_arrivals)) - Number(Boolean(first.nuevo || first.new_arrivals));
      default: return String(first.id).localeCompare(String(second.id), 'es', { numeric: true });
    }
  });
  const pageSize = 10;
  const pageCount = Math.max(1, Math.ceil(sortedProducts.length / pageSize));
  state.stockPage = Math.min(state.stockPage, pageCount);
  const pageStart = (state.stockPage - 1) * pageSize;
  const visibleProducts = sortedProducts.slice(pageStart, pageStart + pageSize);

  visibleProducts.forEach((product) => {
    const row = document.createElement('tr');
    [product.id, product.nombre, product.categoria, `$${Number(product.precio || 0).toLocaleString('es-AR')}`, product.colores.join(', ') || '-', product.stock, product.nuevo ? 'Si' : 'No', product.sale ? `${product.descuento}%` : 'No', product.activo ? 'Si' : 'No']
      .forEach((value, index) => { const cell = document.createElement('td'); cell.textContent = value; if (index === 3) cell.className = 'price-cell'; row.appendChild(cell); });
    body.appendChild(row);
  });
  $('summaryBadge').textContent = `${state.products.length} producto${state.products.length === 1 ? '' : 's'}`;
  $('stockCountBadge').textContent = `${state.products.length} producto${state.products.length === 1 ? '' : 's'}`;
  $('stockPageSummary').textContent = sortedProducts.length ? `Mostrando ${pageStart + 1}-${Math.min(pageStart + pageSize, sortedProducts.length)} de ${sortedProducts.length}` : 'Sin resultados';
  renderStockPagination(pageCount);
  populateProductSelectors();
  $('jsonOutput').value = JSON.stringify({ promo: state.promoBanner, siteContent: state.siteConfig, productos: state.products }, null, 2);
  renderRecentManualProducts();
}

function renderStockPagination(pageCount) {
  const pagination = $('stockPagination');
  pagination.innerHTML = '';
  if (pageCount <= 1) return;

  const addPageButton = (label, page, disabled = false, active = false) => {
    const button = document.createElement('button');
    button.type = 'button'; button.textContent = label; button.disabled = disabled;
    button.className = active ? 'active' : '';
    button.addEventListener('click', () => { state.stockPage = page; renderPreview(); });
    pagination.appendChild(button);
  };

  addPageButton('Anterior', state.stockPage - 1, state.stockPage === 1);
  const visiblePages = pageCount <= 5
    ? Array.from({ length: pageCount }, (_, index) => index + 1)
    : [...new Set([1, state.stockPage - 1, state.stockPage, state.stockPage + 1, pageCount].filter((page) => page >= 1 && page <= pageCount))].sort((a, b) => a - b);
  let previousPage = 0;
  visiblePages.forEach((page) => {
    if (previousPage && page - previousPage > 1) {
      const dots = document.createElement('span'); dots.textContent = '...'; pagination.appendChild(dots);
    }
    addPageButton(String(page), page, false, page === state.stockPage);
    previousPage = page;
  });
  addPageButton('Última', pageCount, state.stockPage === pageCount);
}

function getMissingProductData(product) {
  const missing = [];
  if (!product.imagenes || !product.imagenes.length) missing.push('imagen principal');
  if (!product.descripcion) missing.push('descripción');
  if (!product.colores || !product.colores.length) missing.push('color');
  if (!product.talles?.length && !product.talle?.length) missing.push('talle');
  if (!product.precio) missing.push('precio');
  return missing;
}

function getProductsWithMissingData(products) {
  return products.map((product) => ({ product, missing: getMissingProductData(product) })).filter((item) => item.missing.length);
}

function renderRecentManualProducts() {
  const container = $('recentManualProducts');
  if (!container) return;
  const manualProducts = state.products
    .filter((product) => product.origen === 'manual')
    .sort((a, b) => new Date(b.fechaCreacion || b.fechaActualizacion || 0) - new Date(a.fechaCreacion || a.fechaActualizacion || 0))
    .slice(0, 5);

  if (!manualProducts.length) {
    container.innerHTML = '<span class="empty-recent-products">Todavía no hay productos manuales publicados.</span>';
    return;
  }

  container.innerHTML = manualProducts.map((product) => `
    <article class="recent-product-item">
      <strong>${product.nombre}</strong>
      <span>${product.id} · $${Number(product.precio || 0).toLocaleString('es-AR')}</span>
    </article>
  `).join('');
}

function getSiteContentConfig() {
  return {
    homeHero: {
      image: $('homeBannerImageInput').value.trim(), eyebrow: $('homeEyebrowInput').value.trim(),
      title: $('homeTitleInput').value.trim(), text: $('homeTextInput').value.trim(), cta: $('homeCtaInput').value.trim()
    },
    infoBarText: $('infoBarTextInput').value.trim(),
    rotatingTexts: $('rotatingTextsInput').value.split('|').map((text) => text.trim()).filter(Boolean),
    categoryBanners: state.categoryBanners,
    catalogFlyers: state.catalogFlyers
  };
}

function fillSiteContent(config, promo = {}) {
  const hero = config.homeHero || {};
  $('homeBannerImageInput').value = hero.image || '';
  $('homeEyebrowInput').value = hero.eyebrow || '';
  $('homeTitleInput').value = hero.title || '';
  $('homeTextInput').value = hero.text || '';
  $('homeCtaInput').value = hero.cta || '';
  $('infoBarTextInput').value = config.infoBarText || '';
  $('rotatingTextsInput').value = (config.rotatingTexts || []).join(' | ');
  state.categoryBanners = config.categoryBanners || {};
  fillCategoryBannerEditor();
  $('promoTitleInput').value = promo.title || promo.promoTitle || '';
  $('promoImageInput').value = promo.image || promo.promoImage || '';
  state.catalogFlyers = Array.isArray(config.catalogFlyers) ? config.catalogFlyers : [];
  renderCatalogFlyers();
}

function renderCatalogFlyers() {
  const container = $('catalogFlyersList');
  if (!container) return;
  if (!state.catalogFlyers.length) {
    container.innerHTML = '<span class="empty-recent-products">Todavía no hay flyers agregados.</span>';
    return;
  }
  container.innerHTML = state.catalogFlyers.map((flyer, index) => `<div class="catalog-flyer-item"><img src="${flyer.url}" alt="Flyer ${index + 1}"><span>Flyer ${index + 1}</span><button type="button" class="btn btn-muted" data-flyer-index="${index}">Quitar</button></div>`).join('');
  container.querySelectorAll('[data-flyer-index]').forEach((button) => button.addEventListener('click', () => {
    state.catalogFlyers.splice(Number(button.dataset.flyerIndex), 1);
    renderCatalogFlyers();
  }));
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function fillCategoryBannerEditor() {
  const category = $('categoryBannerSelector').value;
  const banner = state.categoryBanners[category] || {};
  $('categoryBannerLabelInput').value = banner.etiqueta || '';
  $('categoryBannerTitleInput').value = banner.titulo || '';
  $('categoryBannerTextInput').value = banner.texto || '';
  $('categoryBannerFile').value = '';
  $('categoryBannerPreview').textContent = banner.image ? 'Imagen publicada: disponible en la web.' : 'Sin imagen nueva seleccionada.';
}

async function persistImage(inputId, currentUrl, path) {
  const fileInput = $(inputId);
  const file = fileInput && fileInput.files ? fileInput.files[0] : null;
  if (!file) return currentUrl || '';
  if (state.demoMode) return readFileAsDataUrl(file);
  return uploadImage(file, `${path}/${Date.now()}-${file.name}`);
}

async function persistProductImages(productId, currentUrls = []) {
  const files = ['manualProductImage1', 'manualProductImage2', 'manualProductImage3', 'manualProductImage4']
    .map((id) => $(id).files && $(id).files[0])
    .filter(Boolean);
  if (!files.length) return currentUrls;

  const uploadedUrls = state.demoMode
    ? await Promise.all(files.map(readFileAsDataUrl))
    : await Promise.all(files.map((file) => uploadImage(
      file,
      `productos/${productId}/${Date.now()}-${file.name}`
    )));

  return [...currentUrls, ...uploadedUrls].slice(0, 4);
}

function previewSelectedFile(inputId, previewId) {
  $(inputId).addEventListener('change', () => {
    const fileInput = $(inputId);
    const file = fileInput && fileInput.files ? fileInput.files[0] : null;
    $(previewId).textContent = file ? `Archivo seleccionado: ${file.name}` : 'Sin imagen nueva seleccionada.';
  });
}

function readProductForm() {
  const discount = normalizeDiscount($('productDiscountInput').value);
  const variants = readVariantsFromContainer('productVariants');
  return {
    id: $('productIdInput').value.trim(), nombre: $('productNameInput').value.trim(), marca: $('productBrandInput').value.trim(),
    categoria: $('productCategoryInput').value.trim(), precio: normalizeNumber($('productPriceInput').value), stock: variants.total,
    descripcion: $('productDescriptionInput').value.trim(), colores: variants.colors,
    talle: variants.sizes, talles: variants.sizes, stock_detalle: variants.stockDetalle, imagenes: parseList($('productImagesInput').value).slice(0, 4),
    activo: $('productActiveInput').checked, nuevo: $('productNewInput').checked, new_arrivals: $('productNewInput').checked,
    sale: $('productSaleInput').checked || discount > 0, descuento: discount, fechaActualizacion: new Date().toISOString()
  };
}

function readVariantsFromContainer(containerId) {
  const stockDetalle = {};
  const sizes = new Set();
  const colors = new Set();
  let total = 0;
  document.querySelectorAll(`#${containerId} .variant-row`).forEach((row) => {
    const color = row.querySelector('.variant-color').value || 'black';
    const size = row.querySelector('.variant-size').value;
    const quantity = Math.max(0, Number(row.querySelector('.variant-quantity').value) || 0);
    if (!size) return;
    if (!stockDetalle[color]) stockDetalle[color] = {};
    stockDetalle[color][size] = quantity;
    colors.add(color);
    sizes.add(size);
    total += quantity;
  });
  return { stockDetalle, sizes: [...sizes], colors: [...colors], total };
}

function createVariantRow(containerId, color = 'black', size = '', quantity = 0) {
  const row = document.createElement('div');
  row.className = 'variant-row';
  row.innerHTML = '<select class="variant-color" aria-label="Color de variante"></select><select class="variant-size" aria-label="Talle de variante" required><option value="">Seleccionar talle</option><option>XS</option><option>S</option><option>M</option><option>L</option><option>XL</option><option>XXL</option><option>36</option><option>37</option><option>38</option><option>39</option><option>40</option><option>41</option><option>42</option><option>43</option><option>44</option><option>45</option><option>46</option></select><input class="variant-quantity" type="number" min="0" value="0" aria-label="Cantidad de variante" required><button class="btn btn-muted variant-remove" type="button">Quitar</button>';
  $(containerId).appendChild(row);
  const colorSelect = row.querySelector('.variant-color');
  [...new Set([...cssColorOptions, ...getVariantColors()])].forEach((optionValue) => {
    const option = document.createElement('option'); option.value = optionValue; option.textContent = optionValue; colorSelect.appendChild(option);
  });
  colorSelect.value = color;
  row.querySelector('.variant-size').value = size;
  row.querySelector('.variant-quantity').value = quantity;
  row.querySelector('.variant-remove').addEventListener('click', () => { row.remove(); updateEditCalculatedStock(); });
  row.querySelector('.variant-quantity').addEventListener('input', updateEditCalculatedStock);
}

function updateEditCalculatedStock() {
  $('productStockInput').value = readVariantsFromContainer('productVariants').total;
}

function fillEditVariants(product) {
  $('productVariants').innerHTML = '';
  const details = product.stock_detalle || {};
  Object.entries(details).forEach(([color, sizes]) => Object.entries(sizes || {}).forEach(([size, quantity]) => createVariantRow('productVariants', color, size, quantity)));
  if (!Object.keys(details).length) (product.talles || product.talle || ['M']).forEach((size) => createVariantRow('productVariants', (product.colores || ['black'])[0], size, 0));
  updateEditCalculatedStock();
}

  function readManualProductForm() {
    const discount = normalizeDiscount($('manualProductDiscount').value);
    const variants = readManualVariants();
    return {
      id: $('manualProductId').value.trim(),
      nombre: $('manualProductName').value.trim(),
      marca: $('manualProductBrand').value.trim() || 'Sin marca',
      categoria: $('manualProductCategory').value.trim() || 'General',
      precio: normalizeNumber($('manualProductPrice').value),
      stock: variants.total,
      descripcion: $('manualProductDescription').value.trim(),
      colores: [...new Set([...normalizeColors($('manualProductColors').value), ...variants.colors])],
      talle: variants.sizes,
      talles: variants.sizes,
      stock_detalle: variants.stockDetalle,
      imagenes: parseList($('manualProductImages').value).slice(0, 4),
      activo: $('manualProductActive').checked,
      nuevo: $('manualProductNew').checked,
      new_arrivals: $('manualProductNew').checked,
      sale: $('manualProductSale').checked || discount > 0,
      descuento: discount,
      origen: 'manual',
      fechaCreacion: new Date().toISOString(),
      fechaActualizacion: new Date().toISOString()
    };
  }

  function showManualMessage(message, type = 'success') {
    const box = $('manualProductMessage');
    box.hidden = false;
    box.classList.toggle('status-error', type === 'error');
    box.classList.toggle('status-warning', type === 'warning');
    box.querySelector('p').textContent = message;
  }

  function clearManualProductForm() {
    $('manualProductForm').reset();
    $('manualProductActive').checked = true;
    $('manualVariants').innerHTML = '';
    addVariantRow();
    updateCalculatedStock();
    $('manualProductMessage').hidden = true;
  }

function fillProductForm(product) {
  state.currentProductId = product.id;
  state.currentProductImages = (product.imagenes || []).slice(0, 4);
  $('productIdInput').value = product.id;
  $('productNameInput').value = product.nombre || '';
  $('productBrandInput').value = product.marca || '';
  $('productCategoryInput').value = product.categoria || '';
  $('productPriceInput').value = product.precio || 0;
  $('productStockInput').value = product.stock || 0;
  $('productDescriptionInput').value = product.descripcion || '';
  $('productImagesInput').value = state.currentProductImages.join(', ');
  $('productCurrentImages').textContent = state.currentProductImages.length
    ? state.currentProductImages.map((url, index) => `Foto ${index + 1}: ${url}`).join(' | ')
    : 'No hay fotos cargadas.';
  fillEditVariants(product);
  $('productActiveInput').checked = product.activo !== false;
  $('productNewInput').checked = Boolean(product.nuevo || product.new_arrivals);
  $('productSaleInput').checked = Boolean(product.sale || product.descuento > 0);
  $('productDiscountInput').value = product.descuento || 0;
  $('productForm').hidden = false;
}

function clearProductSearchForm() {
  $('productCodeInput').value = '';
  $('productForm').reset();
  $('productForm').hidden = true;
  $('productVariants').innerHTML = '';
  $('productMessage').hidden = true;
  state.currentProductId = null;
  state.currentProductImages = [];
}

async function persistEditProductImages(productId, currentUrls) {
  const existingUrls = (currentUrls && currentUrls.length ? currentUrls : state.currentProductImages).slice(0, 4);
  const fileInputs = ['productImage1', 'productImage2', 'productImage3', 'productImage4'];
  const nextUrls = [...existingUrls];

  for (let index = 0; index < fileInputs.length; index += 1) {
    const input = $(fileInputs[index]);
    const file = input && input.files ? input.files[0] : null;
    if (!file) continue;
    nextUrls[index] = state.demoMode
      ? await readFileAsDataUrl(file)
      : await uploadImage(file, `productos/${productId}/${Date.now()}-${file.name}`);
  }

  return nextUrls.filter(Boolean).slice(0, 4);
}

async function loadPanelData() {
  if (state.demoMode) {
    const savedProducts = JSON.parse(localStorage.getItem('rositaProductosImportados') || '{"productos":[]}');
    const baseProducts = JSON.parse(localStorage.getItem('rositaCatalogoBase') || '{"productos":[]}');
    const productsById = new Map();
    [...(baseProducts.productos || []), ...(savedProducts.productos || [])].forEach((product) => {
      productsById.set(String(product.id), product);
    });
    const products = [...productsById.values()];
    state.products = products.map(productFromFirestore);
    state.siteConfig = JSON.parse(localStorage.getItem('rositaSiteConfig') || '{}');
    state.promoBanner = JSON.parse(localStorage.getItem('rositaPromoBanner') || '{}');
    fillSiteContent(state.siteConfig, state.promoBanner);
    renderPreview();
    setStatus(`Modo prueba local activo: ${state.products.length} productos disponibles.`);
    return;
  }

  try {
    const [products, config, promo] = await Promise.all([loadProducts(), loadSiteConfig(), loadPromoBanner()]);
    state.products = products.map(productFromFirestore);
    state.siteConfig = config;
    state.promoBanner = promo;
    fillSiteContent(config, promo);
    renderPreview();
    setStatus(`Panel conectado: ${state.products.length} productos cargados desde Firebase.`);
  } catch (error) {
    setStatus(`No se pudo leer Firebase: ${error.message}`, 'error');
  }
}

function parseUploadedFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const workbook = XLSX.read(event.target.result, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      state.rows = XLSX.utils.sheet_to_json(sheet, { defval: '', raw: false });
      state.products = state.rows.map(normalizeProduct);
      renderPreview();
      const incomplete = getProductsWithMissingData(state.products);
      setStatus(`${file.name}: ${state.products.length} productos procesados.${incomplete.length ? ` Aviso: ${incomplete.length} tienen datos faltantes.` : ' Todos tienen los datos principales.'}`, incomplete.length ? 'warning' : 'success');
      if (incomplete.length) showDataWarnings(incomplete);
    } catch (error) {
      setStatus(`No se pudo leer el archivo: ${error.message}`, 'error');
    }
  };
  reader.readAsArrayBuffer(file);
}

$('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const username = $('loginEmail').value.trim();
  const password = $('loginPassword').value;

  if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
    state.demoMode = true;
    sessionStorage.setItem('rositaDemoMode', 'true');
    localStorage.setItem('rositaDemoMode', 'true');
    updatePanelAccess({ email: 'nicolas43 (modo prueba local)' });
    return;
  }

  $('authMessage').querySelector('p').textContent = 'Verificando acceso...';
  try { await loginAdmin(username, password); }
  catch (error) { $('authMessage').querySelector('p').textContent = 'Email o contraseña incorrectos.'; }
});

$('btnLogout').addEventListener('click', async () => {
  if (state.demoMode) {
    state.demoMode = false;
    sessionStorage.removeItem('rositaDemoMode');
    localStorage.removeItem('rositaDemoMode');
    updatePanelAccess(null);
    return;
  }
  await logoutAdmin();
});
$('excelFile').addEventListener('change', (event) => parseUploadedFile(event.target.files ? event.target.files[0] : null));
$('btnPreview').addEventListener('click', () => parseUploadedFile($('excelFile').files ? $('excelFile').files[0] : null));
$('btnAddVariant').addEventListener('click', addVariantRow);
$('manualProductColors').addEventListener('input', refreshVariantColorOptions);
$('btnAddEditVariant').addEventListener('click', () => createVariantRow('productVariants'));
addVariantRow();
$('manualProductForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const product = readManualProductForm();
  if (!product.id || !product.nombre) {
    showManualMessage('Completá el código y el nombre del producto.', 'error');
    return;
  }
  if (state.products.some((item) => String(item.id).toLowerCase() === product.id.toLowerCase())) {
    showManualMessage('Ese código ya existe. Usá Editar por código para modificarlo.', 'error');
    return;
  }

  try {
    product.imagenes = await persistProductImages(product.id, product.imagenes);
    state.products.push(product);
    if (state.demoMode) {
      localStorage.setItem('rositaProductosImportados', JSON.stringify({ productos: state.products }));
    } else {
      await Promise.all([saveProduct(product), saveCatalogSnapshot(state.products)]);
    }
    renderPreview();
    clearManualProductForm();
    const missing = getMissingProductData(product);
    showManualMessage(`${product.nombre} se cargó correctamente y ya está publicado en la web.${missing.length ? ` Aviso: falta ${missing.join(', ')}.` : ''}`, missing.length ? 'warning' : 'success');
  } catch (error) {
    state.products = state.products.filter((item) => item.id !== product.id);
    showManualMessage(`No se pudo agregar el producto: ${error.message}`, 'error');
  }
});
$('btnClearManualProduct').addEventListener('click', clearManualProductForm);
$('stockSearchInput').addEventListener('input', (event) => {
  state.stockSearch = event.target.value;
  state.stockPage = 1;
  renderPreview();
});
$('stockSortSelect').addEventListener('change', (event) => {
  state.stockSort = event.target.value;
  state.stockPage = 1;
  renderPreview();
});
$('btnSaveProducts').addEventListener('click', async () => {
  if (!state.products.length) return setStatus('Primero cargá y procesá un Excel.', 'error');
  const incomplete = getProductsWithMissingData(state.products);
  if (incomplete.length) showDataWarnings(incomplete);
  if (state.demoMode) {
    localStorage.setItem('rositaProductosImportados', JSON.stringify({ productos: state.products }));
    return setStatus(`${state.products.length} productos guardados en modo prueba local.`);
  }
  try {
    await Promise.all([saveProducts(state.products), saveCatalogSnapshot(state.products)]);
    setStatus(`${state.products.length} productos guardados y JSON publicado en Firebase.`);
  }
  catch (error) { setStatus(`No se pudieron guardar los productos: ${error.message}`, 'error'); }
});
$('btnSaveLocal').addEventListener('click', () => {
  localStorage.setItem('rositaProductosImportados', JSON.stringify({ productos: state.products }));
  setStatus('Borrador guardado en este navegador.');
});
$('btnDownloadJson').addEventListener('click', () => {
  const blob = new Blob([$('jsonOutput').value], { type: 'application/json' });
  const url = URL.createObjectURL(blob); const link = document.createElement('a');
  link.href = url; link.download = 'rositaamada-catalogo.json'; link.click(); URL.revokeObjectURL(url);
});
$('btnFindProduct').addEventListener('click', () => {
  const code = $('productCodeInput').value.trim().toLowerCase();
  const product = state.products.find((item) => String(item.id).toLowerCase() === code);
  const message = $('productMessage'); message.hidden = false;
  if (!product) { message.querySelector('p').textContent = 'No encontramos ese codigo en los productos cargados.'; return; }
  message.querySelector('p').textContent = `Editando ${product.nombre} (${product.id}).`;
  fillProductForm(product);
});
$('productForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const product = readProductForm();
  if (!product.id || !product.nombre) return;
  try {
    product.imagenes = await persistEditProductImages(product.id, product.imagenes);
    if (!state.demoMode) await saveProduct(product);
    const index = state.products.findIndex((item) => item.id === state.currentProductId);
    if (index >= 0) state.products[index] = product; else state.products.push(product);
    if (state.demoMode) {
      localStorage.setItem('rositaProductosImportados', JSON.stringify({ productos: state.products }));
    } else {
      await saveCatalogSnapshot(state.products);
    }
    renderPreview();
    clearProductSearchForm();
    showPanelToast('Ficha guardada correctamente y publicada en la web.');
  } catch (error) { $('productMessage').hidden = false; $('productMessage').querySelector('p').textContent = `Error al guardar: ${error.message}`; }
});

$('btnSaveSiteConfig').addEventListener('click', async () => {
  try {
    const homeImage = await persistImage('homeBannerFile', $('homeBannerImageInput').value, 'site/home');
    const promoImage = await persistImage('promoImageFile', $('promoImageInput').value, 'site/promo');
    $('homeBannerImageInput').value = homeImage;
    $('promoImageInput').value = promoImage;
    const selectedCategory = $('categoryBannerSelector').value;
    const currentCategory = state.categoryBanners[selectedCategory] || {};
    const categoryImage = await persistImage('categoryBannerFile', currentCategory.image, `site/categories/${selectedCategory}`);
    state.categoryBanners[selectedCategory] = {
      etiqueta: $('categoryBannerLabelInput').value.trim(),
      titulo: $('categoryBannerTitleInput').value.trim(),
      texto: $('categoryBannerTextInput').value.trim(),
      clase: currentCategory.clase || `banner-${selectedCategory}`,
      image: categoryImage
    };
    const config = getSiteContentConfig();
    const promo = { title: $('promoTitleInput').value.trim(), image: promoImage, updatedAt: new Date().toISOString() };
    if (state.demoMode) {
      localStorage.setItem('rositaSiteConfig', JSON.stringify(config));
      localStorage.setItem('rositaPromoBanner', JSON.stringify(promo));
    } else {
      await Promise.all([saveSiteConfig(config), savePromoBanner(promo)]);
    }
    state.siteConfig = config; state.promoBanner = promo; renderPreview();
    setStatus(state.demoMode ? 'Contenido guardado en modo prueba local.' : 'Contenido, banners y textos guardados en Firebase.');
  }
  catch (error) { setStatus(`No se pudo guardar el contenido: ${error.message}`, 'error'); }
});

$('categoryBannerSelector').addEventListener('change', fillCategoryBannerEditor);
$('btnSaveCategoryBanner').addEventListener('click', () => {
  $('btnSaveSiteConfig').click();
});
$('btnAddCatalogFlyer').addEventListener('click', async () => {
  const input = $('catalogFlyerFile');
  const file = input.files && input.files[0];
  if (!file) {
    setStatus('Elegí un flyer antes de agregarlo a la lista.', 'error');
    return;
  }
  try {
    const url = state.demoMode
      ? await readFileAsDataUrl(file)
      : await uploadImage(file, `catalog/flyers/${Date.now()}-${file.name}`);
    state.catalogFlyers.push({ url, name: file.name });
    input.value = '';
    renderCatalogFlyers();
    setStatus('Flyer agregado a la lista. Presioná “Guardar banners y textos” para publicarlo.');
  } catch (error) {
    setStatus(`No se pudo subir el flyer: ${error.message}`, 'error');
  }
});
previewSelectedFile('homeBannerFile', 'homeBannerPreview');
previewSelectedFile('categoryBannerFile', 'categoryBannerPreview');
previewSelectedFile('promoImageFile', 'promoImagePreview');

function updatePanelAccess(user) {
  const loggedIn = Boolean(user);
  $('panelContent').hidden = !loggedIn;
  $('loginForm').hidden = loggedIn;
  $('btnLogout').hidden = !loggedIn;
  $('authBadge').textContent = state.demoMode ? 'Modo prueba' : (loggedIn ? 'Conectado' : 'Sin iniciar');
  $('authMessage').querySelector('p').textContent = loggedIn ? `Sesión iniciada: ${user.email}` : 'Iniciá sesión para modificar la tienda.';
  if (loggedIn) loadPanelData();
}

document.querySelectorAll('.admin-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.admin-nav a').forEach((item) => item.classList.remove('active'));
    link.classList.add('active');
  });
});

monitorAuth((user) => {
  if (!state.demoMode) updatePanelAccess(user);
});

if (state.demoMode && isLocalEnvironment()) {
  updatePanelAccess({ email: 'nicolas43 (modo prueba local)' });
}
