import moment from "moment";
import { TimelineItemBase } from "react-calendar-timeline";

const y18 = new Date("2017/11/1");
const y19 = new Date("2018/11/1");

const HTMLCSS = {
  title: "HTML/CSS",
  className: "htmlCss",
  mentors: [1, 2],
};
const JS1 = {
  title: "JavaScript 1",
  className: "js1",
  mentors: [3],
};
const JS2 = {
  title: "JavaScript 2",
  className: "js2",
  mentors: [4],
};
const JS3 = {
  title: "JavaScript 3",
  className: "js3",
  mentors: [4, 5],
};
const NodeJs = {
  title: "Node.js",
  className: "nodejs",
  mentors: [6],
};
const MySQL = {
  title: "MySQL",
  className: "mySql",
  mentors: [4, 7],
};
const React = {
  title: "React",
  className: "react",
  mentors: [9, 8],
};

const items = [
  {
    id: 1,
    group: 1,
    ...JS1,
    start: moment(),
    end: moment().add(1, "week"),
  },
  {
    id: 2,
    group: 2,
    ...JS2,
    start: moment().add(-5, "weeks"),
    end: moment().add(0.5, "week"),
  },
  {
    id: 3,
    group: 1,
    ...JS3,
    start: moment().add(2, "weeks"),
    end: moment().add(3, "weeks"),
  },
  {
    id: 4,
    group: 1,
    ...HTMLCSS,
    start: moment(),
    end: moment().add(1, "week"),
  },
  {
    id: 5,
    group: 2,
    ...NodeJs,
    start: moment().add(-5, "weeks"),
    end: moment().add(0.5, "week"),
  },
  {
    id: 6,
    group: 1,
    ...MySQL,
    start: moment().add(2, "weeks"),
    end: moment().add(3, "weeks"),
  },
];
export default items;
