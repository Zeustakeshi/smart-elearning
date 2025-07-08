import { DocumentData } from "@/types/mydoc";
import { DocCard } from "./DocCard";

export const MyDocuments = () => {
  const dataDoc = DocumentData;
  return (
    <div className="flex min-h-screen w-full items-start p-10   ">
      <div className="w-full max-w-2xl space-y-4 font-mono ">
        <h1 className="text-xl font-bold mb-4">Tài liệu của tôi</h1>
        {dataDoc.map((plan) => (
          <DocCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
};
