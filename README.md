# React_email

This app is react.js and redux-Toolkit app with node.js as backend, passport for auth and mongoose ORM for database and sendGrid for email service

### Envirement Variables

```bash
# Rename the file .env.example to .env
# add envirement variables

# Express app port
PORT=5000

# Auth
GOOGLE_CLIENT_ID=''
GOOGLECLIENT_SECRET=''
COOKIE_KEY='randon-secret-key-for-cookie'

# DataBase URL
DB_URL='mongodb://localhost:27017/email' or 'your database server address'

# Stripe keys
STRIPE_SECRET_KEY=''
STRIPE_PUBLISHABLE_kEY=''

# SendGrid API key
SENDGRID_API_KEY=''

# SendGrid Alternative for email Only for development purpose
ETHEREAL_HOST_NAME=
ETHEREAL_PORT=
ETHEREAL_USER_NAME=
ETHEREAL_PASSWORD=
```

### Client

```
cd client
npm i
npm run build
```

### Node Express

```
npm i
npm start
```
