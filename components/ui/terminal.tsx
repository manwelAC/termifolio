"use client";
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { cn } from "@/lib/utils";

const KEY_SOUNDS_DOWN: Record<string, [number, number]> = {
  A: [31542, 85], B: [40621, 107], C: [39632, 95], D: [32492, 85],
  E: [23317, 83], F: [32973, 87], G: [33453, 94], H: [33986, 93],
  I: [25795, 91], J: [34425, 88], K: [34932, 90], L: [35410, 95],
  M: [41610, 93], N: [41103, 90], O: [26309, 84], P: [26804, 83],
  Q: [22245, 95], R: [23817, 92], S: [32031, 88], T: [24297, 92],
  U: [25313, 95], V: [40136, 94], W: [22790, 89], X: [39148, 76],
  Y: [24811, 93], Z: [38694, 80], " ": [51541, 144], "-": [42594, 90],
  "@": [23317, 83], "/": [42594, 90], ".": [42594, 90], ":": [42594, 90],
  "0": [26309, 84], "1": [25313, 95], "2": [23317, 83], "3": [23817, 92],
  "4": [24297, 92], "5": [24811, 93], "6": [25313, 95], "7": [25795, 91],
  "8": [26309, 84], "9": [26804, 83], Enter: [19065, 110],
};

const KEY_SOUNDS_UP: Record<string, [number, number]> = {
  A: [31632, 80], B: [40736, 95], C: [39732, 85], D: [32577, 80],
  E: [23402, 80], F: [33063, 80], G: [33553, 85], H: [34081, 85],
  I: [25890, 85], J: [34515, 85], K: [35027, 85], L: [35510, 85],
  M: [41710, 85], N: [41198, 85], O: [26394, 80], P: [26889, 80],
  Q: [22345, 85], R: [23912, 85], S: [32121, 80], T: [24392, 85],
  U: [25413, 85], V: [40236, 85], W: [22880, 85], X: [39228, 70],
  Y: [24911, 85], Z: [38779, 75], " ": [51691, 130], "-": [42689, 85],
  "@": [23402, 80], "/": [42689, 85], ".": [42689, 85], ":": [42689, 85],
  "0": [26394, 80], "1": [25413, 85], "2": [23402, 80], "3": [23912, 85],
  "4": [24392, 85], "5": [24911, 85], "6": [25413, 85], "7": [25890, 85],
  "8": [26394, 80], "9": [26889, 80], Enter: [19180, 100],
};

function useAudio(enabled: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);
  const bufferRef = useRef<AudioBuffer | null>(null);
  const readyRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;
    const init = async () => {
      try {
        ctxRef.current = new AudioContext();
        const res = await fetch("/sounds/sound.ogg");
        if (!res.ok) return;
        bufferRef.current = await ctxRef.current.decodeAudioData(await res.arrayBuffer());
        readyRef.current = true;
      } catch {}
    };
    init();
    return () => { ctxRef.current?.close(); };
  }, [enabled]);

  const playSound = (sound: [number, number] | undefined) => {
    if (!readyRef.current || !ctxRef.current || !bufferRef.current || !sound) return;
    if (ctxRef.current.state === "suspended") ctxRef.current.resume();
    const src = ctxRef.current.createBufferSource();
    src.buffer = bufferRef.current;
    src.connect(ctxRef.current.destination);
    src.start(0, sound[0] / 1000, sound[1] / 1000);
  };

  const down = (key: string) => playSound(KEY_SOUNDS_DOWN[key.toUpperCase()] || KEY_SOUNDS_DOWN[key]);
  const up = (key: string) => playSound(KEY_SOUNDS_UP[key.toUpperCase()] || KEY_SOUNDS_UP[key]);

  return { down, up };
}

type TokenType = "command" | "flag" | "string" | "number" | "operator" | "path" | "variable" | "comment" | "default";
interface Token { type: TokenType; value: string; }

