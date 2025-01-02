import AccountForm from "@/app/components/AccountForm";
import MainTitle from "@/app/components/MainTitle";

export default function Page() {
  return (
    <div>
      <div className="w-full flex mb-2">
        <MainTitle title="Create Account" />
      </div>
      <AccountForm/>
    </div>
  )
}