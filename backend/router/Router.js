const express = require("express");

class Router {
  constructor(service, auth) {
    this.service = service;
    this.auth = auth;
  }

  router() {
    let router = express.Router();

    router.post("/login", this.login.bind(this));
    router.post("/signup", this.signup.bind(this));
    router.get("/todolists", this.auth.authenticate(), this.list.bind(this));
    router.post("/todolists", this.auth.authenticate(), this.add.bind(this));
    router.put(
      "/todolists",
      this.auth.authenticate(),
      this.update.bind(this)
    );
    router.delete(
      "/todolists/:id",
      this.auth.authenticate(),
      this.remove.bind(this)
    );
    router.get('/info', this.auth.authenticate(), this.info.bind(this))
    return router;
  }

  login(req, res) {
    return this.service
      .login(req.body.username, req.body.password)
      .then((token) => (token ? res.json(token) : res.sendStatus(401)));
  }

  signup(req, res) {
    return this.service
      .signup(req.body.username, req.body.password)
      .then((userId) => res.send(userId));
  }

  list(req, res) {
    return this.service
      .list(req.user[0])
      .then((todoData) => res.send(todoData));
  }

  add(req, res) {
    return this.service
      .add(req.user[0], req.body.todolists, req.body.status)
      .then((todo) => res.send(todo[0]));
  }

  update(req, res) {
    console.log(req.body.status)
    return this.service
      .update(req.user[0], req.body.todolists, req.body.id, req.body.status)
      .then((todo) => res.send(JSON.stringify(todo)));
  }

  remove(req, res) {
    return this.service
      .remove(req.user[0], req.params.id)
      .then(() => res.send(req.params.id));
  }

  info(req, res) {
    console.log(req.user, "user");
    return this.service.info(req.user[0]).then((data) => res.send(data));
  }

}

module.exports = Router;
