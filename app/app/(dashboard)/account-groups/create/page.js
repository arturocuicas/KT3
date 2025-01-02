import AccountGroupForm from "@/app/components/AccountGroupForm";
import MainTitle from "@/app/components/MainTitle";

export default function Page() {
  return (
    <div>
      <div className="w-full flex mb-2">
        <MainTitle title="Create Account Group" />
      </div>
      <AccountGroupForm/>
    </div>
  )
}