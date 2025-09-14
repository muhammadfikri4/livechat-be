export interface SendMessageDTO {
    type: "message";
    payload: {
      content: string;
      senderId: string;
      roomId: string;
    };
  }
  
  export interface JoinRoomDTO {
    type: "join";
    payload: {
      roomId: string;
    };
  }
  
  export interface TypingDTO {
    type: "typing";
    payload: {
      senderId: string;
      roomId: string;
    };
  }
  