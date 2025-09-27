import { cn } from "@/lib/utils";
import { stringToObjectNotation } from "@/utils/string-to-obj";
import React from "react";

export type JsonTableColumns<T extends Record<string, any>> = {
  title: string;
  dataIndex: Nested<T>;
  render?: React.FC<T>;
  align?: "start" | "end" | "middle";
  width?: number;
  fallback?: string;
}[];

type Props = {
  columns: JsonTableColumns<any>;
  data: Record<string, any>[];
};

export type Nested<T> = T extends object
  ? {
      [K in keyof T]: T[K] extends object[]
        ? never
        : T[K] extends object
        ? `${K & string}.${Nested<T[K]> & string}`
        : `${K & string}`;
    }[keyof T]
  : T;

const JsonTable = ({ columns, data }: Props) => {
  return (
    <div className="border rounded-lg overflow-x-auto overflow-y-hidden grid bg-white grid-cols-1">
      <table className="w-full table-auto border-collapse text-sm">
        <thead className="bg-gray-50 text-gray-600 font-medium border-b">
          <tr>
            {columns?.map((column, i) => {
              const { align = "start", width = "max-content" } = column;

              return (
                <th
                  style={{ minWidth: width }}
                  className={cn([
                    "py-3 px-6 w-full uppercase",
                    align === "start" && "text-start",
                    align === "end" && "text-end",
                    align === "middle" && "text-center",
                  ])}
                  key={i}
                >
                  {column?.title}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="text-gray-600 divide-y">
          {data.map((item, idx) => (
            <tr key={idx}>
              {columns?.map((column, i) => {
                const { align = "start", width = "max-content" } = column;
                return (
                  <td
                    key={i}
                    style={{ minWidth: width }}
                    className={cn([
                      "px-6 py-4 whitespace-nowrap w-full",
                      align === "start" && "text-start",
                      align === "end" && "text-end",
                      align === "middle" && "text-center",
                    ])}
                  >
                    {column?.render
                      ? column?.render(item)
                      : stringToObjectNotation(
                          String(column?.dataIndex),
                          item
                        ) ||
                        column?.fallback ||
                        "-"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JsonTable;
