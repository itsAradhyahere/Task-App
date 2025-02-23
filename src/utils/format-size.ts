export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const kb = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(kb));
  const formattedSize = parseFloat((bytes / Math.pow(kb, i)).toFixed(2));
  return `${formattedSize} ${sizes[i]}`;
}
