"use client";

import { useEffect, useState } from "react";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
  type ChartOptions,
  type ScriptableContext,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
);

ChartJS.defaults.font.family =
  'Mona Sans Variable, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif';

/* ----------------------------- Tema & utilitas ---------------------------- */

function useChartColors() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const el = document.documentElement;
    const update = () => setDark(el.classList.contains("dark"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return dark
    ? { tick: "rgba(226,232,240,0.65)", grid: "rgba(226,232,240,0.10)", dot: "#0b1220" }
    : { tick: "rgba(51,65,85,0.65)", grid: "rgba(51,65,85,0.10)", dot: "#ffffff" };
}

function hexToRgba(hex: string, alpha: number) {
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function areaGradient(color: string) {
  return (context: ScriptableContext<"line">) => {
    const { ctx, chartArea } = context.chart;
    if (!chartArea) return hexToRgba(color, 0.2);
    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    gradient.addColorStop(0, hexToRgba(color, 0.45));
    gradient.addColorStop(0.55, hexToRgba(color, 0.12));
    gradient.addColorStop(1, hexToRgba(color, 0));
    return gradient;
  };
}

/* -------------------------------- Sparkline ------------------------------ */

export function Sparkline({ data, color = "#2f6bff" }: { data: number[]; color?: string }) {
  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 800 },
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: { x: { display: false }, y: { display: false } },
    elements: { point: { radius: 0 }, line: { borderWidth: 2, tension: 0.4 } },
  };

  return (
    <div className="relative h-9 w-full">
      <Line
        data={{
          labels: data.map((_, i) => i),
          datasets: [
            {
              data,
              borderColor: color,
              backgroundColor: areaGradient(color),
              fill: true,
            },
          ],
        }}
        options={options}
      />
    </div>
  );
}

/* ----------------------------- Area Trend Chart -------------------------- */

export function TrendAreaChart({
  data,
  color = "#2f6bff",
}: {
  data: { label: string; value: number }[];
  color?: string;
}) {
  const c = useChartColors();

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    animation: { duration: 1000 },
    layout: { padding: { top: 18 } },
    plugins: {
      legend: { display: false },
      datalabels: {
        display: (ctx) => Number(ctx.dataset.data[ctx.dataIndex]) > 0,
        align: "top",
        offset: 6,
        color: c.tick,
        font: { size: 10, weight: "bold" },
      },
      tooltip: {
        displayColors: false,
        padding: 10,
        backgroundColor: "rgba(3,51,120,0.92)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        callbacks: {
          title: (items) => `Tanggal ${items[0]?.label ?? ""}`,
          label: (item) => `${item.formattedValue} pendaftar`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { color: c.tick, font: { size: 11 }, maxRotation: 0, autoSkipPadding: 16 },
      },
      y: {
        beginAtZero: true,
        grid: { color: c.grid },
        border: { display: false },
        ticks: { color: c.tick, font: { size: 11 }, precision: 0, stepSize: 1 },
      },
    },
    elements: {
      line: { tension: 0.4, borderWidth: 2.5 },
      point: { radius: 3.5, hoverRadius: 6, hitRadius: 12, borderWidth: 2.5, backgroundColor: c.dot },
    },
  };

  return (
    <div className="relative h-56 w-full">
      <Line
        data={{
          labels: data.map((d) => d.label),
          datasets: [
            {
              data: data.map((d) => d.value),
              borderColor: color,
              backgroundColor: areaGradient(color),
              pointBorderColor: color,
              fill: true,
            },
          ],
        }}
        options={options}
        plugins={[ChartDataLabels]}
      />
    </div>
  );
}

/* -------------------------------- Donut ---------------------------------- */

export type DonutDatum = { label: string; value: number; color: string };

export function StatusDonut({ data }: { data: DonutDatum[] }) {
  const c = useChartColors();
  const total = data.reduce((sum, d) => sum + d.value, 0);

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "68%",
    animation: { duration: 900 },
    plugins: {
      legend: { display: false },
      tooltip: {
        displayColors: true,
        padding: 10,
        backgroundColor: "rgba(3,51,120,0.92)",
        callbacks: {
          label: (item) => {
            const value = item.parsed ?? 0;
            const pct = total > 0 ? Math.round((value / total) * 100) : 0;
            return ` ${item.label}: ${value} (${pct}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
      <div className="relative h-44 w-44 shrink-0">
        <Doughnut
          data={{
            labels: data.map((d) => d.label),
            datasets: [
              {
                data: data.map((d) => d.value),
                backgroundColor: data.map((d) => d.color),
                borderColor: c.dot,
                borderWidth: 2,
                hoverOffset: 6,
              },
            ],
          }}
          options={options}
        />
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold tabular-nums">{total}</span>
          <span className="text-xs text-foreground/50">total</span>
        </div>
      </div>

      <ul className="grid w-full gap-2.5 sm:max-w-[200px]">
        {data.map((d) => (
          <li key={d.label} className="flex items-center justify-between gap-3 text-sm">
            <span className="flex items-center gap-2 text-foreground/70">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
              {d.label}
            </span>
            <span className="font-semibold tabular-nums">
              {d.value}
              <span className="ml-1 text-xs font-normal text-foreground/40">
                {total > 0 ? `${Math.round((d.value / total) * 100)}%` : "0%"}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------ Horizontal Bars --------------------------- */

export function MajorBars({
  data,
  colors,
}: {
  data: { label: string; value: number }[];
  colors: string[];
}) {
  const c = useChartColors();

  const options: ChartOptions<"bar"> = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 900 },
    layout: { padding: { right: 34 } },
    plugins: {
      legend: { display: false },
      datalabels: {
        anchor: "end",
        align: "end",
        offset: 4,
        color: c.tick,
        font: { size: 11, weight: "bold" },
      },
      tooltip: {
        displayColors: false,
        padding: 10,
        backgroundColor: "rgba(3,51,120,0.92)",
        callbacks: {
          label: (item) => `${item.formattedValue} pendaftar`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: { color: c.grid },
        border: { display: false },
        ticks: { color: c.tick, font: { size: 11 }, precision: 0, stepSize: 1 },
      },
      y: {
        grid: { display: false },
        border: { display: false },
        ticks: { color: c.tick, font: { size: 12, weight: 600 } },
      },
    },
  };

  const height = Math.max(data.length, 1) * 48 + 24;

  return (
    <div className="relative w-full" style={{ height }}>
      <Bar
        data={{
          labels: data.map((d) => d.label),
          datasets: [
            {
              data: data.map((d) => d.value),
              backgroundColor: data.map((_, i) => colors[i % colors.length]),
              borderRadius: 6,
              borderSkipped: false,
              barPercentage: 0.7,
              categoryPercentage: 0.8,
            },
          ],
        }}
        options={options}
        plugins={[ChartDataLabels]}
      />
    </div>
  );
}
