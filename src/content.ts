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
    body: "SmartSEA Intermodal APIs turn port, rail, airport, vessel, event, and disruption updates into decisions PPA can act on.",
    icon: "api",
  },
  {
    title: "CMS and screens are channels",
    body: "The same decision can feed terminal screens, staff tools, mobile, web, audio, and future channels without changing the story.",
    icon: "monitor",
  },
  {
    title: "Connection risk becomes visible",
    body: "PPA sees which passenger groups are close to missing a transfer before confusion reaches the terminal floor.",
    icon: "radar",
  },
  {
    title: "Recovery action is generated",
    body: "When the journey breaks, operators get the next action and passengers see a clear instruction on the nearest channel.",
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
    headline: "Cruise passengers are predicted to miss the airport connection.",
    operatorNote:
      "SmartSEA combines the cruise arrival, rail timing, and flight deadline so staff can stop the group before passengers take the wrong transfer.",
    instruction: {
      title: "Airport passengers: use recovery desk before rail transfer",
      body: "Rail arrival drift reduces the airport connection margin below the required 120 minutes. Hold the group at the port mobility desk and prepare rebooking.",
      action: "Recover now: Airport + rail desk",
    },
    outcomes: [
      {
        label: "Passenger result",
        value: "No guessing at the exit",
        body: "Airport-bound passengers are stopped before they enter the wrong transfer path.",
      },
      {
        label: "Operator result",
        value: "One recovery owner",
        body: "Airport and rail desks receive the same action and timing context.",
      },
      {
        label: "Channel result",
        value: "Screens become useful",
        body: "The CMS publishes the decision, not a static directional message.",
      },
    ],
    screens: [
      {
        zone: "Hotel / trip mirror",
        context: "Before arrival",
        title: "Airport connection is at risk",
        instruction: "If flying this afternoon, keep luggage ready and follow port recovery guidance on arrival.",
        action: "Watch for airport group call",
        status: "Connection risk",
        time: "Updated 09:42",
        icon: "plane",
      },
      {
        zone: "Port exit screen",
        context: "Disembarkation",
        title: "Airport passengers: stop at Mobility Desk",
        instruction: "Your rail connection is no longer safe. Staff will move the group through recovery handling.",
        action: "Go to Mobility Desk",
        status: "Recovery active",
        time: "Updated 10:05",
        icon: "ship",
      },
      {
        zone: "Transfer bay",
        context: "Onward mobility",
        title: "Do not board M3 yet",
        instruction: "Airport group is being rerouted. Coach standby and rebooking options are being prepared.",
        action: "Wait at Bay 3",
        status: "Hold transfer",
        time: "Updated 10:09",
        icon: "bus",
      },
      {
        zone: "Airport help point",
        context: "Recovery",
        title: "EK209 passengers: assisted handling",
        instruction: "Your connection is below minimum transfer time. Follow staff for the next feasible leg.",
        action: "Use assisted desk",
        status: "Critical",
        time: "Updated 10:12",
        icon: "alert",
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
      "The airport and port show the same route advice, so cruise passengers can leave baggage reclaim on the fastest protected path.",
    instruction: {
      title: "Cruise passengers: take direct rail to Piraeus",
      body: "The air-to-rail handoff is still feasible, but the port departure buffer is tightening. Route passengers to the fastest rail platform.",
      action: "Send to airport rail platform",
    },
    outcomes: [
      {
        label: "Passenger result",
        value: "Fastest path is obvious",
        body: "Cruise passengers leave the airport on the right rail path instead of searching for port options.",
      },
      {
        label: "Operator result",
        value: "Transfer remains protected",
        body: "The port sees the inbound group and knows whether the boarding buffer is still safe.",
      },
      {
        label: "Channel result",
        value: "Airport and port align",
        body: "The same instruction can appear at baggage, rail, and terminal gate screens.",
      },
    ],
    screens: [
      {
        zone: "ATH arrivals",
        context: "Flight arrival",
        title: "Cruise passengers: follow Piraeus rail",
        instruction: "Your port transfer remains feasible. Use the marked rail route after baggage reclaim.",
        action: "Follow Piraeus rail",
        status: "Watch window",
        time: "Updated 09:36",
        icon: "plane",
      },
      {
        zone: "Baggage reclaim",
        context: "Bags and transfer",
        title: "Collect bags, then Platform M3",
        instruction: "The direct airport rail service protects your cruise boarding time.",
        action: "Proceed to M3",
        status: "On schedule",
        time: "Updated 09:44",
        icon: "baggage",
      },
      {
        zone: "Rail platform",
        context: "Public transport",
        title: "Next direct service protects boarding",
        instruction: "Board the next M3 service to Piraeus. Later services create a transfer risk.",
        action: "Board next service",
        status: "Recommended",
        time: "Updated 10:02",
        icon: "train",
      },
      {
        zone: "Port check-in",
        context: "Cruise terminal",
        title: "Flight group arriving from ATH",
        instruction: "Prepare fast check-in lane for the inbound rail group.",
        action: "Open assisted lane",
        status: "Inbound group",
        time: "Updated 10:18",
        icon: "ship",
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
      "A rail delay becomes a movement decision: split airport passengers early and send them to the protected transfer bay.",
    instruction: {
      title: "Airport-bound passengers: move now to Bay 3",
      body: "Rail drift creates a tight transfer. Prioritize airport passengers and direct them to the fastest onward option.",
      action: "Prioritize airport group movement",
    },
    outcomes: [
      {
        label: "Passenger result",
        value: "No platform confusion",
        body: "Passengers see a concrete bay instruction instead of a generic delay notice.",
      },
      {
        label: "Operator result",
        value: "Flow is split early",
        body: "Airport passengers are separated before the delay creates congestion.",
      },
      {
        label: "Channel result",
        value: "Screens guide movement",
        body: "Terminal, curb, and staff displays all point to the same recovery route.",
      },
    ],
    screens: [
      {
        zone: "Terminal hall",
        context: "Passenger flow",
        title: "Airport group move now",
        instruction: "Metro timing is tight. Airport passengers should leave the hall and use transfer Bay 3.",
        action: "Move to Bay 3",
        status: "Priority movement",
        time: "Updated 10:40",
        icon: "users",
      },
      {
        zone: "Transfer bay",
        context: "Curbside",
        title: "Bay 3 is the airport route",
        instruction: "Airport coach is now the fastest protected option. Rail passengers for the city continue to metro.",
        action: "Board airport coach",
        status: "Active route",
        time: "Updated 10:43",
        icon: "bus",
      },
      {
        zone: "Rail concourse",
        context: "Realtime rail",
        title: "Metro delay: use coach for airport",
        instruction: "The next M3 arrival no longer protects airport transfer times.",
        action: "Use coach Bay 3",
        status: "Rail delay",
        time: "Updated 10:45",
        icon: "train",
      },
      {
        zone: "Airport terminal",
        context: "Arrival protection",
        title: "Port group arriving by coach",
        instruction: "Prepare assistance for passengers arriving from Piraeus transfer Bay 3.",
        action: "Meet coach group",
        status: "Protected",
        time: "Updated 11:20",
        icon: "plane",
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
      "A changed vessel arrival time retimes baggage, coach dispatch, taxi flow, and city transfer guidance before crowds build up.",
    instruction: {
      title: "Delay landside transfer dispatch by 20 minutes",
      body: "The vessel arrival estimate moved. Keep transfer vehicles staged and update passenger screens when disembarkation is confirmed.",
      action: "Hold transfer release",
    },
    outcomes: [
      {
        label: "Passenger result",
        value: "Wait is explained",
        body: "Passengers see why transfers are held instead of crowding the curb early.",
      },
      {
        label: "Operator result",
        value: "Curb pressure avoided",
        body: "Baggage, coach, and taxi release times move together with the vessel ETA.",
      },
      {
        label: "Channel result",
        value: "Timing stays consistent",
        body: "Every passenger-facing channel reflects the same retimed arrival plan.",
      },
    ],
    screens: [
      {
        zone: "Disembarkation lounge",
        context: "Vessel ETA",
        title: "Arrival shifted by 20 minutes",
        instruction: "Please remain in the lounge. Transfer release will update when disembarkation is confirmed.",
        action: "Wait for exit call",
        status: "Retimed",
        time: "Updated 08:50",
        icon: "ship",
      },
      {
        zone: "Baggage hall",
        context: "Baggage timing",
        title: "Baggage release starts later",
        instruction: "Bags will be released after the vessel clearance update. Do not queue at belts yet.",
        action: "Stay in waiting area",
        status: "Held",
        time: "Updated 09:02",
        icon: "baggage",
      },
      {
        zone: "Coach bay",
        context: "Transfer dispatch",
        title: "Transfers held in staging",
        instruction: "Airport and city vehicles remain staged until passenger release is confirmed.",
        action: "Hold boarding",
        status: "Staged",
        time: "Updated 09:10",
        icon: "bus",
      },
      {
        zone: "City transfer",
        context: "Onward mobility",
        title: "New departure time posted",
        instruction: "City and airport transfer screens will update again when exit flow opens.",
        action: "Use updated time",
        status: "Ready",
        time: "Updated 09:25",
        icon: "map",
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
      "The value is the handoff from alert to action: staff see ownership and passengers see one clear recovery route.",
    instruction: {
      title: "Recover INT-20260427-002 now",
      body: "Predicted lost connection from a negative MCT margin. Move the affected group to assisted handling and prepare the next feasible leg.",
      action: "Rebook to next feasible leg",
    },
    outcomes: [
      {
        label: "Passenger result",
        value: "A new plan replaces panic",
        body: "The affected group receives one clear route to assisted handling.",
      },
      {
        label: "Operator result",
        value: "Action is owned",
        body: "Airport and rail desks know they own the recovery before passengers arrive.",
      },
      {
        label: "Channel result",
        value: "Same message everywhere",
        body: "Screens, staff tools, and mobile views carry the same recovery instruction.",
      },
    ],
    screens: [
      {
        zone: "Terminal screen",
        context: "Group handling",
        title: "Airport passengers: assisted handling now",
        instruction: "Your onward connection needs support. Follow staff to the recovery point before transfer.",
        action: "Go to help point",
        status: "Critical",
        time: "Updated now",
        icon: "alert",
      },
      {
        zone: "Staff desk",
        context: "Operator action",
        title: "Airport + rail desk owns recovery",
        instruction: "Move 78 passengers to assisted transfer and prepare the next feasible leg.",
        action: "Start recovery",
        status: "Owner assigned",
        time: "+1 min",
        icon: "shield",
      },
      {
        zone: "Transfer corridor",
        context: "Movement",
        title: "Airport group use assisted route",
        instruction: "Do not join general transfer queue. Staff will escort the group to recovery transport.",
        action: "Follow assisted route",
        status: "Live guidance",
        time: "+2 min",
        icon: "route",
      },
      {
        zone: "Mobile / QR handoff",
        context: "Passenger follow-up",
        title: "New transfer under preparation",
        instruction: "Your next feasible leg is being prepared. Keep this screen open for updates.",
        action: "Await new time",
        status: "Rebooking",
        time: "+3 min",
        icon: "monitor",
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
