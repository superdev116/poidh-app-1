
import { Contract, ethers } from "ethers";

import abi from './abi';
import abiNFT from './abiNFT'
import chains from './config'; 
import {  AcceptClaimFunction, Bounty , BountyCurrentVotingClaimFunction, BountyVotingTrackerFunction, CancelBountyFunction, Claim, CreateBountyFunction,CreateClaimFunction, FetchBountiesFunction, FetchBountyByIdFunction, GetAllBountiesFunction, GetBountiesByUserFunction, GetClaimByIdFunction,GetClaimsByBountyIdFunction, GetClaimsByUserFunction, GetParticipants, GetURIFunction, JoinOpenBountyFunction, ResolveVoteFunction, SubmitClaimForVoteFunction, VoteClaimFunction, withdrawFromOpenBountyFunction   } from '../../types/web3';


const currentChain = chains.sepolia;

export const getSigner = async (primaryWallet: any) => {
  const signer = await primaryWallet?.connector?.ethers?.getSigner();
  return signer;
};

export const getProvider = async () => {
  const provider = new ethers.JsonRpcProvider(currentChain.jsonProviderUrl);
  return provider;
};

export const getContract = async (signer: any) => {
  return new Contract(currentChain.contracts.mainContract, abi, signer);
};

export const getContractRead = async () => {
  const provider = await getProvider();
  return new Contract(currentChain.contracts.mainContract, abi, provider);
};

export const getNFTContractRead = async () => {
  const provider = await getProvider();
  return new Contract(currentChain.contracts.nftContract, abiNFT, provider);
};


export const getNftsOfOwner = async () => {
  const contract = getNFTContractRead()

  // console.log(contract)
  // console.log(balance)
  return contract
}

// async function getNFTsOfOwner() {
//   const contract = new ethers.Contract(contractAddress, erc721ABI, provider);
//   const balance = await contract.balanceOf(ownerAddress); //Returns the number of tokens owned by the address

//   let tokenIds = [];

//   for(let i = 0; i < balance.toNumber(); i++) {
//     const tokenId = await contract.tokenOfOwnerByIndex(ownerAddress, i); //Get the token ID based on the index from the balanceOf call
//     tokenIds.push(tokenId.toString());
//   }

//   console.log(`Token IDs owned by ${ownerAddress}: ${tokenIds}`);
// }










// WRITE Functions


export const createSoloBounty : CreateBountyFunction = async (
  primaryWallet,
  name,
  description,
  value
) =>  {
  try {
    const signer = await getSigner(primaryWallet);
    const contract = await getContract(signer);

    const options = {
      value: ethers.parseEther(value),
    };

    const transaction = await contract.createSoloBounty(name, description, options);
    await transaction.wait();
  } catch (error) {
    console.error('Error creating bounty:', error);
  }
};

export const createOpenBounty : CreateBountyFunction = async (
  primaryWallet,
  name,
  description,
  value
) => {
  try {
    const signer = await getSigner(primaryWallet);
    const contract = await getContract(signer);

    const options = {
      value: ethers.parseEther(value.toString()),
    };

    const transaction = await contract.createOpenBounty(name, description, options);
    await transaction.wait();
  } catch (error) {
    console.error('Error creating bounty:', error);
  }
};

export const createClaim: CreateClaimFunction = async (
  primaryWallet, name, uri, description, bountyId
) => {
  try {
    console.log('uri', uri)
    const signer = await getSigner(primaryWallet);
    const contract = await getContract(signer);
    const transaction = await contract.createClaim(bountyId, name, uri, description);
    const res = await transaction.wait();
  } catch (error) {
    console.error('Error creating claim:', error);
  }
};

export const acceptClaim: AcceptClaimFunction = async (
  primaryWallet, bountyId, claimId
) => {
  try {
    const signer = await getSigner(primaryWallet);
    const contract = await getContract(signer);
    const transaction = await contract.acceptClaim(bountyId, claimId);
    await transaction.wait();
  } catch (error) {
    console.error('Error accepting claim:', error);
  }
};

export const submitClaimForVote: SubmitClaimForVoteFunction = async (
  primaryWallet, bountyId, claimId
) => {
  try {
    const signer = await getSigner(primaryWallet);
    const contract = await getContract(signer);
    const transaction = await contract.submitClaimForVote(bountyId, claimId);
    await transaction.wait();
  } catch (error) {
    console.error('Error accepting claim:', error);
  }
};

export const cancelOpenBounty: CancelBountyFunction = async (
  primaryWallet, id
) => {
  try {
    const signer = await getSigner(primaryWallet);
    const contract = await getContract(signer);
    const transaction = await contract.cancelOpenBounty(id);
    await transaction.wait();
  } catch (error) {
    console.error('Error canceling open bounty:', error);
  }
};

