import { useState } from 'react'
import { supabase } from '../lib/supabase.js'
import { calcScores, getProfile } from '../lib/data.js'
import styles from './Gate.module.css'

const SETORES = [
  'Manufatura / Indústria',
  'Logística / Transporte',
  'Varejo / Distribuição',
  'Serviços / Consultoria',
  'Saúde',
  'Construção / Engenharia',
  'Agronegócio',
  'Outro',
]

export default function Gate({ answers, onSubmit, onBack }) {
  const [form, setForm] = useState({
    nome: '', empresa: '', cargo: '', setor: '', email: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const valid =
    form.nome.trim().length > 1 &&
    form.empresa.trim().length > 1 &&
    form.cargo.trim().length > 1 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)

  function set(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!valid || loading) return
    setLoading(true)
    setError(null)

    const { total, dimScores } = calcScores(answers)
    const profile = getProfile(total)

    // Salva no Supabase
    const { error: dbError } = await supabase.from('leads').insert({
      nome: form.nome.trim(),
      empresa: form.empresa.trim(),
      cargo: form.cargo.trim(),
      setor: form.setor || null,
      email: form.email.trim().toLowerCase(),
      score_total: total,
      perfil: profile.key,
      score_gestao_processos: dimScores.gestao_processos,
      score_indicadores: dimScores.indicadores,
      score_gestao_rotina: dimScores.gestao_rotina,
      score_melhoria_continua: dimScores.melhoria_continua,
      score_estrategia: dimScores.estrategia,
      score_estrutura: dimScores.estrutura,
      score_cultura: dimScores.cultura,
      score_projetos: dimScores.projetos,
      score_informacao: dimScores.informacao,
      score_execucao: dimScores.execucao,
    })

    if (dbError) {
      console.error('Supabase error:', dbError)
      setError('Ocorreu um erro ao salvar. Tente novamente.')
      setLoading(false)
      return
    }

    onSubmit({ ...form, score: total, perfil: profile.key })
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>

        <div className={styles.header}>
          <div className={styles.checkIcon}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h1 className={styles.title}>Seu diagnóstico está pronto</h1>
          <p className={styles.sub}>
            Preencha seus dados para visualizar o resultado completo —
            incluindo as dimensões críticas da sua operação e os próximos passos recomendados.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.row2}>
            <div className={styles.field}>
              <label htmlFor="nome">Nome</label>
              <input
                id="nome" type="text" placeholder="Seu nome completo"
                value={form.nome} onChange={e => set('nome', e.target.value)}
                autoFocus
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="empresa">Empresa</label>
              <input
                id="empresa" type="text" placeholder="Nome da empresa"
                value={form.empresa} onChange={e => set('empresa', e.target.value)}
              />
            </div>
          </div>

          <div className={styles.row2}>
            <div className={styles.field}>
              <label htmlFor="cargo">Cargo</label>
              <input
                id="cargo" type="text" placeholder="Ex: Diretor de Operações"
                value={form.cargo} onChange={e => set('cargo', e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="setor">Setor</label>
              <select id="setor" value={form.setor} onChange={e => set('setor', e.target.value)}>
                <option value="">Selecione...</option>
                {SETORES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="email">E-mail corporativo</label>
            <input
              id="email" type="email" placeholder="voce@empresa.com.br"
              value={form.email} onChange={e => set('email', e.target.value)}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button
            className={`btn-primary ${styles.submit}`}
            type="submit"
            disabled={!valid || loading}
          >
            {loading ? 'Salvando...' : 'Ver meu diagnóstico →'}
          </button>

          <p className={styles.privacy}>
            Seus dados são usados exclusivamente para envio do diagnóstico e contato
            da nossa equipe. Sem spam, sem compartilhamento.
          </p>
        </form>

        <button className={`btn-ghost ${styles.back}`} onClick={onBack} type="button">
          ← Voltar às perguntas
        </button>

      </div>
    </div>
  )
}
