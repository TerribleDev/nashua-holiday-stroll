import React, {
  Fragment,
  useState,
  useLayoutEffect,
  useMemo,
  useEffect
} from "react";
import styles from "./Table.module.css";
import { events } from "./Stroll.js";
import { parse } from "date-fns";
import clsx from "clsx";
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
function Event({ title, startAsString, endAsString}) {
  const [showBackground, setShowBackground] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowBackground(true);
    }, 0);
  }, [title, startAsString, endAsString]);
  useEffect(() => {
    setTimeout(() => {
      setShowBackground(false);
    }, 300);
  }, [title, startAsString, endAsString]);
  if (!title || !startAsString || !endAsString) {
    return (
      <div
        className={clsx({
          [styles.event]: true,
          [styles.white]: !showBackground
        })}
      ></div>
    );
  }
  return (
    <div
      className={clsx({ [styles.event]: true, [styles.white]: !showBackground })}
    >
      {startAsString} - {endAsString}
      {"\n"}
      {title}
    </div>
  );
}
export default function({ now }) {
  const titleRow = (
    <>
      <div>Events</div>
      <div>Current Events</div>
      <div>Upcoming</div>
    </>
  );
  let sortedEvents = useMemo(
    () =>
      Object.entries(events).map(([item, eventObjs]) => {
        let sortedEventObjects = eventObjs
          .map(ConvertEventObjToEvent)
          .sort((a, b) => a.start - b.start);
        return { item, sortedEventObjects };
      }),
    [events]
  );
  const eventRows = sortedEvents.map(({ item, sortedEventObjects }) => {
    let eventsMaps = sortedEventObjects.reduce(
      (accum, current) => {
        if (!accum.current && now >= current.start && now <= current.end) {
          accum.current = current;
          return accum;
        }
        if (!accum.upcoming && current.end > now) {
          accum.upcoming = current;
        }
        return accum;
      },
      { current: null, upcoming: null }
    );

    return (
      <Fragment key={item}>
        <div>{item.replace(",", "\n").replace("\n ", "\n")}</div>
        {<Event {...eventsMaps.current} />}
        {<Event {...eventsMaps.upcoming} />}
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
