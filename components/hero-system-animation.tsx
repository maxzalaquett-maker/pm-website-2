"use client";

import { useLayoutEffect, useRef } from "react";

import { gsap } from "gsap";

import { Card } from "@/components/card";

type Position = {
  x: number;
  y: number;
};

type FragmentSpec = {
  id: string;
  start: Position;
  end?: Position;
  scale: number;
  width: number;
  height: number;
  accent?: boolean;
  duplicate?: boolean;
};

type LooseNodeSpec = {
  id: string;
  start: Position;
  end: Position;
  accent?: boolean;
};

type ConnectorSpec = {
  id: string;
  from: Position;
  to: Position;
};

type ModuleAnchor = {
  id: string;
  x: number;
  y: number;
};

const VIEWBOX = {
  width: 420,
  height: 320,
} as const;

// Tune timing here to speed up or slow down the full 3-step narrative.
const TIMINGS = {
  fragmentation: 1.6,
  organization: 2.55,
  unification: 2.25,
  settle: 0.6,
  idlePulse: 2.4,
} as const;

// Tune complexity here for fewer/more fragments, nodes, and connector density.
const VISUAL = {
  nodeRadius: 8,
  nodeCount: 8,
  moduleCount: 4,
  frameOpacity: 0.92,
  messyConnectorOpacity: 0.34,
  cleanConnectorOpacity: 0.76,
  duplicateFadeScale: 0.84,
} as const;

// Tune the final platform layout here.
const ORGANIZING_FRAME = {
  x: 162,
  y: 44,
  width: 224,
  height: 172,
} as const;

const MODULE_ANCHORS: ModuleAnchor[] = [
  { id: "module-a", x: 184, y: 64 },
  { id: "module-b", x: 282, y: 64 },
  { id: "module-c", x: 184, y: 134 },
  { id: "module-d", x: 282, y: 134 },
];

const FRAGMENTS: FragmentSpec[] = [
  { id: "fragment-a", start: { x: 226, y: 26 }, end: MODULE_ANCHORS[0], scale: 0.92, width: 72, height: 46, accent: true },
  { id: "fragment-b", start: { x: 320, y: 22 }, end: MODULE_ANCHORS[1], scale: 0.9, width: 70, height: 44 },
  { id: "fragment-c", start: { x: 166, y: 92 }, end: MODULE_ANCHORS[2], scale: 0.88, width: 74, height: 48 },
  { id: "fragment-d", start: { x: 330, y: 106 }, end: MODULE_ANCHORS[3], scale: 0.9, width: 74, height: 46, accent: true },
  { id: "fragment-e", start: { x: 228, y: 170 }, scale: 0.72, width: 60, height: 36, duplicate: true },
  { id: "fragment-f", start: { x: 336, y: 180 }, scale: 0.7, width: 58, height: 34, duplicate: true },
  { id: "fragment-g", start: { x: 270, y: 108 }, scale: 0.68, width: 54, height: 32, duplicate: true },
];

const LOOSE_NODES: LooseNodeSpec[] = [
  { id: "node-a", start: { x: 178, y: 52 }, end: { x: 204, y: 112 }, accent: true },
  { id: "node-b", start: { x: 258, y: 46 }, end: { x: 236, y: 112 } },
  { id: "node-c", start: { x: 346, y: 74 }, end: { x: 300, y: 112 } },
  { id: "node-d", start: { x: 150, y: 150 }, end: { x: 236, y: 182 } },
  { id: "node-e", start: { x: 260, y: 198 }, end: { x: 300, y: 182 }, accent: true },
  { id: "node-f", start: { x: 360, y: 158 }, end: { x: 332, y: 182 } },
  { id: "node-g", start: { x: 310, y: 206 }, end: { x: 204, y: 182 } },
  { id: "node-h", start: { x: 204, y: 202 }, end: { x: 332, y: 112 } },
];

const MESSY_CONNECTORS: ConnectorSpec[] = [
  { id: "messy-a", from: { x: 264, y: 52 }, to: { x: 206, y: 126 } },
  { id: "messy-b", from: { x: 350, y: 44 }, to: { x: 272, y: 196 } },
  { id: "messy-c", from: { x: 200, y: 118 }, to: { x: 354, y: 192 } },
  { id: "messy-d", from: { x: 350, y: 130 }, to: { x: 180, y: 148 } },
  { id: "messy-e", from: { x: 256, y: 186 }, to: { x: 336, y: 86 } },
];

const CLEAN_CONNECTORS: ConnectorSpec[] = [
  { id: "clean-a", from: { x: 258, y: 91 }, to: { x: 282, y: 91 } },
  { id: "clean-b", from: { x: 258, y: 161 }, to: { x: 282, y: 161 } },
  { id: "clean-c", from: { x: 223, y: 118 }, to: { x: 223, y: 134 } },
  { id: "clean-d", from: { x: 321, y: 118 }, to: { x: 321, y: 134 } },
  { id: "clean-e", from: { x: 132, y: 176 }, to: { x: 168, y: 150 } },
];

