import {useEffect,useState } from 'react'
import axios from "axios";
import { usePlaidLink } from 'react-plaid-link';
import reactLogo from './assets/react.svg'

axios.defaults.baseURL = "http://localhost:8000"

function PlaidAuth({publicToken}) {
  const[account, setAccount] = useState();
  // const[transaction, setTransaction] = useState();

  useEffect(() => {
    async function fetchData(){
      let accessToken = await axios.post("/exchange_public_token",{public_token: publicToken});
      console.log("accessToken", accessToken.data);
      const auth = await axios.post("/auth", {access_token: accessToken.data.accessToken});
      console.log("auth data", auth.data);
      setAccount(auth.data.numbers.ach[0]);
      // setTransaction(auth.data.item.available_products[7])
    }
    fetchData();
  }, []);
  return account && (
    <>
    <p>Account number: {account.account}</p>
    <p>Routing number: {account.routing}</p>
    {/* <p>Transactions: {transaction.transaction}</p> */}
    </>

  );
}

function App() {
  const [linkToken, setLinkToken] = useState();
  const [publicToken, setPublicToken] = useState();

  useEffect(()=>{
    async function fetch(){
      const response = await axios.post("/create_link_token");
      setLinkToken(response.data.link_token);
    }
    fetch();
  },[]);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token, metadata) => {
      setPublicToken(public_token);
      console.log("success", public_token,metadata);
      // send public_token to server
    },
  });

  return publicToken ? (<PlaidAuth publicToken={publicToken} />) : (
    <button onClick={() => open()} disabled={!ready}>
      Connect a bank account
    </button>
  );
}