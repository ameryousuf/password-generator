import { Container } from "@mui/material";
import PasswordGenerator from "./components/PasswordGenerator";

function App() {
  return (
    <Container sx={{ paddingBlock: 3 }}>
      <h1 className="text-center font-bold text-3xl mb-6">
        Password Generator
      </h1>
      <PasswordGenerator />
    </Container>
  );
}

export default App;
