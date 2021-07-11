![example workflow](https://github.com/Taller2SeedyFiuba/Seedyfiuba_Back_users/actions/workflows/main.yml/badge.svg)

# SeedyFiuba Users Microservice

This is a microservice that provides users CRUD functionalities to SeedyFiuba backend.

### Built With

* [ExpressJS](https://expressjs.com/)
* [PostgreSQL](https://www.postgresql.org/)
* [Docker](https://www.docker.com/)

### Deployed In

* [Heroku](https://www.heroku.com/) as a Container Registry.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Docker-cli must be installed. 

### Installation

1. Clone the repo
   ```git
   git clone https://github.com/Taller2SeedyFiuba/Seedyfiuba_Back_users
   ```
2. Install NPM packages
   ```npm
   npm install
   ```
3. Set up environment variables in an ```.env``` named file based on ```.env.example```.

## Usage

```docker
docker-compose up --b
```

### Docs

Swagger is used to document the API structure. 
```
{HOST}/api/api-docs
```

### Standars

* [Jsend](https://github.com/omniti-labs/jsend) standars were followed up on the API design

## Testing

#### Unit Tests
```npm
docker-compose build && docker-compose run --rm user-service npm run test
```

## Production Deployment CI

This repository is configured using GitHub Actions. When ```main``` is updated an automated deploy is done using CI.

### GitHub Actions secrets

* HEROKU_API_KEY
* HEROKU_APP_NAME

## License
[MIT](https://choosealicense.com/licenses/mit/)
