import {
  AlertTriangle,
  Anchor,
  ArrowRight,
  BaggageClaim,
  Bus,
  Clock,
  DatabaseZap,
  GitBranch,
  MapPinned,
  MonitorPlay,
  Network,
  Plane,
  Radar,
  Route,
  Ship,
  ShieldCheck,
  TrainFront,
  UsersRound,
  Waypoints,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  apiPillars,
  apiProofGroups,
  apiStories,
  heroStats,
  spinetixTransportCases,
  supportingReferenceAssets,
  type ApiStory,
  type IconKey,
  type ReferenceAsset,
  type ReferenceCase,
} from "./content";

type AppRoute = "reference" | "demo";

const icons: Record<IconKey, typeof Anchor> = {
  alert: AlertTriangle,
  api: DatabaseZap,
  baggage: BaggageClaim,
  bus: Bus,
  clock: Clock,
  database: DatabaseZap,
  git: GitBranch,
  map: MapPinned,
  monitor: MonitorPlay,
  network: Network,
  plane: Plane,
  radar: Radar,
  route: Route,
  ship: Ship,
  shield: ShieldCheck,
  train: TrainFront,
  users: UsersRound,
  waypoints: Waypoints,
};

function getRoute(): AppRoute {
  const hash = window.location.hash.replace("#/", "");
  return hash === "demo" ? "demo" : "reference";
}

export function App() {
  const [route, setRoute] = useState<AppRoute>(() => getRoute());

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    window.scrollTo({ behavior: "auto", left: 0, top: 0 });
    const timeout = window.setTimeout(() => {
      window.scrollTo({ behavior: "auto", left: 0, top: 0 });
    }, 0);
    return () => window.clearTimeout(timeout);
  }, [route]);

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
            API Demo
          </a>
        </nav>
      </header>
      <main>{route === "demo" ? <DemoPage /> : <ReferencePage />}</main>
    </div>
  );
}

