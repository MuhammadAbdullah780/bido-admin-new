'use client';
import { cn } from "@/lib/utils";
import { stringToObjectNotation } from "@/utils/string-to-obj";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState, useEffect } from "react";

export type JsonTableColumns<T extends Record<string, any>> = {
  title: string;
  dataIndex: Nested<T>;
  render?: React.FC<T>;
  align?: "start" | "end" | "middle";
  width?: number;
  fallback?: string;
}[];

type BulkAction = {
  label: string;
  action: (selectedIds: string[]) => void;
  variant?: "default" | "destructive" | "outline";
};

type Props = {
  columns: JsonTableColumns<any>;
  data: Record<string, any>[];
  enableSelection?: boolean;
  bulkActions?: BulkAction[];
  onSelectionChange?: (selectedIds: string[]) => void;
  selectedIds?: string[]; // External control of selection
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

const JsonTable = ({ 
  columns, 
  data, 
  enableSelection = false, 
  bulkActions = [], 
  onSelectionChange,
  selectedIds: externalSelectedIds
}: Props) => {
  const [internalSelectedIds, setInternalSelectedIds] = useState<string[]>([]);
  
  // Use external selectedIds if provided, otherwise use internal state
  const selectedIds = externalSelectedIds !== undefined ? externalSelectedIds : internalSelectedIds;
  
  // Sync internal state with external state
  useEffect(() => {
    if (externalSelectedIds !== undefined) {
      setInternalSelectedIds(externalSelectedIds);
    }
  }, [externalSelectedIds]);

  const handleSelectAll = (checked: boolean | "indeterminate") => {
    if (checked === true) {
      const allIds = data.map(item => String(item.id));
      if (externalSelectedIds !== undefined) {
        onSelectionChange?.(allIds);
      } else {
        setInternalSelectedIds(allIds);
        onSelectionChange?.(allIds);
      }
    } else {
      if (externalSelectedIds !== undefined) {
        onSelectionChange?.([]);
      } else {
        setInternalSelectedIds([]);
        onSelectionChange?.([]);
      }
    }
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    let newSelectedIds;
    if (checked) {
      newSelectedIds = [...selectedIds, id];
    } else {
      newSelectedIds = selectedIds.filter(selectedId => selectedId !== id);
    }
    
    if (externalSelectedIds !== undefined) {
      onSelectionChange?.(newSelectedIds);
    } else {
      setInternalSelectedIds(newSelectedIds);
      onSelectionChange?.(newSelectedIds);
    }
  };

  const isAllSelected = data.length > 0 && selectedIds.length === data.length;
  const isIndeterminate = selectedIds.length > 0 && selectedIds.length < data.length;

  return (
    <div className="border rounded-lg overflow-x-auto overflow-y-hidden grid bg-white grid-cols-1">
      {/* Bulk Actions Bar */}
      {enableSelection && selectedIds.length > 0 && (
        <div className="bg-blue-50 border-b px-6 py-3 flex items-center justify-between">
          <span className="text-sm text-blue-700 font-medium">
            {selectedIds.length} item{selectedIds.length !== 1 ? 's' : ''} selected
          </span>
          <div className="flex gap-2">
            {bulkActions.map((action, index) => (
              <button
                key={index}
                onClick={() => action.action(selectedIds)}
                className={cn([
                  "px-3 py-1 text-sm rounded-md font-medium transition-colors",
                  action.variant === "destructive" && "bg-red-600 text-white hover:bg-red-700",
                  action.variant === "outline" && "border border-gray-300 text-gray-700 hover:bg-gray-50",
                  (!action.variant || action.variant === "default") && "bg-blue-600 text-white hover:bg-blue-700"
                ])}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <table className="w-full table-auto border-collapse text-sm">
        <thead className="bg-gray-50 text-gray-600 font-medium border-b">
          <tr>
            {enableSelection && (
              <th className="py-3 px-6 w-12">
                <Checkbox
                  checked={isAllSelected ? true : isIndeterminate ? "indeterminate" : false}
                  onCheckedChange={handleSelectAll}
                />
              </th>
            )}
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
            <tr key={idx} className={selectedIds.includes(String(item.id)) ? "bg-blue-50" : ""}>
              {enableSelection && (
                <td className="px-6 py-4">
                  <Checkbox
                    checked={selectedIds.includes(String(item.id))}
                    onCheckedChange={(checked) => handleSelectItem(String(item.id), checked as boolean)}
                  />
                </td>
              )}
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
