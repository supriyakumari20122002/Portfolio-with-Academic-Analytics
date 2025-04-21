import React, { useState } from 'react';
import { 
  BarChart3, 
  PieChart,
  LineChart,
  Upload,
  Download,
  RefreshCw,
  Filter
} from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [data, setData] = useState<number[]>([65, 42, 78, 95, 60, 85]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file upload logic here
    console.log('File uploaded:', e.target.files?.[0]);
  };

  const refreshData = () => {
    // Simulate data refresh
    setData([...data.map(() => Math.floor(Math.random() * 100))]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-indigo-600" />
            Data Analysis Tool
          </h1>
          <div className="flex items-center gap-4">
            <button 
              onClick={refreshData}
              className="p-2 text-gray-600 hover:text-indigo-600 rounded-full hover:bg-gray-100"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-indigo-600 rounded-full hover:bg-gray-100">
              <Filter className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Data Import</h2>
            <div className="flex gap-4">
              <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <Upload className="h-4 w-4 mr-2" />
                Upload Data
                <input
                  type="file"
                  className="hidden"
                  accept=".csv,.xlsx"
                  onChange={handleFileUpload}
                />
              </label>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <Download className="h-4 w-4 mr-2" />
                Export Results
              </button>
            </div>
          </div>
        </div>

        {/* Analysis Tabs */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {['overview', 'trends', 'comparison'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`${
                    activeTab === tab
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm capitalize`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Sample Visualization */}
            <div className="bg-gray-50 rounded-lg p-4 h-64 flex items-center justify-center">
              <div className="flex items-end justify-around w-full h-48 px-8">
                {data.map((value, index) => (
                  <div
                    key={index}
                    className="w-8 bg-indigo-500 rounded-t transition-all duration-300"
                    style={{ height: `${value}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { label: 'Average', value: '72.5', icon: BarChart3 },
                { label: 'Distribution', value: 'Normal', icon: PieChart },
                { label: 'Trend', value: 'Upward', icon: LineChart },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white overflow-hidden shadow rounded-lg"
                >
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <stat.icon className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            {stat.label}
                          </dt>
                          <dd className="text-lg font-semibold text-gray-900">
                            {stat.value}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;