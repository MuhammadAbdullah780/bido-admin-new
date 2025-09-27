'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface JsonTableColumn {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
  className?: string;
}

interface JsonTableProps {
  data: any[];
  columns: JsonTableColumn[];
  actions?: (row: any) => React.ReactNode;
  className?: string;
}

export const JsonTable: React.FC<JsonTableProps> = ({
  data,
  columns,
  actions,
  className = ""
}) => {
  if (!data || data.length === 0) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="text-center text-gray-500">
            No data available
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Header */}
      <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 rounded-lg font-medium text-sm text-gray-700">
        {columns.map((column) => (
          <div key={column.key} className={`${column.className || ''}`}>
            {column.label}
          </div>
        ))}
        {actions && (
          <div className="col-span-2 text-center">
            Actions
          </div>
        )}
      </div>

      {/* Rows */}
      <div className="space-y-2">
        {data.map((row, index) => (
          <Card key={row.id || index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="grid grid-cols-12 gap-4 items-center">
                {columns.map((column) => (
                  <div key={column.key} className={`${column.className || ''}`}>
                    {column.render 
                      ? column.render(row[column.key], row)
                      : row[column.key]
                    }
                  </div>
                ))}
                {actions && (
                  <div className="col-span-2 flex justify-center gap-2">
                    {actions(row)}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Helper component for status badges
export const StatusBadge: React.FC<{ status: boolean; activeText?: string; inactiveText?: string }> = ({
  status,
  activeText = "Active",
  inactiveText = "Inactive"
}) => (
  <Badge variant={status ? "default" : "secondary"}>
    {status ? activeText : inactiveText}
  </Badge>
);

// Helper component for action buttons
export const ActionButtons: React.FC<{
  onEdit?: () => void;
  onDelete?: () => void;
  onToggle?: () => void;
  toggleText?: string;
  editIcon?: React.ReactNode;
  deleteIcon?: React.ReactNode;
}> = ({
  onEdit,
  onDelete,
  onToggle,
  toggleText,
  editIcon,
  deleteIcon
}) => (
  <div className="flex gap-2">
    {onEdit && (
      <Button size="sm" variant="outline" onClick={onEdit}>
        {editIcon || "Edit"}
      </Button>
    )}
    {onToggle && (
      <Button size="sm" variant="outline" onClick={onToggle}>
        {toggleText || "Toggle"}
      </Button>
    )}
    {onDelete && (
      <Button size="sm" variant="outline" onClick={onDelete}>
        {deleteIcon || "Delete"}
      </Button>
    )}
  </div>
);
