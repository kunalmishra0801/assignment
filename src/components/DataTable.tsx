import  { useState } from "react";
import clsx from "clsx";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (rows: T[]) => void;
}

export function DataTable<T>({
  data,
  columns,
  loading,
  selectable,
  onRowSelect,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [asc, setAsc] = useState(true);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const handleSort = (key: string) => {
    if (sortKey === key) setAsc(!asc);
    else {
      setSortKey(key);
      setAsc(true);
    }
  };

  const sortedData = sortKey
    ? [...data].sort((a, b) => {
        const valA = String(a[sortKey as keyof T]);
        const valB = String(b[sortKey as keyof T]);
        return asc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      })
    : data;

  const toggleSelect = (i: number) => {
    const newSet = new Set(selected);
    newSet.has(i) ? newSet.delete(i) : newSet.add(i);
    setSelected(newSet);
    onRowSelect?.(Array.from(newSet).map((x) => sortedData[x]));
  };

  if (loading) return <p className="p-6 text-center text-gray-500">Loading...</p>;
  if (data.length === 0) return <p className="p-6 text-center text-gray-500">No Data Found</p>;

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            {selectable && <th className="p-3"></th>}
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => col.sortable && handleSort(col.key)}
                className={clsx(
                  "p-3 text-left font-semibold cursor-pointer select-none",
                  col.sortable && "hover:underline"
                )}
              >
                {col.title}{" "}
                {sortKey === col.key && (asc ? "▲" : "▼")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, i) => (
            <tr
              key={i}
              className={clsx(
                "border-t hover:bg-gray-50 dark:hover:bg-gray-700 transition",
                selected.has(i) && "bg-blue-50 dark:bg-blue-900"
              )}
            >
              {selectable && (
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selected.has(i)}
                    onChange={() => toggleSelect(i)}
                  />
                </td>
              )}
              {columns.map((col) => (
                <td key={col.key} className="p-3">
                  {String(row[col.dataIndex])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}