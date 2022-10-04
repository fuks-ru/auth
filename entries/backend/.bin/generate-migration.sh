export POSTGRES_HOST="localhost"
export POSTGRES_USER="root"
export POSTGRES_PASSWORD="root"

docker run --name auth-postgres \
  --rm \
  -e POSTGRES_PASSWORD="$POSTGRES_USER" \
  -e POSTGRES_USER="$POSTGRES_PASSWORD" \
  -e POSTGRES_DB=auth \
  -e PGDATA=/var/lib/postgresql/data/pgdata \
  -v "/$(pwd)/var/auth-postgres":/var/lib/postgresql/data \
  -p 5432:5432 \
  postgres:14.2-alpine

yarn dev:typeorm migration:run

yarn dev:typeorm migration:generate "$(pwd)/src/__migration__/$1"

docker stop auth-postgres
