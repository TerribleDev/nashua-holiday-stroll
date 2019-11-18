import React, { Fragment } from "react";
import { parse } from "date-fns";
import {
  Table,
  Grid,
  TableHead,
  TableCell,
  TableBody,
  TableRow
} from "@material-ui/core";
import { events } from "./Stroll.js";
/**
 *
 *
 * @param {Date} date
 */
function getTime(date) {
  return date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true
  });
}
function ConvertEventObjToEvent({ time, title }) {
  let timeArray = time.split("-");
  let start = parse(
    `11/30/2019 ${timeArray[0]} pm`,
    "MM/dd/yyyy hh:mm aa",
    new Date()
  );
  let end = parse(
    `11/30/2019 ${timeArray[1]} pm`,
    "MM/dd/yyyy hh:mm aa",
    new Date()
  );
  return {
    start,
    end,
    title,
    startAsString: getTime(start),
    endAsString: getTime(end)
  };
}
export default function() {
  let rows = Object.entries(events).map(([item, eventObjs], index) => {
    let cells = [
      <Fragment>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{item}</TableCell>
      </Fragment>
    ];
    let eventsMaps = eventObjs
      .map(ConvertEventObjToEvent)
      .map(({ start, end, title, startAsString, endAsString }) => (
        <TableCell>
          {startAsString} - {endAsString} {title}
        </TableCell>
      ));
    while(eventsMaps.length < 3) {
      eventsMaps = eventsMaps.concat([<TableCell />])
    }
    return <TableRow>{cells.concat(eventsMaps)}</TableRow>;
  });
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>#</TableCell>
          <TableCell>Place</TableCell>
          <TableCell>5:45-6:15</TableCell>
          <TableCell>7:10-8:10</TableCell>
          <TableCell>8:35-9:45</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{rows}</TableBody>
    </Table>
  );
}
