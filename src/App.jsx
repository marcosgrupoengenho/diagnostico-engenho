import { useState } from 'react'
import Intro from './pages/Intro.jsx'
import Quiz from './pages/Quiz.jsx'
import Gate from './pages/Gate.jsx'
import Result from './pages/Result.jsx'

// Páginas: intro → quiz → gate (captura) → result
export default function App() {
  const [page, setPage] = useState('intro')
  const [answers, setAnswers] = useState({})       // { [questionId]: 1-5 }
  const [leadData, setLeadData] = useState(null)   // dados do portão

  return (
    <div style={{ minHeight: '100vh' }}>
      {page === 'intro' && (
        <Intro onStart={() => setPage('quiz')} />
      )}
      {page === 'quiz' && (
        <Quiz
          answers={answers}
          onChange={setAnswers}
          onComplete={() => setPage('gate')}
          onBack={() => setPage('intro')}
        />
      )}
      {page === 'gate' && (
        <Gate
          answers={answers}
          onSubmit={(data) => { setLeadData(data); setPage('result') }}
          onBack={() => setPage('quiz')}
        />
      )}
      {page === 'result' && (
        <Result answers={answers} lead={leadData} />
      )}
    </div>
  )
}
