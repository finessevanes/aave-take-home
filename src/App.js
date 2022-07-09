import './App.css';
import { useEffect, useState } from 'react';
import Dashboard from './Dashboard'
import { ButtonStyle } from './styles'

function App() {
  const [currentAccount, setCurrentAccount] = useState()

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        setCurrentAccount(account);

      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function connectWallet() {
    try {
      const { ethereum } = window
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className=''>
      <div className='flex justify-end'>
        {currentAccount && (
          <div className='text-gradient-300 font-bold bg-white border-gradient-200 border-2 rounded-lg py-2 px-3 m-3 '>{`${currentAccount.slice(0, 4)}...${currentAccount.slice(38)}`}</div>
        )}
      </div>
      <div className='flex justify-center items-center h-screen'>
        {
          !currentAccount && (<button className={ButtonStyle} onClick={connectWallet}>
            Connect Wallet
          </button>
          )
        }
        <Dashboard />
      </div>
    </div>
  );
}

export default App;