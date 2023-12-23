import Repository from "./Repository";
const CHATTING = "/generate";
export default {
    startChatting(payload) {
        return Repository.post(`${CHATTING}`, JSON.stringify(payload));
    },
};
