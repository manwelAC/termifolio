"use client";

const commands = [
  { cmd: "help", desc: "Show every command" },
  { cmd: "about", desc: "Who I am" },
  { cmd: "projects", desc: "Selected work" },
  { cmd: "blog", desc: "Notes and writing" },
  { cmd: "skills", desc: "Technical stack" },
  { cmd: "contact", desc: "Start a conversation" },
];

export function CommandList() {
  return (
    <aside className="overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/40 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
          Quick commands
        </span>
        <span className="font-mono text-[9px] text-emerald-400/70">06</span>
      </div>

      <div className="divide-y divide-neutral-800/70 px-4">
        {commands.map((item, index) => (
          <div key={item.cmd} className="group py-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] text-neutral-600">
                {String(index + 1).padStart(2, "0")}
              </span>
              <code className="font-mono text-[11px] text-emerald-300 transition-colors group-hover:text-emerald-200">
                {item.cmd}
              </code>
            </div>
            <p className="mt-1 pl-6 text-[10px] leading-relaxed text-neutral-500">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-neutral-800 bg-neutral-950/50 px-4 py-3 font-mono text-[9px] leading-relaxed text-neutral-600">
        Type <span className="text-purple-300">help</span> for advanced commands.
      </div>
    </aside>
  );
}
