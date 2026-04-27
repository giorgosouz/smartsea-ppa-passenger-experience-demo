export type Severity = "normal" | "notice" | "warning";

export type IconKey =
  | "alert"
  | "api"
  | "baggage"
  | "bus"
  | "clock"
  | "database"
  | "git"
  | "map"
  | "monitor"
  | "network"
  | "plane"
  | "radar"
  | "route"
  | "ship"
  | "shield"
  | "train"
  | "users"
  | "waypoints";

export type ApiProofGroup = {
  title: string;
  source: string;
  body: string;
  endpoints: string[];
  metric: string;
  icon: IconKey;
};

export type ApiStory = {
  id: string;
  label: string;
  status: string;
  severity: Severity;
  headline: string;
  operatorNote: string;
  instruction: {
    title: string;
    body: string;
    action: string;
  };
  snapshot: {
    itinerary: string;
    risk: string;
    recovery: string;
    confidence: string;
  };
  signals: Array<{
    label: string;
    endpoint: string;
    value: string;
    body: string;
  }>;
  steps: Array<{
    mode: string;
    time: string;
    title: string;
    detail: string;
    state: string;
  }>;
  icon: IconKey;
};

export type ReferenceCase = {
  title: string;
  location: string;
  body: string;
  proof: string;
  icon: IconKey;
};

export type ReferenceAsset = {
  title: string;
  body: string;
  src: string;
  source: string;
};

export const heroStats = [
  { value: "11", label: "curated intermodal itineraries" },
  { value: "3", label: "broken MCT connections" },
  { value: "337", label: "passengers at recovery risk" },
];

export const apiPillars = [
  {
    title: "The product is the API layer",
    body: "SmartSEA Intermodal APIs normalize port, rail, airport, event, vessel, and disruption data into one passenger journey layer.",
    icon: "api",
  },
  {
    title: "CMS and screens are channels",
    body: "A CMS can publish the message, but the strategic value is deciding which live instruction should exist in the first place.",
    icon: "monitor",
  },
  {
    title: "Connection risk becomes visible",
    body: "The platform turns schedules and realtime updates into MCT margins, risk labels, passenger counts, and recovery ownership.",
    icon: "radar",
  },
  {
    title: "Recovery action is generated",
    body: "When the journey breaks, the system produces the action, owner hint, confidence, and passenger instruction needed to respond.",
    icon: "shield",
  },
] satisfies Array<{ title: string; body: string; icon: IconKey }>;

export const apiProofGroups: ApiProofGroup[] = [
  {
    title: "Swagger schedule foundations",
    source: "GIDP Swagger",
    body: "Master data and schedules expose the basic transport graph PPA needs before any passenger guidance can be trusted.",
    endpoints: [
      "/airports/authorized",
      "/maritime/ports/authorized",
      "/rail/agencies/authorized",
      "/rail/cities/{city}/stops",
    ],
    metric: "Airport, port, and rail authority context",
    icon: "database",
  },
  {
    title: "Realtime movement layer",
    source: "GIDP demo API",
    body: "Schedule endpoints are enriched with ETA, status, gate, terminal, AIS, GTFS-RT, and weather-style context.",
    endpoints: [
      "/airports/ATH/direction/{a|d}/dates/{start}/{end}",
      "/maritime/GRPIR/schedules/dates/{start}/{end}",
      "/rail/cities/Athens/stops/{stop}/schedule/realtime/dates/{start}/{end}",
    ],
    metric: "4 flight rows, 3 port calls, 3 rail trips in showcase snapshot",
    icon: "network",
  },
  {
    title: "Intermodal itinerary API",
    source: "Local GIDP extension",
    body: "The platform generates connected journeys across cruise, rail, and airport legs instead of treating each mode as a separate screen feed.",
    endpoints: ["/intermodal/itineraries/dates/{start}/{end}"],
    metric: "11 curated journeys, including Air-Rail-Cruise chains",
    icon: "waypoints",
  },
  {
    title: "Connection risk API",
    source: "Local GIDP extension",
    body: "Minimum connection time calculations convert live timetable drift into broken, high-risk, watch, or OK connection states.",
    endpoints: ["/connection-risk/dates/{start}/{end}"],
    metric: "3 broken MCT checks, 359 passengers at risk",
    icon: "radar",
  },
  {
    title: "Recovery action API",
    source: "Local GIDP extension",
    body: "Recovery cards translate the risk state into operator-owned actions that can feed screens, staff tools, mobile, or alerts.",
    endpoints: ["/ai/recovery-copilot/dates/{start}/{end}"],
    metric: "3 critical actions, 337 passengers at recovery risk",
    icon: "shield",
  },
];

