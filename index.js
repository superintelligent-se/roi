const LOCALE_KEY = 'sv';
const DEFAULT_LEVEL_ID = 'core';
const DEFAULT_BREAKDOWN = Object.freeze({
  annualCost: 0,
  monthlyCost: 0,
  dailyCost: 0
});
const PDF_STAGE_WIDTH = 794;
const PRINT_WINDOW_NAME = 'superintelligent_pdf_print_sv';
const PRINT_WINDOW_FEATURES = 'popup=yes,width=980,height=1280';
const PRINT_READY_TIMEOUT_MS = 4000;
const DESKTOP_LIGHTBOX_MEDIA_QUERY = '(hover: hover) and (pointer: fine)';

const employeesInput = document.getElementById('employees');
const feedback = document.getElementById('feedback');
const calculateBtn = document.getElementById('calculateBtn');
const downloadPdfBtn = document.getElementById('downloadPdfBtn');
const pdfFeedback = document.getElementById('pdfFeedback');
const pdfExportRoot = document.getElementById('pdfExportRoot');
const yearResult = document.getElementById('yearResult');
const monthResult = document.getElementById('monthResult');
const dayResult = document.getElementById('dayResult');
const inlineResultSummary = document.getElementById('inlineResultSummary');
const inlineYearResult = document.getElementById('inlineYearResult');
const inlineMonthResult = document.getElementById('inlineMonthResult');
const inlineDayResult = document.getElementById('inlineDayResult');
const basisLegend = document.getElementById('basisLegend');
const basisOptions = document.getElementById('basisOptions');
const basisInfoPanel = document.getElementById('basisInfoPanel');
const basisInfoTitle = document.getElementById('basisInfoTitle');
const basisInfoText = document.getElementById('basisInfoText');
const basisTrustLine = document.getElementById('basisTrustLine');
const resultSectionKicker = document.getElementById('resultSectionKicker');
const resultSectionCopy = document.getElementById('resultSectionCopy');
const resultBasisSummary = document.getElementById('resultBasisSummary');
const resultExplainerTitle = document.getElementById('resultExplainerTitle');
const resultExplainerList = document.getElementById('resultExplainerList');
const interpretationGrid = document.getElementById('interpretationGrid');
const proofSectionCopy = document.getElementById('proofSectionCopy');
const methodAccordion = document.getElementById('methodAccordion');
const imageLightbox = document.getElementById('imageLightbox');
const imageLightboxImage = document.getElementById('imageLightboxImage');
const calculatorCorePromise = import('/calculator-core.js');
const contentPromise = import('/content-model.js');
const resultModelPromise = import('/result-model.js');
const reportBuilderPromise = import('/report-builder.js');
const siteUrls = window.SITE_URLS;

let content;
let createResultModel;
let buildPdfStageFromSections;
let currentLevelId = DEFAULT_LEVEL_ID;
let hasCalculatedResult = false;
let currentPdfFileName = 'beslutsunderlag-ai-skuld.pdf';
let currentResultContext = null;
let isExportingPdf = false;
let desktopLightboxMediaQuery;
let activeLightboxTrigger = null;

function getUrl(path) {
  return path.split('.').reduce((value, key) => (value ? value[key] : undefined), siteUrls);
}

function toAbsoluteUrl(path) {
  return new URL(path, window.location.href).href;
}

function applyConfiguredUrls(root = document) {
  root.querySelectorAll('[data-url-key]').forEach((element) => {
    const href = getUrl(element.dataset.urlKey);

    if (typeof href === 'string') {
      element.setAttribute('href', href);
    }
  });
}

function clearPdfFeedback() {
  if (pdfFeedback) {
    pdfFeedback.textContent = '';
  }
}

function setPdfFeedback(message) {
  if (pdfFeedback) {
    pdfFeedback.textContent = message;
  }
}

function formatSEK(value) {
  return new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
    maximumFractionDigits: 0
  }).format(value);
}

function getLevelById(levelId) {
  return content.levels.find((level) => level.id === levelId) || content.levels[0];
}

function validateEmployees(value) {
  if (value === '') {
    return content.validation.empty;
  }

  const number = Number(value);

  if (!Number.isFinite(number)) {
    return content.validation.invalid;
  }

  if (number === 0) {
    return content.validation.zero;
  }

  if (number < 0) {
    return content.validation.negative;
  }

  return '';
}

