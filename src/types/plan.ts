export interface PlanSpot {
  name: string;
  time: string;
  budget: string;
  details: string;
  mapUrl: string;
}

export interface DatePlan {
  title: string;
  overview: string;
  spots: PlanSpot[];
  advice: string;
  totalBudget: string;
}

export interface Spot {
  name: string;
  time: string;
  budget: string;
  details: string;
  mapUrl: string;
}

export interface GeneratedPlan {
  title: string;
  overview: string;
  spots: Spot[];
  advice: string;
  totalBudget: string;
}
