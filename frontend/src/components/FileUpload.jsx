import React, { useState, useRef } from 'react';
import { Upload, File, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

const FileUpload = ({ onFileUploaded }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file) => {
    setIsUploading(true);
    setUploadStatus(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadStatus({ type: 'success', message: 'File uploaded successfully!' });
      onFileUploaded(response.data.info);
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 'Failed to upload file';
      setUploadStatus({ type: 'error', message: errorMessage });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 bg-white hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".csv,.xlsx,.xls,.json,.parquet"
          onChange={handleFileSelect}
          disabled={isUploading}
        />

        {isUploading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-600">Uploading and analyzing your data...</p>
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-full">
                <Upload className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Drop your file here or click to browse
            </h3>
            <p className="text-gray-500 mb-6">
              Supports CSV, Excel (.xlsx, .xls), JSON, and Parquet files
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
            >
              Select File
            </button>
          </>
        )}
      </div>

      {uploadStatus && (
        <div
          className={`mt-4 p-4 rounded-lg flex items-center space-x-3 ${
            uploadStatus.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {uploadStatus.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span>{uploadStatus.message}</span>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
