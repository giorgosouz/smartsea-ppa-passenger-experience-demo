import {
  Anchor,
  ArrowRight,
  BaggageClaim,
  Bus,
  DatabaseZap,
  Gauge,
  GitBranch,
  Hotel,
  Info,
  MonitorPlay,
  Network,
  RadioTower,
  Radar,
  Route,
  Ship,
  ShieldCheck,
  Signpost,
  Waypoints,
} from "lucide-react";
import { useEffect, useState } from "react";

type AppRoute = "reference" | "demo";

function getRoute(): AppRoute {
  const hash = window.location.hash.replace("#/", "");
  return hash === "demo" ? "demo" : "reference";
}

export function App() {
  const [route, setRoute] = useState<AppRoute>(() => getRoute());

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#/reference" aria-label="SmartSEA reference page">
          <img
            src="/assets/brand/smartsea-logo-horizontal-powered-by-sita.svg"
            alt="SmartSEA powered by SITA"
          />
        </a>
        <nav className="site-nav" aria-label="Main navigation">
          <a className={route === "reference" ? "active" : ""} href="#/reference">
            <Anchor size={16} />
            Reference
          </a>
          <a className={route === "demo" ? "active" : ""} href="#/demo">
            <MonitorPlay size={16} />
            Demo Screens
          </a>
        </nav>
      </header>
      <main>{route === "demo" ? <DemoPlaceholder /> : <ReferencePlaceholder />}</main>
    </div>
  );
}

