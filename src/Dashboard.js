import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { ButtonStyle, FormStyle } from './styles'

// van...ado.eth public key
const PUBLIC_KEY = '0x7EEa9F4A69c3a43d333366Efc0798523910b146D'

const Dashboard = () => {
  // _______ AAVE V3 FUJI CONTRACTS _______
  // https://docs.aave.com/developers/deployed-contracts/v3-testnet-addresses
  const POOL_PROXY_CONTRACT = '0xb47673b7a73D78743AFF1487AF69dBB5763F00cA'
  const UI_POOL_PROVIDER_V3_CONTRACT = '0x1D01f7d8B42Ec47837966732f831E1D6321df499'
  const WALLET_BALANCE_PROVIDER_CONTRACT = '0xd19443202328A66875a51560c28276868B8C61C2'

  // _______ MAINNET ABIs _______
  const PoolV3ABI = require('@aave/core-v3/artifacts/contracts/protocol/pool/Pool.sol/Pool.json')
  const UiPoolDataProviderV3ABI = require('@aave/periphery-v3/artifacts/contracts/misc/UiPoolDataProviderV3.sol/UiPoolDataProviderV3.json')
  const WalletBalanceProviderABI = require('@aave/periphery-v3/artifacts/contracts/misc/WalletBalanceProvider.sol/WalletBalanceProvider.json')

  // _______ TestnetMintableERC20 _______
  // AVAX-Avalanche
  // https://docs.aave.com/developers/deployed-contracts/v3-testnet-addresses
  const AVAX_ADDRESS_ERC20 = '0x407287b03D1167593AF113d32093942be13A535f'
  const [avaxBalance, setAvaxBalance] = useState('')

  useEffect(() => {
    getAvaxWalletBalance()
    getPoolBalance()
  }, [])

  async function supplyFunds() {
    try {
      const { ethereum } = window
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const connectedContract = new ethers.Contract(POOL_PROXY_CONTRACT, PoolV3ABI.abi, signer)

      // supply the contract : supply(address: assetToBeSupplied, uint256: amount, address: onBehaldOf, uint16: referralCode)
      // https://docs.aave.com/developers/core-contracts/pool
      let supplyTxn = await connectedContract.supply(
        AVAX_ADDRESS_ERC20,
        1,
        PUBLIC_KEY,
        0,
        {
          gasLimit: 3e6
        }
      )

      console.log('... transaction ...')
      await supplyTxn.wait()
      console.log('completed: ', supplyTxn)

    } catch (e) {
      console.log(e)
    }
  }

  // Does not call Aave contract
  async function getAvaxWalletBalance() {
    try {
      const ethers = require("ethers")
      const network = "https://api.avax-test.network/ext/bc/C/rpc"
      const provider = ethers.getDefaultProvider(network)

      provider.getBalance(PUBLIC_KEY).then((balance) => {
        const balanceInAvax = ethers.utils.formatEther(balance)
        setAvaxBalance(balanceInAvax)
      })
    } catch (e) {
      console.log(e)
    }
  }

  async function getPoolBalance() {
    try {
      const { ethereum } = window
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const connectedContract = new ethers.Contract(UI_POOL_PROVIDER_V3_CONTRACT, UiPoolDataProviderV3ABI.abi, signer)

      // https://docs.aave.com/developers/periphery-contracts/uipooldataproviderv3#getreservesdata
      // function getReservesData(IPoolAddressesProvider provider)
      let balanceOfTxn = await connectedContract.getReservesData(provider)

      console.log('AVAX Balance: ', balanceOfTxn.toNumber())
    } catch (e) {
      console.log(e)
    }
  }


  return (
    <div className='flex flex-col tracking-wide'>
      <div className={FormStyle}>
        <h1 className='text-3xl mb-1'>ASSETS TO SUPPLY: </h1>
        <p>{`Wallet Balance: ${avaxBalance.slice(0, 5)} AVAX`}</p>
        <p className='text-gradient-200 mb-10'>{`Available to Supply: ${avaxBalance.slice(0, 5)} AVAX`}</p>
        <h1 className='text-3xl mb-1'>ACTIVE ACCOUNTS: </h1>
        <div>
          <p>{`Collateral: `}</p>
          <p>{`Borrowed: `}</p>
        </div>
      </div>
      <div className='flex justify-around'>
      <button
        onClick={supplyFunds}
        className={`${ButtonStyle} + w-1/2`}
      >
        Supply Max
      </button>
      <button
        onClick={supplyFunds}
        className={`${ButtonStyle} + w-1/2`}
      >
        Borrow Max
      </button>
      </div>
    </div>
  )
}

export default Dashboard
