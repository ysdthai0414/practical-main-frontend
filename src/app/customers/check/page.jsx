import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";

async function fetchCustomer(id) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT + `/customers?customer_id=${id}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch customer");
  }
  return res.json();
}

export default async function ReadPage(props) {
  const searchParams = props?.searchParams ?? {};
  const id = searchParams.id;

  if (!id) {
    return (
      <>
        <div className="alert alert-error">顧客IDが指定されていません。</div>
        <button className="btn btn-outline btn-accent">
          <a href="/customers">一覧に戻る</a>
        </button>
      </>
    );
  }

  const customerInfo = await fetchCustomer(id);

  if (!Array.isArray(customerInfo) || customerInfo.length === 0) {
    return (
      <>
        <div className="alert alert-error">顧客情報が見つかりませんでした。</div>
        <button className="btn btn-outline btn-accent">
          <a href="/customers">一覧に戻る</a>
        </button>
      </>
    );
  }

  const customer = customerInfo[0];

  return (
    <>
      <div className="alert alert-success">更新しました</div>
      <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
        <OneCustomerInfoCard {...customer} />
      </div>
      <button className="btn btn-outline btn-accent">
        <a href="/customers">一覧に戻る</a>
      </button>
    </>
  );
}
