"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

import { createClient } from "@/lib/supabase/client";

type ApplicationStatus =
  | "submitted"
  | "under_review"
  | "approved"
  | "rejected"
  | "withdrawn";

type TrackedApplication = {
  id: string;
  application_type: string;
  status: ApplicationStatus;
  full_name: string;
  created_at: string;
  updated_at: string;
};

const statusConfig: Record<
  ApplicationStatus,
  {
    label: string;
    description: string;
    badgeClass: string;
  }
> = {
  submitted: {
    label: "Submitted",
    description:
      "Your application has been received and is waiting to be reviewed.",
    badgeClass:
      "border-blue-200 bg-blue-50 text-blue-700",
  },
  under_review: {
    label: "Under Review",
    description:
      "Your application is currently being reviewed by the 7ICONS team.",
    badgeClass:
      "border-amber-200 bg-amber-50 text-amber-700",
  },
  approved: {
    label: "Approved",
    description:
      "Your application has been approved by the 7ICONS team.",
    badgeClass:
      "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  rejected: {
    label: "Rejected",
    description:
      "Your application was not approved during this review.",
    badgeClass:
      "border-red-200 bg-red-50 text-red-700",
  },
  withdrawn: {
    label: "Withdrawn",
    description:
      "This application is no longer active.",
    badgeClass:
      "border-slate-200 bg-slate-100 text-slate-600",
  },
};

const applicationTypeLabels: Record<
  string,
  string
> = {
  representative: "ICONIA Representative",
  volunteer: "Volunteer",
  community: "Community Registration",
  event: "Event Application",
};

