module.exports = {
  server: {
    hostname: 'tribeiros',
    loop: 60000,
    port: 3000
  },
  client: {
    port: 5000,
    endpoint: '/monitoring'
  },
  disk: {
    threshold: 20,
    loop: 60000 * 60,
    path: 'C:'
  },
  mem: {
    threshold: 10,
    loop: 10000
  },
  cpu: {
    threshold: 10,
    loop: 10000
  }
};
