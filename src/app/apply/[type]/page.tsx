import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  submitCommunityApplication,
  submitRepresentativeApplication,
  submitVolunteerApplication,
} from "./actions";

type ApplicationType =
  | "representative"
  | "volunteer"
  | "community"
  | "event";

type ApplicationPageProps = {
  params: Promise<{
    type: string;
  }>;

  searchParams: Promise<{
    error?: string;
    submitted?: string;
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
      "Apply to become an ICONIA Representative and help connect fans in your city or region with the wider 7ICONS & ICONIA community.",
    detail:
      "Representative applications are reviewed by the 7ICONS Digital Home administration team. Approved applications may continue into the ICONIA Representative onboarding process.",
    accent: "from-violet-700 to-purple-500",
  },

  volunteer: {
    eyebrow: "Volunteer",
    title: "Contribute your skills to the community.",
    description:
      "Apply as a volunteer and take part in future community activities, projects, and initiatives connected to 7ICONS & ICONIA.",
    detail:
      "Volunteer applications help us understand how you would like to contribute, what skills you can offer, and which areas you are interested in supporting.",
    accent: "from-purple-600 to-fuchsia-500",
  },

  community: {
    eyebrow: "Community",
    title: "Connect your community with ICONIA.",
    description:
      "Register a fan community or local group and introduce it to the wider 7ICONS Digital Home ecosystem.",
    detail:
      "Community applications help the administration team understand your community, its activities, member base, and how you would like to collaborate with the wider ICONIA ecosystem.",
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
  searchParams,
}: ApplicationPageProps) {
  const { type } = await params;

  const { error, submitted } =
    await searchParams;

  if (!isApplicationType(type)) {
    notFound();
  }

  const application =
    applicationTypes[type];

  const isRepresentative =
    type === "representative";

  const isVolunteer =
    type === "volunteer";

  const isCommunity =
    type === "community";

  const isEvent =
    type === "event";

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

      {/* Intro */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-violet-300/25 blur-3xl" />

        <div className="pointer-events-none absolute -right-40 top-40 h-[460px] w-[460px] rounded-full bg-purple-300/20 blur-3xl" />

        <div className="relative mx-auto max-w-[1180px] px-5 pb-10 pt-16 sm:px-8 lg:px-10 lg:pt-20">
          <div className="max-w-3xl">
            <div
              className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${application.accent}`}
            />

            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-violet-600">
              {application.eyebrow}
            </p>

            <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {application.title}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
              {application.description}
            </p>

            <Link
              href="/"
              className="mt-7 inline-flex text-sm font-semibold text-violet-700 transition hover:text-violet-900"
            >
              ← Back to application portal
            </Link>
          </div>
        </div>
      </section>

      {/* Representative */}
      {isRepresentative && (
        <section className="relative mx-auto max-w-[1180px] px-5 pb-24 pt-10 sm:px-8 lg:px-10">
          {submitted ? (
            <SuccessPanel
              applicationType="ICONIA Representative"
              submitted={submitted}
            />
          ) : (
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
              <ApplicationFormCard
                eyebrow="Representative Application"
                title="Tell us about yourself."
                description="Complete the information below. Fields marked with an asterisk are required."
                error={error}
              >
                <form
                  action={
                    submitRepresentativeApplication
                  }
                  className="space-y-10 px-6 py-8 sm:px-8"
                >
                  <ApplicantInformationFields
                    includeOccupation
                    includeInstagram
                  />

                  <SectionDivider />

                  <fieldset>
                    <legend className="text-lg font-semibold text-slate-950">
                      Representative Questions
                    </legend>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Help the administration team
                      understand your connection to
                      ICONIA and how you would
                      represent your region.
                    </p>

                    <div className="mt-6 space-y-6">
                      <TextAreaField
                        label="How long have you been part of ICONIA?"
                        name="iconia_experience"
                        placeholder="Tell us about your journey as part of ICONIA..."
                        required
                      />

                      <TextAreaField
                        label="Have you ever managed or joined a fan community?"
                        name="community_experience"
                        placeholder="Tell us about any fan community or organizational experience you have..."
                        required
                      />

                      <TextAreaField
                        label="Why do you want to become an ICONIA Representative?"
                        name="motivation"
                        placeholder="Tell us why you are interested in representing ICONIA..."
                        required
                      />

                      <TextAreaField
                        label="What would you like to do for ICONIA in your region?"
                        name="regional_plan"
                        placeholder="Describe your ideas, plans, or activities for ICONIA in your region..."
                        required
                      />

                      <TextAreaField
                        label="How much time can you contribute?"
                        name="availability"
                        placeholder="Tell us about your availability and how often you can participate..."
                        required
                      />

                      <TextAreaField
                        label="Additional Information"
                        name="additional_information"
                        placeholder="Anything else you would like the review team to know..."
                      />
                    </div>
                  </fieldset>

                  <SectionDivider />

                  <ConfirmationField />

                  <SubmitButton>
                    Submit Representative Application
                  </SubmitButton>
                </form>
              </ApplicationFormCard>

              <RepresentativeSidebar
                detail={application.detail}
              />
            </div>
          )}
        </section>
      )}

      {/* Volunteer */}
      {isVolunteer && (
        <section className="relative mx-auto max-w-[1180px] px-5 pb-24 pt-10 sm:px-8 lg:px-10">
          {submitted ? (
            <SuccessPanel
              applicationType="Volunteer"
              submitted={submitted}
            />
          ) : (
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
              <ApplicationFormCard
                eyebrow="Volunteer Application"
                title="Tell us how you can contribute."
                description="Share your skills, interests, and availability to help us understand how you would like to support the 7ICONS & ICONIA community."
                error={error}
              >
                <form
                  action={
                    submitVolunteerApplication
                  }
                  className="space-y-10 px-6 py-8 sm:px-8"
                >
                  <ApplicantInformationFields
                    includeOccupation
                    includeInstagram
                  />

                  <SectionDivider />

                  <fieldset>
                    <legend className="text-lg font-semibold text-slate-950">
                      Volunteer Questions
                    </legend>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Tell us about your skills,
                      experience, and the areas where
                      you would like to contribute.
                    </p>

                    <div className="mt-6 space-y-6">
                      <TextAreaField
                        label="What skills can you contribute?"
                        name="skills"
                        placeholder="Example: design, photography, video editing, social media, event coordination, writing..."
                        required
                      />

                      <TextAreaField
                        label="Do you have previous volunteer or organizational experience?"
                        name="volunteer_experience"
                        placeholder="Tell us about any volunteer, organization, event, or community experience you have..."
                        required
                      />

                      <TextAreaField
                        label="Which areas would you like to contribute to?"
                        name="contribution_areas"
                        placeholder="Tell us which activities or areas you are most interested in supporting..."
                        required
                      />

                      <TextAreaField
                        label="Why do you want to volunteer with the 7ICONS & ICONIA community?"
                        name="motivation"
                        placeholder="Tell us what motivates you to become a volunteer..."
                        required
                      />

                      <TextAreaField
                        label="How much time can you contribute?"
                        name="availability"
                        placeholder="Tell us about your availability and how often you can participate..."
                        required
                      />

                      <TextAreaField
                        label="Additional Information"
                        name="additional_information"
                        placeholder="Anything else you would like the review team to know..."
                      />
                    </div>
                  </fieldset>

                  <SectionDivider />

                  <ConfirmationField />

                  <SubmitButton>
                    Submit Volunteer Application
                  </SubmitButton>
                </form>
              </ApplicationFormCard>

              <VolunteerSidebar
                detail={application.detail}
              />
            </div>
          )}
        </section>
      )}

      {/* Community */}
      {isCommunity && (
        <section className="relative mx-auto max-w-[1180px] px-5 pb-24 pt-10 sm:px-8 lg:px-10">
          {submitted ? (
            <SuccessPanel
              applicationType="Community"
              submitted={submitted}
            />
          ) : (
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
              <ApplicationFormCard
                eyebrow="Community Application"
                title="Tell us about your community."
                description="Register your fan community or local group and tell us how it connects with the wider ICONIA community."
                error={error}
              >
                <form
                  action={
                    submitCommunityApplication
                  }
                  className="space-y-10 px-6 py-8 sm:px-8"
                >
                  <fieldset>
                    <legend className="text-lg font-semibold text-slate-950">
                      Contact Information
                    </legend>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Information about the person
                      responsible for this community
                      application.
                    </p>

                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                      <FormField
                        label="Full Name"
                        name="full_name"
                        placeholder="Your full name"
                        autoComplete="name"
                        required
                      />

                      <FormField
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        required
                      />

                      <FormField
                        label="Phone / WhatsApp"
                        name="phone"
                        type="tel"
                        placeholder="08xxxxxxxxxx"
                        autoComplete="tel"
                        required
                      />

                      <FormField
                        label="Province / Region"
                        name="region"
                        placeholder="Example: Banten"
                        autoComplete="address-level1"
                        required
                      />

                      <FormField
                        label="City"
                        name="city"
                        placeholder="Example: Tangerang"
                        autoComplete="address-level2"
                        required
                      />
                    </div>
                  </fieldset>

                  <SectionDivider />

                  <fieldset>
                    <legend className="text-lg font-semibold text-slate-950">
                      Community Information
                    </legend>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Tell us about your community,
                      its members, activities, and
                      online presence.
                    </p>

                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                      <FormField
                        label="Community Name"
                        name="community_name"
                        placeholder="Your community or fanbase name"
                        required
                      />

                      <FormField
                        label="Established Since"
                        name="established_since"
                        placeholder="Example: 2024"
                      />

                      <FormField
                        label="Approximate Member Count"
                        name="member_count"
                        placeholder="Example: 150"
                        required
                      />

                      <FormField
                        label="Social Media"
                        name="social_media"
                        placeholder="@community or social media link"
                      />
                    </div>

                    <div className="mt-6 space-y-6">
                      <TextAreaField
                        label="Tell us about your community."
                        name="community_description"
                        placeholder="Describe your community, its members, location, and how it started..."
                        required
                      />

                      <TextAreaField
                        label="What activities does your community usually organize?"
                        name="community_activities"
                        placeholder="Tell us about gatherings, online activities, fan projects, events, or other activities..."
                        required
                      />
                    </div>
                  </fieldset>

                  <SectionDivider />

                  <fieldset>
                    <legend className="text-lg font-semibold text-slate-950">
                      Community Collaboration
                    </legend>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Help us understand why your
                      community wants to connect with
                      the 7ICONS Digital Home.
                    </p>

                    <div className="mt-6 space-y-6">
                      <TextAreaField
                        label="Why do you want to register your community?"
                        name="registration_reason"
                        placeholder="Tell us why your community would like to become connected with the wider ICONIA ecosystem..."
                        required
                      />

                      <TextAreaField
                        label="How would your community like to collaborate with ICONIA?"
                        name="collaboration_plan"
                        placeholder="Describe future collaboration ideas, activities, or projects..."
                        required
                      />

                      <TextAreaField
                        label="Additional Information"
                        name="additional_information"
                        placeholder="Anything else you would like the review team to know..."
                      />
                    </div>
                  </fieldset>

                  <SectionDivider />

                  <ConfirmationField />

                  <SubmitButton>
                    Submit Community Application
                  </SubmitButton>
                </form>
              </ApplicationFormCard>

              <CommunitySidebar
                detail={application.detail}
              />
            </div>
          )}
        </section>
      )}

      {/* Event */}
      {isEvent && (
        <section className="relative mx-auto max-w-[1180px] px-5 pb-24 pt-10 sm:px-8 lg:px-10">
          <div className="rounded-[2rem] border border-violet-100 bg-white p-8 shadow-xl shadow-violet-950/5 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
              Event Application
            </p>

            <h2 className="mt-3 font-serif text-3xl font-semibold">
              Before you apply
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600">
              {application.detail}
            </p>

            <div className="mt-8 rounded-2xl border border-violet-200 bg-violet-50 px-5 py-4">
              <p className="text-sm font-semibold text-violet-800">
                Form coming next
              </p>

              <p className="mt-2 text-sm leading-6 text-violet-700/75">
                Event Application V1 will be
                connected to the same review system
                after the Community workflow has
                been verified.
              </p>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

/* =========================================================
   SHARED COMPONENTS
========================================================= */

function ApplicationFormCard({
  eyebrow,
  title,
  description,
  error,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-violet-100 bg-white shadow-xl shadow-violet-950/5">
      <div className="border-b border-violet-100 px-6 py-7 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
          {eyebrow}
        </p>

        <h2 className="mt-3 font-serif text-3xl font-semibold">
          {title}
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          {description}
        </p>
      </div>

      {error && (
        <ErrorMessage message={error} />
      )}

      {children}
    </div>
  );
}

function ApplicantInformationFields({
  includeOccupation = false,
  includeInstagram = false,
}: {
  includeOccupation?: boolean;
  includeInstagram?: boolean;
}) {
  return (
    <fieldset>
      <legend className="text-lg font-semibold text-slate-950">
        Applicant Information
      </legend>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        Basic contact and regional information
        used during the application review.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <FormField
          label="Full Name"
          name="full_name"
          placeholder="Your full name"
          autoComplete="name"
          required
        />

        <FormField
          label="Email Address"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
        />

        <FormField
          label="Phone / WhatsApp"
          name="phone"
          type="tel"
          placeholder="08xxxxxxxxxx"
          autoComplete="tel"
          required
        />

        <FormField
          label="Province / Region"
          name="region"
          placeholder="Example: Banten"
          autoComplete="address-level1"
          required
        />

        <FormField
          label="City"
          name="city"
          placeholder="Example: Tangerang"
          autoComplete="address-level2"
          required
        />

        {includeOccupation && (
          <FormField
            label="Occupation"
            name="occupation"
            placeholder="Student, Designer, etc."
          />
        )}

        {includeInstagram && (
          <FormField
            label="Instagram"
            name="instagram"
            placeholder="@username"
          />
        )}
      </div>
    </fieldset>
  );
}

function SectionDivider() {
  return (
    <div className="h-px bg-violet-100" />
  );
}

function ConfirmationField() {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-violet-100 bg-[#faf8ff] p-5">
      <input
        type="checkbox"
        name="terms"
        value="accepted"
        required
        className="mt-1 h-4 w-4 shrink-0 accent-violet-700"
      />

      <span className="text-sm leading-6 text-slate-600">
        I confirm that the information
        provided in this application is
        accurate and may be reviewed by the
        7ICONS Digital Home administration
        team.
      </span>
    </label>
  );
}

function ErrorMessage({
  message,
}: {
  message: string;
}) {
  return (
    <div className="mx-6 mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 sm:mx-8">
      <p
        role="alert"
        className="text-sm font-medium text-red-700"
      >
        {message}
      </p>
    </div>
  );
}

function SuccessPanel({
  applicationType,
  submitted,
}: {
  applicationType: string;
  submitted: string;
}) {
  return (
    <div className="rounded-[2rem] border border-emerald-200 bg-white p-8 shadow-xl shadow-emerald-950/5 sm:p-10">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl font-bold text-emerald-700">
        ✓
      </div>

      <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
        Application Submitted
      </p>

      <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
        Thank you for applying.
      </h2>

      <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
        Your {applicationType} application
        has been received and entered into
        the 7ICONS review system.
      </p>

      <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
          Application ID
        </p>

        <p className="mt-2 break-all font-mono text-sm text-slate-700">
          {submitted}
        </p>
      </div>

      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex rounded-xl bg-gradient-to-r from-violet-700 to-purple-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20"
        >
          Back to Application Portal
        </Link>
      </div>
    </div>
  );
}

function RepresentativeSidebar({
  detail,
}: {
  detail: string;
}) {
  return (
    <aside className="space-y-5">
      <InfoSidebarCard
        eyebrow="Before You Apply"
        title="Representative Review"
        detail={detail}
      />

      <ProcessSidebar
        steps={[
          {
            number: "01",
            title: "Submitted",
            text: "Your application enters the review queue.",
          },
          {
            number: "02",
            title: "Review",
            text: "The administration team reviews your responses.",
          },
          {
            number: "03",
            title: "Decision",
            text: "The application is approved or rejected.",
          },
          {
            number: "04",
            title: "Onboarding",
            text: "Approved representatives may continue into profile and account onboarding.",
          },
        ]}
      />

      <ReviewReminder />
    </aside>
  );
}

function VolunteerSidebar({
  detail,
}: {
  detail: string;
}) {
  return (
    <aside className="space-y-5">
      <InfoSidebarCard
        eyebrow="Before You Apply"
        title="Volunteer Review"
        detail={detail}
      />

      <ProcessSidebar
        steps={[
          {
            number: "01",
            title: "Submitted",
            text: "Your volunteer application enters the review queue.",
          },
          {
            number: "02",
            title: "Skills Review",
            text: "The team reviews your skills, interests, and availability.",
          },
          {
            number: "03",
            title: "Decision",
            text: "Your volunteer application is approved or rejected.",
          },
          {
            number: "04",
            title: "Future Opportunities",
            text: "Approved volunteers may be contacted for suitable activities or projects.",
          },
        ]}
      />

      <ReviewReminder />
    </aside>
  );
}

function CommunitySidebar({
  detail,
}: {
  detail: string;
}) {
  return (
    <aside className="space-y-5">
      <InfoSidebarCard
        eyebrow="Before You Apply"
        title="Community Review"
        detail={detail}
      />

      <ProcessSidebar
        steps={[
          {
            number: "01",
            title: "Submitted",
            text: "Your community application enters the review queue.",
          },
          {
            number: "02",
            title: "Community Review",
            text: "The administration team reviews your community profile and activities.",
          },
          {
            number: "03",
            title: "Decision",
            text: "The application is approved or rejected.",
          },
          {
            number: "04",
            title: "Collaboration",
            text: "Approved communities may become eligible for future ICONIA collaboration.",
          },
        ]}
      />

      <ReviewReminder />
    </aside>
  );
}

function InfoSidebarCard({
  eyebrow,
  title,
  detail,
}: {
  eyebrow: string;
  title: string;
  detail: string;
}) {
  return (
    <div className="rounded-[1.75rem] border border-violet-100 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">
        {eyebrow}
      </p>

      <h3 className="mt-3 font-serif text-2xl font-semibold">
        {title}
      </h3>

      <p className="mt-4 text-sm leading-7 text-slate-600">
        {detail}
      </p>
    </div>
  );
}

function ProcessSidebar({
  steps,
}: {
  steps: Array<{
    number: string;
    title: string;
    text: string;
  }>;
}) {
  return (
    <div className="rounded-[1.75rem] border border-violet-100 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold text-slate-900">
        What happens next?
      </p>

      <div className="mt-5 space-y-5">
        {steps.map((step) => (
          <ProcessItem
            key={step.number}
            number={step.number}
            title={step.title}
            text={step.text}
          />
        ))}
      </div>
    </div>
  );
}

function ReviewReminder() {
  return (
    <div className="rounded-[1.75rem] border border-amber-200 bg-amber-50 p-6">
      <p className="text-sm font-semibold text-amber-800">
        Please review your answers
      </p>

      <p className="mt-2 text-sm leading-6 text-amber-700/80">
        Make sure your contact information
        and application responses are
        correct before submitting.
      </p>
    </div>
  );
}

type FormFieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
};

function FormField({
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
  required = false,
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-sm font-semibold text-slate-700"
      >
        {label}

        {required && (
          <span className="ml-1 text-violet-600">
            *
          </span>
        )}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-violet-100 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
      />
    </div>
  );
}

type TextAreaFieldProps = {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
};

function TextAreaField({
  label,
  name,
  placeholder,
  required = false,
}: TextAreaFieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-sm font-semibold text-slate-700"
      >
        {label}

        {required && (
          <span className="ml-1 text-violet-600">
            *
          </span>
        )}
      </label>

      <textarea
        id={name}
        name={name}
        required={required}
        rows={5}
        placeholder={placeholder}
        className="mt-2 w-full resize-y rounded-xl border border-violet-100 bg-white px-4 py-3.5 text-sm leading-7 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
      />
    </div>
  );
}

function SubmitButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      className="w-full rounded-xl bg-gradient-to-r from-violet-700 to-purple-500 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 hover:shadow-xl"
    >
      {children}
    </button>
  );
}

type ProcessItemProps = {
  number: string;
  title: string;
  text: string;
};

function ProcessItem({
  number,
  title,
  text,
}: ProcessItemProps) {
  return (
    <div className="flex gap-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-xs font-bold text-violet-700">
        {number}
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-900">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {text}
        </p>
      </div>
    </div>
  );
}