import { Sidebar } from '@/components/sidebar';
import { Topbar } from '@/components/topbar';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden w-72 shrink-0 border-r border-white/5 lg:block">
        <Sidebar />
      </aside>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
