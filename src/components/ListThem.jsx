import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from 'styled-components';
import { postActions } from "../redux/slice/toDos";

const ListThem = ({itemContents, themList}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    return(
        <>
            {itemContents ? itemContents.map(({id, memberName, createdAt, viewCount, likeList, title}) => (
                <ListThemBox key={id}>
                    <ItemBox>
                        <ListItem>{id}</ListItem>
                        <ListItem style={{cursor: "pointer"}} onClick={()=>{dispatch(postActions.setId(id)); navigate("/board/detail");}}>{title}</ListItem>
                        <ListItem>{memberName}</ListItem>
                        <ListItem>{createdAt.slice(0, 3).join('.')}</ListItem>
                        <ListItem>{viewCount}</ListItem>
                        <ListItem>{likeList}</ListItem>
                    </ItemBox>
                </ListThemBox>
            )) :  
            <ListThemBox>
                <ItemBox>
                    <ListItem>{themList.id}</ListItem>
                    <ListItem>{themList.title}</ListItem>
                    <ListItem>{themList.memberName}</ListItem>
                    <ListItem>{themList.createdAt.slice(0, 3).join('.')}</ListItem>
                    <ListItem>{themList.viewCount}</ListItem>
                    <ListItem>{themList.likeList}</ListItem>
                </ItemBox>
            </ListThemBox>}
        </>
    )
}

const ListThemBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 6.9vh;
    &:nth-of-type(odd){background-color: #313131};
`;

const ItemBox = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ListItem = styled.div`
    width: 10%;
    height: 100%;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: 600;
    &:nth-of-type(1){width: 5%; height: 50%; background-color: white; border-radius: 15px; color: black; margin-left: 10px};
    &:nth-of-type(2){width: 31%};
    &:nth-of-type(6){padding-right: 24%};
`;

export default ListThem;
