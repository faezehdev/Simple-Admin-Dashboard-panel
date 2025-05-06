import jsonServer from 'json-server';
import cors from 'cors';
import bodyParser from 'body-parser';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(jsonServer.bodyParser);
server.use(middlewares);

const USER = { username: 'admin', password: '123456' };

server.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log('username',username);
  console.log('password',password);
  
  if (username == USER.username && password == USER.password) {
    return res.json({ message: 'Login successful', token: 'mock-token-12345' });
  }
  res.status(401).json({ message: 'Invalid credentials' });
});
server.use((req, res, next) => {
  console.log('👉 Body:', req.body);
  next();
});
server.use(router);

server.listen(4000, () => {
  console.log('✅ JSON Server running with auth at http://localhost:4000');
});
