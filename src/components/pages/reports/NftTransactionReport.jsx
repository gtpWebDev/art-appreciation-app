import useGetBackendData from "../../../hooks/useGetBackendData";
import Loading from "../../composites/Loading";

/**
 * Probably make this user input nftid rather than router param
 * Sensible to split each purchase cycle, and give the score for the cycle
 * rather than the total
 * Can use rows.push approach to this, with some faff with creating a unique key for subheader
 */

const NftTransactionReport = () => {
  const nftId = "kHaCE_100";

  const nftTransEndpoint = `/transactions/nfts/${nftId}`;
  const { data, error, loading } = useGetBackendData(nftTransEndpoint);

  if (loading) return <Loading />;

  if (error) return <p>error</p>;

  // calculate the score when the data is available
  const nftScore = data.reduce(
    (accumulator, currentValue) => accumulator + Number(currentValue.score),
    0
  );
  const nftNormalisedScore = data.reduce(
    (accumulator, currentValue) =>
      accumulator + Number(currentValue.normalised_score),
    0
  );

  return (
    <>
      <h2>Nft Transaction Report</h2>
      <h3>Big numbers</h3>
      <p>Artist filter here</p>
      <p>Collection filter here</p>
      <p>Nft selection here</p>
      <table>
        <thead>
          <th>nft id</th>
          <th>trans type</th>
          <th>timestamp</th>
          <th>score</th>
          <th>normalised score</th>
        </thead>
        <tbody>
          {data.map((element) => (
            <tr key={element.id}>
              <td>{element.nft_id}</td>
              <td>{element.transaction_type}</td>
              <td>{element.timestamp}</td>
              <td>{Math.round(element.score * 100) / 100}</td>
              <td>{Math.round(element.normalised_score * 100) / 100}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Nft total score: {nftScore}</p>
      <p>Nft total normalised score: {nftNormalisedScore}</p>
    </>
  );
};

export default NftTransactionReport;
