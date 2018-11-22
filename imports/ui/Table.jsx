import React, { Fragment } from "react";
import {
  Table,
  Grid,
  TableHead,
  TableCell,
  TableBody,
  TableRow
} from "@material-ui/core";
import { events } from "./Stroll.js";
export default function() {
  let rows = Object.keys(events).map((item, index) => {
    let arrayOfEvents = events[item];
    let eventsAsCells = arrayOfEvents.sort(i => -i.startTime).map(i => <TableCell>{i.name}</TableCell>);
    let cells = [
      <Fragment>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{item}</TableCell>
      </Fragment>
    ].concat(eventsAsCells);
    return <TableRow>{cells}</TableRow>;
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
