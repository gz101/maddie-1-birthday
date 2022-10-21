import RoomRepository from "../repositories/room.repository";
import * as uuid from 'uuid';
import { Room } from "../models/room.model";
import { UserRepository } from "../repositories/user.repository";
import { User } from "../models/user.model";
import QuestionRepository from "../repositories/question.repository";
import { Service } from "typedi";
import { GameService } from "../services/game.service";
import { SocketIOService } from "../services/socketio.service";

@Service()
class RoomController {
    
    private io: any;

    constructor(private readonly roomRepository: RoomRepository, private readonly userRepository: UserRepository, private readonly questionRepository: QuestionRepository, private readonly gameService: GameService) {
        this.io = SocketIOService.getInstance();
    }

    /**
     * 
     * @param socket 
     * @param newRoomData 
     * @returns void
     */
    public newRoom = (socket: any, newRoomData: string) => {

        let roomId: string = uuid.v4();
        let roomDataJson: any = JSON.parse(newRoomData);
        let userId = socket.id;

        if (!roomDataJson.name || !roomDataJson.owner || !roomDataJson.maxPlayers || !Number.isInteger(Number(roomDataJson.maxPlayers)) || Number(roomDataJson.maxPlayers) < 0 || Number(roomDataJson.password) != 8732488) {
            return false;
        }

        let createRoomData: Room = new Room(
            roomId,
            roomDataJson.name,
            roomDataJson.owner,
            roomDataJson.maxPlayers,
            roomDataJson.selectedCategory,
            roomDataJson.difficulty
        );

        let room: Room = this.roomRepository.storeRoomById(roomId, createRoomData);

        if(!room.hasUser(userId)) {
            room.playerIds.push(userId);
            this.userRepository.storeUserById(userId, { name: room.owner, currentRoomId: room.id });
            let players: User[] = this.roomRepository.getPlayersByRoomId(roomId);
            this.io.to(userId).emit('joinedRoom', JSON.stringify({ id: roomId, ...room, players: players, currentUserId: userId }));
            
            let shouldStart = this.roomRepository.checkIfRoomIsFull(roomId);

            if(shouldStart) {
                this.questionRepository.prepareQuestions(room);
                setTimeout(() => { this.startGame(roomId); }, 10000);
            }
        }

        this.io.emit('refreshRooms', JSON.stringify(this.roomRepository.prepareAllRoomsData()));
    }    

    /**
     * 
     * @param socket 
     * @param data 
     * @returns void
     */
    public joinRoom = (socket: any, data: string) => {
        let joinData = JSON.parse(data);

        let selectedRoomId = joinData.selectedRoomId;

        const room = this.roomRepository.getRoomById(selectedRoomId);

        if (!selectedRoomId || !room || !joinData.name || this.roomRepository.checkIfRoomIsFull(selectedRoomId)) {
            return false;
        }

        const userId = socket.id;

        if (!room.hasUser(userId)) {
            room.playerIds.push(userId);
            this.userRepository.storeUserById(userId, { name: joinData.name, currentRoomId: selectedRoomId })
            let players = this.roomRepository.getPlayersByRoomId(selectedRoomId);
            this.io.to(userId).emit('joinedRoom', JSON.stringify({ id: selectedRoomId, ...room, players: players, currentUserId: userId }));


            this.roomRepository.refreshRoomUsers(selectedRoomId);

            if (!this.questionRepository.checkIfARoomHasQuestions(selectedRoomId)) { // If no questions prepared yet, then prepare
                this.questionRepository.prepareQuestions(room);
            }

            let shouldStart = this.roomRepository.checkIfRoomIsFull(selectedRoomId);
            let alreadyStarted = room.gameAlreadyStarted;

            if (shouldStart && !alreadyStarted) {
                setTimeout(() => { this.startGame(selectedRoomId); }, 3000);
            }

        }

        this.io.emit('refreshRooms', JSON.stringify(this.roomRepository.prepareAllRoomsData()));

    }

    public startGame = (roomId: string) => {
        this.gameService.startGame(roomId);
    }

}

export default RoomController;