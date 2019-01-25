const mime = require('mime-types');

Cypress.Commands.add('upload', { prevSubject: 'element' }, (subject, fileContent, fileName) => {
  const mimeType = mime.lookup(fileName);

  cy.window().then(window => {
    Cypress.Blob.base64StringToBlob(fileContent, mimeType).then(blob => {
      const fileToUpload = new window.File([blob], fileName, { type: mimeType });

      cy.wrap(subject).trigger('drop', {
        dataTransfer: {
          files: [fileToUpload],
          types: ['Files'],
        },
      });
    });
  });
});
