# urf3

Mastery challenges aims to help you set up challenges among your friends for improving at League of Legends.  After registering your user name, you can create and join challenges similar to fantasy sports or fitbit walking challenges, where everyone can see how much mastery they and their friends gain.

You can test it out at http://immense-lake-58034.herokuapp.com/#/home.  I've created a  test user for easy access - username: riot password: test.  There's an existing challenge or two.  You can create new challenges and invite people via url.  You're welcome to create new accounts, and you can join the premade competition via immense-lake-58034.herokuapp.com/#/home/join/57317616e9211c03002b0c14

The project can be built with npm install, which will install node and bower dependencies and kick off the gulp build.  The project can be served with "node server.js".  It's built with Angular 1, a node express/socket.io server and a mongo database.

Unfortunately, many features did not make the first cut of this site for 5/10, including automatically ending contests after a period, options for average mastery per game instead of total mastery, and chat within challenges.  With a busy week at ng-conf, I only had a few days this  to work on it.  Also note the site currently isn't using SSL, and passwords are stored in plain text, so don't use anything serous!

After working on this project, I've noticed there are very few npm libraries for interacting with the riot api.  Most are very out of date, and none of them provide queuing for the rate limits we're given.  I plan to take my riot-api-adapter, add functions for all the riot end points, build in queuing with the options to queue with a data store across multiple node servers and publish it to npm.

I hope you enjoy my project - I believe a little friendly competition amongst friends goes a long way towards improving the community experience, and these challenges provide an excellent opportunity to do so.
