# Instructions
[![Netlify Status](https://api.netlify.com/api/v1/badges/c017412b-ada6-4b2e-aa0a-6fdf2e80f135/deploy-status)](ttps://qbooks.netlify.app)


Deployed Link: [qbooks](https://qbooks.netlify.app)

## Installation
- Clone the [repo](https://github.com/shaolinmkz/books)
- CD into books
- Run `npm install` to install all dependencies
- Run `npm start` to start the app

## Assumptions and Issues
 - I couldn't find a `BookSearch` query on the docs, and the `where` argument is case sensitive and wasn't returning the required data for a search combination title, authors, etc. So I assumed it was a backend issue and implemented a frontend search in the interim. I fetched all the book (which are about 20 in number) and filtered books that had a search term present in the book `title`, `author`, `genre`, and `tag` name. So currently I'm not querying the backend for the book search implementation.

 - I assumed all `book` and `cart` update should be done on the client. Mutating the data on the server directly will lead to unexpected results during testing. Especially when multiple developers are mutating data and testing at the same time. There might be inconsistencies with the data expected to be returned.

 ## Requirements Not Covered
 - Nil


## Feedback
- The assessment was great and flexible, giving room for self-innovation and I really enjoyed it.
- It will be nice if the `Add to Cart` buttons on the index page has a visible clickable area.
