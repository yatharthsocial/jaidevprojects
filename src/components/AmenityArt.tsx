// Illustrations for every amenity. All share one
// style: a warm dark stage, white line work and copper accents taken from the
// building's facade, so they sit naturally beside the photographic renders.

export type ArtName = "power" | "parking" | "fire" | "drop" | "tiles" | "lift" | "rain" | "lobby" | "cctv" | "stp";

const INK = "#f4f1ea";
const BODY = "#2b2a26";
const DEEP = "#1d1c19";
const COPPER = "#d6955a";
const WATER = "#5ea3cc";
const RED = "#c4513b";

const line = {
  stroke: INK,
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export default function AmenityArt({ name }: { name: ArtName }) {
  const id = `art-${name}`;
  return (
    <svg viewBox="0 0 400 480" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id={`${id}-bg`} cx="50%" cy="42%" r="70%">
          <stop offset="0" stopColor="#3b352d" />
          <stop offset="1" stopColor="#191816" />
        </radialGradient>
        <linearGradient id={`${id}-floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#24221f" />
          <stop offset="1" stopColor="#141412" />
        </linearGradient>
        <linearGradient id={`${id}-cone`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={COPPER} stopOpacity="0.45" />
          <stop offset="1" stopColor={COPPER} stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="400" height="480" fill={`url(#${id}-bg)`} />
      <rect y="362" width="400" height="118" fill={`url(#${id}-floor)`} />
      <path d="M0 362H400" stroke={INK} strokeOpacity="0.12" />
      {[60, 140, 260, 340].map((x) => (
        <path key={x} d={`M200 362L${(x - 200) * 3 + 200} 480`} stroke={INK} strokeOpacity="0.05" />
      ))}
      <ellipse cx="200" cy="364" rx="150" ry="12" fill="#000" opacity="0.35" />

      {name === "power" && <Generator />}
      {name === "parking" && <Parking />}
      {name === "fire" && <Fire />}
      {name === "drop" && <Water />}
      {name === "tiles" && <Tiles id={id} />}
      {name === "lift" && <Lift />}
      {name === "rain" && <Rain />}
      {name === "lobby" && <Lobby />}
      {name === "cctv" && <Cctv cone={`url(#${id}-cone)`} />}
      {name === "stp" && <Stp />}
    </svg>
  );
}

function Generator() {
  return (
    <g {...line}>
      {/* Exhaust and a wisp of heat */}
      <path d="M262 202V168h20v14" fill={DEEP} />
      <path d="M272 158c-8-10 8-16 0-28M286 150c-6-8 6-12 0-22" strokeOpacity="0.35" fill="none" />
      {/* Housing */}
      <rect x="104" y="198" width="192" height="20" rx="5" fill={BODY} />
      <rect x="92" y="216" width="216" height="144" rx="12" fill={BODY} />
      {[240, 256, 272, 288, 304, 320, 336].map((y) => (
        <path key={y} d={`M116 ${y}h78`} strokeOpacity="0.55" />
      ))}
      {/* Control panel */}
      <rect x="212" y="236" width="76" height="56" rx="6" fill={DEEP} />
      <circle cx="234" cy="264" r="12" fill="none" />
      <path d="M234 264l7-6" />
      <circle cx="262" cy="254" r="3.5" fill="#7fc48a" stroke="none" />
      <circle cx="276" cy="254" r="3.5" fill={COPPER} stroke="none" />
      <path d="M256 274h24M256 282h16" strokeOpacity="0.55" />
      {/* Power badge */}
      <circle cx="250" cy="326" r="18" fill={COPPER} stroke="none" />
      <path d="M253 313l-10 15h8l-3 12 10-16h-8z" fill={INK} stroke="none" />
      {/* Feet and cable to the outlet */}
      <rect x="110" y="358" width="34" height="6" rx="2" fill={DEEP} />
      <rect x="256" y="358" width="34" height="6" rx="2" fill={DEEP} />
      <path d="M308 330c26 0 30 22 48 22s14-40 14-54" fill="none" strokeOpacity="0.8" />
      <rect x="356" y="268" width="28" height="34" rx="5" fill={BODY} />
      <path d="M366 280v8M374 280v8" />
    </g>
  );
}

function Parking() {
  return (
    <g {...line}>
      {/* Bay markings */}
      <path d="M60 480L118 362M340 480L282 362" stroke={INK} strokeOpacity="0.5" strokeDasharray="10 10" />
      {/* Sign */}
      <path d="M352 362V200" />
      <rect x="326" y="148" width="52" height="52" rx="10" fill={COPPER} stroke="none" />
      <path d="M344 186v-26h9a8 8 0 0 1 0 16h-9" stroke={INK} strokeWidth="4" fill="none" />
      {/* Car */}
      <path
        d="M70 342L74 306Q78 294 94 291L138 287L166 258Q172 252 182 252L246 252Q258 252 266 260L292 287L314 291Q326 294 326 308L326 342Z"
        fill={BODY}
      />
      <path d="M174 287L192 264H226V287Z" fill="#3e4c56" />
      <path d="M234 264H252Q258 264 262 270L276 287H234Z" fill="#3e4c56" />
      <path d="M150 300h150" strokeOpacity="0.35" />
      <rect x="312" y="302" width="12" height="8" rx="3" fill={COPPER} stroke="none" />
      <rect x="72" y="304" width="10" height="8" rx="3" fill={RED} stroke="none" />
      {[124, 278].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="344" r="22" fill="#121211" />
          <circle cx={cx} cy="344" r="9" fill={BODY} />
        </g>
      ))}
    </g>
  );
}

function Fire() {
  return (
    <g {...line}>
      {/* Ceiling sprinkler */}
      <path d="M292 0V60M276 66h32" />
      <path d="M286 74L254 146M292 76V150M298 74L330 146" strokeOpacity="0.45" strokeDasharray="4 8" />
      {/* Alarm bell */}
      <circle cx="292" cy="214" r="28" fill={BODY} />
      <circle cx="292" cy="214" r="14" fill={RED} stroke="none" />
      <path d="M330 196a40 40 0 0 1 0 36M342 186a56 56 0 0 1 0 56" strokeOpacity="0.5" fill="none" />
      {/* Extinguisher */}
      <path d="M150 196h46l14-10" fill="none" />
      <rect x="164" y="196" width="24" height="22" rx="4" fill={DEEP} />
      <path d="M186 206Q232 208 230 250Q228 280 210 292" fill="none" />
      <rect x="140" y="214" width="72" height="148" rx="30" fill={RED} />
      <rect x="148" y="268" width="56" height="38" rx="6" fill={INK} stroke="none" opacity="0.92" />
      <path d="M176 296c-10 0-12-10-6-16 0 6 4 6 4 2 0-6 6-8 6-14 6 6 10 12 6 22-2 4-6 6-10 6z" fill={RED} stroke="none" />
    </g>
  );
}

function Water() {
  return (
    <g {...line}>
      {/* Tank on its stand */}
      <path d="M134 232L122 362M266 232L278 362M128 300H272M130 290L270 246" strokeOpacity="0.8" fill="none" />
      <rect x="116" y="104" width="168" height="128" rx="12" fill={BODY} />
      <ellipse cx="200" cy="104" rx="84" ry="15" fill="#34322d" />
      <path d="M116 150h168M116 192h168" strokeOpacity="0.35" />
      <rect x="262" y="122" width="10" height="96" rx="4" fill={DEEP} />
      <rect x="263" y="150" width="8" height="67" rx="3" fill={WATER} stroke="none" />
      <text x="190" y="182" textAnchor="middle" fill={INK} stroke="none" fontSize="30" fontWeight="600" letterSpacing="1">
        24/7
      </text>
      {/* Pipe, tap and drops */}
      <path d="M200 232V296H310V318" fill="none" strokeWidth="6" stroke="#4a4740" />
      <path d="M200 232V296H310V318" fill="none" />
      <rect x="296" y="316" width="28" height="12" rx="3" fill={COPPER} stroke="none" />
      <path d="M310 336c-6 8-6 14 0 14s6-6 0-14z" fill={WATER} stroke="none" />
      <ellipse cx="310" cy="362" rx="16" ry="3" fill={WATER} opacity="0.5" stroke="none" />
    </g>
  );
}

function Rain() {
  return (
    <g {...line}>
      {/* Cloud and rain */}
      <path d="M118 132a40 40 0 0 1 66-34 50 50 0 0 1 92 18 32 32 0 0 1 2 64H126a30 30 0 0 1-8-48z" fill="#302e29" />
      {[130, 160, 190, 220, 250].map((x, i) => (
        <path key={x} d={`M${x} ${196 + (i % 2) * 10}l-8 22`} stroke={WATER} strokeOpacity="0.9" />
      ))}
      {/* Roof, gutter and downpipe */}
      <path d="M30 262L120 230L170 248" fill="none" />
      <rect x="40" y="258" width="124" height="104" fill={BODY} />
      <path d="M58 290h28M58 316h28M108 290h28M108 316h28" strokeOpacity="0.4" />
      <path d="M164 254h24V320H222" fill="none" strokeWidth="6" stroke="#4a4740" />
      <path d="M164 254h24V320H222" fill="none" />
      {/* Storage tank */}
      <rect x="222" y="284" width="140" height="78" rx="10" fill={BODY} />
      <path d="M228 318c14-6 26 6 40 0s26 6 40 0 26 6 40 0v38H228z" fill={WATER} fillOpacity="0.55" stroke="none" />
      <circle cx="338" cy="300" r="9" fill={COPPER} stroke="none" />
      <path d="M334 300l3 3 5-6" stroke={INK} strokeWidth="2" fill="none" />
    </g>
  );
}

function Cctv({ cone }: { cone: string }) {
  return (
    <g {...line}>
      {/* Wall */}
      <rect width="70" height="362" fill="#24231f" stroke="none" />
      <path d="M70 0V362" strokeOpacity="0.3" />
      {/* View cone */}
      <path d="M244 176L400 300V480H290Z" fill={cone} stroke="none" />
      {/* Bracket and camera */}
      <path d="M70 136H118V164" fill="none" strokeWidth="8" stroke="#4a4740" />
      <g transform="rotate(20 170 160)">
        <rect x="104" y="136" width="132" height="48" rx="12" fill="#e9e6df" stroke={INK} />
        <path d="M98 132h146" strokeWidth="5" />
        <circle cx="236" cy="160" r="18" fill="#121211" stroke={INK} />
        <circle cx="236" cy="160" r="8" fill="#2d5c7a" stroke="none" />
        <circle cx="128" cy="152" r="4.5" fill={RED} stroke="none" />
      </g>
      <text x="96" y="236" fill={INK} stroke="none" fontSize="12" letterSpacing="3" opacity="0.6">
        REC 24/7
      </text>
    </g>
  );
}

function Stp() {
  return (
    <g {...line}>
      {/* Inflow */}
      <path d="M10 214H96V236" fill="none" strokeWidth="6" stroke="#4a4740" />
      <path d="M10 214H96V236" fill="none" />
      {/* Tanks */}
      {[
        { x: 56, fill: "#8a7550", op: 0.65 },
        { x: 224, fill: WATER, op: 0.6 },
      ].map((t) => (
        <g key={t.x}>
          <rect x={t.x} y="236" width="120" height="126" rx="10" fill={BODY} />
          <path
            d={`M${t.x + 6} 270c12-6 24 6 36 0s24 6 36 0 24 6 36 0v86H${t.x + 6}z`}
            fill={t.fill}
            fillOpacity={t.op}
            stroke="none"
          />
        </g>
      ))}
      {[84, 104, 124, 146].map((cx, i) => (
        <circle key={cx} cx={cx} cy={300 + (i % 2) * 22} r={3 + (i % 2)} fill="none" strokeOpacity="0.7" />
      ))}
      {/* Transfer and outflow */}
      <path d="M176 290H224" strokeWidth="6" stroke="#4a4740" />
      <path d="M176 290H216M208 282l8 8-8 8" fill="none" />
      <path d="M344 330H392" strokeWidth="6" stroke="#4a4740" />
      <path d="M344 330H384M376 322l8 8-8 8" fill="none" />
      {/* Clean water leaf */}
      <path d="M352 290c0-26 18-40 40-40 0 26-16 40-40 40z" fill="#7fae6b" stroke="none" />
      <path d="M356 286l26-26" stroke={DEEP} />
    </g>
  );
}

// Glossy floor in perspective, with a window's light reflected in it.
function Tiles({ id }: { id: string }) {
  const vx = 200;
  const vy = 120;
  const top = 200;
  const rows = [200, 214, 232, 256, 288, 330, 384, 452, 540];
  const cols = [-500, -300, -100, 100, 300, 500, 700, 900];
  const xAt = (xb: number, y: number) => vx + ((xb - vx) * (y - vy)) / (480 - vy);
  const cells = [];
  for (let r = 0; r < rows.length - 1; r++) {
    for (let c = 0; c < cols.length - 1; c++) {
      const [y0, y1] = [rows[r], rows[r + 1]];
      const pts = [
        [xAt(cols[c], y0), y0],
        [xAt(cols[c + 1], y0), y0],
        [xAt(cols[c + 1], y1), y1],
        [xAt(cols[c], y1), y1],
      ]
        .map((p) => p.join(","))
        .join(" ");
      cells.push(<polygon key={`${r}-${c}`} points={pts} fill={(r + c) % 2 ? "#33302b" : "#2a2824"} stroke={INK} strokeOpacity="0.18" />);
    }
  }
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-shine`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={INK} stopOpacity="0.32" />
          <stop offset="1" stopColor={INK} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Wall with a tall window */}
      <rect width="400" height={top} fill="#25231f" />
      <rect x="150" y="40" width="100" height="150" rx="4" fill="#3b4650" stroke={INK} strokeWidth="2" />
      <path d="M200 40V190M150 115H250" stroke={INK} strokeWidth="2" />
      <path d={`M0 ${top}H400`} stroke={COPPER} strokeWidth="3" />
      {cells}
      {/* Reflection of the window on the polished tiles */}
      <path d={`M150 ${top}L250 ${top}L300 480L100 480Z`} fill={`url(#${id}-shine)`} />
      <path d="M90 300l40-20M110 316l52-26" stroke={INK} strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

function Lift() {
  return (
    <g {...line}>
      {/* Floor indicator */}
      <rect x="158" y="62" width="84" height="34" rx="8" fill={DEEP} />
      <path d="M178 86l8-12 8 12z" fill={COPPER} stroke="none" />
      <text x="218" y="88" textAnchor="middle" fill={COPPER} stroke="none" fontSize="22" fontWeight="600">
        4
      </text>
      {/* Frame and doors */}
      <rect x="104" y="108" width="192" height="254" rx="6" fill={BODY} />
      <rect x="120" y="126" width="78" height="236" fill="#3a3832" />
      <rect x="202" y="126" width="78" height="236" fill="#3a3832" />
      <path d="M200 126V362" strokeWidth="3" />
      <path d="M136 140V350M264 140V350" strokeOpacity="0.18" />
      {/* Call buttons */}
      <rect x="312" y="218" width="30" height="66" rx="8" fill={BODY} />
      <circle cx="327" cy="238" r="8" fill={COPPER} stroke="none" />
      <path d="M323 240l4-5 4 5" stroke={INK} strokeWidth="1.6" fill="none" />
      <circle cx="327" cy="264" r="8" fill="none" />
      <path d="M323 262l4 5 4-5" strokeWidth="1.6" fill="none" />
    </g>
  );
}

function Lobby() {
  return (
    <g {...line}>
      {/* Framed art */}
      <rect x="62" y="112" width="112" height="76" rx="3" fill={DEEP} />
      <path d="M72 176l28-30 20 18 16-12 28 24" strokeOpacity="0.6" fill="none" />
      <circle cx="148" cy="134" r="8" fill={COPPER} stroke="none" />
      {/* Sofa */}
      <rect x="44" y="258" width="156" height="50" rx="14" fill="#3a3832" />
      <rect x="34" y="282" width="26" height="62" rx="10" fill={BODY} />
      <rect x="184" y="282" width="26" height="62" rx="10" fill={BODY} />
      <rect x="56" y="300" width="132" height="44" rx="8" fill={BODY} />
      <path d="M122 300v44" strokeOpacity="0.4" />
      <path d="M50 344v16M196 344v16" />
      {/* Floor lamp with warm glow */}
      <circle cx="252" cy="186" r="46" fill={COPPER} opacity="0.12" stroke="none" />
      <path d="M252 362V206M236 362h32" />
      <path d="M232 206h40l-8-34h-24z" fill={COPPER} />
      {/* Plant */}
      <path d="M326 322c-24-30-30-62-18-90M330 322c4-40 24-66 46-74M328 322c-6-36 0-70 14-92" stroke="#7fae6b" fill="none" />
      <ellipse cx="306" cy="236" rx="10" ry="20" transform="rotate(-20 306 236)" fill="#7fae6b" stroke="none" />
      <ellipse cx="372" cy="252" rx="10" ry="22" transform="rotate(50 372 252)" fill="#7fae6b" stroke="none" />
      <ellipse cx="342" cy="226" rx="9" ry="20" fill="#6e9a5c" stroke="none" />
      <rect x="306" y="318" width="46" height="44" rx="6" fill={COPPER} />
    </g>
  );
}
