"use client";

import { useLayoutEffect, useRef } from "react";

import { gsap } from "gsap";

import { Card } from "@/components/card";

type Point = {
  x: number;
  y: number;
};

type NodeSpec = {
  id: string;
  start: Point;
  end: Point;
  color: "muted" | "accent";
};

type LineSpec = {
  id: string;
  from: Point;
  to: Point;
};

type PanelSpec = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

const VIEWBOX = {
  width: 360,
  height: 260,
} as const;

// Main animation controls live here so timing and scale changes stay centralized.
const TIMINGS = {
  intro: 0.45,
  connectorFade: 0.55,
  regroup: 1.65,
  panelReveal: 0.7,
  connectorDraw: 0.8,
  settle: 0.45,
} as const;

const VISUAL = {
  nodeRadius: 9,
  nodeCount: 9,
  panelOpacity: 0.9,
  messyConnectorOpacity: 0.3,
  cleanConnectorOpacity: 0.72,
} as const;

const PANELS: PanelSpec[] = [
  { id: "panel-a", x: 28, y: 40, width: 92, height: 86 },
  { id: "panel-b", x: 134, y: 86, width: 92, height: 86 },
  { id: "panel-c", x: 240, y: 132, width: 92, height: 86 },
];

const NODES: NodeSpec[] = [
  { id: "node-1", start: { x: 54, y: 54 }, end: { x: 54, y: 74 }, color: "accent" },
  { id: "node-2", start: { x: 136, y: 34 }, end: { x: 74, y: 98 }, color: "muted" },
  { id: "node-3", start: { x: 238, y: 66 }, end: { x: 94, y: 74 }, color: "muted" },
  { id: "node-4", start: { x: 76, y: 132 }, end: { x: 160, y: 120 }, color: "accent" },
  { id: "node-5", start: { x: 166, y: 112 }, end: { x: 180, y: 144 }, color: "muted" },
  { id: "node-6", start: { x: 282, y: 150 }, end: { x: 200, y: 120 }, color: "muted" },
  { id: "node-7", start: { x: 40, y: 220 }, end: { x: 266, y: 166 }, color: "accent" },
  { id: "node-8", start: { x: 154, y: 206 }, end: { x: 286, y: 190 }, color: "muted" },
  { id: "node-9", start: { x: 250, y: 228 }, end: { x: 306, y: 166 }, color: "muted" },
];

const MESSY_CONNECTORS: LineSpec[] = [
  { id: "messy-1", from: NODES[0].start, to: NODES[4].start },
  { id: "messy-2", from: NODES[1].start, to: NODES[6].start },
  { id: "messy-3", from: NODES[2].start, to: NODES[3].start },
  { id: "messy-4", from: NODES[3].start, to: NODES[8].start },
  { id: "messy-5", from: NODES[5].start, to: NODES[6].start },
  { id: "messy-6", from: NODES[7].start, to: NODES[1].start },
];

const CLEAN_CONNECTORS: LineSpec[] = [
  { id: "clean-1", from: { x: 120, y: 86 }, to: { x: 134, y: 120 } },
  { id: "clean-2", from: { x: 226, y: 132 }, to: { x: 240, y: 166 } },
  { id: "clean-3", from: { x: 54, y: 74 }, to: { x: 94, y: 74 } },
  { id: "clean-4", from: { x: 160, y: 120 }, to: { x: 200, y: 120 } },
  { id: "clean-5", from: { x: 266, y: 166 }, to: { x: 306, y: 166 } },
];

function nodeFill(color: NodeSpec["color"]) {
  return color === "accent" ? "var(--accent)" : "var(--muted)";
}