export const apiStories: ApiStory[] = [
  {
    id: "cruise-rail-air",
    label: "Cruise to airport",
    status: "Critical connection",
    severity: "warning",
    headline: "Cruise passengers are predicted to miss the airport connection.",
    operatorNote:
      "The API story links a maritime arrival, Piraeus rail corridor, ATH departure, MCT rule, and recovery owner into one decision.",
    instruction: {
      title: "Airport passengers: use recovery desk before rail transfer",
      body: "Rail arrival drift reduces the airport connection margin below the required 120 minutes. Hold the group at the port mobility desk and prepare rebooking.",
      action: "Recover now: Airport + rail desk",
    },
    snapshot: {
      itinerary: "INT-20260427-002",
      risk: "-62 min MCT margin",
      recovery: "Recover now",
      confidence: "76%",
    },
    signals: [
      {
        label: "Port call",
        endpoint: "/maritime/GRPIR/schedules",
        value: "Cruise arrival confirmed",
        body: "Piraeus port call anchors the start of the chain.",
      },
      {
        label: "Rail realtime",
        endpoint: "/rail/.../schedule/realtime",
        value: "+7 min arrival drift",
        body: "GTFS-style update erodes the connection buffer.",
      },
      {
        label: "Airport departure",
        endpoint: "/airports/ATH/direction/d",
        value: "EK209 departure",
        body: "The flight leg sets the hard recovery deadline.",
      },
      {
        label: "Connection risk",
        endpoint: "/connection-risk/dates",
        value: "Broken",
        body: "Estimated buffer is 58 minutes against a 120 minute rule.",
      },
    ],
    steps: [
      {
        mode: "Maritime",
        time: "10:05",
        title: "Cruise arrival at Piraeus",
        detail: "Passenger group enters the port mobility flow.",
        state: "Arrived",
      },
      {
        mode: "Rail",
        time: "11:20",
        title: "Metro M3 to airport",
        detail: "Realtime drift now affects the arrival window.",
        state: "+7 min",
      },
      {
        mode: "Air",
        time: "14:15",
        title: "ATH departure EK209",
        detail: "Required MCT cannot be protected.",
        state: "At risk",
      },
    ],
    icon: "ship",
  },
  {
    id: "flight-rail-port",
    label: "Flight to cruise",
    status: "Watch window",
    severity: "notice",
    headline: "Inbound flight timing changes the port departure path.",
    operatorNote:
      "The API layer turns flight arrival, airport rail timing, and maritime departure into a single transfer instruction.",
    instruction: {
      title: "Cruise passengers: take direct rail to Piraeus",
      body: "The air-to-rail handoff is still feasible, but the port departure buffer is tightening. Route passengers to the fastest rail platform.",
      action: "Send to airport rail platform",
    },
    snapshot: {
      itinerary: "INT-20260427-006",
      risk: "18 min positive margin",
      recovery: "Monitor",
      confidence: "72%",
    },
    signals: [
      {
        label: "Flight arrival",
        endpoint: "/airports/ATH/direction/a",
        value: "Estimated arrival populated",
        body: "Estimated time replaces schedule fallback for the handoff.",
      },
      {
        label: "Rail departure",
        endpoint: "/rail/.../schedule/realtime",
        value: "Next feasible M3",
        body: "Rail schedule determines whether the cruise chain remains viable.",
      },
      {
        label: "Port departure",
        endpoint: "/maritime/GRPIR/schedules",
        value: "Departure still protected",
        body: "The maritime leg provides the final transfer deadline.",
      },
    ],
    steps: [
      {
        mode: "Air",
        time: "09:35",
        title: "ATH inbound arrival",
        detail: "Passenger group lands with checked bags.",
        state: "Expected",
      },
      {
        mode: "Rail",
        time: "10:12",
        title: "Airport to Piraeus rail",
        detail: "Fastest feasible public transport leg.",
        state: "On time",
      },
      {
        mode: "Maritime",
        time: "13:05",
        title: "Cruise departure",
        detail: "Departure buffer remains positive but monitored.",
        state: "Watch",
      },
    ],
    icon: "plane",
  },
  {
    id: "rail-delay",
    label: "Rail delay",
    status: "Rail drift",
    severity: "notice",
    headline: "A rail delay becomes a port and airport passenger instruction.",
    operatorNote:
      "Rail realtime does not stay buried in a transit feed; it changes which passengers should move, wait, or be recovered.",
    instruction: {
      title: "Airport-bound passengers: move now to Bay 3",
      body: "Rail drift creates a tight transfer. Prioritize airport passengers and direct them to the fastest onward option.",
      action: "Prioritize airport group movement",
    },
    snapshot: {
      itinerary: "INT-20260427-008",
      risk: "High risk",
      recovery: "Prepare recovery",
      confidence: "74%",
    },
    signals: [
      {
        label: "Rail realtime",
        endpoint: "/rail/.../schedule/realtime",
        value: "Service alert attached",
        body: "Delay appears as estimated time movement and service alert context.",
      },
      {
        label: "Itinerary",
        endpoint: "/intermodal/itineraries",
        value: "Rail leg linked",
        body: "The affected rail trip is part of a monitored passenger journey.",
      },
      {
        label: "Recovery",
        endpoint: "/ai/recovery-copilot",
        value: "Owner assigned",
        body: "The platform suggests who should act, not only what changed.",
      },
    ],
    steps: [
      {
        mode: "Port",
        time: "10:40",
        title: "Passengers leave terminal",
        detail: "Group is routed by onward destination.",
        state: "Split flow",
      },
      {
        mode: "Rail",
        time: "11:05",
        title: "Realtime delay detected",
        detail: "Estimated rail arrival shifts the connection.",
        state: "Delayed",
      },
      {
        mode: "Air",
        time: "13:20",
        title: "Flight connection protected",
        detail: "Alternate transfer option is prepared.",
        state: "Recovering",
      },
    ],
    icon: "train",
  },
  {
    id: "vessel-eta",
    label: "Vessel ETA drift",
    status: "ETA changed",
    severity: "notice",
    headline: "AIS-style vessel intelligence changes the landside plan.",
    operatorNote:
      "The maritime schedule is only the start; updated ETA/arrival state drives rail, taxi, baggage, and city-transfer instructions.",
    instruction: {
      title: "Delay landside transfer dispatch by 20 minutes",
      body: "The vessel arrival estimate moved. Keep transfer vehicles staged and update passenger screens when disembarkation is confirmed.",
      action: "Hold transfer release",
    },
    snapshot: {
      itinerary: "Port movement",
      risk: "Flow pressure avoided",
      recovery: "Retimed dispatch",
      confidence: "79%",
    },
    signals: [
      {
        label: "Maritime schedule",
        endpoint: "/maritime/GRPIR/schedules",
        value: "ETA overlay",
        body: "Arrival timing changes before passengers reach the curb.",
      },
      {
        label: "Rail and road",
        endpoint: "/rail + mobility",
        value: "Connections recalculated",
        body: "Onward instructions update from the same timing change.",
      },
      {
        label: "Publishing channels",
        endpoint: "CMS / mobile / staff",
        value: "Same guidance",
        body: "Screens are channels for a decision already made by the API layer.",
      },
    ],
    steps: [
      {
        mode: "Vessel",
        time: "08:50",
        title: "Arrival estimate moves",
        detail: "AIS-derived ETA shifts passenger readiness.",
        state: "+20 min",
      },
      {
        mode: "Terminal",
        time: "09:10",
        title: "Baggage and exit flow retimed",
        detail: "Do not trigger crowding at the exit.",
        state: "Held",
      },
      {
        mode: "Mobility",
        time: "09:25",
        title: "Transfers released later",
        detail: "Rail, taxi, and coach instructions stay aligned.",
        state: "Ready",
      },
    ],
    icon: "radar",
  },
  {
    id: "recovery-action",
    label: "Recovery action",
    status: "Action generated",
    severity: "warning",
    headline: "The system produces an operator action, not just an alert.",
    operatorNote:
      "This is where the API sell is clearest: schedules become decisions, and decisions become passenger instructions.",
    instruction: {
      title: "Recover INT-20260427-002 now",
      body: "Predicted lost connection from a negative MCT margin. Move the affected group to assisted handling and prepare the next feasible leg.",
      action: "Rebook to next feasible leg",
    },
    snapshot: {
      itinerary: "INT-20260427-002",
      risk: "Broken",
      recovery: "Critical",
      confidence: "76%",
    },
    signals: [
      {
        label: "Risk state",
        endpoint: "/connection-risk/dates",
        value: "Broken",
        body: "The connection is below the required minimum connection time.",
      },
      {
        label: "Passenger impact",
        endpoint: "/intermodal/itineraries",
        value: "78 passengers",
        body: "The action is tied to a passenger group, not only an operation row.",
      },
      {
        label: "Recovery card",
        endpoint: "/ai/recovery-copilot",
        value: "Airport + rail desk",
        body: "Owner hint and recommended action are generated for downstream tools.",
      },
    ],
    steps: [
      {
        mode: "Detect",
        time: "Now",
        title: "Connection turns Broken",
        detail: "Risk API computes the MCT failure.",
        state: "Critical",
      },
      {
        mode: "Decide",
        time: "+1 min",
        title: "Recovery owner assigned",
        detail: "Airport and rail desk prepare the handoff.",
        state: "Owned",
      },
      {
        mode: "Guide",
        time: "+2 min",
        title: "Passenger instruction published",
        detail: "Screens, mobile, and staff tools share the same action.",
        state: "Live",
      },
    ],
    icon: "alert",
  },
];

