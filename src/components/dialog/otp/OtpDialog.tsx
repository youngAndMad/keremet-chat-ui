import { useState } from "react";
import {
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Dialog,
} from "@mui/material";

const OtpDialog = ({
  handleOTPSubmit,
  handleCloseOTPDialog,
  isOpen,
}: {
  handleOTPSubmit: (otp: string) => void;
  handleCloseOTPDialog: () => void;
  isOpen: boolean;
}) => {
  const [otp, setOTP] = useState("");
  const [otpError, setOtpError] = useState<string | null>(null);

  const handleOtpInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputOTP = e.target.value;

    if (inputOTP.length !== 6) {
      setOtpError("OTP must be 6 characters long");
      return;
    }

    setOtpError(null);
    setOTP(inputOTP);
  };

  return (
    <>
      <Dialog open={isOpen}>
        <DialogTitle>Enter OTP</DialogTitle>
        <DialogContent>
          <p>
            We have sent OTP to your email. Please check and enter it below:
          </p>
          <form>
            <TextField
              label="OTP"
              value={otp}
              onChange={handleOtpInputChange}
              required={true}
              error={Boolean(otpError)}
              helperText={otpError}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleOTPSubmit(otp)} color="primary">
            Submit
          </Button>
          <Button onClick={handleCloseOTPDialog} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OtpDialog;
