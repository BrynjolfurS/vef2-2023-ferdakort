This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## TODO

### Búa til nýjan stað (settlement / attraction) eða klára user dót og skila?

Skoða mui betur og reyna að nota víðar

Nota mismunandi icons eftir því hvers eðlis hluturinn er

Setja inn user dót
- Admin getur editað entity í modal popupinu?
- User getur vistað entity sem favorite. Nýr takki birtist þegar logged in 'Favorites'?

- Many-to-Many TÖFLUR:

CREATE TABLE user_settlements
user_id INT,
settlement_id INT,
CONSTRAINT user_settle_pk PRIMARY KEY (user_id, settlement_id),
CONSTRAINT FK_user
  FOREIGN KEY (user_id) REFERENCES users (user_id),
CONSTRAINT FK_settlement
  FOREIGN KEY (settlement_id) REFERENCES settlements (settlement_id)

SAMA FYRIR ATTRACTIONS (NEMA settlements & attractions vísa í POINTS/PLACES töflu með coords?)



---------- AUTHORIZER DASHBOARD ----------------
Username: admin
Password: administerJustice

---- Ferdakort user ----
binni@ferdakort.is
Binni1#

(DELETE)
clientID: d382b794-2db1-4185-948a-b2311abd2608
clientSecret: 2c29aa3e-dcc8-4fdc-bab0-51f01064f715