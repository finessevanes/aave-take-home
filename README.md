# Aave Take-Home
## Coding
✅ Take a private key as an input which will represent a users wallet

✅ Execute a transaction to supply the user’s entire USDC balance to the Aave V3 Pool

Output the user’s balance of USDC token

⚠️ Outputting the user's balance of AVAX

Execute a transaction to borrow the maximum amount of USDC using the collateral supplied in the previous step

Output the users collateral and borrow balances

## Writing
### QA
#### ❓ How can I get a list of the recent liquidations on the Aave Polygon V3 market?
#### ❓ How do I get my token listed on Aave?
__✅ A:__ In order to have your token added to the Aave ecosystem, you will need to complete the following tasks:

__1. Complete Off-Chain Process__:

- 🔸 Begin the ARC (Aave Request for Comments) process by submitting a post on the [Governance Forum](https://governance.aave.com/)

- 🔸 Upon rough community consensus, create an [AIP](https://docs.aave.com/governance/aips) (Aave Improvement Proposal)

- 🔸 Provide Chainlink price feed

*For a description of the above tasks, please read [New Asset Listing](https://docs.aave.com/governance/guides/new-asset-listing)*

__2. Prepare On-Chain Process__

- 🔸 Create a pull request
run the asset deployment script

*For a description of the above tasks, please read [Prepare for the on-chain process](https://docs.aave.com/developers/v/2.0/protocol-governance/governance/propose-your-token-as-new-aave-asset#2.-prepare-for-the-on-chain-process).*

__3. Make a proposal__

Get your [AIP IPFS hash](https://github.com/aave/aip/blob/master/content/ipfs-aips/all-aips.json). 
Go through the steps listed in the [Asset Listing Repository](https://github.com/aave/aave-asset-listing]) and then deploy the on-chain proposal.

__4. Follow up__

Connect with Aave Genesis on [Discord](https://aave.com/discord) or [Telegram](https://t.me/Aavesome).


#### ❓ How often do token prices update and based upon which price service?
__✅ A:__ Aave uses the Chainlink Aggregator are a price oracle. Chainlink nodes update under two conditions (parameters):

__Deviation of Parameter__
Off-chain, Chainlink nodes are watching token prices. 
Generally speaking, if the token's price changes more than .05% in a given time frame, the nodes will be set off and will prices will be updated.

__Time Interval__
If the price changes are under the deviation as stated from above, then it will set off an update every X minutes over the course of an hour.

Aave also has their own backup price oracle incase Chainlink breaks.
#### ❓ I’m interested in building a liquidation bot, what do I need to get started on this?
__✅ A:__ Depending on your environment, preferred programming tools and languages, your bot should:
Ensure it has enough (or access to enough) funds when liquidating.
Calculate the profitability of liquidating loans vs gas costs, taking into account the most lucrative collateral to liquidate.
Ensure it has access to the latest protocol user data.
Have the usual fail safes and security you'd expect for any production service.
# aave-take-home
# aave-take-home
