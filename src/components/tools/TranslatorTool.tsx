"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeftRight, Copy, Check, Trash2, AlertCircle, Loader2 } from "lucide-react";
import { ToolConfig } from "@/lib/tools/types";

interface Props {
  tool: ToolConfig;
}

const MAX_CHARS = 2000;

export function TranslatorTool({ tool }: Props) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<"idle" | "typing" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);
  
  // Swap direction (e.g. false = English->Latin, true = Latin->English)
  const [isSwapped, setIsSwapped] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  const charCount = input.length;
  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;
  const isOverLimit = charCount > MAX_CHARS;

  useEffect(() => {
    if (status === "success" || status === "error") {
      // Keep state unless input changes
    } else if (input.length > 0 && status === "idle") {
      setStatus("typing");
    } else if (input.length === 0) {
      setStatus("idle");
      setOutput("");
    }
  }, [input, status]);

  const handleTranslate = async () => {
    if (!input.trim() || isOverLimit) return;

    setStatus("loading");
    setErrorMessage("");

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolId: tool.id,
          input,
          isSwapped
        }),
        signal: abortControllerRef.current.signal
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Translation failed");
      }

      setOutput(data.result);
      setStatus("success");
    } catch (err: any) {
      if (err.name === "AbortError") return;
      console.error(err);
      setErrorMessage(err.message || "An unexpected error occurred.");
      setStatus("error");
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setStatus("idle");
    setErrorMessage("");
  };

  const handleSwap = () => {
    if (!tool.allowSwap) return;
    setIsSwapped(!isSwapped);
    setInput(output);
    setOutput("");
    setStatus(output ? "typing" : "idle");
  };

  const sourceLang = isSwapped ? tool.targetLanguage : tool.sourceLanguage;
  const targetLang = isSwapped ? tool.sourceLanguage : tool.targetLanguage;

  return (
    <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl shadow-sm overflow-hidden flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-[var(--border-color)] bg-[var(--background)]/50">
        <div className="flex-1 font-semibold text-[var(--foreground)] px-2">
          {sourceLang}
        </div>
        
        {tool.allowSwap && (
          <button 
            onClick={handleSwap}
            className="p-2 text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 rounded-full transition-colors flex-shrink-0"
            aria-label="Swap languages"
          >
            <ArrowLeftRight size={20} />
          </button>
        )}
        
        <div className="flex-1 font-semibold text-[var(--foreground)] px-2 text-right">
          {targetLang}
        </div>
      </div>
      
      {/* Input/Output Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border-color)]">
        
        {/* Source */}
        <div className="flex flex-col relative group">
          <textarea 
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (status === "success" || status === "error") setStatus("typing");
            }}
            className="w-full min-h-[250px] p-6 bg-transparent text-lg text-[var(--foreground)] placeholder-[var(--text-muted)] resize-y outline-none"
            placeholder={`Enter text to translate into ${targetLang}...`}
            aria-label="Source text"
          ></textarea>
          
          <div className="p-4 flex items-center justify-between text-sm mt-auto text-[var(--text-muted)]">
            <div className="flex items-center gap-4">
              <span>{wordCount} words</span>
              <span className={isOverLimit ? "text-red-500 font-medium" : ""}>
                {charCount} / {MAX_CHARS}
              </span>
            </div>
            {input.length > 0 && (
              <button 
                onClick={handleClear}
                className="hover:text-[var(--foreground)] transition-colors p-1"
                aria-label="Clear input"
                title="Clear"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Target */}
        <div className="flex flex-col bg-[var(--background)]/30 relative">
          {status === "loading" && (
            <div className="absolute inset-0 z-10 bg-[var(--card-bg)]/50 backdrop-blur-sm flex items-center justify-center">
              <Loader2 className="animate-spin text-[var(--primary)]" size={32} />
            </div>
          )}
          
          <textarea 
            value={status === "error" ? errorMessage : output}
            readOnly
            className={`w-full min-h-[250px] p-6 bg-transparent text-lg resize-y outline-none ${status === "error" ? "text-red-500" : "text-[var(--foreground)]"}`}
            placeholder="Translation will appear here..."
            aria-label="Target text"
          ></textarea>
          
          <div className="p-4 flex items-center justify-end mt-auto">
            <button 
              onClick={handleCopy}
              disabled={!output || status === "error"}
              className="flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--foreground)] disabled:opacity-50 disabled:hover:text-[var(--text-muted)] transition-colors p-2"
            >
              {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      </div>
      
      {/* Footer Actions */}
      <div className="p-4 border-t border-[var(--border-color)] flex items-center justify-between bg-[var(--background)]/50">
        <div className="text-sm text-[var(--text-muted)] flex items-center gap-2">
          {isOverLimit && (
            <span className="text-red-500 flex items-center gap-1"><AlertCircle size={16}/> Limit exceeded</span>
          )}
        </div>
        <button 
          onClick={handleTranslate}
          disabled={!input.trim() || isOverLimit || status === "loading"}
          className="px-8 py-3 bg-[var(--primary)] hover:bg-[var(--primary-hover)] disabled:bg-[var(--border-color)] disabled:text-[var(--text-muted)] text-white rounded-xl font-medium transition-colors shadow-sm"
        >
          {status === "loading" ? "Translating..." : "Translate"}
        </button>
      </div>
    </div>
  );
}
