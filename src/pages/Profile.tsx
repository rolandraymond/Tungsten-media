"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Download,
  Cpu,
  Zap,
  ShieldCheck,
  Layers,
  ArrowUpRight,
  Sparkles,
  Eye,
} from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import MagneticButton from "@/components/ui/MagneticButton";
import { useTranslation } from "@/hooks/use-translation";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  desc: string;
  reduceMotion?: boolean;
}

const FeatureCard = ({
  icon: Icon,
  title,
  desc,
  reduceMotion = false,
}: FeatureCardProps) => (
  <motion.div
    whileHover={reduceMotion ? undefined : { y: -4, scale: 1.01 }}
    transition={{ type: "spring", stiffness: 220, damping: 18 }}
    className="group relative overflow-hidden rounded-[1.75rem] border border-border/50 bg-card/40 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.06)] backdrop-blur-2xl sm:p-6"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    <div className="relative flex items-start gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border/50 bg-background/60 text-primary shadow-sm">
        <Icon size={22} />
      </div>

      <div className="min-w-0">
        <h3 className="text-sm font-black uppercase tracking-[0.22em] text-foreground sm:text-[13px]">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{desc}</p>
      </div>
    </div>
  </motion.div>
);

type LazyPdfPageProps = {
  pageNumber: number;
  width: number;
  rootRef: React.RefObject<HTMLDivElement | null>;
  reduceMotion: boolean;
};

const LazyPdfPage = ({
  pageNumber,
  width,
  rootRef,
  reduceMotion,
}: LazyPdfPageProps) => {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const rootEl = rootRef.current;
    const targetEl = boxRef.current;
    if (!rootEl || !targetEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        root: rootEl,
        rootMargin: "300px 0px",
        threshold: 0.01,
      }
    );

    observer.observe(targetEl);

    return () => observer.disconnect();
  }, [rootRef]);

  return (
    <div
      ref={boxRef}
      className="overflow-hidden rounded-[1.35rem] border border-border/40 bg-card/35 shadow-[0_12px_35px_rgba(0,0,0,0.08)]"
    >
      {isVisible ? (
        <Page
          pageNumber={pageNumber}
          width={width}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          loading={
            <div className="flex aspect-[1/1.42] items-center justify-center bg-background">
              <motion.span
                className="h-2.5 w-2.5 rounded-full bg-primary"
                animate={
                  reduceMotion
                    ? { scale: 1, opacity: 1 }
                    : { scale: [1, 1.25, 1], opacity: [0.4, 1, 0.4] }
                }
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          }
        />
      ) : (
        <div className="flex aspect-[1/1.42] items-center justify-center bg-background">
          <motion.span
            className="h-2.5 w-2.5 rounded-full bg-primary"
            animate={
              reduceMotion
                ? { scale: 1, opacity: 1 }
                : { scale: [1, 1.25, 1], opacity: [0.4, 1, 0.4] }
            }
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      )}
    </div>
  );
};

