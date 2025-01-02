import EntryForm from "@/app/components/EntryForm";
import MainTitle from "@/app/components/MainTitle";

export default function Page() {
    return (
      <div>
        <div className="w-full flex mb-2">
          <MainTitle title="Create Entry" />
        </div>
        <EntryForm />
      </div>
    )
}