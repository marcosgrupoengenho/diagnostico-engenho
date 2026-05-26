import { useMemo } from 'react'
import { calcScores, getProfile, getCriticalDims, DIMS_DATA, QUESTIONS } from '../lib/data.js'
import styles from './Result.module.css'

export default function Result({ answers, lead }) {
  const { total, dimScores } = useMemo(() => calcScores(answers), [answers])
  const profile = getProfile(total)
  const criticalIds = getCriticalDims(dimScores, 3)
  const bestIds = getCriticalDims(dimScores).slice(-2).map(([id]) => id)
  const firstName = lead?.nome?.split(' ')[0] || ''

  const WHATSAPP_NUMBER = '5519992101176' // ← substitua pelo número real
  const EMAIL_CONTATO = 'marcos@grupoengenho.com.br' // ← substitua

  function handleAgendar() {
    window.open('https://wa.me/5519992101176', '_blank')// ← link Calendly real
  }

  function handleWhatsapp() {
    const msg = encodeURIComponent(
      `Olá! Acabei de fazer o diagnóstico de gestão do Grupo Engenho.\n` +
      `Minha pontuação foi ${total}/50 (${profile.label}).\n` +
      `Gostaria de conversar sobre os resultados.`
    )
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank')
  }

  function handleEmail() {
    const subject = encodeURIComponent(`Diagnóstico de Gestão — ${lead?.empresa || ''}`)
    const body = encodeURIComponent(
      `Olá,\n\nAcabei de fazer o diagnóstico de gestão e gostaria de receber mais informações.\n\n` +
      `Nome: ${lead?.nome}\nEmpresa: ${lead?.empresa}\nPontuação: ${total}/50 (${profile.label})\n\nObrigado!`
    )
    window.open(`mailto:${EMAIL_CONTATO}?subject=${subject}&body=${body}`)
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>

        {/* Hero */}
        <div className={styles.hero} style={{ animationDelay: '0ms' }}>
          <p className={styles.leadName}>
            Diagnóstico de <strong>{lead?.nome}</strong> · {lead?.empresa}
          </p>

          <div className={styles.scoreCircle} style={{ borderColor: profile.color, background: profile.bg }}>
            <span className={styles.scoreNum} style={{ color: profile.color }}>{total}</span>
            <span className={styles.scoreSub}>de 50</span>
          </div>

          <span className={styles.profileBadge} style={{ background: profile.bg, color: profile.color }}>
            {profile.label}
          </span>

          <h1 className={styles.heroTitle}>{profile.title}</h1>
          <p className={styles.heroIntro}>{profile.intro}</p>
        </div>

        {/* Dimensões */}
        <section className={styles.section} style={{ animationDelay: '100ms' }}>
          <h2 className={styles.sectionTitle}>Resultado por dimensão</h2>
          <div className={styles.dimGrid}>
            {QUESTIONS.map(q => {
              const sc = dimScores[q.id]
              const isCrit = criticalIds.includes(q.id)
              const isGood = bestIds.includes(q.id)
              const pct = Math.round((sc / 5) * 100)
              const barColor = sc <= 2 ? '#D85A30' : sc <= 3 ? '#BA7517' : '#1D9E75'
              return (
                <div
                  key={q.id}
                  className={`${styles.dimCard} ${isCrit ? styles.crit : isGood ? styles.good : ''}`}
                >
                  <div className={styles.dimHeader}>
                    <span className={styles.dimName}>{DIMS_DATA[q.id].label}</span>
                    <span className={styles.dimScore} style={{ color: barColor }}>{sc}/5</span>
                  </div>
                  <div className={styles.dimBarBg}>
                    <div className={styles.dimBarFill} style={{ width: `${pct}%`, background: barColor }} />
                  </div>
                  {isCrit && (
                    <p className={styles.dimNote}>{DIMS_DATA[q.id].opp}</p>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* Dores críticas */}
        <section className={styles.section} style={{ animationDelay: '180ms' }}>
          <h2 className={styles.sectionTitle}>As 3 dimensões que mais limitam sua operação</h2>
          <div className={styles.painList}>
            {criticalIds.map(id => (
              <div key={id} className={styles.painCard}>
                <p className={styles.painDim}>{DIMS_DATA[id].label}</p>
                <p className={styles.painText}>{DIMS_DATA[id].pain}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className={styles.ctaBox} style={{ animationDelay: '260ms' }}>
          <h2 className={styles.ctaTitle}>Transforme esse diagnóstico em um plano de ação real</h2>
          <p className={styles.ctaSub}>
            Nossos consultores aprofundam cada ponto crítico, quantificam o impacto e mostram como
            empresas do seu setor resolveram esses problemas com resultados mensuráveis.
          </p>

          <div className={styles.ctaOptions}>

            <button className={styles.ctaMain} onClick={handleAgendar} type="button">
              <div className={styles.ctaIconWrap} style={{ background: 'var(--green)' }}>
                <CalendarIcon />
              </div>
              <div className={styles.ctaBody}>
                <span className={styles.ctaOptionTitle}>
                  Agendar uma conversa
                  <span className={styles.badge}>Recomendado</span>
                </span>
                <span className={styles.ctaOptionSub}>
                  30 minutos com um consultor — sem compromisso.
                </span>
              </div>
              <ArrowIcon color="var(--green-dark)" />
            </button>

            <button className={styles.ctaSecondary} onClick={handleWhatsapp} type="button">
              <div className={styles.ctaIconWrap} style={{ background: 'var(--green-light)', border: '1px solid var(--green-mid)' }}>
                <WhatsAppIcon />
              </div>
              <div className={styles.ctaBody}>
                <span className={styles.ctaOptionTitle}>Chamar no WhatsApp</span>
                <span className={styles.ctaOptionSub}>
                  Troca rápida antes de marcar uma reunião.
                </span>
              </div>
              <ArrowIcon />
            </button>

            <button className={styles.ctaSecondary} onClick={handleEmail} type="button">
              <div className={styles.ctaIconWrap} style={{ background: 'var(--ink-10)', border: '1px solid var(--border)' }}>
                <EmailIcon />
              </div>
              <div className={styles.ctaBody}>
                <span className={styles.ctaOptionTitle}>Receber mais informações por e-mail</span>
                <span className={styles.ctaOptionSub}>
                  Cases, metodologia e detalhes sobre como trabalhamos.
                </span>
              </div>
              <ArrowIcon />
            </button>

          </div>
        </section>

      </div>
    </div>
  )
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="var(--green-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="var(--ink-60)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )
}

function ArrowIcon({ color = 'var(--ink-60)' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0 }}>
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  )
}