function ReferencePlaceholder() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">SmartSEA for PPA</p>
          <h1>The value is what feeds the CMS.</h1>
          <p className="lede">
            PPA can procure screens, cabling, and CMS capability. SmartSEA should
            be positioned as the passenger experience intelligence layer that
            turns real-time data into clear guidance.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#/demo">
              View demo screens <ArrowRight size={18} />
            </a>
            <a className="button button-secondary" href="#reference-architecture">
              See the platform layer
            </a>
          </div>
        </div>
        <ProductVisual />
      </section>

      <section className="section-band tight-band">
        <div className="section-grid two-column">
          <div>
            <p className="eyebrow">Main message</p>
            <h2>This is not a signage project.</h2>
          </div>
          <div className="statement-stack">
            <p>
              Modern screens matter, but they do not solve the passenger problem
              by themselves. Passengers usually do not lack signs. They lack
              clarity on what to do next when the journey changes.
            </p>
            <p>
              The opportunity is the data and logic layer behind the experience:
              intermodal APIs, live operational state, disruptions, passenger
              flow, baggage, and onward mobility.
            </p>
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="section-heading">
          <p className="eyebrow">End-to-end journey</p>
          <h2>Clarity must travel with the passenger.</h2>
          <p>
            The experience starts before arrival and continues after boarding or
            disembarkation. Static wayfinding cannot respond to the moments that
            create stress.
          </p>
        </div>
        <div className="journey-grid">
          {journeyMoments.map((moment) => (
            <article className="journey-card" key={moment.title}>
              <moment.icon size={22} />
              <h3>{moment.title}</h3>
              <p>{moment.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-band dark-band" id="reference-architecture">
        <div className="section-heading">
          <p className="eyebrow">Platform layer</p>
          <h2>SmartSEA turns operational data into passenger instructions.</h2>
          <p>
            The CMS remains the publishing channel. SmartSEA becomes the decision
            layer that decides what message should appear, where it should appear,
            when it expires, and what passenger action it should trigger.
          </p>
        </div>
        <div className="architecture-flow">
          {architecture.map((item, index) => (
            <article className="architecture-card" key={item.title}>
              <span className="architecture-index">{String(index + 1).padStart(2, "0")}</span>
              <item.icon size={24} />
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-band">
        <div className="section-grid two-column">
          <div>
            <p className="eyebrow">What SmartSEA sells</p>
            <h2>The CMS becomes the channel. The value is live journey logic.</h2>
          </div>
          <div className="capability-list">
            {capabilities.map((capability) => (
              <article key={capability.title}>
                <capability.icon size={20} />
                <div>
                  <h3>{capability.title}</h3>
                  <p>{capability.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="closing-band">
        <img
          src="/assets/brand/smartsea-logo-horizontal-powered-by-sita-white.svg"
          alt="SmartSEA powered by SITA"
        />
        <p>The tender upgrades screens and CMS.</p>
        <h2>SmartSEA upgrades the experience.</h2>
        <a className="button button-on-dark" href="#/demo">
          Open demo screens <ArrowRight size={18} />
        </a>
      </section>
    </>
  );
}

function DemoPlaceholder() {
  return (
    <section className="hero-section">
      <div className="hero-copy">
        <p className="eyebrow">Demo screens</p>
        <h1>Live journey guidance across passenger touchpoints.</h1>
        <p className="lede">
          Scenario controls will show how SmartSEA adapts instructions for
          disruptions, flow, boarding, baggage, and onward mobility.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#/reference">
            Strategic reference <ArrowRight size={18} />
          </a>
        </div>
      </div>
      <ProductVisual />
    </section>
  );
}

const journeyMoments = [
  {
    title: "Home or hotel",
    body: "Set the right departure time before passengers commit to the trip.",
    icon: Hotel,
  },
  {
    title: "Port approach",
    body: "Adapt routing when road, taxi, shuttle, or gate conditions change.",
    icon: Bus,
  },
  {
    title: "Terminal entry",
    body: "Direct each passenger group to the next best action, not just a zone.",
    icon: Signpost,
  },
  {
    title: "Boarding",
    body: "React to gate changes, berth status, security flow, and vessel timing.",
    icon: Ship,
  },
  {
    title: "Baggage",
    body: "Explain drop, reclaim, exceptions, and handoff status in real time.",
    icon: BaggageClaim,
  },
  {
    title: "City or airport",
    body: "Connect onward mobility so the port experience extends beyond the exit.",
    icon: Route,
  },
];

const architecture = [
  {
    title: "Ingest",
    body: "Connect terminal, vessel, intermodal, disruption, baggage, and passenger-flow signals.",
    icon: RadioTower,
  },
  {
    title: "Decide",
    body: "Apply journey logic to determine the most useful next instruction for each context.",
    icon: GitBranch,
  },
  {
    title: "Publish",
    body: "Feed CMS, screens, mobile, and staff channels with consistent guidance payloads.",
    icon: MonitorPlay,
  },
];

const capabilities = [
  {
    title: "Real-time journey information",
    body: "Live instructions for delays, boarding changes, transfer risk, and terminal conditions.",
    icon: Gauge,
  },
  {
    title: "Intermodal coordination",
    body: "Arrival, departure, city, airport, shuttle, taxi, metro, and coach context in one layer.",
    icon: Waypoints,
  },
  {
    title: "Disruption handling",
    body: "Context-aware messaging that tells passengers how to adapt when the plan changes.",
    icon: Info,
  },
  {
    title: "Operational confidence",
    body: "A controlled logic layer that reduces passenger stress and improves flow resilience.",
    icon: ShieldCheck,
  },
];

function ProductVisual() {
  return (
    <aside className="product-visual" aria-label="SmartSEA journey intelligence preview">
      <div className="visual-map">
        <img
          src="/assets/visuals/smartsea-passenger-flow-map.png"
          alt="Abstract SmartSEA passenger flow and terminal operations map"
        />
      </div>
      <div className="floating-card card-live">
        <span className="status-dot" />
        <div>
          <strong>Live journey context</strong>
          <span>APIs, terminal state, onward mobility</span>
        </div>
      </div>
      <div className="floating-card card-payload">
        <DatabaseZap size={18} />
        <div>
          <strong>CMS-ready payload</strong>
          <span>Message, location, priority, expiry</span>
        </div>
      </div>
      <div className="signal-stack">
        <span>
          <Network size={15} /> Intermodal data
        </span>
        <span>
          <Radar size={15} /> Passenger flow
        </span>
        <span>
          <MonitorPlay size={15} /> Any CMS channel
        </span>
      </div>
    </aside>
  );
}
