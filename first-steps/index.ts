import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
const PORT = 3003;

app.use(express.json()); // Middleware to parse JSON bodies

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
        return res.status(400).json({
            error: "malformatted parameters"
        });
    }

    const bmi = calculateBmi(height, weight);
    return res.json({
        weight: weight,
        height: height,
        bmi: bmi
    });
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { daily_exercises, target }: any = req.body;

    if (!daily_exercises || target === undefined) {
        return res.status(400).json({
            error: "parameters missing"
        });
    }

    if (isNaN(Number(target)) || !Array.isArray(daily_exercises)) {
        return res.status(400).json({
            error: "malformatted parameters"
        });
    }

    const dailyExercises = daily_exercises.map((exercise: any) => Number(exercise));

    if (dailyExercises.some(isNaN)) {
        return res.status(400).json({
            error: "malformatted parameters"
        });
    }

    const result = calculateExercises(dailyExercises, Number(target));
    return res.json(result);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
