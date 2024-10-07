'use strict';

// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

import TestDB from './clients/PouchDBClient';

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'search_at_pouchdb',
    type: 'normal',
    title: 'check at pouchdb: %s',
    contexts: [
      //'all',
      'selection',
      //'frame',
      //'page',
    ],
  });
});

chrome.contextMenus.onClicked.addListener(async (info) => {
  let search_text = info.selectionText?.trim();
  if (search_text) {
    TestDB.createIndex({
      index: {
        fields: ['data'],
      },
    }).catch((e) => {
      console.error(e);
    });
    let data = await TestDB.find({
      selector: {
        data: {
          $eq: search_text,
        },
      },
    })
      .then((data) => data)
      .catch((e) => {
        console.log(e);
        return {};
      });
    console.log(info, data);
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GREETINGS') {
    const message: string = `Hi ${
      sender.tab ? 'Con' : 'Pop'
    }, my name is Bac. I am from Background. It's great to hear from you.`;

    // Log message coming from the `request` parameter
    console.log(request.payload.message);
    // Send a response message
    sendResponse({
      message,
    });
  }
});
