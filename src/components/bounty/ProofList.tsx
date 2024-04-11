import React, { useEffect, useState } from 'react';

import ProofItem from '@/components/bounty/ProofItem';


interface Claim {
  id: string;
  issuer: string;
  bountyId: string;
  bountyIssuer: string;
  name: string;
  description: string;
  createdAt: bigint;
  accepted: boolean ;
}



interface ProofListProps {
  data: Claim[]; 
  youOwner: any;
  openBounty: boolean | null;
  currentVotingClaim: number | null;
}

const ProofList: React.FC<ProofListProps> = ({ data, youOwner, openBounty, currentVotingClaim }) => {
  const [isAccepted, setIsAccepted] = useState(true);

  useEffect(() => {
    const checkAccepted = data.some(claim => claim.accepted === true);
    setIsAccepted(checkAccepted);
  }, [data]);



  return (
    <div className='container mx-auto px-0  py-12 flex flex-col gap-12 lg:grid lg:grid-cols-12 lg:gap-12 lg:px-0 '>
      {data.map((claim) => (
        <div key={claim.id} className={`${currentVotingClaim === 0 || currentVotingClaim === Number(claim.id) ? "" : "hidden"} lg:col-span-4`}>
        <ProofItem 
        openBounty={openBounty}
        isAccepted={isAccepted} 
        youOwner={youOwner} 
        bountyId={claim.bountyId} 
        key={claim.id} 
        id={claim.id} 
        title={claim.name} 
        description={claim.description} 
        issuer={claim.issuer}
        accepted={claim.accepted} />
      </div>
      ))}
    </div>
  );
};

export default ProofList;
