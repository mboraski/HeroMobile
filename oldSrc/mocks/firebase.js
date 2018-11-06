jest.mock('../firebase', () => {
    const firebasemock = require('firebase-mock');

    const mockdatabase = new firebasemock.MockFirebase();
    const mockauth = new firebasemock.MockFirebase();
    const mocksdk = new firebasemock.MockFirebaseSdk(
        path => {
            return path ? mockdatabase.child(path) : mockdatabase;
        },
        () => {
            return mockauth;
        }
    );
    const mockfirestore = new firebasemock.MockFirestore();
    // cause promises to immediately resolve
    mockfirestore.autoFlush();
    mockauth.autoFlush();

    const firebase = mocksdk.initializeApp(); // can take a path arg to database url
    // optional - expose the mock
    global.firebase = firebase;

    // return the mock to match your export api
    return {
        auth: mockauth,
        database: mockdatabase,
        firestore: mockfirestore
    };
});
