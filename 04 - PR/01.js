const { interval, from } = require('rxjs');
const { map, mergeMap } = require('rxjs/operators');

const searchUser = id =>
  from(fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then(res => res.json()));

const users = Array.from({ length: 10 }, (_, i) => i + 1);
const req = interval(3000).pipe(map(id => users[id]));

req
  .pipe(
    mergeMap(user_id => searchUser(user_id)),
    map(user => console.log(user)),
  )
  .subscribe();