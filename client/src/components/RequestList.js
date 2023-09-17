// components/RequestList.js
import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Tooltip,
  Avatar,
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
  accepted: "success", //someone signed up for the request
  expired: "danger", //no one signed up for the request AND the request has passed
  pending: "warning", //no one signed up for the request AND the request has not passed
  completed: "secondary", //the request has passed AND the request has been marked as completed
};

const columns = [
  { key: "requestTitle", name: "requestTitle", label: "TITLE" }, //1
  { key: "description", name: "description", label: "DESCRIPTION" }, //2
  { key: "location", name: "location", label: "LOCATION" }, //3
  { key: "startTime", name: "startTime", label: "Start Time" }, //4
  { key: "endTime", name: "endTime", label: "End TIME" }, //5
  { key: "status", name: "status", label: "STATUS" }, //6
  { key: "actions", name: "actions", label: "ACTIONS" }, //7
];

export default function RequestList(requests) {
  const renderCell = useCallback((request, columnKey) => {
    const cellValue = request[columnKey];

    switch (columnKey) {
      case "requestTitle":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {request.title}
            </p>
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
      case "description":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "startTime":
        return (
          <div className="flex flex-col">
            <span className="text-bold text-sm capitalize">
              {request.startTime}
            </span>
          </div>
        );
      case "endTime":
        return (
          <div className="flex flex-col">
            <span className="text-bold text-sm capitalize">
              {request.endTime}
            </span>
          </div>
        );

      case "participants":
        return (
          <div className="flex items-center gap-2">
            {request.participants.map((participant) => (
              <Avatar
                key={participant._id}
                src={`https://i.pravatar.cc/150?u=${participant._id}`}
              />
            ))}
          </div>
        );

      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <Link to={`/request/${request.id}`}>
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
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
