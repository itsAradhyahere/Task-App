import {
  BiSolidCalendarCheck,
  BiSolidCategory,
  BiSolidCog,
  BiSolidNotepad,
  BiSolidNotification,
} from "react-icons/bi";

// import {
//   CalendarIcon,
//   InboxIcon,
//   NoteIcon,
//   SettingsIcon,
//   TodoIcon,
// } from "../assets/icons/icons";

export const sidebarLinks = [
  {
    label: "Calendar",
    slug: "",
    icon: BiSolidCategory,
  },
  {
    label: "Inbox",
    slug: "inbox",
    icon: BiSolidNotification,
  },
  {
    label: "Notes",
    slug: "notes",
    icon: BiSolidNotepad,
  },
  {
    label: "Todo List",
    slug: "todos",
    icon: BiSolidCalendarCheck,
  },
  {
    label: "Settings",
    slug: "settings",
    icon: BiSolidCog,
  },
];
