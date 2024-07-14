function generateShortId(): string {
  const fullUUID = crypto.randomUUID();
  return fullUUID.substring(0, 8);
}

export function savePlan(plan: string): string {
  const id = generateShortId();
  localStorage.setItem(`plan_${id}`, plan);
  return id;
}

export function getPlan(id: string): string | null {
  return localStorage.getItem(`plan_${id}`);
}

export function removePlan(id: string): void {
  localStorage.removeItem(`plan_${id}`);
}
