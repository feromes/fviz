import { create } from "zustand";

export type Period = 2017 | 2020 | 2024;

type PeriodState = {
  period: Period;
  setPeriod: (period: Period) => void;
};

export const usePeriodStore = create<PeriodState>((set) => ({
  period: 2017, // default
  setPeriod: (period) => set({ period }),
}));
