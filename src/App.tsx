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
    { label: '//blog', href: '/blog/' },
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
        <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALwAyAMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAADBAUGAQIHAP/EAEQQAAEDAgQDBQQGBwUJAAAAAAEAAgMEEQUSITEGQVETImFxkRQygaEjQlKxwdEVJDN0orLhByU1YnIWQ1NzkpTC0vH/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAQIDBP/EACERAQEAAgICAwADAAAAAAAAAAABAhESIRMxAxRhIjJB/9oADAMBAAIRAxEAPwCrMCPGEJiYiCA8YKdiYl4mlPQtKA0QumYmXQ4WbJyNilHo2JhrCto4vBMNjKihNYt2xo7Y/BEbF4IuywjK2EaaDPBZ7NDZXIVgx+CbMfgsdn4IbKlhWpYOqbLCtCzwRShYhvanHMKE9iBJzUB7U49iA8IEntS72p2RqVkCsSk5Al5B3bpx7Us8aWVZKvAWVs5t15BHRhNQhAjTcTUDcLdk9CzZLQNUhTtQHhjTkUa0gYnomKDaONHYzu3Og6/NbxsULxk58GGQuY9zLzBrrE6jKfySTd0JxsYG6K2I9Fx/ss+dvfa+9xqdkONv0Wa7tz9Yrv4EmUdl7KxtY3WcgvqbeFwuP0eV0nezgsbYG/Pr5LMvYwyl73WJ2bcH8U8C8/x1/ICLje2vh8lrlGa1x6hcWqKlrpR3HM/+ob3gEFvI63vdPrs8nbHNb9oITuzG7m/ErjWeNwIub8tdUrLzzNdoL+Sv1/05O1ksOz2+qE8x8ng6rjETtTta+1lvmYw2221sp9f9Xm65LlAsHtJv1SzwOWo6rnMOoa8t0dtp5q0cLuzVE7W3yht7X8VjP49LMkvIEpK1PvalJguTUJPS8jU3IEB47t1pkm4LyI5eQRUYT0IScQT9OgegapOBoUdT+9ZSkClDsIT8LUnCNlIQoDxhQPHjf7phA2NSP5XKwxhQvGsEs+FwtiYXOE4Om3uuWsP7DnUhLHZWuPS6XY14hvm1uRtpfVMPf2fdJjD72NzshAHLmbprcC+5uvbHNpmcXZSMx63tsvTDPa7rWOi8C50hzWLW7uGyE9zsxDy34OPRXoLy5RM0E2N9egWkr7lwYTcu3Wzwe1a7u38wsZ+8BZpaD1W9web3TtctvqhnX3iRsEwC0Xa0E5t7DVbvLHnSF2UfWJsFkKRD6QuuS031R4qV0wDnnIwEXJFhbzTtBEwyOBZpfl0VlxDC6eDh2AOc1ksr7ljySCPD5LNygqME1oRHlBDDoXDcXVn4IJfU1YLmnuDXnuq3OWQyZQ5rwDlvcqy8CEmqqrtOUsFjl0OvIrj8mtNT2ssotslZWhPTBKSe7deV0ISBLu2sm5W7pVwWmSz2ryI/3rLyCHiva2l09TnzUfE3W+vqm4WWNwTbzKCVpzrex9FJxPA2t6qHpg3w9FJU2Vvu2CglYZW925t8E9FIde75KGdVx08Rkfchm4Frnl1UVX8Z+yWNPhNXKwjV7wWC/QEAg/JBeY5dh2bvNRXGGLz4XhDaily5jM1hzsvpY62+CgqHjykLuyr6OppagGxaLPsOp2I9EfjOrir+GIZobhr52FpLdxYrWHeXYrx4txh+9REL3sewZa3XVt1s7i3FiwfrY8T2Een8KiWBgZmeLkX3KQlqj2oyx3aOS9nTCxM4pxkF49tDW+MLG3/hQHcUYyZLOrC0G4uI2an0UJFPEMzicveB15FLyyl0hDTdt77LU0Jp3FeNZwf0i+wP2W/kt3cWYznF8RkLf9LfyVce2zgAQQPFb5rZbW9F04osR4qxizv7wl05C1/Wy8eJ8ab3f0hKB4f0UBkeRcO0tsigODAS43A1as6htPRcTYy55ca+WwAvYgaeKWn4mxv6Vv6RmsNRd91GMIEMlncx69EAWcMpe1md1i47DVYsiu20DzPhlJI+5fJAxzjbmQCSsTXF7m9hYaoGFi2EUPeIvTxgWdzyi+62fG23us35heG3uunRWbmlJBpa6ZlYNb89ilpGeKyFJNeY9UsQeWvkmZYx4JV7LbaeWisQJ7fHVeXiz6znLyohYk5EdLeCTjTcSA9OpCF2yjYdE/EgLiscs+GSNgeWzts+PLr3gb+ipGK4tWVAMUNNLAwi8jAdHO65eQ8l0CIgqg49LUe1yUxORrHu0bpmaVqUJ0MDyzPI0MdNqwEHbwXRcfgmZwtTRQMfK6J0ZdkZm5b2VDw6WeaoZDNdwZljYbbEEbH1XScaB9jiYwuH0jfdNjoCsy/yas1HP5KWvL7mnnDevs7/AMkE0FY++ejqf+3f+SvUIlt+1dcc85W4ke3vGR1umcrt5anGOeOwmvMZy0VUW9TA/X5LSfD6yJhklo6mNttSYnD8F0R80jYg7tXAHa7z1VT4ojrsanZTU8srYI22OYmxO6vmq8IgTFVxxiR1FPkI0d2RN+ttEKBtRPNGyOCYh5sz6M949AjYpTnDqKGhjfM8A5nknS5toPmlmR4hDVxVtM6UwMc3I/KQGkcj0U8+R44kTQ4pHdgw+ruNw6B35JeSDFbPDcPnudrxO/JdZgqGV9OypFiJQDpsvSRtO9syxfnya8cckZh+NPaWtpKkE8uwJW2KYNiMeHPlfRVQYALuMJAXXKVpzJTjJ7Rw/Mx50e5rbHmrPmumcsI41S12IUjmMpaupgDeUczmi+3IqUkmxNtZEaytqCJHfQzyPcQD0uoWpcfaHuAsM1wArLTYtHXYVFhTqeWeobIDERyusMR0aglnfRRduGiQDW2xstnlCpZO6InQyMexg0eW6jroSiOWWisqC5HkCE4KoBJvdeWXgLyCBYLJqPmlmapqP3b+CAsCdiSUKcjQORFVXiPDfacXia2UgyG93cgrTEo+WmkqMWlcA3K2IRh3Q2TelxQ2AxupcahpKpr3QFx7KzfrctVeMQP0UeX7f/iUKNga2Md0OFuXNZxF2WGMgXAeL5RfSx1UntuhAANDGgg9bILtXWJuPAIjJO0F8r7/AOYELWZ2U3a0j4LVRjsxJkMl8oIFgL80RwjLS08vd002soqbGaSjpXSVEt5GnSNp1KqtfxZUSnudxuwA0CLqrZUYZTTttIA4dRyW1Xw/T1mAQ0UbGscw52EeI1VKbxbVtjLMzCbg3LbWCmcD40yyQQVzWmM2aS0atCzl23ItmEwvoaCKmebujba6OZcz9FtO5jSwhwLHtu09R1BW0UGZwy8xoVjS7O0LQe8VBcfsMuCGzxH2b84LtjYHRWBtmNyqm/2mmSTC6ana5zQ+XMdd+6dPmtRyvbnNOxntUYme2OMkAyuBIDetuauHBuEU0GJCZs7Jw1pLHNNvidfkqeymlqHxiHvvJythHvC2vouq4FgMOExtfDPM5zm99jn6XtyC0zJ2lHtB3180JyM4d26CVCl5EJ3JGkQ3AKoA5eWXheQQEaZj2sl4wmWDdAaIJuP8UrEmowgaiRmRWe6RmmYaoUaZjFlKsQGO1OIUUkMtwYc4Jf0Hip3Fmu9kHZvLe+D3Ta4sUDFKP2umMTnHK7cotS7NRxX1NwCb6bFJ7apIskD7943H/Ed+aUrGODtC7J1zFPNLw0k5S77kpWONh3dSNNVuzZihMQwGmqpTNIC1zfeyvNnfNJSmjpXd2HRnSMqc7TO7KcoHl9y3MbuzdZpItzG6y6TJBMrcF9ljL6SPtQ0A3j8EOPDsPxMubZkUjvdc02srBQUbhTwvkpWva+NpuGDotqikgY/tOwYzyasbb5dE8EocVoO0ZiFVeOEZYor5rq8YW5r6aN3gqz27JW5S4i4sp3BX5YBE+wI2Rzy9JKQjOPHZU3i/CZsaq2vpag5oGFohOxde51+A3Vtmc1gD3us1g1PTmqRwfi9XXvn/AFcPidMTI7MBbMSRod1WcUhgvDcEToKoP/WQ05so0J52PRWY7W5dF6CJkLcsQyjoCsuQt7BftZAKO5AKM0B4Q3BGehuVZAeF5ZcsKiBiTLPrJeIfcmGju3QFiCbjS0SaYEDUaZalo00z3brNVuGAixF/NR1bTOpaaXUGLtLtsdriylGJbGD+p6hpAkBs5WNIiCpBBvYm2tjzWZB2jr2uG6am1tEFwbDKbchm0Og1Wgme36vc6u6Logkpaw3EYIvogsmL25HbWtvY39UKsrYg2zTmJ+Cj58YgYbE31uNd1FXLDyBhtMQf9y0fIIToY6l5abeXNQUGPQRYdAM2ojaLfBGwLFYX1Li51h4lcb7b30PVYe5s+VrrZdWp6gzMlu82b0WtdiEDpCIO+7mlqR00jzlHx+5XSHOK5pf9m611ObPMeXMfgD8lFcAYLJT0xqapti5wdGLgkKdq6Js+ES0We3aRkF2+tkxglEcPwyGmc7OWDV9tSqydtbZauRChuQAeglGkQigA/mhu5Iki0crGdAuXll68qiAZcJpnufBLMTTPcQbwhORpSJNx/igZiGtvmmW6Cx0S7NrJhg2UqwZq0r4ZJ4MseTPmBAcbDx5FEYihSe2kK7Dah0ly2G3+r+iFJhtSb2ZBtb9ofyU+5axgncq8qSOc45hlQxziQxvk4/kqnUwSh+pHquq8S0wfG4AC651VREyEEWKclsRjZJA0NLjpunqCWQOGV1id0B8GpPVHw5n0rfNS+2cYuOEasAtmcNyVOtmbE8Qt+tqoukjbT07nE6kbolG5z5s79bqbddLJTx3YLm6eslKMXiaSm/q3V2wwShuW+iG7miBSILtEeRAeqAOWpW71q7kiAvCwsvXlU0gIymm+4UrGAm2+47yRBItgfkmo0rDvdNxoGY0yxLR8r6+IWJMSoYHZJqqJjvFymlSLLIgUUMbwtpaPb4Tm2OZSrC10YcCCDqHA6EeCXpqMrQPDXWWxSdVJkdcbKbVGY7UNbzVKxSJoeHg77qxY9mcCb6KqVBe8WN9FG/8ACcvgiYebVDb7XWBGXbXRIIXse2wCu2ZFwZNG+NsZ5KRpIwy3iVCYVA5v0kvzUoJw11uV/isbbWSid3LJkOAOUlRNFU6WBBNkPEMREDxqA5w0VYsTVkN2o0081U8b4mxSmps2H0Uclh33klxHiGhc6xDiPGKybNNXzg8wx5aPQaLcm2bdO2yaA5gR00sgOXJsJ42xehLWPmFVD9mfU/A7+qvGDcXYdir2Qkvp6h2gY4aE+B5qzFOUTTysOWryt3W08lKAvsvL0i8qm0BGm2+4lI0WqmNPRVEwbcxMLwOuiIZhOtiLeKaj3GunMFc2l4oxF57srY29GsB+8LdmN4lLGTLWSEOFraDT4K6Ta345jQhY+Cldd3N45Kly1Be5wLiS7qsSzOLLHX4pMO74PRXSLLw3gLsSnDpjlpYzeQ83dB8V09mUNDWAAAWAA2VB4NxqMBtDOWMJddjzoHHorwHOZ4hYydMZDDzZtwkao3YbIstQ21r6paQ5mOsVluRA4oczHBwNlX3xh98zd97K5SQieK7mhQlZREOsxl/io2hsjWbKQw2lE8jQG3PQL0dC57xZtgN1YMMpmxta2wBvyClApoRHHZxsUkAZHaD4pvE7l+VgKJS05jg745KaUsySSIgt3G6jJ3yzVIe4k20CerQ+xDb3KXFM4DMfh4oh2IgssdQqRxlHTQ1TBC1odILvy9OX4+itVZWw4fSmad9gNQ3m7yXOq+pfW1L55NHvN7dB0XXCOedhbYWRY5nRWfG4tcDcEFBWD0XRwXU/2g1BpGNFHF7RazpHP7pPXLur5h0z6nDqSeUN7SSBjyB1IBK4eF2zBf8ABcP/AHeM/wAIWK3iO5eWHLyKgodVrjGuD1n/ACX/AHLaJa4rrg9f4Qu+5Ec2bY7/AHphr0rs6wRAtsmXOuLFYjYx7CQ60gOg6haA3WYiRJ6IN2Ettc2e3kd1Z8K4urKFjY5/1mEcnHvDyPNSLsHo63Du0ljIkaNHsNiqTL3XSAfU2uml7np0ik4kwmt17fsXn6k3d+e3zUoxudgfE5r43fWadPVccJzQ9qfeW8dRNTOz080kT/tMeWn1CxcG5nY7JGy8RB/qvMpWSm5aFymk4pxqnkyNrXvb0kAf96nKHjTE+zu6OlcfFh/AqcK1yXp9JHC06HUdFmlAz7Ko1nGGIdn+xpf+l3/soKTjnF2i8baaM/5YyfvJU4rydCkg7SUyEG3QaolS+OOC8jmxt6uNh81yqo4lxmd9pK+W3Rlm/dZRs1RNO7NPNJI7q9xJTieR0Wt4iwik9+ftXDlEM3z2+arWJ8YTytdHQQNgb9t+rvRVh+2bmsA2AcBqQrxYudolRUTVMnaTSlxPNx0WfZZDA6Z4LWDYu0Lj0UvhNBTua2Z7MzhsDt6IXEEzjNGw2ygbWW9ac6hSsLZywFlXgF2vB9MEw/8Ado/5QuKhdqwf/BKD92j/AJQpVGevLDua8qP/2Q==" alt="profile" style={{ width: 50, height: 50, borderRadius: 9999, filter: 'grayscale(100%)', border: '1px solid #2a2a2a' }} />
        <div className="col" style={{ gap: 6 }}>
          <h1 className="mono" style={{ fontSize: 18, fontWeight: 600 }}>&lt;Piyush Khewalkar&gt;</h1>
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
      {projects.map((p, index) => (
        <div key={p.title}>
          <div className="col fade-in" style={{ gap: 8, marginTop: 8 }}>
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
              {p.live && <a className="badge underline-hover" href={p.live} target="_blank" rel="noreferrer">See it live</a>}
              {p.repo && <a className="badge underline-hover" href={p.repo} target="_blank" rel="noreferrer">github</a>}
            </div>
            {p.stats && (
              <div className="row muted mono" style={{ gap: 16, flexWrap: 'wrap' }}>
                {p.stats.map((s) => (<span key={s}>{s}</span>))}
              </div>
            )}
          </div>
          {index < projects.length - 1 && (
            <div style={{ 
              height: 1, 
              background: 'linear-gradient(to right, transparent, #2a2a2a, transparent)', 
              margin: '20px 0' 
            }} />
          )}
        </div>
      ))}
      <div className="divider" />
    </section>
  )
}

