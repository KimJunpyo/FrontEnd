import { postActions } from '../slice/toDos';
import postAPI from '../../apis/postAPI';
import axios from "axios";

// Board 클릭시 게시판 가져오기
const getBoardAPI = () => {
    return async function(dispatch){
        const response = await postAPI.getBoardAxios();
        dispatch(postActions.setBoard(response.data));
    };
};

// 수정하기 버튼 클릭시 입력된 데이터 가져오기
const getEditAPI = () => {
    return async function(dispatch){
        const response = await postAPI.editAxios();
        dispatch();
    }
}


const postsActions = {
    getBoardAPI,
    getEditAPI,
};

export default postsActions;