import Image from "next/image";

const FOOTER_COLUMNS = [
  ["Documentation", "GitHub"],
  ["Twitter", "Discord"],
  ["Governance", "Privacy Policy"],
];

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-white/5 bg-surface-container-lowest py-xl">
      <div className="mx-auto grid max-w-page grid-cols-2 gap-gutter px-sm md:grid-cols-4 md:px-xl lg:grid-cols-6">
        <div className="col-span-2 flex flex-col gap-sm md:col-span-4 lg:col-span-2">
          <div className="flex items-center gap-sm">
            <Image src="/screen.png" alt="AlignBTC logo" width={36} height={36} className="size-9" />
            <span className="font-display text-display-sm font-bold text-on-surface">
              AlignBTC
            </span>
          </div>
          <p className="font-sans text-body-sm text-on-surface-variant">
            © 2024 Stacks Protocol. Built for the Bitcoin economy.
          </p>
        </div>

        {FOOTER_COLUMNS.map((column, i) => (
          <div key={i} className="flex flex-col gap-xs">
            {column.map((link) => (
              <a
                key={link}
                href={link === "Documentation" ? "/docs" : "#"}
                className="font-sans text-body-sm text-on-surface-variant transition-colors hover:text-primary"
              >
                {link}
              </a>
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
}
