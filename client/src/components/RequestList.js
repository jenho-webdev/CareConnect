// components/RequestList.js
import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Tooltip,
  Chip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

import { EyeIcon } from "../assets/icons/EyeIcon";

const statusColorMap = {
  Open: "success", //no one signed up for the request
  Available: "success", //someone signed up for the request
  closed: "danger", //no one signed up for the request AND the request has passed
  pending: "warning", //no one signed up for the request AND the request has not passed
  Closed: "secondary", //the request has passed AND the request has been marked as completed
};

const columns = [
  { key: "requestTitle", name: "requestTitle", label: "TITLE" }, //1
  { key: "location", name: "location", label: "LOCATION" }, //3
  { key: "startTime", name: "startTime", label: "Start Time" }, //4
  { key: "endTime", name: "endTime", label: "End TIME" }, //5
  { key: "status", name: "status", label: "STATUS" }, //6
  { key: "actions", name: "actions", label: "ACTIONS" }, //7
];

export default function RequestList({ requests }) {
  const renderCell = useCallback((request, columnKey) => {
    const cellValue = request[columnKey];

    // Define options for formatting the date and time
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    };

    switch (columnKey) {
      case "requestTitle":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "location":
        const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(
          request.location
        )}`;
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">
              {cellValue}
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-bold text-sm capitalize text-default-400 hover:underline"
              >
                <i class="material-icons">&#xe52e;</i>
              </a>
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[request.status]}
            size="sm"
            variant="flat"
          >
            {request.status}
          </Chip>
        );
      case "startTime":
        const startDate = new Date(request.startTime);
        const formattedStart = startDate.toLocaleTimeString("en-US", options);

        return (
          <div className="flex flex-col">
            <span className="text-bold text-sm capitalize">
              {formattedStart}
            </span>
          </div>
        );
      case "endTime":
        const endDate = new Date(request.startTime);
        const formattedEnd = endDate.toLocaleTimeString("en-US", options);
        return (
          <div className="flex flex-col">
            <span className="text-bold text-sm capitalize">{formattedEnd}</span>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <Link to={`/request/${request._id}`}>
                {/* Pass the request object as state */}
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeIcon />
                </span>
              </Link>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="My Requests List">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.key}
            align={column.name === "actions" ? "center" : "start"}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={requests}>
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
