

export class ChatModel {
  public message: string;
  public time: Date;
  public picture: string;
  public messageType: MessageType;

  constructor(
    message: string,
    time: Date,
    picture: string,
    messageType: MessageType
  ) {
    this.message = message;
    this.time = time;
    this.picture = picture;
    this.messageType = messageType;
  }
}

export enum MessageType {
  BOT_MESSAGE,
  USER_MESSAGE,
  USER_IMAGE_MESSAGE,
  ERROR_MESSAGE,
  INFO_MESSAGE,
  LOADING_MESSAGE,
}
