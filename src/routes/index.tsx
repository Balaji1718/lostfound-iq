import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Search,
  Bot,
  ShieldCheck,
  Bell,
  LayoutDashboard,
  Workflow,
  MapPin,
  BadgeCheck,
  Building2,
  LogIn,
  Upload,
  GitMerge,
  FileCheck2,
  PackageCheck,
  Sparkles,
  Send,
  Mail,
  MessageSquare,
  User2,
  Github,
  Twitter,
  Linkedin,
  Moon,
  Sun,
  ArrowRight,
  Download,
  ChevronDown,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Smartphone,
  Menu,
} from "lucide-react";
import { Toaster, toast } from "sonner";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import heroBg from "@/assets/hero-bg.jpg";
import appInstitutionSelection from "@/assets/app-institution-selection.png";
import appLogin from "@/assets/app-login.png";
import appPostItem from "@/assets/app-post-item.png";
import appItemDetails from "@/assets/app-item-details.png";
import appAiAssistant from "@/assets/app-ai-assistant.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useTheme } from "@/hooks/useTheme";
import {
  fetchInstitutions,
  fetchMobileAppConfig,
  fetchLandingPageConfig,
  fetchAppStats,
  submitWaitlist,
  submitContactRequest,
  type Institution,
  type MobileAppConfig,
  type LandingPageConfig,
  type AppStats,
} from "@/lib/firestore";
import { LogoPlaceholder } from "@/components/LogoPlaceholder";

const SITE = {
  title: "FindBack - Lost Something? Find It Back",
  description:
    "AI-powered institution-based lost and found platform helping students, faculty, and institutions recover lost items securely.",
  url: "https://findback.app",
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: SITE.title },
      { name: "description", content: SITE.description },
      {
        name: "keywords",
        content:
          "lost and found, campus app, university, AI assistant, claim verification, students",
      },
      { property: "og:title", content: SITE.title },
      { property: "og:description", content: SITE.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE.title },
      { name: "twitter:description", content: SITE.description },
    ],
    links: [{ rel: "canonical", href: SITE.url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "FindBack",
          applicationCategory: "EducationalApplication",
          operatingSystem: "Android",
          description: SITE.description,
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }),
      },
    ],
  }),
  component: LandingPage,
});

/* ---------------- Shared bits ---------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      className="mx-auto max-w-3xl text-center"
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/60 px-3 py-1 text-xs font-medium text-muted-foreground">
        <Sparkles className="h-3.5 w-3.5 text-primary" /> {eyebrow}
      </span>
      <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-balance text-base text-muted-foreground md:text-lg">{subtitle}</p>
      )}
    </motion.div>
  );
}

/* ---------------- Navbar ---------------- */