function createBasisInfoLink() {
  const link = document.createElement('a');
  link.className = 'basis-info-link';
  link.href = getUrl('anchors.methodSources');
  link.textContent = content.basis.methodLinkLabel;
  return link;
}

function renderBasisOptions() {
  basisLegend.textContent = content.basis.legend;
  basisOptions.setAttribute('aria-label', content.basis.groupAriaLabel);
  basisOptions.innerHTML = content.levels.map((level) => `
    <div class="basis-option" data-basis-info="${level.id}">
      <label class="basis-option-control" for="basisLevel${level.id}">
        <input type="radio" name="basisLevel" id="basisLevel${level.id}" value="${level.value}" data-level-id="${level.id}" ${level.id === currentLevelId ? 'checked' : ''} />
        <span class="basis-option-body">
          <span class="basis-option-main">
            <span class="basis-option-label">${level.label}</span>
            <span class="basis-option-amount">${level.amountLabel}</span>
          </span>
        </span>
      </label>
      <div class="basis-option-panel-slot" data-basis-panel-slot="${level.id}"></div>
    </div>
  `).join('');
}

function renderInterpretationGrid() {
  interpretationGrid.innerHTML = content.result.interpretationItems.map((item) => `
    <article class="interpretation-item">
      <h3>${item.title}</h3>
      <p>${item.body}</p>
    </article>
  `).join('');
}

function renderResultExplainer() {
  resultExplainerTitle.textContent = content.result.explainerTitle;
  resultExplainerList.innerHTML = content.result.explainerItems.map((item) => `<li>${item}</li>`).join('');
}

