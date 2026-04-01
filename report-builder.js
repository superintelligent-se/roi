function toAbsoluteAssetUrl(path, toAbsoluteUrl) {
  return path && !path.startsWith('http') ? toAbsoluteUrl(path) : path;
}

function createStaticElement(document, tagName, className, innerHTML) {
  const element = document.createElement(tagName);

  if (className) {
    element.className = className;
  }

  element.innerHTML = innerHTML;
  return element;
}

function replaceElementWithStaticContainer(element, document) {
  const replacement = createStaticElement(document, 'div', element.className, element.innerHTML);

  replacement.setAttribute('data-pdf-static', 'true');

  Array.from(element.attributes).forEach((attribute) => {
    if (attribute.name === 'class' || attribute.name === 'type' || attribute.name.startsWith('aria-')) {
      return;
    }

    if (attribute.name.startsWith('data-') && attribute.name !== 'data-lightbox-image' && attribute.name !== 'data-lightbox-alt') {
      return;
    }

    replacement.setAttribute(attribute.name, attribute.value);
  });

  element.replaceWith(replacement);
  return replacement;
}

function replaceDetailsWithStaticBlocks(root, document) {
  root.querySelectorAll('details').forEach((details) => {
    const summary = details.querySelector(':scope > summary');
    const staticBlock = document.createElement('article');

    staticBlock.className = details.className;
    staticBlock.classList.add('pdf-static-details');

    if (summary) {
      staticBlock.appendChild(createStaticElement(document, 'h3', 'pdf-static-summary', summary.innerHTML));
    }

    Array.from(details.children).forEach((child) => {
      if (child.tagName.toLowerCase() === 'summary') {
        return;
      }

      staticBlock.appendChild(child.cloneNode(true));
    });

    details.replaceWith(staticBlock);
  });
}

function normalizeInteractiveElements(root, document) {
  root.querySelectorAll('[data-pdf-exclude]').forEach((element) => {
    element.remove();
  });

  root.querySelectorAll('button').forEach((button) => {
    replaceElementWithStaticContainer(button, document);
  });

  root.querySelectorAll('[disabled], [aria-disabled]').forEach((element) => {
    element.removeAttribute('disabled');
    element.removeAttribute('aria-disabled');
  });

  replaceDetailsWithStaticBlocks(root, document);
}

function absolutizeUrls(root, toAbsoluteUrl) {
  root.querySelectorAll('a[href]').forEach((link) => {
    link.href = toAbsoluteAssetUrl(link.getAttribute('href'), toAbsoluteUrl);
  });

  root.querySelectorAll('img[src], source[src], iframe[src]').forEach((element) => {
    const src = element.getAttribute('src');

    if (src) {
      element.src = toAbsoluteAssetUrl(src, toAbsoluteUrl);
    }
  });
}

function getText(document, selector) {
  return document.querySelector(selector)?.textContent.trim() || '';
}

const PDF_INTRO_COPY = Object.freeze({
  sv: Object.freeze({
    kicker: 'Beslutsunderlag',
    employeeLabel: 'Beräkningen bygger på',
    employeeSuffix: 'tjänstemän'
  }),
  en: Object.freeze({
    kicker: 'Decision Brief',
    employeeLabel: 'The estimate is based on',
    employeeSuffix: 'office employees'
  })
});

function buildPdfIntro({ document, localeKey, resultContext, toAbsoluteUrl }) {
  const intro = document.createElement('section');
  intro.className = 'pdf-intro';
  const introCopy = PDF_INTRO_COPY[localeKey] || PDF_INTRO_COPY.sv;

  const logo = document.querySelector('.brand-mark img');
  const heroTitle = getText(document, '#hero-title');
  const employeeCount = resultContext?.employeeCount || 0;
  const employeeCountLabel = resultContext?.locale || (localeKey === 'en' ? 'en-US' : 'sv-SE');

  intro.innerHTML = `
    <div class="pdf-intro-header">
      ${logo ? `
        <img
          class="pdf-intro-logo"
          src="${toAbsoluteAssetUrl(logo.getAttribute('src'), toAbsoluteUrl)}"
          alt="${logo.getAttribute('alt') || 'Superintelligent'}"
        />
      ` : ''}
      <div class="pdf-intro-copy">
        <span class="pdf-intro-kicker">${introCopy.kicker}</span>
        <h1 class="pdf-intro-title">${heroTitle}</h1>
      </div>
    </div>
    ${employeeCount > 0 && resultContext ? `
      <div class="pdf-intro-highlight" aria-label="${introCopy.employeeLabel}">
        <span class="pdf-intro-highlight-label">${introCopy.employeeLabel}</span>
        <strong class="pdf-intro-highlight-value">${employeeCount.toLocaleString(employeeCountLabel)} ${introCopy.employeeSuffix}</strong>
      </div>
    ` : ''}
  `;

  return intro;
}

export function buildPdfStageFromSections({ document, toAbsoluteUrl, localeKey, resultContext = null }) {
  const stage = document.createElement('div');
  stage.className = 'pdf-export-stage';

  const pdfDocument = document.createElement('div');
  pdfDocument.className = 'pdf-document';
  pdfDocument.dataset.locale = localeKey;

  pdfDocument.appendChild(buildPdfIntro({
    document,
    localeKey,
    resultContext,
    toAbsoluteUrl
  }));

  const sections = Array.from(document.querySelectorAll('[data-pdf-section]'));

  sections.forEach((section) => {
    const clonedSection = section.cloneNode(true);
    normalizeInteractiveElements(clonedSection, document);
    absolutizeUrls(clonedSection, toAbsoluteUrl);
    pdfDocument.appendChild(clonedSection);
  });

  stage.appendChild(pdfDocument);
  return stage;
}
