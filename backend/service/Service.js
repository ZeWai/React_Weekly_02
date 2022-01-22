const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

class Service {
  constructor(knex) {
    this.knex = knex;
  }

  async login(Username, password) {
    let user = await this.knex
      .select("*")
      .from("users")
      .where({ username: Username })
      .then((data) => data[0]);

    if (await bcrypt.compare(password, user.password)) {
      let payload = {
        id: user.id,
      };

      let token = jwt.sign(payload, config.jwtSecret);
      return token;
    }
    console.log(user)
  }

  async signup(username, password) {
    let hashedPassword = await bcrypt.hash(password, 10);
    password = hashedPassword;

    let userInfo = {
      username,
      password,
    };

    let userId = await this.knex("users").insert(userInfo).returning("id");
    return userId;
  }

  info(user) {
    let userInfo = this.knex("users").select("*").where({ id: user.id });
    return userInfo;
  }

  list(user) {
    let lists = this.knex("lists").select("*").where({ users_id: user.id });
    return lists;
  }

  add(user, todolists) {
    let todo = {
      todolists: todolists,
      users_id: user.id,
    };
    let TODO = this.knex.insert(todo).into("lists").returning("*");
    return TODO;
  }

  update(user, todolists, id, status) {
    let todo = {
      todolists: todolists,
      users_id: user.id,
      status: status,
    };
    let TODO_NEW = this.knex("lists")
      .update(todo)
      .where({ id: id })
      .returning("*");
    return TODO_NEW;
  }

  remove(user, id) {
    let TODO_DELETE = this.knex("lists")
      .where({ id: id })
      .andWhere({ users_id: user.id })
      .del();

    return TODO_DELETE;
  }
}

module.exports = Service;
