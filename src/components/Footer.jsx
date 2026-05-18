import { profile } from "../data/profile";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="section-padding border-t border-cream/5 py-8">
      <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-cream-muted">
          © {year} {profile.name} Калинина · {profile.role}
        </p>
        <p className="text-xs text-cream-muted/70">
          {profile.location}
        </p>
      </div>
    </footer>
  );
}
