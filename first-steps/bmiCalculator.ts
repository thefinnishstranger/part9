export const calculateBmi = (height: number, weight: number): string => {
    const heightInMeters = height / 100
    const heightSquared = heightInMeters * heightInMeters
    const bmi =  weight / heightSquared
    if (bmi < 18.5) {
        return "Underweight (not healthy weight)"
    } else if (bmi >= 18.5 && bmi < 25.0) {
        return "Normal (healthy weight)"
    } else if (bmi >= 25.0 && bmi < 30.0) {
        return "Overweight (not healthy)"
    } else if (bmi >= 30) {
        return "Obese (very not healthy)"
    }
    return "your bmi is not correct try again"
}

/*const height: number = Number(process.argv[2])
const weight: number = Number(process.argv[3])

console.log(calculateBmi(height, weight))
*/