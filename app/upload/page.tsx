"use client";

import { Box, Stack } from "@mui/joy";
import { useEffect, useState } from "react";
import { upload } from "./upload";

export default function Upload() {
  
  const [filename, setFilename] = useState("");
  const [fileObj, setFileObj] = useState<string|File>('');

  const handleFileUploadDrop = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFilename(file.name);
      setFileObj(file);
    }
  };

  const handleFileUpload = () => {
    
  }


  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-center">Upload</h1>
        </div>

        <div className="flex flex-col gap-4 items-center justify-center w-7/12">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-transparent dark:border-gray-600 dark:hover:border-gray-500"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              {filename ? (
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">selected file:</span>{" "}
                  {filename}
                </p>
              ) : (
                <>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PDF, ODT, TXT, RTF or DOCX
                  </p>
                </>
              )}
            </div>
            <input
              id="dropzone-file"
              onChange={(e) => handleFileUploadDrop(e)}
              accept=".rtf,.odt,.docx,.pdf"
              type="file"
              className="hidden "
            />
          </label>
          <Stack gap={2} direction="row">
            <button
              type="button"
              className="bg-red-500 w-28 h-9 hover:bg-red-600 text-white rounded-md"
              value={"Clear"}
            >
              Clear
            </button>
            <button
              type="button"
              className="bg-blue-500 w-28 h-9 hover:bg-blue-600 hover:cursor-pointer text-white rounded-md"
              value={"Upload"}
            >
              Upload
            </button>
          </Stack>
        </div>
      </div>
    </main>
  );
}