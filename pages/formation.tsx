import type { NextPage } from 'next'
import {useEffect, useRef, useState} from "react";
import Draggable from "react-draggable";
import styled from "@emotion/styled";

const ItemsContainer = styled.div`
  color: black;
  border: 1px solid black;
  width: 100%;
  background: white;
  justify-content: center;
  display: flex;
  height: 98vh;
  align-items: center;
`

const Container = styled.div`
    background: green;
  width: 40vw;
  height: 80vh;
`;

const ExampleDiv = styled.div<{ $content: string }>`
  position: relative;
  background-color: darkblue;
  color: white;
  padding: 0.5em 1em;
  width: 10px;
  height: 10px;
  margin: 0.3em;
  cursor: move;
  content: "test";
`;

const StyledDiv = styled.div<{ $content: string }>`
  content: "test";
  color: red;
`

const Formation: NextPage = () => {
    const texts = ["Text 1", "Text 2", "Text 3", "Text 4"];
    const [positions, setPositions] = useState({});
    const [hasLoaded, setHasLoaded] = useState(false);
    const nodeRef = useRef(null);

    useEffect(() => {
        const existingDivPositions = JSON.parse(
            localStorage.getItem("positions_div") as string
        );
        setPositions(existingDivPositions);
        setHasLoaded(true);
        console.log(existingDivPositions);
        console.log("has loaded");
    }, []);

    function handleStop(e: any, data: any) {
        let dummyPositions = { ...positions };
        const itemId: number = e.target.id;
        // @ts-ignore
        dummyPositions[itemId] = {};
        // @ts-ignore
        dummyPositions[itemId]["x"] = data.x;
        // @ts-ignore
        dummyPositions[itemId]["y"] = data.y;
        setPositions(dummyPositions);
    }

    useEffect(() => {
        localStorage.setItem(`positions_div`, JSON.stringify(positions));
    }, [positions]);

    return hasLoaded ? (
        <ItemsContainer>
            <Container>
            {texts.map((item, index) => {
                return (
                        <Draggable
                            key={index}
                            defaultPosition={
                                positions === null
                                    ? { x: 0, y: 0 }
                                    : !positions[item[5]]
                                        ? { x: 0, y: 0 }
                                        : { x: positions[item[5]].x, y: positions[item[5]].y }
                            }
                            nodeRef={nodeRef}
                            onStop={handleStop}
                        >
                            <StyledDiv $content={"item"} ref={nodeRef}>
                                <ExampleDiv $content={"go"} id={item[5]}/>
                            </StyledDiv>
                        </Draggable>
                );
            })}
            </Container>
        </ItemsContainer>
    ) : null;
}

export default Formation