function Skills() {
  const languages = [
    { name: 'javascript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'typescript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'html', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'css', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' }
  ]
  const frameworks = [
    { name: 'react', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'tailwind css', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'express.js', logo: 'data:image/png;base64,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' }
  ]
  const databases = [
    { name: 'mongodb', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'redis', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' }
  ]
  const tools = [
    { name: 'docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'vercel', logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEUAAAD////7+/sGBgYEBAT5+fkKCgr29vYNDQ3z8/MQEBASEhKTk5MxMTHt7e04ODhVVVW5ubliYmLa2tp2dnawsLCNjY09PT2/v7/U1NR8fHyoqKjg4ODMzMyfn58aGhpubm4kJCRSUlJKSkosLCxeXl4/2c0NAAAEe0lEQVR4nO3bjXLaOhAF4F1ZPzYQAwGakECa3rbv/4p3l5SUXlxf25iR5DlfppNppunoIFvrtS0iAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABoYeVLv9nYA7kfS3OaW1vEHsfdWOs9+WLCCQuJtiNbTDihpy2/yCzGHsjdePp64MNcvk9VSV/Y8JcJJ6SnKrhQPcUexh09s6scP8cexn0UUihWbBSvyE9wtfGykO41nnFmf/rbxJRSBF+YK1lpAkvFKIoy9pBGJsforJYpdBLRcT3TH0xMSQs5QIPOYXC8mGLFeKgNn7nqIfZwRudprSfgL4bXNLXzkFZBzsGzwO4x9oBGtzEXCZ3hTewBjamQY3SrpZAvDlN+l59Ppexrx1vxf1U0nTZKSt/rVUDmV7JTWW08LeuGhPVyQkVxZxoS8o4mcNOt8Hrr8Oefy8x5tQnSY8jlat4xrbd+RgeurhNK6AOVPvv11M689BQuXE8hB2NedLHJO2KhjW+tPeH1HHIVappl32NIyVuc4jSch/JHegyf+XlI9K1pGf30jTJfaU49RZs1ZX+PX3qKloDO/ZP5HHraN56Dn+eiOWa8lhZ6y3DLwbUkZKfPMXJdbayMnELj5czFHLpAvsy0yZBaSAs5C1vPQxPcQh8pxh7sIHK55k0I/7PSyCRammWakKRSmPY51JunWjHybBQ9fW9bYy5Sfs+0USxo33TBfS3sYw91qC13Siir7Tb2UAeq2yvF74Rcxx5qf1rs36SL73aUGn6TXjirsq/vzdBp6J0OU/kgbGaPFDXhTutEp6NUv3aZNYrFnB64qjoFPHX7FS9pFnvUPW30BOsU8PTvzCavVljffeo2f7/ncZtX2Z8feic8zGMPupdF90P0Q2V4EXvQvXC3Yn85h4ZjD7orfbnyuVe6s+dMGkW5mlkNCsi8oiyqvpS148CER8rk/YXHgQGZH9OvidZ6qRStd9daBKkYeiamG9NaW5T02ncdvfCW+K1Fq4/sf9Tu+rWETkww9Q/9L9KNKDNY0I4v3w3qlVB+b5d4wtLTkp0beh6aKvCD3iCOHeTv5MM/DEx3lva7UlKv328MqO9KJbwvytJsc3PCzSzpNmrRs6W4pvsx0iS10NKy/VFap4QuLHUbX3pHqqyjntYD68QlZ9aynJYJJpSrmaU+Lbt1DqXuPyXZRumrQUcZ3a0Jg9T9I5UJPm8r9N2nEBpeDeo5h3pFlOQOvkJ33o1Fe4zYga7ozrvxJLmDb1mPsJB+MKFaxo7TYM0Dm6aGhKnt4LO6hXnFNy8yFxF1B590m8ksqKUt6DhiQPmwzFGfQaay3BTW690n1/NG/t+ddvC9k0/m0s3O7LyWtneshebjwqaez5J5kmF1510wDe9yD6bXRknt4LvceTcWU6ezg6/Uu0/jJ+RdOo+Fm/dT3EgWrp+xg33am5tbioaECe3g246e7iyVd6Xm9ypbNplyMX32XmIHAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBc/QsfPCXhdn0YiAAAAABJRU5ErkJggg==' },
    { name: 'render', logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAAAAADFHGIkAAAAfklEQVR4AWP4jwOgSfzY1D31JhaJU6oMQBDwEl3iiQADGKj+QJMIYICCOlSJlwwwYIoqsYkBDlAl0uHiAigSTzjhEpHIEj+s4eKcF5EknpgibNgE9keddcvq/ZvyOcFKre3t7dNv/odIIFSm/4DoRpcQA/KxSlgPaQlUQFgCABOfchUR/bqdAAAAAElFTkSuQmCC' },
    { name: 'postman', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' }
  ]
  const aiLLMs = [
    { name: 'openai', logo: 'data:image/png;base64,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' },
    { name: 'gemini', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg' },
    { name: 'anthropic', logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAdVBMVEUeHh75+fdRUVEmJiaPj43o6OZFRUQhISH19fPz8/Hs7Orj4+Hv7+2kpKMtLS0qKiqsrKrPz80zMzPHx8U4ODg+Pj56enk1NTXCwcBnZ2ZWVlXW1tReXl11dXTd3dtLS0qampmDg4JtbWy5ubeRkY+0tLKhoJ8nFnu3AAAFEklEQVR4nO2b61biShBGiRESLgIy4o27qO//iLNymONo1QY6TJIOa337JxTandRO9S2djhBCCCGEEEIIIYQQQgghhBBCCCGEEEIIEYWUsEFZQExkNnniGTyYqEcf07Uxccm20I8k2Zmwp66PeYzS4GPMhtiR+8nPsOzufExcVtiPJFmauFfIwNcoLWbS5yMdmWY/Aye/fMxdxn80Bqh6QZDuT1HajLDqBVb3B5CpPbqPWfWCe1MnUPfW1JLl0X4kSc/EvviQfB6l1cDxzLqu3DqRWUmyuKLcejvRD18mXvs+5iZKuy3ZsSJy4HpKSe9YETkwsmUCSslgFqXlhlOqF1jd5y3VfXJK9YKFyRvUvQW5dVr1givRHdw1TM0vUPcobf/OGdULRlblnY8ZjKO0/hvnVC+4Bt1TmLw6nO5THxNb9/OqF1jdl6D7Jkr7vwBvF/6j9usOqq9ffLa1X3dQ/S7d+w9brzukyGPn3X/ocuserkCUHhyAzBrOO5uB+7TtuQWZNeXFoXbnFowX+8WSHCzXBZWSKJ0ogCLy3wLow9p9ngeUktzetsY4mkKf/osQ3QeRllN6/qJ2D6s/ryPfyADdk9vmO1EAqu8PKqTwWA7RfR1lOQVUz1/+fAfzcjcqBN2/ft8ob76ILP7PH7jc/ZCR477pThSA6tuvL+Fyh+g+iqD7Gwj9dygOl7trB+o7/5SOoPsTtOL5rwYTGMz/Mptsc3haNK/7zhuSr759f+sb2X8zf+PGD8oa1z2DBB9+357qwRzYqkyLrR9N9qLDa1M/x+EwKxnYzZKVv61NV3eYc5isgFLixrdzuG2rTpOk5zKr09nA08DlFowAms0tyKyBqRPZFmJal1uwDv1sDwfM4K6925jIpQQ2AvOVqwA738iFnc5CKVk0eKYDRF77vRpQ2ZWJGz8+6NtbWx+k+ifEffiwvZ3yRtUd5k0j2uB4AZUDdO82pnvoltMkQGU6INXU3J1U56UcKJtOd5jfN6V7+IG+jc/BFulOE3I7afoDjgpbozuonu96DORWtzW6g+rJoMv4CUd7dKfjPaUI0b2JE5s0PC+F192PLhvQnVQvSYjuR54eFUJT2JKs7bMa5vcwdKuYf86sluRWBZkFuQWD0LpzC4pIeVwpecQtvFqhIlIeW0rGIF69pQT2oi7h3paSxg//V6B6gdfd51atuleieoHVvdOw7jDkvgyvu4+pU3cYFV2I0x2Gl/XpXpHqBXF1P/bezgXkVuWNj6lNd1J9fRsC5E2Q7jWdqiPVw/IY1hPdJJB0r+mWgOr9sEFqz//SXYIJXKZ9LWNgUj10lQCSMkT33G7WVQKpHnrv4bchuif7OvZGIbPy0PdTqZE2t6iULGrILcqs4IMKNOMIya2khtyizArfS4ZnUr40eQMjxxpyawaLhsPw/zKDZ9LUHIWg9zEGVZ9rzlbQEruRdur3cDiluzVBtBFX4n8EMYcjGbkdwp6C3lVc27eWYDmlat130I7nMiOIFK6EU3kOxxCqPdMxhqdOya19vBT2JUU4LlGt7kt4oAzLHTimqz2yKsMLsG6z7l8gVZPPcmPTDLZGk60Jos26KnWnMyN52fe74Gr7lVHarKtQ9x3dkLK5O6Y3SK3ucAS3Qt1J9XX5pQE4Z+ZUJt0/KtOdVH8vP3tLwbR+o7o/3XguSdyQv5NCTPRX+4QQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEKI+vkN4uJLJou751oAAAAASUVORK5CYII=' }
  ]
  
  const SkillPill = ({ skill }: { skill: { name: string; logo: string } }) => (
    <div className="badge row" style={{ padding: '4px 10px', gap: 6, alignItems: 'center' }}>
      <img 
        src={skill.logo} 
        alt={`${skill.name} logo`} 
        style={{ width: 16, height: 16 }} 
      />
      <span>{skill.name}</span>
    </div>
  )

  return (
    <section className="container col fade-in" style={{ gap: 12 }} id="skills">
      <h2 className="mono muted">//skills</h2>
      <div className="two-col">
        <div className="muted mono">languages</div>
        <div className="row" style={{ flexWrap: 'wrap', gap: 8 }}>
          {languages.map((s) => <SkillPill key={s.name} skill={s} />)}
        </div>
      </div>
      <div className="two-col">
        <div className="muted mono">frameworks</div>
        <div className="row" style={{ flexWrap: 'wrap', gap: 8 }}>
          {frameworks.map((s) => <SkillPill key={s.name} skill={s} />)}
        </div>
      </div>
      <div className="two-col">
        <div className="muted mono">databases</div>
        <div className="row" style={{ flexWrap: 'wrap', gap: 8 }}>
          {databases.map((s) => <SkillPill key={s.name} skill={s} />)}
        </div>
      </div>
      <div className="two-col">
        <div className="muted mono">tools</div>
        <div className="row" style={{ flexWrap: 'wrap', gap: 8 }}>
          {tools.map((s) => <SkillPill key={s.name} skill={s} />)}
        </div>
      </div>
      <div className="two-col">
        <div className="muted mono">ai/llms</div>
        <div className="row" style={{ flexWrap: 'wrap', gap: 8 }}>
          {aiLLMs.map((s) => <SkillPill key={s.name} skill={s} />)}
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
      i've been into STEM since childhood and right now i'm expanding my stack with Web3 technologies. so far, i’ve built a basic, half-baked Web3 wallet - github.com/piyushkhewalkar/web3-wallet
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
