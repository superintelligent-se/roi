const DAYS_PER_YEAR = 365;
const MONTHS_PER_YEAR = 12;

export function calculateAnnualCost(employeeCount, costPerEmployee) {
  return employeeCount * costPerEmployee;
}

export function calculateCostBreakdown(annualCost) {
  return {
    annualCost,
    monthlyCost: annualCost / MONTHS_PER_YEAR,
    dailyCost: annualCost / DAYS_PER_YEAR
  };
}

export function calculateCostBreakdownFromEmployees(employeeCount, costPerEmployee) {
  return calculateCostBreakdown(calculateAnnualCost(employeeCount, costPerEmployee));
}
