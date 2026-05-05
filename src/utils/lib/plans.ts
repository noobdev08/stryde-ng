export type Plan = "free" | "basic" | "pro"

const planRank: Record<Plan, number> = {
  free: 0,
  basic: 1,
  pro: 2,
}

export function canAccess(userPlan: Plan, requiredPlan: string): boolean {
  return planRank[userPlan] >= planRank[requiredPlan as Plan]
}