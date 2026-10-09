import { randomUUID } from 'node:crypto';
import jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router('server/db.json');

server.use(jsonServer.defaults());
server.use(jsonServer.bodyParser);
server.use(jsonServer.rewriter({ '/api/v1/*': '/$1' }));

server.post('/authentication/sign-in', (request, response) => {
  const { username, email, password } = request.body ?? {};
  const login = String(email ?? username ?? '').trim().toLowerCase();
  const user = router.db.get('users').find((item) =>
    String(item.email ?? item.username).toLowerCase() === login && item.password === password
  ).value();

  if (!user) {
    return response.status(401).json({ message: 'Invalid email or password.' });
  }

  const safeUser = publicUser(user);
  return response.status(200).json({ ...safeUser, token: randomUUID() });
});

server.post('/authentication/sign-up', (request, response) => {
  const { name, email, username, password, role } = request.body ?? {};
  const normalizedEmail = String(email ?? username ?? '').trim().toLowerCase();
  const normalizedName = String(name ?? '').trim();
  const validRoles = ['patient', 'nutritionist'];

  if (!normalizedName || !normalizedEmail || !password || !validRoles.includes(role)) {
    return response.status(400).json({ message: 'Name, email, password, and a valid role are required.' });
  }

  const emailExists = router.db.get('users').some((user) =>
    String(user.email ?? user.username).toLowerCase() === normalizedEmail
  ).value();
  if (emailExists) {
    return response.status(409).json({ message: 'An account with this email already exists.' });
  }

  const user = {
    id: randomUUID(),
    username: normalizedEmail,
    email: normalizedEmail,
    name: normalizedName,
    password,
    role,
  };
  router.db.get('users').push(user).write();
  return response.status(201).json({ message: 'Account created successfully.' });
});

server.get('/users', (_request, response) => {
  const users = router.db.get('users').value() ?? [];
  return response.status(200).json(users.map(publicUser));
});

server.get('/users/:id', (request, response) => {
  const user = router.db.get('users').find((item) => String(item.id) === request.params.id).value();
  if (!user) return response.status(404).json({ message: 'User not found.' });
  return response.status(200).json(publicUser(user));
});

server.use(router);

server.listen(3000, '127.0.0.1', () => {
  console.log('Development API listening at http://127.0.0.1:3000/api/v1');
});

function publicUser(user) {
  const safeUser = { ...user };
  delete safeUser.password;
  return safeUser;
}
