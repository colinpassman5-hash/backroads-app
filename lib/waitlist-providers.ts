import type { WaitlistSubmission } from "@/lib/waitlist";

type ProviderResult = {
  delivered: boolean;
  provider: string;
};

function getProvider() {
  return process.env.WAITLIST_PROVIDER?.toLowerCase().trim() || "local";
}

async function postJson(url: string, payload: unknown, headers?: HeadersInit) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(headers || {})
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Provider request failed with ${response.status}`);
  }
}

async function sendWebhook(submission: WaitlistSubmission) {
  const url = process.env.LEAD_WEBHOOK_URL;

  if (!url) {
    return { delivered: false, provider: "webhook" };
  }

  await postJson(url, submission);
  return { delivered: true, provider: "webhook" };
}

async function sendKlaviyo(submission: WaitlistSubmission) {
  const apiKey = process.env.KLAVIYO_API_KEY;
  const listId = process.env.KLAVIYO_LIST_ID;

  if (!apiKey || !listId) {
    return { delivered: false, provider: "klaviyo" };
  }

  await postJson(
    "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/",
    {
      data: {
        type: "profile-subscription-bulk-create-job",
        attributes: {
          list_id: listId,
          custom_source: submission.source || "website",
          profiles: {
            data: [
              {
                type: "profile",
                attributes: {
                  email: submission.email,
                  properties: {
                    productInterest: submission.productInterest,
                    submittedAt: submission.submittedAt,
                    utm: submission.utm
                  }
                }
              }
            ]
          }
        }
      }
    },
    {
      Authorization: `Klaviyo-API-Key ${apiKey}`,
      Revision: "2024-06-15"
    }
  );

  return { delivered: true, provider: "klaviyo" };
}

async function sendConvertKit(submission: WaitlistSubmission) {
  const apiKey = process.env.CONVERTKIT_API_KEY;
  const formId = process.env.CONVERTKIT_FORM_ID;

  if (!apiKey || !formId) {
    return { delivered: false, provider: "convertkit" };
  }

  await postJson(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
    api_key: apiKey,
    email: submission.email,
    tags: [submission.productInterest || "Quack Attack"]
  });

  return { delivered: true, provider: "convertkit" };
}

export async function deliverWaitlistSubmission(submission: WaitlistSubmission): Promise<ProviderResult> {
  const provider = getProvider();

  switch (provider) {
    case "webhook":
      return sendWebhook(submission);
    case "klaviyo":
      return sendKlaviyo(submission);
    case "convertkit":
      return sendConvertKit(submission);
    case "local":
    default:
      return { delivered: false, provider: "local" };
  }
}