function ReferencePage() {
  return (
    <>
      <section className="hero-section api-hero">
        <div className="hero-copy">
          <p className="eyebrow">SmartSEA Intermodal APIs for PPA</p>
          <h1>The product is the API layer.</h1>
          <p className="lede">
            PPA can buy screens, cabling, and CMS anywhere. SmartSEA should sell
            the intermodal API layer that connects maritime, rail, airport, vessel,
            event, disruption, Connection risk, and Recovery action intelligence
            into passenger-ready guidance.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#/demo">
              Open API demo <ArrowRight size={18} />
            </a>
            <a className="button button-secondary" href="#api-proof">
              See API proof
            </a>
          </div>
        </div>
        <ApiSystemVisual />
      </section>

      <section className="section-band tight-band">
        <div className="section-grid two-column">
          <div>
            <p className="eyebrow">Main message</p>
            <h2>This is not a signage modernization story.</h2>
          </div>
          <div className="statement-stack">
            <p>
              The real sales object is SmartSEA Intermodal APIs: a journey data
              product that turns disconnected movements into a single operational
              picture.
            </p>
            <p>
              CMS and screens are channels. The differentiated value is knowing
              what changed, which passengers are affected, what connection is at
              risk, and what instruction should be issued next.
            </p>
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="section-heading">
          <p className="eyebrow">What PPA buys from SmartSEA</p>
          <h2>APIs that make the whole journey legible.</h2>
          <p>
            The platform connects the journey from cruise arrival and terminal
            flow through rail, road, airport, baggage, city transfer, and recovery.
          </p>
        </div>
        <div className="pillar-grid">
          {apiPillars.map((pillar) => {
            const Icon = icons[pillar.icon];
            return (
              <article className="journey-card api-pillar-card" key={pillar.title}>
                <Icon size={22} />
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-band dark-band" id="api-proof">
        <div className="section-heading">
          <p className="eyebrow">API proof</p>
          <h2>Swagger foundations plus GIDP demo extensions.</h2>
          <p>
            The standalone sales page should show the API evidence without
            depending on localhost. These are curated snapshots from the local
            GIDP demo and its Swagger contract.
          </p>
        </div>
        <div className="api-proof-grid">
          {apiProofGroups.map((group) => {
            const Icon = icons[group.icon];
            return (
              <article className="api-proof-card" key={group.title}>
                <div className="api-proof-topline">
                  <Icon size={20} />
                  <span>{group.source}</span>
                </div>
                <h3>{group.title}</h3>
                <p>{group.body}</p>
                <strong>{group.metric}</strong>
                <ul>
                  {group.endpoints.map((endpoint) => (
                    <li key={endpoint}>{endpoint}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <ReferenceSection />

      <section className="closing-band">
        <img
          src="/assets/brand/smartsea-logo-horizontal-powered-by-sita-white.svg"
          alt="SmartSEA powered by SITA"
        />
        <p>The tender can upgrade screens and CMS.</p>
        <h2>SmartSEA upgrades the journey data product behind them.</h2>
        <a className="button button-on-dark" href="#/demo">
          Open API demo <ArrowRight size={18} />
        </a>
      </section>
    </>
  );
}

function DemoPage() {
  const [selectedStoryId, setSelectedStoryId] = useState(apiStories[0].id);
  const selectedStory =
    apiStories.find((story) => story.id === selectedStoryId) ?? apiStories[0];
  const StoryIcon = icons[selectedStory.icon];

  return (
    <>
      <section className="demo-hero">
        <div className="demo-hero-copy">
          <p className="eyebrow">API-driven demo</p>
          <h1>Signals in. Passenger instruction out.</h1>
          <p className="lede">
            Switch between standalone API snapshot stories. Each scenario shows
            which intermodal signals are used and what passenger guidance is
            generated without exposing a raw API response.
          </p>
        </div>
        <div className={`scenario-summary severity-${selectedStory.severity}`}>
          <div className="summary-topline">
            <StoryIcon size={26} />
            <span>{selectedStory.status}</span>
          </div>
          <h2>{selectedStory.headline}</h2>
          <p>{selectedStory.operatorNote}</p>
        </div>
      </section>

      <section className="demo-workbench api-workbench">
        <div className="scenario-rail" aria-label="API scenarios">
          {apiStories.map((story) => {
            const Icon = icons[story.icon];
            return (
              <button
                className={story.id === selectedStory.id ? "active" : ""}
                key={story.id}
                onClick={() => setSelectedStoryId(story.id)}
                type="button"
              >
                <Icon size={18} />
                <span>{story.label}</span>
              </button>
            );
          })}
        </div>

        <div className="api-demo-grid">
          <ApiInstructionPanel story={selectedStory} />
          <ApiSignalsPanel story={selectedStory} />
          <JourneyTimeline story={selectedStory} />
        </div>
      </section>
    </>
  );
}

function ApiInstructionPanel({ story }: { story: ApiStory }) {
  return (
    <article className={`instruction-panel severity-${story.severity}`}>
      <div className="summary-topline">
        <MonitorPlay size={22} />
        <span>Passenger instruction generated</span>
      </div>
      <h2>{story.instruction.title}</h2>
      <p>{story.instruction.body}</p>
      <div className="next-action api-next-action">
        <span>Recovery action</span>
        <strong>{story.instruction.action}</strong>
      </div>
      <div className="snapshot-grid" aria-label="Curated API snapshot metrics">
        <Metric label="Itinerary" value={story.snapshot.itinerary} />
        <Metric label="Risk" value={story.snapshot.risk} />
        <Metric label="Recovery" value={story.snapshot.recovery} />
        <Metric label="Confidence" value={story.snapshot.confidence} />
      </div>
    </article>
  );
}

function ApiSignalsPanel({ story }: { story: ApiStory }) {
  return (
    <section className="signals-panel" aria-label="API signals used">
      <div className="panel-heading">
        <p className="eyebrow">API signals used</p>
        <h2>Each message is traceable to transport data.</h2>
      </div>
      <div className="signal-grid">
        {story.signals.map((signal) => (
          <article className="signal-card" key={`${story.id}-${signal.label}`}>
            <span>{signal.endpoint}</span>
            <h3>{signal.label}</h3>
            <strong>{signal.value}</strong>
            <p>{signal.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function JourneyTimeline({ story }: { story: ApiStory }) {
  return (
    <section className="journey-timeline" aria-label="Intermodal journey timeline">
      <div className="panel-heading">
        <p className="eyebrow">Intermodal chain</p>
        <h2>One passenger journey, multiple operating systems.</h2>
      </div>
      <div className="timeline-list">
        {story.steps.map((step) => (
          <article className="timeline-step" key={`${story.id}-${step.mode}-${step.time}`}>
            <div>
              <span>{step.time}</span>
              <strong>{step.mode}</strong>
            </div>
            <section>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </section>
            <em>{step.state}</em>
          </article>
        ))}
      </div>
    </section>
  );
}

function ReferenceSection() {
  return (
    <section className="section-band references-band">
      <div className="section-heading">
        <p className="eyebrow">References</p>
        <h2>Transport cases prove the channel. API logic proves the value.</h2>
        <p>
          The reference story should separate screen-network credibility from the
          SmartSEA/PPA API use case. SpinetiX proves the channel can work in
          transport; SmartSEA Intermodal APIs explain what should feed it.
        </p>
      </div>
      <div className="reference-columns">
        <div>
          <h3>SpinetiX transportation references</h3>
          <div className="reference-case-grid compact">
            {spinetixTransportCases.map((item) => (
              <ReferenceCaseCard item={item} key={item.title} />
            ))}
          </div>
        </div>
        <div>
          <h3>SmartSEA/PPA API use references</h3>
          <div className="reference-asset-grid">
            {supportingReferenceAssets.map((asset) => (
              <ReferenceAssetCard asset={asset} key={asset.title} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ReferenceCaseCard({ item }: { item: ReferenceCase }) {
  const Icon = icons[item.icon];
  return (
    <article className="reference-case">
      <Icon size={20} />
      <span>{item.location}</span>
      <h3>{item.title}</h3>
      <p>{item.body}</p>
      <strong>{item.proof}</strong>
    </article>
  );
}

function ReferenceAssetCard({ asset }: { asset: ReferenceAsset }) {
  return (
    <article className="reference-asset-card">
      <img src={asset.src} alt={asset.title} />
      <div>
        <span>{asset.source}</span>
        <h3>{asset.title}</h3>
        <p>{asset.body}</p>
      </div>
    </article>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ApiSystemVisual() {
  return (
    <aside className="api-system-visual" aria-label="SmartSEA intermodal API system preview">
      <div className="api-visual-header">
        <img
          src="/assets/brand/smartsea-logo-horizontal-powered-by-sita-white.svg"
          alt="SmartSEA powered by SITA"
        />
        <span>Standalone GIDP snapshot</span>
      </div>
      <div className="api-node-grid">
        <ApiNode icon="ship" title="Maritime" body="PPA schedules + AIS/ETA" />
        <ApiNode icon="train" title="Rail" body="GTFS + realtime updates" />
        <ApiNode icon="plane" title="Airport" body="ATH schedules + status" />
        <ApiNode icon="radar" title="Risk" body="MCT margin and confidence" />
      </div>
      <div className="api-decision-strip">
        <span>Intermodal itinerary</span>
        <strong>INT-20260427-002</strong>
        <span>-62 min MCT margin</span>
      </div>
      <div className="api-stat-row">
        {heroStats.map((stat) => (
          <Metric key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>
    </aside>
  );
}

function ApiNode({ icon, title, body }: { icon: IconKey; title: string; body: string }) {
  const Icon = icons[icon];
  return (
    <article className="api-node">
      <Icon size={19} />
      <strong>{title}</strong>
      <span>{body}</span>
    </article>
  );
}
