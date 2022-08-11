import { Account } from "./account";

export interface User {

    /**
	 * ID of user table.
	 */
    userId?: number;

	/**
	 * FirstName of user.
	 */
	firstName: string;

	/**
	 * Lastname of user.
	 */
	lastName: string;

	/**
	 * Address of user.
	 */
	address: string;

	/**
	 * City of user.
	 */
	city: string;

	/**
	 * Phone of user.
	 */
	phone: string;

	/**
	 * E-mail of user.
	 */
	mail: string;

	/**
	 * Password of user.
	 */
	password: string;

	/**
	 * Account of user.
	 */
	accountUser: Account;


}
