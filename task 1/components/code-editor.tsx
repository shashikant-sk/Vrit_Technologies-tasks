'use client'

import { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Play, Square, Sun, Moon } from 'lucide-react'
import { websocketService } from '@/lib/websocket-service'
import { useTheme } from '@/contexts/theme-context'
import Editor from '@monaco-editor/react'

const SUPPORTED_LANGUAGES = [
  { value: 'python', label: 'Python', icon: 'https://img.icons8.com/?size=100&id=13441&format=png&color=000000', bgColor: 'bg-blue-100/10' },
  { value: 'html', label: 'HTML5', icon: 'https://img.icons8.com/?size=100&id=20909&format=png&color=000000', bgColor: 'bg-orange-100/10' },
  { value: 'javascript', label: 'JavaScript', icon: 'https://img.icons8.com/?size=100&id=108784&format=png&color=000000', bgColor: 'bg-yellow-100/10' },
  { value: 'java', label: 'Java', icon: 'https://img.icons8.com/?size=100&id=13679&format=png&color=000000', bgColor: 'bg-red-100/10' },
  { value: 'cpp', label: 'C++', icon: 'https://img.icons8.com/?size=100&id=40669&format=png&color=000000', bgColor: 'bg-blue-100/10' },
  { value: 'php', label: 'PHP', icon: 'https://img.icons8.com/?size=100&id=ew8X3wM9rXiK&format=png&color=000000', bgColor: 'bg-purple-100/10' }
]

