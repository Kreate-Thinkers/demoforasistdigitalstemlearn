import { Link, useLocation } from "@tanstack/react-router";
import { Home, GraduationCap, Trophy, ClipboardCheck } from "lucide-react";
import logo from "@/assets/asist-logo.png";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar />
      <main className="flex-1 pb-24">{children}</main>
      <BottomNav />
    </div>
  );
}

function TopBar() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-background/85 border-b border-border">
      <div className="max-w-md mx-auto flex items-center gap-3 px-4 py-3">
        <img src={logo} alt="ASIST Foundation" className="h-9 w-9 rounded-md object-contain bg-white" />
        <div className="leading-tight">
          <p className="text-[11px] uppercase tracking-widest text-muted-foreground">ASIST Foundation</p>
          <h1 className="text-sm font-bold text-primary">Young Engineers</h1>
        </div>
        <span className="ml-auto text-[10px] font-semibold px-2 py-1 rounded-full bg-accent/15 text-accent-foreground border border-accent/30">
          DEMO
        </span>
      </div>
    </header>
  );
}

function BottomNav() {
  const { pathname } = useLocation();
  const items = [
    { to: "/",            label: "Home",       icon: Home },
    { to: "/lessons",     label: "Lessons",    icon: GraduationCap },
    { to: "/assessment",  label: "Assess",     icon: ClipboardCheck },
    { to: "/leaderboard", label: "Leaders",    icon: Trophy },
  ] as const;
  return (
    <nav className="fixed bottom-0 inset-x-0 z-30 border-t border-border bg-background/95 backdrop-blur">
      <ul className="max-w-md mx-auto grid grid-cols-4">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname === to || (to !== "/" && pathname.startsWith(to));
          return (
            <li key={to}>
              <Link
                to={to}
                className={`flex flex-col items-center gap-1 py-3 text-[11px] font-medium tap-press ${
                  active ? "text-accent" : "text-muted-foreground"
                }`}
              >
                <Icon className={`h-5 w-5 ${active ? "stroke-[2.5]" : ""}`} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
