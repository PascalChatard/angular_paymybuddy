import { Transfer } from './transfer';
import { User } from './user';

export interface Account {

    /**
	 * ID of account table.
	 */
	accountId?: number;

	/**
	 * Open date of the account.
	 */
	openDate: Date;

	/**
	 * Account balance.
	 */
	solde: number;

	/**
	 * Owner of the account.
	 */
	accountOwner: User;

	/**
	 * List of associate user account.
	 */
	connections: User[];

	/**
	 * List of transfer operations.
	 */
	transfers: Transfer[];

}
