import open, {openApp, apps} from 'open';

// // Opens the image in the default image viewer and waits for the opened app to quit.
// await open('unicorn.png', {wait: true});
// console.log('The image viewer app quit');

// Opens the URL in the default browser.
await open('https://sindresorhus.com');

// // Opens the URL in a specified browser.
// await open('https://sindresorhus.com', {app: {name: 'firefox'}});
//
// // Specify app arguments.
// await open('https://sindresorhus.com', {app: {name: 'google chrome', arguments: ['--incognito']}});
//
// // Opens the URL in the default browser in incognito mode.
// await open('https://sindresorhus.com', {app: {name: apps.browserPrivate}});
//
// // Open an app.
// await openApp('code');
//
// // Open an app with arguments.
// await openApp(apps.chrome, {arguments: ['--incognito']});
