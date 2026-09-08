// Deploy in Google Apps Script. See README.md in this directory.
const FIELD_TITLES = {
  name: 'Name',
  email: 'Email',
  phone: 'Phone',
  service: 'Service',
  message: 'Project requirements',
};

function doPost(event) {
  try {
    const properties = PropertiesService.getScriptProperties();
    const secret = properties.getProperty('WEBHOOK_SECRET');
    const payload = JSON.parse(event.postData.contents);
    if (!secret || payload.secret !== secret) return jsonResult({ok: false});

    const enquiry = payload.enquiry;
    if (!enquiry || typeof enquiry.name !== 'string' || enquiry.name.trim().length < 2 ||
        typeof enquiry.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email) ||
        typeof enquiry.message !== 'string' || enquiry.message.trim().length < 15) {
      return jsonResult({ok: false});
    }

    const form = FormApp.openById(properties.getProperty('FORM_ID'));
    if (!form.isAcceptingResponses()) return jsonResult({ok: false});
    const items = form.getItems();
    let response = form.createResponse();
    Object.keys(FIELD_TITLES).forEach(function (field) {
      const matches = items.filter(function (item) { return item.getTitle() === FIELD_TITLES[field]; });
      if (matches.length !== 1) throw new Error('Missing or duplicate question: ' + field);
      const item = matches[0];
      const value = enquiry[field];
      if (value === undefined || value === '') return;
      if (typeof value !== 'string') throw new Error('Invalid field');

      let answer;
      switch (item.getType()) {
        case FormApp.ItemType.TEXT:
          answer = item.asTextItem().createResponse(value);
          break;
        case FormApp.ItemType.PARAGRAPH_TEXT:
          answer = item.asParagraphTextItem().createResponse(value);
          break;
        case FormApp.ItemType.LIST:
          answer = item.asListItem().createResponse(value);
          break;
        case FormApp.ItemType.MULTIPLE_CHOICE:
          answer = item.asMultipleChoiceItem().createResponse(value);
          break;
        default:
          throw new Error('Unsupported question type: ' + field);
      }
      response = response.withItemResponse(answer);
    });

    const submitted = response.submit();
    return jsonResult({ok: true, responseId: submitted.getId()});
  } catch {
    // Do not log enquiry data or the shared secret.
    console.error('Website enquiry submission failed; check form configuration.');
    return jsonResult({ok: false});
  }
}

function jsonResult(value) {
  return ContentService.createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
