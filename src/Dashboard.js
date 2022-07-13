import { useEffect, useState } from 'react'
import { ButtonStyle, FormStyle } from './styles'
import { ethers} from 'ethers'
import erc20ABI from './ABIs/erc20ABI.json'

// van...ado.eth public key
const PUBLIC_KEY = '0x7EEa9F4A69c3a43d333366Efc0798523910b146D'

const Dashboard = () => {
  // _______ AAVE V3 FUJI CONTRACTS _______
  // https://docs.aave.com/developers/deployed-contracts/v3-testnet-addresses
  const POOL_PROXY_CONTRACT = '0xb47673b7a73D78743AFF1487AF69dBB5763F00cA' // given

  // to get  balances
  // const UI_POOL_PROVIDER_V3_CONTRACT = '0x1D01f7d8B42Ec47837966732f831E1D6321df499'
  // const WALLET_BALANCE_PROVIDER_CONTRACT = '0xd19443202328A66875a51560c28276868B8C61C2'

  // _______ MAINNET ABIs _______
  const PoolV3ABI = require('@aave/core-v3/artifacts/contracts/protocol/pool/Pool.sol/Pool.json')
  // const UiPoolDataProviderV3ABI = require('@aave/periphery-v3/artifacts/contracts/misc/UiPoolDataProviderV3.sol/UiPoolDataProviderV3.json')
  // const WalletBalanceProviderABI = require('@aave/periphery-v3/artifacts/contracts/misc/WalletBalanceProvider.sol/WalletBalanceProvider.json')
  // const PoolAddressesProviderABI = require('@aave/core-v3/artifacts/contracts/protocol/configuration/PoolAddressesProvider.sol/PoolAddressesProvider.json')

  // _______ TestnetMintableERC20 _______
  // https://docs.aave.com/developers/deployed-contracts/v3-testnet-addresses
  const WAVAX_ADDRESS_ERC20 = '0x407287b03D1167593AF113d32093942be13A535f'
  const USDC_ADDRESS_ERC20 = '0x3E937B4881CBd500d05EeDAB7BA203f2b7B3f74f' // given
  // const WETH_ADDRESS_ERC20 = '0x28A8E6e41F84e62284970E4bc0867cEe2AAd0DA4'
  const ATOKEN_ADDRESS_ERC20 = '0xE9C1731e1186362E2ba233BC16614b2a53ecb3F2'

  const [USDC, setUSDC] = useState('')
  const [WAVAX, setWAVAX] = useState('')

  async function getUSDCBalance() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const usdcContract = await new ethers.Contract(USDC_ADDRESS_ERC20, erc20ABI, provider)
      const totalSupply = await usdcContract.totalSupply()
      // 6 because usdc has 6 decimals
      setUSDC(ethers.utils.formatUnits(totalSupply, 6))
      // expected 10,000 not 103,000.55
    } catch (e) {
      console.log(e)
    }
  }

  async function getAVAXBalance() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const wavaxContract = await new ethers.Contract(WAVAX_ADDRESS_ERC20, erc20ABI, provider)
      const totalSupply = await wavaxContract.totalSupply()
      setWAVAX(ethers.utils.formatEther(totalSupply))
    } catch (e) {
      console.log(e)
    }
  }

  // who do i ned to grant access to spend?
  // approved wavax, usdc, atoken 
  async function approve() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const approvedUSDC = ethers.utils.parseEther('1000')
      const aTokenContract = new ethers.Contract(ATOKEN_ADDRESS_ERC20, erc20ABI, signer )
      await aTokenContract.approve(WAVAX_ADDRESS_ERC20, approvedUSDC)
      
    } catch (e) {
      console.log(e)
    }
  }

  async function supply() {
    try {
      const usdc = ethers.utils.parseEther('50')
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const poolContract = new ethers.Contract(POOL_PROXY_CONTRACT, PoolV3ABI.abi, signer)

      await poolContract
        .supply(
          USDC_ADDRESS_ERC20,
          usdc,
          PUBLIC_KEY,
          0,
          { gasLimit: 3e6 })
        .send({ from: PUBLIC_KEY }
        )
        // error: Fail with error '51'
    } catch (e) {
      console.log()
    }
  }

  useEffect(() => {
    getUSDCBalance()
    getAVAXBalance()
  }, [])

  return (
    <div className='flex flex-col tracking-wide'>
      <div className={FormStyle}>
        <h1 className='text-3xl mb-1'>ASSETS TO SUPPLY: </h1>
        <h3 className='mb-1'>Wallet Balance</h3>
        <p>{`${USDC} USDC`}</p>
        <p>{`${WAVAX.slice(0, 5)} AVAX`}</p>
        <p className='text-gradient-200 mb-10'>{`Available to Supply:  AVAX`}</p>
        <h1 className='text-3xl mb-1'>ACTIVE ACCOUNTS: </h1>
        <div>
          <p>{`Collateral: `}</p>
          <p>{`Borrowed: `}</p>
        </div>
      </div>
      <div className='flex justify-around'>
        <button
          onClick={supply}
          className={`${ButtonStyle} + w-1/2`}
        >
          Supply Max
        </button>
        <button
          onClick={approve}
          className={`${ButtonStyle} + w-1/2`}
        >
          Approve
        </button>
      </div>
    </div>
  )
}

export default Dashboard
