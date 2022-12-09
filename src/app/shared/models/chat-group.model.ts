import { Chat } from "./chat.model";

export interface ChatGroup {
    person: string, 
    received: Chat[], 
    sent: Chat[]
}
