import { AuthSplitShell } from "@/components/auth/auth-split-shell";
import { SignupForm } from "@/components/signup-form";

export default function RegisterPage() {
  return (
    <AuthSplitShell
      panelHeadline="Stop managing orders in your DMs."
      panelSubhead="Post it. Link it. Ship it."
      panelSupporting="No website. No coding. Just a link your customers can check out from."
    >
      <SignupForm />
    </AuthSplitShell>
  );
}
