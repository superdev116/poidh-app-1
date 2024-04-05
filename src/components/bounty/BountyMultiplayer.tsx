import { useState, useEffect } from 'react';
import { getParticipants } from '@/app/context/web3';
import JoinBounty from '@/components/ui/JoinBounty';
import { OpenBounty } from '../../types/web3';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import Withdraw from '@/components/ui/Withdraw';
import CancelOpenBounty from '@/components/ui/CancelOpenBounty';

function weiToEther(weiValue: string | number): string {
  const etherValue = Number(weiValue) / 1e18;
  return etherValue.toFixed(10);
}

const BountyMultiplayer = ({ bountyId }: { bountyId: string }) => {
  const [participants, setParticipants] = useState<OpenBounty | null>(null);
  const [showParticipants, setShowParticipants] = useState(false);
  // const [userParticipate, setUserParticipate] = useState(false);


  


  const { user } = useDynamicContext(); 
  const currentUser = user?.verifiedCredentials[0].address;

  useEffect(() => {
    if (bountyId) {
      getParticipants(bountyId)
      .then((data: OpenBounty) => {
        const filteredAddresses = data.addresses.filter(address => address !== "0x0000000000000000000000000000000000000000");
        const filteredAmounts = data.amounts.filter((_, index) => data.addresses[index] !== "0x0000000000000000000000000000000000000000");
        setParticipants({ addresses: filteredAddresses, amounts: filteredAmounts });
      })
        .catch(console.error);
    }
  }, [bountyId]);

  const toggleParticipants = () => {
    setShowParticipants(!showParticipants);
  };


  const isCurrentUserAParticipant = currentUser ? participants?.addresses.includes(currentUser) : false;



  return (
    <>
      <div>
        <div>

        </div>
        <button
          onClick={toggleParticipants}
          className='border border-white rounded-full px-5 py-2 flex justify-between items-center backdrop-blur-sm bg-[#D1ECFF]/20 w-fit'
        >
          {participants ? `${participants.addresses.length} contributors` : 'Loading contributors...'}
          <span className={`${showParticipants ? '-rotate-180' : '' } animation-all duration-300 `} ><ExpandMoreIcon /></span>
        </button>

        {showParticipants && (
          <div className='border mt-5 border-white rounded-full px-5 py-2 flex justify-between items-center backdrop-blur-sm bg-[#D1ECFF]/20 w-fit'>
            <div className='flex flex-col'>
              {participants ? (
                participants.addresses.map((address, index) => (
                  <div key={index}>
                    {address} - {weiToEther(participants.amounts[index])} ETH
                  </div>
                ))
              ) : (
                <p>Loading addresses...</p>
              )}
            </div>
          </div>
        )}
      </div>
<div>

<JoinBounty bountyId={bountyId} />
<CancelOpenBounty bountyId={bountyId} />
</div>
      <div>
      {isCurrentUserAParticipant ? <Withdraw bountyId={bountyId}/>  :  <JoinBounty bountyId={bountyId} /> }
      </div>

    </>
  );
};

export default BountyMultiplayer;
