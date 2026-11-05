'use client';

import { useState } from 'react';
import {
  User,
  Palette,
  Bell,
  Shield,
  Sparkles,
  Infinity as InfinityIcon,
  Check,
} from 'lucide-react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Avatar,
  AvatarFallback,
} from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [theme, setTheme] = useState('midnight');
  const [creativity, setCreativity] = useState([60]);
  const [notif, setNotif] = useState({
    product: true,
    usage: false,
    security: true,
  });

  function save() {
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }

  return (
    <AppShell>
      <div className="h-full overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
          <div className="animate-fade-up">
            <h1 className="font-display text-3xl font-semibold tracking-tight">
              Settings
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage your profile, appearance, and INFINO preferences.
            </p>
          </div>

          <Tabs defaultValue="profile" className="mt-8">
            <TabsList className="bg-white/[0.03] p-1 ring-1 ring-white/5">
              <TabsTrigger value="profile" className="gap-2 data-[state=active]:bg-cyan-400/10 data-[state=active]:text-cyan-100">
                <User className="h-4 w-4" /> Profile
              </TabsTrigger>
              <TabsTrigger value="appearance" className="gap-2 data-[state=active]:bg-cyan-400/10 data-[state=active]:text-cyan-100">
                <Palette className="h-4 w-4" /> Appearance
              </TabsTrigger>
              <TabsTrigger value="infinon" className="gap-2 data-[state=active]:bg-cyan-400/10 data-[state=active]:text-cyan-100">
                <Sparkles className="h-4 w-4" /> INFINO
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-2 data-[state=active]:bg-cyan-400/10 data-[state=active]:text-cyan-100">
                <Bell className="h-4 w-4" /> Alerts
              </TabsTrigger>
            </TabsList>

            {/* Profile */}
            <TabsContent value="profile" className="animate-fade-in mt-6">
              <Card>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 ring-2 ring-cyan-400/30">
                    <AvatarFallback className="bg-gradient-to-br from-cyan-400/30 to-cyan-600/10 font-semibold text-cyan-100">
                      IN
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-lg font-medium">Guest user</div>
                    <div className="text-sm text-muted-foreground">
                      guest@infinite.ai
                    </div>
                  </div>
                  <Button variant="outline" className="ml-auto border-white/10 bg-white/[0.03] text-foreground hover:bg-white/[0.06]">
                    Change avatar
                  </Button>
                </div>
                <Separator className="my-6 bg-white/5" />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Display name">
                    <Input defaultValue="Guest" className="bg-white/[0.03]" />
                  </Field>
                  <Field label="Email">
                    <Input
                      defaultValue="guest@infinite.ai"
                      type="email"
                      className="bg-white/[0.03]"
                    />
                  </Field>
                  <Field label="Time zone">
                    <Select defaultValue="utc">
                      <SelectTrigger className="bg-white/[0.03]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc">UTC (Coordinated)</SelectItem>
                        <SelectItem value="est">EST (New York)</SelectItem>
                        <SelectItem value="pst">PST (Los Angeles)</SelectItem>
                        <SelectItem value="cet">CET (Paris)</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="Language">
                    <Select defaultValue="en">
                      <SelectTrigger className="bg-white/[0.03]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
              </Card>
            </TabsContent>

            {/* Appearance */}
            <TabsContent value="appearance" className="animate-fade-in mt-6">
              <Card>
                <FieldLabel
                  title="Theme"
                  desc="Pick the accent palette for the interface."
                />
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id)}
                      className={cn(
                        'group relative overflow-hidden rounded-xl border p-4 text-left transition-all',
                        theme === t.id
                          ? 'border-cyan-400/50 ring-1 ring-cyan-400/30'
                          : 'border-white/5 hover:border-white/10'
                      )}
                    >
                      <div
                        className="mb-3 h-16 w-full rounded-lg"
                        style={{ background: t.preview }}
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{t.name}</span>
                        {theme === t.id && (
                          <Check className="h-4 w-4 text-cyan-300" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                <Separator className="my-6 bg-white/5" />

                <ToggleRow
                  title="Reduce motion"
                  desc="Minimize animations across the app."
                />
                <ToggleRow
                  title="Compact density"
                  desc="Tighten spacing for more content per screen."
                />
              </Card>
            </TabsContent>

            {/* INFINO */}
            <TabsContent value="infinon" className="animate-fade-in mt-6">
              <Card>
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-cyan-600/10 ring-1 ring-cyan-400/30">
                    <InfinityIcon className="h-5 w-5 text-cyan-300" />
                  </div>
                  <div>
                    <div className="font-medium">INFINO assistant</div>
                    <div className="text-sm text-muted-foreground">
                      Tune how INFINO responds.
                    </div>
                  </div>
                </div>

                <Separator className="my-6 bg-white/5" />

                <Field label="Response style">
                  <Select defaultValue="balanced">
                    <SelectTrigger className="bg-white/[0.03]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="concise">Concise</SelectItem>
                      <SelectItem value="balanced">Balanced</SelectItem>
                      <SelectItem value="detailed">Detailed</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between">
                    <Label className="text-sm">Creativity</Label>
                    <span className="text-xs text-cyan-300">
                      {creativity[0]}%
                    </span>
                  </div>
                  <Slider
                    value={creativity}
                    onValueChange={setCreativity}
                    max={100}
                    step={5}
                    className="[&_[data-range]]:bg-cyan-400 [&_[data-thumb]]:border-cyan-400"
                  />
                  <p className="mt-2 text-xs text-muted-foreground">
                    Higher values produce more imaginative, varied responses.
                  </p>
                </div>

                <Separator className="my-6 bg-white/5" />

                <ToggleRow
                  title="Suggested prompts"
                  desc="Show curated prompts on a new chat."
                  defaultChecked
                />
                <ToggleRow
                  title="Memory"
                  desc="Let INFINO reference past conversations in this workspace."
                />
              </Card>
            </TabsContent>

            {/* Notifications */}
            <TabsContent
              value="notifications"
              className="animate-fade-in mt-6"
            >
              <Card>
                <FieldLabel
                  title="Notifications"
                  desc="Choose what INFINO alerts you about."
                />
                <ToggleRow
                  title="Product updates"
                  desc="New features and improvements."
                  checked={notif.product}
                  onChange={(v) => setNotif((n) => ({ ...n, product: v }))}
                />
                <ToggleRow
                  title="Usage reminders"
                  desc="Weekly summaries of your activity."
                  checked={notif.usage}
                  onChange={(v) => setNotif((n) => ({ ...n, usage: v }))}
                />
                <ToggleRow
                  title="Security alerts"
                  desc="Sign-ins and important account activity."
                  checked={notif.security}
                  onChange={(v) => setNotif((n) => ({ ...n, security: v }))}
                />

                <Separator className="my-6 bg-white/5" />

                <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                  <Shield className="h-4 w-4 text-cyan-300" />
                  <p className="text-xs text-muted-foreground">
                    Your settings are stored locally for this prototype.
                  </p>
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Save bar */}
          <div className="mt-6 flex items-center justify-end gap-3">
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
            >
              Cancel
            </Button>
            <Button
              onClick={save}
              className="gap-2 rounded-xl bg-cyan-400 text-cyan-950 hover:bg-cyan-300"
            >
              {saved ? (
                <>
                  <Check className="h-4 w-4" /> Saved
                </>
              ) : (
                'Save changes'
              )}
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl glass p-6">{children}</div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm">{label}</Label>
      {children}
    </div>
  );
}

function FieldLabel({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="mb-5">
      <h3 className="font-display text-lg font-medium">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

function ToggleRow({
  title,
  desc,
  defaultChecked,
  checked,
  onChange,
}: {
  title: string;
  desc: string;
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-3.5">
      <div className="pr-4">
        <div className="text-sm font-medium">{title}</div>
        <div className="mt-0.5 text-xs text-muted-foreground">{desc}</div>
      </div>
      <Switch
        defaultChecked={defaultChecked}
        checked={checked}
        onCheckedChange={onChange}
        className="data-[state=checked]:bg-cyan-400 data-[state=unchecked]:bg-white/10"
      />
    </div>
  );
}

const themes = [
  {
    id: 'midnight',
    name: 'Midnight',
    preview: 'linear-gradient(135deg, #0a0f1f 0%, #0d1b2a 60%, #22d3ee 140%)',
  },
  {
    id: 'abyss',
    name: 'Abyss',
    preview: 'linear-gradient(135deg, #050810 0%, #0b1622 60%, #38bdf8 140%)',
  },
  {
    id: 'aurora',
    name: 'Aurora',
    preview: 'linear-gradient(135deg, #08101a 0%, #10243a 50%, #2dd4bf 130%)',
  },
];
