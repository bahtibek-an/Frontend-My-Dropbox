"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { PencilIcon, TrashIcon } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "../ui/button";

import { FileType } from "@/types";

import { useAppStore } from "@/store/store";

import DeleteModal from "../DeleteModal";
import EditModal from "../EditModal";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  deleteFileFromState: (fileId: string) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  deleteFileFromState,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const [setFileId, setFileName, setIsDeleteModalOpen, setIsEditModalOpen] =
    useAppStore((state) => [
      state.setFileId,
      state.setFileName,
      state.setIsDeleteModalOpen,
      state.setIsEditModalOpen,
    ]);

  const OpenDeleteModal = (fileId: string) => {
    setFileId(fileId);
    setIsDeleteModalOpen(true);
  };

  const OpenEditModal = (fileId: string, fileName: string) => {
    setFileId(fileId);
    setFileName(fileName);
    setIsEditModalOpen(true);
  };

  // console.log("The Data in table is : ............ " + JSON.stringify(data, null, 2));

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                <DeleteModal
                  fileId={(row.original as FileType).id}
                  deleteFileFromState={deleteFileFromState}
                />
                <EditModal />
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {cell.column.id === "timestamp" ? (
                      <div className="flex flex-col">
                        <div className="text-sm">
                          {(cell.getValue() as Date).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {(cell.getValue() as Date).toLocaleTimeString()}
                        </div>
                      </div>
                    ) : cell.column.id === "filename" ? (
                      <p
                        onClick={() =>
                          OpenEditModal(
                            (row.original as FileType).id,
                            (row.original as FileType).filename
                          )
                        }
                        className="underline flex items-center text-blue-500 hover:cursor-pointer"
                      >
                        {cell.getValue() as string}{" "}
                        <PencilIcon size={15} className="ml-2" />
                      </p>
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </TableCell>
                ))}

                <TableCell key={(row.original as FileType).id}>
                  <Button
                    variant={"outline"}
                    onClick={() =>
                      OpenDeleteModal((row.original as FileType).id)
                    }
                  >
                    <TrashIcon size={20} />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                You have no files.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
