interface QuestionData {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

const questionsData: QuestionData[] = [
    {
        "question": "What date is Maddie's birthday?",
        "correct_answer": "October 20",
        "incorrect_answers": [
            "October 22",
            "October 23",
            "October 18"
        ],
    },
    {
        "question": "What day of the week was Maddie born?",
        "correct_answer": "Wednesday",
        "incorrect_answers": [
            "Tuesday",
            "Saturday",
            "Sunday"
        ],
    },
    {
        "question": "Where was Maddie born?",
        "correct_answer": "Epworth Maternity Hospital",
        "incorrect_answers": [
            "St Vincent's Private Hospital",
            "Mitcham Private Hospital",
            "Greythorn Maternal Hospital"
        ],
    },
    {
        "question": "What was Maddie's birth weight?",
        "correct_answer": "6 pounds (2.7kg)",
        "incorrect_answers": [
            "4 pounds (1.8kg)",
            "5 pounds (2.3kg)",
            "8 pounds (3.6kg)"
        ],
    },
    {
        "question": "What is the correct spelling of Maddie's name?",
        "correct_answer": "Madeleine",
        "incorrect_answers": [
            "Madeline",
            "Madelynn",
            "Madelyn"
        ],
    },
    {
        "question": "What is Maddie's Chinese name?",
        "correct_answer": "晨楹 (Chen Ying)",
        "incorrect_answers": [
            "美琳 (Mei Lin)",
            "以琳 (Yi Lin)",
            "乐樱 (Le Ying)"
        ],
    },
    {
        "question": "What kind of flower is in Maddie's chinese name?",
        "correct_answer": "Jacaranda",
        "incorrect_answers": [
            "Cherry blossoms",
            "Carnation",
            "Golden wattle"
        ],
    },
    {
        "question": "How many teeth does Maddie currently have?",
        "correct_answer": "6",
        "incorrect_answers": [
            "4",
            "5",
            "7"
        ],
    },
    {
        "question": "What is Maddie's favourite song?",
        "correct_answer": "If I were a butterfly",
        "incorrect_answers": [
            "Jesus loves me",
            "Three little speckled frogs",
            "Twinkle twinkle little star"
        ],
    },
    {
        "question": "How old was Maddie when this photo was taken?",
        "correct_answer": "3 months",
        "incorrect_answers": [
            "2 months",
            "4 months",
            "5 months"
        ],
    }
]

export default questionsData;