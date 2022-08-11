import { Account } from "./account";


export interface Transfer {

	  /**
	   * ID of transfer table.
	   */
    transferId?: number;
 
    /**
     * Operation date.
     */
    date: Date;
 
    /**
     * Description of transfer.
     */
    description: string;
 
    /**
     * Amount of transfer.
     */
    amount: number;
 
    /**
     * Cost of transfer.
     */
    cost: number;
 
    /**
     * Credited Account by the transfer.
     */
    // creditedAccount: Account
    transferRecipient: string;
 
    // /**
    //  * Debited Account by the transfer
    //  */
    // debitedAccount: Account
 
    // /**
    //  * Pay rate applied.
    //  */
    //rate: Rate;
 

}
