export const createChat = (loggedInUserId: number, chatData) => {
    const newChatData={
        ...chatData,
        createdBy:loggedInUserId,
        updatedBy:loggedInUserId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
};
