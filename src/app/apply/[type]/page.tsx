import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type ApplicationType =
  | "representative"
  | "volunteer"
  | "community"
  | "event";

type ApplicationPageProps = {
  params: Promise<{
    type: string;
  }>;
};

const applicationTypes: Record<
  ApplicationType,
  {
    eyebrow: string;
    title: string;
    description: string;
    detail: string;
    accent: string;
  }
> = {
  representative: {
    eyebrow: "ICONIA Representative",
    title: "Represent ICONIA in your region.",
    description:
      "Apply to become an official ICONIA Representative and help connect fans in your city or region with the wider 7ICONS & ICONIA community.",
    detail:
      "Representative applications will be reviewed by the 7ICONS Digital Home administration team. Approved applications may continue into the ICONIA Representative profile process.",
    accent: "from-violet-700 to-purple-500",
  },

  volunteer: {
    eyebrow: "Volunteer",
    title: "Contribute your skills to the community.",
    description:
      "Apply as a volunteer and take part in future community activities, projects, and initiatives connected to 7ICONS & ICONIA.",
    detail:
      "Volunteer applications help us understand how you would like to contribute and which skills or areas you are interested in supporting.",
    accent: "from-purple-600 to-fuchsia-500",
  },

  community: {
    eyebrow: "Community",
    title: "Connect your community with ICONIA.",
    description:
      "Register a fan community or local group and introduce it to the wider 7ICONS Digital Home ecosystem.",
    detail:
      "Community applications will be reviewed before becoming part of future community collaboration and directory features.",
    accent: "from-fuchsia-600 to-pink-500",
  },

  event: {
    eyebrow: "Event",
    title: "Submit an event or activity proposal.",
    description:
      "Propose a community event, gathering, or activity related to 7ICONS & ICONIA for review by the administration team.",
    detail:
      "Provide information about your proposed event so the administration team can review its purpose, plan, and community relevance.",
    accent: "from-indigo-600 to-violet-500",
  },
};

function isApplicationType(
  value: string,
): value is ApplicationType {
  return value in applicationTypes;
}

export function generateStaticParams() {
  return Object.keys(applicationTypes).map(
    (type) => ({
      type,
    }),
  );
}

export default async function ApplicationPage({
  params,
}: ApplicationPageProps) {
  const { type } = await params;

  if (!isApplicationType(type)) {
    notFound();
  }

  const application = applicationTypes[type];

  return (
    <main className="min-h-screen bg-[#faf8ff] text-slate-950">
      {/* Header */}
      <header className="border-b border-violet-100 bg-white">
        <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <Link
            href="/"
            className="flex items-center gap-4"
          >
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

            <span className="hidden text-sm font-semibold text-slate-500 sm:block">
              Apply
            </span>
          </Link>

          <Link
            href="/"
            className="rounded-full border border-violet-100 bg-violet-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-violet-700 transition hover:bg-violet-100"
          >
            All Applications
          </Link>
        </div>
      </header>

      {/* Application Intro */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-violet-300/25 blur-3xl" />

        <div className="pointer-events-none absolute -right-40 bottom-10 h-[460px] w-[460px] rounded-full bg-purple-300/20 blur-3xl" />

        <div className="relative mx-auto grid min-h-[calc(100vh-80px)] max-w-[1180px] items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-20">
          {/* Left */}
          <div>
            <div
              className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${application.accent}`}
            />

            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-violet-600">
              {application.eyebrow}
            </p>

            <h1 className="mt-4 max-w-xl font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {application.title}
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">
              {application.description}
            </p>

            <Link
              href="/"
              className="mt-8 inline-flex text-sm font-semibold text-violet-700 transition hover:text-violet-900"
            >
              ← Back to application portal
            </Link>
          </div>

          {/* Right */}
          <div className="rounded-[2rem] border border-violet-100 bg-white p-7 shadow-2xl shadow-violet-950/5 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
              Application
            </p>

            <h2 className="mt-3 font-serif text-3xl font-semibold">
              Before you apply
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-600">
              {application.detail}
            </p>

            <div className="mt-8 space-y-4">
              <div className="rounded-2xl border border-violet-100 bg-[#faf8ff] p-5">
                <p className="text-sm font-semibold text-slate-900">
                  01 — Complete your information
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Provide the information required for this
                  application type.
                </p>
              </div>

              <div className="rounded-2xl border border-violet-100 bg-[#faf8ff] p-5">
                <p className="text-sm font-semibold text-slate-900">
                  02 — Submit for review
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Your application will enter the
                  administration review workflow.
                </p>
              </div>

              <div className="rounded-2xl border border-violet-100 bg-[#faf8ff] p-5">
                <p className="text-sm font-semibold text-slate-900">
                  03 — Track the result
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Application status and review results will
                  be available through 7ICONS Apply.
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-violet-200 bg-violet-50 px-5 py-4">
              <p className="text-sm font-semibold text-violet-800">
                Application form setup
              </p>

              <p className="mt-2 text-sm leading-6 text-violet-700/75">
                The application form will be connected to the
                existing 7ICONS administration workflow in
                the next development step.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}