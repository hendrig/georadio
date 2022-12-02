import React from "react";
import styled from "styled-components"

const StyledUserCard = styled.div`
    margin: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid navy;
    border-radius: 10px;
    padding: 2px;
    width: 300px;

    img {
        width: 80px;
    }

    .username {
        font-weight: 700;
        margin: 5px auto;

    }

    .qtty { 
        margin-top: 5px;
    }
    .qtty-red {
        font-weight: 700;
        color: red;
    }
`

export default StyledUserCard;
