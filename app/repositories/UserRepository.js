const debug = require("debug")("app:db");
const bcrypt = require("bcryptjs");

const CrudRepository = require("gemboot").CrudRepository;
const User = require("@models/User");

class UserRepository extends CrudRepository {
	constructor() {
		super(User);
	}

	create({ email, password }) {
		let hashedPassword = bcrypt.hashSync(password, 8);

		debug(`UserRepository::create -> email: ${email}`);

		return this.User.create({
			email: email,
			password: hashedPassword
		});
	}

	getById(userid, showPassword = false) {
		debug(
			`UserRepository::getById -> userid: ${userid}, showPassword: ${showPassword}`
		);

		let attributes = ["id", "username"];
		if (showPassword) {
			attributes = ["id", "username", "password"];
		}
		return this.User.findOne({
			where: { id: userid },
			attributes: attributes
		});
	}

	getByEmail(email, showPassword = false) {
		debug(
			`UserRepository::getByEmail -> email: ${email}, showPassword: ${showPassword}`
		);

		let attributes = ["id", "email"];
		if (showPassword) {
			attributes = ["id", "email", "password"];
		}
		return this.User.findOne({
			where: { email: email },
			attributes: attributes
		});
	}
}

module.exports = UserRepository;
