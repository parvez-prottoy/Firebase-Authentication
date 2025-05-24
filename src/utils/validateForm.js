export default function validateForm(formData) {
  const errors = {};
  if (!formData.username.trim()) {
    errors.username = "Username is required";
  }
  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Email is invalid";
  }
  if (!formData.password) {
    errors.password = "Password is required";
  } else if (formData.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  } else if (!/[A-Z]/.test(formData.password)) {
    errors.password = "Password must contain at least one uppercase letter";
  } else if (!/[0-9]/.test(formData.password)) {
    errors.password = "Password must contain at least one number";
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
    errors.password = "Password must contain at least one special character";
  }
  if (formData.confirmPassword !== formData.password) {
    errors.confirmPassword = "Passwords do not match";
  }
  return errors;
}
