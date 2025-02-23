import { Button, Progress, Upload, UploadProps } from "antd";
import { useEffect, useState } from "react";
import { FileData, ImageFormats } from "../../type";
import { FiTrash2, FiUploadCloud } from "react-icons/fi";
import { formatFileSize } from "../../utils/format-size";
import { format_options } from "../../data/constants";

interface UploadButtonProps extends UploadProps {
  formats?: ImageFormats[];
  onUpload?: (fileData: FileData | null) => void;
  url?: string; // Image URL from selected Task
  fileData: FileData | null;
  setFileData: React.Dispatch<React.SetStateAction<FileData | null>>;
}

export default function UploadInput(props: UploadButtonProps) {
  const [error, setError] = useState("");
  const {
    formats = ["JPEG", "PNG", "SVG"],
    onUpload,
    url,
    fileData,
    setFileData,
    ...rest
  } = props;

  const handlePreview = (file: File) => {
    const reader = new FileReader();

    // Calculate progress of upload
    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setFileData((prev) => {
          if (!prev) return prev;
          return { ...prev, progress: percent };
        });
      }
    };

    // Set upload when completed
    reader.onload = () => {
      const newFileData: FileData = {
        url: reader.result as string,
        name: file.name,
        size: file.size,
        progress: 100,
      };
      setFileData(newFileData);

      setTimeout(() => {
        onUpload?.(newFileData);
      }, 0);
    };
    reader.readAsDataURL(file);
  };

  function handleDeleteFile(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    e.preventDefault();
    setFileData({ name: null, progress: 0, size: 0, url: null });
    setTimeout(() => onUpload?.(null), 0);
  }

  function handleFileExclusions(file: File) {
    const allowedTypes = formats
      ?.map((format) => {
        const option = format_options.find((option) => option.label === format);
        return option?.type;
      })
      .filter((options) => options !== undefined);

    const isValidType = allowedTypes?.includes(file.type);

    // Validate image format
    if (!isValidType) {
      setError("File format not supported");
      return false;
    }

    // Validate image size
    if (file.size / 1024 > 50) {
      setError("Upload an image lesser than 50KB");
      return false;
    }

    handlePreview(file);
    return isValidType || Upload.LIST_IGNORE;
  }

  // Handle display and hide error message
  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => setError(""), 7000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  useEffect(() => {
    if (url) {
      setFileData((prev) => ({
        url: prev?.url ?? url,
        name: prev?.name ?? "image.jpg",
        size: prev?.size ?? 0,
        progress: 100,
      }));
    }
  }, [setFileData, url]);

  return (
    <div>
      <Upload
        {...rest}
        beforeUpload={handleFileExclusions}
        type="drag"
        showUploadList={false}
        multiple={false}
        customRequest={() => null}
      >
        <div className="flex flex-col gap-4 justify-between rounded-lg p-3 cursor-pointer">
          {!fileData?.url && (
            <>
              <div className="dark:bg-zinc-800 bg-zinc-100 self-center p-3 rounded-full">
                <FiUploadCloud className="size-5" />
              </div>
              <button
                type="button"
                className="max-w-[240px] mx-auto cursor-pointer"
              >
                <span className="dark:text-primary-500 text-primary-700">
                  Click to upload
                </span>{" "}
                or drag and drop PNG or JPG
              </button>
            </>
          )}
          {fileData?.url && fileData?.name && (
            <div className="flex sm:flex-row flex-col sm:items-center items-stretch justify-between gap-4">
              <div className="flex sm:flex-row flex-col items-center gap-3">
                <img
                  src={fileData.url}
                  alt={fileData.name}
                  className="h-20 aspect-video sm:w-auto w-full object-cover rounded-sm dark:bg-zinc-800 bg-zinc-200"
                />
                <div className="text-left self-start">
                  <p className="font-medium line-clamp-2 md:max-w-[160px] max-w-[120px] leading-5 mb-1">
                    {fileData.name}
                  </p>
                  <p className="opacity-60 text-xs">
                    {fileData.size === 0
                      ? "Unknown Size"
                      : formatFileSize(fileData.size)}
                  </p>
                  {fileData.progress > 0 && (
                    <Progress
                      percent={fileData.progress}
                      type="line"
                      status={fileData.progress === 100 ? "normal" : "active"}
                      size="small"
                      strokeColor="#4f35f3"
                      className="min-w-24"
                    />
                  )}
                </div>
              </div>
              <Button
                onClick={handleDeleteFile}
                icon={<FiTrash2 />}
                size="large"
                type="text"
                className="sm:self-center self-end"
              >
                <div className="sr-only">Delete File</div>
              </Button>
            </div>
          )}
        </div>
      </Upload>
      {formats && error && <small className="text-danger">{error}</small>}
    </div>
  );
}