const CompanyProfile = () => {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion() ?? false;

  const pdfUrl = "/assets/Tungsten_Profile.pdf";

  const pdfShellRef = useRef<HTMLDivElement | null>(null);
  const pdfWrapRef = useRef<HTMLDivElement | null>(null);

  const [numPages, setNumPages] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [isPdfReady, setIsPdfReady] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const updateWidth = () => {
      const width = pdfShellRef.current?.offsetWidth ?? 0;
      const next = Math.max(width, 320);

      setContainerWidth((prev) => {
        return Math.abs(prev - next) > 8 ? next : prev;
      });
    };

    updateWidth();

    if (!pdfShellRef.current) return;

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(() => updateWidth());
      observer.observe(pdfShellRef.current);
      return () => observer.disconnect();
    }

    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const cards = useMemo(
    () => [
      {
        icon: Zap,
        title: t("feature.tech.title"),
        desc: t("feature.tech.desc"),
      },
      {
        icon: ShieldCheck,
        title: t("feature.quality.title"),
        desc: t("feature.quality.desc"),
      },
      {
        icon: Layers,
        title: t("feature.scale.title"),
        desc: t("feature.scale.desc"),
      },
    ],
    [t]
  );

  const pageWidth = Math.min(Math.max(containerWidth - 32, 320), 820);

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-background pt-24 pb-12 sm:pt-28 sm:pb-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.03),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.03),transparent_28%)]" />

        <motion.div
          animate={
            reduceMotion
              ? { opacity: 0.12 }
              : { scale: [1, 1.08, 1], opacity: [0.12, 0.22, 0.12] }
          }
          transition={
            reduceMotion
              ? { duration: 0.2 }
              : { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }
          className="absolute -top-24 right-[-8rem] h-[30rem] w-[30rem] rounded-full bg-primary/10 blur-[120px]"
        />

        <motion.div
          animate={
            reduceMotion
              ? { opacity: 0.08 }
              : { scale: [1, 1.12, 1], opacity: [0.08, 0.16, 0.08] }
          }
          transition={
            reduceMotion
              ? { duration: 0.2 }
              : { duration: 12, repeat: Infinity, ease: "easeInOut" }
          }
          className="absolute bottom-[-10rem] left-[-8rem] h-[28rem] w-[28rem] rounded-full bg-foreground/5 blur-[130px]"
        />

        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:52px_52px] text-foreground" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="mb-8 grid gap-8 lg:mb-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div className="max-w-3xl">
            <motion.div
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/60 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.35em] text-primary backdrop-blur-xl"
            >
              <Cpu size={13} />
              <span>Tungsten Core / Identity Vault</span>
            </motion.div>

            <motion.h1
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl font-black uppercase leading-[0.95] tracking-[-0.06em] text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {t("profile.title")}
              <span className="mt-3 block text-2xl font-light tracking-normal text-foreground/45 sm:text-3xl md:text-4xl">
                {t("profile.subtitle")}
              </span>
            </motion.h1>

            <motion.p
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }}
              className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base md:text-lg"
            >
              {t("profile.description")}
            </motion.p>

            <motion.div
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.16, ease: "easeOut" }}
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/40 px-4 py-2 text-xs font-semibold text-muted-foreground backdrop-blur-xl">
                <Sparkles size={14} className="text-primary" />
                PDF ready on mobile
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/40 px-4 py-2 text-xs font-semibold text-muted-foreground backdrop-blur-xl">
                <Eye size={14} className="text-primary" />
                Inline scroll viewer
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: "easeOut" }}
            className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1"
          >
            <div className="rounded-[1.5rem] border border-border/50 bg-card/40 p-4 backdrop-blur-2xl">
              <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-muted-foreground">
                Profile
              </div>
              <div className="mt-2 text-lg font-black uppercase text-foreground">
                Tungsten
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-border/50 bg-card/40 p-4 backdrop-blur-2xl">
              <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-muted-foreground">
                Format
              </div>
              <div className="mt-2 text-lg font-black uppercase text-foreground">
                PDF
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-border/50 bg-card/40 p-4 backdrop-blur-2xl">
              <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-muted-foreground">
                View
              </div>
              <div className="mt-2 text-lg font-black uppercase text-foreground">
                Mobile First
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:gap-10">
          <div className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            {cards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
              >
                <FeatureCard
                  icon={card.icon}
                  title={card.title}
                  desc={card.desc}
                  reduceMotion={reduceMotion}
                />
              </motion.div>
            ))}

            <motion.div
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24, ease: "easeOut" }}
              className="rounded-[1.75rem] border border-border/50 bg-card/40 p-5 backdrop-blur-2xl sm:p-6"
            >
              <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.35em] text-muted-foreground">
                Actions
              </div>

              <a href={pdfUrl} download className="group block">
                <span className="flex w-full items-center justify-center gap-3 rounded-2xl bg-foreground px-5 py-4 text-background shadow-[0_20px_45px_rgba(0,0,0,0.18)] transition-transform duration-200 group-hover:scale-[1.01]">
                  <Download size={18} />
                  <span className="text-xs font-black uppercase tracking-[0.22em]">
                    {t("profile.download")}
                  </span>
                </span>
              </a>

              <div className="mt-3 flex items-center justify-between rounded-2xl border border-border/40 bg-background/45 px-4 py-3 text-xs text-muted-foreground">
                <span>{t("profile.status")}</span>
                <span className="inline-flex items-center gap-2 font-semibold text-foreground">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  Live preview
                </span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="absolute -inset-2 rounded-[2.25rem] bg-primary/10 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-border/50 bg-card/40 shadow-[0_24px_90px_rgba(0,0,0,0.18)] backdrop-blur-2xl">
              <div className="flex items-center justify-between gap-4 border-b border-border/40 bg-background/55 px-4 py-3 backdrop-blur-xl sm:px-5">
                <div className="min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-muted-foreground">
                    Company Profile
                  </div>
                  <div className="mt-1 truncate text-sm font-semibold text-foreground">
                    Tungsten Profile PDF
                  </div>
                </div>

                <div className="hidden items-center gap-2 sm:flex">
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/60 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-foreground transition hover:bg-primary hover:text-background"
                  >
                    Open
                    <ArrowUpRight size={14} />
                  </a>
                  <a
                    href={pdfUrl}
                    download
                    className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-background"
                  >
                    <Download size={14} />
                    Download
                  </a>
                </div>
              </div>

              <div className="border-b border-border/30 bg-primary/5 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground sm:hidden">
                Scroll inside the profile to browse pages
              </div>

              <div
                ref={pdfShellRef}
                className="w-full"
              >
                <div
                  ref={pdfWrapRef}
                  className="h-[78svh] min-h-[620px] w-full overflow-y-auto overscroll-contain bg-background [-webkit-overflow-scrolling:touch] touch-pan-y sm:h-[78vh] md:min-h-[720px] lg:h-[760px]"
                >
                  <div className="relative p-3 sm:p-4 md:p-5">
                    <AnimatePresence>
                      {!isClient && (
                        <motion.div
                          initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex h-[65vh] items-center justify-center rounded-[1.5rem] border border-border/40 bg-card/30"
                        >
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <motion.span
                              className="h-2.5 w-2.5 rounded-full bg-primary"
                              animate={
                                reduceMotion
                                  ? { scale: 1, opacity: 1 }
                                  : { scale: [1, 1.25, 1], opacity: [0.4, 1, 0.4] }
                              }
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            />
                            Preparing preview...
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {isClient && (
                      <Document
                        file={pdfUrl}
                        onLoadSuccess={({ numPages }) => {
                          setNumPages(numPages);
                          setIsPdfReady(true);
                        }}
                        loading={
                          <div className="flex h-[65vh] items-center justify-center rounded-[1.5rem] border border-border/40 bg-card/30">
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <motion.span
                                className="h-2.5 w-2.5 rounded-full bg-primary"
                                animate={
                                  reduceMotion
                                    ? { scale: 1, opacity: 1 }
                                    : { scale: [1, 1.25, 1], opacity: [0.4, 1, 0.4] }
                                }
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }}
                              />
                              Loading PDF...
                            </div>
                          </div>
                        }
                        error={
                          <div className="flex h-[65vh] items-center justify-center rounded-[1.5rem] border border-border/40 bg-card/30 p-6 text-center text-sm text-muted-foreground">
                            PDF could not be loaded in this browser.
                          </div>
                        }
                        className="w-full"
                      >
                        <div className="flex flex-col gap-4 sm:gap-5">
                          {Array.from({ length: numPages }, (_, index) => (
                            <motion.div
                              key={`page_${index + 1}`}
                              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
                              animate={isPdfReady ? { opacity: 1, y: 0 } : {}}
                              transition={{ duration: 0.4, delay: index * 0.02 }}
                            >
                              <LazyPdfPage
                                pageNumber={index + 1}
                                width={pageWidth}
                                rootRef={pdfWrapRef}
                                reduceMotion={reduceMotion}
                              />
                            </motion.div>
                          ))}
                        </div>
                      </Document>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;