import * as Fauna from 'faunadb';

export const faunaDbClient = new Fauna.Client({
  secret: 'fnAEmJ4b34ACTGkMZdQ0HBGASEMd6PpE_MMyECff',
  domain: 'db.fauna.com',
  port: 443,
  scheme: 'https',
});

export const faunaQuery = Fauna.query;
