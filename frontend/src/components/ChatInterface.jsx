import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, User, Bot, BarChart3, TrendingUp, PieChart, Activity } from 'lucide-react';
import axios from 'axios';
import Plot from 'react-plotly.js';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestedQueries = [
    { icon: BarChart3, text: "What are the top 5 values?" },
    { icon: TrendingUp, text: "Show me trends over time" },
    { icon: PieChart, text: "What's the distribution?" },
    { icon: Activity, text: "Calculate summary statistics" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('query', inputValue);

      const response = await axios.post('/api/query', formData);

      const aiMessage = {
        type: 'ai',
        content: response.data.explanation,
        data: response.data.data,
        visualization: response.data.visualization,
        analysisType: response.data.analysis_type,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        type: 'ai',
        content: `Error: ${error.response?.data?.detail || 'Failed to process query'}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuery = (query) => {
    setInputValue(query);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-[calc(100vh-200px)]">
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-purple-500 to-blue-600 p-2 rounded-lg">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">AI Assistant</h2>
            <p className="text-sm text-gray-500">Ask questions about your data</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-full mb-4">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Start Analyzing Your Data
            </h3>
            <p className="text-gray-500 mb-6 max-w-md">
              Ask questions in plain English and get instant insights with visualizations
            </p>
            <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
              {suggestedQueries.map((query, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuery(query.text)}
                  className="flex items-center space-x-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors border border-gray-200"
                >
                  <query.icon className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{query.text}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex space-x-3 max-w-3xl ${
                    message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === 'user'
                        ? 'bg-blue-500'
                        : 'bg-gradient-to-br from-purple-500 to-blue-600'
                    }`}
                  >
                    {message.type === 'user' ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div
                    className={`rounded-lg p-4 ${
                      message.type === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    
                    {message.data && (
                      <div className="mt-3 bg-white rounded-lg p-3 text-gray-900 overflow-x-auto">
                        <pre className="text-xs">
                          {JSON.stringify(message.data, null, 2)}
                        </pre>
                      </div>
                    )}
                    
                    {message.visualization && (
                      <div className="mt-3 bg-white rounded-lg p-3">
                        <Plot
                          data={message.visualization.data}
                          layout={{
                            ...message.visualization.layout,
                            autosize: true,
                            margin: { l: 50, r: 50, t: 50, b: 50 },
                          }}
                          config={{ responsive: true }}
                          style={{ width: '100%', height: '400px' }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex space-x-3 max-w-3xl">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-600">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <Loader2 className="w-5 h-5 text-gray-600 animate-spin" />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSubmit} className="flex space-x-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask a question about your data..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
