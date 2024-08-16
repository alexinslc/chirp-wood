# Chirpwood

Chirpwood is a simple social media application inspired by X (formerly Twitter), with a Lord of the Rings theme. Users can log in using their Google accounts, post "chirps" (messages), and view or interact with posts in their feed. This project is built with Next.js, Firebase, and Tailwind CSS.

## Features

- Google authentication using Firebase
- Posting, editing, and deleting chirps
- Real-time feed updates
- Responsive design with a Shire-inspired theme
- Account information and theme customization pages

## Prerequisites

- Node.js (v20.x or later)
- npm or yarn
- Firebase account

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/alexinslc/chirp-wood.git
cd chirp-wood
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Setup

1. **Create a Firebase Project:**
   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Click on "Add Project" and follow the setup instructions.

2. **Enable Firebase Authentication:**
   - In the Firebase Console, go to the Authentication section.
   - Enable Google as a sign-in method.

3. **Create Firestore Collections:**

   **a. Users Collection:**
   - In the Firebase Console, go to Firestore Database.
   - Click "Start Collection" and name it `users`.
   - Set the document ID to the user’s UID (this will be automatically managed by the code).
   - Each user document should include the following fields:
     - `displayName`: string
     - `email`: string
     - `profilePicUrl`: string
     - `createdAt`: timestamp

   **b. Posts Collection:**
   - Create another collection named `posts`.
   - Each post document should include the following fields:
     - `content`: string
     - `displayName`: string
     - `profilePicUrl`: string
     - `createdAt`: timestamp
     - `uid`: string (the UID of the user who created the post)

4. **Add Firebase Config to Your Project:**
   - In the Firebase Console, navigate to Project Settings.
   - Under "Your apps," create a new Web app and copy the Firebase SDK config.
   - Create a `.env.local` file in the root of your project and add your Firebase config:

   ```plaintext
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
   ```

### 4. Run the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to view the application.

### 5. Deploying to Production

When you're ready to deploy, run:

```bash
npm run build
npm start
```

## Contributing

Feel free to fork this project and submit pull requests. Contributions are always welcome!

## License

This project is licensed under the MIT License.
