import { MenuProps } from "antd";

export const format_options = [
  { label: "JPEG", type: "image/jpeg" },
  { label: "PNG", type: "image/png" },
  { label: "GIF", type: "image/gif" },
  { label: "SVG", type: "image/svg+xml" },
  { label: "WebP", type: "image/webp" },
];

export const task_action_options: MenuProps["items"] = [
  { key: "edit", label: "Edit" },
  { key: "move", label: "Move Task" },
  { key: "delete", label: "Delete", danger: true },
];

export const board_options = [
  { value: "todo", label: "Todo" },
  { value: "in progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];
