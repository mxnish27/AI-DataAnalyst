import React from 'react';
import { Database, Trash2, Table, Columns, FileText } from 'lucide-react';
import axios from 'axios';

const DataInfo = ({ dataInfo, onClearData }) => {
  const handleClearData = async () => {
    try {
      await axios.delete('/api/data');
      onClearData();
    } catch (error) {
      console.error('Failed to clear data:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Database className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Dataset Info</h2>
        </div>
        <button
          onClick={handleClearData}
          className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
          title="Clear data"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Table className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Dimensions</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-2xl font-bold text-gray-900">{dataInfo.shape.rows.toLocaleString()}</p>
              <p className="text-xs text-gray-500">Rows</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{dataInfo.shape.columns}</p>
              <p className="text-xs text-gray-500">Columns</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Columns className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Columns</span>
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {dataInfo.columns.map((col, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-3 border border-gray-200"
              >
                <div className="flex items-start justify-between mb-1">
                  <span className="font-medium text-gray-900 text-sm">{col.name}</span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {col.dtype}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>{col.unique_count} unique</span>
                  {col.null_count > 0 && (
                    <span className="text-orange-600">{col.null_count} nulls</span>
                  )}
                </div>
                {col.stats && (
                  <div className="mt-2 text-xs text-gray-600">
                    <div className="flex space-x-3">
                      <span>Min: {col.stats.min?.toFixed(2)}</span>
                      <span>Max: {col.stats.max?.toFixed(2)}</span>
                      <span>Avg: {col.stats.mean?.toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <FileText className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Memory Usage</span>
          </div>
          <p className="text-lg font-semibold text-gray-900">{dataInfo.memory_usage}</p>
        </div>
      </div>
    </div>
  );
};

export default DataInfo;
