import { Tag as AntTag } from "antd";
import { PriorityType } from "../../type";

export function Tag({ type }: { type: PriorityType }) {
  let color = "low";

  switch (type) {
    case "low":
      color = "error";
      break;
    case "medium":
      color = "blue";
      break;
    case "high":
      color = "green";
      break;
  }

  return (
    <AntTag color={color} className="uppercase" bordered={false}>
      {type}
    </AntTag>
  );
}
