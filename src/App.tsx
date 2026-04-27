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
  type PassengerScreenMessage,
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
            Screen Demo
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
          <h1>Turn every PPA screen into the next right move.</h1>
          <p className="lede">
            PPA can buy screens, cabling, and CMS anywhere. The product is the
            API layer that turns maritime, rail, airport, vessel, event, and
            disruption data into passenger instructions people can follow.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#/demo">
              See practical demo <ArrowRight size={18} />
            </a>
            <a className="button button-secondary" href="#api-proof">
              What makes it possible
            </a>
          </div>
        </div>
        <JourneyOutcomeVisual />
      </section>

      <section className="section-band tight-band">
        <div className="section-grid two-column">
          <div>
            <p className="eyebrow">Main message</p>
            <h2>Passengers do not need more information. They need a clear next action.</h2>
          </div>
          <div className="statement-stack">
            <p>
              The real sales object is SmartSEA Intermodal APIs: a journey data
              product that turns disconnected operations into guidance passengers
              can understand immediately.
            </p>
            <p>
              CMS and screens are channels. The impact is the instruction:
              where to go now, what changed, which connection is at risk, and
              what Recovery action is already being prepared.
            </p>
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="section-heading">
          <p className="eyebrow">What PPA buys from SmartSEA</p>
          <h2>A passenger experience layer that shows up on real screens.</h2>
          <p>
            The value is not another screen estate. It is the intelligence that
            decides what each screen, staff tool, and mobile handoff should say
            when a journey changes.
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
          <p className="eyebrow">What makes it possible</p>
          <h2>The API layer connects the facts behind the instruction.</h2>
          <p>
            Keep the technical proof available, but frame every capability by
            what it lets PPA do for passengers and operators.
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
        <h2>SmartSEA upgrades what passengers are told when the plan changes.</h2>
        <a className="button button-on-dark" href="#/demo">
          See practical demo <ArrowRight size={18} />
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
          <p className="eyebrow">Practical passenger screen demo</p>
          <h1>Show the next right move, everywhere it matters.</h1>
          <p className="lede">
            Pick a disruption and watch SmartSEA turn it into practical guidance
            for the screens passengers and staff actually use.
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

      <section className="demo-workbench practical-workbench">
        <div className="scenario-rail" aria-label="Journey scenarios">
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

        <div className="practical-demo-grid">
          <OutcomeStrip story={selectedStory} />
          <PassengerScreenWall story={selectedStory} />
          <ApiInstructionPanel story={selectedStory} />
          <ApiSignalsPanel story={selectedStory} />
          <JourneyTimeline story={selectedStory} />
        </div>
      </section>
    </>
  );
}

function OutcomeStrip({ story }: { story: ApiStory }) {
  return (
    <section className="outcome-strip" aria-label="Scenario outcomes">
      {story.outcomes.map((outcome) => (
        <article key={outcome.label}>
          <span>{outcome.label}</span>
          <strong>{outcome.value}</strong>
          <p>{outcome.body}</p>
        </article>
      ))}
    </section>
  );
}

function PassengerScreenWall({ story }: { story: ApiStory }) {
  return (
    <section className="screen-wall" aria-label="Passenger-facing screen examples">
      <div className="panel-heading screen-wall-heading">
        <p className="eyebrow">What appears on screens</p>
        <h2>One disruption, four practical passenger touchpoints.</h2>
      </div>
      <div className="practical-screens-grid">
        {story.screens.map((screen) => (
          <PracticalPassengerScreen key={`${story.id}-${screen.zone}`} screen={screen} story={story} />
        ))}
      </div>
    </section>
  );
}

function PracticalPassengerScreen({
  screen,
  story,
}: {
  screen: PassengerScreenMessage;
  story: ApiStory;
}) {
  const Icon = icons[screen.icon];
  return (
    <article className={`passenger-screen practical-screen severity-${story.severity}`}>
      <div className="screen-topbar">
        <img
          src="/assets/brand/smartsea-logo-horizontal-powered-by-sita-white.svg"
          alt="SmartSEA powered by SITA"
        />
        <span>{screen.zone}</span>
      </div>
      <div className="screen-body">
        <div className="screen-kicker">
          <Icon size={17} />
          {screen.context}
        </div>
        <h3>{screen.title}</h3>
        <p>{screen.instruction}</p>
        <div className="next-action">
          <span>Next action</span>
          <strong>{screen.action}</strong>
        </div>
      </div>
      <div className="screen-footer">
        <span>{screen.status}</span>
        <span>{screen.time}</span>
      </div>
    </article>
  );
}

function ApiInstructionPanel({ story }: { story: ApiStory }) {
  return (
    <article className={`instruction-panel severity-${story.severity}`}>
      <div className="summary-topline">
        <ShieldCheck size={22} />
        <span>Decision generated</span>
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
        <p className="eyebrow">Signals behind the screen</p>
        <h2>The instruction is practical because the data is connected.</h2>
      </div>
      <div className="signal-grid">
        {story.signals.map((signal) => (
          <article className="signal-card" key={`${story.id}-${signal.label}`}>
            <span>{signal.label}</span>
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
        <p className="eyebrow">Operational chain</p>
        <h2>What changed behind the passenger message.</h2>
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
          SmartSEA/PPA API use case. SpinetiX transport references support the
          channel argument; SmartSEA Intermodal APIs explain what should feed it.
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

function JourneyOutcomeVisual() {
  return (
    <aside className="outcome-visual" aria-label="SmartSEA practical passenger guidance preview">
      <article className="hero-screen-preview">
        <div className="screen-topbar">
          <img
            src="/assets/brand/smartsea-logo-horizontal-powered-by-sita-white.svg"
            alt="SmartSEA powered by SITA"
          />
          <span>Port exit screen</span>
        </div>
        <div className="screen-body">
          <div className="screen-kicker">
            <Plane size={17} />
            Connection risk
          </div>
          <h3>Airport passengers: stop at Mobility Desk</h3>
          <p>
            Rail timing no longer protects the airport connection. Staff will
            move your group through assisted recovery.
          </p>
          <div className="next-action">
            <span>Next action</span>
            <strong>Go to Mobility Desk</strong>
          </div>
        </div>
        <div className="screen-footer">
          <span>Recovery active</span>
          <span>Updated 10:05</span>
        </div>
      </article>
      <div className="outcome-visual-copy">
        <p>SmartSEA Intermodal APIs decide the instruction before the CMS publishes it.</p>
        <strong>One live decision can feed screens, staff tools, mobile, and audio.</strong>
      </div>
      <div className="api-stat-row outcome-stat-row">
        {heroStats.map((stat) => (
          <Metric key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>
    </aside>
  );
}
