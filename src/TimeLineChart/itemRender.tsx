import { ReactCalendarItemRendererProps } from "react-calendar-timeline";
import "./ripple.css";

const itemRender = ({
  item,
  itemContext,
  getItemProps,
  getResizeProps,
}: ReactCalendarItemRendererProps<any>) => {
  const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();

  const backgroundColor = itemContext.selected
    ? itemContext.dragging
      ? "red"
      : item.selectedBgColor
    : item.bgColor;
  const borderColor = itemContext.resizing ? "red" : item.color;
  return (
    <>
      <div
        aria-describedby={item.id}
        aria-owns={"mouse-over-popover"}
        aria-haspopup="true"
        {...getItemProps({
          style: {
            backgroundColor,
            color: item.color,
            borderColor,
            border: itemContext.selected
              ? "dashed 1px rgba(0,0,0,0.3)"
              : "none",
            borderRadius: 4,
            boxShadow: `0 1px 5px 0 rgba(0, 0, 0, 0.2),
                     0 2px 2px 0 rgba(0, 0, 0, 0.14),
                     0 3px 1px -2px rgba(0, 0, 0, 0.12)`,
          },
          onMouseDown: (e) => {
            console.log("on item click", item);
            // setAnchorEl(e.currentTarget);
            // setOpen(true);
          },
        })}
        onMouseEnter={item.onMouseEnter}
        onMouseLeave={item.onMouseLeave}
      >
        {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : null}

        <div
          className="ripple"
          style={{
            height: itemContext.dimensions.height,
            overflow: "hidden",
            paddingLeft: 3,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontSize: "1rem",
            marginLeft: "1rem",
          }}
        >
          {itemContext.title}
        </div>

        {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : null}
      </div>
    </>
  );
};

export default itemRender;