export const cancelSoloBounty: CancelBountyFunction = async (
  primaryWallet, id
) => {
  try {
    const signer = await getSigner(primaryWallet);
    const contract = await getContract(signer);
    const transaction = await contract.cancelSoloBounty(id);
    await transaction.wait();
  } catch (error) {
    console.error('Error canceling solo bounty:', error);
  }
};

export const withdrawFromOpenBounty: withdrawFromOpenBountyFunction = async (
  primaryWallet, id
) => {
  try {
    const signer = await getSigner(primaryWallet);
    const contract = await getContract(signer);
    const transaction = await contract.withdrawFromOpenBounty(id);
    await transaction.wait();
  } catch (error) {
    console.error('Error widthdraw:', error);
  }
};

export const voteClaim: VoteClaimFunction = async (
  primaryWallet, bountyId, vote
) => {
  try {
    const signer = await getSigner(primaryWallet);
    const contract = await getContract(signer);
    const transaction = await contract.voteClaim(bountyId, vote);
    await transaction.wait();
  } catch (error) {
    console.error('Error voting:', error);
  }
};

export const resolveVote: ResolveVoteFunction = async (
  primaryWallet, bountyId, 
) => {
  try {
    const signer = await getSigner(primaryWallet);
    const contract = await getContract(signer);
    const transaction = await contract.resolveVote(bountyId);
    await transaction.wait();
  } catch (error) {
    console.error('Error voting:', error);
  }
};


export const joinOpenBounty: JoinOpenBountyFunction = async (
  primaryWallet,
  id,
  value,
) => {
  try {
    const signer = await getSigner(primaryWallet);
    const contract = await getContract(signer);
    const options = {
      value: ethers.parseEther(value.toString()),
    };
    const transaction = await contract.joinOpenBounty(id,  options  );
    await transaction.wait();
  } catch (error) {
    console.error('Error joining open bounty:', error);
  }
};




// READ Functions


export const fetchBounties: FetchBountiesFunction = async (offset) => {
  const contractRead = await getContractRead();

  const rawBounties = await contractRead.getBounties(offset);
  const bounties: Bounty[] = rawBounties
    .map((bounty:any) => ({
      id: bounty[0].toString(),
      issuer: bounty[1],
      name: bounty[2],
      description: bounty[3],
      amount: bounty[4].toString(),
      claimer: bounty[5],
      createdAt: bounty[6].toString(),
      claimId: bounty[7].toString()
    }))
    .filter((bounty:any) => bounty.issuer !== "0x0000000000000000000000000000000000000000");

  return bounties;
};

export const fetchBountyById: FetchBountyByIdFunction = async (id) => {
  const contractRead = await getContractRead();
  const bounty = await contractRead.bounties(id);

  const formattedBounty: Bounty = {
    id: bounty[0].toString(),
    issuer: bounty[1],
    name: bounty[2],
    description: bounty[3],
    amount: bounty[4].toString(),
    claimer: bounty[5],
    createdAt: bounty[6].toString(),
    claimId: bounty[7].toString(),
  };
  
  return formattedBounty;
};

export const getBountiesByUser: GetBountiesByUserFunction = async (
  user, 
  offset = 0, 
  allBounties = []
) => {
  const contractRead = await getContractRead();
  const rawBounties = await contractRead.getBountiesByUser(user, offset);

  const newBounties: Bounty[] = rawBounties
    .filter((bounty: any) => bounty[1] !== "0x0000000000000000000000000000000000000000")
    .map((bounty: any) => ({
      id: bounty[0].toString(),
      issuer: bounty[1],
      name: bounty[2],
      description: bounty[3],
      amount: bounty[4].toString(),
      claimer: bounty[5],
      createdAt: bounty[6].toString(),
      claimId: bounty[7].toString()
    }));

  allBounties = [...allBounties, ...newBounties];

  if (newBounties.length === 10) {
    return getBountiesByUser(user, offset + 10, allBounties);
  }

  allBounties.sort((a, b) => Number(b.createdAt) - Number(a.createdAt));


  return allBounties;
};


export const fetchAllBounties: GetAllBountiesFunction = async () => {

  const contractRead = await getContractRead();
  const bountyCounter = await contractRead.bountyCounter();

  let allBounties: Bounty[] = [];


  const totalBounties = Number(bountyCounter.toString());

  for (let offset = Math.floor(totalBounties / 10) * 10; offset >= 0; offset -= 10) {
    const rawBounties = await contractRead.getBounties(offset) as Bounty[];
    const bounties = rawBounties
      .map(bounty => ({
        id: bounty.id,
        issuer: bounty.issuer,
        name: bounty.name,
        description: bounty.description,
        amount: bounty.amount,
        claimer: bounty.claimer,
        createdAt: bounty.createdAt,
        claimId: bounty.claimId,
      }))
      .filter(bounty => bounty.issuer !== "0x0000000000000000000000000000000000000000");
    allBounties = [...allBounties, ...bounties];
  }

  allBounties.sort((a, b) => Number(b.createdAt) - Number(a.createdAt));

  return allBounties;
};


