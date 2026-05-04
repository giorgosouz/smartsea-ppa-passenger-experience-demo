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
  apiStories,
  engagementFocus,
  missingLayer,
  practicalPath,
  problemStatements,
  signageFit,
  smartseaRole,
  spinetixTransportCases,
  supportingReferenceAssets,
  uspHierarchy,
  visionIntro,
  visionPillars,
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
        <a className="brand" href="#/reference" aria-label="SmartSEA vision page">
          <img
            src="assets/brand/smartsea-logo-horizontal-powered-by-sita.svg"
            alt="SmartSEA powered by SITA"
          />
        </a>
        <nav className="site-nav" aria-label="Main navigation">
          <a className={route === "reference" ? "active" : ""} href="#/reference">
            <Anchor size={16} />
            Vision
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
      <section className="proposal-cover">
        <div className="cover-photo">
          <img src="assets/references/cruise-ship-reference.jpg" alt="Cruise ship at port" />
        </div>
        <div className="cover-panel">
          <span>SmartSEA</span>
          <h1>Passenger decision intelligence</h1>
          <p>For Piraeus Port Authority cruise operations</p>
          <strong>Screens publish the message. SmartSEA decides the right message.</strong>
        </div>
      </section>

      <section className="proposal-section shared-ambition">
        <div className="proposal-copy">
          <p className="section-marker">{visionIntro.kicker}</p>
          <h2>{visionIntro.title}</h2>
          <p className="proposal-lede">{visionIntro.subtitle}</p>
          <div className="paragraph-stack">
            {visionIntro.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <PassengerDisplayMockup
          label="PPA Cruise Terminal"
          screen={{
            action: "Go to Mobility Desk",
            context: "Passenger guidance",
            icon: "ship",
            instruction: "Airport-bound passengers are guided to the right recovery point before they leave the terminal.",
            status: "Live guidance",
            time: "Mar 2026",
            title: "Airport connection at risk",
            zone: "Terminal A",
          }}
          storyStatus="Live"
        />
      </section>

      <section className="dark-statement">
        <div className="vertical-title">
          <span>The strategic imperative:</span>
          <strong>Control the message</strong>
        </div>
        <div className="statement-content">
          {problemStatements.map((item) => (
            <article key={item.title}>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </article>
          ))}
          <strong className="statement-punch">
            Today, passengers do not lack signage. They lack clarity on what to do next.
            Any vendor can display signs; SmartSEA decides the next passenger instruction.
          </strong>
        </div>
      </section>

      <section className="proposal-section layer-section">
        <div className="proposal-copy">
          <p className="section-marker">The missing layer</p>
          <h2>Signals that let SmartSEA decide</h2>
          <p className="proposal-lede">
            Traditional signage answers location questions. A connected passenger information
            layer decides what each passenger group should do next.
          </p>
        </div>
        <div className="layer-grid">
          {missingLayer.map((item) => {
            const Icon = icons[item.icon];
            return (
              <article className="layer-card" key={item.title}>
                <Icon size={24} />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            );
          })}
        </div>
        <InformationFlow />
      </section>

      <section className="proposal-card-row" aria-label="Control React Extend">
        {visionPillars.map((pillar, index) => {
          const Icon = icons[pillar.icon];
          return (
            <article className={`proposal-card tone-${index}`} key={pillar.title}>
              <Icon size={28} />
              <h3>{pillar.title}</h3>
              <p>{pillar.body}</p>
              <strong>{pillar.proof}</strong>
            </article>
          );
        })}
      </section>

      <section className="proposal-section fit-section">
        <div className="proposal-copy">
          <p className="section-marker">How this fits with the signage program</p>
          <h2>Screens publish. SmartSEA decides.</h2>
          <p className="proposal-lede">
            The current signage program can procure and deploy the physical estate. SmartSEA
            sits above it as the real-time data, journey logic and decision layer.
          </p>
        </div>
        <div className="role-columns">
          {signageFit.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <SmartSeaRoleSection />

      <section className="proposal-section roadmap-section">
        <div className="proposal-copy">
          <p className="section-marker">Practical path forward</p>
          <h2>A focused phased approach.</h2>
          <p className="proposal-lede">
            Start with the priority situations that create passenger uncertainty, connect only
            the data that matters, then expand progressively.
          </p>
        </div>
        <div className="roadmap">
          {practicalPath.map((step, index) => (
            <article key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <EngagementSection />

      <ReferenceSection />

      <section className="closing-band">
        <img
          src="assets/brand/smartsea-logo-horizontal-powered-by-sita-white.svg"
          alt="SmartSEA powered by SITA"
        />
        <p>The signage refresh creates the right channels.</p>
        <h2>
          Now activate the decision layer that makes those channels responsive, connected and
          useful from day one.
        </h2>
        <a className="button button-on-dark" href="#/demo">
          See practical demo <ArrowRight size={18} />
        </a>
      </section>
    </>
  );
}

function DemoPage() {
  const [selectedStoryId, setSelectedStoryId] = useState(apiStories[0].id);
  const [selectedScreenIndex, setSelectedScreenIndex] = useState(0);
  const selectedStory =
    apiStories.find((story) => story.id === selectedStoryId) ?? apiStories[0];
  const selectedScreen = selectedStory.screens[selectedScreenIndex] ?? selectedStory.screens[0];
  const StoryIcon = icons[selectedStory.icon];

  useEffect(() => {
    setSelectedScreenIndex(0);
  }, [selectedStoryId]);

  return (
    <>
      <section className="demo-hero">
        <div className="demo-hero-copy">
          <p className="section-marker">SmartSEA USP</p>
          <h1>Not digital signage. Passenger decision intelligence.</h1>
          <p className="lede">
            Any vendor can display signs. Pick a changing operation and watch SmartSEA decide
            the next correct passenger instruction, then publish it through the screens
            passengers and staff actually use.
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

      <UspHierarchySection />

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
          <ScreenStage
            selectedIndex={selectedScreenIndex}
            selectedScreen={selectedScreen}
            setSelectedIndex={setSelectedScreenIndex}
            story={selectedStory}
          />
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

function UspHierarchySection() {
  return (
    <section className="usp-strip" aria-label="SmartSEA USP hierarchy">
      {uspHierarchy.map((item) => {
        const Icon = icons[item.icon];
        return (
          <article key={item.title}>
            <Icon size={22} />
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </article>
        );
      })}
    </section>
  );
}

function ScreenStage({
  selectedIndex,
  selectedScreen,
  setSelectedIndex,
  story,
}: {
  selectedIndex: number;
  selectedScreen: PassengerScreenMessage;
  setSelectedIndex: (index: number) => void;
  story: ApiStory;
}) {
  return (
    <section className="screen-stage" aria-label="Active passenger screen preview">
      <div className="stage-display">
        <div className="stage-display-topline">
          <span>Live passenger display</span>
          <strong>{selectedScreen.zone}</strong>
        </div>
        <PassengerDisplayMockup
          label={selectedScreen.zone}
          screen={selectedScreen}
          storyStatus={story.status}
        />
      </div>
      <aside className="stage-sidebar" aria-label="Publishing controls">
        <div className="stage-status">
          <span>Decision being published</span>
          <h2>{selectedScreen.title}</h2>
          <p>{selectedScreen.instruction}</p>
          <div className="stage-action">
            <span>Next action on screen</span>
            <strong>{selectedScreen.action}</strong>
          </div>
        </div>
        <div className="stage-publish-card">
          <span>Why this is SmartSEA</span>
          <strong>{story.headline}</strong>
          <p>{story.operatorNote}</p>
        </div>
        <div className="stage-screen-list" aria-label="Screen channel selector">
          {story.screens.map((screen, index) => {
            const Icon = icons[screen.icon];
            return (
              <button
                aria-pressed={selectedIndex === index}
                className={selectedIndex === index ? "active" : ""}
                key={`${story.id}-${screen.zone}-button`}
                onClick={() => setSelectedIndex(index)}
                type="button"
              >
                <Icon size={17} />
                <span>{screen.zone}</span>
                <strong>{screen.status}</strong>
              </button>
            );
          })}
        </div>
      </aside>
    </section>
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
        <p className="section-marker">Screen network</p>
        <h2>Same SmartSEA decision, adapted to every passenger touchpoint.</h2>
      </div>
      <div className="practical-screens-grid">
        {story.screens.map((screen) => (
          <PassengerDisplayMockup
            compact
            key={`${story.id}-${screen.zone}`}
            label={screen.zone}
            screen={screen}
            storyStatus={story.status}
          />
        ))}
      </div>
    </section>
  );
}

function PassengerDisplayMockup({
  compact = false,
  label,
  screen,
  storyStatus,
}: {
  compact?: boolean;
  label: string;
  screen: PassengerScreenMessage;
  storyStatus: string;
}) {
  const Icon = icons[screen.icon];
  const format = screen.format ?? "terminal";

  return (
    <article className={`passenger-display format-${format} ${compact ? "compact" : ""}`}>
      <div className="display-bezel">
        <div className="display-face">
          <header className="display-header">
            <div className="display-brand">
              <span>PPA Cruise Operations Live</span>
              <strong>{label}</strong>
            </div>
            <div className="display-meta">
              <span>{screen.time.replace("Updated ", "")}</span>
              <strong>{storyStatus}</strong>
            </div>
          </header>

          <section className="display-main">
            <div className="display-icon" aria-hidden="true">
              <Icon size={compact ? 26 : 40} />
            </div>
            <div className="display-message">
              <span>{screen.context}</span>
              <h3>{screen.title}</h3>
              <p>{screen.instruction}</p>
            </div>
          </section>

          {screen.details?.length ? (
            <ScreenDetailPanel screen={screen} />
          ) : (
            <ScreenFormatPanel screen={screen} />
          )}

          <section className="display-instruction">
            <div>
              <span>Next action</span>
              <strong>{screen.action}</strong>
            </div>
            <div>
              <span>Status</span>
              <strong>{screen.status}</strong>
            </div>
          </section>

          <footer className="display-strip" aria-label="Screen publishing state">
            <span>PPA screens publish the message</span>
            <strong>SmartSEA decides the right instruction</strong>
          </footer>
        </div>
      </div>
    </article>
  );
}

function ScreenDetailPanel({ screen }: { screen: PassengerScreenMessage }) {
  const densityClass = screen.details && screen.details.length > 5 ? "dense" : "";

  return (
    <section
      className={`screen-detail-panel ${densityClass}`}
      aria-label="Structured screen content"
    >
      {screen.details?.map((detail) => (
        <article key={`${screen.zone}-${detail.label}`}>
          <span>{detail.label}</span>
          <strong>{detail.value}</strong>
        </article>
      ))}
    </section>
  );
}

function ScreenFormatPanel({ screen }: { screen: PassengerScreenMessage }) {
  const format = screen.format ?? "terminal";

  if (format === "advisory") {
    return (
      <section className="format-panel advisory-panel" aria-label="Advisory screen format">
        <div>
          <span>Passenger group</span>
          <strong>PPA cruise group</strong>
        </div>
        <div>
          <span>Trigger</span>
          <strong>{screen.context}</strong>
        </div>
        <div>
          <span>Call to watch</span>
          <strong>{screen.action}</strong>
        </div>
      </section>
    );
  }

  if (format === "transfer") {
    return (
      <section className="format-panel transfer-panel" aria-label="Transfer bay screen format">
        <div>
          <span>Terminal</span>
          <strong>PPA</strong>
        </div>
        <ArrowRight size={20} />
        <div>
          <span>Assigned route</span>
          <strong>{screen.action}</strong>
        </div>
        <ArrowRight size={20} />
        <div>
          <span>Transfer state</span>
          <strong>{screen.status}</strong>
        </div>
      </section>
    );
  }

  if (format === "baggage") {
    return (
      <section className="format-panel baggage-panel" aria-label="Baggage screen format">
        <div>
          <span>Baggage flow</span>
          <strong>{screen.status}</strong>
        </div>
        <div>
          <span>Passenger movement</span>
          <strong>{screen.action}</strong>
        </div>
        <div>
          <span>Queue control</span>
          <strong>Hold until release</strong>
        </div>
      </section>
    );
  }

  if (format === "rail") {
    return (
      <section className="format-panel rail-panel" aria-label="Rail platform screen format">
        <div>
          <span>Service</span>
          <strong>M3 Piraeus</strong>
        </div>
        <div>
          <span>Boarding advice</span>
          <strong>{screen.action}</strong>
        </div>
        <div>
          <span>Risk state</span>
          <strong>{screen.status}</strong>
        </div>
      </section>
    );
  }

  if (format === "handoff") {
    return (
      <section className="format-panel handoff-panel" aria-label="Assisted handoff screen format">
        <div>
          <span>Handoff point</span>
          <strong>{screen.zone}</strong>
        </div>
        <div>
          <span>Assistance state</span>
          <strong>{screen.status}</strong>
        </div>
        <div>
          <span>Passenger action</span>
          <strong>{screen.action}</strong>
        </div>
      </section>
    );
  }

  if (format === "staff") {
    return (
      <section className="format-panel staff-panel" aria-label="Staff action screen format">
        <div>
          <span>Owner</span>
          <strong>PPA Mobility Desk</strong>
        </div>
        <div>
          <span>Action status</span>
          <strong>{screen.status}</strong>
        </div>
        <div>
          <span>Next task</span>
          <strong>{screen.action}</strong>
        </div>
      </section>
    );
  }

  if (format === "mobile") {
    return (
      <section className="format-panel mobile-panel" aria-label="Mobile handoff screen format">
        <div>
          <span>Passenger handoff</span>
          <strong>Keep open</strong>
        </div>
        <div>
          <span>Update state</span>
          <strong>{screen.status}</strong>
        </div>
        <div>
          <span>Next update</span>
          <strong>{screen.time}</strong>
        </div>
      </section>
    );
  }

  return (
    <section className="format-panel terminal-panel" aria-label="Terminal decision screen format">
      <div>
        <span>Terminal zone</span>
        <strong>{screen.zone}</strong>
      </div>
      <div>
        <span>Decision state</span>
        <strong>{screen.status}</strong>
      </div>
      <div>
        <span>PPA action</span>
        <strong>{screen.action}</strong>
      </div>
    </section>
  );
}

function InformationFlow() {
  return (
    <div className="information-flow" aria-label="Passenger information layer flow">
      <article>
        <h3>Operational inputs</h3>
        <p>maritime operations, terminal activity, passenger flow, baggage status, transport data</p>
      </article>
      <ArrowRight size={24} />
      <article className="flow-dark">
        <h3>SmartSEA decision layer</h3>
        <p>what, where, when, passenger group, journey logic and next action</p>
      </article>
      <ArrowRight size={24} />
      <article className="flow-accent">
        <h3>Passenger instruction</h3>
        <p>the next correct action through CMS channels, staff tools and future services</p>
      </article>
    </div>
  );
}

function SmartSeaRoleSection() {
  return (
    <section className="proposal-section role-definition-section">
      <div className="proposal-copy">
        <p className="section-marker">{smartseaRole.kicker}</p>
        <h2>{smartseaRole.title}</h2>
        <p className="proposal-lede">{smartseaRole.subtitle}</p>
      </div>
      <div className="smartsea-capability-grid">
        {smartseaRole.capabilities.map((capability) => {
          const Icon = icons[capability.icon];
          return (
            <article className="capability-card" key={capability.title}>
              <Icon size={24} />
              <h3>{capability.title}</h3>
              <p>{capability.body}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function EngagementSection() {
  return (
    <section className="proposal-section engagement-section">
      <div className="proposal-copy">
        <p className="section-marker">Invitation to engage</p>
        <h2>Move quickly from infrastructure to value.</h2>
        <p className="proposal-lede">
          A focused working session with PPA IT and Cruise Terminal Operations can define the
          first passenger information services to activate through controlled data services.
        </p>
      </div>
      <div className="engagement-panel">
        <div>
          <span>Working session focus</span>
          <h3>This is not about launching a large program.</h3>
          <p>
            It is about activating the first capabilities that make the signage environment
            more responsive, more connected and more useful from day one.
          </p>
        </div>
        <div className="engagement-focus-list">
          {engagementFocus.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
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
        <span>Operator action</span>
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
        <p className="section-marker">Signals behind the screen</p>
        <h2>What a signage CMS cannot decide by itself.</h2>
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
        <p className="section-marker">Operational chain</p>
        <h2>Intermodal proof behind the passenger instruction.</h2>
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
    <section className="proposal-section references-band">
      <div className="proposal-copy">
        <p className="section-marker">References</p>
        <h2>Reference material proves channels, not the USP.</h2>
        <p className="proposal-lede">
          These transport references are preserved as supporting material. The sales argument
          separates screen-network credibility from the SmartSEA passenger decision layer.
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
