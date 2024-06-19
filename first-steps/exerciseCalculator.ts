interface Exercising {
    days: number,
    trainingDays: number,
    orginalTarget: number,
    averageTime: number,
    targetReached: boolean,
    rating: number,
    textReview: string
}

export const calculateExercises = (values: Array<number>, target: number ): Exercising => {
    let sum = 0
    let nonZeroDays = 0
    for (let i = 0; i < values.length; i++) {
        sum += values[i]
        if (values[i] !== 0) {
            nonZeroDays++
        }
    }

    const average = sum / values.length
    let ratingNumber = 0
    let ratingText = ''

    if (average > 0 && average < 1) {
        ratingNumber = 1
        ratingText = 'It is an okay start buy you could do way better'
    } else if (average >= 1 && average < 2) {
        ratingNumber = 2
        ratingText = 'This is pretty good, but I know you still got more in the tank'
    } else if (average >= 2 && average < 3) {
        ratingNumber = 3
        ratingText = 'This is top level fitness, way to go soldier!'
    } 
    
    let success = false

    if (target >= average) {
        success = true
    } 
    
    return {
        days: values.length,
        trainingDays: nonZeroDays,
        orginalTarget: target,
        averageTime: average,
        targetReached: success,
        rating: ratingNumber,
        textReview: ratingText
    }
}

/*const args = process.argv.slice(2)
const target = Number(args.pop())
const values = args.map(arg => Number(arg))

if (isNaN(target) || values.some(isNaN)) {
    console.log("please provide numbers");
} else {
    const result = calculateExercises(values, target)
    console.log(result)
}

*/