function renderMethodAccordion() {
  const selectedLevel = getLevelById(currentLevelId);
  methodAccordion.innerHTML = content.method.items.map((item) => {
    if (item.type === 'levels') {
      return `
        <details class="method-item" open>
          <summary>${item.summary}</summary>
          <div class="method-panel">
            <p>${item.intro}</p>
            <div class="levels-table-wrap">
              <table class="levels-table">
                <caption class="sr-only">Nivåer för ekonomisk påverkan av AI i kunskapsarbete</caption>
                <thead>
                  <tr>
                    <th scope="col">Nivå</th>
                    <th scope="col">Belopp</th>
                    <th scope="col">Hur det ska läsas</th>
                  </tr>
                </thead>
                <tbody>
                  ${content.levels.map((level) => `
                    <tr data-level-id="${level.id}" class="${level.id === selectedLevel.id ? 'is-selected' : ''}">
                      <th scope="row">
                        <span class="levels-table-level">${level.label}</span>
                        ${level.id === selectedLevel.id ? `<span class="levels-table-badge">${content.basis.selectedBadge}</span>` : ''}
                      </th>
                      <td>${level.methodRange}</td>
                      <td>${level.methodReadAs}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
            ${item.highlight ? `
              <div class="method-highlight" role="note" aria-label="${item.highlight.title}">
                <h3 class="method-highlight-title">${item.highlight.title}</h3>
                <div class="method-highlight-body">
                  ${item.highlight.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join('')}
                </div>
              </div>
            ` : ''}
          </div>
        </details>
      `;
    }

    if (item.type === 'bullets') {
      return `
        <details class="method-item">
          <summary>${item.summary}</summary>
          <div class="method-panel">
            <ul class="method-bullets">
              ${item.bullets.map((bullet) => `<li>${bullet}</li>`).join('')}
            </ul>
          </div>
        </details>
      `;
    }

    if (item.type === 'paragraphs') {
      return `
        <details class="method-item">
          <summary>${item.summary}</summary>
          <div class="method-panel">
            <div class="method-copy">
              ${item.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join('')}
            </div>
          </div>
        </details>
      `;
    }

    return `
      <details class="method-item">
        <summary${item.id ? ` id="${item.id}"` : ''}>${item.summary}</summary>
        <div class="method-panel">
          <ol class="source-list">
            ${item.sources.map((source) => `<li>${source}</li>`).join('')}
          </ol>
        </div>
      </details>
    `;
  }).join('');

  methodAccordion.querySelectorAll('.method-item').forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) {
        return;
      }

      methodAccordion.querySelectorAll('.method-item[open]').forEach((sibling) => {
        if (sibling !== item) {
          sibling.open = false;
        }
      });
    });
  });

  applyConfiguredUrls(methodAccordion);
}

function isDesktopLightboxEnabled() {
  return Boolean(desktopLightboxMediaQuery?.matches);
}

function syncLightboxAvailability() {
  const triggers = document.querySelectorAll('[data-lightbox-trigger]');
  const isEnabled = isDesktopLightboxEnabled();

  triggers.forEach((trigger) => {
    trigger.classList.toggle('is-desktop-lightbox-enabled', isEnabled);
    trigger.disabled = !isEnabled;

    if (isEnabled) {
      trigger.removeAttribute('aria-disabled');
      return;
    }

    trigger.setAttribute('aria-disabled', 'true');
  });

  if (!isEnabled) {
    closeImageLightbox({ returnFocus: false });
  }
}

function openImageLightbox(trigger) {
  if (!isDesktopLightboxEnabled() || !imageLightbox || !imageLightboxImage) {
    return;
  }

  const imageSrc = trigger.dataset.lightboxImage;
  const imageAlt = trigger.dataset.lightboxAlt || '';

  if (!imageSrc) {
    return;
  }

  activeLightboxTrigger = trigger;
  imageLightboxImage.src = imageSrc;
  imageLightboxImage.alt = imageAlt;
  imageLightbox.hidden = false;
  document.body.classList.add('has-open-lightbox');

  const closeButton = imageLightbox.querySelector('.image-lightbox-close');
  closeButton?.focus();
}

function closeImageLightbox({ returnFocus = true } = {}) {
  if (!imageLightbox || imageLightbox.hidden) {
    return;
  }

  imageLightbox.hidden = true;
  document.body.classList.remove('has-open-lightbox');
  imageLightboxImage.removeAttribute('src');
  imageLightboxImage.alt = '';

  if (returnFocus) {
    activeLightboxTrigger?.focus();
  }

  activeLightboxTrigger = null;
}

function bindDesktopImageLightbox() {
  desktopLightboxMediaQuery = window.matchMedia(DESKTOP_LIGHTBOX_MEDIA_QUERY);

  document.querySelectorAll('[data-lightbox-trigger]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      if (!isDesktopLightboxEnabled()) {
        return;
      }

      openImageLightbox(trigger);
    });
  });

  imageLightbox?.addEventListener('click', (event) => {
    if (event.target.closest('[data-lightbox-close]')) {
      closeImageLightbox();
    }
  });

  desktopLightboxMediaQuery.addEventListener('change', syncLightboxAvailability);
  syncLightboxAvailability();
}

function updateMethodLevelSelection() {
  methodAccordion.querySelectorAll('tbody tr[data-level-id]').forEach((row) => {
    const isSelected = row.dataset.levelId === currentLevelId;
    row.classList.toggle('is-selected', isSelected);
    const badge = row.querySelector('.levels-table-badge');

    if (isSelected && !badge) {
      const badgeElement = document.createElement('span');
      badgeElement.className = 'levels-table-badge';
      badgeElement.textContent = content.basis.selectedBadge;
      row.querySelector('th').appendChild(badgeElement);
    }

    if (!isSelected && badge) {
      badge.remove();
    }
  });
}

function applyContentCopy() {
  basisTrustLine.textContent = content.basis.trustLine;
  resultSectionKicker.textContent = content.result.kicker;
  resultSectionCopy.innerHTML = content.result.copy;
  proofSectionCopy.textContent = content.method.sectionCopy;
  renderResultExplainer();
  renderInterpretationGrid();
  applyConfiguredUrls();
}

function closeBasisInfo() {
  basisInfoPanel.hidden = true;
  basisInfoPanel.setAttribute('hidden', '');
  basisInfoPanel.removeAttribute('data-basis-info');
  basisInfoTitle.textContent = '';
  basisInfoText.textContent = '';
}

function setActiveLevel(levelId) {
  currentLevelId = levelId;
  const level = getLevelById(levelId);

  basisOptions.querySelectorAll('.basis-option').forEach((option) => {
    option.classList.toggle('is-info-open', option.dataset.basisInfo === level.id);
  });

  basisInfoPanel.dataset.basisInfo = level.id;
  basisInfoTitle.textContent = level.infoTitle;
  basisInfoText.textContent = level.infoCopy;
  basisInfoText.append(' ');
  basisInfoText.appendChild(createBasisInfoLink());
  basisInfoPanel.hidden = false;
  basisInfoPanel.removeAttribute('hidden');

  updateMethodLevelSelection();
}

function setResults(values) {
  yearResult.textContent = values.annual;
  monthResult.textContent = values.monthly;
  dayResult.textContent = values.daily;
  inlineYearResult.textContent = values.annual;
  inlineMonthResult.textContent = values.monthly;
  inlineDayResult.textContent = values.daily;
  inlineResultSummary.classList.toggle('is-visible', values.isCalculated);
}

function createCurrentResultContext(breakdown, isCalculated, employeeCount = 0) {
  return createResultModel({
    content,
    selectedLevel: getLevelById(currentLevelId),
    breakdown,
    isCalculated,
    currencyFormatter: formatSEK,
    employeeCount
  });
}

function applyResultContext(resultContext) {
  currentResultContext = resultContext;
  setResults({
    annual: resultContext.formattedValues.annual,
    monthly: resultContext.formattedValues.monthly,
    daily: resultContext.formattedValues.daily,
    isCalculated: resultContext.isCalculated
  });
  resultBasisSummary.textContent = resultContext.resultSummary;
  hasCalculatedResult = resultContext.isCalculated;
  currentPdfFileName = resultContext.isCalculated ? resultContext.fileName : `${content.fileNamePrefix}.pdf`;
  clearPdfFeedback();
  updatePdfButton();
}

function createPdfExportStage() {
  const pdfStage = buildPdfStageFromSections({
    localeKey: LOCALE_KEY,
    document,
    toAbsoluteUrl,
    resultContext: currentResultContext
  });

  pdfStage.style.width = `${PDF_STAGE_WIDTH}px`;
  return pdfStage;
}

function createPrintDocumentMarkup(pdfStage) {
  return `<!doctype html>
<html lang="sv">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${currentPdfFileName || 'beslutsunderlag'}</title>
  <style>html,body{margin:0;padding:0;background:#fff;}</style>
  <link rel="stylesheet" href="${toAbsoluteUrl('/index.css')}" />
</head>
<body>
  ${pdfStage.outerHTML}
</body>
</html>`;
}

function logPrintStep(step, details = {}) {
  console.debug('PDF print flow', {
    step,
    ...details
  });
}

function failPrintFlow(message, details = {}, error = null) {
  if (error) {
    console.error('PDF print flow failed', {
      message,
      ...details,
      error
    });
  } else {
    console.error('PDF print flow failed', {
      message,
      ...details
    });
  }

  setPdfFeedback(message);
}

function updatePdfButton() {
  downloadPdfBtn.disabled = !hasCalculatedResult || isExportingPdf;

  if (isExportingPdf) {
    downloadPdfBtn.textContent = content.pdfButtons.loading;
  } else if (hasCalculatedResult) {
    downloadPdfBtn.textContent = content.pdfButtons.ready;
  } else {
    downloadPdfBtn.textContent = content.pdfButtons.disabled;
  }

  downloadPdfBtn.setAttribute('aria-disabled', String(downloadPdfBtn.disabled));

}

function openPrintWindow() {
  logPrintStep('open_attempt', {
    name: PRINT_WINDOW_NAME,
    features: PRINT_WINDOW_FEATURES
  });

  const printWindow = window.open('', PRINT_WINDOW_NAME, PRINT_WINDOW_FEATURES);

  if (!printWindow) {
    failPrintFlow('Det gick inte att öppna utskriftsfönstret. Webbläsaren blockerade det sannolikt. Öppna popup-fönster för sidan och försök igen.', {
      reason: 'window_open_returned_null'
    });
    return null;
  }

  if (printWindow.closed) {
    failPrintFlow('Utskriftsfönstret stängdes direkt och kunde inte användas för PDF-exporten.', {
      reason: 'window_closed_immediately'
    });
    return null;
  }

  logPrintStep('open_success', {
    closed: printWindow.closed
  });

  return printWindow;
}

function waitForPrintWindowReady(printWindow) {
  return new Promise((resolve) => {
    let resolved = false;

    const finish = (reason) => {
      if (resolved) {
        return;
      }

      resolved = true;
      logPrintStep('ready', { reason });
      resolve(reason);
    };

    const onLoad = () => finish('window_load');
    printWindow.addEventListener('load', onLoad, { once: true });

    window.setTimeout(() => {
      finish('timeout_fallback');
    }, PRINT_READY_TIMEOUT_MS);
  });
}

async function printPdfStage(pdfStage) {
  const printWindow = openPrintWindow();

  if (!printWindow) {
    return false;
  }

  try {
    logPrintStep('document_write_start');
    printWindow.document.open();
    printWindow.document.write(createPrintDocumentMarkup(pdfStage));
    printWindow.document.close();
    logPrintStep('document_write_complete');
  } catch (error) {
    failPrintFlow('Utskriftsfönstret öppnades, men dokumentet kunde inte förberedas för PDF-export.', {
      reason: 'document_write_failed'
    }, error);
    return false;
  }

  try {
    await waitForPrintWindowReady(printWindow);
  } catch (error) {
    failPrintFlow('Utskriftsfönstret öppnades, men innehållet hann inte bli klart för utskrift.', {
      reason: 'window_ready_wait_failed'
    }, error);
    return false;
  }

  try {
    printWindow.focus();
    logPrintStep('print_start');
    printWindow.print();
    logPrintStep('print_called');
    return true;
  } catch (error) {
    failPrintFlow('Utskriftsfönstret öppnades, men utskriftsdialogen kunde inte startas automatiskt. Använd webbläsarens vanliga utskrift i det öppnade fönstret.', {
      reason: 'print_failed'
    }, error);
    return false;
  }
}

async function exportPdfFromStage(pdfStage) {
  pdfExportRoot.innerHTML = '';
  pdfExportRoot.appendChild(pdfStage);
  return printPdfStage(pdfStage);
}

async function exportDecisionPdf() {
  if (!hasCalculatedResult || isExportingPdf || !currentResultContext) {
    return;
  }

  isExportingPdf = true;
  updatePdfButton();
  clearPdfFeedback();

  const pdfStage = createPdfExportStage();

  try {
    await exportPdfFromStage(pdfStage);
  } catch (error) {
    failPrintFlow('PDF-exporten misslyckades innan utskriftsfönstret kunde startas.', {
      reason: 'export_pdf_from_stage_failed'
    }, error);
  } finally {
    pdfExportRoot.innerHTML = '';
    isExportingPdf = false;
    updatePdfButton();
  }
}

async function runCalculation() {
  const value = employeesInput.value.trim();
  const errorMessage = validateEmployees(value);

  if (errorMessage) {
    feedback.textContent = errorMessage;
    clearPdfFeedback();
    return;
  }

  feedback.textContent = '';
  clearPdfFeedback();
  const employees = Number(value);
  const { calculateCostBreakdownFromEmployees } = await calculatorCorePromise;
  const level = getLevelById(currentLevelId);
  const breakdown = calculateCostBreakdownFromEmployees(employees, level.value);
  applyResultContext(createCurrentResultContext(breakdown, true, employees));
}

function renderInitialState() {
  applyResultContext(createCurrentResultContext(DEFAULT_BREAKDOWN, false, 0));
}

function revealHashTarget() {
  const hash = window.location.hash;

  if (!hash || !hash.startsWith('#')) {
    return;
  }

  const targetId = decodeURIComponent(hash.slice(1));
  const target = targetId ? document.getElementById(targetId) : null;

  if (!target) {
    return;
  }

  const detailsItem = target.closest('.method-item');

  if (detailsItem) {
    detailsItem.open = true;
    methodAccordion.querySelectorAll('.method-item[open]').forEach((item) => {
      if (item !== detailsItem) {
        item.open = false;
      }
    });
  }

  window.requestAnimationFrame(() => {
    target.scrollIntoView({
      block: 'start',
      inline: 'nearest'
    });
  });
}

function bindEvents() {
  basisOptions.addEventListener('change', (event) => {
    const input = event.target.closest('input[name="basisLevel"]');

    if (!input) {
      return;
    }

    setActiveLevel(input.dataset.levelId);

    if (!validateEmployees(employeesInput.value.trim())) {
      void runCalculation();
    } else {
      renderInitialState();
    }
  });

  calculateBtn.addEventListener('click', () => {
    void runCalculation();
  });

  downloadPdfBtn.addEventListener('click', () => {
    void exportDecisionPdf();
  });

  employeesInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      void runCalculation();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeImageLightbox();
    }
  });

  window.addEventListener('hashchange', revealHashTarget);
}

async function init() {
  const [{ getContentForLocale }, resultModel, reportBuilder] = await Promise.all([contentPromise, resultModelPromise, reportBuilderPromise]);
  content = getContentForLocale(LOCALE_KEY);
  createResultModel = resultModel.createResultModel;
  buildPdfStageFromSections = reportBuilder.buildPdfStageFromSections;

  renderBasisOptions();
  renderMethodAccordion();
  applyContentCopy();
  bindEvents();
  bindDesktopImageLightbox();
  applyConfiguredUrls();
  setActiveLevel(DEFAULT_LEVEL_ID);
  renderInitialState();
  revealHashTarget();
}

void init();
