export default {
	/**
	 * Capitalize first character
	 *
	 * @param {string} str
	 * @return {string}
	 */

	ucfirst: (str) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	},

	generateRandomString: (length = 15) => {
		return Math.random().toString(36).substr(2, length + 2);
	}
};
