import { cookies } from "next/headers";
import Statsig from "statsig-node";
import { StatsigUser } from "statsig-react";

export const initStatsig = async (): Promise<[StatsigUser, Record<string, unknown> | null, string]> => {
  if(!process.env.STATSIG_SERVER_SECRET) {
    throw new Error('Missing STATSIG_SERVER_SECRET environment variable.');
  }
  if(!process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY) {
    throw new Error('Missing NEXT_PUBLIC_STATSIG_CLIENT_KEY environment variable.');
  }

  const cookieStore = cookies();
  // grab the stable id we generated in the middleware to use for both the server and client statsig
  const stableID = cookieStore.get('statsigStableId')?.value;

  if(!stableID) {
    throw new Error('Missing statsigStableId cookie.');
  }

  const user = {
    customIDs: {
      stableID,
    },
  };

  await Statsig.initialize(process.env.STATSIG_SERVER_SECRET);
  const data = Statsig.getClientInitializeResponse(
    user,
    process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY,
  );
  return [user, data, stableID];
};
