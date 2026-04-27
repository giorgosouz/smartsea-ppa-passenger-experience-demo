import {
  Anchor,
  ArrowRight,
  DatabaseZap,
  MonitorPlay,
  Network,
  Radar,
} from "lucide-react";

type Route = "reference" | "demo";

function getRoute(): Route {
  const hash = window.location.hash.replace("#/", "");
  return hash === "demo" ? "demo" : "reference";
}

export function App() {
  const route = getRoute();

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
    <section className="hero-section">
      <div className="hero-copy">
        <p className="eyebrow">Passenger experience platform</p>
        <h1>Passenger experience intelligence for the port journey.</h1>
        <p className="lede">
          SmartSEA turns live operational data into clear passenger instructions
          across the end-to-end journey.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#/demo">
            View demo screens <ArrowRight size={18} />
          </a>
          <a className="button button-secondary" href="#/reference">
            Read reference
          </a>
        </div>
      </div>
      <ProductVisual />
    </section>
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
