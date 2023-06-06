import { useState } from "react";
import moment from "moment";
import Timeline, {
  Id,
  TimelineMarkers,
  TodayMarker,
} from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import "./style.css";
import ItemRender from "./ItemRender";
import SundaysMarker from "./SundaysMarker";
import groups from "./studentsGroups";
import items from "./studentsItems";
import keys from "./keys";

function TimelineChart() {
  const [dataKeys, setDataKeys] = useState(keys);
  const [dataGroups, setDataGroups] = useState(groups);

  const [calenderItems, setCalenderItems] = useState(items);
  const y19 = new Date("2019/1/1");

  const toTimestamp = (strDate: any) => {
    const d = new Date(strDate);
    return Date.parse(d as any) / 1000;
  };

  const addItemHandler = (item: any) => {
    const newItem = {
      id:
        1 +
        calenderItems.reduce(
          (max: any, value: any) => (value.id > max ? value.id : max),
          0
        ),
      group: item.mentor,
      title: item.status,
      className: item.status,
      start: moment(new Date(item.start)),
      end: moment(new Date(item.end)),
    };

    setCalenderItems((prevItems: any) => [...prevItems, newItem]);
  };

  const handleItemMove = (
    itemId: Id,
    dragTime: number,
    newGroupOrder: number
  ) => {
    setCalenderItems((prevItems: any) =>
      prevItems.map((item: any) =>
        item.id === itemId
          ? {
              ...item,
              start: moment(dragTime),
              end: moment(dragTime + (item.end - item.start)),
              group: groups[newGroupOrder].id,
            }
          : item
      )
    );

    console.log("Moved", itemId, dragTime, newGroupOrder);
  };

  const handleItemResize = (
    itemId: Id,
    time: number,
    edge: "left" | "right"
  ) => {
    console.log("before Resized", calenderItems);
    setCalenderItems((prevItems: any) =>
      prevItems.map((item: any) =>
        item.id === itemId
          ? {
              ...item,
              start: edge === "left" ? moment(time) : moment(item.start),
              end: edge === "left" ? moment(item.end) : moment(time),
            }
          : item
      )
    );

    console.log("Resized", itemId, time, edge);
    console.log("Resized", calenderItems);
  };

  return (
    <>
      <Timeline
        keys={dataKeys}
        groups={dataGroups}
        items={calenderItems as any}
        sidebarContent="Classes"
        lineHeight={75}
        itemRenderer={ItemRender}
        defaultTimeStart={moment().add(-12, "weeks")}
        defaultTimeEnd={moment().add(12, "weeks")}
        // maxZoom={1.5 * 365.24 * 86400 * 50}
        minZoom={1.5 * 365.24 * 86400 * 50}
        // fullUpdate
        itemTouchSendsClick={false}
        stackItems
        itemHeightRatio={0.75}
        // showCursorLine
        canMove={true}
        canResize="both"
        onItemMove={handleItemMove}
        onItemResize={handleItemResize}
      >
        <TimelineMarkers>
          <TodayMarker date={moment.now()}>
            {({ styles, date }) => (
              <div
                style={{
                  ...styles,
                  width: "0.5rem",
                  backgroundColor: "rgba(255,0,0,0.5)",
                }}
              />
            )}
          </TodayMarker>
          <SundaysMarker />
        </TimelineMarkers>
      </Timeline>
    </>
  );
}

export default TimelineChart;
