// components/offerList.js
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

import { EyeIcon } from "../../assets/icons/EyeIcon";

const statusColorMap = {
  accepted: "success", //you signed up for the offer AND the offer has not passed
  inProgress: "warning", // you signed up for the offer AND the offer is in progress
  completed: "secondary", //the offer has passed AND the offer has been marked as completed
  cancelled: "error", //you signed up for the offer but the offer has been cancelled/deleted
};

const columns = [
  { key: "offerTitle", name: "offerTitle", label: "TITLE" }, //1
  { key: "description", name: "description", label: "DESCRIPTION" }, //2
  { key: "location", name: "location", label: "LOCATION" }, //3
  { key: "startTime", name: "startTime", label: "Start Time" }, //4
  { key: "endTime", name: "endTime", label: "End TIME" }, //5
  { key: "status", name: "status", label: "STATUS" }, //6
  { key: "actions", name: "actions", label: "ACTIONS" }, //7
];

export default function offerList(offers) {
  const renderCell = useCallback((offer, columnKey) => {
    const cellValue = offer[columnKey];

    switch (columnKey) {
      case "offerTitle":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {offer.title}
            </p>
          </div>
        );
      case "location":
        const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(
          offer.location
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
            color={statusColorMap[offer.status]}
            size="sm"
            variant="flat"
          >
            {offer.status}
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
              {offer.startTime}
            </span>
          </div>
        );
      case "endTime":
        return (
          <div className="flex flex-col">
            <span className="text-bold text-sm capitalize">
              {offer.endTime}
            </span>
          </div>
        );

      case "participants":
        return (
          <div className="flex items-center gap-2">
            {offer.participants.map((participant) => (
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
              <Link to={`/offer/${offer.id}`}>
                {/* Pass the offer object as state */}
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
    <Table aria-label="My offers List">
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
      <TableBody items={offers}>
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