export function PlatformSystemAnimation() {
  const rootRef = useRef<SVGSVGElement | null>(null);
  const nodeRefs = useRef<Array<SVGCircleElement | null>>([]);
  const panelRefs = useRef<Array<SVGRectElement | null>>([]);
  const messyConnectorRefs = useRef<Array<SVGLineElement | null>>([]);
  const cleanConnectorRefs = useRef<Array<SVGLineElement | null>>([]);

  useLayoutEffect(() => {
    if (!rootRef.current) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const context = gsap.context(() => {
      const nodeElements = nodeRefs.current.filter(Boolean) as SVGCircleElement[];
      const panelElements = panelRefs.current.filter(Boolean) as SVGRectElement[];
      const messyElements = messyConnectorRefs.current.filter(Boolean) as SVGLineElement[];
      const cleanElements = cleanConnectorRefs.current.filter(Boolean) as SVGLineElement[];

      const setFinalState = () => {
        NODES.forEach((node, index) => {
          gsap.set(nodeElements[index], {
            attr: { cx: node.end.x, cy: node.end.y },
            opacity: 1,
            scale: 1,
            transformOrigin: "center center",
          });
        });

        gsap.set(panelElements, { opacity: VISUAL.panelOpacity });
        gsap.set(messyElements, { opacity: 0 });
        gsap.set(cleanElements, { opacity: VISUAL.cleanConnectorOpacity, strokeDashoffset: 0 });
      };

      cleanElements.forEach((line) => {
        const length = line.getTotalLength();
        gsap.set(line, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 0,
        });
      });

      if (reduceMotion) {
        setFinalState();
        return;
      }

      gsap.set(panelElements, { opacity: 0 });
      gsap.set(messyElements, { opacity: VISUAL.messyConnectorOpacity });

      NODES.forEach((node, index) => {
        gsap.set(nodeElements[index], {
          attr: { cx: node.start.x, cy: node.start.y },
          opacity: 0.92,
          scale: 1,
          transformOrigin: "center center",
        });
      });

      const timeline = gsap.timeline();

      timeline.fromTo(
        nodeElements,
        { opacity: 0.28, scale: 0.92 },
        {
          opacity: 1,
          scale: 1,
          duration: TIMINGS.intro,
          ease: "power2.out",
          stagger: 0.04,
        },
      );

      timeline.to(
        messyElements,
        {
          opacity: 0.08,
          duration: TIMINGS.connectorFade,
          ease: "sine.out",
        },
        0.25,
      );

      timeline.to(
        panelElements,
        {
          opacity: VISUAL.panelOpacity,
          duration: TIMINGS.panelReveal,
          ease: "sine.out",
          stagger: 0.08,
        },
        0.7,
      );

      nodeElements.forEach((element, index) => {
        timeline.to(
          element,
          {
            attr: {
              cx: NODES[index].end.x,
              cy: NODES[index].end.y,
            },
            duration: TIMINGS.regroup,
            ease: "power3.inOut",
          },
          0.75 + index * 0.03,
        );
      });

      timeline.to(
        cleanElements,
        {
          strokeDashoffset: 0,
          opacity: VISUAL.cleanConnectorOpacity,
          duration: TIMINGS.connectorDraw,
          ease: "power2.out",
          stagger: 0.05,
        },
        1.65,
      );

      timeline.to(
        nodeElements,
        {
          scale: 1.04,
          duration: TIMINGS.settle,
          ease: "sine.out",
          stagger: {
            each: 0.02,
            yoyo: true,
            repeat: 1,
          },
        },
        1.9,
      );
    }, rootRef);

    return () => context.revert();
  }, []);

  return (
    <Card className="hero-visual-frame">
      <svg
        ref={rootRef}
        className="hero-visual-svg"
        viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
        role="img"
        aria-label="A fragmented product system reorganizing into a clean modular platform."
      >
        <defs>
          <linearGradient id="platform-panel-fill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(255 255 255 / 0.88)" />
            <stop offset="100%" stopColor="rgb(255 255 255 / 0.58)" />
          </linearGradient>
        </defs>

        {PANELS.map((panel, index) => (
          <g key={panel.id}>
            <rect
              ref={(element) => {
                panelRefs.current[index] = element;
              }}
              x={panel.x}
              y={panel.y}
              width={panel.width}
              height={panel.height}
              rx="24"
              fill="url(#platform-panel-fill)"
              stroke="var(--border)"
            />
            <rect
              x={panel.x + 16}
              y={panel.y + 14}
              width={28}
              height={4}
              rx="2"
              fill="rgb(31 78 82 / 0.18)"
            />
          </g>
        ))}

        {MESSY_CONNECTORS.map((connector, index) => (
          <line
            key={connector.id}
            ref={(element) => {
              messyConnectorRefs.current[index] = element;
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
              cleanConnectorRefs.current[index] = element;
            }}
            x1={connector.from.x}
            y1={connector.from.y}
            x2={connector.to.x}
            y2={connector.to.y}
            stroke="var(--accent)"
            strokeOpacity="0.75"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}

        {NODES.map((node, index) => (
          <circle
            key={node.id}
            ref={(element) => {
              nodeRefs.current[index] = element;
            }}
            cx={node.start.x}
            cy={node.start.y}
            r={VISUAL.nodeRadius}
            fill={nodeFill(node.color)}
            fillOpacity={node.color === "accent" ? 0.95 : 0.82}
          />
        ))}
      </svg>
    </Card>
  );
}
