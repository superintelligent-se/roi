function slugifySegment(value) {
  return String(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function formatIsoDate(date = new Date()) {
  return new Date(date).toISOString().slice(0, 10);
}

export function createResultModel({
  content,
  selectedLevel,
  breakdown,
  isCalculated,
  currencyFormatter,
  employeeCount = 0
}) {
  const generatedAt = new Date();
  const formattedValues = {
    annual: content.periodLabels.annual(currencyFormatter(breakdown.annualCost)),
    monthly: content.periodLabels.monthly(currencyFormatter(breakdown.monthlyCost)),
    daily: content.periodLabels.daily(currencyFormatter(breakdown.dailyCost))
  };
  const generatedDate = new Intl.DateTimeFormat(content.locale, content.dateFormat).format(generatedAt);
  const isoDate = formatIsoDate(generatedAt);
  const fileName = `${content.fileNamePrefix}-${isoDate}-${slugifySegment(selectedLevel.label)}.pdf`;
  const resultSummary = `${content.basis.resultSummaryPrefix} ${selectedLevel.label} (${selectedLevel.amountLabel}) ${content.basis.resultSummarySuffix}`;

  return {
    isCalculated,
    employeeCount,
    fileName,
    formattedValues,
    generatedDate,
    locale: content.locale,
    isoDate,
    resultSummary,
    selectedLevel
  };
}
