import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { LinearTransition } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { OtpInput } from "@/components/base/otp-input/";

const OtpInputExample: React.FC = () => {
  const [otpValue, setOtpValue] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleOtpChange = (code: string): void => {
    setOtpValue(code);
    if (hasError) {
      setHasError(false);
    }
  };

  const handleOtpFinished = async (code: string): Promise<void> => {
    setIsVerifying(true);

    // Simulate verification delay
    setTimeout(() => {
      if (code === "1234") {
        setIsSuccess(true);
        setHasError(false);
        Alert.alert("Success", "OTP verified successfully!");
      } else {
        setHasError(true);
        setIsSuccess(false);
      }
      setIsVerifying(false);
    }, 1500);
  };

  const handleResendCode = (): void => {
    setOtpValue("");
    setHasError(false);
    setIsSuccess(false);
    Alert.alert(
      "Code Sent",
      "A new verification code has been sent to your device.",
    );
  };

  const clearOtp = (): void => {
    setOtpValue("");
    setHasError(false);
    setIsSuccess(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="shield-checkmark-outline"
              size={24}
              color="#10b981"
            />
          </View>
          <Text style={styles.title}>Verify Your Identity</Text>
          <Text style={styles.subtitle}>
            Enter the 4-digit code sent to your device
          </Text>
        </View>

        {/* OTP Input */}
        <View style={styles.otpContainer}>
          <OtpInput
            otpCount={4}
            containerStyle={styles.otpInputContainer}
            otpInputStyle={[
              styles.otpInputStyle,
              hasError && styles.otpInputError,
              isSuccess && styles.otpInputSuccess,
            ]}
            textStyle={styles.otpTextStyle}
            focusedColor={
              hasError ? "#ef4444" : isSuccess ? "#10b981" : "#3b82f6"
            }
            inputWidth={64}
            inputHeight={72}
            inputBorderRadius={12}
            enableAutoFocus={true}
            editable={!isVerifying && !isSuccess}
            onInputChange={handleOtpChange}
            onInputFinished={handleOtpFinished}
            error={hasError}
            errorMessage={
              hasError ? "Invalid code. Please try again." : undefined
            }
          />
        </View>

        {/* Status Messages */}
        <View style={styles.statusContainer}>
          {isVerifying && (
            <View style={styles.statusMessage}>
              <Ionicons name="sync-outline" size={16} color="#6b7280" />
              <Text style={styles.statusText}>Verifying code...</Text>
            </View>
          )}

          {isSuccess && (
            <View style={[styles.statusMessage, styles.successMessage]}>
              <Ionicons name="checkmark-circle" size={16} color="#10b981" />
              <Text style={[styles.statusText, styles.successText]}>
                Verification successful!
              </Text>
            </View>
          )}

          {hasError && (
            <View style={[styles.statusMessage, styles.errorMessage]}>
              <Ionicons name="alert-circle" size={16} color="#ef4444" />
              <Text style={[styles.statusText, styles.errorText]}>
                Invalid code. Please try again.
              </Text>
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <Pressable
            style={styles.secondaryButton}
            onPress={handleResendCode}
            disabled={isVerifying}
          >
            <Ionicons name="refresh-outline" size={16} color="#6b7280" />
            <Text style={styles.secondaryButtonText}>Resend Code</Text>
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={clearOtp}
            disabled={isVerifying}
          >
            <Ionicons name="trash-outline" size={16} color="#6b7280" />
            <Text style={styles.secondaryButtonText}>Clear</Text>
          </Pressable>
        </View>

        {/* Helper Text */}
        <Text style={styles.helperText}>
          Didn't receive a code? Check your spam folder or try again in 60
          seconds.
        </Text>
      </View>
    </View>
  );
};

export default OtpInputExample;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#1a1a1a",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    width: "100%",
    maxWidth: 400,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 12,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#10b981/10",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#10b981/20",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#9ca3af",
    textAlign: "center",
    lineHeight: 24,
  },
  otpContainer: {
    marginBottom: 24,
    marginTop: 24,
  },
  otpInputContainer: {
    gap: 12,
  },
  otpInputStyle: {
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: "#2a2a2a",
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  otpInputError: {
    borderColor: "#ef4444",
    backgroundColor: "#1f1011",
  },
  otpInputSuccess: {
    borderColor: "#10b981",
    backgroundColor: "#0f1f17",
  },
  otpTextStyle: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "600",
  },
  statusContainer: {
    minHeight: 24,
    justifyContent: "center",
    marginBottom: 24,
  },
  statusMessage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#1f1f1f",
  },
  successMessage: {
    backgroundColor: "#0f1f17",
  },
  errorMessage: {
    backgroundColor: "#1f1011",
  },
  statusText: {
    fontSize: 14,
    color: "#9ca3af",
    fontWeight: "500",
  },
  successText: {
    color: "#10b981",
  },
  errorText: {
    color: "#ef4444",
  },
  actionContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#1f1f1f",
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  secondaryButtonText: {
    fontSize: 14,
    color: "#9ca3af",
    fontWeight: "500",
  },
  helperText: {
    fontSize: 13,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 20,
  },
});
