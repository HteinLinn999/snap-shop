import AuthForm from "@/components/auth/auth-form";

const Register = () => {
  return (
    <AuthForm
      formTitle="Register New account"
      footerHref="/auth/login"
      footerLabel="Already have an account?"
      //showProvider={true}
      showProvider
    >
        <h2>Register </h2>
    </AuthForm>
  );
};

export default Register;