function Navbar() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    ["Features", "#features"],
    ["How it works", "#how"],
    ["Institutions", "#institutions"],
    ["AI Assistant", "#ai"],
    ["FAQ", "#faq"],
  ];

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "py-2" : "py-4"}`}>
      <div className="mx-auto max-w-7xl px-4">
        <nav
          className={`flex items-center justify-between gap-4 rounded-2xl px-4 py-2.5 transition-all ${
            scrolled ? "glass shadow-card" : "bg-transparent"
          }`}
          aria-label="Primary"
        >
          <a
            href="#top"
            className="transition-opacity hover:opacity-90 text-foreground"
          >
            <LogoPlaceholder size="md" />
          </a>
          <ul className="hidden items-center gap-1 md:flex">
            {links.map(([l, h]) => (
              <li key={h}>
                <a
                  href={h}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
          {/* Desktop Navigation buttons */}
          <div className="hidden items-center gap-2 md:flex">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              onClick={toggle}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              asChild
              size="sm"
              className="gradient-primary text-primary-foreground shadow-glow hover:opacity-95 sm:inline-flex"
            >
              <a href="#waitlist">Join waitlist</a>
            </Button>
          </div>

          {/* Mobile Navigation Drawer */}
          <div className="flex items-center gap-1 md:hidden">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              onClick={toggle}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-background border-border">
                <div className="flex flex-col gap-6 pt-8">
                  <LogoPlaceholder size="md" className="px-2" />
                  <ul className="flex flex-col gap-1">
                    {links.map(([l, h]) => (
                      <li key={h}>
                        <a
                          href={h}
                          className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                        >
                          {l}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-col gap-2 px-3">
                    <Button
                      asChild
                      size="sm"
                      className="gradient-primary text-primary-foreground shadow-glow w-full"
                    >
                      <a href="#waitlist">Join waitlist</a>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}

/* ---------------- Hero ---------------- */

function Hero({ config }: { config: LandingPageConfig | null }) {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-70 hidden dark:block"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div aria-hidden className="absolute inset-0 -z-10 gradient-hero" />
      <div aria-hidden className="absolute inset-0 -z-10 grid-bg" />
      <div className="absolute inset-x-0 -z-10 mx-auto h-[400px] w-[800px] max-w-full -translate-y-1/2 rounded-full bg-primary/10 dark:bg-primary/20 blur-[120px]" />

      <div className="mx-auto max-w-6xl px-4 text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/50 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-zinc-200">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            {config?.heroAnnouncement ?? "Now in private beta for institutions"}
          </span>
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.05 }}
          className="mt-6 text-balance text-5xl font-semibold tracking-tight md:text-7xl text-foreground dark:text-white"
        >
          Lost Something? <span className="gradient-text">Find It Back.</span>
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.12 }}
          className="mx-auto mt-6 max-w-2xl text-balance text-base text-muted-foreground dark:text-zinc-300"
        >
          An AI-powered institution-based lost and found platform that helps campuses reconnect
          people with their belongings — quickly, securely, efficiently.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.2 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Button
            asChild
            size="lg"
            className="gradient-primary text-primary-foreground shadow-glow hover:opacity-95"
          >
            <a href="#download">
              <Download className="mr-2 h-4 w-4" /> Download APK
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-border text-foreground hover:bg-secondary backdrop-blur dark:border-white/20 dark:text-white dark:hover:bg-white/10 dark:hover:text-white"
          >
            <a href="#waitlist">
              Join Waitlist <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>

        <motion.ul
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground dark:text-zinc-300"
        >
          {(
            [
              ["Institution-grade security", ShieldCheck],
              ["Verified claim workflow", BadgeCheck],
              ["Real-time notifications", Bell],
            ] as const
          ).map(([t, Icon]) => (
            <li key={t} className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-primary" />
              <span>{t}</span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

/* ---------------- Features ---------------- */

const FEATURES = [
  {
    icon: Building2,
    title: "Institution-Based Access",
    desc: "Scoped to your campus — only verified members see and post items.",
  },
  {
    icon: Bot,
    title: "AI Assistant",
    desc: "Natural-language reporting, smart suggestions, and intelligent matching.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Claim Verification",
    desc: "Multi-step proofs ensure items are returned to their rightful owners.",
  },
  {
    icon: Bell,
    title: "Real-Time Notifications",
    desc: "Instant alerts when a potential match for your item appears.",
  },
  {
    icon: LayoutDashboard,
    title: "Admin Dashboard",
    desc: "Campus admins get visibility, controls, and rich analytics.",
  },
  {
    icon: Workflow,
    title: "Smart Lost & Found Workflow",
    desc: "Guided flows take users from report to recovery seamlessly.",
  },
  {
    icon: MapPin,
    title: "Campus-Wide Item Tracking",
    desc: "Track item status across buildings, departments, and lost-and-found hubs.",
  },
  {
    icon: BadgeCheck,
    title: "Proof-Based Return System",
    desc: "Photo, code, and metadata proofs make every return airtight.",
  },
];

function Features() {
  return (
    <section id="features" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Platform"
          title={
            <>
              Everything campuses need to <span className="gradient-text">recover lost items</span>
            </>
          }
          subtitle="A complete toolkit built for the unique scale and trust requirements of educational institutions."
        />
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant"
            >
              <div
                aria-hidden
                className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "var(--gradient-hero)" }}
              />
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl gradient-primary text-primary-foreground shadow-glow">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold tracking-tight">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- How it works ---------------- */

const STEPS = [
  {
    icon: Building2,
    title: "Select Institution",
    desc: "Choose your campus from the verified institution directory.",
  },
  {
    icon: LogIn,
    title: "Sign In",
    desc: "Authenticate with your institutional account for trusted access.",
  },
  {
    icon: Upload,
    title: "Post Lost or Found Item",
    desc: "Submit a detailed report with photos and context in seconds.",
  },
  {
    icon: GitMerge,
    title: "Match & Claim",
    desc: "Our AI surfaces potential matches and routes claims automatically.",
  },
  {
    icon: FileCheck2,
    title: "Verification Process",
    desc: "Owners prove ownership through secure, structured verification.",
  },
  {
    icon: PackageCheck,
    title: "Recover Item Successfully",
    desc: "Coordinate the handoff and close the loop with a proof of return.",
  },
];

function HowItWorks() {
  return (
    <section id="how" className="relative py-24 md:py-32">
      <div aria-hidden className="absolute inset-0 -z-10 gradient-hero opacity-50" />
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              From lost to recovered in <span className="gradient-text">six clear steps</span>
            </>
          }
          subtitle="A workflow designed with students, faculty, and admins from real campuses."
        />
        <div className="relative mt-16">
          <div
            aria-hidden
            className="absolute left-6 top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-primary/60 via-border to-transparent md:left-1/2 md:block"
          />
          <ol className="space-y-6 md:space-y-12">
            {STEPS.map((s, i) => {
              const reverse = i % 2 === 1;
              return (
                <motion.li
                  key={s.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55 }}
                  className={`relative grid items-center gap-6 md:grid-cols-2 ${
                    reverse ? "md:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-card md:p-8">
                    <div className="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary">
                      Step {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{s.title}</h3>
                    <p className="mt-2 text-muted-foreground">{s.desc}</p>
                  </div>
                  <div className="flex justify-center">
                    <div className="relative grid h-24 w-24 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-glow">
                      <s.icon className="h-9 w-9" />
                      <span className="absolute -bottom-2 -right-2 grid h-8 w-8 place-items-center rounded-full border border-border bg-card text-sm font-semibold text-foreground shadow-card">
                        {i + 1}
                      </span>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------- App showcase ---------------- */

const SCREENS: { title: string; img: string; description: string; altText: string }[] = [
  {
    title: "Institution Selection",
    img: appInstitutionSelection,
    description: "Select your campus from a directory of verified institutions.",
    altText:
      "FindBack mobile application screenshot showing Select Your Institution screen with Anna University and Excel Engineering College search results.",
  },
  {
    title: "Login Screen",
    img: appLogin,
    description: "Secure single sign-on using your institutional credentials.",
    altText:
      "FindBack mobile application screenshot showing Login screen for Anna University with fields for Email and Password.",
  },
  {
    title: "Dashboard",
    img: appItemDetails,
    description: "Browse lost and found items across your campus departments.",
    altText:
      "FindBack mobile application screenshot showing reported items status list and activity feed.",
  },
  {
    title: "Post Item",
    img: appPostItem,
    description: "Report lost or found items with location tags and photo support.",
    altText:
      "FindBack mobile application screenshot showing Post Item form with title, description, contact details, and lost/found selection.",
  },
  {
    title: "AI Assistant",
    img: appAiAssistant,
    description: "Use natural language chat to draft reports and resolve claims.",
    altText:
      "FindBack mobile application screenshot showing AI Assistant chat screen prompting 'Hey Balaji M, ready to dive in? Ask me anything'.",
  },
  {
    title: "Claim Workflow",
    img: appItemDetails,
    description: "Prove ownership securely via structured questions and hand-off coordinates.",
    altText:
      "FindBack mobile application screenshot showing Item Details screen for a car key with tracking status stages: Posted, Claimed, Approved, Returned.",
  },
];

function AppShowcase() {
  const [lightboxImg, setLightboxImg] = useState<{ src: string; title: string } | null>(null);

  return (
    <section className="relative py-24 md:py-32 bg-secondary/10">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Screenshots"
          title={
            <>
              Explore the <span className="gradient-text">FindBack app</span>
            </>
          }
          subtitle="Take a look at how FindBack handles campus lost and found. Click any screen to expand."
        />

        <div className="mt-14 max-w-5xl mx-auto px-4 relative">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {SCREENS.map((s) => (
                <CarouselItem key={s.title} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3">
                  <div className="flex flex-col items-center p-2">
                    {/* Phone Frame Mockup */}
                    <button
                      type="button"
                      onClick={() => setLightboxImg({ src: s.img, title: s.title })}
                      className="relative h-[480px] w-[240px] rounded-[2rem] border-[8px] border-zinc-950 bg-zinc-950 shadow-elegant overflow-hidden transition-all duration-300 hover:scale-[1.02] cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      aria-label={`Preview ${s.title} screenshot`}
                    >
                      {/* Notch */}
                      <div className="absolute left-1/2 top-0 z-20 h-4 w-20 -translate-x-1/2 rounded-b-xl bg-zinc-950" />

                      {/* Image tag with lazy loading and descriptive alt text */}
                      <img
                        src={s.img}
                        alt={s.altText}
                        loading="lazy"
                        className="h-full w-full object-cover rounded-[1.3rem] transition-opacity duration-300 group-hover:opacity-90"
                      />

                      {/* Hover Zoom overlay */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-background/90 text-foreground text-xs font-semibold px-3 py-1.5 rounded-full shadow-card flex items-center gap-1">
                          Click to expand
                        </span>
                      </div>
                    </button>

                    {/* Description detail */}
                    <div className="mt-4 text-center max-w-[240px]">
                      <h3 className="font-semibold text-sm">{s.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {s.description}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Carousel navigation controls */}
            <div className="hidden sm:block">
              <CarouselPrevious className="-left-6 md:-left-12 bg-background border-border text-foreground hover:bg-secondary" />
              <CarouselNext className="-right-6 md:-right-12 bg-background border-border text-foreground hover:bg-secondary" />
            </div>
          </Carousel>
        </div>
      </div>

      {/* Lightbox Overlay */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setLightboxImg(null)}
        >
          <div
            className="relative max-w-sm w-full bg-card rounded-3xl p-3 shadow-elegant border border-border/60 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-10 right-2 text-white hover:text-white/80 transition-colors font-medium text-xs flex items-center gap-1"
              onClick={() => setLightboxImg(null)}
            >
              Close (X)
            </button>
            <img
              src={lightboxImg.src}
              alt={lightboxImg.title}
              className="w-full h-auto rounded-2xl max-h-[75vh] object-contain"
            />
            <p className="mt-3 text-center text-xs font-semibold text-card-foreground">
              {lightboxImg.title}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

/* ---------------- Institutions ---------------- */

function Institutions() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [items, setItems] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadInstitutions = async () => {
    setLoading(true);
    setError(false);
    try {
      const list = await fetchInstitutions();
      setItems(list);
    } catch (err) {
      console.error("Failed to load institutions:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInstitutions();
  }, []);

  const filtered = useMemo(() => {
    return items.filter((i) => {
      const q = query.trim().toLowerCase();
      const matchQ =
        !q ||
        i.name.toLowerCase().includes(q) ||
        (i.location ?? "").toLowerCase().includes(q) ||
        (i.code ?? "").toLowerCase().includes(q);
      const matchS = status === "all" || (i.status ?? "active") === status;
      return matchQ && matchS;
    });
  }, [items, query, status]);

  return (
    <section id="institutions" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Institutions"
          title={
            <>
              Trusted by forward-looking <span className="gradient-text">campuses</span>
            </>
          }
          subtitle="Onboard your institution to give students and faculty a secure home for lost & found."
        />

        <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search institutions..."
              className="pl-9"
              aria-label="Search institutions"
              disabled={loading || error}
            />
          </div>
          <Select value={status} onValueChange={setStatus} disabled={loading || error}>
            <SelectTrigger className="sm:w-48" aria-label="Filter by status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="onboarding">Onboarding</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Dynamic Display Area */}
        <div className="mt-10 min-h-[200px] flex flex-col justify-center">
          {loading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-28 rounded-2xl border border-border/60 bg-secondary/20 flex items-center p-5 gap-4"
                >
                  <div className="h-12 w-12 rounded-xl bg-muted animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                    <div className="h-3 bg-muted animate-pulse rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-8 text-center max-w-xl mx-auto w-full">
              <AlertCircle className="mx-auto h-8 w-8 text-destructive mb-3" />
              <h4 className="text-base font-semibold">Unable to load directory</h4>
              <p className="mt-2 text-sm text-muted-foreground">
                There was a problem communicating with the server. Please check your internet
                connection and try again.
              </p>
              <Button
                onClick={loadInstitutions}
                variant="outline"
                className="mt-4 border-destructive/30 hover:bg-destructive/10"
              >
                Retry Connection
              </Button>
            </div>
          ) : items.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card/40 p-8 text-center max-w-xl mx-auto w-full animate-fade-in">
              <Building2 className="mx-auto h-8 w-8 text-muted-foreground mb-3" />
              <h4 className="text-base font-semibold">No active campuses</h4>
              <p className="mt-2 text-sm text-muted-foreground">
                There are no institutions registered in the system right now.
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <p className="py-10 text-center text-muted-foreground">
              No institutions match your search filters.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((inst, i) => (
                <motion.div
                  key={inst.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                  className="group rounded-2xl border border-border/60 bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-elegant"
                >
                  <div className="flex items-start gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-xl gradient-primary text-primary-foreground shadow-glow">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-base font-semibold">
                        {inst.name}
                        {inst.code && (
                          <span className="ml-1.5 text-xs font-normal text-muted-foreground">
                            ({inst.code})
                          </span>
                        )}
                      </h3>
                      {inst.location && (
                        <p className="mt-0.5 truncate text-xs text-muted-foreground">
                          {inst.location}
                        </p>
                      )}
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium capitalize ${
                        (inst.status ?? "active") === "active"
                          ? "bg-success/15 text-[color:var(--success)]"
                          : "bg-accent/15 text-foreground"
                      }`}
                    >
                      {inst.status ?? "active"}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div className="mx-auto mt-12 max-w-4xl rounded-3xl border border-border/60 bg-card p-8 shadow-elegant md:p-12">
          <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight">
                Bring FindBack to your campus
              </h3>
              <p className="mt-2 text-muted-foreground">
                We partner with universities, colleges, and schools to roll out a private, branded
                lost-and-found experience with admin tools and analytics.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="gradient-primary text-primary-foreground shadow-glow hover:opacity-95"
            >
              <a href="#contact">Talk to onboarding</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Stats ---------------- */

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { damping: 24, stiffness: 80 });
  const rounded = useTransform(spring, (v) => Math.floor(v).toLocaleString());
  
  useEffect(() => {
    if (inView) {
      mv.set(to);
    }
  }, [inView, to, mv]);

  // Fallback trigger if useInView does not fire (e.g. in test envs / headless viewports)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (mv.get() === 0) {
        mv.set(to);
      }
    }, 1200);
    return () => clearTimeout(timer);
  }, [to, mv]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

function Stats() {
  const [stats, setStats] = useState<AppStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await fetchAppStats();
        setStats(data);
      } catch (err) {
        console.error("Failed to load app stats:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  const statsDisplay = useMemo(() => {
    const defaultStats = [
      { label: "Registered Institutions", value: 48, suffix: "+" },
      { label: "Active Users", value: 12500, suffix: "+" },
      { label: "Lost Items Posted", value: 34000, suffix: "+" },
      { label: "Successfully Returned", value: 18750, suffix: "+" },
    ];

    if (loading || !stats) {
      return defaultStats;
    }

    return [
      {
        label: "Registered Institutions",
        value: stats.institutions !== undefined ? stats.institutions : 48,
        suffix: stats.institutions !== undefined ? "" : "+",
      },
      {
        label: "Active Users",
        value: stats.users !== undefined ? stats.users : 12500,
        suffix: stats.users !== undefined ? "" : "+",
      },
      {
        label: "Lost Items Posted",
        value: stats.items !== undefined ? stats.items : 34000,
        suffix: stats.items !== undefined ? "" : "+",
      },
      {
        label: "Successfully Returned",
        value: stats.returnedItems !== undefined ? stats.returnedItems : 18750,
        suffix: stats.returnedItems !== undefined ? "" : "+",
      },
    ];
  }, [stats, loading]);

  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-8 shadow-elegant md:p-12">
          <div aria-hidden className="absolute inset-0 -z-10 gradient-hero" />
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {statsDisplay.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-semibold tracking-tight md:text-4xl">
                  {loading ? (
                    <span className="inline-block w-16 h-8 bg-muted/60 animate-pulse rounded" />
                  ) : (
                    <Counter to={s.value} suffix={s.suffix} />
                  )}
                </div>
                <p className="mt-2 text-xs text-muted-foreground md:text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- AI Section ---------------- */

const AI_FEATURES = [
  {
    icon: MessageSquare,
    title: "Natural Language Support",
    desc: "Describe what you lost in your own words — no rigid forms.",
  },
  {
    icon: FileCheck2,
    title: "Report Generation",
    desc: "Auto-drafts complete lost/found reports from a short conversation.",
  },
  {
    icon: Sparkles,
    title: "User Guidance",
    desc: "Step-by-step coaching for new users at every stage.",
  },
  {
    icon: GitMerge,
    title: "Smart Recommendations",
    desc: "Surfaces likely matches by combining image, text, and metadata cues.",
  },
  {
    icon: Bot,
    title: "Campus Support Automation",
    desc: "Answers common questions and triages requests to the right admin.",
  },
];

function AISection() {
  return (
    <section id="ai" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs font-medium backdrop-blur">
              <Bot className="h-3.5 w-3.5 text-primary" /> FindBack AI
            </span>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
              Your campus's <span className="gradient-text">smartest helper</span>
            </h2>
            <p className="mt-4 text-balance text-muted-foreground md:text-lg">
              Built on language models tuned for lost-and-found, the FindBack AI Assistant handles
              the boring parts so humans can focus on recovering items.
            </p>
            <ul className="mt-8 space-y-4">
              {AI_FEATURES.map((f) => (
                <li key={f.title} className="flex gap-3">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg gradient-primary text-primary-foreground shadow-glow">
                    <f.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-medium">{f.title}</p>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-4 -z-10 rounded-3xl bg-primary/20 blur-3xl"
            />
            <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-elegant">
              <div className="mb-4 flex items-center gap-2 border-b border-border/60 pb-4">
                <div className="grid h-9 w-9 place-items-center rounded-full gradient-primary text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold">FindBack AI</p>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </div>
              <div className="space-y-3">
                <ChatBubble who="user">
                  I left a blue Hydro Flask in Library Hall around 3pm.
                </ChatBubble>
                <ChatBubble who="ai">
                  Got it. I found 2 possible matches reported in Library Hall today. Want me to
                  draft a claim with proof questions?
                </ChatBubble>
                <ChatBubble who="user">Yes please.</ChatBubble>
                <ChatBubble who="ai">
                  Drafted. I'll ask you a quick proof of ownership (sticker, dent, or contents) and
                  notify the finder. Estimated time to verify: under 5 min.
                </ChatBubble>
              </div>
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Ask FindBack AI...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChatBubble({ who, children }: { who: "user" | "ai"; children: React.ReactNode }) {
  const isAi = who === "ai";
  return (
    <div className={`flex ${isAi ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
          isAi
            ? "rounded-tl-sm border border-border bg-secondary text-foreground"
            : "rounded-tr-sm gradient-primary text-primary-foreground"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

/* ---------------- Waitlist ---------------- */

function Waitlist() {
  const [form, setForm] = useState({ name: "", email: "", institution: "", role: "" });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.institution || !form.role) {
      toast.error("Please fill out every field.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      await submitWaitlist(form);
      toast.success("You're on the list — we'll be in touch soon.");
      setForm({ name: "", email: "", institution: "", role: "" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="waitlist" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-4">
        <SectionHeading
          eyebrow="Get early access"
          title={
            <>
              Join the <span className="gradient-text">FindBack waitlist</span>
            </>
          }
          subtitle="Be the first to know when FindBack opens up for your institution."
        />
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 grid gap-4 rounded-3xl border border-border/60 bg-card p-6 shadow-elegant md:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="w-name">Full Name</Label>
              <Input
                id="w-name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Jane Doe"
                autoComplete="name"
              />
            </div>
            <div>
              <Label htmlFor="w-email">Email</Label>
              <Input
                id="w-email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="jane@university.edu"
                autoComplete="email"
              />
            </div>
            <div>
              <Label htmlFor="w-inst">Institution</Label>
              <Input
                id="w-inst"
                required
                value={form.institution}
                onChange={(e) => setForm({ ...form, institution: e.target.value })}
                placeholder="Your university or school"
              />
            </div>
            <div>
              <Label htmlFor="w-role">Role</Label>
              <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v })}>
                <SelectTrigger id="w-role">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="faculty">Faculty</SelectItem>
                  <SelectItem value="admin">Campus Administrator</SelectItem>
                  <SelectItem value="institution">Institution Rep</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="gradient-primary text-primary-foreground shadow-glow hover:opacity-95"
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Send className="mr-2 h-4 w-4" />
            )}
            {loading ? "Joining..." : "Join the waitlist"}
          </Button>
          <p className="text-xs text-muted-foreground">
            By joining you agree to receive product updates from FindBack. We never share your data.
          </p>
        </motion.form>
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */

function Contact({ config }: { config: LandingPageConfig | null }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error("Please fill out every field.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      await submitContactRequest(form);
      toast.success("Message sent. We'll reply within one business day.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const supportEmail = config?.supportEmail;
  const institutionEmail = config?.institutionEmail;

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Contact"
          title={
            <>
              Let's <span className="gradient-text">talk</span>
            </>
          }
          subtitle="Questions, partnerships, press — we read every message."
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-5">
            {supportEmail && <ContactCard icon={User2} title="Support Email" value={supportEmail} />}
            {institutionEmail && (
              <ContactCard
                icon={Building2}
                title="Institutional Partnerships"
                value={institutionEmail}
              />
            )}
            {!supportEmail && !institutionEmail && (
              <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-card">
                <h3 className="font-semibold text-base">Contact FindBack</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Please use the form to get in touch with our team. We will review your request and get back to you within one business day.
                </p>
              </div>
            )}
          </div>
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid gap-4 rounded-3xl border border-border/60 bg-card p-6 shadow-elegant md:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="c-name">Name</Label>
                <Input
                  id="c-name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  autoComplete="name"
                />
              </div>
              <div>
                <Label htmlFor="c-email">Email</Label>
                <Input
                  id="c-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  autoComplete="email"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="c-subject">Subject</Label>
              <Input
                id="c-subject"
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="c-message">Message</Label>
              <Textarea
                id="c-message"
                rows={5}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="gradient-primary text-primary-foreground shadow-glow hover:opacity-95"
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              {loading ? "Sending..." : "Send message"}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  icon: Icon,
  title,
  value,
}: {
  icon: typeof Mail;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-card">
      <span className="grid h-10 w-10 place-items-center rounded-xl gradient-primary text-primary-foreground shadow-glow">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-sm text-muted-foreground">{value}</p>
      </div>
    </div>
  );
}

/* ---------------- Download ---------------- */

function DownloadSection() {
  const [cfg, setCfg] = useState<MobileAppConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadConfig = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await fetchMobileAppConfig();
      setCfg(data);
    } catch (err) {
      console.error("Failed to load mobile app config:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConfig();
  }, []);

  const version = cfg?.version ?? cfg?.latestVersionName ?? cfg?.latestVersion ?? "1.0.0";
  const notes =
    cfg?.releaseNotes ?? "Initial public beta release with AI Assistant and verified claims.";
  const rawApkUrl = cfg?.apkUrl ?? "";
  const apkUrl = rawApkUrl.replace(/^["']|["']$/g, "").trim();

  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!apkUrl || apkUrl === "#") {
      e.preventDefault();
      toast.error("Download URL is currently unavailable. Please try again later.");
    }
  };

  return (
    <section id="download" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-8 shadow-elegant md:p-12">
          <div aria-hidden className="absolute inset-0 -z-10 gradient-hero" />
          <div className="grid items-center gap-10 md:grid-cols-[1.2fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs font-medium">
                <Smartphone className="h-3.5 w-3.5 text-primary" /> Android APK
              </span>
              <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
                Get the FindBack <span className="gradient-text">mobile app</span>
              </h2>
              <p className="mt-3 text-muted-foreground">
                Install the latest APK to start reporting and recovering items on your campus today.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="gradient-primary text-primary-foreground shadow-glow hover:opacity-95"
                  disabled={loading || error || !apkUrl}
                >
                  <a
                    href={apkUrl || undefined}
                    target="_blank"
                    rel="noreferrer"
                    onClick={handleDownload}
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="mr-2 h-4 w-4" />
                    )}
                    Download APK
                  </a>
                </Button>
                <div className="text-sm text-muted-foreground">
                  <p>
                    Latest version:{" "}
                    <span className="font-medium text-foreground">
                      {loading ? (
                        <span className="inline-block w-8 h-3.5 bg-muted/60 animate-pulse rounded" />
                      ) : error ? (
                        "Unavailable"
                      ) : (
                        `v${version}`
                      )}
                    </span>
                  </p>
                  {!loading && !error && cfg?.releaseDate && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Released: <span className="font-medium">{cfg.releaseDate}</span>
                    </p>
                  )}
                  {error && (
                    <p className="mt-1 inline-flex items-center gap-1 text-xs text-destructive">
                      <AlertCircle className="h-3 w-3" /> Could not load live version info.
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background/60 p-6 backdrop-blur min-h-[140px] flex flex-col justify-between">
              <div>
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> Release notes
                </div>
                {loading ? (
                  <div className="space-y-2 py-1">
                    <div className="h-3.5 bg-muted/60 animate-pulse rounded w-3/4" />
                    <div className="h-3 bg-muted/60 animate-pulse rounded w-5/6" />
                    <div className="h-3 bg-muted/60 animate-pulse rounded w-2/3" />
                  </div>
                ) : error ? (
                  <div className="py-2 text-center">
                    <p className="text-xs text-muted-foreground">
                      Failed to retrieve release logs.
                    </p>
                    <button
                      onClick={loadConfig}
                      className="mt-2 text-xs font-semibold text-primary hover:underline"
                    >
                      Try again
                    </button>
                  </div>
                ) : (
                  <p className="whitespace-pre-line text-sm text-muted-foreground">{notes}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */

const FAQS: { q: string; a: string }[] = [
  {
    q: "How does FindBack work?",
    a: "Choose your institution, sign in, post a lost or found item, and FindBack's AI matches reports and walks both parties through a verified claim until the item is returned.",
  },
  {
    q: "Is FindBack free?",
    a: "FindBack is free for students and faculty at participating institutions. Institutions subscribe to enable advanced admin tools.",
  },
  {
    q: "How are claims verified?",
    a: "Claimants answer ownership questions and submit proofs (photos, codes, contents). Admins and the finder confirm before any hand-off.",
  },
  {
    q: "Can institutions onboard separately?",
    a: "Yes. We work with each institution to enable scoped access, branding, and admin permissions before rollout.",
  },
  {
    q: "Is my data secure?",
    a: "All data is encrypted in transit and at rest. Items and claims are scoped to your institution and never shared across campuses.",
  },
  {
    q: "How does the AI Assistant help users?",
    a: "It accepts natural-language reports, suggests likely matches, drafts claims, and answers common questions to reduce friction for everyone.",
  },
  {
    q: "What devices are supported?",
    a: "FindBack is available as an Android APK today, with iOS and a web companion app on the way.",
  },
];

function FAQ() {
  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-4">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              Questions, <span className="gradient-text">answered</span>
            </>
          }
        />
        <Accordion type="single" collapsible className="mt-10 space-y-3">
          {FAQS.map((f, i) => (
            <AccordionItem
              key={f.q}
              value={`item-${i}`}
              className="rounded-2xl border border-border/60 bg-card px-5 shadow-card data-[state=open]:border-primary/40"
            >
              <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */

function Footer({ config }: { config: LandingPageConfig | null }) {
  const socialLinks = useMemo(() => {
    return [
      { href: config?.githubUrl, label: "GitHub", Icon: Github },
      { href: config?.twitterUrl, label: "Twitter", Icon: Twitter },
      { href: config?.linkedinUrl, label: "LinkedIn", Icon: Linkedin },
    ].filter((s) => s.href && s.href !== "#" && s.href !== "");
  }, [config]);

  return (
    <footer className="border-t border-border/60 bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <a href="#top" className="transition-opacity hover:opacity-90 text-foreground">
            <LogoPlaceholder size="md" />
          </a>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            AI-powered, institution-based lost and found for the modern campus.
          </p>
          {socialLinks.length > 0 && (
            <div className="mt-5 flex items-center gap-2">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-border/60 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          )}
        </div>
        <FooterColumn
          title="Product"
          links={[
            ["Features", "#features"],
            ["How it works", "#how"],
            ["AI Assistant", "#ai"],
            ["Download", "#download"],
          ]}
        />
        <FooterColumn
          title="Company"
          links={[
            ["Institutions", "#institutions"],
            ["Contact", "#contact"],
            ["Waitlist", "#waitlist"],
            ["FAQ", "#faq"],
          ]}
        />
      </div>
      <div className="border-t border-border/60 py-6">
        <p className="mx-auto max-w-7xl px-4 text-center text-xs text-muted-foreground">
          {config?.footerText ?? `© ${new Date().getFullYear()} FindBack. All rights reserved.`}
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <p className="text-sm font-semibold">{title}</p>
      <ul className="mt-4 space-y-2">
        {links.map(([l, h]) => (
          <li key={h}>
            <a href={h} className="text-sm text-muted-foreground hover:text-foreground">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- Page ---------------- */

function LandingPage() {
  const [config, setConfig] = useState<LandingPageConfig | null>(null);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const data = await fetchLandingPageConfig();
        setConfig(data);
      } catch (err) {
        console.error("Failed to load landing page config:", err);
      }
    };
    loadConfig();
  }, []);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Toaster position="top-center" richColors />
      <Navbar />
      <main>
        <Hero config={config} />
        <Features />
        <HowItWorks />
        <AppShowcase />
        <Institutions />
        <Stats />
        <AISection />
        <Waitlist />
        <DownloadSection />
        <Contact config={config} />
        <FAQ />
      </main>
      <Footer config={config} />
    </div>
  );
}