export default function TrackApplicationPage() {
  const [applicationId, setApplicationId] =
    useState("");
  const [email, setEmail] = useState("");

  const [application, setApplication] =
    useState<TrackedApplication | null>(null);

  const [searchedEmail, setSearchedEmail] =
    useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] =
    useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const cleanApplicationId =
      applicationId.trim();

    const cleanEmail = email
      .trim()
      .toLowerCase();

    setError("");
    setApplication(null);

    if (!cleanApplicationId || !cleanEmail) {
      setError(
        "Please enter your Application ID and email address.",
      );
      return;
    }

    if (!cleanEmail.includes("@")) {
      setError(
        "Please enter a valid email address.",
      );
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();

      const { data, error: rpcError } =
        await supabase.rpc(
          "track_application",
          {
            p_application_id:
              cleanApplicationId,
            p_email: cleanEmail,
          },
        );

      if (rpcError) {
        console.error(
          "Application tracking error:",
          rpcError,
        );

        setError(
          "We could not check your application right now. Please try again.",
        );

        return;
      }

      const result =
        Array.isArray(data) && data.length > 0
          ? (data[0] as TrackedApplication)
          : null;

      if (!result) {
        setError(
          "Application not found. Please check your Application ID and email address.",
        );
        return;
      }

      setSearchedEmail(cleanEmail);
      setApplication(result);
    } catch (trackingError) {
      console.error(
        "Application tracking error:",
        trackingError,
      );

      setError(
        "We could not check your application right now. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  function resetTracking() {
    setApplication(null);
    setError("");
    setApplicationId("");
    setEmail("");
    setSearchedEmail("");
  }

  return (
    <main className="min-h-screen bg-[#faf8ff] text-slate-950">
      {/* Header */}
      <header className="border-b border-violet-100 bg-white/90 backdrop-blur">
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

            <p className="hidden text-sm font-semibold text-slate-500 sm:block">
              Apply
            </p>
          </Link>

          <Link
            href="/"
            className="rounded-full border border-violet-100 bg-white px-4 py-2 text-xs font-semibold text-violet-700 transition hover:border-violet-200 hover:bg-violet-50"
          >
            ← Back to Apply
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-violet-300/25 blur-3xl" />

        <div className="pointer-events-none absolute -right-32 top-10 h-[440px] w-[440px] rounded-full bg-fuchsia-300/20 blur-3xl" />

        <div className="relative mx-auto max-w-[1100px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-600">
              Application Tracking
            </p>

            <h1 className="mt-5 font-serif text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Track your application.
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Enter the Application ID you received
              after submitting your form together
              with the email address used in your
              application.
            </p>
          </div>

          {!application ? (
            <div className="mx-auto mt-12 max-w-2xl">
              <form
                onSubmit={handleSubmit}
                className="rounded-[2rem] border border-violet-100 bg-white p-6 shadow-xl shadow-violet-950/5 sm:p-8"
              >
                <div>
                  <label
                    htmlFor="application-id"
                    className="text-sm font-semibold text-slate-800"
                  >
                    Application ID
                  </label>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    You received this ID after
                    successfully submitting your
                    application.
                  </p>

                  <input
                    id="application-id"
                    type="text"
                    value={applicationId}
                    onChange={(event) =>
                      setApplicationId(
                        event.target.value,
                      )
                    }
                    placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                    autoComplete="off"
                    className="mt-3 w-full rounded-2xl border border-violet-100 bg-[#fcfbff] px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                  />
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-slate-800"
                  >
                    Email Address
                  </label>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Use the same email address from
                    your application.
                  </p>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="mt-3 w-full rounded-2xl border border-violet-100 bg-[#fcfbff] px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                  />
                </div>

                {error ? (
                  <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
                    {error}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-7 flex w-full items-center justify-center rounded-2xl bg-violet-700 px-5 py-4 text-sm font-semibold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading
                    ? "Checking application..."
                    : "Track Application"}
                </button>
              </form>

              <div className="mt-6 rounded-2xl border border-violet-100 bg-violet-50/70 px-5 py-4">
                <p className="text-sm leading-6 text-slate-600">
                  For your privacy, both your
                  Application ID and registered email
                  address must match before an
                  application status can be shown.
                </p>
              </div>
            </div>
          ) : (
            <ApplicationResult
              application={application}
              email={searchedEmail}
              onReset={resetTracking}
            />
          )}
        </div>
      </section>
    </main>
  );
}

function ApplicationResult({
  application,
  email,
  onReset,
}: {
  application: TrackedApplication;
  email: string;
  onReset: () => void;
}) {
  const status =
    statusConfig[application.status] ??
    statusConfig.submitted;

  const typeLabel =
    applicationTypeLabels[
      application.application_type
    ] ?? application.application_type;

  const isApprovedRepresentative =
    application.application_type ===
      "representative" &&
    application.status === "approved";

  return (
    <div className="mx-auto mt-12 max-w-3xl">
      <div className="overflow-hidden rounded-[2rem] border border-violet-100 bg-white shadow-xl shadow-violet-950/5">
        <div className="border-b border-violet-100 p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">
                {typeLabel}
              </p>

              <h2 className="mt-3 font-serif text-3xl font-semibold">
                {application.full_name}
              </h2>

              <p className="mt-2 break-all font-mono text-xs text-slate-400">
                {application.id}
              </p>
            </div>

            <span
              className={`w-fit rounded-full border px-4 py-2 text-xs font-semibold ${status.badgeClass}`}
            >
              {status.label}
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Current Status
            </p>

            <p className="mt-3 text-lg font-semibold text-slate-900">
              {status.label}
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              {status.description}
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <InformationCard
              label="Submitted"
              value={formatDate(
                application.created_at,
              )}
            />

            <InformationCard
              label="Last Updated"
              value={formatDate(
                application.updated_at,
              )}
            />
          </div>

          <ApplicationProgress
            status={application.status}
          />

          {isApprovedRepresentative ? (
            <RepresentativeApprovedNotice
              email={email}
            />
          ) : null}

          <button
            type="button"
            onClick={onReset}
            className="mt-8 w-full rounded-2xl border border-violet-200 bg-white px-5 py-3.5 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"
          >
            Track Another Application
          </button>
        </div>
      </div>
    </div>
  );
}

function ApplicationProgress({
  status,
}: {
  status: ApplicationStatus;
}) {
  const steps = [
    {
      key: "submitted",
      label: "Submitted",
    },
    {
      key: "under_review",
      label: "Under Review",
    },
    {
      key: "result",
      label:
        status === "approved"
          ? "Approved"
          : status === "rejected"
            ? "Rejected"
            : status === "withdrawn"
              ? "Withdrawn"
              : "Result",
    },
  ];

  const activeStep =
    status === "submitted"
      ? 0
      : status === "under_review"
        ? 1
        : 2;

  return (
    <div className="mt-8">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
        Application Progress
      </p>

      <div className="mt-5 grid grid-cols-3 gap-2">
        {steps.map((step, index) => {
          const completed =
            index <= activeStep;

          return (
            <div
              key={step.key}
              className="text-center"
            >
              <div
                className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full border text-xs font-bold ${
                  completed
                    ? "border-violet-700 bg-violet-700 text-white"
                    : "border-violet-100 bg-white text-slate-400"
                }`}
              >
                {index + 1}
              </div>

              <p
                className={`mt-3 text-xs font-semibold ${
                  completed
                    ? "text-slate-800"
                    : "text-slate-400"
                }`}
              >
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RepresentativeApprovedNotice({
  email,
}: {
  email: string;
}) {
  return (
    <div className="mt-8 rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
        Representative Onboarding
      </p>

      <h3 className="mt-3 font-serif text-2xl font-semibold text-slate-950">
        Congratulations! Your representative
        application has been approved.
      </h3>

      <p className="mt-4 text-sm leading-7 text-slate-700">
        The next step is your ICONIA
        Representative onboarding. An invitation
        link will be sent directly to the email
        address used in your application.
      </p>

      <div className="mt-4 rounded-xl border border-emerald-200 bg-white/70 px-4 py-3">
        <p className="text-xs text-slate-500">
          Invitation email
        </p>

        <p className="mt-1 text-sm font-semibold text-slate-800">
          {maskEmail(email)}
        </p>
      </div>

      <p className="mt-4 text-xs leading-6 text-slate-600">
        Please check your inbox and spam folder.
        The invitation link will guide you through
        the next onboarding step.
      </p>
    </div>
  );
}

function InformationCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-violet-100 bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(value));
}

function maskEmail(email: string) {
  const [localPart, domain] =
    email.split("@");

  if (!localPart || !domain) {
    return email;
  }

  const visibleCharacters =
    localPart.length <= 2 ? 1 : 2;

  const visible = localPart.slice(
    0,
    visibleCharacters,
  );

  return `${visible}${"*".repeat(
    Math.max(
      3,
      localPart.length -
        visibleCharacters,
    ),
  )}@${domain}`;
}