import styles from './Intro.module.css'

export default function Intro({ onStart }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>

        <div className={styles.brand} style={{ animationDelay: '0ms' }}>
          <span className={styles.brandDot} />
          Grupo Engenho
        </div>

        <h1 className={styles.headline} style={{ animationDelay: '80ms' }}>
          Como está a gestão<br />
          <em>da sua operação?</em>
        </h1>

        <p className={styles.sub} style={{ animationDelay: '160ms' }}>
          Responda 10 afirmações e receba um diagnóstico personalizado
          com os pontos críticos da sua gestão — e caminhos concretos
          para resolvê-los.
        </p>

        <div className={styles.meta} style={{ animationDelay: '220ms' }}>
          <span>10 perguntas</span>
          <span className={styles.sep}>·</span>
          <span>~3 minutos</span>
          <span className={styles.sep}>·</span>
          <span>Resultado imediato</span>
        </div>

        <button
          className={`btn-primary ${styles.cta}`}
          onClick={onStart}
          style={{ animationDelay: '280ms' }}
        >
          Iniciar diagnóstico →
        </button>

        <p className={styles.disclaimer} style={{ animationDelay: '340ms' }}>
          Gratuito. Sem compromisso.
        </p>

      </div>

      <div className={styles.bg} aria-hidden="true">
        <div className={styles.bgGrid} />
        <div className={styles.bgAccent} />
      </div>
    </div>
  )
}
