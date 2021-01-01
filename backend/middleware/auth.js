module.exports = {
  ensureAuth: function (request, response, next) {
    if (
      request.hostname !== process.env.BACKEND_HOSTNAME &&
      request.isAuthenticated()
    ) {
      return next();
    } else {
      response.redirect(`${process.env.FRONTEND_URL}/`);
    }
  },
  ensureGuest: function (request, response, next) {
    if (
      request.hostname === process.env.BACKEND_HOSTNAME ||
      request.isAuthenticated()
    ) {
      response.redirect(`${process.env.FRONTEND_URL}/dashboard`);
    } else {
      return next();
    }
  },
};
