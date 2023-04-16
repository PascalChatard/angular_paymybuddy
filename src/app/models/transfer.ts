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
     * Transfer recipient name.
     */
    transferRecipient: string;
 

}