export const spinetixTransportCases: ReferenceCase[] = [
  {
    title: "Carnival Cruise Line",
    location: "USA",
    body: "Cruise terminal reference for wayfinding, check-in, boarding, and passenger information across a large hospitality journey.",
    proof: "Supporting reference material cites 600 screens per boat across 6 boats.",
    icon: "ship",
  },
  {
    title: "Geneva Airport",
    location: "Switzerland",
    body: "Airport security gate and welcome/arrival zone deployment showing transportation signage at passenger decision points.",
    proof: "Reference list notes approximately 180 screens.",
    icon: "plane",
  },
  {
    title: "Sion Airport",
    location: "Switzerland",
    body: "Airport wayfinding and boarding reference for compact transport environments.",
    proof: "Reference list notes approximately 20 screens.",
    icon: "route",
  },
  {
    title: "LAX gates",
    location: "USA",
    body: "Gate information reference for airport passenger environments.",
    proof: "Reference list notes approximately 20 to 40 screens.",
    icon: "plane",
  },
  {
    title: "Hong Kong airport gates",
    location: "Hong Kong",
    body: "High-density airport gate deployment for passenger information and movement decisions.",
    proof: "Reference list notes approximately 100 screens.",
    icon: "monitor",
  },
  {
    title: "Baghdad Airport",
    location: "Iraq",
    body: "Large airport deployment suitable for destination, weather, time, and information content.",
    proof: "Reference list notes approximately 450 screens.",
    icon: "monitor",
  },
  {
    title: "Kuwait passport gates",
    location: "Kuwait",
    body: "Passenger control point reference for security-sensitive transport messaging.",
    proof: "Reference list notes approximately 50 screens.",
    icon: "shield",
  },
  {
    title: "Abu Dhabi Airport and Etihad lounges",
    location: "U.A.E.",
    body: "Airport and lounge references for premium passenger information, schedules, and service guidance.",
    proof: "Reference list notes approximately 200 airport screens and 30 lounge screens.",
    icon: "plane",
  },
];

