import React from 'react';
import Search from './components/Search';
import './index.css';

function App() {
  return (
    <div className="App min-h-screen bg-gray-100 p-4">
      <header className="App-header text-center my-8">
        <h1 className="text-4xl font-extrabold text-gray-900">GitHub User Search</h1>
        <p className="text-lg text-gray-600 mt-2">Find developers by username, location, and repository count</p>
      </header>
      <main>
        <Search />
      </main>
    </div>
  );
}

export default App;
