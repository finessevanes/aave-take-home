import { ethers } from 'ethers'
import { ButtonStyle } from './styles'

// van...ado.eth public key
const PUBLIC_KEY = '0x7EEa9F4A69c3a43d333366Efc0798523910b146D'

const Dashboard = () => {
  // mainnet Pool abi
  const PoolV3Artifact = require('@aave/core-v3/artifacts/contracts/protocol/pool/Pool.sol/Pool.json')

  // AVAX-TestnetMintableERC20-Avalanche
  // https://docs.aave.com/developers/deployed-contracts/v3-testnet-addresses
  const AVAX_ADDRESS_ERC20 = '0x407287b03D1167593AF113d32093942be13A535f'

  // Fuji V3 Pool-Proxy-Avalanche
  // https://docs.aave.com/developers/deployed-contracts/v3-testnet-addresses
  const POOL_CONTRACT_ADDRESS = '0xb47673b7a73D78743AFF1487AF69dBB5763F00cA'

  async function supplyFunds() {
    try {
      const { ethereum } = window
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const connectedContract = new ethers.Contract(POOL_CONTRACT_ADDRESS, PoolV3Artifact.abi, signer)
      let testt = provider.getCode(POOL_CONTRACT_ADDRESS)
      console.log(testt)

      // supply the contract : supply(address: assetToBeSupplied, uint256: amount, address: onBehaldOf, uint16: referralCode)
      let supplyTxn = await connectedContract.supply(
        AVAX_ADDRESS_ERC20,
        1,
        PUBLIC_KEY,
        0,
        {
          gasLimit: 3e6
        }
      )

      console.log('minting!')

      await supplyTxn.wait()

      console.log('your transaction')
      console.log(supplyTxn)

    } catch (e) {
      console.log(e)
    }
  }


  return (
    <div className='flex flex-col'>
      <div>Dashboard</div>
      <button onClick={supplyFunds} className={`${ButtonStyle} + mt-3`}>add funds</button>
    </div>
  )
}

export default Dashboard
