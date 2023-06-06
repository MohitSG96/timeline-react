import { useState } from "react";
import moment from "moment";
import Timeline, {
  Id,
  TimelineMarkers,
  TodayMarker,
} from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import "./style.css";
import itemRender from "./itemRender";
import SundaysMarker from "./SundaysMarker";
import groups from "./studentsGroups";
import items from "./studentsItems";
import keys from "./keys";
import { Popover, Typography, Paper, Grid } from "@mui/material";

function TimelineChart() {
  const [dataKeys, setDataKeys] = useState(keys);
  const [dataGroups, setDataGroups] = useState(groups);
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [anchorElItem, setAnchorElItem] = useState<any>(null);
  const [selected, setSelected] = useState<any>();

  const onMouseEnter = (e: any, item: any) => {
    setAnchorEl(e.currentTarget);
    setAnchorElItem(item);
  };

  const onMouseLeave = (e: any, item: any) => {
    setAnchorEl(null);
    setAnchorElItem(null);
  };

  const [calenderItems, setCalenderItems] = useState(
    items.map((item) => ({
      ...item,
      onMouseEnter: (e: any) => onMouseEnter(e, item),
      onMouseLeave: (e: any) => onMouseLeave(e, item),
    }))
  );
  const onItemClick = (itemId: Id, e: React.SyntheticEvent, time: number) => {
    setSelected(calenderItems.find((item) => item.id === itemId));
  };

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
        itemRenderer={itemRender}
        defaultTimeStart={moment().add(-12, "weeks")}
        defaultTimeEnd={moment().add(12, "weeks")}
        minZoom={1.5 * 365.24 * 86400 * 50}
        // fullUpdate
        itemTouchSendsClick
        onItemSelect={onItemClick}
        stackItems
        itemHeightRatio={0.75}
        // showCursorLine
        canMove={true}
        canResize="both"
        onItemMove={handleItemMove}
        onItemResize={handleItemResize}
        onItemClick={onItemClick}
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
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={Boolean(anchorEl && selected?.id !== anchorElItem?.id)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{ vertical: "bottom", horizontal: "center" }}
        disableRestoreFocus
      >
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover>
      <Popover
        id="another-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={Boolean(selected && selected?.id === anchorElItem?.id)}
        anchorEl={anchorEl}
        onClose={() => setSelected(null)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{ vertical: "bottom", horizontal: "center" }}
        disableRestoreFocus
      >
        <Paper>
          <Grid container>
            <Grid item xs={12} sm={12}>
              <Typography>Selected Item: {selected?.title ?? ""}</Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography>
                Selected Item Details: {selected?.className ?? ""}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Popover>
    </>
  );
}

export default TimelineChart;
