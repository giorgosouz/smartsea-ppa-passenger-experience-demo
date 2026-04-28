export type Severity = "normal" | "notice" | "warning";

export type ScreenFormat =
  | "advisory"
  | "terminal"
  | "transfer"
  | "baggage"
  | "rail"
  | "handoff"
  | "staff"
  | "mobile";

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
  outcomes: Array<{
    label: string;
    value: string;
    body: string;
  }>;
  screens: PassengerScreenMessage[];
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

export type PassengerScreenMessage = {
  zone: string;
  context: string;
  title: string;
  instruction: string;
  action: string;
  status: string;
  time: string;
  icon: IconKey;
  format?: ScreenFormat;
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

export const visionIntro = {
  kicker: "The USP",
  title: "Not digital signage. Passenger decision intelligence.",
  subtitle:
    "Any vendor can display signs. SmartSEA decides what instruction should appear, where, when and for which passenger group.",
  body: [
    "From screens to passenger information means moving value out of the physical estate and into the decision layer behind it. The value is not the screen; it is the decision.",
    "SmartSEA turns maritime, airport, rail, terminal, baggage and mobility signals into the next correct passenger instruction.",
    "The CMS publishes the message. SmartSEA decides the right message for the situation, then keeps passenger screens, staff action and transfer timing aligned.",
  ],
};

export const problemStatements = [
  {
    title: "The real problem to solve",
    body: "Passengers do not experience Piraeus as a terminal. They experience it as part of a journey from Athens International Airport, a nearby hotel, road or rail into terminal access, baggage drop, check-in, embarkation, disembarkation and onward travel.",
  },
  {
    title: "The questions are operational",
    body: "They need to know whether their vessel has changed terminal, whether boarding is delayed, whether the entrance is congested, whether to proceed or wait, where onward transport is, and what happens if there is disruption.",
  },
  {
    title: "Generic signage cannot decide",
    body: "When operations run as planned, static information is enough. When vessel schedules shift, boarding times move, baggage readiness changes or traffic builds, the valuable question is what the passenger should do next.",
  },
];

export const visionPillars = [
  {
    title: "Control",
    body: "PPA governs decision rules: what is communicated, where, when and to which passenger group.",
    proof: "The right message, not just more messages",
    icon: "shield",
  },
  {
    title: "React",
    body: "SmartSEA turns delay, congestion, boarding, baggage and connection changes into live instructions.",
    proof: "MCT risk, recovery action and flow timing",
    icon: "radar",
  },
  {
    title: "Extend",
    body: "The same decision layer extends beyond terminal screens into staff tools, mobile handoffs and intermodal journey services.",
    proof: "Airport, rail, port, vessel and onward mobility",
    icon: "waypoints",
  },
] satisfies Array<{ title: string; body: string; proof: string; icon: IconKey }>;

export const uspHierarchy = [
  {
    title: "Decision layer",
    body: "SmartSEA turns operational data into the next correct passenger instruction.",
    icon: "shield",
  },
  {
    title: "Intermodal proof",
    body: "Airport, rail, port, vessel, terminal, baggage and onward mobility become one guided journey.",
    icon: "waypoints",
  },
  {
    title: "MCT and recovery",
    body: "Broken or tightening connections are detected before passengers move the wrong way.",
    icon: "radar",
  },
  {
    title: "Baggage processing",
    body: "Baggage status changes flow, queue timing, staff readiness and transfer release.",
    icon: "baggage",
  },
] satisfies Array<{ title: string; body: string; icon: IconKey }>;

export const missingLayer = [
  {
    title: "Maritime operations",
    body: "Vessel timing, berth context, boarding windows and disruption state.",
    icon: "ship",
  },
  {
    title: "Terminal activity",
    body: "Zone, queue, baggage, check-in and staff-ready information.",
    icon: "users",
  },
  {
    title: "Passenger flow",
    body: "Where passenger groups are, what they need next and which route is safest.",
    icon: "route",
  },
  {
    title: "Baggage status",
    body: "Baggage drop, reclaim readiness and release timing that affect passenger movement.",
    icon: "baggage",
  },
  {
    title: "Intermodal transport",
    body: "Airport, rail, coach, taxi and city access signals that affect the journey.",
    icon: "network",
  },
] satisfies Array<{ title: string; body: string; icon: IconKey }>;

export const signageFit = [
  {
    title: "The signage contractor",
    body: "Delivers the physical channels: screens, cabling, player infrastructure, installation and local support.",
  },
  {
    title: "The CMS",
    body: "Publishes approved content across the screen estate. It is the channel, not the intelligence.",
  },
  {
    title: "SmartSEA",
    body: "Acts as the real-time passenger decision layer behind any CMS or signage estate.",
  },
];

export const smartseaRole = {
  kicker: "The SmartSEA role",
  title: "The real-time passenger decision layer behind any CMS or signage estate.",
  subtitle:
    "SmartSEA is not positioned as a hardware, installation or CMS provider. Its USP is deciding the right passenger instruction from live operational context.",
  capabilities: [
    {
      title: "SmartSEA Intermodal APIs",
      body: "Turn maritime, airport, rail, terminal, baggage and mobility data into passenger decision services.",
      icon: "api",
    },
    {
      title: "Connected operations",
      body: "Connect operational signals so one data change updates passenger screens, staff action and transfer timing.",
      icon: "network",
    },
    {
      title: "Journey logic",
      body: "Structure passenger groups, zones, priorities and next actions so messages reflect the situation, not only screen location.",
      icon: "waypoints",
    },
    {
      title: "Passenger-ready output",
      body: "Translate live decisions into clear guidance for CMS channels, staff tools and future services.",
      icon: "monitor",
    },
  ],
} satisfies {
  kicker: string;
  title: string;
  subtitle: string;
  capabilities: Array<{ title: string; body: string; icon: IconKey }>;
};

export const practicalPath = [
  {
    title: "Identify priority situations",
    body: "Find where passengers need a decision, not another static sign.",
  },
  {
    title: "Map available data",
    body: "Confirm which maritime, airport, rail, terminal, baggage and mobility signals can drive the first decisions.",
  },
  {
    title: "Define first use cases",
    body: "Select high-impact services where live guidance reduces wrong movement, missed connections or crowding.",
  },
  {
    title: "Connect to the signage environment",
    body: "Feed the CMS through controlled APIs so screens publish SmartSEA decisions.",
  },
  {
    title: "Expand progressively",
    body: "Extend the same decision layer into staff tools, mobile handoffs and intermodal journey services.",
  },
];

export const engagementFocus = [
  {
    title: "Identify priority use cases",
    body: "Select the moments where better information would immediately reduce passenger uncertainty.",
  },
  {
    title: "Review available data sources",
    body: "Confirm the maritime, terminal, baggage and transport signals that can support the first services.",
  },
  {
    title: "Define first services to activate",
    body: "Move from infrastructure to value through a small number of controlled data services connected to the signage environment.",
  },
];

export const heroStats = [
  { value: "11", label: "curated intermodal itineraries" },
  { value: "3", label: "broken MCT connections" },
  { value: "337", label: "passengers at recovery risk" },
];

export const apiPillars = [
  {
    title: "Decision layer",
    body: "SmartSEA Intermodal APIs define what instruction should appear, where, when and for which passenger group.",
    icon: "api",
  },
  {
    title: "CMS and screens are channels",
    body: "The CMS publishes the message. SmartSEA decides the right message for the situation.",
    icon: "monitor",
  },
  {
    title: "MCT and recovery",
    body: "Connection risk, delays, congestion and operational changes become live recovery instructions instead of static directional content.",
    icon: "radar",
  },
  {
    title: "Intermodal proof",
    body: "The same passenger information layer connects terminal signage, staff tools, mobile handoffs and intermodal journey services.",
    icon: "shield",
  },
] satisfies Array<{ title: string; body: string; icon: IconKey }>;

export const apiProofGroups: ApiProofGroup[] = [
  {
    title: "Authorized schedules",
    source: "Transport network",
    body: "Airport, port, and rail schedules give PPA a trusted base for passenger guidance.",
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
    title: "Live movement updates",
    source: "Live operations",
    body: "ETA, status, gate, terminal, AIS, rail realtime, and service context keep instructions current.",
    endpoints: [
      "/airports/ATH/direction/{a|d}/dates/{start}/{end}",
      "/maritime/GRPIR/schedules/dates/{start}/{end}",
      "/rail/cities/Athens/stops/{stop}/schedule/realtime/dates/{start}/{end}",
    ],
    metric: "4 flight rows, 3 port calls, 3 rail trips in showcase snapshot",
    icon: "network",
  },
  {
    title: "Intermodal journeys",
    source: "Journey planning",
    body: "Cruise, rail, airport, and city legs are treated as one passenger journey instead of separate screen feeds.",
    endpoints: ["/intermodal/itineraries/dates/{start}/{end}"],
    metric: "11 curated journeys, including Air-Rail-Cruise chains",
    icon: "waypoints",
  },
  {
    title: "Connection risk",
    source: "Risk intelligence",
    body: "Minimum connection time checks show which groups are safe, at watch, high risk, or broken.",
    endpoints: ["/connection-risk/dates/{start}/{end}"],
    metric: "3 broken MCT checks, 359 passengers at risk",
    icon: "radar",
  },
  {
    title: "Recovery action",
    source: "Recovery guidance",
    body: "Recovery cards translate risk into an owner, action, confidence level, and passenger instruction.",
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
    headline: "Airport connection at risk: stop at Mobility Desk.",
    operatorNote:
      "SmartSEA combines the Piraeus cruise arrival, rail timing and flight deadline so PPA screens can stop the group before passengers take the wrong transfer.",
    instruction: {
      title: "PPA airport group: use Mobility Desk before rail transfer",
      body: "Rail arrival drift reduces the airport connection margin below the required 120 minutes. Hold the group at the PPA Mobility Desk and prepare the airport handoff.",
      action: "Recover now: PPA Mobility Desk",
    },
    outcomes: [
      {
        label: "Passenger result",
        value: "No guessing at Piraeus exit",
        body: "Airport-bound cruise passengers are stopped before they leave the PPA terminal on the wrong transfer path.",
      },
      {
        label: "Operator result",
        value: "PPA owns the handoff",
        body: "PPA Mobility Desk, rail and airport assistance receive the same action and timing context.",
      },
      {
        label: "Channel result",
        value: "PPA screen shows the decision",
        body: "The CMS publishes the SmartSEA instruction for Piraeus passengers, not a generic directional message.",
      },
    ],
    screens: [
      {
        zone: "PPA pre-arrival advisory",
        context: "Before Piraeus arrival",
        title: "Airport group: prepare for PPA guidance",
        instruction: "If flying from ATH this afternoon, keep luggage ready and follow PPA recovery guidance after disembarkation.",
        action: "Listen for PPA airport call",
        status: "Connection risk",
        time: "Updated 09:42",
        icon: "plane",
        format: "advisory",
      },
      {
        zone: "PPA Cruise Terminal exit",
        context: "Piraeus disembarkation",
        title: "Airport passengers: stop at PPA Mobility Desk",
        instruction: "Your Piraeus rail connection is no longer safe. PPA staff will move the group through recovery handling.",
        action: "PPA Mobility Desk",
        status: "Recovery active",
        time: "Updated 10:05",
        icon: "ship",
        format: "terminal",
      },
      {
        zone: "PPA transfer Bay 3",
        context: "Piraeus onward mobility",
        title: "Do not board M3 yet",
        instruction: "The PPA airport group is being rerouted. Coach standby and airport handoff options are being prepared.",
        action: "Wait at PPA Bay 3",
        status: "Hold transfer",
        time: "Updated 10:09",
        icon: "bus",
        format: "transfer",
      },
      {
        zone: "ATH assistance handoff",
        context: "PPA recovery handoff",
        title: "Piraeus EK209 group: assisted handling",
        instruction: "Your PPA-to-ATH connection is below minimum transfer time. Follow staff for the next feasible leg.",
        action: "Use assisted handoff",
        status: "Critical",
        time: "Updated 10:12",
        icon: "alert",
        format: "handoff",
      },
    ],
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
        value: "PPA cruise arrival confirmed",
        body: "The Piraeus cruise call anchors the PPA passenger movement chain.",
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
        body: "Piraeus-to-ATH buffer is 58 minutes against a 120 minute rule.",
      },
    ],
    steps: [
      {
        mode: "Maritime",
        time: "10:05",
        title: "Cruise arrival at PPA",
        detail: "Airport-bound group enters the Piraeus mobility flow.",
        state: "Arrived",
      },
      {
        mode: "Rail",
        time: "11:20",
        title: "Piraeus rail path to ATH",
        detail: "Realtime drift now affects the airport arrival window.",
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
    label: "Intermodal journey",
    status: "Watch window",
    severity: "notice",
    headline: "Flight + baggage + rail + cruise departure are treated as one journey.",
    operatorNote:
      "SmartSEA connects ATH arrival, baggage reclaim, rail timing, PPA terminal readiness and vessel departure so the same cruise group receives one protected route to Piraeus.",
    instruction: {
      title: "Piraeus cruise passengers: take direct rail",
      body: "The air-to-rail handoff is still feasible, but the PPA boarding buffer is tightening. Route passengers to the fastest Piraeus rail platform.",
      action: "Send to Piraeus rail",
    },
    outcomes: [
      {
        label: "Passenger result",
        value: "Piraeus path is obvious",
        body: "Cruise passengers leave ATH on the right Piraeus route instead of searching for port options.",
      },
      {
        label: "Operator result",
        value: "PPA terminal prepares early",
        body: "PPA sees the inbound group and opens the right check-in path before arrival.",
      },
      {
        label: "Channel result",
        value: "Journey stays aligned",
        body: "ATH, baggage, rail and PPA terminal screens publish one coordinated decision.",
      },
    ],
    screens: [
      {
        zone: "ATH arrivals: PPA cruise",
        context: "Flight arrival",
        title: "Piraeus cruise route remains protected",
        instruction: "Flight, baggage, rail and PPA cruise departure are linked. Use the marked Piraeus rail route after baggage reclaim.",
        action: "Follow Piraeus rail",
        status: "Watch window",
        time: "Updated 09:36",
        icon: "plane",
        format: "advisory",
      },
      {
        zone: "ATH baggage reclaim",
        context: "Bags and transfer",
        title: "Collect bags, then Piraeus rail",
        instruction: "Baggage readiness confirms the protected route to the PPA cruise terminal.",
        action: "Proceed to Piraeus rail",
        status: "On schedule",
        time: "Updated 09:44",
        icon: "baggage",
        format: "baggage",
      },
      {
        zone: "M3 to Piraeus",
        context: "Public transport",
        title: "Next direct service protects PPA boarding",
        instruction: "Board the next M3 service to Piraeus. Later services create a PPA boarding risk.",
        action: "Board next service",
        status: "Recommended",
        time: "Updated 10:02",
        icon: "train",
        format: "rail",
      },
      {
        zone: "PPA Cruise Terminal check-in",
        context: "Piraeus cruise terminal",
        title: "ATH flight group arriving by rail",
        instruction: "Prepare fast check-in lane for the inbound Piraeus rail group before the vessel boarding window tightens.",
        action: "Open assisted lane",
        status: "Inbound group",
        time: "Updated 10:18",
        icon: "ship",
        format: "terminal",
      },
    ],
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
        body: "ATH timing starts the Piraeus cruise decision chain.",
      },
      {
        label: "Baggage and rail",
        endpoint: "/rail/.../schedule/realtime",
        value: "Next feasible M3",
        body: "Baggage readiness and Piraeus rail timing determine the protected route.",
      },
      {
        label: "Vessel and terminal",
        endpoint: "/maritime/GRPIR/schedules",
        value: "Departure still protected",
        body: "PPA terminal readiness and vessel departure provide the final transfer deadline.",
      },
    ],
    steps: [
      {
        mode: "Air",
        time: "09:35",
        title: "ATH inbound arrival",
        detail: "PPA cruise passenger group lands with checked bags.",
        state: "Expected",
      },
      {
        mode: "Rail",
        time: "10:12",
        title: "ATH to Piraeus rail",
        detail: "Fastest feasible public transport leg to PPA.",
        state: "On time",
      },
      {
        mode: "Maritime",
        time: "13:05",
        title: "PPA cruise departure",
        detail: "Piraeus boarding buffer remains positive but monitored.",
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
    headline: "A Piraeus rail delay becomes a PPA movement decision.",
    operatorNote:
      "A rail delay becomes a PPA movement decision: split airport passengers early and send them to the protected transfer bay before the terminal exit crowds.",
    instruction: {
      title: "PPA airport-bound passengers: move now to Bay 3",
      body: "Piraeus rail drift creates a tight transfer. Prioritize airport passengers and direct them to the fastest onward option.",
      action: "Prioritize PPA airport group",
    },
    outcomes: [
      {
        label: "Passenger result",
        value: "No Piraeus platform confusion",
        body: "Passengers see a concrete PPA bay instruction instead of a generic rail delay notice.",
      },
      {
        label: "Operator result",
        value: "Flow is split early",
        body: "Airport passengers are separated before the rail delay creates congestion at the PPA exit.",
      },
      {
        label: "Channel result",
        value: "PPA screens guide movement",
        body: "Terminal, curb, and staff displays all point to the same Piraeus recovery route.",
      },
    ],
    screens: [
      {
        zone: "PPA terminal hall",
        context: "Passenger flow",
        title: "Airport group move now",
        instruction: "Piraeus metro timing is tight. Airport passengers should leave the hall and use PPA transfer Bay 3.",
        action: "Move to PPA Bay 3",
        status: "Priority movement",
        time: "Updated 10:40",
        icon: "users",
        format: "terminal",
      },
      {
        zone: "PPA transfer Bay 3",
        context: "Curbside",
        title: "Bay 3 is the ATH route",
        instruction: "Airport coach is now the fastest protected option. City passengers continue toward Piraeus metro.",
        action: "Board airport coach",
        status: "Active route",
        time: "Updated 10:43",
        icon: "bus",
        format: "transfer",
      },
      {
        zone: "Piraeus rail concourse",
        context: "Realtime rail",
        title: "M3 delay: use PPA coach for ATH",
        instruction: "The next M3 arrival no longer protects PPA-to-airport transfer times.",
        action: "Use PPA coach Bay 3",
        status: "Rail delay",
        time: "Updated 10:45",
        icon: "train",
        format: "rail",
      },
      {
        zone: "ATH assistance desk",
        context: "Arrival protection",
        title: "PPA group arriving by coach",
        instruction: "Prepare assistance for passengers arriving from PPA transfer Bay 3.",
        action: "Meet coach group",
        status: "Protected",
        time: "Updated 11:20",
        icon: "plane",
        format: "handoff",
      },
    ],
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
        body: "Piraeus rail delay appears as estimated time movement and service alert context.",
      },
      {
        label: "Itinerary",
        endpoint: "/intermodal/itineraries",
        value: "Rail leg linked",
        body: "The affected rail trip is part of a monitored PPA passenger journey.",
      },
      {
        label: "Recovery",
        endpoint: "/ai/recovery-copilot",
        value: "PPA owner assigned",
        body: "The platform suggests which PPA role should act, not only what changed.",
      },
    ],
    steps: [
      {
        mode: "Port",
        time: "10:40",
        title: "Passengers leave PPA terminal",
        detail: "Group is routed by onward destination at Piraeus.",
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
        title: "ATH connection protected",
        detail: "PPA coach recovery option is prepared.",
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
    headline: "One PPA vessel ETA change retimes baggage, transfer release and passenger movement.",
    operatorNote:
      "Baggage status becomes a SmartSEA decision signal for PPA: it changes queue timing, coach dispatch, taxi flow and city transfer guidance before crowds build up.",
    instruction: {
      title: "Delay PPA landside dispatch by 20 minutes",
      body: "The vessel arrival estimate moved. Keep transfer vehicles staged at Piraeus and update passenger screens when disembarkation is confirmed.",
      action: "Hold PPA transfer release",
    },
    outcomes: [
      {
        label: "Passenger result",
        value: "Wait is explained",
        body: "Passengers see why PPA transfers are held instead of crowding the curb early.",
      },
      {
        label: "Operator result",
        value: "Curb pressure avoided",
        body: "PPA baggage, coach, taxi and terminal release times move together with the vessel ETA.",
      },
      {
        label: "Channel result",
        value: "Timing stays consistent",
        body: "Every passenger-facing channel reflects the same retimed arrival plan.",
      },
    ],
    screens: [
      {
        zone: "PPA disembarkation lounge",
        context: "Vessel ETA",
        title: "Arrival shifted by 20 minutes",
        instruction: "Please remain in the PPA lounge. Transfer release will update when disembarkation is confirmed.",
        action: "Wait for exit call",
        status: "Retimed",
        time: "Updated 08:50",
        icon: "ship",
        format: "terminal",
      },
      {
        zone: "PPA baggage hall",
        context: "Baggage timing",
        title: "Baggage release starts later",
        instruction: "Bags will be released after the PPA clearance update. Do not queue at belts yet.",
        action: "Stay in waiting area",
        status: "Held",
        time: "Updated 09:02",
        icon: "baggage",
        format: "baggage",
      },
      {
        zone: "PPA coach staging",
        context: "Transfer dispatch",
        title: "PPA transfers held in staging",
        instruction: "Airport and city vehicles remain staged until PPA passenger release is confirmed.",
        action: "Hold boarding",
        status: "Staged",
        time: "Updated 09:10",
        icon: "bus",
        format: "transfer",
      },
      {
        zone: "PPA city transfer point",
        context: "Onward mobility",
        title: "New departure time posted",
        instruction: "Piraeus city and airport transfer screens will update again when exit flow opens.",
        action: "Use updated time",
        status: "Ready",
        time: "Updated 09:25",
        icon: "map",
        format: "advisory",
      },
    ],
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
        body: "PPA arrival timing changes before passengers reach the curb.",
      },
      {
        label: "Baggage and mobility",
        endpoint: "/rail + mobility",
        value: "Connections recalculated",
        body: "PPA baggage readiness, rail and road instructions update from the same timing change.",
      },
      {
        label: "Publishing channels",
        endpoint: "CMS / mobile / staff",
        value: "Same guidance",
        body: "PPA screens are channels for a decision already made by the API layer.",
      },
    ],
    steps: [
      {
        mode: "Vessel",
        time: "08:50",
        title: "Arrival estimate moves",
        detail: "AIS-derived ETA shifts PPA passenger readiness.",
        state: "+20 min",
      },
      {
        mode: "Terminal",
        time: "09:10",
        title: "PPA baggage and exit flow retimed",
        detail: "Do not trigger crowding at the exit.",
        state: "Held",
      },
      {
        mode: "Mobility",
        time: "09:25",
        title: "PPA transfers released later",
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
    headline: "One PPA data change updates passenger screens, staff action and transfer timing.",
    operatorNote:
      "The USP is the handoff from alert to action: SmartSEA assigns a PPA recovery owner and passengers see one clear route.",
    instruction: {
      title: "Recover PPA airport group now",
      body: "Predicted lost connection from a negative MCT margin. Move the affected PPA group to assisted handling and prepare the next feasible leg.",
      action: "Prepare next feasible leg",
    },
    outcomes: [
      {
        label: "Passenger result",
        value: "A new plan replaces panic",
        body: "The affected PPA group receives one clear route to assisted handling.",
      },
      {
        label: "Operator result",
        value: "Action is owned",
        body: "PPA Mobility Desk, airport and rail desks know who owns recovery before passengers arrive.",
      },
      {
        label: "Channel result",
        value: "Same message everywhere",
        body: "PPA screens, staff tools, and mobile views carry the same recovery instruction.",
      },
    ],
    screens: [
      {
        zone: "PPA terminal screen",
        context: "Group handling",
        title: "PPA airport group: assisted handling now",
        instruction: "Your onward connection needs support. Follow PPA staff to the recovery point before transfer.",
        action: "Go to PPA help point",
        status: "Critical",
        time: "Updated now",
        icon: "alert",
        format: "terminal",
      },
      {
        zone: "PPA staff desk",
        context: "Operator action",
        title: "PPA Mobility Desk owns recovery",
        instruction: "Move 78 passengers to assisted transfer and coordinate airport + rail handoff.",
        action: "Start PPA recovery",
        status: "Owner assigned",
        time: "+1 min",
        icon: "shield",
        format: "staff",
      },
      {
        zone: "PPA transfer corridor",
        context: "Movement",
        title: "Airport group use PPA assisted route",
        instruction: "Do not join the general transfer queue. PPA staff will escort the group to recovery transport.",
        action: "Follow PPA assisted route",
        status: "Live guidance",
        time: "+2 min",
        icon: "route",
        format: "transfer",
      },
      {
        zone: "PPA mobile handoff",
        context: "Passenger follow-up",
        title: "New transfer under preparation",
        instruction: "Your next feasible Piraeus-to-ATH leg is being prepared. Keep this screen open for updates.",
        action: "Await new time",
        status: "Rebooking",
        time: "+3 min",
        icon: "monitor",
        format: "mobile",
      },
    ],
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
        body: "The PPA-to-ATH connection is below the required minimum connection time.",
      },
      {
        label: "Passenger impact",
        endpoint: "/intermodal/itineraries",
        value: "78 passengers",
        body: "The action is tied to a PPA passenger group, not only an operation row.",
      },
      {
        label: "Recovery card",
        endpoint: "/ai/recovery-copilot",
        value: "PPA Mobility Desk",
        body: "Owner hint and recommended action are generated for PPA downstream tools.",
      },
    ],
    steps: [
      {
        mode: "Detect",
        time: "Now",
        title: "PPA connection turns Broken",
        detail: "Risk API computes the MCT failure.",
        state: "Critical",
      },
      {
        mode: "Decide",
        time: "+1 min",
        title: "PPA recovery owner assigned",
        detail: "PPA Mobility Desk prepares the airport and rail handoff.",
        state: "Owned",
      },
      {
        mode: "Guide",
        time: "+2 min",
        title: "PPA passenger instruction published",
        detail: "PPA screens, mobile, and staff tools share the same action.",
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
    src: "assets/references/copenhagen-malmo-port-reference.svg",
    source: "User-provided reference visual",
  },
  {
    title: "Carnival Cruise Line screen reference",
    body: "A cruise passenger information surface that proves the channel pattern for boarding, service, and wayfinding communications.",
    src: "assets/references/carnival-cruise-line-screen.png",
    source: "Supporting cruise reference",
  },
  {
    title: "Cruise journey context",
    body: "Cruise imagery anchors the PPA use case around passenger movement, timing, and intermodal handoff rather than generic signage.",
    src: "assets/references/cruise-ship-reference.jpg",
    source: "Supporting cruise reference",
  },
  {
    title: "Geneva transit widget",
    body: "Transport widget example combining service departures, local context, and photo guidance for a clear passenger decision point.",
    src: "assets/references/geneva-transit-widget-split.png",
    source: "Supporting transport widget image",
  },
  {
    title: "Geneva live departures",
    body: "Wide passenger widget pattern for rail, bus, tram, weather, and local movement updates.",
    src: "assets/references/geneva-transit-widget-wide.png",
    source: "Supporting transport widget image",
  },
  {
    title: "Piraeus ARYA content template",
    body: "Port template reference for a SmartSEA/PPA-style journey screen where the API layer can drive the visible instruction.",
    src: "assets/references/piraeus-arya-template.png",
    source: "Piraeus transport brief",
  },
  {
    title: "Baggage and FIDS reference",
    body: "Airport arrivals and baggage information show how transport APIs can connect onward guidance after disembarkation.",
    src: "assets/references/baggage-fids-reference.jpg",
    source: "Supporting baggage/FIDS image",
  },
  {
    title: "Transport widget reference grid",
    body: "Widget library evidence for turning transport API signals into designed passenger-facing modules.",
    src: "assets/references/transport-widget-reference-grid.png",
    source: "Transport widget deck",
  },
];
