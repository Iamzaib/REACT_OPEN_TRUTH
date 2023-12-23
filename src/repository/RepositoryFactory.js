import ChattingRepository from "./ChattingRepository";

const repositories = {
    chatting: ChattingRepository,
};
export const RepositoryFactory = {
    get: (name) => repositories[name],
};
