const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Custom endpoint for filtered & paginated contacts
server.get('/api/contacts', (req, res) => {
  const db = router.db.getState();
  let contacts = db.contacts || [];

  // Search filter
  if (req.query.search) {
    contacts = contacts.filter(contact => 
      contact.name.toLowerCase().includes(req.query.search.toLowerCase())
    );
  }

  // Favorites filter
  if (req.query.favourite === 'true') {
    contacts = contacts.filter(contact => contact.favourite);
  }

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  const results = {
    data: contacts.slice(startIndex, endIndex),
    total: contacts.length,
    page,
    limit,
    totalPages: Math.ceil(contacts.length / limit)
  };

  res.json(results); // Use res.json instead of res.jsonp unless needed
});

// Mount JSON Server routes under /api
server.use('/api', router);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});