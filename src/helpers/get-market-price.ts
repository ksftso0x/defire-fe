import { ethers } from "ethers";
import { LpReserveContract } from "../abi";
import { mimKandy } from "../helpers/bond";
import { Networks } from "../constants/blockchain";

export async function getMarketPrice(networkID: Networks, provider: ethers.Signer | ethers.providers.Provider): Promise<number> {
    const mimTimeAddress = mimKandy.getAddressForReserve(networkID);

    const pairContract = new ethers.Contract(mimTimeAddress, LpReserveContract, provider);
    const reserves = await pairContract.getReserves();
    // const marketPrice = reserves[0] / reserves[1];
    const marketPrice = reserves[1] / reserves[0];
    return marketPrice;
}
