# Instructions
Get featured books buy seasoned authors

Deployed URL: [Qbooks](https://qbooks.netlify.app)

# Installation
- Clone the [repo](https://github.com/shaolinmkz/books)
- CD into books
- Run `npm install` to install dependencies
- Run `npm start` to start app

# Assumptions and Issues Accounted
 Couldn't find a Book search query, and the `where` argument is case sensitive and wasn't returning the required data for a search combination title, authors, etc. So I assumed it was a backend issue and implemented a frontend search in the interim. I fetched all the book (which are about 20 in number) and filtered books that had a search term present in the book `title`, `author`, `genre`, and `tag` name. So currently I'm not querying the backend for the book search implementation.


# Feedback
