import {
  Anchor,
  ArrowRight,
  AlertTriangle,
  BaggageClaim,
  Bus,
  Car,
  CheckCircle2,
  Clock,
  DatabaseZap,
  Gauge,
  GitBranch,
  Hotel,
  Info,
  Luggage,
  MapPinned,
  MonitorPlay,
  Network,
  Plane,
  RadioTower,
  Radar,
  Route,
  Ship,
  ShieldCheck,
  Signpost,
  TimerReset,
  UsersRound,
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
            Demo Screens
          </a>
        </nav>
      </header>
      <main>{route === "demo" ? <DemoPage /> : <ReferencePlaceholder />}</main>
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

function DemoPage() {
  const [selectedScenarioId, setSelectedScenarioId] = useState("delay");
  const selectedScenario =
    scenarios.find((scenario) => scenario.id === selectedScenarioId) ?? scenarios[0];

  return (
    <>
      <section className="demo-hero">
        <div className="demo-hero-copy">
          <p className="eyebrow">Demo screens</p>
          <h1>One journey layer. Many passenger moments.</h1>
          <p className="lede">
            Choose an operating scenario and watch SmartSEA update the screen
            network with the next best passenger instruction.
          </p>
        </div>
        <div className={`scenario-summary severity-${selectedScenario.severity}`}>
          <div className="summary-topline">
            <selectedScenario.icon size={26} />
            <span>{selectedScenario.status}</span>
          </div>
          <h2>{selectedScenario.headline}</h2>
          <p>{selectedScenario.operatorNote}</p>
        </div>
      </section>

      <section className="demo-workbench">
        <div className="scenario-rail" aria-label="Operating scenarios">
          {scenarios.map((scenario) => (
            <button
              className={scenario.id === selectedScenario.id ? "active" : ""}
              key={scenario.id}
              onClick={() => setSelectedScenarioId(scenario.id)}
              type="button"
            >
              <scenario.icon size={18} />
              <span>{scenario.label}</span>
            </button>
          ))}
        </div>

        <div className="screens-grid">
          {touchpoints.map((touchpoint) => (
            <PassengerScreen
              key={touchpoint.id}
              message={selectedScenario.messages[touchpoint.id]}
              scenario={selectedScenario}
              touchpoint={touchpoint}
            />
          ))}
        </div>

        <aside className="payload-panel" aria-label="CMS payload preview">
          <div className="payload-header">
            <img
              src="/assets/brand/smartsea-logo-horizontal-powered-by-sita-white.svg"
              alt="SmartSEA powered by SITA"
            />
            <span>CMS feed preview</span>
          </div>
          <div className="feed-chips">
            {selectedScenario.feeds.map((feed) => (
              <span key={feed}>{feed}</span>
            ))}
          </div>
          <pre>{JSON.stringify(selectedScenario.cmsPayload, null, 2)}</pre>
        </aside>
      </section>
    </>
  );
}

function PassengerScreen({
  message,
  scenario,
  touchpoint,
}: {
  message: TouchpointMessage;
  scenario: Scenario;
  touchpoint: Touchpoint;
}) {
  return (
    <article className={`passenger-screen severity-${scenario.severity}`}>
      <div className="screen-topbar">
        <img
          src="/assets/brand/smartsea-logo-horizontal-powered-by-sita-white.svg"
          alt="SmartSEA powered by SITA"
        />
        <span>{touchpoint.zone}</span>
      </div>
      <div className="screen-body">
        <div className="screen-kicker">
          <touchpoint.icon size={17} />
          {touchpoint.label}
        </div>
        <h3>{message.title}</h3>
        <p>{message.instruction}</p>
        <div className="next-action">
          <span>Next action</span>
          <strong>{message.action}</strong>
        </div>
      </div>
      <div className="screen-footer">
        <span>{scenario.status}</span>
        <span>{message.time}</span>
      </div>
    </article>
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

type Severity = "normal" | "notice" | "warning";
type TouchpointId =
  | "home"
  | "approach"
  | "terminal"
  | "boarding"
  | "baggage"
  | "onward";

type Touchpoint = {
  id: TouchpointId;
  label: string;
  zone: string;
  icon: typeof Hotel;
};

type TouchpointMessage = {
  title: string;
  instruction: string;
  action: string;
  time: string;
};

type Scenario = {
  id: string;
  label: string;
  status: string;
  severity: Severity;
  headline: string;
  operatorNote: string;
  feeds: string[];
  icon: typeof AlertTriangle;
  messages: Record<TouchpointId, TouchpointMessage>;
  cmsPayload: {
    event: string;
    priority: string;
    audience: string;
    location: string;
    message: string;
    validUntil: string;
    channels: string[];
  };
};

const touchpoints: Touchpoint[] = [
  { id: "home", label: "Home / Hotel", zone: "Pre-arrival", icon: Hotel },
  { id: "approach", label: "Port Approach", zone: "Road and transit", icon: Bus },
  { id: "terminal", label: "Terminal Hall", zone: "Inside terminal", icon: MapPinned },
  { id: "boarding", label: "Boarding", zone: "Gate and berth", icon: Ship },
  { id: "baggage", label: "Baggage", zone: "Drop and reclaim", icon: Luggage },
  { id: "onward", label: "City / Airport", zone: "Onward mobility", icon: Plane },
];

const scenarios: Scenario[] = [
  {
    id: "normal",
    label: "Normal flow",
    status: "On schedule",
    severity: "normal",
    headline: "Passengers receive calm, sequenced instructions.",
    operatorNote:
      "SmartSEA keeps each touchpoint aligned with the journey stage instead of repeating generic directions.",
    feeds: ["Vessel ETA", "Gate status", "Passenger flow", "Mobility timetable"],
    icon: CheckCircle2,
    messages: {
      home: {
        title: "Depart for Gate E8 at 10:10",
        instruction: "Traffic is light. Keep your documents ready before terminal entry.",
        action: "Leave on planned schedule",
        time: "Updated 09:42",
      },
      approach: {
        title: "Use the central passenger drop-off",
        instruction: "Coach and taxi queues are normal. Follow lane signs for Terminal A.",
        action: "Continue to Terminal A",
        time: "Updated 09:44",
      },
      terminal: {
        title: "Proceed to document check",
        instruction: "Expected wait is under 8 minutes. Families may use the left lane.",
        action: "Join document check lane",
        time: "Updated 09:46",
      },
      boarding: {
        title: "Boarding opens at 10:35",
        instruction: "Gate E8 is confirmed. Priority boarding begins first.",
        action: "Wait near Gate E8",
        time: "Updated 09:47",
      },
      baggage: {
        title: "Baggage drop is open",
        instruction: "Attach tags before counter entry. Oversized items use counter 3.",
        action: "Use counters 1-3",
        time: "Updated 09:47",
      },
      onward: {
        title: "Metro and airport bus on time",
        instruction: "Connections are operating normally after disembarkation.",
        action: "Choose preferred connection",
        time: "Updated 09:48",
      },
    },
    cmsPayload: {
      event: "normal_flow",
      priority: "standard",
      audience: "all departing passengers",
      location: "terminal network",
      message: "Journey operating normally. Continue to assigned terminal and gate.",
      validUntil: "2026-04-27T10:15:00+03:00",
      channels: ["terminal screens", "approach displays", "mobile web", "staff view"],
    },
  },
  {
    id: "delay",
    label: "Delay",
    status: "Delay detected",
    severity: "notice",
    headline: "A vessel delay becomes useful passenger guidance.",
    operatorNote:
      "Instead of only announcing a delay, SmartSEA changes timing, routes, and wait-area instructions.",
    feeds: ["Vessel ETA", "Berth readiness", "Passenger dwell", "Retail occupancy"],
    icon: Clock,
    messages: {
      home: {
        title: "Depart 25 minutes later",
        instruction: "Your vessel is delayed. Arriving before 10:35 will increase terminal waiting time.",
        action: "Delay departure if possible",
        time: "Updated 09:42",
      },
      approach: {
        title: "Do not rush to the terminal",
        instruction: "Drop-off congestion is building. Use the west entry if arriving by taxi.",
        action: "Use west entry",
        time: "Updated 09:44",
      },
      terminal: {
        title: "Wait in Zone B",
        instruction: "Gate E8 is not boarding yet. Seating is available near Zone B.",
        action: "Move to Zone B",
        time: "Updated 09:45",
      },
      boarding: {
        title: "Boarding now expected 11:05",
        instruction: "Gate remains E8. Listen for group sequence updates.",
        action: "Return at 10:55",
        time: "Updated 09:46",
      },
      baggage: {
        title: "Baggage drop remains open",
        instruction: "Counters stay open until 10:50. Keep baggage with you if waiting outside.",
        action: "Drop bags before 10:50",
        time: "Updated 09:47",
      },
      onward: {
        title: "Onward arrival shifted",
        instruction: "Airport bus connection risk is low. Taxi queue forecast is moderate.",
        action: "Review connection at arrival",
        time: "Updated 09:48",
      },
    },
    cmsPayload: {
      event: "vessel_delay",
      priority: "medium",
      audience: "departing passengers for Gate E8",
      location: "pre-arrival, terminal hall, boarding gate",
      message: "Boarding expected at 11:05. Wait in Zone B and return to Gate E8 at 10:55.",
      validUntil: "2026-04-27T10:55:00+03:00",
      channels: ["terminal screens", "hotel feed", "approach displays", "staff view"],
    },
  },
  {
    id: "congestion",
    label: "Congestion",
    status: "Flow pressure",
    severity: "warning",
    headline: "Crowding turns into targeted movement instructions.",
    operatorNote:
      "The system reduces stress by moving passengers away from pressure points before the terminal feels blocked.",
    feeds: ["Camera analytics", "Queue sensors", "Security lane status", "Entry gate state"],
    icon: UsersRound,
    messages: {
      home: {
        title: "Arrive after 10:25 if flexible",
        instruction: "Terminal A is busy. Later arrival reduces expected waiting time.",
        action: "Shift arrival window",
        time: "Updated 09:42",
      },
      approach: {
        title: "Use Gate 2 for passenger entry",
        instruction: "Gate 1 is congested. Gate 2 has lower wait and same document checks.",
        action: "Follow signs to Gate 2",
        time: "Updated 09:43",
      },
      terminal: {
        title: "Move to security lanes 5-6",
        instruction: "Lanes 1-3 are at capacity. Staff are opening additional lanes.",
        action: "Use lanes 5-6",
        time: "Updated 09:44",
      },
      boarding: {
        title: "Boarding sequence unchanged",
        instruction: "Do not queue yet. Group A will be called first on this screen.",
        action: "Wait in open seating",
        time: "Updated 09:45",
      },
      baggage: {
        title: "Baggage counter 4 is fastest",
        instruction: "Counters 1-2 are congested. Counter 4 accepts the same sailing.",
        action: "Use counter 4",
        time: "Updated 09:46",
      },
      onward: {
        title: "Taxi rank temporarily busy",
        instruction: "Metro access is clear. Airport bus departs from Bay 3.",
        action: "Use Bay 3 or metro",
        time: "Updated 09:47",
      },
    },
    cmsPayload: {
      event: "terminal_congestion",
      priority: "high",
      audience: "departing passengers in Terminal A",
      location: "entry gates, security, baggage",
      message: "Use Gate 2 and security lanes 5-6. Avoid queuing at Gate E8 until called.",
      validUntil: "2026-04-27T10:20:00+03:00",
      channels: ["entry screens", "terminal screens", "staff view", "mobile web"],
    },
  },
  {
    id: "boarding-change",
    label: "Boarding change",
    status: "Gate change",
    severity: "warning",
    headline: "A boarding change reaches every affected touchpoint.",
    operatorNote:
      "SmartSEA keeps the passenger message consistent across approach, terminal, gate, and staff channels.",
    feeds: ["Gate allocation", "Berth operations", "Staff confirmation", "Passenger location"],
    icon: AlertTriangle,
    messages: {
      home: {
        title: "Boarding gate changed to E6",
        instruction: "Your sailing now boards from E6. Enter through Terminal A as planned.",
        action: "Save new gate E6",
        time: "Updated 09:42",
      },
      approach: {
        title: "Follow Terminal A, then E6",
        instruction: "Road approach is unchanged. Digital screens inside will show the new route.",
        action: "Continue to Terminal A",
        time: "Updated 09:43",
      },
      terminal: {
        title: "Turn right for Gate E6",
        instruction: "Gate E8 is no longer used for this sailing. Staff are positioned at the split.",
        action: "Follow E6 route",
        time: "Updated 09:44",
      },
      boarding: {
        title: "Board at Gate E6",
        instruction: "Boarding sequence starts with assistance and families, then Group A.",
        action: "Move to Gate E6",
        time: "Updated 09:45",
      },
      baggage: {
        title: "Baggage route unchanged",
        instruction: "Drop counters remain the same. After drop, follow signs to E6.",
        action: "Drop bags, then E6",
        time: "Updated 09:46",
      },
      onward: {
        title: "Arrival plan unchanged",
        instruction: "Onward connections are unaffected by the boarding gate change.",
        action: "Keep existing plan",
        time: "Updated 09:47",
      },
    },
    cmsPayload: {
      event: "boarding_gate_change",
      priority: "high",
      audience: "passengers assigned to previous Gate E8",
      location: "terminal split, gate area, baggage exit",
      message: "Boarding gate changed to E6. Gate E8 is no longer used for this sailing.",
      validUntil: "2026-04-27T11:00:00+03:00",
      channels: ["terminal screens", "gate displays", "approach displays", "staff view"],
    },
  },
  {
    id: "transfer-risk",
    label: "Transfer risk",
    status: "Connection risk",
    severity: "notice",
    headline: "Onward mobility becomes part of the port experience.",
    operatorNote:
      "The guidance layer can protect passenger confidence after disembarkation, not only inside the terminal.",
    feeds: ["Vessel arrival", "Airport bus", "Metro status", "Taxi queue"],
    icon: TimerReset,
    messages: {
      home: {
        title: "Airport connection is tight",
        instruction: "If flying before 15:30, choose the direct airport bus after disembarkation.",
        action: "Plan direct bus",
        time: "Updated 09:42",
      },
      approach: {
        title: "Keep airport transfer visible",
        instruction: "Your onward transfer is time-sensitive. SmartSEA will update after arrival.",
        action: "Watch transfer screens",
        time: "Updated 09:43",
      },
      terminal: {
        title: "Airport passengers: note Bay 3",
        instruction: "Direct bus capacity is available. Boarding guidance will appear at arrival.",
        action: "Remember Bay 3",
        time: "Updated 09:44",
      },
      boarding: {
        title: "Sit near forward exit if possible",
        instruction: "Airport transfer passengers should disembark promptly when cleared.",
        action: "Prepare for quick exit",
        time: "Updated 09:45",
      },
      baggage: {
        title: "Priority baggage belt 2",
        instruction: "Airport-tagged baggage will be directed to belt 2 when available.",
        action: "Go to belt 2",
        time: "Updated 09:46",
      },
      onward: {
        title: "Use airport bus Bay 3",
        instruction: "Next airport bus leaves in 9 minutes. Taxi queue is 18 minutes.",
        action: "Proceed to Bay 3",
        time: "Updated 09:47",
      },
    },
    cmsPayload: {
      event: "onward_transfer_risk",
      priority: "medium",
      audience: "passengers with airport transfer intent",
      location: "arrival hall, baggage, mobility bays",
      message: "Airport bus departs Bay 3 in 9 minutes. Use belt 2 for priority baggage.",
      validUntil: "2026-04-27T13:40:00+03:00",
      channels: ["arrival screens", "baggage screens", "mobility bay displays", "mobile web"],
    },
  },
  {
    id: "baggage",
    label: "Baggage",
    status: "Baggage exception",
    severity: "notice",
    headline: "Baggage status becomes a passenger instruction, not a desk question.",
    operatorNote:
      "Baggage signals can reduce uncertainty by showing where to go and what exception path applies.",
    feeds: ["Baggage system", "Counter status", "Exception queue", "Staff desk"],
    icon: BaggageClaim,
    messages: {
      home: {
        title: "Oversized baggage desk is open",
        instruction: "If carrying large items, arrive 15 minutes earlier for counter processing.",
        action: "Use oversized desk",
        time: "Updated 09:42",
      },
      approach: {
        title: "Use baggage drop entrance B",
        instruction: "Entrance B is closest to active counters and oversized processing.",
        action: "Follow Entrance B",
        time: "Updated 09:43",
      },
      terminal: {
        title: "Print tags before counter queue",
        instruction: "Tag kiosks are available on the right. Counter queue is for tagged bags.",
        action: "Print tag first",
        time: "Updated 09:44",
      },
      boarding: {
        title: "Baggage accepted until 10:50",
        instruction: "Passengers without checked bags may proceed directly to document check.",
        action: "Complete drop by 10:50",
        time: "Updated 09:45",
      },
      baggage: {
        title: "Exception desk moved to counter 6",
        instruction: "Damaged tag and oversized exceptions are handled at counter 6.",
        action: "Go to counter 6",
        time: "Updated 09:46",
      },
      onward: {
        title: "Reclaim guidance appears on arrival",
        instruction: "Baggage belt and exception desk status will update before disembarkation.",
        action: "Watch arrival screens",
        time: "Updated 09:47",
      },
    },
    cmsPayload: {
      event: "baggage_exception_routing",
      priority: "medium",
      audience: "passengers with checked or oversized baggage",
      location: "baggage drop, terminal entry, counter 6",
      message: "Use Entrance B. Print tags before queuing. Exceptions are handled at counter 6.",
      validUntil: "2026-04-27T10:50:00+03:00",
      channels: ["baggage screens", "terminal screens", "staff view"],
    },
  },
  {
    id: "onward",
    label: "Onward mobility",
    status: "Mobility update",
    severity: "normal",
    headline: "The experience continues beyond the terminal exit.",
    operatorNote:
      "SmartSEA can connect port operations with the wider city and airport transport ecosystem.",
    feeds: ["Metro status", "Taxi queue", "Airport bus", "City traffic"],
    icon: Car,
    messages: {
      home: {
        title: "Plan onward transport now",
        instruction: "Airport bus and metro are both operating. Taxi queue is forecast moderate.",
        action: "Choose connection",
        time: "Updated 09:42",
      },
      approach: {
        title: "Onward bays are active",
        instruction: "Airport bus uses Bay 3. City shuttle uses Bay 5 after arrival.",
        action: "Remember bay numbers",
        time: "Updated 09:43",
      },
      terminal: {
        title: "City transfer info available",
        instruction: "Screens near the exit show live airport, metro, taxi, and shuttle options.",
        action: "Check exit screens",
        time: "Updated 09:44",
      },
      boarding: {
        title: "Onward options will update onboard",
        instruction: "Arrival guidance will refresh 20 minutes before disembarkation.",
        action: "Review before arrival",
        time: "Updated 09:45",
      },
      baggage: {
        title: "Baggage and transfer aligned",
        instruction: "Passengers using airport bus should use baggage belt 1 on arrival.",
        action: "Use belt 1",
        time: "Updated 09:46",
      },
      onward: {
        title: "Fastest airport option: bus Bay 3",
        instruction: "Airport bus departs in 12 minutes. Metro is best for city center.",
        action: "Proceed to Bay 3",
        time: "Updated 09:47",
      },
    },
    cmsPayload: {
      event: "onward_mobility_guidance",
      priority: "standard",
      audience: "arriving passengers",
      location: "arrival hall and mobility bays",
      message: "Airport bus departs Bay 3 in 12 minutes. Metro is best for city center.",
      validUntil: "2026-04-27T13:55:00+03:00",
      channels: ["arrival screens", "mobility bay displays", "mobile web", "staff view"],
    },
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
