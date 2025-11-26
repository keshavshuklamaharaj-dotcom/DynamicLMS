import React, { useState } from 'react';
import { Play, RotateCcw, Terminal } from 'lucide-react';

interface CodeEditorProps {
  initialCode: string;
  onRun?: (code: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ initialCode }) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setOutput(null);
    
    // Simulate execution time
    setTimeout(() => {
      setIsRunning(false);
      // Simple mock output based on common strings, otherwise generic success
      if (code.includes('console.log')) {
        setOutput('> Output:\nHello World\n> Process exited with code 0');
      } else if (code.includes('error')) {
        setOutput('> Error:\nSyntaxError: Unexpected token\n> Process exited with code 1');
      } else {
        setOutput('> Compiled successfully.\n> Tests passed: 3/3\n> Process exited with code 0');
      }
    }, 800);
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput(null);
  };

  return (
    <div className="flex flex-col h-full border border-gray-200 rounded-lg overflow-hidden bg-gray-900">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-2 text-xs text-gray-400 font-mono">main.js</span>
        </div>
        <div className="flex gap-2">
            <button 
                onClick={handleReset}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition"
                title="Reset Code"
            >
                <RotateCcw size={14} />
            </button>
            <button 
                onClick={handleRun}
                disabled={isRunning}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded transition disabled:opacity-50"
            >
                <Play size={12} fill="currentColor" />
                {isRunning ? 'Running...' : 'Run Code'}
            </button>
        </div>
      </div>
      
      <div className="flex flex-1 min-h-[300px]">
        <div className="flex-1 relative group">
            <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full bg-[#0d1117] text-gray-300 font-mono text-sm p-4 resize-none focus:outline-none code-scroll leading-relaxed"
                spellCheck={false}
            />
        </div>
      </div>

      {/* Output Console */}
      <div className="bg-black border-t border-gray-800 p-4 font-mono text-sm">
        <div className="flex items-center gap-2 text-gray-500 mb-2">
            <Terminal size={14} />
            <span className="text-xs uppercase tracking-wider">Console</span>
        </div>
        {output ? (
            <pre className="text-green-400 whitespace-pre-wrap animate-pulse-once">{output}</pre>
        ) : (
            <span className="text-gray-600 italic">Run code to see output...</span>
        )}
      </div>
    </div>
  );
};