"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

function getRequiredField(
  formData: FormData,
  field: string,
) {
  return String(
    formData.get(field) ?? "",
  ).trim();
}

function getOptionalField(
  formData: FormData,
  field: string,
) {
  const value = String(
    formData.get(field) ?? "",
  ).trim();

  return value || null;
}

/* =========================================================
   REPRESENTATIVE
========================================================= */

export async function submitRepresentativeApplication(
  formData: FormData,
) {
  const fullName = getRequiredField(
    formData,
    "full_name",
  );

  const email = getRequiredField(
    formData,
    "email",
  ).toLowerCase();

  const phone = getRequiredField(
    formData,
    "phone",
  );

  const region = getRequiredField(
    formData,
    "region",
  );

  const city = getRequiredField(
    formData,
    "city",
  );

  const occupation = getOptionalField(
    formData,
    "occupation",
  );

  const instagram = getOptionalField(
    formData,
    "instagram",
  );

  const iconiaExperience =
    getRequiredField(
      formData,
      "iconia_experience",
    );

  const communityExperience =
    getRequiredField(
      formData,
      "community_experience",
    );

  const motivation = getRequiredField(
    formData,
    "motivation",
  );

  const regionalPlan = getRequiredField(
    formData,
    "regional_plan",
  );

  const availability = getRequiredField(
    formData,
    "availability",
  );

  const additionalInformation =
    getOptionalField(
      formData,
      "additional_information",
    );

  const termsAccepted =
    formData.get("terms") === "accepted";

  if (
    !fullName ||
    !email ||
    !phone ||
    !region ||
    !city
  ) {
    redirect(
      `/apply/representative?error=${encodeURIComponent(
        "Please complete all required applicant information.",
      )}`,
    );
  }

  if (!email.includes("@")) {
    redirect(
      `/apply/representative?error=${encodeURIComponent(
        "Please enter a valid email address.",
      )}`,
    );
  }

  if (
    !iconiaExperience ||
    !communityExperience ||
    !motivation ||
    !regionalPlan ||
    !availability
  ) {
    redirect(
      `/apply/representative?error=${encodeURIComponent(
        "Please answer all required representative questions.",
      )}`,
    );
  }

  if (!termsAccepted) {
    redirect(
      `/apply/representative?error=${encodeURIComponent(
        "You must confirm that the information provided is accurate.",
      )}`,
    );
  }

  const supabase = await createClient();

  const {
    data: applicationId,
    error,
  } = await supabase.rpc(
    "submit_application",
    {
      p_application_type:
        "representative",

      p_full_name: fullName,
      p_email: email,
      p_phone: phone,
      p_region: region,
      p_city: city,

      p_form_data: {
        occupation,
        instagram,
        iconia_experience:
          iconiaExperience,
        community_experience:
          communityExperience,
        motivation,
        regional_plan: regionalPlan,
        availability,
        additional_information:
          additionalInformation,
      },
    },
  );

  if (error) {
    console.error(
      "Unable to submit representative application:",
      error,
    );

    redirect(
      `/apply/representative?error=${encodeURIComponent(
        "Unable to submit your application. Please try again.",
      )}`,
    );
  }

  redirect(
    `/apply/representative?submitted=${encodeURIComponent(
      String(applicationId),
    )}`,
  );
}

/* =========================================================
   VOLUNTEER
========================================================= */

export async function submitVolunteerApplication(
  formData: FormData,
) {
  const fullName = getRequiredField(
    formData,
    "full_name",
  );

  const email = getRequiredField(
    formData,
    "email",
  ).toLowerCase();

  const phone = getRequiredField(
    formData,
    "phone",
  );

  const region = getRequiredField(
    formData,
    "region",
  );

  const city = getRequiredField(
    formData,
    "city",
  );

  const occupation = getOptionalField(
    formData,
    "occupation",
  );

  const instagram = getOptionalField(
    formData,
    "instagram",
  );

  const skills = getRequiredField(
    formData,
    "skills",
  );

  const volunteerExperience =
    getRequiredField(
      formData,
      "volunteer_experience",
    );

  const contributionAreas =
    getRequiredField(
      formData,
      "contribution_areas",
    );

  const motivation = getRequiredField(
    formData,
    "motivation",
  );

  const availability = getRequiredField(
    formData,
    "availability",
  );

  const additionalInformation =
    getOptionalField(
      formData,
      "additional_information",
    );

  const termsAccepted =
    formData.get("terms") === "accepted";

  if (
    !fullName ||
    !email ||
    !phone ||
    !region ||
    !city
  ) {
    redirect(
      `/apply/volunteer?error=${encodeURIComponent(
        "Please complete all required applicant information.",
      )}`,
    );
  }

  if (!email.includes("@")) {
    redirect(
      `/apply/volunteer?error=${encodeURIComponent(
        "Please enter a valid email address.",
      )}`,
    );
  }

  if (
    !skills ||
    !volunteerExperience ||
    !contributionAreas ||
    !motivation ||
    !availability
  ) {
    redirect(
      `/apply/volunteer?error=${encodeURIComponent(
        "Please answer all required volunteer questions.",
      )}`,
    );
  }

  if (!termsAccepted) {
    redirect(
      `/apply/volunteer?error=${encodeURIComponent(
        "You must confirm that the information provided is accurate.",
      )}`,
    );
  }

  const supabase = await createClient();

  const {
    data: applicationId,
    error,
  } = await supabase.rpc(
    "submit_application",
    {
      p_application_type: "volunteer",

      p_full_name: fullName,
      p_email: email,
      p_phone: phone,
      p_region: region,
      p_city: city,

      p_form_data: {
        occupation,
        instagram,
        skills,
        volunteer_experience:
          volunteerExperience,
        contribution_areas:
          contributionAreas,
        motivation,
        availability,
        additional_information:
          additionalInformation,
      },
    },
  );

  if (error) {
    console.error(
      "Unable to submit volunteer application:",
      error,
    );

    redirect(
      `/apply/volunteer?error=${encodeURIComponent(
        "Unable to submit your application. Please try again.",
      )}`,
    );
  }

  redirect(
    `/apply/volunteer?submitted=${encodeURIComponent(
      String(applicationId),
    )}`,
  );
}