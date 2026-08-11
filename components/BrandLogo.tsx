import Image from "next/image";

type BrandLogoProps = {
  placement?: "header" | "footer";
  priority?: boolean;
};

const logoSizes = {
  header: "(max-width: 640px) 132px, 156px",
  footer: "224px",
} as const;

export function BrandLogo({ placement = "header", priority = false }: BrandLogoProps) {
  return (
    <span
      className={`brand-logo brand-logo--${placement} brand-logo--full`}
    >
      <Image
        src="/depkov-vpn-logo.png"
        alt="DEPKOV VPN"
        width={2172}
        height={724}
        priority={priority}
        sizes={logoSizes[placement]}
        className="brand-logo__image"
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
        draggable={false}
      />
    </span>
  );
}
