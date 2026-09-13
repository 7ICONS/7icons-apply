import Image from "next/image";
import Link from "next/link";

const applicationTypes = [
  {
    title: "ICONIA Representative",
    description:
      "Apply to represent the ICONIA community in your city or region and help connect fans across Indonesia.",
    label: "Representative",
    href: "/apply/representative",
    accent: "from-violet-700 to-purple-500",
  },
  {
    title: "Volunteer",
    description:
      "Join community activities and contribute your time, skills, and ideas to support future 7ICONS & ICONIA initiatives.",
    label: "Volunteer",
    href: "/apply/volunteer",
    accent: "from-purple-600 to-fuchsia-500",
  },
  {
    title: "Community",
    description:
      "Submit a community or fanbase application and connect your local community with the 7ICONS Digital Home.",
    label: "Community",
    href: "/apply/community",
    accent: "from-fuchsia-600 to-pink-500",
  },
  {
    title: "Event",
    description:
      "Submit an event proposal or community activity for review by the 7ICONS Digital Home team.",
    label: "Event",
    href: "/apply/event",
    accent: "from-indigo-600 to-violet-500",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#faf8ff] text-slate-950">
      {/* Header */}
      <header className="border-b border-violet-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-36 sm:w-40">
              <Image
                src="/brand/7icons-logo-v2.png"
                alt="7ICONS"
                fill
                priority
                sizes="160px"
                className="object-contain"
              />
            </div>

            <div className="hidden h-8 w-px bg-violet-100 sm:block" />

            <p className="hidden text-sm font-semibold text-slate-500 sm:block">
              Apply
            </p>
          </div>

          <div className="rounded-full border border-violet-100 bg-violet-50 px-4 py-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-700">
              Application Portal
            </p>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-violet-300/25 blur-3xl" />

        <div className="pointer-events-none absolute -right-32 top-10 h-[440px] w-[440px] rounded-full bg-fuchsia-300/20 blur-3xl" />

        <div className="relative mx-auto max-w-[1280px] px-5 pb-20 pt-20 sm:px-8 lg:px-10 lg:pb-28 lg:pt-28">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-600">
              7ICONS & ICONIA
            </p>

            <h1 className="mt-5 max-w-3xl font-serif text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Find your place in the
              <span className="block bg-gradient-to-r from-violet-700 via-purple-600 to-fuchsia-500 bg-clip-text text-transparent">
                ICONIA community.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Apply to become an ICONIA Representative,
              volunteer for community initiatives, register
              your community, or submit an event proposal.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap gap-3 text-sm text-slate-500">
            <span className="rounded-full border border-violet-100 bg-white px-4 py-2">
              One application portal
            </span>

            <span className="rounded-full border border-violet-100 bg-white px-4 py-2">
              Application tracking
            </span>

            <span className="rounded-full border border-violet-100 bg-white px-4 py-2">
              Reviewed by the 7ICONS team
            </span>
          </div>
        </div>
      </section>

      {/* Application Types */}
      <section className="border-y border-violet-100 bg-white">
        <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-600">
              Application Paths
            </p>

            <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              Choose how you want to contribute.
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Each application follows its own review process
              while staying connected through one application
              system.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {applicationTypes.map((application) => (
              <Link
                key={application.label}
                href={application.href}
                className="group relative block overflow-hidden rounded-[1.75rem] border border-violet-100 bg-[#fcfbff] p-7 transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-950/5 sm:p-8"
              >
                <div
                  className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${application.accent}`}
                />

                <p className="mt-7 text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">
                  {application.label}
                </p>

                <h3 className="mt-3 font-serif text-2xl font-semibold">
                  {application.title}
                </h3>

                <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">
                  {application.description}
                </p>

                <div className="mt-7 inline-flex rounded-full border border-violet-100 bg-white px-4 py-2 text-xs font-semibold text-violet-700 transition group-hover:border-violet-200 group-hover:bg-violet-50">
                  View application →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section>
        <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-600">
                How It Works
              </p>

              <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                From application to review.
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                The portal will guide applicants from their
                first submission through the review process
                managed by the 7ICONS administration team.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  number: "01",
                  title: "Apply",
                  text: "Choose an application type and submit the required information.",
                },
                {
                  number: "02",
                  title: "Review",
                  text: "The administration team reviews and manages your application.",
                },
                {
                  number: "03",
                  title: "Result",
                  text: "Track the status and receive the final result of your application.",
                },
              ].map((step) => (
                <div
                  key={step.number}
                  className="rounded-2xl border border-violet-100 bg-white p-6"
                >
                  <p className="text-sm font-bold text-violet-600">
                    {step.number}
                  </p>

                  <h3 className="mt-4 font-serif text-xl font-semibold">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-violet-100 bg-white">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-5 py-8 text-sm text-slate-500 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <p>
            7ICONS Apply — Official application portal for
            the 7ICONS & ICONIA digital community.
          </p>

          <p>Built for ICONIA by ICONIA.</p>
        </div>
      </footer>
    </main>
  );
}