function tokenizeBash(text: string): Token[] {
  const tokens: Token[] = [];
  const words = text.split(/(\s+)/);
  let isFirstWord = true;

  for (const word of words) {
    if (/^\s+$/.test(word)) { tokens.push({ type: "default", value: word }); continue; }
    if (word.startsWith("#")) { tokens.push({ type: "comment", value: word }); continue; }
    if (word.startsWith("$")) { tokens.push({ type: "variable", value: word }); isFirstWord = false; continue; }
    if (word.startsWith("--") || word.startsWith("-")) { tokens.push({ type: "flag", value: word }); isFirstWord = false; continue; }
    if (/^["'].*["']$/.test(word)) { tokens.push({ type: "string", value: word }); isFirstWord = false; continue; }
    if (/^\d+$/.test(word)) { tokens.push({ type: "number", value: word }); isFirstWord = false; continue; }
    if (/^[|>&<]+$/.test(word)) { tokens.push({ type: "operator", value: word }); isFirstWord = true; continue; }
    if (word.includes("/") || word.startsWith(".") || word.startsWith("~")) { tokens.push({ type: "path", value: word }); isFirstWord = false; continue; }
    if (isFirstWord) { tokens.push({ type: "command", value: word }); isFirstWord = false; continue; }
    tokens.push({ type: "default", value: word });
  }
  return tokens;
}

const tokenColors: Record<TokenType, string> = {
  command: "text-emerald-400", flag: "text-sky-400", string: "text-amber-300",
  number: "text-purple-400", operator: "text-red-400", path: "text-cyan-300",
  variable: "text-pink-400", comment: "text-neutral-500", default: "text-neutral-300",
};

function SyntaxHighlightedText({ text }: { text: string }) {
  return (
    <>
      {tokenizeBash(text).map((token, i) => (
        <span key={i} className={tokenColors[token.type]}>{token.value}</span>
      ))}
    </>
  );
}

interface TerminalLine {
  type: "command" | "output" | "error";
  content: string;
}

export interface TerminalProps {
  username?: string;
  className?: string;
  enableSound?: boolean;
  onCommand?: (command: string) => string[];
  onClear?: () => void;
  onDelayedOutput?: (lines: string[], delay: number) => void;
}

export interface TerminalRef {
  addLine: (line: string) => void;
}

export const Terminal = forwardRef<TerminalRef, TerminalProps>(({
  username = "manuel-portfolio",
  className,
  enableSound = true,
  onCommand,
  onClear,
}, ref) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { down, up } = useAudio(enableSound);

  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", content: "Welcome to manuel-portfolio. Type 'help' to get started." },
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  useImperativeHandle(ref, () => ({
    addLine: (line: string) => {
      setLines((prev) => [...prev, { type: "output", content: line }])
    }
  }))

  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [lines, currentInput]);

  const handleContainerClick = () => inputRef.current?.focus();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    down(e.key === " " ? " " : e.key.length === 1 ? e.key : e.key);

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIdx = Math.min(historyIdx + 1, history.length - 1);
      setHistoryIdx(newIdx);
      setCurrentInput(history[newIdx] ?? "");
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const newIdx = Math.max(historyIdx - 1, -1);
      setHistoryIdx(newIdx);
      setCurrentInput(newIdx === -1 ? "" : history[newIdx] ?? "");
      return;
    }

    if (e.key === "Enter") {
      const cmd = currentInput.trim();
      setLines((prev) => [...prev, { type: "command", content: cmd }]);

      if (cmd) {
        setHistory((prev) => [cmd, ...prev]);
        setHistoryIdx(-1);

        if (cmd.toLowerCase() === "clear") {
          setLines([]);
          onClear?.();
        } else {
          const output = onCommand?.(cmd) ?? ["command not found: " + cmd + ". Type 'help' for available commands."];
          setLines((prev) => [
            ...prev,
            ...output.map((o) => ({ type: "output" as const, content: o })),
          ]);
        }
      }

      setCurrentInput("");
    }
  }; // ← fixed: was missing this

  
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    up(e.key === " " ? " " : e.key.length === 1 ? e.key : e.key);
  };

  const prompt = (
    <span>
      <span className="text-sky-500">{username}</span>
      <span className="text-emerald-600">:</span>
      <span className="text-sky-400">~</span>
      <span className="text-neutral-500">$</span>{" "}
    </span>
  );

  return (
    <div className={cn("w-full font-mono text-xs", className)} onClick={handleContainerClick}>
      <div className="overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900 shadow-2xl">
        <div className="flex items-center gap-2 bg-neutral-800 px-4 py-3">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-xs text-neutral-400">{username} — bash</span>
          </div>
          <div className="w-[52px]" />
        </div>

        <div
          ref={contentRef}
          className="no-visible-scrollbar h-80 overflow-y-auto p-4 cursor-text"
        >
          {lines.map((line, i) => (
            <div key={i} className="leading-relaxed whitespace-pre-wrap">
              {line.type === "command" ? (
                <span>{prompt}<SyntaxHighlightedText text={line.content} /></span>
              ) : (
                <span className="text-neutral-400">{line.content}</span>
              )}
            </div>
          ))}

          <div className="leading-relaxed whitespace-pre-wrap">
            {prompt}
            <SyntaxHighlightedText text={currentInput} />
            <span className={cn(
              "inline-block h-4 w-2 bg-neutral-300 align-middle transition-opacity duration-100",
              !cursorVisible && "opacity-0"
            )} />
          </div>
        </div>
      </div>

      <input
        ref={inputRef}
        className="absolute opacity-0 pointer-events-none w-0 h-0"
        value={currentInput}
        onChange={(e) => setCurrentInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        autoFocus
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />
    </div>
  );
});

Terminal.displayName = "Terminal";