export const supportingReferenceAssets: ReferenceAsset[] = [
  {
    title: "Copenhagen Malmo Port passenger screen",
    body: "Port-grade multimodal passenger information: ferry state, transfers, map, weather, and QR handoff in one view.",
    src: "/assets/references/copenhagen-malmo-port-reference.svg",
    source: "User-provided reference visual",
  },
  {
    title: "Carnival Cruise Line screen reference",
    body: "A cruise passenger information surface that proves the channel pattern for boarding, service, and wayfinding communications.",
    src: "/assets/references/carnival-cruise-line-screen.png",
    source: "RelevantReferencesForTransportation.docx",
  },
  {
    title: "Cruise journey context",
    body: "Cruise imagery anchors the PPA use case around passenger movement, timing, and intermodal handoff rather than generic signage.",
    src: "/assets/references/cruise-ship-reference.jpg",
    source: "RelevantReferencesForTransportation.docx",
  },
  {
    title: "Geneva transit widget",
    body: "Transport widget example combining service departures, local context, and photo guidance for a clear passenger decision point.",
    src: "/assets/references/geneva-transit-widget-split.png",
    source: "Supporting transport widget image",
  },
  {
    title: "Geneva live departures",
    body: "Wide passenger widget pattern for rail, bus, tram, weather, and local movement updates.",
    src: "/assets/references/geneva-transit-widget-wide.png",
    source: "Supporting transport widget image",
  },
  {
    title: "Piraeus ARYA content template",
    body: "Port template reference for a SmartSEA/PPA-style journey screen where the API layer can drive the visible instruction.",
    src: "/assets/references/piraeus-arya-template.png",
    source: "DescriptionGeneraleSpinetiX-transportation PIRAEUS.docx",
  },
  {
    title: "Baggage and FIDS reference",
    body: "Airport arrivals and baggage information show how transport APIs can connect onward guidance after disembarkation.",
    src: "/assets/references/baggage-fids-reference.jpg",
    source: "Supporting baggage/FIDS image",
  },
  {
    title: "Transport widget reference grid",
    body: "Widget library evidence for turning transport API signals into designed passenger-facing modules.",
    src: "/assets/references/transport-widget-reference-grid.png",
    source: "Transportation_Widget.pptx",
  },
];
