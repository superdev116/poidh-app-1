/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-console */
'use client';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { ethers } from 'ethers';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import ProofListAccount from '@/components/bounty/ProofListAccount';
import BountyList from '@/components/ui/BountyList';
import FilterButton from '@/components/ui/FilterButton';

import {
  fetchBountyById,
  getBountiesByUser,
  getClaimById,
  getClaimsByUser,
  getContract,
  getDegenOrEnsName,
  getNftsOfOwner,
  getProvider,
  getSigner,
  getURI,
} from '@/app/context/web3';

import NftList from '../bounty/NftList';

import { BountiesData, ClaimsData, NFTDetails } from '@/types/web3';

const AccountInfo = () => {