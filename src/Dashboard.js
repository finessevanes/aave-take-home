import React from 'react'
import { ethers } from 'ethers'
import { ButtonStyle } from './styles'

const Dashboard = () => {
  // pool abi
  const PoolV3Artifact = require('@aave/core-v3/artifacts/contracts/protocol/pool/Pool.sol/Pool.json')
  
  // van...ado.eth public key
  const PUBLIC_KEY = '0x7EEa9F4A69c3a43d333366Efc0798523910b146D'
  
  // AVAX-TestnetMintableERC20-Avalanche
  const AVAX_ADDRESS = '0x407287b03D1167593AF113d32093942be13A535f'
  
  // Fuji V3 Pool Contract
  const POOL_CONTRACT_ADDRESS = '0x794a61358D6845594F94dc1DB02A252b5b4814aD'


  async function supplyFunds() {
    try {
      const { ethereum } = window
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const connectedContract = new ethers.Contract(POOL_CONTRACT_ADDRESS, PoolV3Artifact.abi, signer)

      // USDC-TestnetMintableERC20-Avalanche = 0x3E937B4881CBd500d05EeDAB7BA203f2b7B3f74f
      //  = 0x407287b03D1167593AF113d32093942be13A535f


      // supply the contract : supply(address: assetToBeSupplied, uint256: amount, address: onBehaldOf, uint16: referralCode)
      let supplyTxn = await connectedContract.supply(
        AVAX_ADDRESS,
        1,
        PUBLIC_KEY,
        0
      )

      await supplyTxn.wait()

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
