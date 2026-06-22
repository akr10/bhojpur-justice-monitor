"use client";

import { useMemo, useState } from "react";
import {
  floodReliefRecords,
  floodReliefSummary,
  type FloodReliefRecord,
} from "@/data/civicData";

const PAGE_SIZE = 25;

function matchesQuery(record: FloodReliefRecord, query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;

  return (
    record.familyId.toLowerCase().includes(normalized) ||
    record.villageArea.toLowerCase().includes(normalized) ||
    record.grievanceType.toLowerCase().includes(normalized) ||
    record.reliefStatus.toLowerCase().includes(normalized)
  );
}

function statusBadgeClass(status: FloodReliefRecord["reliefStatus"]) {
  switch (status) {
    case "Disbursed":
      return "border-emerald-900/50 bg-emerald-950/40 text-emerald-300";
    case "Partially disbursed":
      return "border-blue-900/50 bg-blue-950/40 text-blue-300";
    case "Under review":
      return "border-amber-900/50 bg-amber-950/40 text-amber-300";
    case "Escalated to district HQ":
      return "border-red-900/50 bg-red-950/40 text-red-300";
    default:
      return "border-zinc-700 bg-zinc-950 text-zinc-400";
  }
}

export default function FloodAidAccountabilityTable() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filteredRecords = useMemo(
    () => floodReliefRecords.filter((record) => matchesQuery(record, query)),
    [query],
  );

  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const pageRecords = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredRecords.slice(start, start + PAGE_SIZE);
  }, [filteredRecords, currentPage]);

  function handleSearchChange(value: string) {
    setQuery(value);
    setPage(1);
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 sm:p-6">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-zinc-50 sm:text-lg">
            Flood Aid Accountability Table
          </h3>
          <p className="mt-1 text-sm text-zinc-400">
            {floodReliefSummary.totalAffectedFamilies}+ affected families across{" "}
            {floodReliefSummary.villagesTracked} village areas · last updated{" "}
            {floodReliefSummary.lastUpdated}
          </p>
        </div>

        <label className="w-full sm:max-w-xs">
          <span className="sr-only">Search flood relief records</span>
          <input
            type="search"
            value={query}
            onChange={(event) => handleSearchChange(event.target.value)}
            placeholder="Search village, grievance, status…"
            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-50 placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
          />
        </label>
      </div>

      <div className="overflow-x-auto rounded-lg border border-zinc-800">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-zinc-800 bg-zinc-950/80">
            <tr>
              <th className="px-4 py-3 font-medium text-zinc-400">Family ID</th>
              <th className="px-4 py-3 font-medium text-zinc-400">
                Village Area
              </th>
              <th className="px-4 py-3 font-medium text-zinc-400">
                Grievance Type
              </th>
              <th className="px-4 py-3 font-medium text-zinc-400">
                Administrative Relief Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {pageRecords.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-8 text-center text-zinc-500"
                >
                  No records match your search.
                </td>
              </tr>
            ) : (
              pageRecords.map((record) => (
                <tr
                  key={record.id}
                  className="transition-colors hover:bg-zinc-950/50"
                >
                  <td className="px-4 py-3 font-mono text-xs text-zinc-300 sm:text-sm">
                    {record.familyId}
                  </td>
                  <td className="px-4 py-3 text-zinc-300">
                    {record.villageArea}
                  </td>
                  <td className="px-4 py-3 text-zinc-400">
                    {record.grievanceType}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusBadgeClass(record.reliefStatus)}`}
                    >
                      {record.reliefStatus}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-col items-center justify-between gap-3 text-xs text-zinc-500 sm:flex-row sm:text-sm">
        <p>
          Showing{" "}
          {pageRecords.length === 0
            ? 0
            : (currentPage - 1) * PAGE_SIZE + 1}
          –{(currentPage - 1) * PAGE_SIZE + pageRecords.length} of{" "}
          {filteredRecords.length} records
          {query ? ` (filtered from ${floodReliefRecords.length})` : ""}
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage((value) => Math.max(1, value - 1))}
            disabled={currentPage <= 1}
            className="rounded-md border border-zinc-800 px-3 py-1.5 text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-zinc-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            onClick={() =>
              setPage((value) => Math.min(totalPages, value + 1))
            }
            disabled={currentPage >= totalPages}
            className="rounded-md border border-zinc-800 px-3 py-1.5 text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

      <p className="mt-3 text-xs text-zinc-600">
        Source: {floodReliefSummary.dataSource}
      </p>
    </div>
  );
}
