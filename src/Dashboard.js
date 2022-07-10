import { useEffect } from 'react'
import { ethers } from 'ethers'
import { ButtonStyle } from './styles'

// van...ado.eth public key
const PUBLIC_KEY = '0x7EEa9F4A69c3a43d333366Efc0798523910b146D'

const Dashboard = () => {
  // _______ AAVE V3 FUJI CONTRACTS _______
  // https://docs.aave.com/developers/deployed-contracts/v3-testnet-addresses
  const POOL_CONTRACT = '0xb47673b7a73D78743AFF1487AF69dBB5763F00cA'
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

  useEffect(() => {
    getAVAXBalance()
  }, [])

  async function supplyFunds() {
    try {
      const { ethereum } = window
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const connectedContract = new ethers.Contract(POOL_CONTRACT, PoolV3ABI.abi, signer)

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

  async function getAVAXBalance() {
    try {
      const ethers = require("ethers")
      const network = "https://api.avax-test.network/ext/bc/C/rpc"
      const provider = ethers.getDefaultProvider(network)

      provider.getBalance(PUBLIC_KEY).then((balance) => {
        // convert a currency unit from wei to ether
        const balanceInAvax = ethers.utils.formatEther(balance)
        console.log(`balance: ${balanceInAvax} AVAX`)
      })
    } catch (e) {
      console.log(e)
    }
  }


  return (
    <div className='flex flex-col'>
      <div>Dashboard</div>
      <button
        onClick={supplyFunds}
        className={`${ButtonStyle} + mt-3`}
      >
        Add Funds
      </button>
    </div>
  )
}

export default Dashboard
