# Connect the website enquiry form to Google Forms

The existing frontend posts to `/api/contact`. When configured, that route sends
validated fields to the Apps Script receiver in `Code.gs`, which saves a real
Google Form response. The hidden `company` spam-trap field is never forwarded.
Google Forms replaces Resend delivery when enabled; leaving both Google settings
unset preserves the existing email/demo behaviour.

Google's [Forms REST API](https://developers.google.com/workspace/forms/api/reference/rest/v1/forms.responses)
only exposes response retrieval. This integration uses the supported Apps Script
[FormResponse.submit()](https://developers.google.com/apps-script/reference/forms/form-response#submit()) method.

## Setup

1. Create a Google Form with exactly these uniquely named questions (case-sensitive):

   | Title | Type | Required |
   | --- | --- | --- |
   | Name | Short answer | Yes |
   | Email | Short answer | Yes |
   | Phone | Short answer | No |
   | Service | Dropdown or short answer | No |
   | Project requirements | Paragraph | Yes |

   For a dropdown, use the website's exact options: `Water Treatment`,
   `Wastewater Treatment`, `Process Monitoring`, `Maintenance`, `Consultancy`.
   Use the ordinary Email question above; disable automatic email collection and
   one-response-per-user restrictions. Do not add additional required questions.
   Publish/enable responses. Optionally link a spreadsheet from the Responses tab.
   To use different question titles, edit `FIELD_TITLES` in the script.
2. Create a project at [Apps Script](https://script.google.com/) with an account
   that can edit the form. Paste `Code.gs` into the script editor.
3. In **Project Settings → Script properties**, add:
   - `FORM_ID`: the ID between `/d/` and `/edit` in the form's editor URL
     (not the public `/d/e/` responder ID).
   - `WEBHOOK_SECRET`: a long random secret, e.g. generated with `openssl rand -hex 32`.
4. [Deploy as a web app](https://developers.google.com/apps-script/guides/web):
   choose **Execute as: Me** and **Who has access: Anyone**, authorise Forms access,
   and copy the deployment URL ending in `/exec`. The script checks the shared
   secret before accessing the form. Your Workspace policy must allow this deployment.
5. Add these **server-only** variables to `.env.local` and your hosting environment:

   ```dotenv
   GOOGLE_FORMS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
   GOOGLE_FORMS_WEBHOOK_SECRET=the-same-value-as-WEBHOOK_SECRET
   ```

   Do not prefix them with `NEXT_PUBLIC_`. Restart/redeploy the website.
6. Submit a test enquiry through `/contact`. Check all five fields in the form's
   **Responses** tab (and linked sheet, if enabled), including a test with Phone
   and Service empty. The website reports success only after receiving a saved
   response ID. Verify that an incorrect secret produces the existing error message.

After changing script code, update the web app deployment to a new version.
Configuration errors return 503; Google rejection, invalid acknowledgements, and
15-second timeouts return 502. No automatic retries are made: if Google saves a
response but the acknowledgement is lost, a manual retry can create a duplicate.
This does not add rate limiting to the website's existing public contact endpoint.

The integration can be prepared locally without Google credentials, but a live
submission check requires completing the setup above.
