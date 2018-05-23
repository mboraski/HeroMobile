### HeroMobile - Contractor Mobile App

==============================

Getting Started

==============================

Installation:

    git clone https://github.com/SpartanSOS/HeroMobile.git

    npm i

Running tests:

    npm run test // Runs Jest

Development:

    npm i -g exp // Installs exponent cli globally.

    exp start --localhost

    exp start --localhost --dev // For dev mode and additional logging

    exp start --lan // For lan developing and use with phone

In a separate terminal tab/window, run...

    exp ios // For ios

    exp android --offline // For android offline

Release:

    exp build:ios // For build standalone app

    exp publish // To publish to exp.host

Avoid Tunnel use if possible.
Always use securely as tunnel and lan are running on network

Owners

==============================

*   Mark Boraski <mailto:mboraski@outlook.com>

Contributing

==============================

1.  Update local master to remote master `git pull --rebase origin master`!

2.  Create your feature branch: `git checkout -b HEMO-8` (jira ticket number)

3.  Commit your changes: `git commit -m 'Add some feature'`

4.  Push to the branch: `git push origin HEMO-8`

5.  Move JIRA ticket to ready for review and add link to PR in jira ticket description.

6.  Submit a pull request, the name of the branch should be the JIRA ticket. E.g. HEMO-4.

7.  Ticket will be reviewed and reviewer will assign ticket to him/herself.

8.  When review completed, the ticket will be assigned to the developer to address comments or merge PR and move ticket to done column in jira.
