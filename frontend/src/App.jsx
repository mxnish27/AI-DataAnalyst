import React, { useState } from 'react';
import { Upload, MessageSquare, Database, TrendingUp, BarChart3, Sparkles } from 'lucide-react';
import FileUpload from './components/FileUpload';
import DataInfo from './components/DataInfo';
import ChatInterface from './components/ChatInterface';

function App() {
  const [dataInfo, setDataInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUploaded = (info) => {
    setDataInfo(info);
  };

  const handleClearData = () => {
    setDataInfo(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AI Data Analyst</h1>
                <p className="text-sm text-gray-500">Ask questions in plain English</p>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Database className="w-4 h-4" />
                <span>Multi-format</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span>Auto-Viz</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!dataInfo ? (
          <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
            <div className="w-full max-w-2xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Upload Your Data
                </h2>
                <p className="text-gray-600">
                  Support for CSV, Excel, JSON, and Parquet files
                </p>
              </div>
              <FileUpload onFileUploaded={handleFileUploaded} />
              
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Upload className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">1. Upload</h3>
                  <p className="text-sm text-gray-600">
                    Upload your data file in any supported format
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <MessageSquare className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">2. Ask</h3>
                  <p className="text-sm text-gray-600">
                    Ask questions about your data in plain English
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <BarChart3 className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">3. Analyze</h3>
                  <p className="text-sm text-gray-600">
                    Get insights and visualizations instantly
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <DataInfo dataInfo={dataInfo} onClearData={handleClearData} />
            </div>
            <div className="lg:col-span-2">
              <ChatInterface />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
