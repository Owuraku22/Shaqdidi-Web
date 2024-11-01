importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCGi0obrEaVBOl4Z1sW9QOOvTBlTkRqJ_o",
  authDomain: "shaqdidi-9119f.firebaseapp.com",
  projectId: "shaqdidi-9119f",
  storageBucket: "shaqdidi-9119f.firebasestorage.app",
  messagingSenderId: "328040124720",
  appId: "1:328040124720:web:267b90d9aa31946fe878f5",
  measurementId: "G-DG2BZ4N4XK"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    // icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
