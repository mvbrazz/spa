// Style - Css
import Body from "../../../assets/FontSystem/Body";
import {
  Container,
  TitleDiv,
  SquareDiv,
  SquareText,
  LateSquare,
  NearSquare,
  OnTimeSquare,
  H1,
  Subject,
  Planner,
} from "./styles";

const Grafic = (props) => {
  return (
    <Container>
      <TitleDiv>
        <H1>Subject</H1>
      </TitleDiv>
      <SquareDiv>
        <LateSquare>{props.numberOfSubjeccts[0]}</LateSquare>
        <SquareText>Canceled</SquareText>
      </SquareDiv>

      <SquareDiv>
        <NearSquare>{props.numberOfSubjeccts[1]}</NearSquare>
        <SquareText>Finished</SquareText>
      </SquareDiv>
      <SquareDiv>
        <OnTimeSquare>{props.numberOfSubjeccts[2]}</OnTimeSquare>
        <SquareText>In Progress</SquareText>
      </SquareDiv>

      <TitleDiv>
        <H1>Planner</H1>
      </TitleDiv>
      <SquareDiv>
        <LateSquare>{props.numberOfPlanner[0]}</LateSquare>
        <SquareText>Canceled</SquareText>
      </SquareDiv>

      <SquareDiv>
        <NearSquare>{props.numberOfPlanner[1]}</NearSquare>
        <SquareText>Scheduled</SquareText>
      </SquareDiv>
      <SquareDiv>
        <OnTimeSquare>{props.numberOfPlanner[2]}</OnTimeSquare>
        <SquareText>Done</SquareText>
      </SquareDiv>
    </Container>
  );
};

export default Grafic;
