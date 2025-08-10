'use client';

import FileUploadButton from "@/components/FileUploadButton";
import dynamic from "next/dynamic";
const PdfCanvasViewer = dynamic(() => import("@/components/PdfCanvasViewer"), { ssr: false });
import { useState } from "react";

export default function Dashboard() {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };
    return (
        <div className="flex h-screen bg-white">
            <div className="flex flex-col w-1/2 min-h-0">
                <div className="h-1/2 border border-black ">
                    <h1 className="flex items-center justify-center text-black text-3xl h-16">
                        Job Description
                    </h1>

                    <div className="px-4 py-4 h-[calc(100%-4rem)]">
                        <div className="px-4 py-4 h-full">
                            <div className="w-full h-full border-2 border-black rounded-2xl overflow-hidden">
                                <textarea
                                    className="w-full h-full text-black p-2 overflow-y-auto focus:outline-none focus:border-none resize-none"
                                    placeholder="please enter the job description"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white h-1/2 border border-black p-2 flex flex-col min-h-0">
                    <div className={`${file ? "block" : "hidden"} border border-black w-full flex-1 min-h-0`}>
                        {file && file.type === "application/pdf" ? (
                            <PdfCanvasViewer key={file.name + file.lastModified} file={file} />
                        ) : file ? (
                            <div className="p-4 text-sm text-red-600">
                                Selected file isn’t a PDF. Please upload a PDF to preview.
                            </div>
                        ) : null}
                    </div>



                    {/* top-right button when file exists */}
                    <div className={`${file ? "flex" : "hidden"} justify-end mt-2`}>
                        <FileUploadButton id="file-upload-top" onChange={handleFileChange} />
                    </div>

                    {/* centered button before file */}
                    <div className={`${file ? "hidden" : "flex"} flex-1 items-center justify-center`}>
                        <FileUploadButton id="file-upload-bottom" onChange={handleFileChange} />
                    </div>
                </div>



            </div>
            <div className="bg-blue-600 w-1/2">
            </div>
        </div>
    );
}


{/* 
                            <label
                                htmlFor="file-upload"
                                className="bg-gray-500 rounded h-10 w-28 flex items-center justify-center text-white cursor-pointer"
                            >
                                + Add PDF
                            </label>
                            <input
                                id="file-upload"
                                type="file"
                                accept=".pdf,.doc,.docx"
                                className="hidden"
                            />
                        </div> */}