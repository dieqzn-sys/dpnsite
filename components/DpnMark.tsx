export function DpnMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5" aria-label="DEPKOV VPN">
      <span className="brand-switch" aria-hidden="true">
        <span className="brand-switch__track" />
        <span className="brand-switch__orb" />
      </span>
      {!compact && (
        <span className="whitespace-nowrap text-[13px] font-black tracking-[0.045em] text-white sm:text-sm">
          DEPKOV <span className="brand-gradient">VPN</span>
        </span>
      )}
    </span>
  );
}
