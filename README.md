# FitLog

FitLog is a responsive workout tracking web application built with Next.js.  
Users can browse workouts from an API, view workout details, create a daily workout plan, save workouts for later, and track basic workout statistics.

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Context API
- Local Storage
- REST API
- Next.js App Router

## Key Features

1. **Workout Library**
   - Displays 12 workouts from the provided FitLog API.
   - Shows workout image, muscle groups, equipment, duration, calories, and rating.

2. **Workout Details Page**
   - Shows detailed workout information.
   - Includes difficulty, sets, reps, instructions, duration, calories, and rating.

3. **Today's Workout Plan**
   - Users can add workouts to Today's Plan.
   - Maximum of 5 workouts can be added.
   - Plan statistics update automatically.

4. **Save Workouts for Later**
   - Users can save workouts.
   - Saved workouts are displayed in the Saved tab on the My Plan page.

5. **My Plan Management**
   - Users can mark workouts as done.
   - Users can remove workouts from Today's Plan or Saved workouts.
   - Toast notifications provide feedback for user actions.

6. **Search and Sorting**
   - Search workouts by workout name or muscle group.
   - Sort workouts by Duration, Calories, or Rating.

7. **Persistent Data**
   - Today's Plan and Saved workouts are stored using Local Storage.
   - Data remains available after refreshing the page.

8. **Responsive Design**
   - The website works on mobile, tablet, and desktop screens.

## API Used

FitLog API:

```text
https://api.abcz.workers.dev/api/fitlog