import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h3>Home Page</h3>
      <h4>Headline report with links</h4>
      <hr style={{ border: "none", height: "2px", backgroundColor: "green" }} />
      <p>
        Fxhash launched few years ago, had lots of sales, and accounts, etc.
      </p>
      <p>
        <Link to="reports/fxSummaryReport">High level numbers on fxhash</Link>
      </p>
      <hr style={{ border: "none", height: "2px", backgroundColor: "green" }} />

      <p>Some people bought because they love art, others to speculate</p>
      <p>
        <Link to="reports/overallAAIReport">
          here is overall how all the accounts broke down
        </Link>
      </p>
      <p>
        <Link to="reports/timePhasedAAIReport">
          here is how it differed over time
        </Link>
      </p>
      <p>
        <Link to="reports/rankedAAIReport">
          want to see the top appreciators and speculators?
        </Link>
      </p>
      <hr style={{ border: "none", height: "2px", backgroundColor: "green" }} />

      <p>There are some nice detailed reports</p>
      <p>
        <Link to="reports/accountAAIReport">look at any account you like</Link>
      </p>
      <p>
        <Link to="reports/accountAAIReport">
          look at any artist you like (not linked)
        </Link>
      </p>
      <p>
        <Link to="reports/accountAAIReport">
          look at any collection you like (not linked)
        </Link>
      </p>
      <p>
        <Link to="reports/nftTransactionReport">look at any NFT you like</Link>
      </p>
      {/* <p>
        <Link to="reports/overallAAIReport">
          check out the full record for any NFT
        </Link>
      </p> */}

      <hr style={{ border: "none", height: "2px", backgroundColor: "green" }} />

      <p>
        <Link to="methodPage">Method page here</Link>
      </p>
      <p>
        <Link to="techPage">Tech page here</Link>
      </p>
    </div>
  );
}

export default Home;
