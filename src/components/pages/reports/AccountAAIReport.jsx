import useGetBackendData from "../../../hooks/useGetBackendData";
import Loading from "../../composites/Loading";

const AccountAAIReport = () => {
  const ownerId = "tz1YxAN3rn85UQxevF7w78v66xHnSQQByo2j";
  const accountStatsEndpoint = `/fxstats/owners/${ownerId}`;

  const { data, error, loading } = useGetBackendData(accountStatsEndpoint);
  // data form:
  //     {
  //       "transaction_type": "secondary_purchase",
  //       "transaction_count": 7,
  //       "tz_sum": "854.39",
  //       "usd_sum": "3794.598865",
  //     },

  if (loading) return <Loading />;

  if (error) return <p>error</p>;

  return (
    <>
      <h2>Account AAI Report</h2>
      <h3>Onwer stats</h3>
      <table>
        <thead>
          <th>Transaction type</th>
          <th>Number of transactions</th>
          <th>Tezos total</th>
          <th>USD total</th>
        </thead>
        <tbody>
          {data.map((transType) => (
            <tr key={transType.transaction_type}>
              <td>{transType.transaction_type}</td>
              <td>{transType.transaction_count}</td>
              <td>{transType.tz_sum ? transType.tz_sum.toFixed(2) : 0}</td>
              <td>{transType.usd_sum ? transType.usd_sum.toFixed(2) : 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AccountAAIReport;
