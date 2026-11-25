import { motion, useReducedMotion } from "framer-motion";
import "./TrustedBy.css";
import FilamentText from "../../../FilamentText/FilamentText";


/**
 * Drop <TrustedBy /> anywhere in a React app that has framer-motion installed.
 * Replace the sample `clients` with your SVG/image logo components when ready.
 */
const clients = [
  { name: "JETOUR", detail: "Drive Your Future", className: "jetour" },
  { name: "flyadeal", detail: "f", className: "flyadeal" },
  { name: "FORMULA E", detail: "", className: "formula" },
  { name: "MINISTRY", detail: "Ministry of Sport", className: "ministry" },
  { name: "Extend", detail: "The Ad Network", className: "extend" },
  { name: "onsor", detail: "mosha", className: "onsor" },
  { name: "DARCO", detail: "D", className: "darco" },
  { name: "RED SEA", detail: "Saudi Red Sea Authority", className: "redsea" },
];

function LogoCard({ client }) {
  return (
    <article className="trusted-logo-card" aria-label={client.name}>
      <div className={`trusted-wordmark ${client.className}`}>
        {client.detail && <small>{client.detail}</small>}
        <strong>{client.name}</strong>
      </div>
    </article>
  );
}

function LogoRail({ direction = "left" }) {
  const reducedMotion = useReducedMotion();
  // Rendering the exact same set twice makes the translate loop seamless.
  const repeatedClients = [...clients, ...clients];
  const to = direction === "left" ? "-50%" : "0%";
  const from = direction === "left" ? "0%" : "-50%";

  return (
    <div className="trusted-rail-mask" aria-hidden="true">
      <motion.div
        className="trusted-rail"
        initial={{ x: from }}
        animate={reducedMotion ? { x: 0 } : { x: [from, to] }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : { duration: 34, ease: "linear", repeat: Infinity }
        }
      >
        {repeatedClients.map((client, index) => (
          <LogoCard client={client} key={`${client.name}-${index}`} />
        ))}
      </motion.div>
    </div>
  );
}

export default function TrustedBy() {
  return (
    <section className="trusted-by" aria-labelledby="trusted-by-heading">
      <LogoRail direction="left" />

      <div className="trusted-copy">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100/90 border border-neutral-200/90 text-neutral-800 text-xs font-medium tracking-wide uppercase mb-4 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
          <span>Selected Partners</span>
        </div>
        <h2 id="trusted-by-heading">
          <FilamentText text="TRUSTED BY" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-600">
            <FilamentText text="THE BEST." className="grad-text" />
          </span>
        </h2>
        <p className="text-neutral-600"><FilamentText text="In good company, and in the right place." /></p>
      </div>

      <LogoRail direction="right" />
    </section>
  );
}
