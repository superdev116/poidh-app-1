// BountyItem.tsx
import Button from "@/components/ui/Button"
import Link from "next/link";
import React from 'react';

interface BountyItemProps {
  id: string;
  title: string;
  description: string;
}

const BountyItem: React.FC<BountyItemProps> = ({ id, title, description }) => {
  return (
    <div className='p-5 border-white border rounded-xl lg:col-span-4' >
      <h3>{title}</h3>
      <p className="my-5">{description}</p>
      <div className="flex items-end justify-end mt-5">
        <Button>
          <Link href="/bounty">see bounty</Link>
        </Button>
      </div>
    </div>
  );
};

export default BountyItem;
