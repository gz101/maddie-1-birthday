import RoomRepository from "./room.repository";
import * as request from 'request';
import { shuffleArray } from "../helpers";
import { Question } from "../models/question.model";
import { Service } from "typedi";
import { Room } from "../models/room.model";

import questionsData from "../data/question.data";

const questions: any = {};
const userAnsweredQuestions: any = {};

@Service()
class QuestionRepository {
    
    constructor(private readonly roomRepository: RoomRepository) {}

    public getAllQuestions = () => {
        return questions;
    } 

    /**
     * 
     * @param roomId 
     * @returns Promise<Question[]>
     */
    public prepareQuestions = async (room: Room) :  Promise<Question[]> => {
        if (this.checkIfARoomHasQuestions(room.id)) {
            return this.getQuestionsByRoomId(room.id);
        }

        questions[room.id] = [];

        questionsData.map((result: any, i: any) => {
            let correctAnswer = result.correct_answer;
            let incorrectAnswers = result.incorrect_answers;
            let variants = [correctAnswer].concat(incorrectAnswers);

            variants = shuffleArray(variants);

            let questionStoreData: Question = {
                id: i,
                question: result.question,
                variants: variants,
                correctAnswerIndex: variants.indexOf(correctAnswer),
            }

            questions[room.id].push(questionStoreData);
        });

        return questions[room.id];
    }

    /**
     * 
     * @param roomId 
     * @returns Room[]
     */
    public getQuestionsByRoomId = (roomId: string) : Question[] => {
        if(Object.keys(questions).includes(roomId)) {
            return [];
        }

        return questions[roomId];
    }

    /**
     * 
     * @param roomId 
     * @returns boolean
     */
    public checkIfARoomHasQuestions = (roomId: string) : boolean => {
        let questions = this.getAllQuestions();
        return Object.keys(questions).includes(roomId);
    }

    /**
     * 
     * @param userId 
     * @returns string[]
     */
    public getUserAnsweredQuestions = (userId: string) : string[] => {
        if (!Object.keys(userAnsweredQuestions).includes(userId)) {
            userAnsweredQuestions[userId] = [];
        }

        return userAnsweredQuestions[userId];
    }

    /**
     * 
     * @param roomId 
     * @param questionId 
     * @returns Question[]
     */
    public getQuestionByRoomAndQuestionId = (roomId: string, questionId: number) :  Question => {
        let questionsOfRoom = questions[roomId];

        if (!questionsOfRoom || !questionsOfRoom[questionId]) {
            return null;
        }

        return questionsOfRoom[questionId];
    }

    /**
     * 
     * @param userId 
     * @param questionId 
     * @returns void
     */
    public markQuestionAsAnsweredByUser = (userId: string, questionId: number) => {
        userAnsweredQuestions[userId].push(questionId);
    }

    public removeQuestionsByRoomId = (roomId: string) => {
        if (Object.keys(questions).includes(roomId)) {
            delete questions[roomId];
        }
    }
}

export default QuestionRepository;