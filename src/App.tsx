import { useEffect, useState } from 'react'
import type { Project as ProjectType } from './types'
import { projects as projectsData } from './data/projects'

type LinkItem = { label: string; href: string }

function useClockWithTimezone(timezone?: string) {
  const [now, setNow] = useState<string>("")
  useEffect(() => {
    const update = () => {
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      }
      const time = new Intl.DateTimeFormat(undefined, options).format(new Date())
      setNow(time)
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [timezone])
  return now
}

function Header() {
  const time = useClockWithTimezone()
  const left: LinkItem[] = [
    { label: '//portfolio', href: '/' },
    { label: '//contact', href: '#contact' },
    { label: '//github', href: 'https://github.com/piyushkhewalkar' },
  ]
  return (
    <header className="container fade-in" aria-label="primary">
      <div className="between mono header-bar" style={{ fontSize: 14 }}>
        <nav className="row wrap" aria-label="terminal tabs">
          {left.map((l) => (
            <a key={l.label} className="underline-hover muted" href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{l.label}</a>
          ))}
        </nav>
        <div className="row muted wrap">
          <span>//location&nbsp; Pune, IN</span>
          <span>{time}</span>
        </div>
      </div>
      <div className="divider" />
    </header>
  )
}

function Hero() {
  return (
    <section className="container col fade-in" style={{ gap: 16 }}>
      <div className="row" style={{ gap: 16 }}>
        <img src="https://avatars.githubusercontent.com/u/20717417?v=4" alt="profile" style={{ width: 72, height: 72, borderRadius: 9999, filter: 'grayscale(100%)', border: '1px solid #2a2a2a' }} />
        <div className="col" style={{ gap: 6 }}>
          <h1 className="mono" style={{ fontSize: 36, fontWeight: 600 }}>&lt;Piyush Khewalkar&gt;</h1>
          <p className="mono muted">//software developer</p>
        </div>
      </div>
      <div className="divider" />
    </section>
  )
}

function About() {
  return (
    <section className="container col fade-in" style={{ gap: 12 }} id="about">
      <h2 className="mono muted">//about</h2>
      <p style={{ lineHeight: 1.7, maxWidth: 760 }}>
        3 years into building and shipping
        scalable products. full‑stack by habit: system design, clean apis, and
        clean ui. i ship fast and yet manage to write code that others can understand.
      </p>
      <div className="divider" />
    </section>
  )
}

function Experience() {
  return (
    <section className="container col fade-in" style={{ gap: 12 }} id="work">
      <h2 className="mono muted">//work experience</h2>
      <div className="two-col">
        <div className="muted mono">feb 2022 – present</div>
        <div className="col" style={{ gap: 8 }}>
          <div className="badge mono">freelance //software engineer (remote)</div>
          <ul style={{ paddingLeft: 16, lineHeight: 1.8 }}>
            <li>designed and shipped custom sites and apps for real estate, education, and saas.</li>
            <li>built responsive, accessible frontends with react + tailwind.</li>
            <li>created apis with node/express and mongodb; deployed on vercel and render.</li>
          </ul>
        </div>
      </div>

      <div className="divider" />
    </section>
  )
}

function Projects() {
  const projects: ProjectType[] = projectsData

  return (
    <section className="container col fade-in" style={{ gap: 12 }} id="projects">
      <h2 className="mono muted">//projects</h2>
      {projects.map((p) => (
        <div key={p.title} className="two-col" style={{ marginTop: 8 }}>
          <div className="muted mono">{p.period ?? '—'}</div>
          <div className="col" style={{ gap: 8 }}>
            <div className="badge mono">{p.title}</div>
            <p style={{ lineHeight: 1.7, maxWidth: 760 }}>{p.summary}{p.tech ? ` stack: ${p.tech}.` : ''}</p>
            {p.media && p.media.length > 0 && (
              <div className="media-frame" style={{ padding: 8 }}>
                <div className="media-grid">
                  {p.media.map((m, idx) =>
                    m.type === 'video' ? (
                      <video key={idx} src={m.src} controls playsInline />
                    ) : (
                      <img key={idx} src={m.src} alt={m.alt ?? `${p.title} media ${idx+1}`} />
                    )
                  )}
                </div>
              </div>
            )}
            <div className="row mono" style={{ gap: 8, flexWrap: 'wrap' }}>
              {p.live && <a className="badge underline-hover" href={p.live} target="_blank" rel="noreferrer">live</a>}
              {p.repo && <a className="badge underline-hover" href={p.repo} target="_blank" rel="noreferrer">github</a>}
            </div>
            {p.stats && (
              <div className="row muted mono" style={{ gap: 16, flexWrap: 'wrap' }}>
                {p.stats.map((s) => (<span key={s}>{s}</span>))}
              </div>
            )}
          </div>
        </div>
      ))}
      <div className="divider" />
    </section>
  )
}

function Skills() {
  const languages = ['javascript', 'html', 'css']
  const databases = ['mongodb', 'redis']
  const tools = ['react', 'tailwind css', 'node.js', 'express.js', 'apis (rest)', 'docker', 'vercel', 'render', 'postman']
  const Pill = ({ text }: { text: string }) => (
    <span className="badge" style={{ padding: '4px 10px' }}>{text}</span>
  )
  return (
    <section className="container col fade-in" style={{ gap: 12 }} id="skills">
      <h2 className="mono muted">//skills</h2>
      <div className="two-col">
        <div className="muted mono">languages</div>
        <div className="row" style={{ flexWrap: 'wrap', gap: 8 }}>
          {languages.map((s) => <Pill key={s} text={s} />)}
        </div>
      </div>
      <div className="two-col">
        <div className="muted mono">databases</div>
        <div className="row" style={{ flexWrap: 'wrap', gap: 8 }}>
          {databases.map((s) => <Pill key={s} text={s} />)}
        </div>
      </div>
      <div className="two-col">
        <div className="muted mono">tools</div>
        <div className="row" style={{ flexWrap: 'wrap', gap: 8 }}>
          {tools.map((s) => <Pill key={s} text={s} />)}
        </div>
      </div>
      <div className="two-col">
        <div className="muted mono">ai/llms</div>
        <div className="row" style={{ flexWrap: 'wrap', gap: 8 }}>
          {['openai', 'gemini', 'anthropic'].map((s) => <Pill key={s} text={s} />)}
        </div>
      </div>
      <div className="divider" />
    </section>
  )
}

function Learning() {
  return (
    <section className="container col fade-in" style={{ gap: 12 }} id="about">
      <h2 className="mono muted">//what im learning</h2>
      <p style={{ lineHeight: 1.7, maxWidth: 760 }}>
        I am actively learning STEM since childhood. right now i am expanding my stack by learning web 3 tech... till now i have managed to create a basic, half-balked web3 wallet - github.com/piyushkhewalkar/web3-wallet
      </p>
      <div className="divider" />
    </section>
  )
}


function Contact() {
  return (
    <section className="container col fade-in" style={{ gap: 8 }} id="contact">
      <h2 className="mono muted">//contact</h2>
      <div className="row mono" style={{ flexWrap: 'wrap' }}>
        <a className="underline-hover" href="mailto:work.piyushkkr@gmail.com">email</a>
        <span className="muted">/</span>
        <a className="underline-hover" href="https://github.com/piyushkhewalkar" target="_blank" rel="noreferrer">github</a>
        <span className="muted">/</span>
        <a className="underline-hover" href="https://x.com/piyushkkr" target="_blank" rel="noreferrer">x</a>
        <span className="muted">/</span>
        <a className="underline-hover" href="https://piyushkhewalkar.com" target="_blank" rel="noreferrer">website</a>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Learning />
      <Contact />
    </main>
  )
}
