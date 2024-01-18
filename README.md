# Routine App

Routine App is a web application developed with Django and React to track progress in your gym workout routine. It allows users to record their daily workouts, keep an exercise history, and compare their performance over time.

## Characteristics

- **Routine Registration:** Users can create personalized routines for each day of the week, assigning specific muscle groups and exercises.

- **Exercise Log:** For each day of the routine, users can log exercise details, including weight, reps and sets.

- **Record Comparison:** Users can compare exercise details between two records on the same day of the week, allowing detailed tracking of their progress.

## Screenshots

![login](https://github.com/GabJS10/RoutineApp/assets/128757585/47e0c9d8-c391-47e5-b51a-f38b8ff7a3c3)
![principal](https://github.com/GabJS10/RoutineApp/assets/128757585/2c28a250-3e6c-440f-8fda-daa8c39e04aa)
![principal2](https://github.com/GabJS10/RoutineApp/assets/128757585/04201182-f2cb-4bd9-a150-b15575b0f62f)
![profile](https://github.com/GabJS10/RoutineApp/assets/128757585/a91c07ba-fa3e-4756-905e-8a8d8d7d86fe)
![routinedays](https://github.com/GabJS10/RoutineApp/assets/128757585/66f06038-d7cd-449d-afe8-5ff806557e71)
![comparepage](https://github.com/GabJS10/RoutineApp/assets/128757585/b17a9bb1-1e8e-4069-ba7a-d4907e98e65f)



## Facility

1. **Backend (Django):**
    - Clone this repository.
    - Create a virtual environment: `python -m venv venv`.
    - Activate the virtual environment: `source venv/bin/activate` (Linux/Mac) or `venv\Scripts\activate` (Windows).
    - Install the dependencies: `pip install -r requirements.txt`.
    - Run the migrations: `python manage.py migrate`.
    - Start the Django server: `python manage.py runserver`.

2. **Frontend (React):**
    - Navigate to the `frontend` folder from the project root.
    - Install the dependencies: `npm install`.
    - Start the React application: `npm start`.

## Use

1. Access the application from your browser: `http://localhost:8000`.
2. Register or log in with your account.
3. Create a new routine and record your daily workouts.
4. Explore the comparison options to analyze your progress.
