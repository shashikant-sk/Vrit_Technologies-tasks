import { ThemeProvider } from '@/contexts/theme-context'
import CodeEditor from '@/components/code-editor'

export default function Page() {
  return (
    <ThemeProvider>
      <CodeEditor />
    </ThemeProvider>
  )
}

