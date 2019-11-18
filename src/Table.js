import React, { Fragment } from "react";
import styles from "./Table.module.css";
import { events } from "./Stroll.js";
import { parse } from "date-fns";
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
function range(size, startAt = 0) {
  return [...Array(size).keys()].map(i => i + startAt);
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
  const timeRange = range(5, 5).map(a => <div key={a}>{a}</div>);
  const titleRow = (
    <>
      <div />
      <div>Events</div>
      {timeRange}
    </>
  );
  const eventRows = Object.entries(events).map(([item, eventObjs], index) => {
    let eventsMaps = eventObjs
    .map(ConvertEventObjToEvent)
    .map(({ start, end, title, startAsString, endAsString }) => (
      <div>
        {startAsString} - {endAsString}{"\n"}{title}
      </div>
    ));
    while(eventsMaps.length < timeRange.length) {
      eventsMaps = eventsMaps.concat([<div />])
    }
    return (
      <Fragment key={item}>
        <div>#{index}</div>
        <div>{item.replace(",", "\n").replace("\n ", "\n")}</div>
        {eventsMaps}
      </Fragment>
    );
  });

  return (
    <div className={styles.eventContainer}>
      {titleRow}
      {eventRows}
    </div>
  );
}
