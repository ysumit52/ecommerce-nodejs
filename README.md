# NodeJS-TypeScript-MongoDB-ECommerce

This repo can be used as a starting point for backend development with Nodejs, Express, TypeScript, MongoDB.


 * Create the User (If Missing)
```
db.createUser({
user: "sumit",
pwd: "sumit123",
roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
})
```

 * Grant the specific permission
```
 db.grantRolesToUser("sumit", [{ role: "readWrite", db: "ecommerce" }])
```
