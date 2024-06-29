import { Summary } from "../Summary";
import { TransactionTable } from "../TransationTable";
import { Container } from "./styles";

export function DashBoard() {
  return (
    <Container>
      <Summary />
      <TransactionTable />
    </Container>
  );
}
