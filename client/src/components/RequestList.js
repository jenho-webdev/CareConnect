// components/RequestList.js
import React from "react";

import {
  Avatar,
  Chip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

import { EditIcon } from "../assets/icons/EditIcon";
import { DeleteIcon } from "../assets/icons/DeleteIcon";
import { EyeIcon } from "../assets/icons/EyeIcon";

const statusColorMap = {
  accepted: "success", //someone signed up for the request
  expired: "danger", //no one signed up for the request AND the request has passed
  pending: "warning", //no one signed up for the request AND the request has not passed
  completed: "secondary", //the request has passed AND the request has been marked as completed
};

const columns = [
  { key: 1, name: "Title", label: "TITLE" },
  { key: 2, name: "description", label: "DESCRIPTION" },
  { key: 3, name: "location", label: "LOCATION" },
  { key: 4, name: "startTime", label: "Start Time" },
  { key: 5, name: "endTime", label: "End TIME" },
  { key: 6, name: "status", label: "STATUS" },
  { key: 7, name: "actions", label: "ACTIONS" },
];

const RequestList = ({ requests }) => {
  const rows = requests.map((request) => ({
    key: request._id,
    requestTitle: request.title,
    description: request.description,
    location: request.location,
    startTime: request.startTime,
    endTime: request.endTime,
    status: request.status,
    participants: request.participants,
    actions: (
      <>
        <EditIcon />
        <DeleteIcon />
        <EyeIcon />
      </>
    ),
  }));

  return (
    <Table aria-label="My Requests List">
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.key}>
            <TableCell>{row.requestTitle}</TableCell>
            <TableCell>{row.description}</TableCell>
            <TableCell>{row.location}</TableCell>
            <TableCell>{row.startTime}</TableCell>
            <TableCell>{row.endTime}</TableCell>
            {/* TODO: add NextUI Chip and color code the status */}
            <tableCell>{row.status}</tableCell>
            <TableCell>
              {row.participants.map((participant) => (
                <Avatar
                  key={participant._id}
                  src={`https://i.pravatar.cc/150?u=${participant._id}`}
                />
              ))}
            </TableCell>
            <TableCell>{row.actions}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RequestList;