// export const fetchAllBounties: GetAllBountiesFunction = async (offset: number = 0) => {
//   const contractRead = await getContractRead();
//   // Assuming getBounties function can accept offset and returns a fixed number of bounties per call (e.g., 10)
//   const rawBounties = await contractRead.getBounties(offset) as Bounty[];

//   // Map and filter the raw bounties as before
//   const bounties = rawBounties
//     .map(bounty => ({
//       id: bounty.id,
//       issuer: bounty.issuer,
//       name: bounty.name,
//       description: bounty.description,
//       amount: bounty.amount,
//       claimer: bounty.claimer,
//       createdAt: bounty.createdAt,
//       claimId: bounty.claimId,
//     }))
//     .filter(bounty => bounty.issuer !== "0x0000000000000000000000000000000000000000");

//   // No need to sort here since we're fetching in batches
//   return bounties;
// };


export const getParticipants: GetParticipants = async (id) => {
  const contractRead = await getContractRead();
  const rawParticipants = await contractRead.getParticipants(id);

  const addresses = rawParticipants[0].map((p: string) => p.toString());
  const amounts = rawParticipants[1].map((a: bigint) => a.toString());
  
  console.log(JSON.stringify({ addresses, amounts }, null, 2));

  return { addresses, amounts };
};


export const bountyCurrentVotingClaim: BountyCurrentVotingClaimFunction = async (id) => {
  const contractRead = await getContractRead();
  const currentVotingClaim = await contractRead.bountyCurrentVotingClaim(id);
  const votingClaimNumber = Number(currentVotingClaim.toString());
  return votingClaimNumber;
};

export const bountyVotingTracker: BountyVotingTrackerFunction = async (id) => {
  const contractRead = await getContractRead();
  const votingTrackerRaw = await contractRead.bountyVotingTracker(id);
  const votingTracker = {
    yes: votingTrackerRaw[0].toString(),
    no: votingTrackerRaw[1].toString(),
    deadline: votingTrackerRaw[2].toString(),
  };
  return votingTracker;
};


export const getClaimsByUser: GetClaimsByUserFunction = async (user) => {
  const contractRead = await getContractRead();
  const claimsRaw = await contractRead.getClaimsByUser(user);
  const formattedClaims: Claim[] = claimsRaw.map((claim: any) => ({
    id: claim[0].toString(),
    issuer: claim[1],
    bountyId: claim[2].toString(),
    bountyIssuer: claim[3],
    name: claim[4],
    description: claim[5],
    createdAt: claim[6],
    accepted: claim[7]
  }));

  formattedClaims.sort((a, b) => Number(b.createdAt) - Number(a.createdAt));


  return formattedClaims;
};

export const getClaimsByBountyId: GetClaimsByBountyIdFunction = async (id) => {
  const contractRead = await getContractRead();
  const claimsByBountyId = await contractRead.getClaimsByBountyId(id);
  const formattedClaims: Claim[] = claimsByBountyId.map((claim: any) => ({
    id: claim[0].toString(),
    issuer: claim[1],
    bountyId: claim[2].toString(),
    bountyIssuer: claim[3],
    name: claim[4],
    description: claim[5],
    createdAt: claim[6].toString(),
    accepted: claim[7]
  }));
  return formattedClaims;
};


export const getClaimById: GetClaimByIdFunction = async (claimId) => {
  const contractRead = await getContractRead();
  const claimById = await contractRead.claims(claimId);

  const formattedClaim: Claim[] = [{
    id: claimById[0].toString(),
    issuer: claimById[1],
    bountyId: claimById[2].toString(),
    bountyIssuer: claimById[3],
    name: claimById[4],
    description: claimById[5],
    createdAt: claimById[6].toString(),
    accepted: claimById[7]
  }];

  return formattedClaim;
};





// export const getClaimById: GetClaimByIdFunction = async (claimId) => {
//   const contractRead = await getContractRead();
//   const claimById = await contractRead.claims(claimId);

//   const names = claimById['#names'];
//   const data = claimById.filter((_, index) => index !== '#names');

//   const formattedClaim = {};
//   names.forEach((name, index) => {
//     formattedClaim[name] = data[index];
//   });

//   return formattedClaim;
// };


export const getURI: GetURIFunction = async (claimId) => {
  const contractNFT = await getNFTContractRead();
  const uri = await contractNFT.tokenURI(claimId);
  return uri;
};
