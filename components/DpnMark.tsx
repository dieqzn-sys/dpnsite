export function DpnMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-3" aria-label="DPN — DEPKOV PRIVATE NETWORK">
      <span className="relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-xl border border-cyan-300/25 bg-cyan-400/10 text-[11px] font-black tracking-[-0.08em] text-cyan-200 shadow-[0_0_30px_rgba(34,211,238,0.12)]">
        <span className="absolute inset-x-1 top-1 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
        DPN
      </span>
      {!compact && (
        <span className="hidden sm:block">
          <span className="block text-sm font-bold tracking-[0.18em] text-white">DPN</span>
          <span className="block text-[9px] font-medium tracking-[0.16em] text-slate-500">
            PRIVATE NETWORK
          </span>
        </span>
      )}
    </span>
  );
}

