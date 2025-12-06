"use client";

import { Suspense } from "react";
import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";
import fetchCustomer from "./fetchCustomer";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function ConfirmPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const customer_id = searchParams.get("customer_id");
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    if (!customer_id) return;

    const fetchAndSetCustomer = async () => {
      const customerData = await fetchCustomer(customer_id);
      setCustomer(customerData);
    };
    fetchAndSetCustomer();
  }, [customer_id]);

  if (!customer) {
    return (
      <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
        <div className="alert alert-info p-4 text-center">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
      <div className="alert alert-success p-4 text-center">
        正常に作成しました
      </div>
      <OneCustomerInfoCard {...customer} />
      <button onClick={() => router.push("/customers")}>
        <div className="btn btn-primary m-4 text-2xl">戻る</div>
      </button>
    </div>
  );
}

export default function ConfirmPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmPageInner />
    </Suspense>
  );
}
