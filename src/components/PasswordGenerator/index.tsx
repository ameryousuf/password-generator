import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Slider,
  Snackbar,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useCopyToClipboard } from "./useCopyToClipboard";
import { useGeneratePassword } from "./useGeneratePassword";

const PasswordGenerator = () => {
  const generatePassword = useGeneratePassword();
  const copyToClipboard = useCopyToClipboard();
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(10);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  // A memo used to ensure at least one generator option is selected
  const toggleOptionDisabled = useMemo(
    () =>
      [
        includeLowercase,
        includeUppercase,
        includeNumbers,
        includeSymbols,
      ].filter(Boolean).length === 1,

    [includeLowercase, includeUppercase, includeNumbers, includeSymbols]
  );

  const handleGeneratePassword = () => {
    const newPassowrd = generatePassword(
      length,
      includeLowercase,
      includeUppercase,
      includeNumbers,
      includeSymbols
    );
    setPassword(newPassowrd);
  };

  const handleClickCopyPassword = () => {
    copyToClipboard(password).then(() => setShowSnackbar(true));
  };

  return (
    <Container maxWidth="sm" className="border rounded-lg">
      <Stack spacing={2} paddingBlock={3}>
        <TextField
          fullWidth
          id="password"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ cursor: "default" }}>
                <Tooltip title="Copy Password">
                  <span>
                    <IconButton
                      aria-label="copy password to clipboard"
                      onClick={handleClickCopyPassword}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                      disabled={!password}
                    >
                      <ContentCopyIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </InputAdornment>
            ),
            readOnly: true,
            sx: { cursor: "default" },
          }}
          inputProps={{
            "aria-label": "Generated password",
            sx: { cursor: "default" },
          }}
          value={password}
        />
        <span className="font-medium">Character length {length}</span>
        <Slider
          aria-label="Password length slider"
          min={1}
          max={99}
          value={length}
          onChange={(_, value) => setLength(value as number)}
        />
        <Stack spacing={1}>
          <FormControlLabel
            label="Include Lowercase"
            control={
              <Checkbox
                id="include-lowercase"
                checked={includeLowercase}
                onChange={() => setIncludeLowercase(!includeLowercase)}
                disabled={includeLowercase && toggleOptionDisabled}
              />
            }
          />
          <FormControlLabel
            label="Include Uppercase"
            control={
              <Checkbox
                id="include-uppercase"
                checked={includeUppercase}
                onChange={() => setIncludeUppercase(!includeUppercase)}
                disabled={includeUppercase && toggleOptionDisabled}
              />
            }
          />
          <FormControlLabel
            label="Include Numbers"
            control={
              <Checkbox
                id="include-numbers"
                checked={includeNumbers}
                onChange={() => setIncludeNumbers(!includeNumbers)}
                disabled={includeNumbers && toggleOptionDisabled}
              />
            }
          />
          <FormControlLabel
            label="Include Symbols"
            control={
              <Checkbox
                id="include-symbols"
                checked={includeSymbols}
                onChange={() => setIncludeSymbols(!includeSymbols)}
                disabled={includeSymbols && toggleOptionDisabled}
              />
            }
          />
        </Stack>
        <Button variant="contained" onClick={handleGeneratePassword}>
          Generate
        </Button>
      </Stack>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={3000}
        message="Passowrd copied to clipboard!"
        open={showSnackbar}
        onClose={() => setShowSnackbar(false)}
      />
    </Container>
  );
};

export default PasswordGenerator;
