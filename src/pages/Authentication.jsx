import React, { useState } from "react";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";
import { UserLogin, UserRegister, VerifyOtp } from "../Api/index.js";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.bg};
`;

const Card = styled.div`
  width: 100%;
  max-width: 420px;
  padding: 36px 32px;
  background: ${({ theme }) => theme.bgLight};
  border-radius: 16px;
  box-shadow: 0 4px 30px ${({ theme }) => theme.shadow};
  display: flex;
  flex-direction: column;
  gap: 22px;
  @media (max-width: 500px) {
    margin: 0 16px;
    padding: 28px 20px;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  text-align: center;
  margin: 0;
`;

const SubTitle = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  margin: -12px 0 0;
`;

const Label = styled.label`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
  text-transform: uppercase;
  padding: 0 4px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Input = styled.input`
  padding: 14px;
  border-radius: 8px;
  border: 0.5px solid ${({ theme }) => theme.text_secondary + "70"};
  background: transparent;
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
  outline: none;
  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
  &::placeholder {
    color: ${({ theme }) => theme.text_secondary};
  }
`;

const OtpInput = styled(Input)`
  text-align: center;
  letter-spacing: 10px;
  font-size: 22px;
  font-weight: 600;
`;

const Btn = styled.button`
  padding: 14px;
  border: none;
  border-radius: 10px;
  background: ${({ theme }) => theme.primary};
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: opacity 0.2s;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Toggle = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  margin: 0;
`;

const Link = styled.span`
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  font-weight: 500;
`;

const ErrorText = styled.div`
  color: ${({ theme }) => theme.red};
  font-size: 13px;
  text-align: center;
`;

const SuccessText = styled.div`
  color: ${({ theme }) => theme.green};
  font-size: 13px;
  text-align: center;
`;

const Authentication = ({ setUser }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const resetState = () => {
    setOtpSent(false);
    setError("");
    setSuccess("");
    setOtp("");
  };

  const handleSendOtp = async () => {
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      if (isRegister) {
        if (!name || !email) {
          setError("Name and email are required");
          setLoading(false);
          return;
        }
        const res = await UserRegister({ name, email });
        setSuccess(res?.data?.message || "OTP sent!");
      } else {
        if (!email) {
          setError("Email is required");
          setLoading(false);
          return;
        }
        const res = await UserLogin({ email });
        setSuccess(res?.data?.message || "OTP sent!");
      }
      setOtpSent(true);
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    setSuccess("");
    if (!otp || otp.length !== 6) {
      setError("Enter a valid 6-digit OTP");
      return;
    }
    setLoading(true);
    try {
      const res = await VerifyOtp({ email, otp });
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Card>
        <Title>{isRegister ? "Create Account" : "Welcome Back"}</Title>
        <SubTitle>
          {otpSent
            ? "Enter the OTP sent to your email"
            : isRegister
            ? "Register with your Gmail"
            : "Login with your Gmail"}
        </SubTitle>

        {!otpSent ? (
          <>
            {isRegister && (
              <InputGroup>
                <Label>Name</Label>
                <Input
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </InputGroup>
            )}
            <InputGroup>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Enter your Gmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
          </>
        ) : (
          <InputGroup>
            <Label>OTP</Label>
            <OtpInput
              maxLength={6}
              placeholder="------"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            />
          </InputGroup>
        )}

        {error && <ErrorText>{error}</ErrorText>}
        {success && <SuccessText>{success}</SuccessText>}

        {!otpSent ? (
          <Btn onClick={handleSendOtp} disabled={loading}>
            {loading && (
              <CircularProgress style={{ width: 18, height: 18, color: "#fff" }} />
            )}
            {isRegister ? "Send OTP" : "Login"}
          </Btn>
        ) : (
          <>
            <Btn onClick={handleVerifyOtp} disabled={loading}>
              {loading && (
                <CircularProgress style={{ width: 18, height: 18, color: "#fff" }} />
              )}
              Verify OTP
            </Btn>
            <Toggle>
              Didn't receive?{" "}
              <Link
                onClick={() => {
                  if (!loading) handleSendOtp();
                }}
              >
                Resend OTP
              </Link>
            </Toggle>
          </>
        )}

        <Toggle>
          {isRegister ? "Already have an account? " : "Don't have an account? "}
          <Link
            onClick={() => {
              setIsRegister(!isRegister);
              resetState();
            }}
          >
            {isRegister ? "Login" : "Register"}
          </Link>
        </Toggle>
      </Card>
    </Container>
  );
};

export default Authentication;
