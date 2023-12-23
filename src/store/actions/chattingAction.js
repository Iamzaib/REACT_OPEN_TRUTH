import { RepositoryFactory } from "../../repository/RepositoryFactory";
var chatting = RepositoryFactory.get("chatting");
export const startChatAction =
    (payload, onSuccess) => async (dispatch, getState) => {
        await dispatch(Loader(true));
        try {
            const { data } = await chatting.startChatting(payload);
            console.log(data, "data");

            if (data != undefined) {
                const { chat } = getState().chatting;
                let payloadData = {
                    user: payload?.inputs,
                    bot: data?.generated_text,
                };
                const updatedChatArray = [...chat, payloadData];

                dispatch({
                    type: "CHATBOTReply",
                    payload: updatedChatArray,
                });
                onSuccess();
                dispatch(Loader(false));
            } else {
                alert("Sorry Response Failed!");
                dispatch(Loader(false));
            }
        } catch (error) {
            console.error("Error logging out:", error);
            dispatch(Loader(false));
        }
    };
const Loader = (data) => async (dispatch) => {
    dispatch({
        type: "LOADER",
        payload: data,
    });
};
