export default function OneCustomerInfoCard(props = {}) {
  const {
    customer_id = "",
    customer_name = "",
    age = "",
    gender = "",
  } = props;

  return (
    <div className="m-4 card bordered bg-blue-200 duration-200 hover:border-r-red">
      <div className="card-body">
        <h2 className="card-title">{customer_name}さん</h2>
        <p>Customer ID: {customer_id}</p>
        <p>Age: {age}</p>
        <p>Gender: {gender}</p>
      </div>
    </div>
  );
}
