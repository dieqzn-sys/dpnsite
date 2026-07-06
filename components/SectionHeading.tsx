type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-5 text-balance text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      <p className="mt-4 text-pretty text-base leading-7 text-slate-400 sm:text-lg">
        {description}
      </p>
    </div>
  );
}

