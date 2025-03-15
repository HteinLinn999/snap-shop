import {
  Card,
  CardContent,
  //   CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import AuthFooter from "./auth-footer";
import ProviderLogin from "./provider-login";

type AuthFormProps = {
  children: React.ReactNode;
  formTitle: string;
  showProvider: boolean;
  footerLabel: string;
  footerHref: string;
};

const AuthForm = ({
  children,
  formTitle,
  showProvider,
  footerLabel,
  footerHref,
}: AuthFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{formTitle}</CardTitle>
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      <CardContent>
        {children}
        {showProvider && <ProviderLogin />}
      </CardContent>
      <CardFooter>
        <AuthFooter footerLabel={footerLabel} footerHref={footerHref} />
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
