import { Anchor, MonitorPlay } from "lucide-react";

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
          <span className="brand-mark">S</span>
          <span>SmartSEA</span>
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
    <section className="placeholder-page">
      <p className="eyebrow">SmartSEA for PPA</p>
      <h1>Passenger experience intelligence for the port journey.</h1>
      <p>
        The reference narrative will position SmartSEA as the data and logic layer
        behind live passenger guidance.
      </p>
    </section>
  );
}

function DemoPlaceholder() {
  return (
    <section className="placeholder-page">
      <p className="eyebrow">Demo screens</p>
      <h1>Live journey guidance across passenger touchpoints.</h1>
      <p>
        The interactive demo will simulate real-time scenarios and CMS-ready
        passenger messages.
      </p>
    </section>
  );
}
