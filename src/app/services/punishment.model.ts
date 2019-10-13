
export interface Punishment {
  punUser: string;
  punBy: string;
  punType: string;
  date: number;
  priorOffenses: number;
  reason: string;
  evidenceURL?: string[];
  extraInfo?: string;
}
