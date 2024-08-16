# Chirpwood

Chirpwood is a simple social media application inspired by X (formerly Twitter), with a Lord of the Rings theme. Users can log in using their Google accounts, post "chirps" (messages), and view or interact with posts in their feed. This project is built with Next.js, Firebase, and Tailwind CSS.

## Features

- Google authentication using Firebase
- Posting, editing, and deleting chirps
- Real-time feed updates
- Responsive design with a Shire-inspired theme
- Account information and theme customization pages

## Future Improvements

There are several enhancements planned for Chirpwood to make it a more feature-rich and robust platform. Below are some ideas for future improvements:

- User Profiles
  - Profile Pages: Create dedicated profile pages for users.
  - Profile Customization: Allow users to customize their profile with a bio, background image, and theme settings.
- Social Features
  - Likes and Comments: Implement functionality for liking chirps and adding comments.
  - Follow System: Allow users to follow each other and create a personalized feed.
- Notifications
  - Real-Time Notifications: Implement real-time notifications for user interactions.
  - Email Notifications: Send email notifications for major activities.
- Search and Hashtags
  - Search Functionality: Add a search bar for finding chirps and users.
  - Hashtag System: Implement hashtags for filtering and searching chirps.
- Data & Analytics
  - Analytics Dashboard: Provide users with insights on their activity.
  - Admin Panel: Implement an admin panel for managing users and posts.
- Mobile Optimization
  - Responsive Design Improvements: Enhance the app’s mobile experience.
  - Progressive Web App (PWA): Convert the app into a PWA.
- Security Enhancements
  - Rate Limiting: Protect against spam and abuse by implementing rate limiting.
  - Two-Factor Authentication (2FA): Add 2FA for enhanced security.
- Performance Optimization
  - Lazy Loading: Implement lazy loading for images and components.
  - Caching Strategies: Use caching for static assets and chirps.
- Accessibility
  - Improve ARIA Support: Ensure screen reader accessibility.
  - Keyboard Navigation: Enhance keyboard navigation with clear focus states.
- Testing
  - Unit Tests: Implement unit tests for key components.
  - Integration Tests: Create integration tests for app functionality.
- Deployment and DevOps
  - CI/CD Pipeline: Set up a CI/CD pipeline for testing and deployment automation.
  - Monitoring: Add monitoring tools to track performance and errors in production.


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