const THOUGHT_DOTS = [
  { id: "thought-a", x: 142, y: 170, r: 5.5 },
  { id: "thought-b", x: 154, y: 150, r: 4.25 },
  { id: "thought-c", x: 168, y: 132, r: 3.2 },
] as const;

function nodeFill(accent?: boolean) {
  return accent ? "var(--accent)" : "var(--muted)";
}

export function HeroSystemAnimation() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const frameRef = useRef<SVGRectElement | null>(null);
  const fragmentRefs = useRef<Array<SVGGElement | null>>([]);
  const messyRefs = useRef<Array<SVGLineElement | null>>([]);
  const cleanRefs = useRef<Array<SVGLineElement | null>>([]);
  const nodeRefs = useRef<Array<SVGCircleElement | null>>([]);
  const thoughtDotRefs = useRef<Array<SVGCircleElement | null>>([]);

  useLayoutEffect(() => {
    if (!svgRef.current) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCompact = window.matchMedia("(max-width: 767px)").matches;

    const context = gsap.context(() => {
      const frame = frameRef.current;
      const fragments = fragmentRefs.current.filter(Boolean) as SVGGElement[];
      const duplicates = fragments.filter((_, index) => FRAGMENTS[index]?.duplicate);
      const messy = messyRefs.current.filter(Boolean) as SVGLineElement[];
      const clean = cleanRefs.current.filter(Boolean) as SVGLineElement[];
      const nodes = nodeRefs.current.filter(Boolean) as SVGCircleElement[];
      const thoughtDots = thoughtDotRefs.current.filter(Boolean) as SVGCircleElement[];

      clean.forEach((line) => {
        const length = line.getTotalLength();
        gsap.set(line, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 0,
        });
      });

      gsap.set(frame, { opacity: 0 });
      gsap.set(messy, { opacity: VISUAL.messyConnectorOpacity });
      gsap.set(thoughtDots, { opacity: 0.12 });

      FRAGMENTS.forEach((fragment, index) => {
        gsap.set(fragments[index], {
          x: fragment.start.x,
          y: fragment.start.y,
          scale: fragment.scale,
          rotation: fragment.duplicate ? (index % 2 === 0 ? -8 : 6) : index % 2 === 0 ? -4 : 4,
          transformOrigin: "50% 50%",
          opacity: isCompact && fragment.duplicate ? 0 : 1,
        });
      });

      LOOSE_NODES.forEach((node, index) => {
        gsap.set(nodes[index], {
          attr: { cx: node.start.x, cy: node.start.y },
          opacity: isCompact && index > 4 ? 0 : 0.94,
        });
      });

      const setFinalState = () => {
        gsap.set(frame, { opacity: VISUAL.frameOpacity });
        gsap.set(messy, { opacity: 0 });
        gsap.set(clean, { opacity: VISUAL.cleanConnectorOpacity, strokeDashoffset: 0 });
        gsap.set(thoughtDots, { opacity: 0.88 });

        FRAGMENTS.forEach((fragment, index) => {
          if (fragment.duplicate || !fragment.end) {
            gsap.set(fragments[index], { opacity: 0 });
            return;
          }

          gsap.set(fragments[index], {
            x: fragment.end.x,
            y: fragment.end.y,
            scale: 1,
            rotation: 0,
            opacity: 1,
          });
        });

        LOOSE_NODES.forEach((node, index) => {
          gsap.set(nodes[index], {
            attr: { cx: node.end.x, cy: node.end.y },
            opacity: 1,
          });
        });
      };

      if (reduceMotion) {
        setFinalState();
        return;
      }

      const timeline = gsap.timeline();

      timeline.to(
        messy,
        {
          opacity: VISUAL.messyConnectorOpacity,
          duration: TIMINGS.fragmentation * 0.25,
          ease: "sine.out",
        },
        0,
      );

      timeline.to(
        duplicates,
        {
          opacity: 0,
          scale: VISUAL.duplicateFadeScale,
          duration: TIMINGS.organization * 0.44,
          ease: "power2.inOut",
          stagger: 0.08,
        },
        1.45,
      );

      timeline.to(
        frame,
        {
          opacity: VISUAL.frameOpacity,
          duration: TIMINGS.organization * 0.42,
          ease: "sine.out",
        },
        2.0,
      );

      FRAGMENTS.forEach((fragment, index) => {
        if (fragment.duplicate || !fragment.end) {
          return;
        }

        timeline.to(
          fragments[index],
          {
            x: fragment.end.x,
            y: fragment.end.y,
            scale: 1,
            rotation: 0,
            duration: TIMINGS.organization,
            ease: "power3.inOut",
          },
          1.75 + index * 0.12,
        );
      });

      timeline.to(
        messy,
        {
          opacity: 0.04,
          duration: TIMINGS.organization * 0.4,
          ease: "sine.out",
        },
        2.2,
      );

      LOOSE_NODES.forEach((node, index) => {
        timeline.to(
          nodes[index],
          {
            attr: { cx: node.end.x, cy: node.end.y },
            duration: TIMINGS.unification,
            ease: "power3.inOut",
          },
          3.35 + index * 0.06,
        );
      });

      timeline.to(
        clean,
        {
          strokeDashoffset: 0,
          opacity: VISUAL.cleanConnectorOpacity,
          duration: TIMINGS.unification * 0.42,
          ease: "power2.out",
          stagger: 0.08,
        },
        4.4,
      );

      timeline.to(
        messy,
        {
          opacity: 0,
          duration: TIMINGS.unification * 0.28,
          ease: "sine.out",
        },
        4.65,
      );

      timeline.to(
        thoughtDots,
        {
          opacity: 0.88,
          duration: TIMINGS.unification * 0.34,
          ease: "sine.out",
          stagger: 0.08,
        },
        4.9,
      );

      timeline.to(
        [...fragments.filter((_, index) => !FRAGMENTS[index].duplicate), ...nodes],
        {
          y: "-=1.5",
          duration: TIMINGS.settle,
          ease: "sine.out",
          stagger: 0.012,
          yoyo: true,
          repeat: 1,
        },
        6.1,
      );

      timeline.call(() => {
        gsap.to(thoughtDots, {
          opacity: 0.5,
          duration: TIMINGS.idlePulse,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 0.2,
        });

        gsap.to(
          fragments.filter((_, index) => !FRAGMENTS[index].duplicate),
          {
            y: "-=1.4",
            duration: TIMINGS.idlePulse,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            stagger: 0.08,
          },
        );
      });
    }, svgRef);

    return () => context.revert();
  }, []);

  return (
    <Card className="hero-visual-frame">
      <svg
        ref={svgRef}
        className="hero-visual-svg"
        viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
        role="img"
        aria-label="A fragmented system gradually organizing into a clear modular platform beside Max Zalaquett's portrait."
      >
        <defs>
          <clipPath id="hero-portrait-clip">
            <circle cx="92" cy="224" r="74" />
          </clipPath>
        </defs>

        <rect
          ref={frameRef}
          x={ORGANIZING_FRAME.x}
          y={ORGANIZING_FRAME.y}
          width={ORGANIZING_FRAME.width}
          height={ORGANIZING_FRAME.height}
          rx="28"
          fill="rgb(255 255 255 / 0.62)"
          stroke="var(--border)"
        />

        <g opacity="0.96">
          <circle cx="92" cy="224" r="74" fill="rgb(255 255 255 / 0.3)" />
          <image
            href="/Small-headshot.png"
            x="18"
            y="150"
            width="148"
            height="148"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#hero-portrait-clip)"
          />
        </g>

        {THOUGHT_DOTS.map((dot, index) => (
          <circle
            key={dot.id}
            ref={(element) => {
              thoughtDotRefs.current[index] = element;
            }}
            cx={dot.x}
            cy={dot.y}
            r={dot.r}
            fill="var(--accent)"
          />
        ))}

        {MESSY_CONNECTORS.map((connector, index) => (
          <line
            key={connector.id}
            ref={(element) => {
              messyRefs.current[index] = element;
            }}
            x1={connector.from.x}
            y1={connector.from.y}
            x2={connector.to.x}
            y2={connector.to.y}
            stroke="var(--border)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        ))}

        {CLEAN_CONNECTORS.map((connector, index) => (
          <line
            key={connector.id}
            ref={(element) => {
              cleanRefs.current[index] = element;
            }}
            x1={connector.from.x}
            y1={connector.from.y}
            x2={connector.to.x}
            y2={connector.to.y}
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}

        {FRAGMENTS.map((fragment, index) => (
          <g
            key={fragment.id}
            ref={(element) => {
              fragmentRefs.current[index] = element;
            }}
          >
            <rect
              x={0}
              y={0}
              width={fragment.width}
              height={fragment.height}
              rx="16"
              fill={fragment.duplicate ? "rgb(255 255 255 / 0.46)" : "rgb(255 255 255 / 0.72)"}
              stroke="var(--border)"
            />
            <rect
              x={12}
              y={12}
              width={fragment.width * 0.32}
              height={4}
              rx="2"
              fill={fragment.accent ? "rgb(31 78 82 / 0.46)" : "rgb(55 65 81 / 0.22)"}
            />
            <rect
              x={12}
              y={22}
              width={fragment.width * 0.46}
              height={4}
              rx="2"
              fill="rgb(55 65 81 / 0.15)"
            />
            <circle
              cx={fragment.width - 14}
              cy={fragment.height - 14}
              r="4"
              fill={fragment.accent ? "var(--accent)" : "var(--muted)"}
              fillOpacity={fragment.duplicate ? 0.45 : 0.8}
            />
          </g>
        ))}

        {LOOSE_NODES.map((node, index) => (
          <circle
            key={node.id}
            ref={(element) => {
              nodeRefs.current[index] = element;
            }}
            cx={node.start.x}
            cy={node.start.y}
            r={VISUAL.nodeRadius}
            fill={nodeFill(node.accent)}
            fillOpacity={node.accent ? 0.94 : 0.82}
          />
        ))}
      </svg>
    </Card>
  );
}
