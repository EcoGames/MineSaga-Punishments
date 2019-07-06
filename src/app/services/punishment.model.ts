export interface Punishment {
  punUser: string;
  punBy: string;
  date: number;
  priorOffenses: number;
  reason: string;
  evidenceURL?: string;
}
