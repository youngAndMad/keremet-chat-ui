import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert, AlertColor } from "@mui/material";

interface AlertContextType {
  showAlert: (message: string, severity?: AlertColor) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

export const AlertProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>("info");
  const [message, setMessage] = useState<string>("");

  const showAlert = (newMessage: string, newSeverity: AlertColor = "info") => {
    setMessage(newMessage);
    setSeverity(newSeverity);
    setOpen(true);
  };

  const hideAlert = () => {
    setOpen(false);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={hideAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={hideAlert} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};

export default AlertProvider;
