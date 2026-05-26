import { useState } from 'react'
import { QUESTIONS, LABELS } from '../lib/data.js'
import styles from './Quiz.module.css'

export default function Quiz({ answers, onChange, onComplete, onBack }) {
  const [current, setCurrent] = useState(0)
  const q = QUESTIONS[current]
  const selected = answers[q.id] ?? null
  const progress = (current / QUESTIONS.length) * 100

  function pick(val) {
    onChange({ ...answers, [q.id]: val })
  }

  function next() {
    if (selected === null) return
    if (current === QUESTIONS.length - 1) { onComplete(); return }
    setCurrent(current + 1)
  }

  function back() {
    if (current === 0) { onBack(); return }
    setCurrent(current - 1)
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>

        {/* Progress */}
        <div className={styles.progressWrap}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
          <span className={styles.progressLabel}>{current + 1} / {QUESTIONS.length}</span>
        </div>

        {/* Question */}
        <div className={styles.qCard} key={q.id}>
          <p className={styles.dimTag}>{q.dim}</p>
          <h2 className={styles.qText}>{q.q}</h2>
          <p className={styles.qHint}>
            Selecione o quanto essa afirmação descreve a realidade da sua empresa.
          </p>

          <div className={styles.options}>
            {LABELS.map((label, idx) => {
              const val = idx + 1
              return (
                <button
                  key={val}
                  className={`${styles.option} ${selected === val ? styles.selected : ''}`}
                  onClick={() => pick(val)}
                  type="button"
                >
                  <span className={styles.optNum}>{val}</span>
                  <span className={styles.optLabel}>{label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className={styles.nav}>
          <button className="btn-ghost" onClick={back} type="button">
            ← Voltar
          </button>
          <button
            className="btn-primary"
            onClick={next}
            disabled={selected === null}
            type="button"
          >
            {current === QUESTIONS.length - 1 ? 'Ver diagnóstico →' : 'Próxima →'}
          </button>
        </div>

      </div>
    </div>
  )
}
