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

function Event({ start, end, title, startAsString, endAsString }) {
  return (
    <TableCell>
      {startAsString} - {endAsString}
      {"\n"}
      {title}
    </TableCell>
  );
}

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
export default function({ now }) {
  let rows = Object.entries(events).map(([item, eventObjs], index) => {
    let eventsMaps = eventObjs
      .map(ConvertEventObjToEvent)
      .sort((a, b) => a.start - b.start)
      .reduce(
        (accum, current) => {
          if (!accum.current && now >= current.start && now <= current.end) {
            accum.current = current;
          }
          if (!accum.upcoming && current.end > now) {
            accum.upcoming = current;
          }
          return accum;
        },
        { current: null, upcoming: null }
      );
    return (
      <TableRow>
        <TableCell>{item}</TableCell>
        {eventsMaps.current ? (
          <Event {...eventsMaps.current} />
        ) : (
          <TableCell></TableCell>
        )}
        {eventsMaps.upcoming ? (
          <Event {...eventsMaps.upcoming} />
        ) : (
          <TableCell></TableCell>
        )}
      </TableRow>
    );
  });
  return (
    <Grid item xs={12}>
      <Table padding="none">
        <TableHead>
          <TableRow>
            <TableCell>Place</TableCell>
            <TableCell>Current</TableCell>
            <TableCell>Upcoming</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{rows}</TableBody>
      </Table>
    </Grid>
  );
}
