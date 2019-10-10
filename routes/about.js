module.exports = {
  method: 'GET',
  path: '/about',
  handler: (request, h) => {
    return { msg: 'This is an about page with JSON response' };
  }
};
