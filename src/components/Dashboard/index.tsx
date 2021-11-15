import { Summary } from "../Summary";
import { TransationTable } from "../TransationTable";
import { Container } from "./styles";

export function DashBoard() {
  return (
    <Container>
      <Summary />
      <TransationTable />
    </Container>
  );
}
