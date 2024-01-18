"use client";

import { ColumnDef } from "@tanstack/react-table";

import { FileIcon, defaultStyles } from "react-file-icon";

import prettyBytes from "pretty-bytes";

import { FileType } from "@/types";

import { COLOR_EXTENSION_MAP } from "@/constant";

export const columns: ColumnDef<FileType>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ renderValue, ...props }) => {
      const type = renderValue() as string;
      const extension = type.split("/")[1];
      return (
        <div className="w-9">
          <FileIcon
            extension={extension}
            labelColor={COLOR_EXTENSION_MAP[extension]}
            // @ts-ignore
            {...defaultStyles[extension]}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "filename",
    header: "Filename",
  },
  {
    accessorKey: "downloadURL",
    header: "Link",
    cell: ({ renderValue, ...props }) => {
      const downloadURL = renderValue() as string;

      return (
        <a
          href={downloadURL}
          target="_blank"
          className="text-blue-500 hover:underline"
        >
          Download
        </a>
      );
    },
  },
  {
    accessorKey: "timestamp",
    header: "Created Date",
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ renderValue, ...props }) => {
      return <span>{prettyBytes(renderValue() as number)}</span>;
    },
  },
];
