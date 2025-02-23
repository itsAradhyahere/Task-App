export type PriorityType = "low" | "medium" | "high";

export type TaskType = {
  id: string;
  createdAt: string;
  title: string;
  description: string | null;
  cover: string | null;
  priority: string; // low, mediun, high
  deadline: string;
  time: string;
  status: string; // todo, in progress, completed
};

export type ImageFormats = "JPEG" | "PNG" | "GIF" | "SVG" | "WebP";