export default function CodeEditor() {
  const { theme, toggleTheme } = useTheme()
  const [language, setLanguage] = useState('python')
  const [code, setCode] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState(null)
  const [isRunning, setIsRunning] = useState(false)
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    websocketService.connect()

    const unsubscribe = websocketService.onMessage((data) => {
      if (data.type === 'stdout') {
        setOutput(prev => prev + data.data)
        setError(null)
      }
      if (data.type === 'stderr') {
        setError(data.data || 'An error occurred')
        setStatus('error')
        setIsRunning(false)
      }
      if (data.type === 'run') {
        setStatus('running')
      }
    })

    return () => {
      unsubscribe()
      websocketService.disconnect()
    }
  }, [])

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage)
    setCode('')  // Clear code when switching languages
  }

  const handleRun = () => {
    setIsRunning(true)
    setOutput('')
    setError(null)
    setStatus('running')
    websocketService.runCode(code, language)
  }

  const handleStop = () => {
    setIsRunning(false)
    websocketService.stopCode()
    setStatus('idle')
  }

  const handleClear = () => {
    setOutput('')
    setError(null)
  }

  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Sidebar */}
      <div className="w-20 bg-[#1e2227] flex flex-col items-center py-4 space-y-6">
        {SUPPORTED_LANGUAGES.map((lang) => (
          <div 
            key={lang.value}
            className="relative group"
          >
            <button
              onClick={() => handleLanguageChange(lang.value)}
              className={`relative flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-200 
                ${language === lang.value ? 'bg-[#2d333b]' : 'hover:bg-[#2d333b]'}`}
            >
              <img src={lang.icon} alt={lang.label} className="w-8 h-8" />
            </button>
            
            {/* Tooltip */}
            <div className="absolute left-full ml-2 px-2 py-1 bg-[#2d333b] text-white text-sm rounded 
              opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
              {lang.label}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col bg-white dark:bg-[#0d1117]">
        {/* Header */}
        <header className="flex h-14 items-center justify-between border-b border-[#30363d] bg-[#f6f8fa] px-4 dark:bg-[#161b22]">
          <div className="flex items-center gap-4">
            <div className="size-8">
              <img src="https://img.icons8.com/?size=100&id=D1nLIDRRPKaW&format=png&color=000000" alt="Code Runner Logo" className="size-full" />
            </div>
            <h1 className="text-xl font-bold text-[#24292f] dark:text-white">Code Runner</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-40 border-[#d0d7de] bg-white text-[#24292f] dark:border-[#30363d] dark:bg-[#21262d] dark:text-white">
                <div className="flex items-center gap-2">
                  <img 
                    src={SUPPORTED_LANGUAGES.find(lang => lang.value === language)?.icon} 
                    alt={language} 
                    className="w-5 h-5"
                  />
                  <span>{SUPPORTED_LANGUAGES.find(lang => lang.value === language)?.label}</span>
                </div>
              </SelectTrigger>

              <SelectContent>
                {SUPPORTED_LANGUAGES.map(lang => (
                  <SelectItem key={lang.value} value={lang.value}>
                    <div className="flex items-center gap-2">
                      <img src={lang.icon} alt={lang.label} className="w-5 h-5" />
                      {lang.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-[#24292f] hover:bg-[#f3f4f6] dark:text-white dark:hover:bg-[#21262d]"
            >
              {theme === 'dark' ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </Button>

            <Button
              variant="default"
              onClick={handleRun}
              disabled={isRunning}
              className="bg-[#2da44e] text-white hover:bg-[#2c974b] disabled:bg-[#94d3a2] dark:bg-[#238636] dark:hover:bg-[#2ea043] dark:disabled:bg-[#238636]/70"
            >
              <Play className="mr-2 size-4" />
              Run
            </Button>

            <Button
              variant="default"
              onClick={handleStop}
              disabled={!isRunning}
              className="bg-[#cf222e] text-white hover:bg-[#a40e26] disabled:bg-[#ff818a] dark:bg-[#da3633] dark:hover:bg-[#b62324] dark:disabled:bg-[#da3633]/70"
            >
              <Square className="mr-2 size-4" />
              Stop
            </Button>
          </div>
        </header>

        {/* Editor Area */}
        <div className="grid flex-1 grid-cols-2 gap-4 p-4">
          {/* Code Input */}
          <div className="flex flex-col overflow-hidden rounded-lg border border-[#d0d7de] bg-white dark:border-[#30363d] dark:bg-[#0d1117]">
            <div className="flex items-center gap-2 border-b border-[#d0d7de] p-2 dark:border-[#30363d]">
              <div className="text-sm text-[#24292f] dark:text-white">Status:</div>
              <div className={`size-2 rounded-full ${
                status === 'running' ? 'bg-[#2da44e] dark:bg-[#238636]' :
                status === 'error' ? 'bg-[#cf222e] dark:bg-[#da3633]' :
                'bg-[#8c959f] dark:bg-[#6e7681]'
              }`} />
            </div>
            
            <div className="relative flex-1">
              <Editor
                value={code}
                onChange={(value) => setCode(value || '')}
                language={language.toLowerCase()}
                theme={theme === 'dark' ? 'vs-dark' : 'light'}
                options={{
                  fontSize: 14,
                  lineNumbers: 'on',
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  renderLineHighlight: 'all',
                  lineHeight: 21,
                  folding: true,
                  automaticLayout: true,
                }}
              />
            </div>
          </div>

          {/* Output */}
          <div className="flex flex-col overflow-hidden rounded-lg border border-[#d0d7de] bg-white dark:border-[#30363d] dark:bg-[#0d1117]">
            <div className="flex items-center justify-between border-b border-[#d0d7de] p-2 dark:border-[#30363d]">
              <div className="text-sm text-[#24292f] dark:text-white">Output:</div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="text-[#0969da] hover:bg-[#ddf4ff] dark:text-[#58a6ff] dark:hover:bg-[#388bfd1a]"
              >
                CLEAR
              </Button>
            </div>
            
            <div className="flex-1 overflow-auto p-4 font-mono text-sm">
              {error ? (
                <pre className="text-[#cf222e] dark:text-[#ff7b72]">{error}</pre>
              ) : language === 'html' ? (
                <div dangerouslySetInnerHTML={{ __html: code }} className="text-[#24292f] dark:text-white" />
              ) : output ? (
                <pre className="text-[#24292f] dark:text-white">{output}</pre>
              ) : (
                <div className="text-[#6e7781] dark:text-[#8b949e]">
                  Program output will appear here...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}