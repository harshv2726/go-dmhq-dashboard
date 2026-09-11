import { AuthSplitShell } from "@/components/auth/auth-split-shell";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <AuthSplitShell
      panelHeadline="Every DM is a sale waiting to happen."
      panelSubhead="DMHQ keeps track so you don't have to."
    >
      <LoginForm />
    </AuthSplitShell>
  );
}
