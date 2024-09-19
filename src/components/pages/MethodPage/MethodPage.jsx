import { Link } from "react-router-dom";

function MethodPage() {
  return (
    <div>
      <h3>Method Page</h3>
      <p>
        Explanation of methodology throughout the report for people who are
        interested in how it was put together / how to interpret the results
      </p>
      <h4>Source Data</h4>
      <p>Teztok details</p>
      <p>
        Teztok issues - batch mints in early days, batch relists to be seen?
      </p>
      <h4>Data load</h4>
      <p>
        Data load issues - missing collection names, artists, etc. bumped to
        99999 and ignored
      </p>
      <p>
        Nfts with no primary purchase ignored completely - about 1000 NFTs in
        millions
      </p>
      <h4>Score calculation</h4>
      <p>Rationale / goal of score method</p>
      <p>Example score calculation</p>
    </div>
  );
}

export default MethodPage;
